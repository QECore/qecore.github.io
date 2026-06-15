// @ts-nocheck
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { client } from "@/api/client";
import SkeuButton from "@/components/shared/SkueButton";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { KeyRound, Mail, Lock, ArrowLeft, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";

export default function ForgotPassword() {
  const navigate = useNavigate();

  // Step: "email" → verify user exists, then "password" → set new password, then "done"
  const [step, setStep] = useState<"email" | "password" | "done">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  // Step 1: Check if user exists
  const handleCheckUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await client.auth.checkUser(email);
      setStep("password");
    } catch (err: any) {
      setError(err.message || "No account found with this email address");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Set new password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setWarning("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await client.auth.resetPassword({ email, password });
      setStep("done");
    } catch (err: any) {
      // Check if the error is about same password
      if (err.message?.toLowerCase().includes("same")) {
        setWarning(err.message);
        setError("");
      } else {
        setError(err.message || "Failed to reset password");
      }
    } finally {
      setLoading(false);
    }
  };

  // Render step content
  const renderEmail = () => (
    <form onSubmit={handleCheckUser} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
          <Input
            id="email"
            type="email"
            autoComplete="email"
            autoFocus
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 h-12"
            required
          />
        </div>
      </div>
      <SkeuButton type="submit" variant="primary" className="w-full h-12 font-medium" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Verifying...
          </>
        ) : (
          "Continue"
        )}
      </SkeuButton>
    </form>
  );

  const renderPassword = () => (
    <form onSubmit={handleResetPassword} className="space-y-4">
      <div className="rounded-lg bg-muted/50 border border-border px-3 py-2.5 mb-1 flex items-center gap-2">
        <Mail className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <span className="text-sm text-foreground truncate">{email}</span>
        <button
          type="button"
          onClick={() => { setStep("email"); setError(""); setWarning(""); setPassword(""); setConfirmPassword(""); }}
          className="ml-auto text-xs text-primary hover:underline shrink-0"
        >
          Change
        </button>
      </div>

      {warning && (
        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{warning}</span>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="new-password">New Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
          <Input
            id="new-password"
            type="password"
            autoComplete="new-password"
            autoFocus
            placeholder="••••••••"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setWarning(""); }}
            className="pl-10 h-12"
            required
            minLength={6}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm New Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
          <Input
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-10 h-12"
            required
            minLength={6}
          />
        </div>
      </div>
      <SkeuButton type="submit" variant="primary" className="w-full h-12 font-medium" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Resetting...
          </>
        ) : (
          "Reset Password"
        )}
      </SkeuButton>
    </form>
  );

  const renderDone = () => (
    <div className="text-center space-y-4">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 mx-auto">
        <CheckCircle2 className="w-7 h-7 text-emerald-500" />
      </div>
      <div>
        <p className="text-foreground font-medium">Password reset successful!</p>
        <p className="text-sm text-muted-foreground mt-1">
          Your password has been updated. You can now log in with your new password.
        </p>
      </div>
      <SkeuButton variant="primary" className="w-full h-12 font-medium" onClick={() => navigate("/login")}>
        Go to Login
      </SkeuButton>
    </div>
  );

  const subtitles = {
    email: "Enter your email to get started",
    password: "Choose a new password",
    done: "",
  };

  return (
    <AuthLayout
      icon={KeyRound}
      title={step === "done" ? "All set!" : "Reset password"}
      subtitle={subtitles[step]}
      footer={
        step !== "done" && (
          <Link to="/login" className="text-primary font-medium hover:underline">
            <ArrowLeft className="w-3 h-3 inline mr-1" />Back to log in
          </Link>
        )
      }
    >
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      {step === "email" && renderEmail()}
      {step === "password" && renderPassword()}
      {step === "done" && renderDone()}
    </AuthLayout>
  );
}
