"use client";

import React from "react";
import { MessageSquare, Search, FileText, Wrench, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function ConsultationProcess() {
  const steps = [
    {
      title: "Consultation",
      desc: "Share your details & requirements with us.",
      icon: MessageSquare
    },
    {
      title: "Analysis",
      desc: "Our experts analyze your space or blueprint.",
      icon: Search
    },
    {
      title: "Recommendations",
      desc: "Get practical & effective Vastu solutions.",
      icon: FileText
    },
    {
      title: "Implementation",
      desc: "Apply the recommended changes with ease.",
      icon: Wrench
    },
    {
      title: "Transformation",
      desc: "Experience positivity, balance & prosperity.",
      icon: Sparkles
    }
  ];

  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.25, 1, 0.5, 1] as const;

  const headerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: premiumEase }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: premiumEase }
    }
  };

  return (
    <section className="py-16 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#E28A3E]">
            • Our Process •
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium mt-2 leading-none">
            <span className="text-navy">Simple Steps to Positive </span>
            <span className="text-[#E28A3E]">Change</span>
          </h2>
        </motion.div>

        {/* Process Flow Row (2 columns on mobile, 3 on tablet, 5 on desktop) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-8 lg:gap-6 relative"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative flex flex-col items-center text-center group"
              >
                
                {/* Connecting Dashed Line (Desktop Only) */}
                {index < 4 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-[1px] border-t-2 border-dashed border-[#EDE3D0]/80 z-0 pointer-events-none">
                    {/* Small Arrowhead pointing right */}
                    <div className="absolute right-[-4px] top-[-5px] w-2 h-2 border-r-2 border-b-2 border-[#EDE3D0]/80 rotate-[-45deg]" />
                  </div>
                )}

                {/* Circle Icon Container */}
                <div className="w-14 h-14 rounded-full bg-white border border-black flex items-center justify-center flex-shrink-0 text-black shadow-sm hover:scale-105 active:scale-95 group-hover:border-[#E28A3E] group-hover:bg-[#FEF3E4]/40 transition-all duration-300 relative z-10">
                  <Icon className="w-5.5 h-5.5 text-black group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Text Block directly below circle */}
                <div className="mt-5 max-w-[180px]">
                  <h3 className="font-serif text-xs sm:text-sm font-semibold text-black group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[10px] sm:text-sm text-muted-foreground mt-2 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
