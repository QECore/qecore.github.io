import * as React from "react";

interface SectionHeadingProps {
  icon?: any;
  title: string;
  description?: string;
}

export default function SectionHeading({ icon: Icon, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-1">
        {Icon && <Icon className="w-4.5 h-4.5 text-muted-foreground" />}
        <h2 className="font-heading font-semibold text-lg tracking-tight">{title}</h2>
      </div>
      {description && <p className="text-sm text-muted-foreground ml-6">{description}</p>}
    </div>
  );
}