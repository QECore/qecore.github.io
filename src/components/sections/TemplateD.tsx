import React from "react";
import { Button } from "@/components/buttons/button";

interface LinkItem {
  id: string;
  label: string;
}

interface ColumnDef {
  key: string;
  header: string;
  width?: string;
}

interface TemplateDProps {
  label: string;
  title: string;
  subtitle: string;
  columns: ColumnDef[];
  rows: Array<Record<string, React.ReactNode>>;
  groupLabel?: string;
  groups?: Array<{
    title: string;
    columns: ColumnDef[];
    rows: Array<Record<string, React.ReactNode>>;
  }>;
  prevLink?: LinkItem;
  nextLink?: LinkItem;
}

/**
 * Template D — Lookup Table
 *
 * No storytelling framing. Title, one sentence of context,
 * then a dense reference table. Scroll is expected and fine.
 * Used for all Reference pages (CLI, Configuration, API, Types).
 */
export default function TemplateD({
  label,
  title,
  subtitle,
  columns,
  rows,
  groups,
  prevLink,
  nextLink,
}: TemplateDProps) {
  const renderTable = (cols: ColumnDef[], data: Array<Record<string, React.ReactNode>>) => (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-black">
      <table className="w-full text-[11px] text-left bg-black table-fixed">
        <thead className="bg-[#0c0c0c] border-b border-white/10 text-[9px] uppercase tracking-wider">
          <tr>
            {cols.map((col) => (
              <th
                key={col.key}
                className="py-2 px-3 font-semibold text-muted-foreground uppercase"
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 bg-black">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
              {cols.map((col) => (
                <td key={col.key} className="py-2 px-3 text-slate-300 align-top leading-relaxed">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex flex-col text-left animate-in fade-in duration-300 space-y-4">
      {/* Single table or grouped tables */}
      {groups ? (
        <div className="space-y-6">
          {groups.map((group, idx) => (
            <div key={idx}>
              <h3 className="text-[12px] font-bold text-amber-500 uppercase tracking-wider mb-2">
                {group.title}
              </h3>
              {renderTable(group.columns, group.rows)}
            </div>
          ))}
        </div>
      ) : (
        renderTable(columns, rows)
      )}

      {/* Footer navigation */}
      {(prevLink || nextLink) && (
        <div className="pt-4 flex justify-between items-center border-t border-white/5 mt-2 shrink-0">
          {prevLink ? (
            <Button
              variant="secondary"
              size="landing"
              onClick={() => { window.location.hash = prevLink.id; }}
              className="flex items-center gap-1.5 font-sans"
            >
              <span>← {prevLink.label}</span>
            </Button>
          ) : <div />}
          {nextLink && (
            <Button
              variant="secondary"
              size="landing"
              onClick={() => { window.location.hash = nextLink.id; }}
              className="flex items-center gap-1.5 font-sans"
            >
              <span>{nextLink.label} →</span>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
