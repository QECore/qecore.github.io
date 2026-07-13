import React from "react";

type AccentColor = "amber" | "emerald" | "rose" | "indigo" | "slate";
type CardVariant = "default" | "dark";

interface DocCardProps {
  /** Small label above the heading (e.g. "GETTING STARTED") */
  subtitle?: string;
  /** Main card heading */
  heading?: string;
  /** Badge aligned to title baseline */
  badge?: React.ReactNode;
  /** Body description paragraph */
  description?: string;
  /** Accent color that tints the border and subtitle/heading */
  accentColor?: AccentColor;
  /** Background shade: "default" = #0c0c0c, "dark" = #090909 */
  variant?: CardVariant;
  /** Footer note shown below a divider at the bottom of the card */
  postContent?: React.ReactNode;
  /** Freeform content slot (code blocks, lists, etc.) */
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const accentMap: Record<AccentColor, { border: string; subtitle: string; heading: string }> = {
  amber: {
    border: "border-amber-500/15",
    subtitle: "text-amber-500",
    heading: "text-slate-100",
  },
  emerald: {
    border: "border-emerald-500/15",
    subtitle: "text-emerald-400",
    heading: "text-slate-100",
  },
  rose: {
    border: "border-rose-500/15",
    subtitle: "text-rose-400",
    heading: "text-slate-100",
  },
  indigo: {
    border: "border-indigo-500/15",
    subtitle: "text-indigo-400",
    heading: "text-slate-100",
  },
  slate: {
    border: "border-white/5",
    subtitle: "text-slate-400",
    heading: "text-slate-100",
  },
};

const variantBg: Record<CardVariant, string> = {
  default: "bg-[#0c0c0c]/80",
  dark: "bg-[#090909]",
};

export default function DocCard({
  subtitle,
  heading,
  badge,
  description,
  accentColor = "amber",
  variant = "default",
  postContent,
  children,
  className = "",
  style,
}: DocCardProps) {
  const accent = accentMap[accentColor];
  const bg = variantBg[variant];

  return (
    <div
      className={`${bg} border ${accent.border} rounded-2xl p-6 flex flex-col justify-between space-y-5 ${className}`}
      style={style}
    >
      <div className="flex-1 space-y-2">
        {/* Header: subtitle + heading + badge */}
        {(subtitle || heading) && (
          <div className="border-b border-white/5">
            {subtitle && (
              <span
                className={`text-[10px] font-semibold tracking-[0.14em] uppercase block mb-1.5 leading-none ${accent.subtitle}`}
              >
                {subtitle}
              </span>
            )}
            <div className="flex items-baseline justify-between gap-4">
              {heading && (
                <h3 className="text-[16px] font-semibold text-slate-100 font-sans tracking-tight">
                  {heading}
                </h3>
              )}
              {badge}
            </div>
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-[12px] text-[#94A3B8] leading-relaxed lg:min-h-[40px]">{description}</p>
        )}

        {/* Freeform children slot */}
        {children && <div className="space-y-4">{children}</div>}
      </div>

      {/* Post-content footer */}
      {postContent && (
        <div className="pt-4 border-t border-white/5">
          <p className="text-[11px] text-[#64748B]">{postContent}</p>
        </div>
      )}
    </div>
  );
}
