import * as React from "react";

export default function ElasticScroll({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-full">{children}</div>;
}
