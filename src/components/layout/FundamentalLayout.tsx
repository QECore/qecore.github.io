import React from "react";
import { Button } from "@/components/buttons/button";

interface LinkItem {
  id: string;
  label: string;
}

interface FundamentalLayoutProps {
  title: string;
  subtitle: string;
  prevLink?: LinkItem;
  nextLink?: LinkItem;
  bottomNote?: React.ReactNode;
  children: React.ReactNode;
}

export function FundamentalLayout({
  title,
  subtitle,
  prevLink,
  nextLink,
  bottomNote,
  children
}: FundamentalLayoutProps) {
  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      {/* Header */}
      <div className="border-b border-white/5 pb-2">
        <span className="text-[9px] uppercase font-mono font-bold tracking-[1.5px] text-amber-500 block mb-0.5 select-none">
          FRAMEWORK FUNDAMENTALS
        </span>
        <h2 className="text-[22px] font-extrabold tracking-tight text-slate-100 font-sans">
          {title}
        </h2>
        <p className="text-[12.5px] text-[#94A3B8] font-normal leading-relaxed mt-0.5 max-w-2xl">
          {subtitle}
        </p>
      </div>

      {/* Rows Container */}
      <div className="space-y-6 divide-y divide-white/5">
        {children}
      </div>

      {/* Bottom Note */}
      {bottomNote && (
        <div className="bg-amber-500/5 border border-amber-500/10 rounded-md p-4">
          {bottomNote}
        </div>
      )}

      {/* Footer Navigation */}
      <div className="pt-4 flex justify-between items-center border-t border-white/5">
        {prevLink ? (
          <Button
            variant="secondary"
            size="landing"
            onClick={() => { window.location.hash = prevLink.id; }}
            className="flex items-center gap-1.5 font-sans"
          >
            <span>← Back to {prevLink.label}</span>
          </Button>
        ) : (
          <div />
        )}

        {nextLink && (
          <Button
            variant="secondary"
            size="landing"
            onClick={() => { window.location.hash = nextLink.id; }}
            className="flex items-center gap-1.5 font-sans"
          >
            <span>Continue to {nextLink.label}</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Button>
        )}
      </div>
    </div>
  );
}

interface FundamentalRowProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function FundamentalRow({ left, right }: FundamentalRowProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[38%_62%] gap-6 pt-6 first:pt-0 first:border-t-0 items-start">
      {/* Left side (38% width): Code or Flow diagram */}
      <div className="w-full">
        {left}
      </div>
      
      {/* Right side (62% width): Explanation */}
      <div className="w-full space-y-2">
        {right}
      </div>
    </div>
  );
}
