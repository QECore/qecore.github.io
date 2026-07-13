import React from "react";
import TemplateD from "./TemplateD";
import InlineCode from "@/components/code/InlineCode";

interface TypesReferenceSectionProps {
  prevLink?: { id: string; label: string };
  nextLink?: { id: string; label: string };
}

/**
 * TypesReferenceSection — Template D (Lookup Table)
 * Interface/type table with generics explained inline.
 */
export default function TypesReferenceSection({ prevLink, nextLink }: TypesReferenceSectionProps) {
  const columns = [
    { key: "type", header: "Interface / Type", width: "30%" },
    { key: "generics", header: "Generics", width: "25%" },
    { key: "description", header: "Description" },
  ];

  const rows = [
    {
      type: <InlineCode code="RegistryConfig" />,
      generics: <span className="text-[10px] text-slate-500">—</span>,
      description: "Top-level object passed to createPageRegistry(). Each key defines a page, each value is a PageConfig.",
    },
    {
      type: <InlineCode code="PageConfig" />,
      generics: <span className="text-[10px] text-slate-500">—</span>,
      description: "Configuration for a single page: url, textbox, button, link, checkbox, selector, testId, dynamic fields.",
    },
    {
      type: <InlineCode code="TypedPage" />,
      generics: <span className="text-[10px] font-mono text-amber-500/80">&lt;TConfig extends PageConfig&gt;</span>,
      description: "Base class for workflow extensions. TConfig constrains which keys are available on this, fill(), click(), etc.",
    },
    {
      type: <InlineCode code="GeneratedPage" />,
      generics: <span className="text-[10px] font-mono text-amber-500/80">&lt;TConfig extends PageConfig&gt;</span>,
      description: "The page instance type returned by the registry compiler. Extends TypedPage with auto-generated methods.",
    },
    {
      type: <InlineCode code="TestFixtures" />,
      generics: <span className="text-[10px] font-mono text-amber-500/80">&lt;TRegistry extends RegistryConfig&gt;</span>,
      description: "Maps each registry key to a GeneratedPage fixture. Destructured in test() function signatures.",
    },
    {
      type: <InlineCode code="DynamicParams" />,
      generics: <span className="text-[10px] font-mono text-amber-500/80">&lt;TTemplate extends string&gt;</span>,
      description: "Extracts {placeholder} names from a template string and creates a typed Record for runtime params.",
    },
    {
      type: <InlineCode code="LocatorKey" />,
      generics: <span className="text-[10px] font-mono text-amber-500/80">&lt;TConfig extends PageConfig&gt;</span>,
      description: "Union type of all valid locator keys for a given page config. Provides compile-time typo prevention.",
    },
    {
      type: <InlineCode code="Table<T>" />,
      generics: <span className="text-[10px] font-mono text-amber-500/80">&lt;T extends Record&lt;string, string&gt;&gt;</span>,
      description: "Table component helper type. T defines the shape of parsed row objects returned by getRows().",
    },
  ];

  return (
    <TemplateD
      label="REFERENCE"
      title="Types"
      subtitle="Generic compiler interfaces and static validation types used throughout PW-Core."
      columns={columns}
      rows={rows}
      prevLink={prevLink}
      nextLink={nextLink}
    />
  );
}
