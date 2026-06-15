import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";

function ToastItem({ toast, onDismiss }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate in
    const t1 = setTimeout(() => setVisible(true), 10);
    // Auto dismiss at 3s
    const t2 = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(), 300);
    }, 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const isDestructive = toast.variant === "destructive";
  const Icon = isDestructive ? AlertCircle : CheckCircle2;

  return (
    <div
      className={`
        flex items-start gap-3 w-full max-w-sm pointer-events-auto
        skeu-card px-4 py-3 shadow-lg
        transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
        ${isDestructive ? "border-destructive/40 bg-destructive/5" : ""}
      `}
    >
      <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isDestructive ? "text-destructive" : "text-emerald-600"}`} />
      <div className="flex-1 min-w-0">
        {toast.title && <p className="text-sm font-semibold leading-tight">{toast.title}</p>}
        {toast.description && <p className="text-xs text-muted-foreground mt-0.5">{toast.description}</p>}
      </div>
      <button
        onClick={() => { setVisible(false); setTimeout(() => onDismiss(), 300); }}
        className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 items-end pointer-events-none">
      {toasts.filter(t => t.open !== false).map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
      ))}
    </div>
  );
}