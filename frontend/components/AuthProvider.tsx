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
    const isAdminRoute = pathname.startsWith("/admin");
    const isDashboardRoute = pathname.startsWith("/dashboard");
    const isAuthRoute = pathname === "/login" || pathname.startsWith("/register") || pathname.startsWith("/verify-otp") || pathname === "/admin/login";

    if (!isAuthenticated) {
      if (isAdminRoute && pathname !== "/admin/login") {
        router.replace("/admin/login");
      } else if (isDashboardRoute) {
        router.replace("/login");
      }
    } else if (isAuthRoute) {
      const searchParams = new URLSearchParams(window.location.search);
      const redirectParam = searchParams.get("redirect");
      if (redirectParam) {
        router.replace(redirectParam);
      } else if (pathname === "/admin/login") {
        router.replace("/admin");
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
