import * as React from "react";

const methodStyles: Record<string, string> = {
  GET: "skeu-badge-method-get",
  POST: "skeu-badge-method-post",
  PUT: "skeu-badge-method-put",
  PATCH: "skeu-badge-method-patch",
  DELETE: "skeu-badge-method-delete",
};

interface EndpointBadgeProps {
  method: string;
}

export default function EndpointBadge({ method }: EndpointBadgeProps) {
  return (
    <span className={`endpoint-badge px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase select-none ${methodStyles[method] || "bg-secondary text-foreground"}`}>
      {method}
    </span>
  );
}