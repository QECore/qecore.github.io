import React from "react";
import TemplateD from "./TemplateD";
import InlineCode from "@/components/code/InlineCode";

interface ApiReferenceSectionProps {
  prevLink?: { id: string; label: string };
  nextLink?: { id: string; label: string };
}

const methodCol = [
  { key: "method", header: "Method", width: "35%" },
  { key: "params", header: "Parameters", width: "30%" },
  { key: "description", header: "Description" },
];

/**
 * ApiReferenceSection — Template D (Lookup Table)
 * Grouped method signature tables by category:
 * Navigation / Interaction / Verification / Custom / Dynamic
 */
export default function ApiReferenceSection({ prevLink, nextLink }: ApiReferenceSectionProps) {
  const groups = [
    {
      title: "Navigation",
      columns: methodCol,
      rows: [
        {
          method: <InlineCode code="page.goto()" />,
          params: <span className="text-[10px] text-slate-400">—</span>,
          description: "Navigate to the page's configured URL.",
        },
      ],
    },
    {
      title: "Interaction",
      columns: methodCol,
      rows: [
        {
          method: <InlineCode code="page.fill(key, value)" />,
          params: <span className="text-[10px] font-mono text-slate-400">key: string, value: string</span>,
          description: "Fill a textbox identified by the registry key.",
        },
        {
          method: <InlineCode code="page.click(key)" />,
          params: <span className="text-[10px] font-mono text-slate-400">key: string</span>,
          description: "Click an element identified by the registry key.",
        },
        {
          method: <InlineCode code="page.check(key)" />,
          params: <span className="text-[10px] font-mono text-slate-400">key: string</span>,
          description: "Check a checkbox identified by the registry key.",
        },
        {
          method: <InlineCode code="page.select(key, value)" />,
          params: <span className="text-[10px] font-mono text-slate-400">key: string, value: string</span>,
          description: "Select an option in a dropdown identified by the registry key.",
        },
      ],
    },
    {
      title: "Verification",
      columns: methodCol,
      rows: [
        {
          method: <InlineCode code="page.verify(key)" />,
          params: <span className="text-[10px] font-mono text-slate-400">key: string</span>,
          description: "Assert that an element is visible on the page.",
        },
        {
          method: <InlineCode code="page.verifyHidden(key)" />,
          params: <span className="text-[10px] font-mono text-slate-400">key: string</span>,
          description: "Assert that an element is not visible on the page.",
        },
        {
          method: <InlineCode code="page.verifyUrl()" />,
          params: <span className="text-[10px] text-slate-400">—</span>,
          description: "Assert the current URL matches the page's configured url.",
        },
        {
          method: <InlineCode code="page.verifyTitle()" />,
          params: <span className="text-[10px] font-mono text-slate-400">title?: string</span>,
          description: "Assert the page title matches the expected value.",
        },
      ],
    },
    {
      title: "Custom & Dynamic",
      columns: methodCol,
      rows: [
        {
          method: <InlineCode code="page.click(key, params)" />,
          params: <span className="text-[10px] font-mono text-slate-400">key: string, params: Record</span>,
          description: "Click a dynamic element, interpolating params into the template locator.",
        },
        {
          method: <InlineCode code="page.verify(key, params)" />,
          params: <span className="text-[10px] font-mono text-slate-400">key: string, params: Record</span>,
          description: "Verify visibility of a dynamic element with interpolated params.",
        },
      ],
    },
    {
      title: "Registry Functions",
      columns: methodCol,
      rows: [
        {
          method: <InlineCode code="createPageRegistry(config)" />,
          params: <span className="text-[10px] font-mono text-slate-400">config: RegistryConfig</span>,
          description: "Compile a registry config into a Playwright test function with typed fixtures.",
        },
        {
          method: <InlineCode code="createPageConfig(config)" />,
          params: <span className="text-[10px] font-mono text-slate-400">config: PageConfig</span>,
          description: "Create a raw page configuration object (used internally by the registry).",
        },
      ],
    },
  ];

  return (
    <TemplateD
      label="REFERENCE"
      title="API"
      subtitle="All exported functions and page action methods, grouped by category."
      columns={[]}
      rows={[]}
      groups={groups}
      prevLink={prevLink}
      nextLink={nextLink}
    />
  );
}
