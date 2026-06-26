// @ts-nocheck
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { client } from "@/api/client";
import SkeuButton from "@/components/shared/SkueButton";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { LogIn, Mail, Lock, Loader2, User } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await client.auth.loginViaEmailPassword(email, password);
      window.location.href = "/app";
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleDefaultUser = async () => {
    setError("");
    setLoading(true);
    try {
      await client.auth.loginViaEmailPassword("default@mail.com", "default");
      window.location.href = "/app";
    } catch (err: any) {
      setError(err.message || "Failed to log in as default user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      icon={LogIn}
      title="Welcome back"
      subtitle="Log in to your account"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link id="link-register" data-test-id="link-register" data-testid="link-register" to="/register" className="text-primary font-medium hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <SkeuButton
        id="login-default-user"
        data-test-id="login-default-user"
        data-testid="login-default-user"
        className="w-full h-12 text-sm font-medium mb-6"
        onClick={handleDefaultUser}
        disabled={loading}
      >
        <User className="w-5 h-5 mr-2" />
        Login as Default User
      </SkeuButton>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-3 text-muted-foreground">or</span>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input
              id="email"
              data-test-id="email-input"
              data-testid="email-input"
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
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link id="link-forgot-password" data-test-id="link-forgot-password" data-testid="link-forgot-password" to="/forgot-password" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input
              id="password"
              data-test-id="password-input"
              data-testid="password-input"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 h-12"
              required
            />
          </div>
        </div>
        <SkeuButton id="login-submit" data-test-id="login-submit" data-testid="login-submit" type="submit" variant="primary" className="w-full h-12 font-medium" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Logging in...
            </>
          ) : (
            "Log in"
          )}
        </SkeuButton>
        <div className="mt-4 text-center text-xs text-muted-foreground">
          Default credentials: <span className="font-semibold text-foreground">default@mail.com</span> / <span className="font-semibold text-foreground">default</span>
        </div>
      </form>
    </AuthLayout>
  );
}
