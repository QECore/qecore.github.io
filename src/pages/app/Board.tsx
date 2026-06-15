// @ts-nocheck
import React, { useState, useEffect } from "react";
import { client } from "@/api/client";
import { Plus, Trash2, Pencil, Calendar, User } from "lucide-react";
import SkeuButton from "../../components/shared/SkueButton";
import StatusBadge from "../../components/shared/StatusBadge";
import { TruncatedCell } from "../../components/shared/TruncatedCell";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Calendar as CalendarComponent } from "@/components/ui/Calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/Popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/AuthContext";

const emptyTask = { title: "", description: "", status: "todo", priority: "medium", assignee: "", due_date: "", project_id: "" };

const columns = [
  { id: "todo", label: "To Do", color: "border-t-slate-400 bg-slate-500/5" },
  { id: "in_progress", label: "In Progress", color: "border-t-amber-500 bg-amber-500/5" },
  { id: "review", label: "Review", color: "border-t-indigo-500 bg-indigo-500/5" },
  { id: "done", label: "Done", color: "border-t-emerald-500 bg-emerald-500/5" },
];

export default function Board() {
  const { user } = useAuth();
  const userKey = user?.email || "anonymous";

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyTask);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const { toast } = useToast();

  const load = async () => {
    const [tasksData, projectsData] = await Promise.all([
      client.entities.Task.list("-created_date"),
      client.entities.Project.list("-created_date")
    ]);
    setTasks(tasksData);
    setProjects(projectsData);
    
    const saved = localStorage.getItem(`${userKey}_board_selected_project_id`);
    if (saved && projectsData.some(p => String(p.id) === saved)) {
      setSelectedProjectId(Number(saved));
    } else if (projectsData.length > 0) {
      setSelectedProjectId(projectsData[0].id);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userKey) {
      load();
    }
  }, [userKey]);

  useEffect(() => {
    if (selectedProjectId && userKey) {
      localStorage.setItem(`${userKey}_board_selected_project_id`, String(selectedProjectId));
    }
  }, [selectedProjectId, userKey]);

  const openCreate = (status = "todo") => {
    setEditing(null);
    setForm({ ...emptyTask, status, project_id: selectedProjectId ? String(selectedProjectId) : "" });
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
    setDrawerOpen(true);
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
    if (editing) {
      await client.entities.Task.update(editing.id, payload);
      toast({ title: "Task updated" });
    } else {
      await client.entities.Task.create(payload);
      toast({ title: "Task created" });
    }
    setDrawerOpen(false);
    load();
  };

  const deleteTask = async (id) => {
    await client.entities.Task.delete(id);
    toast({ title: "Task deleted" });
    load();
  };

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDrop = async (e, columnId) => {
    e.preventDefault();
    if (draggedTaskId) {
      const task = tasks.find(t => t.id === draggedTaskId);
      if (task && task.status !== columnId) {
        await client.entities.Task.update(draggedTaskId, { status: columnId });
        toast({ title: `Task moved to ${columns.find(c => c.id === columnId)?.label}` });
        load();
      }
    }
    setDraggedTaskId(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
    setDragOverColumn(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-muted border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  const filteredTasks = tasks.filter((t) => Number(t.project_id) === Number(selectedProjectId));

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-bold text-2xl tracking-tight">Board</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Manage tasks in a visual Kanban board</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Project:</span>
            <Select value={selectedProjectId ? String(selectedProjectId) : ""} onValueChange={(v) => setSelectedProjectId(Number(v))}>
              <SelectTrigger id="board-project-select" data-test-id="board-project-select" data-testid="board-project-select" className="skeu-input w-[200px] h-9 text-xs">
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((p) => (
                  <SelectItem key={p.id} value={String(p.id)}>{p.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <SkeuButton id="new-task-button" data-test-id="new-task-button" data-testid="new-task-button" variant="primary" onClick={() => openCreate("todo")} disabled={!selectedProjectId}>
            <Plus className="w-4 h-4" /> New Task
          </SkeuButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);
          const isOver = dragOverColumn === col.id;

          return (
            <div
              key={col.id}
              id={`board-column-${col.id}`}
              data-test-id={`board-column-${col.id}`}
              data-testid={`board-column-${col.id}`}
              className={`rounded-xl border border-border/80 flex flex-col min-h-[500px] transition-all duration-200 ${col.color} ${
                isOver ? "ring-2 ring-primary/20 border-primary/40 scale-[1.01]" : ""
              }`}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={() => setDragOverColumn(null)}
              onDrop={(e) => handleDrop(e, col.id)}
            >
              {/* Column Header */}
              <div className="p-3 border-b border-border/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    col.id === 'todo' ? 'bg-slate-400' :
                    col.id === 'in_progress' ? 'bg-amber-500' :
                    col.id === 'review' ? 'bg-indigo-500' : 'bg-emerald-500'
                  }`} />
                  <span className="font-heading font-semibold text-xs text-foreground/80 uppercase tracking-wider">
                    {col.label}
                  </span>
                </div>
                <span className="text-xs bg-muted/60 px-2 py-0.5 rounded-full text-muted-foreground font-mono">
                  {colTasks.length}
                </span>
              </div>

              {/* Task Cards List */}
              <div className="p-2 space-y-2.5 flex-1 overflow-y-auto max-h-[600px] scrollbar-thin">
                {colTasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-xs text-muted-foreground/40 border border-dashed border-border/40 rounded-lg m-1">
                    No tasks
                  </div>
                ) : (
                  colTasks.map((t) => (
                    <div
                      key={t.id}
                      id={`board-task-card-${t.id}`}
                      data-test-id={`board-task-card-${t.id}`}
                      data-testid={`board-task-card-${t.id}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, t.id)}
                      onDragEnd={handleDragEnd}
                      className="group relative skeu-card hover:bg-accent/5 dark:hover:bg-slate-800/10 transition-all duration-200 p-3 cursor-grab active:cursor-grabbing"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="font-mono text-[10px] text-muted-foreground">
                          #{t.id}
                        </span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button id={`board-edit-task-${t.id}`} data-test-id={`board-edit-task-${t.id}`} data-testid={`board-edit-task-${t.id}`} onClick={() => openEdit(t)} className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground">
                            <Pencil className="w-3 h-3" />
                          </button>
                          <button id={`board-delete-task-${t.id}`} data-test-id={`board-delete-task-${t.id}`} data-testid={`board-delete-task-${t.id}`} onClick={() => deleteTask(t.id)} className="p-1 hover:bg-destructive/10 rounded text-destructive">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <h4 className="font-medium text-xs leading-tight mb-2 text-foreground/90 group-hover:text-foreground">
                        <TruncatedCell>{t.title}</TruncatedCell>
                      </h4>

                      {t.description && (
                        <div className="text-[11px] text-muted-foreground mb-3">
                          <TruncatedCell>{t.description}</TruncatedCell>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/40">
                        {/* Assignee / Metadata */}
                        <div id={`board-task-card-${t.id}-assignee`} data-test-id={`board-task-card-${t.id}-assignee`} data-testid={`board-task-card-${t.id}-assignee`} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                          {t.assignee ? (
                            <>
                              <User className="w-3 h-3 text-muted-foreground/60" />
                              <span className="truncate max-w-[80px]" title={t.assignee}>{t.assignee}</span>
                            </>
                          ) : (
                            <span className="italic text-muted-foreground/30">Unassigned</span>
                          )}
                        </div>

                        {/* Priority Badge */}
                        <span id={`board-task-card-${t.id}-priority`} data-test-id={`board-task-card-${t.id}-priority`} data-testid={`board-task-card-${t.id}-priority`}>
                          <StatusBadge status={t.priority} size="sm" />
                        </span>
                      </div>

                      {t.due_date && (
                        <div id={`board-task-card-${t.id}-due-date`} data-test-id={`board-task-card-${t.id}-due-date`} data-testid={`board-task-card-${t.id}-due-date`} className="flex items-center gap-1 text-[9px] text-muted-foreground mt-2">
                          <Calendar className="w-2.5 h-2.5" />
                          <span>{t.due_date}</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Quick Add Button at Bottom of Column */}
              <button
                id={`column-add-${col.id}`}
                data-test-id={`column-add-${col.id}`}
                data-testid={`column-add-${col.id}`}
                onClick={() => openCreate(col.id)}
                className="mx-3 my-2.5 p-2 rounded-lg border border-dashed border-border/60 hover:border-border hover:bg-muted/10 text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5 text-xs transition-all duration-200"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>
            </div>
          );
        })}
      </div>

      <Dialog open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DialogContent className="skeu-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {editing ? "Edit Task" : "New Task"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Title *</label>
              <input
                id="form-title"
                data-test-id="form-title"
                data-testid="form-title"
                className="skeu-input w-full px-3 py-2 text-sm"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Task title"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Description</label>
              <textarea
                id="form-description"
                data-test-id="form-description"
                data-testid="form-description"
                className="skeu-input w-full px-3 py-2 text-sm min-h-[60px] resize-none"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Optional description"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Project *</label>
              <Select value={form.project_id ? String(form.project_id) : ""} onValueChange={(v) => setForm({ ...form, project_id: v })}>
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
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger id="form-status" data-test-id="form-status" data-testid="form-status" className="skeu-input">
                    <SelectValue />
                  </SelectTrigger>
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
                <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
                  <SelectTrigger id="form-priority" data-test-id="form-priority" data-testid="form-priority" className="skeu-input">
                    <SelectValue />
                  </SelectTrigger>
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
                <input
                  id="form-assignee"
                  data-test-id="form-assignee"
                  data-testid="form-assignee"
                  className="skeu-input w-full px-3 py-2 text-sm"
                  value={form.assignee}
                  onChange={(e) => setForm({ ...form, assignee: e.target.value })}
                  placeholder="Name"
                />
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
                      <Calendar className="h-4 w-4 text-muted-foreground ml-2" />
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
            <div className="flex gap-2 pt-2">
              <SkeuButton id="form-save" data-test-id="form-save" data-testid="form-save" variant="primary" className="flex-1" onClick={save}>
                Save
              </SkeuButton>
              <SkeuButton id="form-cancel" data-test-id="form-cancel" data-testid="form-cancel" onClick={() => setDrawerOpen(false)}>Cancel</SkeuButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
