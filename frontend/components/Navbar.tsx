"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Compass, Home, Briefcase, Factory, BookOpen, Calendar, HelpCircle, Info, FileText, Monitor, UserRound, MapPin, Building2, PencilRuler } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/lib/store";

export default function Navbar() {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();

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
      document.documentElement.classList.add("lenis-stopped");
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
      items: [
        { name: "House Planning with Vastu", href: "/architecture-planning/house-planning-with-vastu", icon: Home, desc: "Residential Layouts", iconColor: "text-[#E28A3E]" },
        { name: "Commercial Planning with Vastu", href: "/architecture-planning/commercial-planning-with-vastu", icon: Building2, desc: "Commercial & Office Spaces", iconColor: "text-[#E28A3E]" },
        { name: "Plot Planning & Analysis", href: "/architecture-planning/plot-planning-analysis", icon: MapPin, desc: "Site & Plot Evaluation", iconColor: "text-[#E28A3E]" },
        { name: "Architecture Consultation", href: "/architecture-planning/architecture-consultation", icon: PencilRuler, desc: "Expert Architecture Guidance", iconColor: "text-[#E28A3E]" }
      ]
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
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group h-16 relative w-48 shrink-0">
            <img src="/logo.png" alt="Vastu Ventures Logo" className="h-20 max-h-[72px] w-auto object-contain absolute left-0 top-1/2 -translate-y-1/2" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-black hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-black hover:text-primary transition-colors"
            >
              About Us
            </Link>
            {navLinks.map((dropdown) => (
              <div
                key={dropdown.trigger}
                className="relative"
                onMouseEnter={() => setActiveDropdown(dropdown.trigger)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1.5 py-2 text-sm font-medium text-black hover:text-primary transition-colors cursor-pointer">
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
                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="flex items-center gap-4.5 p-3 rounded-xl hover:bg-[#FAF6F0]/65 transition-all group/item"
                            >
                              <div className={`flex-shrink-0 flex items-center justify-center ${item.iconColor}`}>
                                <IconComponent className="w-6 h-6" strokeWidth={1.5} />
                              </div>
                              <div className="text-left">
                                <h4 className="text-sm font-semibold text-black group-hover/item:text-primary transition-colors leading-none">
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
            ))}

            <Link
              href="/courses"
              className="text-sm font-medium text-black hover:text-primary transition-colors"
            >
              Courses
            </Link>

            {secondaryLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-black hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action & Account Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/book"
              className="px-5 py-2.5 rounded-xl bg-gold-gradient text-white text-sm font-semibold shadow-premium hover:shadow-premium-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book Consultation
            </Link>
            <Link
              href={user ? "/dashboard" : "/login"}
              title="Student Portal"
              className="w-10 h-10 rounded-full border border-[#EDE3D0]/60 bg-white hover:bg-[#FAF6F0]/30 text-navy hover:text-[#E28A3E] flex items-center justify-center transition-all shadow-sm hover:scale-[1.05] overflow-hidden"
            >
              {user && user.avatar?.url ? (
                <img src={user.avatar.url} alt={user.name} className="w-full h-full object-cover" />
              ) : user && user.name ? (
                <span className="font-bold text-lg">{user.name.charAt(0).toUpperCase()}</span>
              ) : (
                <UserRound className="w-5 h-5" />
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl text-navy hover:bg-background-alt transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu (Slides down from header, full screen width) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100vh - 65px)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden fixed left-0 right-0 top-full bottom-0 bg-[#FDFBF7] border-t border-border z-40 overflow-y-auto"
          >
            <div className="px-6 py-8 flex flex-col justify-between min-h-[calc(100vh-80px)]">
              {/* Menu Navigation Links (Single clean list matching desktop) */}
              <nav className="flex flex-col gap-5.5 text-left">
                <Link
                  href="/"
                  className={`text-base font-semibold transition-all ${
                    pathname === "/" ? "text-[#E28A3E]" : "text-navy"
                  }`}
                >
                  Home
                </Link>

                <Link
                  href="/about"
                  className={`text-base font-semibold transition-all ${
                    pathname === "/about" ? "text-[#E28A3E]" : "text-navy"
                  }`}
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
                          className={`w-4.5 h-4.5 text-muted-foreground transition-transform duration-300 ${
                            isMobileOpen ? "rotate-180" : ""
                          }`}
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
                                  className={`text-sm transition-all ${
                                    isActive ? "text-[#E28A3E] font-bold" : "text-navy-light font-medium hover:text-[#E28A3E]"
                                  }`}
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
                  className={`text-base font-semibold transition-all ${
                    pathname === "/courses" ? "text-[#E28A3E]" : "text-navy"
                  }`}
                >
                  Courses
                </Link>

                <Link
                  href="/blogs"
                  className={`text-base font-semibold transition-all ${
                    pathname === "/blogs" ? "text-[#E28A3E]" : "text-navy"
                  }`}
                >
                  Blog
                </Link>

                <Link
                  href="/contact"
                  className={`text-base font-semibold transition-all ${
                    pathname === "/contact" ? "text-[#E28A3E]" : "text-navy"
                  }`}
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

                <div className="mt-1">
                  <Link
                    href="/dashboard"
                    className="block w-full py-2.5 rounded-xl border border-border text-center font-medium text-navy text-xs hover:bg-[#FAF6F0] transition-colors"
                  >
                    Student Portal
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
