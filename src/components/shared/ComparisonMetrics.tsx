import * as React from "react";

export interface MetricItem {
  value: string | number;
  label: string;
}

export interface ComparisonMetricsProps {
  metrics: Array<MetricItem> | Record<string, string | number>;
  valueColorClass?: string;
  labelColorClass?: string;
  separator?: string;
  className?: string;
}

export default function ComparisonMetrics({
  metrics,
  valueColorClass = "text-amber-500",
  labelColorClass = "text-slate-400 dark:text-slate-500",
  separator = "•",
  className = ""
}: ComparisonMetricsProps) {
  // Convert object to array if key-value pairs are passed as a record object
  const items = Array.isArray(metrics)
    ? metrics
    : Object.entries(metrics).map(([label, value]) => ({ value, label }));

  return (
    <div className={`flex flex-wrap items-center gap-1.5 text-[12px] sm:text-[11px] font-medium leading-none mb-4 select-none ${className}`}>
      {items.map((metric, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className={`${labelColorClass} mx-1.5 font-normal select-none`}>{separator}</span>}
          <span className={valueColorClass}>{metric.value}</span>{" "}
          <span className={`${labelColorClass} font-normal`}>{metric.label}</span>
        </React.Fragment>
      ))}
    </div>
  );
}
