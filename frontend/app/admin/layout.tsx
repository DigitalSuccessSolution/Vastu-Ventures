"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  BookOpen,
  Tags,
  Calendar,
  Users,
  UserCheck,
  FileText,
  Star,
  BarChart3,
  X,
  ArrowLeft,
  Settings,
  Bell,
  LogOut
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(true);
  const router = useRouter();

  const allMenuItems = [
    { id: "dashboard", name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { id: "services", name: "Service Management", href: "/admin/services", icon: Wrench },
    { id: "courses", name: "Course Management", href: "/admin/courses", icon: BookOpen },
    { id: "appointments", name: "Appointment Management", href: "/admin/appointments", icon: Calendar },
    { id: "students", name: "Student Management", href: "/admin/students", icon: Users },
    { id: "blogs", name: "Blog Management", href: "/admin/blogs", icon: FileText },
    { id: "reviews", name: "Review Management", href: "/admin/reviews", icon: Star },
    { id: "reports", name: "Reports", href: "/admin/reports", icon: BarChart3 }
  ];

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#E28A3E] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-navy font-semibold">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  const currentTitle = allMenuItems.find(item => item.href === pathname)?.name || "Admin Panel";

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex admin-panel-container">

      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-navy text-white h-screen sticky top-0 border-r border-[#1e2d4d] flex-shrink-0 z-30 shadow-premium">

        <div className="h-20 flex-shrink-0 flex items-center justify-between px-6 border-b border-white/10 bg-transparent">
          <Link href="/admin" className="flex items-center gap-2">
            <img src="/logo2.png" alt="Vastu Ventures Logo" className="h-12 w-auto object-contain" />
          </Link>
        </div>

        {/* Navigation items list */}
        <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {allMenuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium tracking-wide transition-all duration-300 border ${isActive
                  ? "bg-[#E28A3E] border-[#E28A3E] text-white shadow-md shadow-[#E28A3E]/10"
                  : "border-transparent text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
              >
                <Icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer actions inside Sidebar */}
        <div className="p-4 border-t border-white/10 bg-transparent flex flex-col gap-1">
          <button
            onClick={() => {
              localStorage.removeItem("isAdminLoggedIn");
              router.replace("/login");
            }}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors w-full text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-red-400" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Admin Controller Panel Container */}
      <div className="flex-grow flex flex-col min-h-screen min-w-0">
        {/* Header Bar */}
        <header className="sticky top-0 z-20 h-20 bg-white border-b border-border flex items-center justify-between px-6 md:px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2.5 rounded-xl text-navy hover:bg-background-alt border border-border/80 transition-colors"
            >
              <LayoutDashboard className="w-5 h-5 text-[#E28A3E]" />
            </button>
            <h1 className="font-serif text-lg md:text-xl font-semibold text-black">
              {currentTitle}
            </h1>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1">
              <button className="p-2 text-navy-light hover:text-[#E28A3E] rounded-lg transition-colors cursor-pointer">
                <Bell className="w-4.5 h-4.5" />
              </button>
              <button className="p-2 text-navy-light hover:text-[#E28A3E] rounded-lg transition-colors cursor-pointer">
                <Settings className="w-4.5 h-4.5" />
              </button>
            </div>

            <div className="w-px h-6 bg-border" />

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#E28A3E] text-white flex items-center justify-center font-semibold text-xs shadow-premium">
                AR
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-black leading-none">Acharya Raghavendra</p>
                <p className="text-[9px] text-muted-foreground mt-1.5 leading-none">Root Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic page contents render block */}
        <div className="flex-grow p-6 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </div>

      {/* Responsive mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-navy/60 backdrop-blur-sm md:hidden" onClick={() => setSidebarOpen(false)}>
          <div
            className="w-72 bg-navy text-white h-full flex flex-col p-4 gap-4 animate-fade-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 py-5 px-2 mb-2">
              <Link href="/admin" onClick={() => setSidebarOpen(false)} className="flex items-center">
                <img src="/logo2.png" alt="Vastu Ventures Logo" className="h-12 w-auto object-contain" />
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="text-white hover:text-[#E28A3E] border border-white/10 p-1.5 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-grow space-y-1.5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {allMenuItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium tracking-wide transition-all duration-300 border ${isActive
                      ? "bg-[#E28A3E] border-[#E28A3E] text-white shadow-md shadow-[#E28A3E]/10"
                      : "border-transparent text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-white/10 pt-4 bg-transparent flex flex-col gap-1">
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  localStorage.removeItem("isAdminLoggedIn");
                  router.replace("/login");
                }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors w-full text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-red-400" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
