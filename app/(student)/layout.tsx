"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", href: "/dashboard", icon: Home },
    { name: "My Courses", href: "/dashboard/courses", icon: BookOpen },
    { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
    { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
    { name: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
    { name: "My Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-border h-screen sticky top-0">
        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-6 border-b border-border bg-white">
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/logo.png" alt="Vastu Ventures Logo" className="h-12 w-auto object-contain" />
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
                    ? "bg-gold-gradient text-white shadow-premium"
                    : "text-navy-light hover:bg-background-alt hover:text-primary"
                  }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-primary"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border bg-white">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-navy-light hover:bg-background-alt hover:text-primary transition-all mb-1"
          >
            <ArrowLeft className="w-4 h-4 text-primary" />
            Back to Site
          </Link>
          <button
            onClick={() => console.log("Logout clicked")}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-red-50 transition-all cursor-pointer"
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
              className="md:hidden fixed inset-y-0 left-0 w-64 bg-white z-50 flex flex-col h-full shadow-2xl"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-border bg-white">
                <Link href="/" className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gold-gradient text-white">
                    <Compass className="w-5 h-5" />
                  </div>
                  <span className="font-serif text-base font-bold tracking-tight text-navy">
                    Vastu<span className="text-gold-end">Vidya</span>
                  </span>
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-lg hover:bg-background-alt text-navy"
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
                          ? "bg-gold-gradient text-white shadow-premium"
                          : "text-navy-light hover:bg-background-alt hover:text-primary"
                        }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-primary"}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-border bg-white">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-navy-light hover:bg-background-alt hover:text-primary transition-all mb-1"
                >
                  <ArrowLeft className="w-4 h-4 text-primary" />
                  Back to Site
                </Link>
                <button
                  onClick={() => console.log("Logout clicked")}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-red-50 transition-all cursor-pointer"
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
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                  alt="Student Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-navy group-hover:text-primary transition-colors">
                Priya Sharma
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
