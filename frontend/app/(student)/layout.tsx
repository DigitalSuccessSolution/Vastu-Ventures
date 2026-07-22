"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactLenis } from "lenis/react";
import { useAuthStore } from "@/lib/store";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [checkingAuth, setCheckingAuth] = useState(true);

  React.useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    let currentUser = user;
    if (!currentUser && userStr) {
      try {
        currentUser = JSON.parse(userStr);
      } catch (e) {
        currentUser = null;
      }
    }

    if (!token || !currentUser || currentUser.role !== "student") {
      logout();
      router.replace("/login");
    } else {
      setCheckingAuth(false);
    }
  }, [user, isAuthenticated, router, logout]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-navy font-semibold">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <ReactLenis root>
      <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 min-h-[75vh]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
}
