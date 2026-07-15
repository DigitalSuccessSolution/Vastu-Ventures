"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Compass, Home, Briefcase, Factory, BookOpen, Calendar, HelpCircle, Info, FileText, Monitor, UserRound, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
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

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

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
    }
  ];

  const secondaryLinks = [
    { name: "Blog", href: "/blogs", icon: FileText },
    { name: "FAQ", href: "/faq", icon: HelpCircle },
    { name: "Contact Us", href: "/contact", icon: HelpCircle }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/95 backdrop-blur-md py-3 shadow-premium"
        : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group h-14 relative w-48 shrink-0">
            <img src="/logo.png" alt="Vastu Ventures Logo" className="h-22 max-h-[88px] w-auto object-contain absolute left-0 top-1/2 -translate-y-1/2" />
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
              href="/admin"
              className="text-sm font-medium text-black hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-primary" />
              Admin Panel
            </Link>
            <span className="text-border/60">|</span>
            <Link
              href="/book"
              className="px-5 py-2.5 rounded-xl bg-gold-gradient text-white text-sm font-semibold shadow-premium hover:shadow-premium-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book Consultation
            </Link>
            <Link
              href="/dashboard"
              title="Student Portal"
              className="w-10 h-10 rounded-full border border-[#EDE3D0]/60 bg-white hover:bg-[#FAF6F0]/30 text-navy hover:text-[#E28A3E] flex items-center justify-center transition-all shadow-sm hover:scale-[1.05]"
            >
              <UserRound className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl text-navy hover:bg-background-alt transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-x-0 top-[65px] bg-background border-t border-border overflow-y-auto"
          >
            <div className="px-4 py-6 flex flex-col gap-6">
              {/* Home Link (Mobile) */}
              <Link
                href="/"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-background-alt text-navy"
              >
                <Home className="w-5 h-5 text-primary" />
                <div className="text-sm font-semibold">Home</div>
              </Link>

              {/* About Us Link (Mobile) */}
              <Link
                href="/about"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-background-alt text-navy"
              >
                <Info className="w-5 h-5 text-primary" />
                <div className="text-sm font-semibold">About Us</div>
              </Link>

              {/* Courses Link (Mobile) */}
              <Link
                href="/courses"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-background-alt text-navy"
              >
                <BookOpen className="w-5 h-5 text-primary" />
                <div className="text-sm font-semibold">Courses</div>
              </Link>

              {/* Dropdown Lists */}
              {navLinks.map((group) => (
                <div key={group.name} className="flex flex-col gap-2">
                  <h3 className="text-xs uppercase font-semibold text-muted-foreground tracking-wider px-2">
                    {group.name}
                  </h3>
                  <div className="flex flex-col gap-1 pl-2">
                    {group.items.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-background-alt text-navy"
                        >
                          <IconComponent className="w-5 h-5 text-primary" />
                          <div className="text-sm font-semibold">{item.name}</div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Other Links */}
              <div className="flex flex-col gap-2 border-t border-border/60 pt-4">
                <h3 className="text-xs uppercase font-semibold text-muted-foreground tracking-wider px-2">
                  More Pages
                </h3>
                <div className="flex flex-col gap-1 pl-2">
                  {secondaryLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-background-alt text-navy"
                      >
                        <IconComponent className="w-5 h-5 text-primary" />
                        <div className="text-sm font-semibold">{link.name}</div>
                      </Link>
                    );
                  })}
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-background-alt text-navy"
                  >
                    <BookOpen className="w-5 h-5 text-primary" />
                    <div className="text-sm font-semibold">Student Portal</div>
                  </Link>
                  <Link
                    href="/admin"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-background-alt text-navy"
                  >
                    <Compass className="w-5 h-5 text-primary" />
                    <div className="text-sm font-semibold">Admin Panel</div>
                  </Link>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-col gap-3 pt-4 border-t border-border/60">
                <Link
                  href="/book"
                  className="w-full py-3 rounded-xl bg-gold-gradient text-white text-center font-semibold shadow-premium text-sm"
                >
                  Book Consultation
                </Link>
                <Link
                  href="/login"
                  className="w-full py-3 rounded-xl border border-border text-center font-medium text-navy text-sm hover:bg-background-alt transition-colors"
                >
                  Log In
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
