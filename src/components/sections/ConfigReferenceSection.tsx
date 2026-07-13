import React from "react";
import TemplateD from "./TemplateD";
import InlineCode from "@/components/code/InlineCode";

interface ConfigReferenceSectionProps {
  prevLink?: { id: string; label: string };
  nextLink?: { id: string; label: string };
}

/**
 * ConfigReferenceSection — Template D (Lookup Table)
 * Dense property reference table for page configuration fields.
 */
export default function ConfigReferenceSection({ prevLink, nextLink }: ConfigReferenceSectionProps) {
  const columns = [
    { key: "property", header: "Property", width: "20%" },
    { key: "type", header: "Type", width: "25%" },
    { key: "default", header: "Default", width: "15%" },
    { key: "description", header: "Description" },
  ];

  const rows = [
    {
      property: <InlineCode code="url" />,
      type: <span className="text-[10px] font-mono text-slate-400">string</span>,
      default: <span className="text-slate-500 text-[10px]">—</span>,
      description: "The route path for page navigation. Used by goto() to navigate.",
    },
    {
      property: <InlineCode code="textbox" />,
      type: <span className="text-[10px] font-mono text-slate-400">string[]</span>,
      default: <span className="text-[10px] font-mono text-slate-500">[]</span>,
      description: "Text input labels resolved via getByRole('textbox', { name }).",
    },
    {
      property: <InlineCode code="button" />,
      type: <span className="text-[10px] font-mono text-slate-400">string[]</span>,
      default: <span className="text-[10px] font-mono text-slate-500">[]</span>,
      description: "Button labels resolved via getByRole('button', { name }).",
    },
    {
      property: <InlineCode code="link" />,
      type: <span className="text-[10px] font-mono text-slate-400">string[]</span>,
      default: <span className="text-[10px] font-mono text-slate-500">[]</span>,
      description: "Link labels resolved via getByRole('link', { name }).",
    },
    {
      property: <InlineCode code="checkbox" />,
      type: <span className="text-[10px] font-mono text-slate-400">string[]</span>,
      default: <span className="text-[10px] font-mono text-slate-500">[]</span>,
      description: "Checkbox labels resolved via getByRole('checkbox', { name }).",
    },
    {
      property: <InlineCode code="selector" />,
      type: <span className="text-[10px] font-mono text-slate-400">Record&lt;string, string&gt;</span>,
      default: <span className="text-[10px] font-mono text-slate-500">{"{}"}</span>,
      description: "Custom CSS/XPath selectors. Each key becomes a locator name.",
    },
    {
      property: <InlineCode code="testId" />,
      type: <span className="text-[10px] font-mono text-slate-400">Record&lt;string, string&gt;</span>,
      default: <span className="text-[10px] font-mono text-slate-500">{"{}"}</span>,
      description: "Maps keys to data-testid attribute values.",
    },
    {
      property: <InlineCode code="dynamic" />,
      type: <span className="text-[10px] font-mono text-slate-400">Record&lt;string, string&gt;</span>,
      default: <span className="text-[10px] font-mono text-slate-500">{"{}"}</span>,
      description: "Parameterized locator templates with {placeholder} syntax.",
    },
  ];

  return (
    <TemplateD
      label="REFERENCE"
      title="Configuration"
      subtitle="All available fields for page configuration objects inside createPageRegistry()."
      columns={columns}
      rows={rows}
      prevLink={prevLink}
      nextLink={nextLink}
    />
  );
}
