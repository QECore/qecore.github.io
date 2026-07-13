interface ProItem {
  label: string;
  href?: string;
}

interface CardProsProps {
  /** Optional card heading label */
  title?: string;
  /** List of benefit/result strings or objects with href link properties */
  items: (string | ProItem)[];
  className?: string;
}

export default function CardPros({ title, items, className = "" }: CardProsProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {title && (
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.14em] block mb-1">
          {title}
        </span>
      )}
      <ul className="space-y-0.5">
        {items.map((item, idx) => {
          const isObj = typeof item !== "string";
          const label = isObj ? item.label : item;
          const href = isObj ? item.href : undefined;

          if (href) {
            return (
              <li key={idx}>
                <a
                  href={href}
                  className="flex items-center justify-between gap-2 text-xs text-slate-300 w-full hover:bg-white/5 hover:text-white px-2 py-1.5 rounded-lg transition-all duration-150 min-h-[36px] group/item"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500 font-extrabold shrink-0 select-none">✓</span>
                    <span className="font-medium text-left">{label}</span>
                  </div>
                  <span className="text-slate-600 group-hover/item:text-slate-400 transition-colors text-[11px] font-sans pr-1">&rarr;</span>
                </a>
              </li>
            );
          }

          return (
            <li
              key={idx}
              className="flex items-center gap-2 text-xs text-slate-300 px-2 py-1.5 min-h-[36px]"
            >
              <span className="text-emerald-500 font-extrabold shrink-0 select-none">✓</span>
              <span className="text-left">{label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
