"use client";

import React from "react";
import Link from "next/link";
import {
  Compass,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-background-alt pt-16 pb-8 border-t border-navy-light relative overflow-hidden">
      {/* Subtle mandala background ring art overlay */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(240,180,41,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main 5-Column Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-12">

          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-4 text-left">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group h-14 relative w-48 shrink-0">
              <img src="/logo-white.png" alt="Vastu Ventures Logo" className="h-22 max-h-[88px] w-auto object-contain absolute left-0 top-1/2 -translate-y-1/2" />
            </Link>
            <p className="text-sm text-background-alt/75 leading-relaxed font-light mt-1">
              Empowering lives through ancient Vastu wisdom and modern solutions. Creating spaces that attract positivity and prosperity.
            </p>
            {/* Social Icons Strip */}
            <div className="flex gap-2.5 mt-2">
              <a href="#" className="w-7 h-7 rounded-full border border-white/10 hover:border-gold-start/60 flex items-center justify-center text-background-alt/65 hover:text-gold-start transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </a>
              <a href="#" className="w-7 h-7 rounded-full border border-white/10 hover:border-gold-start/60 flex items-center justify-center text-background-alt/65 hover:text-gold-start transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="#" className="w-7 h-7 rounded-full border border-white/10 hover:border-gold-start/60 flex items-center justify-center text-background-alt/65 hover:text-gold-start transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="#" className="w-7 h-7 rounded-full border border-white/10 hover:border-gold-start/60 flex items-center justify-center text-background-alt/65 hover:text-gold-start transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="text-left">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-background-alt/75 font-light">
              <li>
                <Link href="/about" className="hover:text-gold-start hover:pl-1 transition-all">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gold-start hover:pl-1 transition-all">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-gold-start hover:pl-1 transition-all">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-gold-start hover:pl-1 transition-all">
                  Consultation
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-gold-start hover:pl-1 transition-all">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-start hover:pl-1 transition-all">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="text-left">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Our Services
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-background-alt/75 font-light">
              <li>
                <Link href="/services/residential-vastu" className="hover:text-gold-start hover:pl-1 transition-all">
                  Residential Vastu
                </Link>
              </li>
              <li>
                <Link href="/services/commercial-vastu" className="hover:text-gold-start hover:pl-1 transition-all">
                  Commercial Vastu
                </Link>
              </li>
              <li>
                <Link href="/services/industrial-vastu" className="hover:text-gold-start hover:pl-1 transition-all">
                  Industrial Vastu
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-gold-start hover:pl-1 transition-all">
                  Online Consultation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-start hover:pl-1 transition-all">
                  Offline Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="text-left">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Support
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-background-alt/75 font-light">
              <li>
                <Link href="/contact" className="hover:text-gold-start hover:pl-1 transition-all">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gold-start hover:pl-1 transition-all">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gold-start hover:pl-1 transition-all">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gold-start hover:pl-1 transition-all">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Us */}
          <div className="text-left">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-background-alt/75 font-light">
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-gold-start" />
                <a href="tel:+919876543210" className="hover:text-gold-start">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-gold-start" />
                <a href="mailto:info@Vastu Ventures.com" className="hover:text-gold-start">
                  info@Vastu Ventures.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-gold-start flex-shrink-0 mt-0.5" />
                <span>123, Harmony Road, New Delhi,</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Compass className="w-3.5 h-3.5 text-gold-start" />
                <span>India - 110001</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower Footer */}
        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-background-alt/65 font-light">
          <p>© {new Date().getFullYear()} Vastu Ventures. All Rights Reserved.</p>
          <p className="flex items-center gap-1 select-none">
            Designed with <span className="text-red-500 animate-pulse">❤️</span> for Positive Living
          </p>
        </div>

      </div>
    </footer>
  );
}
