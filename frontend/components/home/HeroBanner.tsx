"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Compass, Calendar, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function HeroBanner() {
  const [searchQuery, setSearchQuery] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  // Easing curve: easeOutQuart (Slow-motion premium curve)
  const premiumEase = [0.25, 1, 0.5, 1] as const;

  const animateY = shouldReduceMotion ? 0 : 15;

  return (
    <section className="relative min-h-[550px] md:min-h-[580px] flex flex-col md:flex-row items-start overflow-hidden pt-0 md:pt-14 pb-16 md:pb-28 border-b border-border bg-[#FDFBF7]">
      {/* Background Image (Desktop Only) */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <img
          src="/image.png"
          alt="Vastu Space Harmony Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Mobile-only Top Banner Image (touches navbar at the top, and both sides of the screen without borders or rounded corners) */}
      <div className="block md:hidden w-full overflow-hidden pointer-events-none z-10">
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <img
            src="/image.png"
            alt="Vastu Space Harmony Banner"
            className="absolute inset-0 w-full h-full object-cover object-right scale-[1.3] origin-right"
          />
        </div>
      </div>


      {/* Decorative Rotating Compass (Subtle overlay - Desktop Only) */}
      <div className="hidden md:flex absolute top-1/2 -right-40 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/5 items-center justify-center pointer-events-none z-10">
        <div className="w-[500px] h-[500px] rounded-full border border-primary/10 flex items-center justify-center animate-spin-slow">
          <Compass className="w-[100px] h-[100px] text-primary/5" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full mt-6 md:mt-0">
        <div className="max-w-3xl flex flex-col gap-4 md:gap-6 text-left">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: animateY }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: premiumEase }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#EDE3D0]/60 w-max max-w-full shadow-premium"
          >
            <span className="w-2 h-2 rounded-full bg-gold-end animate-pulse" />
            <span className="text-[10px] sm:text-xs font-semibold text-navy uppercase tracking-wider">
              Vedic Spatial Science for Modern Living
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: animateY }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: premiumEase }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-navy leading-tight"
          >
            Align Your Space. <br />
            <span className="text-[#E28A3E]">Transform Your Destiny.</span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: animateY }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: premiumEase }}
            className="text-sm sm:text-lg text-navy-light max-w-lg lg:max-w-[480px] leading-relaxed font-light"
          >
            Discover the ancient wisdom of Vastu Shastra customized for modern homes, corporate offices, and factory setups. Harmonize five elements to attract health, wealth, and abundance.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: animateY }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: premiumEase }}
            className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mt-2 w-full sm:w-auto"
          >
            <Link
              href="/book"
              className="w-full sm:w-auto justify-center px-8 py-3.5 rounded-xl bg-gold-gradient text-white font-semibold text-sm shadow-premium hover:shadow-premium-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2.5 group cursor-pointer"
            >
              <Calendar className="w-4.5 h-4.5 transition-transform group-hover:scale-110" />
              <span>Book Expert Consultation</span>
            </Link>
            <Link
              href="/courses"
              className="w-full sm:w-auto justify-center px-8 py-3.5 rounded-xl border border-border bg-white text-navy font-semibold text-sm shadow-premium hover:shadow-premium-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 group hover:border-primary/50 hover:bg-background-alt cursor-pointer"
            >
              <span>Explore Certified Courses</span>
              <ArrowRight className="w-4 h-4 text-primary transition-transform duration-300 group-hover:translate-x-1 ml-1" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
