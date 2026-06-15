// @ts-nocheck
import React, { useState, useEffect } from "react";
import { client } from "@/api/client";
import { Plus, Pencil, Trash2, ArrowUpDown, ArrowUp, ArrowDown, Calendar as CalendarIcon } from "lucide-react";
import SkeuCard from "../../components/shared/SkueCard";
import SkeuButton from "../../components/shared/SkueButton";
import StatusBadge from "../../components/shared/StatusBadge";
import FilterBar from "../../components/shared/FilterBar";
import { TruncatedCell } from "../../components/shared/TruncatedCell";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Calendar as CalendarComponent } from "@/components/ui/Calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/Popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/AuthContext";

const emptyProject = { title: "", description: "", status: "active", priority: "medium", progress: 0, due_date: "", tags: "" };

export default function Projects() {
  const { user } = useAuth();
  const userKey = user?.email || "anonymous";

  const [projects, setProjects] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"active" | "deleted">("active");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<any>({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(emptyProject);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const { toast } = useToast();

  const load = async () => {
    const data = await client.entities.Project.list("-created_date", true);
    setProjects(data);
    setLoading(false);
  };

  const handleRestore = async (id: any) => {
    try {
      await client.entities.Project.restore(id);
      toast({ title: "Project restored successfully" });
      load();
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to restore project", variant: "destructive" });
    }
  };

  const handleDeleteAll = () => {
    if (sortedProjects.length === 0) return;
    setBulkDeleteOpen(true);
  };

  const confirmDeleteAll = async () => {
    setBulkDeleteOpen(false);
    const projectsToDelete = [...sortedProjects];
    if (projectsToDelete.length === 0) return;
    
    let deletedCount = 0;
    for (const p of projectsToDelete) {
      try {
        await client.entities.Project.delete(p.id);
        deletedCount++;
      } catch (e: any) {
        console.error(`Failed to delete project ${p.id}:`, e);
      }
    }
    if (deletedCount > 0) {
      toast({ title: "Projects deleted", description: `${deletedCount} project(s) moved to trash.` });
    }
    await load();
  };

  const handleRestoreAll = async () => {
    const projectsToRestore = [...sortedProjects];
    if (projectsToRestore.length === 0) return;
    
    let restoredCount = 0;
    const failedProjects: string[] = [];
    
    for (const p of projectsToRestore) {
      try {
        await client.entities.Project.restore(p.id);
        restoredCount++;
      } catch (e: any) {
        console.error(`Failed to restore project ${p.id}:`, e);
        failedProjects.push(`${p.title} (${e.message || "Unknown error"})`);
      }
    }
    if (restoredCount > 0) {
      toast({ title: "Projects restored", description: `${restoredCount} project(s) restored successfully.` });
    }
    if (failedProjects.length > 0) {
      alert(`Could not restore some projects:\n${failedProjects.join("\n")}`);
    }
    await load();
  };

  useEffect(() => {
    if (userKey) {
      load();
    }
  }, [userKey]);

  useEffect(() => {
    if (userKey && userKey !== "anonymous") {
      const savedSearch = localStorage.getItem(`${userKey}_projects_search`);
      if (savedSearch !== null) setSearch(savedSearch);
      try {
        const savedFilters = localStorage.getItem(`${userKey}_projects_filters`);
        if (savedFilters !== null) setActiveFilters(JSON.parse(savedFilters));
      } catch {
        // Ignore invalid saved filters
      }
    }
  }, [userKey]);

  useEffect(() => {
    if (userKey) {
      localStorage.setItem(`${userKey}_projects_search`, search);
    }
  }, [search, userKey]);

  useEffect(() => {
    if (userKey) {
      localStorage.setItem(`${userKey}_projects_filters`, JSON.stringify(activeFilters));
    }
  }, [activeFilters, userKey]);

  const uniqueStatuses = Array.from(new Set(projects.map(p => p.status))).filter(Boolean);
  const uniquePriorities = Array.from(new Set(projects.map(p => p.priority))).filter(Boolean);
  const uniqueTitles = Array.from(new Set(projects.map(p => p.title))).filter(Boolean);
  const uniqueTags = Array.from(new Set(projects.flatMap(p => p.tags || []))).filter(Boolean);
  const uniqueProgress = Array.from(new Set(projects.map(p => String(p.progress)))).filter(Boolean).sort((a,b) => Number(a) - Number(b));

  const filterConfig = [
    { key: "title", label: "Title", type: "options", options: uniqueTitles.map(t => ({ value: t, label: t })) },
    { key: "status", label: "Status", type: "options", options: uniqueStatuses.map(s => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) })) },
    { key: "priority", label: "Priority", type: "options", options: uniquePriorities.map(p => ({ value: p, label: p.charAt(0).toUpperCase() + p.slice(1) })) },
    { key: "progress", label: "Progress", type: "options", options: uniqueProgress.map(pr => ({ value: pr, label: `${pr}%` })) },
    { key: "tags", label: "Tags", type: "options", options: uniqueTags.map(t => ({ value: t, label: t })) },
    { key: "due_date", label: "Due Date", type: "date" }
  ];

  const filtered = projects.filter((p) => {
    if (activeTab === "active" ? p.deleted : !p.deleted) return false;
    if (search) {
      const s = search.toLowerCase();
      const matchSearch = p.title.toLowerCase().includes(s) || (p.description || "").toLowerCase().includes(s);
      if (!matchSearch) return false;
    }
    for (const [key, value] of Object.entries(activeFilters)) {
      if (!value || (Array.isArray(value) && value.length === 0)) continue;
      if (key === "due_date") {
        if (p.due_date !== value) return false;
      } else if (key === "tags") {
        const pTags = p.tags || [];
        const hasMatch = (value as string[]).some(t => pTags.includes(t));
        if (!hasMatch) return false;
      } else if (key === "progress") {
        if (!(value as string[]).includes(String(p.progress))) return false;
      } else {
        if (!(value as string[]).includes(String(p[key]))) return false;
      }
    }
    return true;
  });

  const handleSort = (field: string) => {
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

  const renderSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 ml-1.5 inline-block text-muted-foreground/40 group-hover:text-muted-foreground transition-colors shrink-0" />;
    }
    return sortAsc ? (
      <ArrowUp className="w-3 h-3 ml-1.5 inline-block text-foreground shrink-0" />
    ) : (
      <ArrowDown className="w-3 h-3 ml-1.5 inline-block text-foreground shrink-0" />
    );
  };

  const priorityWeight: Record<string, number> = { low: 1, medium: 2, high: 3, critical: 4 };
  const statusWeight: Record<string, number> = { active: 1, paused: 2, completed: 3, archived: 4 };

  const sortedProjects = [...filtered].sort((a, b) => {
    if (!sortField) return 0;
    let valA: any = "";
    let valB: any = "";

    if (sortField === "id") {
      valA = Number(a.id) || 0;
      valB = Number(b.id) || 0;
    } else if (sortField === "title") {
      valA = a.title || "";
      valB = b.title || "";
    } else if (sortField === "status") {
      valA = statusWeight[a.status] || 0;
      valB = statusWeight[b.status] || 0;
    } else if (sortField === "priority") {
      valA = priorityWeight[a.priority] || 0;
      valB = priorityWeight[b.priority] || 0;
    } else if (sortField === "progress") {
      valA = Number(a.progress) || 0;
      valB = Number(b.progress) || 0;
    } else if (sortField === "due_date") {
      valA = a.due_date || "";
      valB = b.due_date || "";
    } else if (sortField === "tags") {
      valA = (a.tags || []).join(", ");
      valB = (b.tags || []).join(", ");
    }

    if (typeof valA === "string" && typeof valB === "string") {
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  const openCreate = () => { setEditing(null); setForm(emptyProject); setDrawerOpen(true); };
  const openEdit = (p: any) => {
    setEditing(p);
    setForm({ title: p.title, description: p.description || "", status: p.status, priority: p.priority, progress: p.progress || 0, due_date: p.due_date || "", tags: (p.tags || []).join(", ") });
    setDrawerOpen(true);
  };

  const save = async () => {
    if (!form.title.trim()) return;
    const payload = {
      title: form.title,
      description: form.description,
      status: form.status,
      priority: form.priority,
      progress: Number(form.progress) || 0,
      due_date: form.due_date || null,
      tags: form.tags ? form.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
    };
    if (editing) {
      await client.entities.Project.update(editing.id, payload);
      toast({ title: "Project updated" });
    } else {
      await client.entities.Project.create(payload);
      toast({ title: "Project created" });
    }
    setDrawerOpen(false);
    load();
  };

  const confirmDelete = async () => {
    if (!editing) return;
    await client.entities.Project.delete(editing.id);
    toast({ title: "Project deleted" });
    setDeleteOpen(false);
    setEditing(null);
    load();
  };

  const handleFilterChange = (key: string, values: any) => setActiveFilters((prev: any) => ({ ...prev, [key]: values }));
  const handleRemoveFilter = (key: string) => setActiveFilters((prev: any) => { const n = { ...prev }; delete n[key]; return n; });

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-6 h-6 border-2 border-muted border-t-foreground rounded-full animate-spin" /></div>;
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your workspace projects</p>
        </div>
        {activeTab === "active" && (
          <SkeuButton id="new-project-button" data-test-id="new-project-button" data-testid="new-project-button" variant="primary" onClick={openCreate}>
            <Plus className="w-4 h-4" /> New Project
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
          {activeTab === "active" && sortedProjects.length > 0 && (
            <SkeuButton id="delete-all-projects" data-test-id="delete-all-projects" data-testid="delete-all-projects" variant="destructive" onClick={handleDeleteAll}>
              {search.trim() !== "" || Object.values(activeFilters).some(val => Array.isArray(val) ? val.length > 0 : !!val) ? "Delete Filtered" : "Delete All"}
            </SkeuButton>
          )}
          {activeTab === "deleted" && sortedProjects.length > 0 && (
            <SkeuButton id="restore-all-projects" data-test-id="restore-all-projects" data-testid="restore-all-projects" variant="primary" onClick={handleRestoreAll}>
              {search.trim() !== "" || Object.values(activeFilters).some(val => Array.isArray(val) ? val.length > 0 : !!val) ? "Restore Filtered" : "Restore All"}
            </SkeuButton>
          )}
        </div>
      </div>

      <div className="mb-5">
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search projects…"
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
              <th id="sort-projects-id" data-test-id="sort-projects-id" data-testid="sort-projects-id" onClick={() => handleSort("id")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider w-20 cursor-pointer hover:bg-muted/15 group">
                <span className="flex items-center">Id {renderSortIcon("id")}</span>
              </th>
              <th id="sort-projects-title" data-test-id="sort-projects-title" data-testid="sort-projects-title" onClick={() => handleSort("title")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider cursor-pointer hover:bg-muted/15 group">
                <span className="flex items-center">Title {renderSortIcon("title")}</span>
              </th>
              <th id="sort-projects-status" data-test-id="sort-projects-status" data-testid="sort-projects-status" onClick={() => handleSort("status")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider hidden sm:table-cell cursor-pointer hover:bg-muted/15 group">
                <span className="flex items-center">Status {renderSortIcon("status")}</span>
              </th>
              <th id="sort-projects-priority" data-test-id="sort-projects-priority" data-testid="sort-projects-priority" onClick={() => handleSort("priority")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider hidden sm:table-cell cursor-pointer hover:bg-muted/15 group">
                <span className="flex items-center">Priority {renderSortIcon("priority")}</span>
              </th>
              <th id="sort-projects-progress" data-test-id="sort-projects-progress" data-testid="sort-projects-progress" onClick={() => handleSort("progress")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider hidden md:table-cell cursor-pointer hover:bg-muted/15 group">
                <span className="flex items-center">Progress {renderSortIcon("progress")}</span>
              </th>
              <th id="sort-projects-due_date" data-test-id="sort-projects-due_date" data-testid="sort-projects-due_date" onClick={() => handleSort("due_date")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider hidden lg:table-cell cursor-pointer hover:bg-muted/15 group">
                <span className="flex items-center">Due Date {renderSortIcon("due_date")}</span>
              </th>
              <th id="sort-projects-tags" data-test-id="sort-projects-tags" data-testid="sort-projects-tags" onClick={() => handleSort("tags")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider hidden lg:table-cell cursor-pointer hover:bg-muted/15 group">
                <span className="flex items-center">Tags {renderSortIcon("tags")}</span>
              </th>
              <th className="px-4 py-2.5 w-20"></th>
            </tr>
          </thead>
          <tbody>
            {sortedProjects.length === 0 ? (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground text-sm">No projects found</td></tr>
            ) : sortedProjects.map((p) => {
              const tagsStr = (p.tags || []).join(", ");
              return (
              <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground w-12">{p.id}</td>
                <td className="px-4 py-3 font-medium">
                  <TruncatedCell>{p.title}</TruncatedCell>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell"><StatusBadge status={p.status} /></td>
                <td className="px-4 py-3 hidden sm:table-cell"><StatusBadge status={p.priority} /></td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${p.progress || 0}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-8 text-right">{p.progress || 0}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{p.due_date || "—"}</td>
                <td className="px-4 py-3 hidden lg:table-cell" title={tagsStr}>
                  <div className="flex flex-wrap gap-1">
                    {(p.tags || []).map(t => <span key={t} className="px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground">{t}</span>)}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    {activeTab === "active" ? (
                      <>
                        <button id={`edit-project-${p.id}`} data-test-id={`edit-project-${p.id}`} data-testid={`edit-project-${p.id}`} onClick={() => openEdit(p)} className="p-1.5 hover:bg-muted rounded-md transition-colors"><Pencil className="w-3.5 h-3.5 text-muted-foreground" /></button>
                        <button id={`delete-project-${p.id}`} data-test-id={`delete-project-${p.id}`} data-testid={`delete-project-${p.id}`} onClick={() => { setEditing(p); setDeleteOpen(true); }} className="p-1.5 hover:bg-destructive/10 rounded-md transition-colors"><Trash2 className="w-3.5 h-3.5 text-destructive" /></button>
                      </>
                    ) : (
                      <button id={`restore-project-${p.id}`} data-test-id={`restore-project-${p.id}`} data-testid={`restore-project-${p.id}`} onClick={() => handleRestore(p.id)} className="px-2 py-1 text-xs bg-accent/10 hover:bg-accent/20 text-accent rounded border border-accent/20 transition-colors">Restore</button>
                    )}
                  </div>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
        </div>
      </SkeuCard>

      {/* Create/Edit Dialog */}
      <Dialog open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DialogContent className="skeu-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">{editing ? "Edit Project" : "New Project"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Title *</label>
              <input id="form-title" data-test-id="form-title" data-testid="form-title" className="skeu-input w-full px-3 py-2 text-sm" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} placeholder="Project title" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Description</label>
              <textarea id="form-description" data-test-id="form-description" data-testid="form-description" className="skeu-input w-full px-3 py-2 text-sm min-h-[70px] resize-none" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} placeholder="Optional description" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Status</label>
                <Select value={form.status} onValueChange={(v) => setForm({...form, status: v})}>
                  <SelectTrigger id="form-status" data-test-id="form-status" data-testid="form-status" className="skeu-input"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
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
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Progress (%)</label>
                <input id="form-progress" data-test-id="form-progress" data-testid="form-progress" type="number" min="0" max="100" className="skeu-input w-full px-3 py-2 text-sm" value={form.progress} onChange={(e) => setForm({...form, progress: e.target.value})} />
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
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Tags (comma-separated)</label>
              <input id="form-tags" data-test-id="form-tags" data-testid="form-tags" className="skeu-input w-full px-3 py-2 text-sm" value={form.tags} onChange={(e) => setForm({...form, tags: e.target.value})} placeholder="e.g. frontend, core" />
            </div>
            <div className="flex gap-2 pt-2">
              <SkeuButton id="form-save" data-test-id="form-save" data-testid="form-save" variant="primary" className="flex-1" onClick={save}>Save</SkeuButton>
              <SkeuButton id="form-cancel" data-test-id="form-cancel" data-testid="form-cancel" onClick={() => setDrawerOpen(false)}>Cancel</SkeuButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="skeu-card sm:max-w-sm">
          <DialogHeader><DialogTitle className="font-heading">Delete Project</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Are you sure you want to delete <span className="font-medium text-foreground">{editing?.title}</span>?</p>
          <div className="flex gap-2 mt-4">
            <SkeuButton id="delete-confirm" data-test-id="delete-confirm" data-testid="delete-confirm" variant="destructive" className="flex-1" onClick={confirmDelete}>Delete</SkeuButton>
            <SkeuButton id="delete-cancel" data-test-id="delete-cancel" data-testid="delete-cancel" onClick={() => setDeleteOpen(false)}>Cancel</SkeuButton>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk Delete Confirmation Dialog */}
      <Dialog open={bulkDeleteOpen} onOpenChange={setBulkDeleteOpen}>
        <DialogContent className="skeu-card sm:max-w-sm">
          <DialogHeader><DialogTitle className="font-heading">Delete Projects</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Are you sure you want to delete <span className="font-medium text-foreground">{sortedProjects.length} project(s)</span>?</p>
          <div className="flex gap-2 mt-4">
            <SkeuButton id="bulk-delete-confirm" data-test-id="bulk-delete-confirm" data-testid="bulk-delete-confirm" variant="destructive" className="flex-1" onClick={confirmDeleteAll}>Delete All</SkeuButton>
            <SkeuButton id="bulk-delete-cancel" data-test-id="bulk-delete-cancel" data-testid="bulk-delete-cancel" onClick={() => setBulkDeleteOpen(false)}>Cancel</SkeuButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}