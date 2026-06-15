import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Search, Filter, ChevronLeft, X, Check, CheckCheck } from "lucide-react";
import { Calendar } from "@/components/ui/Calendar";

/**
 * FilterBar — shared search + filter component
 *
 * Props:
 *   search: string
 *   onSearchChange: (val) => void
 *   searchPlaceholder: string
 *   filterConfig: Array<{ key, label, type: "options"|"date", options?: [{value, label}] }>
 *   activeFilters: { [key]: string[] | string }
 *   onFilterChange: (key, values) => void
 *   onRemoveFilter: (key, value?) => void
 */
export default function FilterBar({
  search,
  onSearchChange,
  searchPlaceholder = "Search…",
  filterConfig = [],
  activeFilters = {},
  onFilterChange,
  onRemoveFilter,
}) {
  const [open, setOpen] = useState(false);
  const [activeHeader, setActiveHeader] = useState(null);
  const dropRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        if (e.target.closest && (e.target.closest("[data-radix-portal]") || e.target.closest("[data-radix-select-viewport]") || e.target.closest("[role='listbox']"))) {
          return;
        }
        setOpen(false);
        setActiveHeader(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const getArr = (key) => {
    const current = activeFilters[key] || [];
    return Array.isArray(current) ? current : [current].filter(Boolean);
  };

  const toggleOption = (key, value) => {
    const arr = getArr(key);
    const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
    onFilterChange(key, next);
  };

  const selectAll = (key, options) => {
    onFilterChange(key, options.map((o) => o.value));
  };

  const deselectAll = (key) => {
    onFilterChange(key, []);
  };

  const toggleDate = (key, value) => {
    onFilterChange(key, value);
    setOpen(false);
    setActiveHeader(null);
  };

  const activePillEntries = filterConfig.filter((fc) => {
    const val = activeFilters[fc.key];
    return Array.isArray(val) ? val.length > 0 : !!val;
  });

  const currentFc = filterConfig.find((f) => f.key === activeHeader);
  const isDate = currentFc?.type === "date";

  return (
    <div className="space-y-2">
      <div className="flex gap-2 flex-wrap items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            className="skeu-input w-full pl-9 pr-3 py-2 text-sm"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Filter button + dropdown */}
        <div className="relative" ref={dropRef}>
          <button
            onClick={() => { setOpen(!open); setActiveHeader(null); }}
            className={`skeu-button inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activePillEntries.length > 0 ? "text-accent" : "text-foreground"}`}
          >
            <Filter className="w-4 h-4" />
            Filter
            {activePillEntries.length > 0 && (
              <span className="ml-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-bold">
                {activePillEntries.length}
              </span>
            )}
          </button>

          {open && (
            <div
              className={`flat-menu absolute left-0 top-full mt-2 z-50 rounded-xl border border-border/60 bg-background/95 backdrop-blur-md shadow-2xl overflow-hidden transition-all ${
                isDate ? "w-auto min-w-[300px]" : "w-[240px]"
              }`}
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.04)" }}
            >
              {activeHeader === null ? (
                // ── Filter category list ──────────────────────────────────
                <div className="py-1.5">
                  <div className="px-3 pb-1.5 pt-0.5">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                      Filter by
                    </p>
                  </div>
                  {filterConfig.map((fc, _idx) => {
                    const arr = getArr(fc.key);
                    const hasActive = fc.type === "date" ? !!activeFilters[fc.key] : arr.length > 0;
                    return (
                      <button
                        key={fc.key}
                        onClick={() => setActiveHeader(fc.key)}
                        className="flat-item w-full flex items-center justify-between px-3 py-2.5 text-xs hover:bg-muted/30 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${
                              hasActive ? "bg-accent" : "bg-border"
                            }`}
                          />
                          <span className={`font-medium ${hasActive ? "text-accent" : "text-foreground"}`}>
                            {fc.label}
                          </span>
                          {hasActive && fc.type !== "date" && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-accent/15 text-accent">
                              {arr.length}
                            </span>
                          )}
                        </div>
                        <ChevronLeft className="w-3.5 h-3.5 text-muted-foreground rotate-180 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    );
                  })}
                </div>
              ) : (
                // ── Options / date sub-panel ──────────────────────────────
                (() => {
                  const fc = currentFc;
                  const arr = getArr(fc.key);
                  const allSelected =
                    fc.type === "options" &&
                    fc.options.length > 0 &&
                    fc.options.every((o) => arr.includes(o.value));

                  return (
                    <>
                      {/* Back header */}
                      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border/50 bg-muted/20">
                        <button
                          onClick={() => setActiveHeader(null)}
                          className="flat-item flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span className="text-md font-semibold text-foreground ml-1">{fc.label}</span>
                        </button>

                        {/* Select / Deselect All (options only) */}
                        {fc.type === "options" && (
                          <button
                            onClick={() => allSelected ? deselectAll(fc.key) : selectAll(fc.key, fc.options)}
                            className="flat-item ml-auto flex items-center gap-1 text-[10px] font-semibold text-accent hover:text-accent/70 transition-colors"
                          >
                            <CheckCheck className="w-3 h-3" />
                            {allSelected ? "Deselect All" : "Select All"}
                          </button>
                        )}
                      </div>

                      {/* Date picker */}
                      {fc.type === "date" ? (
                        <div className="p-2 flex justify-center">
                          <Calendar
                            mode="single"
                            selected={activeFilters[fc.key] ? new Date(activeFilters[fc.key]) : undefined}
                            onSelect={(date) => {
                              if (date) {
                                const year = date.getFullYear();
                                const month = String(date.getMonth() + 1).padStart(2, "0");
                                const day = String(date.getDate()).padStart(2, "0");
                                toggleDate(fc.key, `${year}-${month}-${day}`);
                              }
                            }}
                            captionLayout="dropdown-buttons"
                            fromYear={new Date().getFullYear() - 10}
                            toYear={new Date().getFullYear() + 10}
                            className="rounded-md border-0 bg-transparent p-0"
                          />
                        </div>
                      ) : (
                        // Modern options list
                        <div className="py-1.5 max-h-64 overflow-y-auto">
                          {fc.options.map((opt) => {
                            const checked = arr.includes(opt.value);
                            return (
                              <button
                                key={opt.value}
                                onClick={() => toggleOption(fc.key, opt.value)}
                                className={`flat-item w-full flex items-center gap-3 px-3 py-2.5 text-xs text-left transition-all group ${
                                  checked
                                    ? "bg-accent/8 text-foreground"
                                    : "hover:bg-muted/30 text-foreground/80 hover:text-foreground"
                                }`}
                              >
                                {/* Skeuomorphic checkbox */}
                                <span
                                  className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-all ${
                                    checked
                                      ? "bg-accent border-accent shadow-[0_0_0_3px_rgba(var(--accent-rgb,251,146,60),0.15)]"
                                      : "border-border bg-background/80"
                                  }`}
                                  style={!checked ? {
                                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.25), inset 0 1px 2px rgba(0,0,0,0.15), 0 1px 0 rgba(255,255,255,0.06)"
                                  } : undefined}
                                >
                                  {checked && <Check className="w-2.5 h-2.5 text-accent-foreground" strokeWidth={3} />}
                                </span>
                                <span className={`font-medium text-left ${checked ? "text-foreground" : ""}`}>
                                  {opt.label}
                                </span>
                                {checked && (
                                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </>
                  );
                })()
              )}
            </div>
          )}
        </div>
      </div>

      {/* Active filter pills */}
      {activePillEntries.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activePillEntries.map((fc) => {
            const val = activeFilters[fc.key];
            const arr = Array.isArray(val) ? val : [val].filter(Boolean);
            const displayVal =
              fc.type === "date"
                ? new Date(val).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" })
                : arr.map((v) => fc.options?.find((o) => o.value === v)?.label || v).join(", ");
            return (
              <span
                key={fc.key}
                className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20"
              >
                <span className="text-muted-foreground">{fc.label}:</span> {displayVal}
                <button
                  onClick={() => onRemoveFilter(fc.key)}
                  className="ml-0.5 hover:text-destructive transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}
          {activePillEntries.length > 1 && (
            <button
              onClick={() => filterConfig.forEach((fc) => onRemoveFilter(fc.key))}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2 p-2"
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}