import { AuthProvider } from "@/lib/AuthContext";
import { queryClientInstance } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/feedback/Toaster";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        {children}
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}
