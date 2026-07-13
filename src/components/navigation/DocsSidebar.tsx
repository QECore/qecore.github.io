import type { DocSection } from "@/constants/docsNavigation";
import { MenuItem } from "@/components/navigation/MenuItem";

export interface DocsSidebarProps {
  groups: Record<string, DocSection[]>;
  activeSectionId: string;
  onSelectSection: (id: string) => void;
}

export function DocsSidebar({ groups, activeSectionId, onSelectSection }: DocsSidebarProps) {
  return (
    <nav aria-label="Documentation navigation" className="space-y-6 pb-1">
      {Object.entries(groups).map(([groupLabel, sections]) => {
        const isGroupActive = sections.some((s) => s.id === activeSectionId);
        return (
          <div key={groupLabel} className="space-y-2">
            <span
              className={`text-[10px] font-bold tracking-[0.15em] uppercase block px-3 transition-colors duration-200 ${isGroupActive ? "text-amber-500" : "text-slate-500"
                }`}
            >
              {groupLabel}
            </span>
            <ul className="space-y-1 pl-6 list-none p-0 m-0">
              {sections.map((section) => {
                const isActive = section.id === activeSectionId;
                return (
                  <li key={section.id}>
                    <MenuItem
                      href={`#${section.id}`}
                      active={isActive}
                      className="w-full"
                      onClick={() => onSelectSection(section.id)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="truncate">{section.title}</span>
                        {section.id === "pw-core-codegen" && (
                          <span className="px-1 bg-green-500/20 text-amber-300 border border-amber-500/30 text-[7px] font-bold uppercase rounded tracking-wider select-none shrink-0">
                            New
                          </span>
                        )}
                      </div>
                    </MenuItem>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
