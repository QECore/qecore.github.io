import React from "react";

interface ReusableWorkflowsSectionProps {}

function FlowCode({ code, title }: { code: string; title: string }) {
  return (
    <div className="bg-[#0b0b0c]/60 border border-white/5 rounded-xl w-full max-w-[280px] overflow-hidden shadow-sm">
      <div className="bg-white/[0.02] border-b border-white/5 px-3 py-1 text-[9px] font-mono text-slate-500 uppercase tracking-wider">
        {title}
      </div>
      <pre className="p-2.5 text-[9.5px] font-mono leading-relaxed text-slate-300 overflow-x-auto whitespace-pre">
        {code}
      </pre>
    </div>
  );
}

function ArrowDown() {
  return (
    <div className="text-amber-500/40 text-xs py-0.5 font-mono select-none">↓</div>
  );
}

interface InfoCardProps {
  title: string;
  description: string;
}

function InfoCard({ title, description }: InfoCardProps) {
  return (
    <div className="bg-[#0b0b0c]/60 border border-white/5 hover:border-amber-500/20 rounded-xl p-4 transition-all duration-150 hover:translate-y-[-1px] space-y-1">
      <h4 className="text-xs font-bold text-slate-200 font-sans">{title}</h4>
      <p className="text-[11px] text-[#94A3B8] leading-normal font-sans">{description}</p>
    </div>
  );
}

export default function ReusableWorkflowsSection({}: ReusableWorkflowsSectionProps) {
  return (
    <div className="flex flex-col text-left animate-in fade-in duration-300">
      {/* Two-column body */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-start overflow-hidden pb-12">
        {/* Left: Code vertical flow */}
        <div className="flex flex-col items-center justify-center p-6 bg-[#070708]/30 border border-white/5 rounded-2xl w-full py-6 space-y-1.5">
          <FlowCode
            title="Repeated Code"
            code={`await login.fill("username", "admin");\nawait login.click("Sign In");`}
          />
          <ArrowDown />
          <FlowCode
            title="Simplified"
            code={`await login.login();`}
          />
          <ArrowDown />
          <FlowCode
            title="TypedPage Implementation"
            code={`class LoginPage extends TypedPage {\n  async login() {\n    await this.fill("username", "admin");\n    await this.click("Sign In");\n  }\n}`}
          />
        </div>

        {/* Right: Three cards + info box */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3.5">
            <InfoCard
              title="Problem"
              description="Repeated action sequences across multiple test files build up duplicate code and maintenance overhead."
            />
            <InfoCard
              title="Solution"
              description="Group repeated steps into a single reusable page workflow method, keeping your tests highly readable."
            />
            <InfoCard
              title="Implementation"
              description="Extend compiled page behaviors using TypedPage. Page configurations and custom helper actions coexist seamlessly."
            />
          </div>

          <div className="bg-[#0b0b0c]/40 border border-white/5 rounded-xl p-4 text-[11px] text-[#94A3B8] leading-relaxed font-sans font-normal">
            💡 <strong className="text-amber-500 font-semibold">You never have to use TypedPage.</strong> Generated APIs are fully sufficient for most projects.
          </div>
        </div>
      </div>
    </div>
  );
}
