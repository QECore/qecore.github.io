// ── PW-Core Fake DB + API Client ────────────────────────────────────────────
// All /api/* requests are intercepted by the Service Worker (public/sw.js),
// which delegates to handleFakeApiRequest() here (via postMessage).
// This keeps localStorage access on the main thread and makes every call
// visible in the browser's Network tab as real Fetch/XHR entries.

// ── Storage Helpers ────────────────────────────────────────────────────────────
const getStorageItem = <T>(key: string, fallback: T): T => {
  const item = localStorage.getItem(key);
  if (!item) return fallback;
  try { return JSON.parse(item) as T; } catch { return fallback; }
};

const setStorageItem = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

// ── Sequential ID Generator (per-table integer counters) ──────────────────────
const nextId = (table: string): number => {
  const key = `local_db_seq_${table}`;
  const current = parseInt(localStorage.getItem(key) || '0', 10);
  const next = current + 1;
  localStorage.setItem(key, String(next));
  return next;
};

// ── Seed Database ──────────────────────────────────────────────────────────────
const seedDatabase = () => {
  // Seed default users if not present
  if (!localStorage.getItem('local_db_users')) {
    const defaultUsers = [
      { id: 1, email: 'demo@pw-core.app', name: 'Demo User', password: 'password123' }
    ];
    setStorageItem('local_db_users', defaultUsers);
    localStorage.setItem('local_db_seq_users', '1');
  }

  // Always ensure a demo session so /app works without manual login, unless the user explicitly logged out
  if (!localStorage.getItem('access_token') && localStorage.getItem('explicit_logout') !== 'true') {
    const defaultUser = { id: 1, email: 'demo@pw-core.app', name: 'Demo User' };
    localStorage.setItem('access_token', 'mock-session-token');
    setStorageItem('current_user', defaultUser);
  }

  if (!localStorage.getItem('local_db_seeded')) {
    const defaultProjects = [
      {
        id: 1,
        title: 'Project Alpha',
        description: 'First test project with mock data.',
        status: 'active',
        priority: 'high',
        progress: 60,
        due_date: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        created_date: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Project Beta',
        description: 'Second test project for UI validation.',
        status: 'paused',
        priority: 'medium',
        progress: 20,
        due_date: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        created_date: new Date(Date.now() - 86400000).toISOString()
      }
    ];
    const defaultTasks = [
      {
        id: 1,
        title: 'Initial setup and design review',
        description: 'Review the architecture and prepare the UI components.',
        status: 'done',
        priority: 'high',
        project_id: 1,
        assignee: 'Alice Smith',
        due_date: new Date().toISOString().split('T')[0],
        created_date: new Date(Date.now() - 3 * 86400000).toISOString()
      },
      {
        id: 2,
        title: 'Convert code to TypeScript',
        description: 'Rename all files to ts/tsx and fix typings.',
        status: 'in_progress',
        priority: 'critical',
        project_id: 1,
        assignee: 'Bob Jones',
        due_date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
        created_date: new Date().toISOString()
      },
      {
        id: 3,
        title: 'Test local fake DB + API',
        description: 'Verify that localStorage persistence works perfectly.',
        status: 'todo',
        priority: 'medium',
        project_id: 1,
        assignee: 'Bob Jones',
        due_date: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
        created_date: new Date().toISOString()
      }
    ];
    const defaultActivities = [
      {
        id: 1,
        action: 'created',
        entity_type: 'Project',
        entity_name: 'Project Alpha',
        details: 'Initial project setup.',
        actor: 'system',
        created_date: new Date(Date.now() - 3 * 86400000).toISOString()
      },
      {
        id: 2,
        action: 'Updated',
        entity_type: 'Task',
        entity_name: 'Initial setup and design review',
        details: 'Status changed to done.',
        actor: 'system',
        created_date: new Date(Date.now() - 2 * 86400000).toISOString()
      }
    ];

    setStorageItem('local_db_projects', defaultProjects);
    setStorageItem('local_db_tasks', defaultTasks);
    setStorageItem('local_db_activities', defaultActivities);
    setStorageItem('local_db_documents', []);
    // Seed the sequence counters to match seed data
    localStorage.setItem('local_db_seq_projects', '2');
    localStorage.setItem('local_db_seq_tasks', '3');
    localStorage.setItem('local_db_seq_activities', '2');
    localStorage.setItem('local_db_seq_documents', '0');
    setStorageItem('local_db_seeded', 'true');
  }
};

seedDatabase();

// ── Migration: reset to numeric IDs if old string IDs detected ────────────────
const migrateToNumericIds = () => {
  const projects = getStorageItem<any[]>('local_db_projects', []);
  if (projects.length > 0 && typeof projects[0].id === 'string') {
    // Old string IDs detected — wipe seed flag so seedDatabase() re-seeds with numeric IDs
    localStorage.removeItem('local_db_seeded');
    localStorage.removeItem('local_db_projects');
    localStorage.removeItem('local_db_tasks');
    localStorage.removeItem('local_db_activities');
    localStorage.removeItem('local_db_documents');
    localStorage.removeItem('local_db_seq_projects');
    localStorage.removeItem('local_db_seq_tasks');
    localStorage.removeItem('local_db_seq_activities');
    localStorage.removeItem('local_db_seq_documents');
    seedDatabase(); // Re-seed with numeric IDs
  }
};
migrateToNumericIds();

const formatDetailsText = (text: string): string => {
  if (!text) return "";
  const replacements: Record<string, string> = {
    "in_progress": "In Progress",
    "todo": "To Do",
    "review": "Review",
    "done": "Done",
    "low": "Low",
    "medium": "Medium",
    "high": "High",
    "critical": "Critical",
    "active": "Active",
    "paused": "Paused",
    "completed": "Completed",
    "created": "Created",
    "updated": "Updated",
    "deleted": "Deleted",
    "restored": "Restored"
  };
  let formatted = text;
  Object.entries(replacements).forEach(([code, actual]) => {
    const regex = new RegExp(`\\b${code}\\b`, 'gi');
    formatted = formatted.replace(regex, actual);
  });
  return formatted;
};

// ── Activity Logger ────────────────────────────────────────────────────────────
const logActivity = (action: string, entityType: string, entityName: string, details: string) => {
  const activities = getStorageItem<any[]>('local_db_activities', []);
  activities.push({
    id: nextId('activities'),
    action,
    entity_type: entityType,
    entity_name: entityName,
    details: formatDetailsText(details),
    actor: 'user',
    created_date: new Date().toISOString()
  });
  setStorageItem('local_db_activities', activities);
};

// ── DB CRUD Helpers ────────────────────────────────────────────────────────────
const handleDB = {
  projects: {
    list: (sort?: string, includeDeleted = false) => {
      let list = getStorageItem<any[]>('local_db_projects', []);
      if (!includeDeleted) {
        list = list.filter(p => !p.deleted);
      }
      if (sort === '-created_date') list = [...list].sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
      return list;
    },
    create: (data: any) => {
      const list = getStorageItem<any[]>('local_db_projects', []);
      const item = { ...data, id: nextId('projects'), created_date: new Date().toISOString() };
      list.push(item);
      setStorageItem('local_db_projects', list);
      logActivity('created', 'Project', item.title, 'Created new project');
      return item;
    },
    update: (id: any, data: any) => {
      const list = getStorageItem<any[]>('local_db_projects', []);
      const idx = list.findIndex(p => String(p.id) === String(id));
      if (idx === -1) throw new Error('Project not found');
      const updated = { ...list[idx], ...data };
      list[idx] = updated;
      setStorageItem('local_db_projects', list);
      logActivity('Updated', 'Project', updated.title, 'Updated project');
      return updated;
    },
    delete: (id: any) => {
      const list = getStorageItem<any[]>('local_db_projects', []);
      const idx = list.findIndex(p => String(p.id) === String(id));
      if (idx === -1) throw new Error('Project not found');
      
      list[idx].deleted = true;
      list[idx].deleted_at = new Date().toISOString();
      setStorageItem('local_db_projects', list);
      
      // Cascade delete to related tasks
      const tasks = getStorageItem<any[]>('local_db_tasks', []);
      const updatedTasks = tasks.map(t => {
        if (String(t.project_id) === String(id)) {
          return { ...t, deleted: true, deleted_at: new Date().toISOString() };
        }
        return t;
      });
      setStorageItem('local_db_tasks', updatedTasks);
      
      logActivity('deleted', 'Project', list[idx].title, 'Deleted project (moved to trash)');
      return { success: true };
    },
    restore: (id: any) => {
      const list = getStorageItem<any[]>('local_db_projects', []);
      const idx = list.findIndex(p => String(p.id) === String(id));
      if (idx === -1) throw new Error('Project not found');
      
      list[idx].deleted = false;
      delete list[idx].deleted_at;
      setStorageItem('local_db_projects', list);
      logActivity('restored', 'Project', list[idx].title, 'Restored project');
      return list[idx];
    }
  },
  tasks: {
    list: (sort?: string, includeDeleted = false) => {
      let list = getStorageItem<any[]>('local_db_tasks', []);
      if (!includeDeleted) {
        list = list.filter(t => !t.deleted);
      }
      if (sort === '-created_date') list = [...list].sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
      return list;
    },
    create: (data: any) => {
      const list = getStorageItem<any[]>('local_db_tasks', []);
      const item = { ...data, id: nextId('tasks'), created_date: new Date().toISOString() };
      list.push(item);
      setStorageItem('local_db_tasks', list);
      logActivity('created', 'Task', item.title, 'Created new task');
      return item;
    },
    update: (id: any, data: any) => {
      const list = getStorageItem<any[]>('local_db_tasks', []);
      const idx = list.findIndex(t => String(t.id) === String(id));
      if (idx === -1) throw new Error('Task not found');
      const updated = { ...list[idx], ...data };
      list[idx] = updated;
      setStorageItem('local_db_tasks', list);
      logActivity('Updated', 'Task', updated.title, `Status: ${updated.status}`);
      return updated;
    },
    delete: (id: any) => {
      const list = getStorageItem<any[]>('local_db_tasks', []);
      const idx = list.findIndex(t => String(t.id) === String(id));
      if (idx === -1) throw new Error('Task not found');
      
      list[idx].deleted = true;
      list[idx].deleted_at = new Date().toISOString();
      setStorageItem('local_db_tasks', list);
      
      logActivity('deleted', 'Task', list[idx].title, 'Deleted task (moved to trash)');
      return { success: true };
    },
    restore: (id: any) => {
      const list = getStorageItem<any[]>('local_db_tasks', []);
      const idx = list.findIndex(t => String(t.id) === String(id));
      if (idx === -1) throw new Error('Task not found');
      
      const task = list[idx];
      // Check if project exists and is not deleted
      const projects = getStorageItem<any[]>('local_db_projects', []);
      const proj = projects.find(p => String(p.id) === String(task.project_id));
      
      if (!proj || proj.deleted) {
        throw new Error('Project must be restored before you restore the task');
      }
      
      task.deleted = false;
      delete task.deleted_at;
      setStorageItem('local_db_tasks', list);
      
      logActivity('restored', 'Task', task.title, 'Restored task');
      return task;
    }
  },
  documents: {
    list: (includeDeleted = false) => {
      const list = getStorageItem<any[]>('local_db_documents', []);
      return includeDeleted ? list : list.filter(d => !d.deleted);
    },
    create: (data: any) => {
      const list = getStorageItem<any[]>('local_db_documents', []);
      const item = { ...data, id: nextId('documents'), created_date: new Date().toISOString() };
      list.push(item);
      setStorageItem('local_db_documents', list);
      logActivity('created', 'Document', item.name, 'Uploaded document');
      return item;
    },
    delete: (id: any) => {
      const list = getStorageItem<any[]>('local_db_documents', []);
      const item = list.find(d => String(d.id) === String(id));
      if (!item) throw new Error('Document not found');
      item.deleted = true;
      item.deleted_at = new Date().toISOString();
      setStorageItem('local_db_documents', list);
      logActivity('deleted', 'Document', item.name, 'Deleted document (moved to trash)');
      return { success: true };
    },
    update: (id: any, data: any) => {
      const list = getStorageItem<any[]>('local_db_documents', []);
      const idx = list.findIndex(d => String(d.id) === String(id));
      if (idx === -1) throw new Error('Document not found');
      const item = { ...list[idx], ...data };
      list[idx] = item;
      setStorageItem('local_db_documents', list);
      logActivity('updated', 'Document', item.name, 'Replaced file');
      return item;
    },
    restore: (id: any) => {
      const list = getStorageItem<any[]>('local_db_documents', []);
      const doc = list.find(d => String(d.id) === String(id));
      if (!doc) throw new Error('Document not found');

      if (doc.project_id) {
        const projects = getStorageItem<any[]>('local_db_projects', []);
        const proj = projects.find(p => String(p.id) === String(doc.project_id));
        if (!proj || proj.deleted) {
          throw new Error('Project must be restored before you restore the document');
        }
      }
      if (doc.task_id) {
        const tasks = getStorageItem<any[]>('local_db_tasks', []);
        const tsk = tasks.find(t => String(t.id) === String(doc.task_id));
        if (!tsk || tsk.deleted) {
          throw new Error('Task must be restored before you restore the document');
        }
      }

      doc.deleted = false;
      delete doc.deleted_at;
      setStorageItem('local_db_documents', list);
      logActivity('restored', 'Document', doc.name, 'Restored document');
      return doc;
    }
  }
};

// ── Validation Helpers ────────────────────────────────────────────────────────
function validateFields(modelName: string, payload: any, fields: Record<string, any>) {
  if (typeof payload !== "object" || payload === null) {
    throw new Error(`Payload must be a valid JSON object for ${modelName}`);
  }
  for (const [key, rules] of Object.entries(fields)) {
    const val = payload[key];
    if (val === undefined || val === null || (rules.type === "string" && typeof val === "string" && val.trim() === "")) {
      if (rules.required) throw new Error(`Validation Error: '${key}' is required and cannot be empty for ${modelName}`);
      continue;
    }
    if (rules.type === "string" && typeof val !== "string")
      throw new Error(`Type mismatch on '${key}': expected string, got ${typeof val}`);
    if (rules.isEmail && rules.type === "string") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        throw new Error(`Validation Error: '${key}' must be a valid email address`);
      }
    }
    if (rules.type === "number" && (typeof val !== "number" || isNaN(val)))
      throw new Error(`Type mismatch on '${key}': expected number, got ${typeof val}`);
    if (rules.type === "boolean" && typeof val !== "boolean")
      throw new Error(`Type mismatch on '${key}': expected boolean, got ${typeof val}`);
    if (rules.type === "date" && (typeof val !== "string" || isNaN(Date.parse(val))))
      throw new Error(`Type mismatch on '${key}': expected date string, got '${val}'`);
    if (rules.enum && !rules.enum.includes(val))
      throw new Error(`Invalid value for '${key}': '${val}' not in [${rules.enum.join(", ")}]`);
  }
}

function validatePayload(method: string, path: string, payload: any) {
  if (path.endsWith("/restore")) return;
  const isPost = method.toUpperCase() === "POST";
  if (path.startsWith("/api/app/projects")) {
    validateFields("Project", payload, {
      title: { type: "string", required: isPost },
      description: { type: "string" },
      status: { type: "string", enum: ["active", "paused", "completed", "archived"] },
      priority: { type: "string", enum: ["low", "medium", "high", "critical"] },
      progress: { type: "number" },
      due_date: { type: "date" },
    });
  } else if (path.startsWith("/api/app/tasks")) {
    validateFields("Task", payload, {
      title: { type: "string", required: isPost },
      description: { type: "string" },
      status: { type: "string", enum: ["todo", "in_progress", "review", "done"] },
      priority: { type: "string", enum: ["low", "medium", "high", "critical"] },
      assignee: { type: "string" },
      project_id: { type: "number", required: isPost },
      due_date: { type: "date" },
    });
  } else if (path.startsWith("/api/app/documents")) {
    validateFields("Document", payload, {
      name: { type: "string", required: isPost },
      file_url: { type: "string", required: isPost },
      file_type: { type: "string" },
      file_size: { type: "number" },
      task_id: { type: "number" },
      project_id: { type: "number" },
    });
  } else if (path.startsWith("/api/auth/login")) {
    validateFields("Login", payload, {
      email: { type: "string", required: true, isEmail: true },
      password: { type: "string", required: true },
    });
  } else if (path.startsWith("/api/auth/register")) {
    validateFields("Register", payload, {
      email: { type: "string", required: true, isEmail: true },
      password: { type: "string", required: true },
    });
  } else if (path.startsWith("/api/auth/reset-password-request")) {
    validateFields("ResetPasswordRequest", payload, {
      email: { type: "string", required: true, isEmail: true },
    });
  }
}

// ── Mock API Router ────────────────────────────────────────────────────────────
// Called by the Service Worker message handler. Reads/writes localStorage,
// returns { status, data }. The SW turns this into a real HTTP Response that
// shows in the browser's Network tab.
export const handleFakeApiRequest = (
  method: string,
  path: string,
  search: string,
  bodyText: string | null
): { status: number; data: any } => {
  const originalSp = new URLSearchParams(search);
  const sp = new URLSearchParams();

  // Strip query parameters unless required by the respective endpoint
  if (method === 'GET') {
    if (path === '/api/app/projects' || path === '/api/app/tasks') {
      const sort = originalSp.get('sort');
      if (sort) sp.set('sort', sort);
      const deleted = originalSp.get('deleted');
      if (deleted) sp.set('deleted', deleted);
    } else if (path === '/api/app/activity') {
      const limit = originalSp.get('limit');
      const sort = originalSp.get('sort');
      if (limit) sp.set('limit', limit);
      if (sort) sp.set('sort', sort);
    }
  }
  let body: any = null;
  if (bodyText) {
    try { body = JSON.parse(bodyText); } catch { body = bodyText; }
  }

  const ok = (data: any, status = 200) => ({ status, data });
  const err = (msg: string, status = 400) => ({ status, data: { error: msg } });

  // Run schema validation for requests with body payload (POST, PUT, PATCH)
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    try {
      validatePayload(method, path, body);
    } catch (errVal: any) {
      return err(errVal.message || 'Validation failed', 400);
    }
  }

  try {
    // ── Auth ────────────────────────────────────────────────────────────────
    if (path === '/api/auth/login' && method === 'POST') {
      const users = getStorageItem<any[]>('local_db_users', []);
      const found = users.find(u => u.email === body?.email);
      if (!found) return err('No account found with this email', 401);
      if (found.password !== body?.password) return err('Invalid password', 401);
      const user = { id: found.id, email: found.email, name: found.name };
      localStorage.setItem('access_token', 'mock-session-token');
      setStorageItem('current_user', user);
      localStorage.removeItem('explicit_logout');
      return ok(user);
    }
    if (path === '/api/auth/register' && method === 'POST') {
      const users = getStorageItem<any[]>('local_db_users', []);
      const existing = users.find(u => u.email === body?.email);
      if (existing) return err('An account with this email already exists', 409);
      const newUser = {
        id: nextId('users'),
        email: body?.email,
        name: body?.email?.split('@')[0],
        password: body?.password
      };
      users.push(newUser);
      setStorageItem('local_db_users', users);
      const user = { id: newUser.id, email: newUser.email, name: newUser.name };
      localStorage.setItem('access_token', 'mock-register-token');
      setStorageItem('current_user', user);
      localStorage.removeItem('explicit_logout');
      return ok({ success: true, access_token: 'mock-register-token', user });
    }
    if (path === '/api/auth/check-user' && method === 'POST') {
      const users = getStorageItem<any[]>('local_db_users', []);
      const found = users.find(u => u.email === body?.email);
      if (!found) return err('No account found with this email address', 404);
      return ok({ exists: true, email: found.email });
    }
    if (path === '/api/auth/reset-password-request' && method === 'POST') return ok({ success: true });
    if (path === '/api/auth/reset-password' && method === 'POST') {
      const users = getStorageItem<any[]>('local_db_users', []);
      const idx = users.findIndex(u => u.email === body?.email);
      if (idx === -1) return err('No account found with this email address', 404);
      if (users[idx].password === body?.password) {
        return err('New password cannot be the same as your current password', 400);
      }
      users[idx].password = body?.password;
      setStorageItem('local_db_users', users);
      return ok({ success: true });
    }
    if (path === '/api/auth/me' && method === 'GET') {
      const token = localStorage.getItem('access_token');
      if (!token) return err('Unauthorized', 401);
      const user = getStorageItem<any>('current_user', null);
      if (!user) return err('Unauthorized', 401);
      return ok(user);
    }
    if (path === '/api/auth/logout' && method === 'POST') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('current_user');
      localStorage.setItem('explicit_logout', 'true');
      return ok({ success: true });
    }

    // ── Projects ────────────────────────────────────────────────────────────
    if (path === '/api/app/projects' && method === 'GET') {
      const includeDeleted = originalSp.get('deleted') === 'true';
      return ok(handleDB.projects.list(sp.get('sort') || undefined, includeDeleted));
    }
    if (path === '/api/app/projects' && method === 'POST')
      return ok(handleDB.projects.create(body), 201);
    if (path.startsWith('/api/app/projects/') && path.endsWith('/restore') && method === 'POST') {
      const parts = path.split('/');
      const id = parts[parts.length - 2];
      return ok(handleDB.projects.restore(id));
    }
    if (path.startsWith('/api/app/projects/') && method === 'PUT')
      return ok(handleDB.projects.update(path.split('/').pop()!, body));
    if (path.startsWith('/api/app/projects/') && method === 'DELETE')
      return ok(handleDB.projects.delete(path.split('/').pop()!));

    // ── Tasks ───────────────────────────────────────────────────────────────
    if (path === '/api/app/tasks' && method === 'GET') {
      const includeDeleted = originalSp.get('deleted') === 'true';
      return ok(handleDB.tasks.list(sp.get('sort') || undefined, includeDeleted));
    }
    if (path === '/api/app/tasks' && method === 'POST')
      return ok(handleDB.tasks.create(body), 201);
    if (path.startsWith('/api/app/tasks/') && path.endsWith('/restore') && method === 'POST') {
      const parts = path.split('/');
      const id = parts[parts.length - 2];
      try {
        return ok(handleDB.tasks.restore(id));
      } catch (e: any) {
        return err(e.message || 'Failed to restore task', 400);
      }
    }
    if (path.startsWith('/api/app/tasks/') && method === 'PUT')
      return ok(handleDB.tasks.update(path.split('/').pop()!, body));
    if (path.startsWith('/api/app/tasks/') && method === 'DELETE')
      return ok(handleDB.tasks.delete(path.split('/').pop()!));

    // ── Documents ───────────────────────────────────────────────────────────
    if (path === '/api/app/documents' && method === 'GET') {
      const includeDeleted = originalSp.get('deleted') === 'true';
      return ok(handleDB.documents.list(includeDeleted));
    }
    if (path === '/api/app/documents' && method === 'POST')
      return ok(handleDB.documents.create(body), 201);
    if (path.startsWith('/api/app/documents/') && path.endsWith('/restore') && method === 'POST') {
      const parts = path.split('/');
      const id = parts[parts.length - 2];
      try {
        return ok(handleDB.documents.restore(id));
      } catch (e: any) {
        return err(e.message || 'Failed to restore document', 400);
      }
    }
    if (path.startsWith('/api/app/documents/') && method === 'PUT')
      return ok(handleDB.documents.update(path.split('/').pop()!, body));
    if (path.startsWith('/api/app/documents/') && method === 'DELETE')
      return ok(handleDB.documents.delete(path.split('/').pop()!));

    // ── Activity ────────────────────────────────────────────────────────────
    if (path === '/api/app/activity' && method === 'GET') {
      const limit = Number(sp.get('limit')) || 50;
      let list = getStorageItem<any[]>('local_db_activities', []);
      list = [...list].sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
      const formattedList = list.slice(0, limit).map(act => ({
        ...act,
        details: formatDetailsText(act.details)
      }));
      return ok(formattedList);
    }


    // ── Upload ──────────────────────────────────────────────────────────────
    if (path === '/api/app/upload' && method === 'POST')
      return ok({ file_url: '/placeholder.png' }, 201);

    // ── Landing ─────────────────────────────────────────────────────────────
    if (path === '/api/landing/overview')  return ok({ overview: { name: 'PW-Core Workspace', version: '1.0.0' } });
    if (path === '/api/landing/modules')   return ok({ modules: ['App', 'QA Playground', 'Swagger'] });
    if (path === '/api/landing/component-matrix') return ok({ matrix: [{ component: 'Inputs', page: 'Playground' }] });
    if (path === '/api/landing/architecture')     return ok({ layers: ['UI', 'Fake APIs', 'localStorage', 'Service Worker'] });

    // ── QA ──────────────────────────────────────────────────────────────────
    if (path === '/api/qa/inputs')         return ok({ fields: ['text', 'password', 'number'] });
    if (path === '/api/qa/selectors')      return ok({ types: ['checkbox', 'radio', 'dropdown'] });
    if (path === '/api/qa/tables')         return ok({ rows: 5, columns: 4 });
    if (path === '/api/qa/dynamic-content')return ok({ items: ['Item A', 'Item B', 'Item C'] });
    if (path === '/api/qa/network-failure')return ok({ error: 'ERR_CONNECTION_REFUSED' }, 500);

    // ── Swagger meta ─────────────────────────────────────────────────────────
    if (path === '/api/swagger/openapi')   return ok({ openapi: '3.0.0', info: { title: 'PW-Core Workspace API', version: '1.0.0' } });
    if (path === '/api/swagger/endpoints') return ok({ count: 30 });
    if (path === '/api/swagger/models')    return ok({ models: ['Project', 'Task', 'Document', 'Activity'] });

    return err(`Not found: ${method} ${path}`, 404);
  } catch (e: any) {
    console.error('[Fake API]', e);
    return { status: 500, data: { error: e.message || 'Internal server error' } };
  }
};

// ── Service Worker Registration ────────────────────────────────────────────────
// The SW intercepts /api/* fetch calls, posts them here, and we reply with
// data from localStorage — making every call visible in the Network tab.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      console.log('[PW-Core] Service Worker registered — API calls now visible in Network tab', reg.scope);
      reg.update().catch(() => {});
      // Fall back to fetch intercept if the page isn't controlled by the service worker yet (e.g. first load)
      if (!navigator.serviceWorker.controller) {
        installFetchFallback();
      }
    }).catch((err) => {
      console.warn('[PW-Core] Service Worker registration failed, falling back to window.fetch intercept', err);
      installFetchFallback();
    });

    // Handle messages from the SW: it sends us the request, we run the router,
    // then post the response back so the SW can resolve the fetch.
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data?.type !== 'FAKE_API_REQUEST') return;
      const { id, method, path, search, body } = event.data;
      console.log(`[Fake API] ${method} ${path}`, body ? JSON.parse(body) : '');
      const result = handleFakeApiRequest(method, path, search ?? '', body);
      
      const responder = event.source || navigator.serviceWorker.controller;
      responder?.postMessage({
        type: 'FAKE_API_RESPONSE',
        id,
        status: result.status,
        data: result.data,
      });
    });
  });
} else {
  installFetchFallback();
}

// ── Fallback: window.fetch intercept (if SW not available) ────────────────────
function installFetchFallback() {
  const originalFetch = window.fetch;
  window.fetch = async function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const urlStr = typeof input === 'string' ? input : (input instanceof URL ? input.toString() : (input as Request).url);
    let pathname = "";
    try {
      pathname = new URL(urlStr, window.location.origin).pathname;
    } catch {
      // Ignore invalid URLs
    }
    
    if (pathname.startsWith('/api/')) {
      const url = new URL(urlStr, window.location.origin);
      const bodyText = init?.body != null ? (typeof init.body === 'string' ? init.body : null) : null;
      const result = handleFakeApiRequest(
        (init?.method || 'GET').toUpperCase(),
        url.pathname,
        url.search,
        bodyText
      );
      return new Response(JSON.stringify(result.data), {
        status: result.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return originalFetch(input, init);
  };
}

// ── Client SDK ────────────────────────────────────────────────────────────────
// These methods make real fetch() calls that go through the Service Worker.
export const client = {
  auth: {
    async me(): Promise<any> {
      const res = await fetch('/api/auth/me');
      if (!res.ok) throw { status: res.status, message: 'Unauthorized' };
      return res.json();
    },
    async loginViaEmailPassword(email: string, password: string): Promise<any> {
      const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Login failed');
      }
      return res.json();
    },
    async loginWithProvider(provider: string, _: string): Promise<void> {
      await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email: `${provider}-user@example.com` }) });
      window.location.href = '/';
    },
    async logout(redirectUrl?: string): Promise<void> {
      await fetch('/api/auth/logout', { method: 'POST' });
      if (redirectUrl) window.location.href = '/login';
    },
    async register(payload: { email: string; password?: string }): Promise<any> {
      const res = await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Registration failed');
      }
      return res.json();
    },

    async checkUser(email: string): Promise<any> {
      const res = await fetch('/api/auth/check-user', { method: 'POST', body: JSON.stringify({ email }) });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'User not found');
      }
      return res.json();
    },
    async resetPasswordRequest(email: string): Promise<any> {
      const res = await fetch('/api/auth/reset-password-request', { method: 'POST', body: JSON.stringify({ email }) });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Password reset request failed');
      }
      return res.json();
    },
    async resetPassword(payload: { email: string; password: string }): Promise<any> {
      const res = await fetch('/api/auth/reset-password', { method: 'POST', body: JSON.stringify(payload) });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Password reset failed');
      }
      return res.json();
    },
    redirectToLogin(_?: string): void { window.location.href = '/login'; },
    setToken(token: string): void { localStorage.setItem('access_token', token); }
  },

  entities: {
    Project: {
      async list(sort?: string, deleted?: boolean) {
        const queryParams = [];
        if (sort) queryParams.push(`sort=${sort}`);
        if (deleted) queryParams.push(`deleted=true`);
        const queryStr = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
        const res = await fetch(`/api/app/projects${queryStr}`);
        return res.json();
      },
      async create(payload: any) {
        const res = await fetch('/api/app/projects', { method: 'POST', body: JSON.stringify(payload) });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to create project');
        }
        return res.json();
      },
      async update(id: string, payload: any) {
        const res = await fetch(`/api/app/projects/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to update project');
        }
        return res.json();
      },
      async delete(id: string) {
        const res = await fetch(`/api/app/projects/${id}`, { method: 'DELETE' });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to delete project');
        }
        return res.json();
      },
      async restore(id: string) {
        const res = await fetch(`/api/app/projects/${id}/restore`, { method: 'POST' });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to restore project');
        }
        return res.json();
      }
    },
    Task: {
      async list(sort?: string, deleted?: boolean) {
        const queryParams = [];
        if (sort) queryParams.push(`sort=${sort}`);
        if (deleted) queryParams.push(`deleted=true`);
        const queryStr = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
        const res = await fetch(`/api/app/tasks${queryStr}`);
        return res.json();
      },
      async create(payload: any) {
        const res = await fetch('/api/app/tasks', { method: 'POST', body: JSON.stringify(payload) });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to create task');
        }
        return res.json();
      },
      async update(id: string, payload: any) {
        const res = await fetch(`/api/app/tasks/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to update task');
        }
        return res.json();
      },
      async delete(id: string) {
        const res = await fetch(`/api/app/tasks/${id}`, { method: 'DELETE' });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to delete task');
        }
        return res.json();
      },
      async restore(id: string) {
        const res = await fetch(`/api/app/tasks/${id}/restore`, { method: 'POST' });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to restore task');
        }
        return res.json();
      }
    },
    Activity: {
      async list(sort?: string, limit?: number) {
        const res = await fetch(`/api/app/activity?limit=${limit || 50}${sort ? `&sort=${sort}` : ''}`);
        return res.json();
      }
    },
    Document: {
      async list(deleted?: boolean): Promise<any[]> {
        const query = deleted ? '?deleted=true' : '';
        return (await fetch(`/api/app/documents${query}`)).json();
      },
      async create(payload: any) {
        const res = await fetch('/api/app/documents', { method: 'POST', body: JSON.stringify(payload) });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to create document');
        }
        return res.json();
      },
      async delete(id: string) {
        const res = await fetch(`/api/app/documents/${id}`, { method: 'DELETE' });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to delete document');
        }
        return res.json();
      },
      async update(id: string, payload: any) {
        const res = await fetch(`/api/app/documents/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to update document');
        }
        return res.json();
      },
      async restore(id: string) {
        const res = await fetch(`/api/app/documents/${id}/restore`, { method: 'POST' });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to restore document');
        }
        return res.json();
      }
    }
  },

  integrations: {
    Core: {
      async UploadFile({ file }: { file: File }): Promise<{ file_url: string }> {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/app/upload', { method: 'POST', body: formData });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to upload file');
        }
        return res.json();
      }
    }
  }
};
