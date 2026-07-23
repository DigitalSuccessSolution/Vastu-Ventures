"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, Compass, Home, Briefcase, Factory, BookOpen, Calendar, HelpCircle, Info, FileText, Monitor, UserRound, MapPin, Building2, PencilRuler, LayoutDashboard, User, PlayCircle, TrendingUp, Award, CreditCard, LogOut, ChevronRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/lib/store";

const studentMenuItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "My Courses", href: "/dashboard/courses", icon: BookOpen },
  { name: "Certificates", href: "/dashboard/certificates", icon: Award },
  { name: "Appointment History", href: "/dashboard/appointments", icon: Calendar },
  { name: "Payment History", href: "/dashboard/payments", icon: CreditCard }
];

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change, but auto-expand active service
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    const activeLink = navLinks.find(link => link.items.some(item => pathname === item.href));
    if (activeLink) {
      setActiveMobileDropdown(activeLink.trigger);
    } else {
      setActiveMobileDropdown(null);
    }
  }, [pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add("lenis-stopped", "overflow-hidden");
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.classList.remove("lenis-stopped", "overflow-hidden");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.classList.remove("lenis-stopped", "overflow-hidden");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const [archCategories, setArchCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchNavbarCategories = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
        const res = await fetch(`${apiUrl}/architecture-categories`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          const formatted = data.data.map((cat: any) => ({
            name: cat.name,
            href: `/architecture-planning/${cat.slug}`,
            icon: cat.name.includes("Commercial") ? Building2 : cat.name.includes("Plot") ? MapPin : cat.name.includes("Consultation") ? PencilRuler : Home,
            desc: cat.description || "Vastu Compliant Blueprint",
            iconColor: "text-[#3D523A]"
          }));
          setArchCategories(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch navbar architecture categories:", err);
      }
    };
    fetchNavbarCategories();
  }, []);

  const navLinks = [
    {
      name: "Vastu Services",
      trigger: "services",
      items: [
        { name: "Residential Vastu", href: "/services/residential-vastu", icon: Home, desc: "For Homes & Villas", iconColor: "text-[#3D523A]" },
        { name: "Commercial Vastu", href: "/services/commercial-vastu", icon: Briefcase, desc: "For Offices & Businesses", iconColor: "text-[#3D523A]" },
        { name: "Industrial Vastu", href: "/services/industrial-vastu", icon: Factory, desc: "For Factories & Industries", iconColor: "text-[#3D523A]" },
        { name: "Online Consultation", href: "/book", icon: Monitor, desc: "Consult from Anywhere", iconColor: "text-[#3D523A]" },
        { name: "Offline Consultation", href: "/contact", icon: MapPin, desc: "Expert Visit to Your Place", iconColor: "text-[#3D523A]" }
      ]
    },
    {
      name: "Architecture Planning",
      trigger: "architecture",
      items: archCategories
    }
  ];

  const secondaryLinks = [
    { name: "Blog", href: "/blogs", icon: FileText },
    { name: "Contact Us", href: "/contact", icon: HelpCircle }
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md py-3 shadow-premium transition-[background-color,padding] duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 xl:gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group h-16 relative w-40 shrink-0">
              <img src="/logo.png" alt="Vastu Ventures Logo" className="h-20 max-h-[72px] w-auto object-contain absolute left-0 top-1/2 -translate-y-1/2" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors ${pathname === "/" ? "text-primary" : "text-black hover:text-primary"
                  }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`text-sm font-medium transition-colors ${pathname === "/about" ? "text-primary" : "text-black hover:text-primary"
                  }`}
              >
                About Us
              </Link>
              {navLinks.map((dropdown) => {
                const isDropdownActive = dropdown.items.some(
                  (item) => pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                );
                return (
                  <div
                    key={dropdown.trigger}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(dropdown.trigger)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`flex items-center gap-1.5 py-2 text-sm font-medium transition-colors cursor-pointer ${isDropdownActive ? "text-primary" : "text-black hover:text-primary"
                        }`}
                    >
                      {dropdown.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === dropdown.trigger ? "rotate-180" : ""}`} />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {activeDropdown === dropdown.trigger && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 mt-2 w-80 rounded-2xl bg-white border border-border p-4 shadow-premium-lg"
                        >
                          <div className="flex flex-col gap-1">
                            {dropdown.items.map((item) => {
                              const IconComponent = item.icon;
                              const isItemActive = pathname === item.href;
                              return (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  className="flex items-center gap-4.5 p-3 rounded-xl hover:bg-[#FAF6F0]/65 transition-all group/item"
                                >
                                  <div className={`flex-shrink-0 flex items-center justify-center ${isItemActive ? "text-primary" : item.iconColor}`}>
                                    <IconComponent className="w-6 h-6" strokeWidth={1.5} />
                                  </div>
                                  <div className="text-left">
                                    <h4 className={`text-sm font-semibold group-hover/item:text-primary transition-colors leading-none ${isItemActive ? "text-primary" : "text-black"
                                      }`}>
                                      {item.name}
                                    </h4>
                                    <p className="text-xs text-muted-foreground mt-1.5 font-light">
                                      {item.desc}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <Link
                href="/courses"
                className={`text-sm font-medium transition-colors ${pathname === "/courses" ? "text-primary" : "text-black hover:text-primary"
                  }`}
              >
                Courses
              </Link>

              {secondaryLinks.map((link) => {
                const isLinkActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors ${isLinkActive ? "text-primary" : "text-black hover:text-primary"
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action & Account Buttons */}
          <div className="flex items-center gap-3">
            {/* Consultation Booking Button (Desktop) */}
            <Link
              href="/book"
              className="hidden lg:flex px-5 py-2.5 rounded-xl bg-gold-gradient text-white text-sm font-semibold shadow-premium hover:shadow-premium-lg hover:scale-[1.02] active:scale-[0.98] transition-all items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book Consultation
            </Link>

            {/* Profile Dropdown / Login Button (Both Desktop & Mobile) */}
            {user && user.role !== "admin" ? (
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("profile")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "profile" ? null : "profile")}
                  className="flex items-center gap-1.5 p-1 rounded-full border border-[#EDE3D0] bg-white hover:bg-[#FAF6F0] transition-all shadow-sm cursor-pointer group shrink-0"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-navy text-white font-bold flex items-center justify-center text-xs overflow-hidden border border-primary/40 shrink-0">
                    {user?.avatar?.url ? (
                      <img src={user.avatar.url} alt={user.name || "User"} className="w-full h-full object-cover" />
                    ) : (
                      <span>{(user?.name || user?.email || "U").charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-navy pr-0.5 transition-transform duration-200 ${activeDropdown === "profile" ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {activeDropdown === "profile" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-border p-3 shadow-premium-lg z-50 overflow-hidden"
                    >
                      {/* User Header */}
                      <div className="p-3 bg-[#FAF6F0] rounded-xl mb-2 flex items-center gap-3 border border-[#EDE3D0]/60">
                        <div className="w-10 h-10 rounded-full bg-navy text-white font-bold flex items-center justify-center text-sm overflow-hidden border-2 border-primary shrink-0 shadow-sm">
                          {user?.avatar?.url ? (
                            <img src={user.avatar.url} alt={user.name || "User"} className="w-full h-full object-cover" />
                          ) : (
                            <span>{(user?.name || user?.email || "U").charAt(0).toUpperCase()}</span>
                          )}
                        </div>
                        <div className="overflow-hidden text-left">
                          <h4 className="text-xs font-bold text-navy truncate leading-tight">{user?.name || "Student"}</h4>
                          <p className="text-[11px] text-muted-foreground truncate mt-0.5">{user?.email}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-bold rounded-full uppercase tracking-wider">
                            Student Portal
                          </span>
                        </div>
                      </div>

                      {/* Navigation Items */}
                      <div className="flex flex-col gap-0.5">
                        {studentMenuItems.map((item) => {
                          const Icon = item.icon;
                          const isActive = pathname === item.href;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all text-xs font-semibold ${
                                isActive 
                                  ? "bg-primary text-white shadow-sm" 
                                  : "text-navy hover:bg-[#FAF6F0] hover:text-primary"
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-navy-light"}`} />
                                <span>{item.name}</span>
                              </div>
                              <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${isActive ? "text-white" : "text-navy-light"}`} />
                            </Link>
                          );
                        })}
                      </div>

                      <div className="my-2 border-t border-border/80" />

                      {/* Log Out */}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveDropdown(null);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left"
                      >
                        <LogOut className="w-4 h-4 text-red-600" />
                        <span>Log Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                title="Login to Account"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#EDE3D0] bg-white hover:bg-[#FAF6F0] text-navy hover:text-primary flex items-center justify-center transition-all shadow-sm hover:scale-105 shrink-0"
              >
                <UserRound className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-navy hover:bg-background-alt transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100vh - 65px)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden fixed left-0 right-0 top-full bottom-0 bg-[#FDFBF7] border-t border-border z-40 overflow-y-auto overscroll-contain touch-pan-y"
          >
            <div className="px-6 py-8 flex flex-col justify-between min-h-[calc(100vh-80px)]">
              {/* Menu Navigation Links */}
              <nav className="flex flex-col gap-5.5 text-left">
                <Link
                  href="/"
                  className={`text-base font-semibold transition-all ${pathname === "/" ? "text-[#E28A3E]" : "text-navy"}`}
                >
                  Home
                </Link>

                <Link
                  href="/about"
                  className={`text-base font-semibold transition-all ${pathname === "/about" ? "text-[#E28A3E]" : "text-navy"}`}
                >
                  About Us
                </Link>

                {/* Dropdown Accordions */}
                {navLinks.map((dropdown) => {
                  const isMobileOpen = activeMobileDropdown === dropdown.trigger;
                  return (
                    <div key={dropdown.trigger} className="flex flex-col gap-3">
                      <button
                        onClick={() => setActiveMobileDropdown(isMobileOpen ? null : dropdown.trigger)}
                        className="w-full flex items-center justify-between text-base font-semibold text-navy transition-all cursor-pointer text-left"
                      >
                        <span>{dropdown.name}</span>
                        <ChevronDown
                          className={`w-4.5 h-4.5 text-muted-foreground transition-transform duration-300 ${isMobileOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isMobileOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden flex flex-col gap-4 pl-4 border-l border-border/80 ml-1 mt-1"
                          >
                            {dropdown.items.map((item) => {
                              const isActive = pathname === item.href;
                              return (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  className={`text-sm transition-all ${isActive ? "text-[#E28A3E] font-bold" : "text-navy-light font-medium hover:text-[#E28A3E]"}`}
                                >
                                  {item.name}
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                <Link
                  href="/courses"
                  className={`text-base font-semibold transition-all ${pathname === "/courses" ? "text-[#E28A3E]" : "text-navy"}`}
                >
                  Courses
                </Link>

                <Link
                  href="/blogs"
                  className={`text-base font-semibold transition-all ${pathname === "/blogs" ? "text-[#E28A3E]" : "text-navy"}`}
                >
                  Blog
                </Link>

                <Link
                  href="/contact"
                  className={`text-base font-semibold transition-all ${pathname === "/contact" ? "text-[#E28A3E]" : "text-navy"}`}
                >
                  Contact Us
                </Link>
              </nav>

              {/* Drawer Footer Actions */}
              <div className="flex flex-col gap-3 pt-6 mt-8 border-t border-border/80">
                <Link
                  href="/book"
                  className="w-full py-3.5 rounded-xl bg-gold-gradient text-white text-center font-bold shadow-premium text-sm hover:opacity-95 transition-opacity"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
