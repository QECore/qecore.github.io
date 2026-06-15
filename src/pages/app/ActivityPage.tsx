// @ts-nocheck
import React, { useState, useEffect } from "react";
import { client } from "@/api/client";
import { Filter, ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import SkeuCard from "../../components/shared/SkueCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import moment from "moment";
import { TruncatedCell } from "../../components/shared/TruncatedCell";

const actionColors: Record<string, string> = {
  created: "bg-emerald-400",
  updated: "bg-blue-400",
  deleted: "bg-red-400",
};

const PAGE_SIZE_OPTIONS = [10, 20, 50];

export default function ActivityPage() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    client.entities.Activity.list("-created_date", 50).then((data) => {
      setActivities(data);
      setLoading(false);
    });
  }, []);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [typeFilter, pageSize]);

  const filtered = typeFilter === "all"
    ? activities
    : activities.filter((a) => a.entity_type?.toLowerCase() === typeFilter.toLowerCase());

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
      return <ArrowUpDown className="w-3 h-3 ml-1.5 inline-block text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />;
    }
    return sortAsc ? (
      <ArrowUp className="w-3 h-3 ml-1.5 inline-block text-foreground" />
    ) : (
      <ArrowDown className="w-3 h-3 ml-1.5 inline-block text-foreground" />
    );
  };

  const sortedActivities = [...filtered].sort((a, b) => {
    if (!sortField) return 0;
    let valA: any = "";
    let valB: any = "";

    if (sortField === "id") {
      valA = Number(a.id) || 0;
      valB = Number(b.id) || 0;
    } else if (sortField === "action") {
      valA = a.action || "";
      valB = b.action || "";
    } else if (sortField === "type") {
      valA = a.entity_type || "";
      valB = b.entity_type || "";
    } else if (sortField === "entity") {
      valA = a.entity_name || "";
      valB = b.entity_name || "";
    } else if (sortField === "details") {
      valA = a.details || "";
      valB = b.details || "";
    } else if (sortField === "actor") {
      valA = a.actor || "";
      valB = b.actor || "";
    } else if (sortField === "when") {
      valA = a.created_date || "";
      valB = b.created_date || "";
    }

    if (typeof valA === "string" && typeof valB === "string") {
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalItems = sortedActivities.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * pageSize;
  const paginatedActivities = sortedActivities.slice(startIdx, startIdx + pageSize);

  // Generate page numbers for display
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (safePage > 3) pages.push("...");
      for (let i = Math.max(2, safePage - 1); i <= Math.min(totalPages - 1, safePage + 1); i++) {
        pages.push(i);
      }
      if (safePage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-6 h-6 border-2 border-muted border-t-foreground rounded-full animate-spin" /></div>;
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="font-heading font-bold text-2xl tracking-tight">Activity</h1>
          <p className="text-sm text-muted-foreground mt-1">Recent actions across your workspace</p>
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger id="activity-type-select" data-test-id="activity-type-select" data-testid="activity-type-select" className="w-36 skeu-input">
            <Filter className="w-3.5 h-3.5 mr-1.5" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="project">Projects</SelectItem>
            <SelectItem value="task">Tasks</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <SkeuCard className="p-0 overflow-hidden flex flex-col min-h-0 flex-1">
        {/* Scrollable table area */}
        <div className="overflow-auto flex-1 min-h-0">
          <table id="activity-table" data-test-id="activity-table" data-testid="activity-table" className="w-full text-sm">
            <thead className="sticky top-0 z-10" style={{ background: "hsl(var(--card))" }}>
              <tr className="border-b border-border bg-muted/40 select-none">
                <th id="sort-activity-id" data-test-id="sort-activity-id" data-testid="sort-activity-id" onClick={() => handleSort("id")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider w-20 cursor-pointer hover:bg-muted/15 group">
                  <span className="flex items-center">Id {renderSortIcon("id")}</span>
                </th>
                <th id="sort-activity-action" data-test-id="sort-activity-action" data-testid="sort-activity-action" onClick={() => handleSort("action")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider w-32 cursor-pointer hover:bg-muted/15 group">
                  <span className="flex items-center">Action {renderSortIcon("action")}</span>
                </th>
                <th id="sort-activity-type" data-test-id="sort-activity-type" data-testid="sort-activity-type" onClick={() => handleSort("type")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider hidden sm:table-cell w-32 cursor-pointer hover:bg-muted/15 group">
                  <span className="flex items-center">Type {renderSortIcon("type")}</span>
                </th>
                <th id="sort-activity-entity" data-test-id="sort-activity-entity" data-testid="sort-activity-entity" onClick={() => handleSort("entity")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider cursor-pointer hover:bg-muted/15 group">
                  <span className="flex items-center">Entity {renderSortIcon("entity")}</span>
                </th>
                <th id="sort-activity-details" data-test-id="sort-activity-details" data-testid="sort-activity-details" onClick={() => handleSort("details")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider hidden lg:table-cell cursor-pointer hover:bg-muted/15 group">
                  <span className="flex items-center">Details {renderSortIcon("details")}</span>
                </th>
                <th id="sort-activity-actor" data-test-id="sort-activity-actor" data-testid="sort-activity-actor" onClick={() => handleSort("actor")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider hidden md:table-cell w-28 cursor-pointer hover:bg-muted/15 group">
                  <span className="flex items-center">Actor {renderSortIcon("actor")}</span>
                </th>
                <th id="sort-activity-when" data-test-id="sort-activity-when" data-testid="sort-activity-when" onClick={() => handleSort("when")} className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider w-32 cursor-pointer hover:bg-muted/15 group">
                  <span className="flex items-center">When {renderSortIcon("when")}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedActivities.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground text-sm">No activity recorded yet</td></tr>
              ) : paginatedActivities.map((act) => (
                <tr key={act.id} id={`activity-row-${act.id}`} data-test-id={`activity-row-${act.id}`} data-testid={`activity-row-${act.id}`} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td id={`act-cell-${act.id}-id`} data-test-id={`act-cell-${act.id}-id`} data-testid={`act-cell-${act.id}-id`} className="px-4 py-3 font-mono text-xs text-muted-foreground w-12">{act.id}</td>
                  <td id={`act-cell-${act.id}-action`} data-test-id={`act-cell-${act.id}-action`} data-testid={`act-cell-${act.id}-action`} className="px-4 py-3">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${actionColors[act.action] || "bg-muted-foreground"}`} />
                      <span className="text-xs capitalize font-medium">{act.action}</span>
                    </span>
                  </td>
                  <td id={`act-cell-${act.id}-type`} data-test-id={`act-cell-${act.id}-type`} data-testid={`act-cell-${act.id}-type`} className="px-4 py-3 text-muted-foreground hidden sm:table-cell text-xs">
                    <TruncatedCell>{act.entity_type || "—"}</TruncatedCell>
                  </td>
                  <td id={`act-cell-${act.id}-entity`} data-test-id={`act-cell-${act.id}-entity`} data-testid={`act-cell-${act.id}-entity`} className="px-4 py-3 font-medium">
                    <TruncatedCell>{act.entity_name || "—"}</TruncatedCell>
                  </td>
                  <td id={`act-cell-${act.id}-details`} data-test-id={`act-cell-${act.id}-details`} data-testid={`act-cell-${act.id}-details`} className="px-4 py-3 text-muted-foreground hidden lg:table-cell text-xs">
                    <TruncatedCell>{act.details || "—"}</TruncatedCell>
                  </td>
                  <td id={`act-cell-${act.id}-actor`} data-test-id={`act-cell-${act.id}-actor`} data-testid={`act-cell-${act.id}-actor`} className="px-4 py-3 text-muted-foreground hidden md:table-cell text-xs">
                    <TruncatedCell>{act.actor || "system"}</TruncatedCell>
                  </td>
                  <td id={`act-cell-${act.id}-when`} data-test-id={`act-cell-${act.id}-when`} data-testid={`act-cell-${act.id}-when`} className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">{moment(act.created_date).fromNow()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="border-t border-border px-4 py-3 flex items-center justify-between gap-4 shrink-0 bg-muted/20">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Rows per page</span>
            <Select value={String(pageSize)} onValueChange={(v) => setPageSize(Number(v))}>
              <SelectTrigger id="activity-page-size-select" data-test-id="activity-page-size-select" data-testid="activity-page-size-select" className="w-[68px] h-7 text-xs skeu-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map((s) => (
                  <SelectItem key={s} value={String(s)}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="mr-2">
              {totalItems === 0 ? "0 of 0" : `${startIdx + 1}–${Math.min(startIdx + pageSize, totalItems)} of ${totalItems}`}
            </span>

            <button
              id="btn-page-first"
              data-test-id="btn-page-first"
              data-testid="btn-page-first"
              disabled={safePage <= 1}
              onClick={() => setCurrentPage(1)}
              className="p-1 rounded-md hover:bg-muted/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="First page"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              id="btn-page-prev"
              data-test-id="btn-page-prev"
              data-testid="btn-page-prev"
              disabled={safePage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1 rounded-md hover:bg-muted/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {getPageNumbers().map((pg, i) =>
              pg === "..." ? (
                <span key={`ellipsis-${i}`} className="px-1.5 text-muted-foreground/60">…</span>
              ) : (
                <button
                  key={pg}
                  id={`btn-page-${pg}`}
                  data-test-id={`btn-page-${pg}`}
                  data-testid={`btn-page-${pg}`}
                  onClick={() => setCurrentPage(pg as number)}
                  className={`min-w-[28px] h-7 rounded-md text-xs font-medium transition-all duration-150
                    ${safePage === pg
                      ? "bg-foreground text-background shadow-sm"
                      : "hover:bg-muted/40 text-muted-foreground"
                    }`}
                >
                  {pg}
                </button>
              )
            )}

            <button
              id="btn-page-next"
              data-test-id="btn-page-next"
              data-testid="btn-page-next"
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1 rounded-md hover:bg-muted/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              id="btn-page-last"
              data-test-id="btn-page-last"
              data-testid="btn-page-last"
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage(totalPages)}
              className="p-1 rounded-md hover:bg-muted/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Last page"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </SkeuCard>
    </div>
  );
}

