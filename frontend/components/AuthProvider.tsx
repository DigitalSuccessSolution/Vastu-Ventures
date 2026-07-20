"use client";

import { useEffect, useState } from "react";
import { initAuth, useAuthStore } from "@/lib/store";
import { usePathname, useRouter } from "next/navigation";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isInitializing, setIsInitializing] = useState(true);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    initAuth();
    setIsInitializing(false);
  }, []);

  useEffect(() => {
    if (isInitializing) return;

    // Route protection logic
    const isDashboardRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");
    const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/verify-otp");

    if (isDashboardRoute && !isAuthenticated) {
      router.replace("/login");
    } else if (isAuthRoute && isAuthenticated) {
      const searchParams = new URLSearchParams(window.location.search);
      const redirectParam = searchParams.get("redirect");
      if (redirectParam) {
        router.replace(redirectParam);
      } else {
        router.replace("/dashboard");
      }
    }
  }, [isInitializing, isAuthenticated, pathname, router]);

  if (isInitializing) {
    return <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">Loading...</div>; // simple loading state
  }

  return <>{children}</>;
}
