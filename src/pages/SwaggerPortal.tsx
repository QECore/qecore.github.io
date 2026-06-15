// @ts-nocheck
import React, { useState } from "react";
import { FileCode2, ChevronDown, ChevronRight, Play, Copy, Check } from "lucide-react";
import SkeuCard from "../components/shared/SkueCard";
import SkeuButton from "../components/shared/SkueButton";
import EndpointBadge from "../components/shared/EndpointBadge";

// ─── JSON Syntax Highlighter ─────────────────────────────────────────────────
function colorizeJson(json: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  // Regex to tokenize JSON
  const re = /("(?:\\.|[^"\\])*")\s*(:)|("(?:\\.|[^"\\])*")|(-?\d+\.?\d*(?:[eE][+-]?\d+)?)|(\btrue\b|\bfalse\b|\bnull\b)|([{}[\],])/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyIdx = 0;

  while ((match = re.exec(json)) !== null) {
    // Push any whitespace/newlines between tokens as-is
    if (match.index > lastIndex) {
      tokens.push(<span key={`ws-${keyIdx++}`}>{json.slice(lastIndex, match.index)}</span>);
    }

    const [, keyStr, colon, strVal, numVal, boolNull, punctuation] = match;

    if (keyStr && colon !== undefined) {
      // Object key followed by colon
      tokens.push(<span key={`k-${keyIdx++}`} style={{ color: "#7dd3fc" }}>{keyStr}</span>);
      tokens.push(<span key={`c-${keyIdx++}`} style={{ color: "#94a3b8" }}>{colon}</span>);
    } else if (strVal) {
      tokens.push(<span key={`s-${keyIdx++}`} style={{ color: "#86efac" }}>{strVal}</span>);
    } else if (numVal !== undefined) {
      tokens.push(<span key={`n-${keyIdx++}`} style={{ color: "#fb923c" }}>{numVal}</span>);
    } else if (boolNull) {
      tokens.push(<span key={`b-${keyIdx++}`} style={{ color: "#c084fc" }}>{boolNull}</span>);
    } else if (punctuation) {
      tokens.push(<span key={`p-${keyIdx++}`} style={{ color: "#94a3b8" }}>{punctuation}</span>);
    }

    lastIndex = re.lastIndex;
  }

  if (lastIndex < json.length) {
    tokens.push(<span key={`tail-${keyIdx++}`}>{json.slice(lastIndex)}</span>);
  }

  return tokens;
}

// Color-coded <pre> block — no text wrap, horizontal scroll
function JsonBlock({ value, minHeight }: { value: string; minHeight?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  let pretty = value;
  try {
    pretty = JSON.stringify(JSON.parse(value), null, 2);
  } catch {
    // already formatted or plain text — use as-is
  }

  return (
    <div className="relative group" style={{ minHeight }}>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity px-1.5 py-0.5 rounded text-[10px] font-mono"
        style={{ background: "rgba(255,255,255,0.06)", color: "#a0aec0", border: "1px solid rgba(255,255,255,0.08)" }}
        title="Copy"
      >
        {copied ? <Check className="w-3 h-3 inline" /> : <Copy className="w-3 h-3 inline" />}
      </button>
      <pre
        style={{
          margin: 0,
          padding: "10px 14px",
          fontSize: "11.5px",
          lineHeight: "1.65",
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
          background: "#090909",
          borderRadius: "8px",
          border: "1px solid rgba(255,255,255,0.06)",
          color: "#e2e8f0",
          overflowX: "auto",
          overflowY: "auto",
          whiteSpace: "pre",
          maxHeight: "280px",
          minHeight: minHeight || "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.12) transparent",
        }}
      >
        {colorizeJson(pretty)}
      </pre>
    </div>
  );
}

// ─── API Groups ───────────────────────────────────────────────────────────────
const apiGroups = [
  {
    name: "App",
    base: "/api/app",
    endpoints: [
      { method: "GET", path: "/api/app/activity", desc: "Get activity feed" },
      { method: "GET", path: "/api/app/projects", desc: "List all projects" },
      { method: "POST", path: "/api/app/projects", desc: "Create a project", defaultPayload: { title: "New Swagger Project", description: "Created via Swagger Portal", status: "active", priority: "medium", progress: 50, due_date: "2026-12-31" } },
      { method: "PUT", path: "/api/app/projects/:id", desc: "Update a project", defaultPayload: { title: "Updated Project Title", progress: 95 } },
      { method: "DELETE", path: "/api/app/projects/:id", desc: "Delete a project" },
      { method: "POST", path: "/api/app/projects/:id/restore", desc: "Restore a deleted project" },
      { method: "GET", path: "/api/app/tasks", desc: "List all tasks" },
      { method: "POST", path: "/api/app/tasks", desc: "Create a task", defaultPayload: { title: "Task from Swagger", description: "Created via Swagger", status: "todo", priority: "high", assignee: "Swagger User" } },
      { method: "PUT", path: "/api/app/tasks/:id", desc: "Update a task", defaultPayload: { status: "in_progress" } },
      { method: "DELETE", path: "/api/app/tasks/:id", desc: "Delete a task" },
      { method: "POST", path: "/api/app/tasks/:id/restore", desc: "Restore a deleted task" },
      { method: "GET", path: "/api/app/documents", desc: "List documents" },
      { method: "POST", path: "/api/app/documents", desc: "Upload document", defaultPayload: { name: "swagger_doc.txt", file_url: "blob:http://localhost:5173/mock-uuid", file_type: "text/plain", file_size: 1024 } },
      { method: "DELETE", path: "/api/app/documents/:id", desc: "Delete document" },
    ],
  },
  {
    name: "Auth",
    base: "/api/auth",
    endpoints: [
      { method: "POST", path: "/api/auth/login", desc: "Login with email/password", defaultPayload: { email: "demo@pw-core.app", password: "password123" } },
      { method: "POST", path: "/api/auth/logout", desc: "Logout current user" },
      { method: "GET", path: "/api/auth/me", desc: "Get current authenticated user" },
      { method: "POST", path: "/api/auth/register", desc: "Register new account", defaultPayload: { email: "newuser@example.com", password: "password123" } },
      { method: "POST", path: "/api/auth/reset-password-request", desc: "Request password reset", defaultPayload: { email: "user@example.com" } },
    ],
  },
];

const models = [
  {
    name: "Project",
    fields: {
      id: "string (auto)",
      title: "string (required)",
      description: "string",
      status: "enum: active | paused | completed",
      priority: "enum: low | medium | high | critical",
      progress: "number (0–100)",
      due_date: "date string (YYYY-MM-DD)",
      created_date: "ISO datetime (auto)",
    },
  },
  {
    name: "Task",
    fields: {
      id: "string (auto)",
      title: "string (required)",
      description: "string",
      status: "enum: todo | in_progress | done",
      priority: "enum: low | medium | high | critical",
      assignee: "string",
      project_id: "string (ref: Project.id)",
      due_date: "date string (YYYY-MM-DD)",
      created_date: "ISO datetime (auto)",
    },
  },
  {
    name: "Document",
    fields: {
      id: "string (auto)",
      name: "string (required)",
      file_url: "string (required)",
      file_type: "string (MIME type)",
      file_size: "number (bytes)",
      created_date: "ISO datetime (auto)",
    },
  },
  {
    name: "Activity",
    fields: {
      id: "string (auto)",
      action: "string (created|updated|deleted)",
      entity_type: "string",
      entity_name: "string",
      details: "string",
      actor: "string",
      created_date: "ISO datetime (auto)",
    },
  },
];

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

// ─── EndpointRow ──────────────────────────────────────────────────────────────
function EndpointRow({ ep, isOpen, onToggle }: { ep: any; isOpen: boolean; onToggle: () => void }) {
  const [copied, setCopied] = useState(false);
  const [pathId, setPathId] = useState(ep.path.includes("/:id") ? "proj-1" : "");
  const [queryParams, setQueryParams] = useState("");
  const [payloadText, setPayloadText] = useState(
    ep.defaultPayload ? JSON.stringify(ep.defaultPayload, null, 2) : ""
  );
  const [loading, setLoading] = useState(false);
  const [responseResult, setResponseResult] = useState<any>(null);

  const executeRequest = async () => {
    setLoading(true);
    setResponseResult(null);
    try {
      let finalPath = ep.path;
      if (finalPath.includes("/:id")) finalPath = finalPath.replace("/:id", `/${pathId}`);
      if (queryParams) finalPath = `${finalPath}?${queryParams}`;

      const options: RequestInit = { method: ep.method, headers: { "Content-Type": "application/json" } };

      if (["POST", "PUT", "PATCH"].includes(ep.method) && payloadText) {
        let parsed: any;
        try { parsed = JSON.parse(payloadText); }
        catch (e: any) { throw new Error(`Invalid JSON: ${e.message}`); }
        validatePayload(ep.method, ep.path, parsed);
        options.body = payloadText;
      }

      const res = await fetch(finalPath, options);
      const text = await res.text();
      let body: any;
      try { body = JSON.parse(text); } catch { body = text; }

      setResponseResult({ status: res.status, statusText: res.statusText, body });
    } catch (err: any) {
      setResponseResult({ status: 0, statusText: "Error", body: { error: err.message || "Request failed" } });
    } finally {
      setLoading(false);
    }
  };

  const copyPath = () => {
    navigator.clipboard.writeText(ep.path);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const hasPathParams = ep.path.includes("/:id");
  const hasPayload = ["POST", "PUT", "PATCH"].includes(ep.method);
  const isSuccess = responseResult && responseResult.status >= 200 && responseResult.status < 300;

  return (
    <div className="border-b border-border last:border-0">
      <button
        id={`swagger-endpoint-${ep.method.toLowerCase()}-${ep.path.replace(/[^a-zA-Z0-9]/g, '-')}`}
        data-test-id={`swagger-endpoint-${ep.method.toLowerCase()}-${ep.path.replace(/[^a-zA-Z0-9]/g, '-')}`}
        data-testid={`swagger-endpoint-${ep.method.toLowerCase()}-${ep.path.replace(/[^a-zA-Z0-9]/g, '-')}`}
        onClick={onToggle}
        className="flat-item w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors text-left"
      >
        {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
        <EndpointBadge method={ep.method} />
        <code className="font-mono text-xs flex-1 truncate">{ep.path}</code>
        <span className="text-xs text-muted-foreground hidden sm:inline font-bold">{ep.desc}</span>
      </button>

      {isOpen && (
        <div className="px-4 pt-4 pb-5 ml-8 space-y-4">

          <div className="grid md:grid-cols-2 gap-4">
            {/* ── Parameters Panel ── */}
            <div className="space-y-3 p-3 rounded-lg border border-border bg-muted/10">
              <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Parameters</h4>

              {hasPathParams && (
                <div>
                  <label className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">
                    Path <span style={{ color: "#7dd3fc" }}>:id</span>
                  </label>
                  <input
                    id="swagger-param-id"
                    data-test-id="swagger-param-id"
                    data-testid="swagger-param-id"
                    type="text"
                    value={pathId}
                    onChange={(e) => setPathId(e.target.value)}
                    className="skeu-input w-full px-2 py-1 text-xs font-mono"
                    placeholder="e.g. proj-1"
                  />
                </div>
              )}

              <div>
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Query Params</label>
                <input
                  id="swagger-param-query"
                  data-test-id="swagger-param-query"
                  data-testid="swagger-param-query"
                  type="text"
                  value={queryParams}
                  onChange={(e) => setQueryParams(e.target.value)}
                  className="skeu-input w-full px-2 py-1 text-xs font-mono"
                  placeholder="sort=-created_date&limit=10"
                />
              </div>

              {hasPayload && (
                <div>
                  <label className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1.5">
                    Request Body <span className="normal-case text-muted-foreground/60">(JSON)</span>
                  </label>
                  <div
                    className="relative rounded-lg overflow-hidden"
                    style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <textarea
                      id="swagger-param-body"
                      data-test-id="swagger-param-body"
                      data-testid="swagger-param-body"
                      value={payloadText}
                      onChange={(e) => setPayloadText(e.target.value)}
                      spellCheck={false}
                      style={{
                        display: "block",
                        width: "100%",
                        minHeight: "120px",
                        padding: "10px 14px",
                        fontSize: "11.5px",
                        lineHeight: "1.65",
                        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
                        background: "#090909",
                        color: "#86efac",
                        border: "none",
                        outline: "none",
                        resize: "vertical",
                        whiteSpace: "pre",
                        overflowX: "auto",
                        overflowWrap: "normal",
                        wordBreak: "normal",
                        tabSize: 2,
                        caretColor: "#fff",
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <SkeuButton
                  id={`swagger-execute-${ep.method.toLowerCase()}-${ep.path.replace(/[^a-zA-Z0-9]/g, '-')}`}
                  data-test-id={`swagger-execute-${ep.method.toLowerCase()}-${ep.path.replace(/[^a-zA-Z0-9]/g, '-')}`}
                  data-testid={`swagger-execute-${ep.method.toLowerCase()}-${ep.path.replace(/[^a-zA-Z0-9]/g, '-')}`}
                  variant="primary"
                  className="text-xs"
                  onClick={executeRequest}
                  disabled={loading}
                >
                  <Play className="w-3 h-3" /> {loading ? "Executing…" : "Execute"}
                </SkeuButton>
                <SkeuButton
                  id={`swagger-copy-${ep.method.toLowerCase()}-${ep.path.replace(/[^a-zA-Z0-9]/g, '-')}`}
                  data-test-id={`swagger-copy-${ep.method.toLowerCase()}-${ep.path.replace(/[^a-zA-Z0-9]/g, '-')}`}
                  data-testid={`swagger-copy-${ep.method.toLowerCase()}-${ep.path.replace(/[^a-zA-Z0-9]/g, '-')}`}
                  className="text-xs"
                  onClick={copyPath}
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? "Copied" : "Copy Path"}
                </SkeuButton>
              </div>
            </div>

            {/* ── Response Panel ── */}
            <div
              className="rounded-lg border border-border flex flex-col overflow-hidden"
              style={{ minHeight: "150px", background: "#090909", borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center justify-between px-3 py-2 border-b border-border">
                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Response</h4>
                {responseResult && (
                  <span
                    className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: isSuccess ? "rgba(52,211,153,0.12)" : "rgba(239,68,68,0.12)",
                      color: isSuccess ? "#34d399" : "#f87171",
                    }}
                  >
                    {responseResult.status} {responseResult.statusText}
                  </span>
                )}
              </div>

              {responseResult ? (
                <div className="flex-1 overflow-hidden p-0">
                  <JsonBlock value={JSON.stringify(responseResult.body, null, 2)} />
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-xs text-muted-foreground/50 italic">
                  Click Execute to see the response
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function SwaggerPortal() {
  const [expandedGroup, setExpandedGroup] = useState(apiGroups[0].name);
  const [showModels, setShowModels] = useState(false);
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);

  const handleGroupToggle = (groupName: string) => {
    setExpandedGroup(expandedGroup === groupName ? "" : groupName);
    setExpandedEndpoint(null);
  };

  return (
    <div className="notion-page pb-16">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm">
            <FileCode2 className="w-4 h-4 text-white" />
          </div>
          <h1 className="font-heading font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">Swagger Portal</h1>
        </div>
        <p className="text-sm text-muted-foreground ml-14">
          Interactive API docs — browse endpoints, edit payloads, execute requests, and inspect live responses
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        <SkeuButton 
          id="swagger-tab-endpoints"
          data-test-id="swagger-tab-endpoints"
          data-testid="swagger-tab-endpoints"
          className={!showModels ? "active" : ""} 
          onClick={() => setShowModels(false)}
        >
          Endpoints
        </SkeuButton>
        <SkeuButton 
          id="swagger-tab-models"
          data-test-id="swagger-tab-models"
          data-testid="swagger-tab-models"
          className={showModels ? "active" : ""} 
          onClick={() => setShowModels(true)}
        >
          Models
        </SkeuButton>
      </div>

      {!showModels ? (
        <div className="space-y-4">
          {apiGroups.map((group) => (
            <SkeuCard key={group.name} className="flat-menu p-0 overflow-hidden">
              <button
                id={`swagger-group-${group.name.toLowerCase()}`}
                data-test-id={`swagger-group-${group.name.toLowerCase()}`}
                data-testid={`swagger-group-${group.name.toLowerCase()}`}
                onClick={() => handleGroupToggle(group.name)}
                className="flat-item w-full flex items-center justify-between px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {expandedGroup === group.name ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  <span className="font-heading font-semibold text-sm">{group.name}</span>
                  <span className="text-xs text-muted-foreground font-mono">{group.base}</span>
                </div>
                <span className="text-xs text-muted-foreground">{group.endpoints.length} endpoints</span>
              </button>
              {expandedGroup === group.name && (
                <div>
                  {group.endpoints.map((ep, i) => {
                    const epKey = `${ep.method}-${ep.path}`;
                    return (
                      <EndpointRow 
                        key={i} 
                        ep={ep} 
                        isOpen={expandedEndpoint === epKey}
                        onToggle={() => setExpandedEndpoint(expandedEndpoint === epKey ? null : epKey)}
                      />
                    );
                  })}
                </div>
              )}
            </SkeuCard>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {models.map((model) => (
            <SkeuCard key={model.name}>
              <h3 className="font-heading font-semibold text-sm mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {model.name}
              </h3>
              <JsonBlock
                value={JSON.stringify(
                  Object.fromEntries(Object.entries(model.fields)),
                  null,
                  2
                )}
              />
            </SkeuCard>
          ))}
        </div>
      )}
    </div>
  );
}