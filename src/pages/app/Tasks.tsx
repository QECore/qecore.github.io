// @ts-nocheck
import React, { useState, useEffect } from "react";
import { client } from "@/api/client";
import { Plus, Trash2, Pencil, ArrowUpDown, ArrowUp, ArrowDown, Calendar as CalendarIcon, CloudUpload, FileText } from "lucide-react";
import SkeuCard from "../../components/shared/SkueCard";
import SkeuButton from "../../components/shared/SkueButton";
import StatusBadge from "../../components/shared/StatusBadge";
import FilterBar from "../../components/shared/FilterBar";
import { TruncatedCell } from "../../components/shared/TruncatedCell";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/Sheet";
import { Calendar as CalendarComponent } from "@/components/ui/Calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/Popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/AuthContext";

const emptyTask = { title: "", description: "", status: "todo", priority: "medium", assignee: "", due_date: "", project_id: "" };

export default function Tasks() {
  const { user } = useAuth();
  const userKey = user?.email || "anonymous";

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyTask);
  const [sortField, setSortField] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const { toast } = useToast();

  const [documents, setDocuments] = useState([]);
  const [stagedFiles, setStagedFiles] = useState([]);
  const [deletedDocIds, setDeletedDocIds] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = React.useRef(null);

  const load = async () => {
    const [tasksData, projectsData, documentsData] = await Promise.all([
      client.entities.Task.list("-created_date", true),
      client.entities.Project.list("-created_date", true),
      client.entities.Document.list()
    ]);
    setTasks(tasksData);
    setProjects(projectsData);
    setDocuments(documentsData);
    setLoading(false);
  };

  const handleRestore = async (id: any) => {
    try {
      await client.entities.Task.restore(id);
      toast({ title: "Task restored successfully" });
      load();
    } catch (e: any) {
      alert(e.message || "Project must be restored before you restore the task");
      toast({ title: "Error", description: e.message || "Project must be restored before you restore the task", variant: "destructive" });
    }
  };

  useEffect(() => {
    if (userKey) {
      load();
    }
  }, [userKey]);

  useEffect(() => {
    if (userKey && userKey !== "anonymous") {
      const savedSearch = localStorage.getItem(`${userKey}_tasks_search`);
      if (savedSearch !== null) setSearch(savedSearch);
      
      try {
        const savedFilters = localStorage.getItem(`${userKey}_tasks_filters`);
        if (savedFilters !== null) setActiveFilters(JSON.parse(savedFilters));
      } catch {
        // Ignore invalid saved filters
      }
    }
  }, [userKey]);

  useEffect(() => {
    if (userKey) {
      localStorage.setItem(`${userKey}_tasks_search`, search);
    }
  }, [search, userKey]);

  useEffect(() => {
    if (userKey) {
      localStorage.setItem(`${userKey}_tasks_filters`, JSON.stringify(activeFilters));
    }
  }, [activeFilters, userKey]);

  const uniqueTitles = Array.from(new Set(tasks.map(t => t.title))).filter(Boolean);
  const uniqueStatuses = Array.from(new Set(tasks.map(t => t.status))).filter(Boolean);
  const uniquePriorities = Array.from(new Set(tasks.map(t => t.priority))).filter(Boolean);
  const uniqueAssignees = Array.from(new Set(tasks.map(t => t.assignee))).filter(Boolean);
  const uniqueProjectIds = Array.from(new Set(tasks.map(t => t.project_id))).filter(Boolean);
  const projectOptions = uniqueProjectIds.map(pid => {
    const p = projects.find(proj => proj.id === pid);
    return { value: String(pid), label: p ? p.title : `Project ${pid}` };
  });

  const filterConfig = [
    { key: "title", label: "Title", type: "options", options: uniqueTitles.map(t => ({ value: t, label: t })) },
    { key: "project_id", label: "Project", type: "options", options: projectOptions },
    { key: "status", label: "Status", type: "options", options: uniqueStatuses.map(s => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) })) },
    { key: "priority", label: "Priority", type: "options", options: uniquePriorities.map(p => ({ value: p, label: p.charAt(0).toUpperCase() + p.slice(1) })) },
    { key: "assignee", label: "Assignee", type: "options", options: uniqueAssignees.map(a => ({ value: a, label: a })) },
    { key: "due_date", label: "Due Date", type: "date" }
  ];

  const filtered = tasks.filter((t) => {
    if (activeTab === "active" ? t.deleted : !t.deleted) return false;
    
    // General text search checks title, assignee, and description
    if (search) {
      const s = search.toLowerCase();
      const matchSearch = 
        t.title.toLowerCase().includes(s) || 
        (t.assignee || "").toLowerCase().includes(s) || 
        (t.description || "").toLowerCase().includes(s);
      if (!matchSearch) return false;
    }
    
    // Dynamic filters
    for (const [key, value] of Object.entries(activeFilters)) {
      if (!value || (Array.isArray(value) && value.length === 0)) continue;
      
      if (key === "due_date") {
        if (t.due_date !== value) return false;
      } else if (key === "project_id") {
        if (!(value as string[]).includes(String(t.project_id))) return false;
      } else {
        if (!(value as string[]).includes(String(t[key]))) return false;
      }
    }
    return true;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      if (sortAsc) {
        setSortAsc(false);
      } else {
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 ml-1.5 inline-block text-muted-foreground/40 group-hover:text-muted-foreground transition-colors shrink-0" />;
    }
    return sortAsc ? (
      <ArrowUp className="w-3 h-3 ml-1.5 inline-block text-foreground shrink-0" />
    ) : (
      <ArrowDown className="w-3 h-3 ml-1.5 inline-block text-foreground shrink-0" />
    );
  };

  const priorityWeight = { low: 1, medium: 2, high: 3, critical: 4 };
  const statusWeight = { todo: 1, in_progress: 2, review: 3, done: 4 };

  const sortedTasks = [...filtered].sort((a, b) => {
    if (!sortField) return 0;
    let valA = "";
    let valB = "";

    if (sortField === "id") {
      valA = Number(a.id) || 0;
      valB = Number(b.id) || 0;
    } else if (sortField === "title") {
      valA = a.title || "";
      valB = b.title || "";
    } else if (sortField === "project") {
      const projA = projects.find(p => p.id === a.project_id);
      const projB = projects.find(p => p.id === b.project_id);
      valA = projA ? projA.title : "";
      valB = projB ? projB.title : "";
    } else if (sortField === "status") {
      valA = statusWeight[a.status] || 0;
      valB = statusWeight[b.status] || 0;
    } else if (sortField === "priority") {
      valA = priorityWeight[a.priority] || 0;
      valB = priorityWeight[b.priority] || 0;
    } else if (sortField === "assignee") {
      valA = a.assignee || "";
      valB = b.assignee || "";
    } else if (sortField === "due_date") {
      valA = a.due_date || "";
      valB = b.due_date || "";
    } else if (sortField === "description") {
      valA = a.description || "";
      valB = b.description || "";
    }

    if (typeof valA === "string" && typeof valB === "string") {
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  const handleRestoreAll = async () => {
    const tasksToRestore = [...sortedTasks];
    if (tasksToRestore.length === 0) return;
    
    let restoredCount = 0;
    const failedTasks: string[] = [];
    
    for (const t of tasksToRestore) {
      try {
        await client.entities.Task.restore(t.id);
        restoredCount++;
      } catch (e: any) {
        failedTasks.push(`${t.title} (${e.message || "Parent project must be restored first"}`);
      }
    }
    
    if (restoredCount > 0) {
      toast({ title: "Tasks restored", description: `${restoredCount} task(s) restored successfully.` });
    }
    
    if (failedTasks.length > 0) {
      alert(`Could not restore some tasks:\n${failedTasks.join("\n")}`);
    }
    
    await load();
  };

  const handleDeleteAll = () => {
    if (sortedTasks.length === 0) return;
    setBulkDeleteOpen(true);
  };

  const confirmDeleteAll = async () => {
    setBulkDeleteOpen(false);
    const tasksToDelete = [...sortedTasks];
    if (tasksToDelete.length === 0) return;
    
    let deletedCount = 0;
    for (const t of tasksToDelete) {
      try {
        await client.entities.Task.delete(t.id);
        deletedCount++;
      } catch (e: any) {
        console.error(`Failed to delete task ${t.id}:`, e);
      }
    }
    if (deletedCount > 0) {
      toast({ title: "Tasks deleted", description: `${deletedCount} task(s) moved to trash.` });
    }
    await load();
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyTask, project_id: projects.length > 0 ? String(projects[0].id) : "" });
    setStagedFiles([]);
    setDeletedDocIds([]);
    setDrawerOpen(true);
  };

  const openEdit = (t) => {
    setEditing(t);
    setForm({
      title: t.title,
      description: t.description || "",
      status: t.status,
      priority: t.priority,
      assignee: t.assignee || "",
      due_date: t.due_date || "",
      project_id: t.project_id ? String(t.project_id) : "",
    });
    setStagedFiles([]);
    setDeletedDocIds([]);
    setDrawerOpen(true);
  };

  const handleDeleteDoc = (docId) => {
    setDeletedDocIds(prev => [...prev, docId]);
    toast({ title: "Attachment marked for removal" });
  };

  const handleRemoveStagedFile = (idx) => {
    setStagedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleUploadFiles = async (files) => {
    if (!files?.length) return;

    // Collect names of existing (non-deleted) docs for this task
    const existingNames = new Set(
      editing
        ? documents
            .filter(d => String(d.task_id) === String(editing.id) && !deletedDocIds.includes(d.id))
            .map(d => d.name.toLowerCase())
        : []
    );
    // Also include already-staged file names
    stagedFiles.forEach(f => existingNames.add(f.name.toLowerCase()));

    const duplicates = [];
    const newFiles = [];
    for (const file of files) {
      if (existingNames.has(file.name.toLowerCase())) {
        duplicates.push(file.name);
      } else {
        newFiles.push(file);
        existingNames.add(file.name.toLowerCase()); // prevent dupes within the same batch
      }
    }

    if (duplicates.length > 0) {
      toast({
        title: "Duplicate file(s) skipped",
        description: duplicates.join(", "),
        variant: "destructive",
      });
    }
    if (newFiles.length > 0) {
      setStagedFiles(prev => [...prev, ...newFiles]);
      toast({ title: `${newFiles.length} file(s) staged` });
    }
  };

  const save = async () => {
    if (!form.title.trim() || !form.project_id) {
      toast({ title: "Validation Error", description: "Title and Project are required.", variant: "destructive" });
      return;
    }
    const payload = {
      title: form.title,
      description: form.description,
      status: form.status,
      priority: form.priority,
      assignee: form.assignee,
      due_date: form.due_date || null,
      project_id: Number(form.project_id),
    };

    setUploading(true);
    try {
      let taskId = editing?.id;
      let projectId = Number(form.project_id);

      if (editing) {
        await client.entities.Task.update(editing.id, payload);
      } else {
        const newTask = await client.entities.Task.create(payload);
        taskId = newTask.id;
        projectId = Number(newTask.project_id);
      }

      if (deletedDocIds.length > 0) {
        for (const docId of deletedDocIds) {
          await client.entities.Document.delete(docId);
        }
      }

      if (stagedFiles.length > 0) {
        for (const file of stagedFiles) {
          const { file_url } = await client.integrations.Core.UploadFile({ file });
          await client.entities.Document.create({
            name: file.name,
            file_url,
            file_type: file.type || "unknown",
            file_size: file.size,
            task_id: Number(taskId),
            project_id: projectId
          });
        }
      }

      toast({ title: editing ? "Task updated" : "Task created" });
      setDrawerOpen(false);
      load();
    } catch (err) {
      console.error(err);
      toast({ title: "Error saving task", description: err.message || "Failed to save task", variant: "destructive" });
    } finally {
      setUploading(false);
      setStagedFiles([]);
      setDeletedDocIds([]);
    }
  };

  const updateStatus = async (task, newStatus) => {
    await client.entities.Task.update(task.id, { status: newStatus });
    load();
  };

  const deleteTask = async (id) => {
    await client.entities.Task.delete(id);
    toast({ title: "Task deleted" });
    load();
  };

  const handleFilterChange = (key, values) => setActiveFilters(prev => ({ ...prev, [key]: values }));
  const handleRemoveFilter = (key) => setActiveFilters(prev => { const n = { ...prev }; delete n[key]; return n; });

  const hasActiveFilters = search.trim() !== "" || Object.values(activeFilters).some(val => Array.isArray(val) ? val.length > 0 : !!val);

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-6 h-6 border-2 border-muted border-t-foreground rounded-full animate-spin" /></div>;
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl tracking-tight">Tasks</h1>
          <p className="text-sm text-muted-foreground mt-1">Track and manage work items</p>
        </div>
        {activeTab === "active" && (
          <SkeuButton id="new-task-button" data-test-id="new-task-button" data-testid="new-task-button" variant="primary" onClick={openCreate}>
            <Plus className="w-4 h-4" /> New Task
          </SkeuButton>
        )}
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <button
            id="tab-active"
            data-test-id="tab-active"
            data-testid="tab-active"
            onClick={() => setActiveTab("active")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === "active"
                ? "active bg-accent/15 text-accent shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Active
          </button>
          <button
            id="tab-deleted"
            data-test-id="tab-deleted"
            data-testid="tab-deleted"
            onClick={() => setActiveTab("deleted")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === "deleted"
                ? "active bg-accent/15 text-accent shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Deleted
          </button>
        </div>
        <div className="flex gap-2">
          {activeTab === "active" && sortedTasks.length > 0 && (
            <SkeuButton id="delete-all-tasks" data-test-id="delete-all-tasks" data-testid="delete-all-tasks" variant="destructive" onClick={handleDeleteAll}>
              {hasActiveFilters ? "Delete Filtered" : "Delete All"}
            </SkeuButton>
          )}
          {activeTab === "deleted" && sortedTasks.length > 0 && (
            <SkeuButton id="restore-all-tasks" data-test-id="restore-all-tasks" data-testid="restore-all-tasks" variant="primary" onClick={handleRestoreAll}>
              {hasActiveFilters ? "Restore Filtered" : "Restore All"}
            </SkeuButton>
          )}
        </div>
      </div>

      <div className="mb-5">
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search tasks…"
          filterConfig={filterConfig}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onRemoveFilter={handleRemoveFilter}
        />
      </div>

      <SkeuCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40 select-none">
              <th id="sort-tasks-id" data-test-id="sort-tasks-id" data-testid="sort-tasks-id" onClick={() => handleSort("id")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider w-20 cursor-pointer hover:bg-muted/15 group">
                <span className="flex items-center">Id {renderSortIcon("id")}</span>
              </th>
              <th id="sort-tasks-title" data-test-id="sort-tasks-title" data-testid="sort-tasks-title" onClick={() => handleSort("title")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider cursor-pointer hover:bg-muted/15 group">
                <span className="flex items-center">Title {renderSortIcon("title")}</span>
              </th>
              <th id="sort-tasks-project" data-test-id="sort-tasks-project" data-testid="sort-tasks-project" onClick={() => handleSort("project")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider cursor-pointer hover:bg-muted/15 group">
                <span className="flex items-center">Project {renderSortIcon("project")}</span>
              </th>
              <th id="sort-tasks-status" data-test-id="sort-tasks-status" data-testid="sort-tasks-status" onClick={() => handleSort("status")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider hidden sm:table-cell cursor-pointer hover:bg-muted/15 group">
                <span className="flex items-center">Status {renderSortIcon("status")}</span>
              </th>
              <th id="sort-tasks-priority" data-test-id="sort-tasks-priority" data-testid="sort-tasks-priority" onClick={() => handleSort("priority")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider hidden sm:table-cell cursor-pointer hover:bg-muted/15 group">
                <span className="flex items-center">Priority {renderSortIcon("priority")}</span>
              </th>
              <th id="sort-tasks-assignee" data-test-id="sort-tasks-assignee" data-testid="sort-tasks-assignee" onClick={() => handleSort("assignee")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider hidden md:table-cell cursor-pointer hover:bg-muted/15 group">
                <span className="flex items-center">Assignee {renderSortIcon("assignee")}</span>
              </th>
              <th id="sort-tasks-due_date" data-test-id="sort-tasks-due_date" data-testid="sort-tasks-due_date" onClick={() => handleSort("due_date")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider hidden lg:table-cell cursor-pointer hover:bg-muted/15 group">
                <span className="flex items-center">Due Date {renderSortIcon("due_date")}</span>
              </th>
              <th id="sort-tasks-description" data-test-id="sort-tasks-description" data-testid="sort-tasks-description" onClick={() => handleSort("description")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider hidden lg:table-cell cursor-pointer hover:bg-muted/15 group">
                <span className="flex items-center">Description {renderSortIcon("description")}</span>
              </th>
              <th className="px-4 py-2.5 w-20"></th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.length === 0 ? (
              <tr><td colSpan={9} className="px-4 py-8 text-center text-muted-foreground text-sm">No tasks found</td></tr>
            ) : sortedTasks.map((t) => {
              const project = projects.find(p => p.id === t.project_id);
              const projectTitle = project ? project.title : "—";
              return (
              <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground w-12">{t.id}</td>
                <td className="px-4 py-3 font-medium">
                  <TruncatedCell>{t.title}</TruncatedCell>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs">
                  <TruncatedCell>{projectTitle}</TruncatedCell>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <Select value={t.status} onValueChange={(v) => updateStatus(t, v)}>
                    <SelectTrigger id={`inline-task-status-${t.id}`} data-test-id={`inline-task-status-${t.id}`} data-testid={`inline-task-status-${t.id}`} className="border-0 p-0 h-auto shadow-none w-auto"><StatusBadge status={t.status} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell"><StatusBadge status={t.priority} /></td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                  <TruncatedCell>{t.assignee || "—"}</TruncatedCell>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{t.due_date || "—"}</td>
                <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                  <TruncatedCell>{t.description || "—"}</TruncatedCell>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    {activeTab === "active" ? (
                      <>
                        <button id={`edit-task-${t.id}`} data-test-id={`edit-task-${t.id}`} data-testid={`edit-task-${t.id}`} onClick={() => openEdit(t)} className="p-1.5 hover:bg-muted rounded-md transition-colors"><Pencil className="w-3.5 h-3.5 text-muted-foreground" /></button>
                        <button id={`delete-task-${t.id}`} data-test-id={`delete-task-${t.id}`} data-testid={`delete-task-${t.id}`} onClick={() => deleteTask(t.id)} className="p-1.5 hover:bg-destructive/10 rounded-md transition-colors"><Trash2 className="w-3.5 h-3.5 text-destructive" /></button>
                      </>
                    ) : (
                      <button id={`restore-task-${t.id}`} data-test-id={`restore-task-${t.id}`} data-testid={`restore-task-${t.id}`} onClick={() => handleRestore(t.id)} className="px-2 py-1 text-xs bg-accent/10 hover:bg-accent/20 text-accent rounded border border-accent/20 transition-colors">Restore</button>
                    )}
                  </div>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
        </div>
      </SkeuCard>

      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent side="right" className="skeu-card h-full w-full sm:max-w-md overflow-y-auto">
          <SheetHeader><SheetTitle className="font-heading">{editing ? "Edit Task" : "New Task"}</SheetTitle></SheetHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Title *</label>
              <input id="form-title" data-test-id="form-title" data-testid="form-title" className="skeu-input w-full px-3 py-2 text-sm" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} placeholder="Task title" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Description</label>
              <textarea id="form-description" data-test-id="form-description" data-testid="form-description" className="skeu-input w-full px-3 py-2 text-sm min-h-[60px] resize-none" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} placeholder="Optional description" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Project *</label>
              <Select value={form.project_id ? String(form.project_id) : ""} onValueChange={(v) => setForm({...form, project_id: v})}>
                <SelectTrigger id="form-project" data-test-id="form-project" data-testid="form-project" className="skeu-input">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((p) => (
                    <SelectItem key={p.id} value={String(p.id)}>{p.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Status</label>
                <Select value={form.status} onValueChange={(v) => setForm({...form, status: v})}>
                  <SelectTrigger id="form-status" data-test-id="form-status" data-testid="form-status" className="skeu-input"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Priority</label>
                <Select value={form.priority} onValueChange={(v) => setForm({...form, priority: v})}>
                  <SelectTrigger id="form-priority" data-test-id="form-priority" data-testid="form-priority" className="skeu-input"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Assignee</label>
                <input id="form-assignee" data-test-id="form-assignee" data-testid="form-assignee" className="skeu-input w-full px-3 py-2 text-sm" value={form.assignee} onChange={(e) => setForm({...form, assignee: e.target.value})} placeholder="Name" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Due Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      id="form-due-date"
                      data-test-id="form-due-date"
                      data-testid="form-due-date"
                      type="button"
                      className="skeu-input w-full px-3 py-2 text-sm flex items-center justify-between text-left font-normal bg-background hover:bg-muted/10 transition-colors"
                    >
                      <span>
                        {form.due_date ? new Date(form.due_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : "Pick a date"}
                      </span>
                      <CalendarIcon className="h-4 w-4 text-muted-foreground ml-2" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={form.due_date ? new Date(form.due_date) : undefined}
                      onSelect={(date) => {
                        const formatted = date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : "";
                        setForm({ ...form, due_date: formatted });
                      }}
                      captionLayout="dropdown-buttons"
                      fromYear={new Date().getFullYear() - 10}
                      toYear={new Date().getFullYear() + 10}
                      className="rounded-md"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            {/* Attachments Section */}
            <div className="border-t border-border pt-4 mt-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                Attachments
              </label>
              
              {((editing && documents.filter(d => String(d.task_id) === String(editing?.id) && !deletedDocIds.includes(d.id)).length > 0) || stagedFiles.length > 0) && (
                <div className="space-y-1.5 mb-3 max-h-32 overflow-y-auto custom-scrollbar">
                  {editing && documents.filter(d => String(d.task_id) === String(editing?.id) && !deletedDocIds.includes(d.id)).map(doc => (
                    <div key={doc.id} className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg border bg-card/60">
                      <div className="flex items-center gap-1.5 truncate">
                        <FileText className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <span className="truncate" title={doc.name}>{doc.name}</span>
                      </div>
                      <button 
                        id={`delete-doc-${doc.id}`}
                        data-test-id={`delete-doc-${doc.id}`}
                        data-testid={`delete-doc-${doc.id}`}
                        type="button" 
                        onClick={() => handleDeleteDoc(doc.id)} 
                        className="p-1 hover:bg-destructive/15 rounded text-destructive transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {stagedFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg border border-accent/20 bg-accent/5">
                      <div className="flex items-center gap-1.5 truncate">
                        <FileText className="w-3.5 h-3.5 text-accent shrink-0" />
                        <span className="truncate font-medium text-accent" title={file.name}>{file.name} (staged)</span>
                      </div>
                      <button 
                        id={`remove-staged-file-${idx}`}
                        data-test-id={`remove-staged-file-${idx}`}
                        data-testid={`remove-staged-file-${idx}`}
                        type="button" 
                        onClick={() => handleRemoveStagedFile(idx)} 
                        className="p-1 hover:bg-destructive/15 rounded text-destructive transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div
                id="form-upload-dropzone"
                data-test-id="form-upload-dropzone"
                data-testid="form-upload-dropzone"
                className={`border border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${dragOver ? "border-accent bg-accent/5" : "border-border hover:bg-muted/10"}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); handleUploadFiles(Array.from(e.dataTransfer.files)); }}
                onClick={() => fileInputRef.current?.click()}
              >
                <CloudUpload className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                <span className="text-2xs text-muted-foreground block font-medium">
                  {uploading ? "Uploading..." : "Click or drag files here to attach"}
                </span>
              </div>
              <input 
                ref={fileInputRef} 
                type="file" 
                multiple 
                className="hidden" 
                onChange={(e) => { handleUploadFiles(Array.from(e.target.files || [])); e.target.value = ""; }} 
              />
            </div>

            <div className="flex gap-2 pt-2">
              <SkeuButton id="form-save" data-test-id="form-save" data-testid="form-save" variant="primary" className="flex-1" onClick={save}>Save</SkeuButton>
              <SkeuButton id="form-cancel" data-test-id="form-cancel" data-testid="form-cancel" onClick={() => setDrawerOpen(false)}>Cancel</SkeuButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Bulk Delete Confirmation Dialog */}
      <Dialog open={bulkDeleteOpen} onOpenChange={setBulkDeleteOpen}>
        <DialogContent className="skeu-card sm:max-w-sm">
          <DialogHeader><DialogTitle className="font-heading">Delete Tasks</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Are you sure you want to delete <span className="font-medium text-foreground">{sortedTasks.length} task(s)</span>?</p>
          <div className="flex gap-2 mt-4">
            <SkeuButton id="bulk-delete-confirm" data-test-id="bulk-delete-confirm" data-testid="bulk-delete-confirm" variant="destructive" className="flex-1" onClick={confirmDeleteAll}>Delete All</SkeuButton>
            <SkeuButton id="bulk-delete-cancel" data-test-id="bulk-delete-cancel" data-testid="bulk-delete-cancel" onClick={() => setBulkDeleteOpen(false)}>Cancel</SkeuButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}