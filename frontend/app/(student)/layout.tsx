"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Compass,
  Home,
  BookOpen,
  Calendar,
  CreditCard,
  Heart,
  User,
  Settings,
  Bell,
  Menu,
  X,
  LogOut,
  ArrowLeft,
  PlayCircle,
  TrendingUp,
  Award,
  LayoutDashboard
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/lib/store";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      // Optional: Call backend to invalidate token if necessary
      // await fetch("http://localhost:5000/api/v1/auth/logout", { method: "POST", ... });
    } catch (e) {
      console.error(e);
    }
    logout();
    router.push("/login");
  };

  const menuItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "My Courses", href: "/dashboard/courses", icon: BookOpen },
    { name: "Continue Learning", href: "/dashboard/continue-learning", icon: PlayCircle },
    { name: "Course Progress", href: "/dashboard/progress", icon: TrendingUp }, 
    { name: "Certificates", href: "/dashboard/certificates", icon: Award }, 
    { name: "Appointment History", href: "/dashboard/appointments", icon: Calendar },
    { name: "Payment History", href: "/dashboard/payments", icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-navy text-white h-screen sticky top-0 border-r border-[#1e2d4d] flex-shrink-0 z-30 shadow-premium">
        {/* Sidebar Header */}
        <div className="h-20 flex-shrink-0 flex items-center justify-center px-6 border-b border-white/10 bg-transparent">
          <Link href="/dashboard" className="flex items-center gap-2">
            <img src="/logo.png" alt="Vastu Ventures Logo" className="h-16 w-auto object-contain" />
          </Link>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-grow p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                    ? "bg-[#E28A3E] text-white shadow-premium"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-white/70"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 bg-transparent">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-all mb-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="md:hidden fixed inset-0 bg-black z-40"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="md:hidden fixed inset-y-0 left-0 w-72 bg-navy text-white z-50 flex flex-col h-full shadow-2xl"
            >
              <div className="h-20 flex-shrink-0 flex items-center justify-between px-6 border-b border-white/10 bg-transparent">
                <Link href="/dashboard" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2">
                  <img src="/logo.png" alt="Vastu Ventures Logo" className="h-12 w-auto object-contain" />
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-lg text-white hover:text-[#E28A3E] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                          ? "bg-[#E28A3E] text-white shadow-premium"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-white/70"}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-white/10 bg-transparent">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-all mb-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Site
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 rounded-lg hover:bg-background-alt text-navy"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm md:text-base font-semibold text-navy">
              Student Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification bell */}
            <button className="relative p-2 rounded-xl text-navy hover:bg-background-alt transition-colors">
              <Bell className="w-5 h-5 text-navy-light" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-gold-end rounded-full ring-2 ring-white animate-pulse" />
            </button>

            {/* Profile Avatar */}
            <Link href="/dashboard/profile" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors">
                <img
                  src={user?.avatar?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "Student")}`}
                  alt={user?.name || "Student"}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-navy group-hover:text-primary transition-colors">
                {user?.name || "Student"}
              </span>
            </Link>
          </div>
        </header>

        {/* Dashboard Main Viewport */}
        <main className="flex-grow p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
