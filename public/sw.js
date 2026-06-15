// ── PW-Core Fake API Service Worker ─────────────────────────────────────────
// Intercepts /api/* requests so they appear in the browser Network tab,
// then delegates to the main thread (which has localStorage access).

const pending = new Map();
let nextId = 0;

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // Only intercept our fake API routes
  if (!url.pathname.startsWith('/api/')) return;

  event.respondWith(routeToMainThread(event.request, event.clientId));
});

async function routeToMainThread(request, clientId) {
  const url = new URL(request.url);

  // Read body for mutating methods, skip reading file uploads as text
  let bodyText = null;
  const isUpload = url.pathname.includes('/upload');
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method.toUpperCase()) && !isUpload) {
    try { bodyText = await request.text(); } catch {}
  }

  // Find the page that made the request
  let client = null;
  if (clientId) {
    try {
      client = await self.clients.get(clientId);
    } catch (e) {
      console.warn('[SW] self.clients.get failed:', e);
    }
  }
  if (!client) {
    try {
      const clients = await self.clients.matchAll({ type: 'window' });
      client = clients[0];
    } catch (e) {
      console.warn('[SW] self.clients.matchAll failed:', e);
    }
  }

  if (!client) {
    return jsonResponse({ error: 'Service Worker: no page client found' }, 500);
  }

  const id = ++nextId;

  // Return a promise that resolves when the main thread sends back a response
  return new Promise((resolve) => {
    pending.set(id, resolve);

    client.postMessage({
      type: 'FAKE_API_REQUEST',
      id,
      method: request.method.toUpperCase(),
      path: url.pathname,
      search: url.search,
      body: bodyText,
    });

    // Safety timeout after 5s
    setTimeout(() => {
      if (pending.has(id)) {
        pending.delete(id);
        resolve(jsonResponse({ error: 'Service Worker: handler timed out' }, 504));
      }
    }, 5000);
  });
}

// Listen for responses from the main thread
self.addEventListener('message', (event) => {
  if (event.data?.type !== 'FAKE_API_RESPONSE') return;
  const { id, status, data } = event.data;
  const resolve = pending.get(id);
  if (resolve) {
    pending.delete(id);
    resolve(jsonResponse(data, status));
  }
});

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'X-Powered-By': 'PW-Core Fake API',
    },
  });
}
