"use client";

import React from "react";
import Link from "next/link";
import { Award, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function ExpertProfile() {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.25, 1, 0.5, 1] as const;

  const leftColumnVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.0, ease: premiumEase }
    }
  };

  const rightColumnVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease: premiumEase }
    }
  };

  return (
    <section className="py-16 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Expert image with yellow yantra circular layout background */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={leftColumnVariants}
            className="lg:col-span-5 flex justify-center items-center relative min-h-[380px]"
          >
            {/* Round soft-yellow Vastu decorative background wheel */}
            <div className="absolute w-[290px] h-[290px] sm:w-[330px] sm:h-[330px] rounded-full bg-[#FAF0D9]/70 border border-[#FAF0D9] flex items-center justify-center opacity-85 z-0">
              <div className="w-[250px] h-[250px] sm:w-[290px] sm:h-[290px] rounded-full border border-dashed border-[#E28A3E]/30" />
            </div>

            {/* Expert image overlapping the circle */}
            <img
              src="/images/image.png"
              alt="Acharya Vastu Dev"
              className="relative max-h-[350px] sm:max-h-[390px] w-auto object-contain z-10 mt-[-10px]"
              onError={(e) => {
                // Fallback image in case the custom file isn't loaded yet
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=350";
              }}
            />
          </motion.div>

          {/* Right Column: Expert bio info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={rightColumnVariants}
            className="lg:col-span-7 text-left flex flex-col gap-6"
          >
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#E28A3E]">
                • Meet Our Expert •
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-2 leading-tight">
                <span className="text-navy">Acharya </span>
                <span className="text-[#E28A3E]">Vastu Dev</span>
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light max-w-2xl">
              Renowned Vastu Consultant & Mentor with 20+ years of experience in residential, commercial & industrial Vastu. Dedicated to helping thousands of people create harmonious and successful spaces.
            </p>

            {/* Stats list strip */}
            <div className="grid grid-cols-3 gap-4 border-t border-border/40 pt-6 mt-2 max-w-xl">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#E28A3E]" />
                  <span className="text-sm font-extrabold text-navy">20+</span>
                </div>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                  Years Experience
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#E28A3E]" />
                  <span className="text-sm font-extrabold text-navy">5000+</span>
                </div>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                  Happy Clients
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E28A3E]" />
                  <span className="text-sm font-extrabold text-navy">2500+</span>
                </div>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                  Projects Completed
                </span>
              </div>
            </div>

            {/* Action button */}
            <div className="mt-4">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gold-gradient hover:opacity-95 text-white text-xs font-bold shadow-premium hover:shadow-premium-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
