interface CardConsProps {
  /** Optional card heading label */
  title?: string;
  /** List of problem/drawback strings shown with red ✗ cross marks */
  items: string[];
  className?: string;
}

/**
 * CardCons — renders a list of items with red ✗ cross marks.
 * Use for problems, drawbacks, avoided patterns, friction points.
 *
 * @example
 * <CardCons
 *   title="The Problem"
 *   items={["Manual setup configurations", "Scattered directory layouts"]}
 * />
 */
export default function CardCons({ title, items, className = "" }: CardConsProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {title && (
        <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block">
          {title}
        </span>
      )}
      <ul className="space-y-1.5">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2 text-xs text-slate-400"
          >
            <span className="text-rose-500 font-extrabold shrink-0 select-none mt-px">✗</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
