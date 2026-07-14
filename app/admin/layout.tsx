"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Bell
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const allMenuItems = [
    { id: "dashboard", name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { id: "services", name: "Service Management", href: "/admin/services", icon: Wrench },
    { id: "courses", name: "Course Management", href: "/admin/courses", icon: BookOpen },
    { id: "categories", name: "Vastu Category Management", href: "/admin/categories", icon: Tags },
    { id: "appointments", name: "Appointment Management", href: "/admin/appointments", icon: Calendar },
    { id: "students", name: "Student Management", href: "/admin/students", icon: Users },
    { id: "instructors", name: "Instructor Management", href: "/admin/instructors", icon: UserCheck },
    { id: "blogs", name: "Blog Management", href: "/admin/blogs", icon: FileText },
    { id: "reviews", name: "Review Management", href: "/admin/reviews", icon: Star },
    { id: "reports", name: "Reports", href: "/admin/reports", icon: BarChart3 }
  ];

  const currentTitle = allMenuItems.find(item => item.href === pathname)?.name || "Admin Panel";

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex">

      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-navy text-white h-screen sticky top-0 border-r border-navy-light/20 flex-shrink-0 z-30 shadow-premium">

        {/* Sidebar Brand Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-navy-light/15 bg-navy-dark">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="VastuVidya Logo" className="h-14 w-auto object-contain brightness-0 invert" />
          </Link>
          <span className="text-[8px] tracking-widest uppercase font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md">
            v1.2
          </span>
        </div>

        {/* Navigation items list */}
        <nav className="flex-grow p-4 space-y-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {allMenuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${isActive
                    ? "bg-white/10 text-gold-start shadow-sm"
                    : "text-slate-200 hover:bg-white/5 hover:text-white"
                  }`}
              >
                {/* Left glowing gold indicator card */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-gold-gradient rounded-r-full shadow-md" />
                )}

                <Icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-gold-start" : "text-slate-500 group-hover:text-white"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer actions inside Sidebar */}
        <div className="p-4 border-t border-navy-light/15 bg-navy-dark flex flex-col gap-1">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-primary" /> Back to Main Site
          </Link>
        </div>
      </aside>

      {/* Main Admin Controller Panel Container */}
      <div className="flex-grow flex flex-col min-h-screen overflow-x-hidden">
        {/* Header Bar */}
        <header className="h-20 bg-white border-b border-border flex items-center justify-between px-6 md:px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2.5 rounded-xl text-navy hover:bg-background-alt border border-border/80 transition-colors"
            >
              <LayoutDashboard className="w-5 h-5 text-primary" />
            </button>
            <h1 className="font-serif text-lg md:text-xl font-bold text-navy">
              {currentTitle}
            </h1>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1">
              <button className="p-2 text-navy-light hover:text-primary rounded-lg transition-colors">
                <Bell className="w-4.5 h-4.5" />
              </button>
              <button className="p-2 text-navy-light hover:text-primary rounded-lg transition-colors">
                <Settings className="w-4.5 h-4.5" />
              </button>
            </div>

            <div className="w-px h-6 bg-border" />

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gold-gradient text-white flex items-center justify-center font-bold text-xs shadow-premium">
                AR
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-navy leading-none">Acharya Raghavendra</p>
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
            className="w-64 bg-navy text-white h-full flex flex-col p-4 gap-4 animate-fade-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-navy-light/10 pb-4 mb-2 h-16">
              <img src="/logo.png" alt="VastuVidya Logo" className="h-12 w-auto object-contain brightness-0 invert" />
              <button onClick={() => setSidebarOpen(false)} className="text-white hover:text-primary border border-white/10 p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-grow space-y-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {allMenuItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${isActive
                        ? "bg-white/10 text-gold-start shadow-sm"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-gold-gradient rounded-r-full shadow-md" />
                    )}
                    <Icon className={`w-4 h-4 ${isActive ? "text-gold-start" : "text-slate-500"}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-navy-light/10 pt-4 bg-navy-dark">
              <Link
                href="/"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-primary" /> Back to Main Site
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
