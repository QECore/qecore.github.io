// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import { client } from "@/api/client";
import { Upload, FileText, Trash2, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import SkeuCard from "@/components/shared/SkueCard";
import SkeuButton from "@/components/shared/SkueButton";
import { TruncatedCell } from "@/components/shared/TruncatedCell";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { useToast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";
import FilterBar from "@/components/shared/FilterBar";

interface DocumentItem {
  id: string;
  name: string;
  file_url: string;
  file_type?: string;
  file_size?: number;
}

export default function Documents() {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDoc, setDeleteDoc] = useState<DocumentItem | null>(null);
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState("active");
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [replacingDoc, setReplacingDoc] = useState<DocumentItem | null>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const load = async () => {
    const [docsData, projectsData, tasksData] = await Promise.all([
      client.entities.Document.list(true),
      client.entities.Project.list("-created_date", true),
      client.entities.Task.list("-created_date", true)
    ]);
    setDocs(docsData);
    setProjects(projectsData);
    setTasks(tasksData);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleReplaceClick = (doc: DocumentItem) => {
    setReplacingDoc(doc);
    replaceInputRef.current?.click();
  };

  const handleReplaceChange = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file || !replacingDoc) return;

    // Check if another document for the same task already has this file name
    const sameTaskDocs = docs.filter(
      d => !d.deleted
        && String(d.id) !== String(replacingDoc.id)
        && String(d.task_id) === String(replacingDoc.task_id)
    );
    const duplicate = sameTaskDocs.find(d => d.name.toLowerCase() === file.name.toLowerCase());
    if (duplicate) {
      toast({
        title: "Duplicate file",
        description: `"${file.name}" already exists for this task.`,
        variant: "destructive",
      });
      setReplacingDoc(null);
      return;
    }

    try {
      const { file_url } = await client.integrations.Core.UploadFile({ file });
      await client.entities.Document.update(replacingDoc.id, {
        name: file.name,
        file_url,
        file_type: file.type || "unknown",
        file_size: file.size,
      });
      toast({ title: "File replaced successfully" });
    } catch (err) {
      console.error(err);
      toast({ title: "Failed to replace file", variant: "destructive" });
    } finally {
      setReplacingDoc(null);
      load();
    }
  };

  const handleRestore = async (id: any) => {
    try {
      await client.entities.Document.restore(id);
      toast({ title: "Document restored successfully" });
      load();
    } catch (e: any) {
      alert(e.message || "Failed to restore document");
      toast({ title: "Error", description: e.message || "Failed to restore document", variant: "destructive" });
    }
  };

  const handleRestoreAll = async () => {
    const docsToRestore = [...sortedDocs];
    if (docsToRestore.length === 0) return;
    
    let restoredCount = 0;
    const failedDocs: string[] = [];
    
    for (const d of docsToRestore) {
      try {
        await client.entities.Document.restore(d.id);
        restoredCount++;
      } catch (e: any) {
        failedDocs.push(`${d.name} (${e.message || "Parent project/task must be restored first"})`);
      }
    }
    
    if (restoredCount > 0) {
      toast({ title: "Documents restored", description: `${restoredCount} document(s) restored successfully.` });
    }
    
    if (failedDocs.length > 0) {
      alert(`Could not restore some documents:\n${failedDocs.join("\n")}`);
    }
    
    await load();
  };

  const handleDeleteAll = () => {
    if (sortedDocs.length === 0) return;
    setBulkDeleteOpen(true);
  };

  const confirmDeleteAll = async () => {
    setBulkDeleteOpen(false);
    const docsToDelete = [...sortedDocs];
    if (docsToDelete.length === 0) return;
    
    let deletedCount = 0;
    for (const d of docsToDelete) {
      try {
        await client.entities.Document.delete(d.id);
        deletedCount++;
      } catch (e: any) {
        console.error(`Failed to delete document ${d.id}:`, e);
      }
    }
    if (deletedCount > 0) {
      toast({ title: "Documents deleted", description: `${deletedCount} document(s) moved to trash.` });
    }
    await load();
  };

  const confirmDelete = async () => {
    if (!deleteDoc) return;
    await client.entities.Document.delete(deleteDoc.id);
    toast({ title: "Document deleted" });
    setDeleteDoc(null);
    load();
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return "—";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

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

  const filteredDocs = docs.filter((doc) => {
    if (activeTab === "active" ? doc.deleted : !doc.deleted) return false;
    if (search) {
      const s = search.toLowerCase();
      if (!doc.name.toLowerCase().includes(s)) return false;
    }

    for (const [key, value] of Object.entries(activeFilters)) {
      if (!value || (Array.isArray(value) && value.length === 0)) continue;
      
      if (key === "project_id") {
        if (!(value as string[]).includes(String(doc.project_id || ""))) return false;
      } else if (key === "task_id") {
        if (!(value as string[]).includes(String(doc.task_id || ""))) return false;
      } else if (key === "file_type") {
        if (!(value as string[]).includes(String(doc.file_type || ""))) return false;
      }
    }
    return true;
  });

  const uniqueTypes = Array.from(new Set(docs.map(d => d.file_type))).filter(Boolean);
  const uniqueProjectIds = Array.from(new Set(docs.map(d => d.project_id).filter(Boolean)));
  const uniqueTaskIds = Array.from(new Set(docs.map(d => d.task_id).filter(Boolean)));

  const projectOptions = uniqueProjectIds.map(pid => {
    const p = projects.find(proj => String(proj.id) === String(pid));
    return { value: String(pid), label: p ? p.title : `Project ${pid}` };
  });

  const taskOptions = uniqueTaskIds.map(tid => {
    const t = tasks.find(tsk => String(tsk.id) === String(tid));
    return { value: String(tid), label: t ? t.title : `Task ${tid}` };
  });

  const filterConfig = [
    { key: "project_id", label: "Project", type: "options", options: projectOptions },
    { key: "task_id", label: "Task", type: "options", options: taskOptions },
    { key: "file_type", label: "File Type", type: "options", options: uniqueTypes.map(t => ({ value: t, label: t })) }
  ];

  const handleFilterChange = (key: string, values: any) => setActiveFilters(prev => ({ ...prev, [key]: values }));
  const handleRemoveFilter = (key: string) => setActiveFilters(prev => { const n = { ...prev }; delete n[key]; return n; });

  const sortedDocs = [...filteredDocs].sort((a, b) => {
    if (!sortField) return 0;
    let valA: any = "";
    let valB: any = "";

    if (sortField === "id") {
      valA = Number(a.id) || 0;
      valB = Number(b.id) || 0;
    } else if (sortField === "name") {
      valA = a.name || "";
      valB = b.name || "";
    } else if (sortField === "type") {
      valA = a.file_type || "";
      valB = b.file_type || "";
    } else if (sortField === "size") {
      valA = Number(a.file_size) || 0;
      valB = Number(b.file_size) || 0;
    } else if (sortField === "project") {
      const projA = projects.find(p => String(p.id) === String(a.project_id));
      const projB = projects.find(p => String(p.id) === String(b.project_id));
      valA = projA ? projA.title : "";
      valB = projB ? projB.title : "";
    } else if (sortField === "task") {
      const taskA = tasks.find(t => String(t.id) === String(a.task_id));
      const taskB = tasks.find(t => String(t.id) === String(b.task_id));
      valA = taskA ? taskA.title : "";
      valB = taskB ? taskB.title : "";
    }

    if (typeof valA === "string" && typeof valB === "string") {
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-6 h-6 border-2 border-muted border-t-foreground rounded-full animate-spin" /></div>;
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl tracking-tight">Documents</h1>
          <p className="text-sm text-muted-foreground mt-1">View and manage project files</p>
        </div>
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
          {activeTab === "active" && sortedDocs.length > 0 && (
            <SkeuButton id="delete-all-documents" data-test-id="delete-all-documents" data-testid="delete-all-documents" variant="destructive" onClick={handleDeleteAll}>
              {search.trim() !== "" || Object.values(activeFilters).some(val => Array.isArray(val) ? val.length > 0 : !!val) ? "Delete Filtered" : "Delete All"}
            </SkeuButton>
          )}
          {activeTab === "deleted" && sortedDocs.length > 0 && (
            <SkeuButton id="restore-all-documents" data-test-id="restore-all-documents" data-testid="restore-all-documents" variant="primary" onClick={handleRestoreAll}>
              {search.trim() !== "" || Object.values(activeFilters).some(val => Array.isArray(val) ? val.length > 0 : !!val) ? "Restore Filtered" : "Restore All"}
            </SkeuButton>
          )}
        </div>
      </div>

      <div className="mb-5">
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search documents…"
          filterConfig={filterConfig}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onRemoveFilter={handleRemoveFilter}
        />
      </div>

      {/* Table */}
      <SkeuCard className="p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40 select-none">
              <th id="sort-docs-id" data-test-id="sort-docs-id" data-testid="sort-docs-id" onClick={() => handleSort("id")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider w-20 cursor-pointer hover:bg-muted/15 group">
                <span className="flex items-center">Id {renderSortIcon("id")}</span>
              </th>
              <th id="sort-docs-name" data-test-id="sort-docs-name" data-testid="sort-docs-name" onClick={() => handleSort("name")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider cursor-pointer hover:bg-muted/15 group">
                <span className="flex items-center">Name {renderSortIcon("name")}</span>
              </th>
              <th id="sort-docs-project" data-test-id="sort-docs-project" data-testid="sort-docs-project" onClick={() => handleSort("project")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider cursor-pointer hover:bg-muted/15 group">
                <span className="flex items-center">Project {renderSortIcon("project")}</span>
              </th>
              <th id="sort-docs-task" data-test-id="sort-docs-task" data-testid="sort-docs-task" onClick={() => handleSort("task")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider cursor-pointer hover:bg-muted/15 group">
                <span className="flex items-center">Task {renderSortIcon("task")}</span>
              </th>
              <th id="sort-docs-type" data-test-id="sort-docs-type" data-testid="sort-docs-type" onClick={() => handleSort("type")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider hidden md:table-cell cursor-pointer hover:bg-muted/15 group">
                <span className="flex items-center">Type {renderSortIcon("type")}</span>
              </th>
              <th id="sort-docs-size" data-test-id="sort-docs-size" data-testid="sort-docs-size" onClick={() => handleSort("size")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider hidden md:table-cell cursor-pointer hover:bg-muted/15 group">
                <span className="flex items-center">Size {renderSortIcon("size")}</span>
              </th>
              <th className="px-4 py-2.5 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {sortedDocs.length === 0 ? (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground text-sm">No documents yet</td></tr>
            ) : sortedDocs.map((doc) => (
              <tr key={doc.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground w-12">{doc.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 group/cell">
                    <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                    <TooltipProvider>
                      <Tooltip delayDuration={200}>
                        <TooltipTrigger asChild>
                          <span className="font-medium text-foreground cursor-help select-none hover:text-accent/80 transition-colors">
                            <TruncatedCell>{doc.name}</TruncatedCell>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs bg-slate-900 text-slate-100 border border-slate-800 p-2 shadow-lg rounded-md text-xs">
                          Only for demo; not an actual upload
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {activeTab === "active" && (
                      <button
                        id={`replace-doc-${doc.id}`}
                        data-test-id={`replace-doc-${doc.id}`}
                        data-testid={`replace-doc-${doc.id}`}
                        type="button"
                        onClick={() => handleReplaceClick(doc)}
                        className="opacity-0 group-hover/cell:opacity-100 p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-all ml-1"
                        title="Replace file"
                      >
                        <Upload className="w-3.5 h-3.5 text-accent" />
                      </button>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {(() => {
                    const p = projects.find(proj => String(proj.id) === String(doc.project_id));
                    return p ? <TruncatedCell>{p.title}</TruncatedCell> : "—";
                  })()}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {(() => {
                    const t = tasks.find(tsk => String(tsk.id) === String(doc.task_id));
                    return t ? <TruncatedCell>{t.title}</TruncatedCell> : "—";
                  })()}
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell font-mono text-xs">
                  <TruncatedCell>{doc.file_type || "—"}</TruncatedCell>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{formatSize(doc.file_size)}</td>
                 <td className="px-4 py-3">
                  {activeTab === "active" ? (
                    <button id={`delete-doc-${doc.id}`} data-test-id={`delete-doc-${doc.id}`} data-testid={`delete-doc-${doc.id}`} onClick={() => setDeleteDoc(doc)} className="p-1.5 hover:bg-destructive/10 rounded-md transition-colors"><Trash2 className="w-3.5 h-3.5 text-destructive" /></button>
                  ) : (
                    <button id={`restore-doc-${doc.id}`} data-test-id={`restore-doc-${doc.id}`} data-testid={`restore-doc-${doc.id}`} onClick={() => handleRestore(doc.id)} className="px-2 py-1 text-xs bg-accent/10 hover:bg-accent/20 text-accent rounded border border-accent/20 transition-colors">Restore</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SkeuCard>

      <Dialog open={!!deleteDoc} onOpenChange={() => setDeleteDoc(null)}>
        <DialogContent className="skeu-card sm:max-w-sm">
          <DialogHeader><DialogTitle className="font-heading">Delete Document</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Are you sure you want to delete <span className="font-medium text-foreground">{deleteDoc?.name}</span>?</p>
          <div className="flex gap-2 mt-4">
            <SkeuButton id="delete-confirm" data-test-id="delete-confirm" data-testid="delete-confirm" variant="destructive" className="flex-1" onClick={confirmDelete}>Delete</SkeuButton>
            <SkeuButton id="delete-cancel" data-test-id="delete-cancel" data-testid="delete-cancel" onClick={() => setDeleteDoc(null)}>Cancel</SkeuButton>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk Delete Confirmation Dialog */}
      <Dialog open={bulkDeleteOpen} onOpenChange={setBulkDeleteOpen}>
        <DialogContent className="skeu-card sm:max-w-sm">
          <DialogHeader><DialogTitle className="font-heading">Delete Documents</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Are you sure you want to delete <span className="font-medium text-foreground">{sortedDocs.length} document(s)</span>?</p>
          <div className="flex gap-2 mt-4">
            <SkeuButton id="bulk-delete-confirm" data-test-id="bulk-delete-confirm" data-testid="bulk-delete-confirm" variant="destructive" className="flex-1" onClick={confirmDeleteAll}>Delete All</SkeuButton>
            <SkeuButton id="bulk-delete-cancel" data-test-id="bulk-delete-cancel" data-testid="bulk-delete-cancel" onClick={() => setBulkDeleteOpen(false)}>Cancel</SkeuButton>
          </div>
        </DialogContent>
      </Dialog>

      <input
        ref={replaceInputRef}
        type="file"
        className="hidden"
        onChange={(e) => { handleReplaceChange(e.target.files); e.target.value = ""; }}
      />
    </div>
  );
}
