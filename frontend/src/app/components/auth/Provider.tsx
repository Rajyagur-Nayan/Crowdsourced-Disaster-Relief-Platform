"use client";

import { AuthProvider } from "@/app/components/auth/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
