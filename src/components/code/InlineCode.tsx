/**
 * InlineCode — renders a syntax-highlighted inline <code> element.
 * Highlights PW-Core action keywords in amber.
 */
interface InlineCodeProps {
  code: string;
}

const HIGHLIGHT_REGEX =
  /\b(fill|click|dblClick|hover|focus|press|check|uncheck|selectOption|verifyHidden|verifyEnabled|verifyDisabled|verifyUrl|verifyTitle|verify|goto|getRowCount|getAll|get|not|toBeVisible)\b/g;

export default function InlineCode({ code }: InlineCodeProps) {
  const escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const highlighted = escaped.replace(
    HIGHLIGHT_REGEX,
    (match) => `<span class="text-amber-500 font-semibold">${match}</span>`
  );

  return (
    <code
      className="font-mono text-slate-300 bg-[#000000] px-1.5 py-0.5 rounded border border-white/5 inline-block text-[11px] select-text whitespace-pre"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
}
