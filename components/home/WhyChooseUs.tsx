"use client";

import React from "react";
import { Award, Sparkles, BookOpen, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function WhyChooseUs() {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.25, 1, 0.5, 1] as const;

  const points = [
    {
      title: "Experienced Experts",
      description: "Years of practical Vastu consultation experience.",
      icon: Award
    },
    {
      title: "Personalized Approach",
      description: "Customized solutions for every space and individual.",
      icon: Sparkles
    },
    {
      title: "Ancient Wisdom",
      description: "Rooted in authentic Vastu Shastra principles.",
      icon: BookOpen
    },
    {
      title: "Proven Track Record",
      description: "Thousands of successful consultations.",
      icon: CheckCircle2
    }
  ];

  const leftColumnVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.0, ease: premiumEase }
    }
  };

  const rightColumnVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.0, ease: premiumEase }
    }
  };

  return (
    <section className="py-16 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column: Premium Vastu interior image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={leftColumnVariants}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/3] sm:aspect-[1.6/1] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-premium border border-border/50">
              <img
                src="/why-choose-us-vastu.png"
                alt="Why Thousands Trust Vastu Ventures"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right Column: Headings & Flat Points List Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={rightColumnVariants}
            className="lg:col-span-7 text-left flex flex-col gap-6"
          >
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#E28A3E]">
                • Why Choose Us •
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium mt-2 leading-tight">
                <span className="text-navy">Why Thousands Trust </span>
                <br />
                <span className="text-navy">Vastu</span>
                <span className="text-[#E28A3E]">Vidya</span>
              </h2>
            </div>

            {/* Features 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mt-2">
              {points.map((point, index) => {
                const Icon = point.icon;
                return (
                  <div key={index} className="flex gap-4 items-start">
                    {/* Rounded gold bordered icon container */}
                    <div className="w-11 h-11 rounded-full bg-[#FAF4E9] border border-[#EDE3D0] flex items-center justify-center flex-shrink-0 text-primary shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-sm font-bold text-navy leading-snug">
                        {point.title}
                      </h3>
                      <p className="text-[11px] text-muted-foreground mt-1.5 font-light leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
