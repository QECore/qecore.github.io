import React from "react";
import { FundamentalLayout, FundamentalRow } from "@/components/layout/FundamentalLayout";

interface GeneratedApisSectionProps {
  prevLink?: { id: string; label: string };
  nextLink?: { id: string; label: string };
}

const SmallCodeBox = ({ code }: { code: string }) => (
  <div className="rounded-md overflow-hidden border border-white/5 bg-[#000000] p-3.5 text-[10px] font-mono leading-relaxed text-[#FF9E3B] shadow-sm w-full">
    <pre className="whitespace-pre">{code}</pre>
  </div>
);

const RowExplanation = ({ title, icon, description }: { title: string, icon: string, description: string }) => (
  <div className="space-y-1.5 pt-1">
    <h3 className="text-slate-100 font-bold text-[13px] flex items-center gap-1.5">
      <span>{icon}</span> {title}
    </h3>
    <p className="text-[12px] text-[#94A3B8] font-sans leading-relaxed">
      {description}
    </p>
  </div>
);

export default function GeneratedApisSection({ prevLink, nextLink }: GeneratedApisSectionProps) {
  return (
    <FundamentalLayout
      title="Generated Pages & APIs"
      subtitle="What does PW-Core generate from your registry? The framework compiles definitions into type-safe methods."
      prevLink={prevLink}
      nextLink={nextLink}
      bottomNote={
        <p className="text-[11px] text-[#E2E8F0] leading-snug font-sans">
          💡 <strong>PW-Core generates full Page Objects and interaction methods automatically.</strong> You do not need to write boilerplate locator or action definitions manually.
        </p>
      }
    >
      {/* Row 1: Navigation APIs */}
      <FundamentalRow
        left={
          <SmallCodeBox
            code={`await login.goto();
await dashboard.goto();`}
          />
        }
        right={
          <RowExplanation
            icon="🌍"
            title="Navigation APIs"
            description="Exposes navigation actions mapped to the configured page URLs in your registry."
          />
        }
      />

      {/* Row 2: Interaction APIs */}
      <FundamentalRow
        left={
          <SmallCodeBox
            code={`await login.fill("username", "John");
await login.click("Sign In");
await login.check("Remember Me");
await login.select("country", "USA");`}
          />
        }
        right={
          <RowExplanation
            icon="🎯"
            title="Interaction APIs"
            description="Generates standard E2E action methods (fill, click, check, select) mapped directly to your defined locator keys."
          />
        }
      />

      {/* Row 3: Verification APIs */}
      <FundamentalRow
        left={
          <SmallCodeBox
            code={`await login.verify("Invalid Credentials");
await login.verifyHidden("Spinner");
await login.verifyUrl();
await login.verifyTitle();`}
          />
        }
        right={
          <RowExplanation
            icon="👁️"
            title="Verification APIs"
            description="Exposes clean assertions to confirm element visibility, text matching, URL correctness, and page titles."
          />
        }
      />

      {/* Row 4: Custom APIs */}
      <FundamentalRow
        left={
          <SmallCodeBox
            code={`await dashboard.click("profile");
await dashboard.verify("loading");`}
          />
        }
        right={
          <RowExplanation
            icon="🎨"
            title="Custom APIs"
            description="Resolves custom selectors and test IDs dynamically. Keeps spec files clean of raw query details."
          />
        }
      />

      {/* Row 5: Dynamic APIs */}
      <FundamentalRow
        left={
          <SmallCodeBox
            code={`await users.click("row", { id: 101 });`}
          />
        }
        right={
          <RowExplanation
            icon="⚡"
            title="Dynamic APIs"
            description="Resolves parameterized elements at runtime by interpolating custom dynamic keys (e.g. {id})."
          />
        }
      />
    </FundamentalLayout>
  );
}
