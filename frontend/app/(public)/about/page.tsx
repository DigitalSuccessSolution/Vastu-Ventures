"use client";

import React from "react";
import { Compass, CheckCircle2, Award, Calendar } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.16, 1, 0.3, 1] as const;

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: premiumEase }
    }
  };

  const values = [
    { title: "Mathematical Accuracy", desc: "We map energy sectors down to the single degree, avoiding guesswork." },
    { title: "Preservation-First Remedies", desc: "Over 95% of our recommendations are non-destructive and visual-only." },
    { title: "Continuous Learning", desc: "We are committed to sharing traditional formulas through modern certification programs." }
  ];

  return (
    <div className="bg-background vastu-mandala-bg min-h-screen">
      {/* Academy Hero Banner */}
      <section className="relative py-20 md:py-28 bg-navy text-white overflow-hidden border-b border-border">
        {/* Background Image with subtle overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/why-choose-us-vastu.png"
            alt="About Vastu Ventures Background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/35 via-navy/55 to-navy/80" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center gap-4 animate-fade-in-up">
          <span className="text-xs uppercase font-bold text-[#E28A3E] tracking-widest">Our Heritage</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight text-white max-w-3xl">
            Ancient Wisdom, Modern Guidance
          </h1>
          
          <p className="text-xs sm:text-sm text-white/80 max-w-xl font-light leading-relaxed">
            At Vastu Ventures, we bridge the gap between traditional Indian spatial guidelines (Shilpashastra) and contemporary architecture requirements.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >

          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <span className="text-xs uppercase font-bold text-[#E28A3E] tracking-widest block">Core Mission</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-navy mt-1">
              Honoring a Lineage of Vedic Harmony
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
              Vastu Ventures is not just a consultation practice—it is an educational guild. Founded by Acharya Raghavendra, a practitioner with over two decades of experience, our mission is to demystify traditional architecture.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
              We focus on elemental chemistry: managing the flow of Solar Energy (from the East), Magnetic Currents (from the North), and elemental fire, water, earth, and air balances.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
              <div className="text-center p-4 bg-white border border-border rounded-2xl shadow-sm hover:shadow-premium hover:border-[#E28A3E]/30 transition-all duration-300">
                <span className="font-serif text-2xl font-semibold text-black block">22+</span>
                <span className="text-[10px] text-muted-foreground uppercase font-medium mt-1 block">Years of Audit</span>
              </div>
              <div className="text-center p-4 bg-white border border-border rounded-2xl shadow-sm hover:shadow-premium hover:border-[#E28A3E]/30 transition-all duration-300">
                <span className="font-serif text-2xl font-semibold text-black block">15k+</span>
                <span className="text-[10px] text-muted-foreground uppercase font-medium mt-1 block">Homes Balanced</span>
              </div>
              <div className="text-center p-4 bg-white border border-border rounded-2xl shadow-sm hover:shadow-premium hover:border-[#E28A3E]/30 transition-all duration-300">
                <span className="font-serif text-2xl font-semibold text-black block">5,000+</span>
                <span className="text-[10px] text-muted-foreground uppercase font-medium mt-1 block">Students Certified</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden shadow-premium-lg border border-[#EDE3D0]/40">
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800"
                alt="Traditional Indian Vedic architecture elements layout"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/15 to-transparent" />
            </div>
          </div>

        </motion.div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background-alt border-y border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
          >
            <span className="text-xs uppercase font-bold text-[#E28A3E] tracking-widest block mb-2">Our Pillars</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-navy mt-1 mb-12">
              Our Core Principles
            </h2>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {values.map((val, i) => (
              <motion.div 
                key={i} 
                variants={fadeUpVariants}
                className="bg-white border border-border rounded-2xl p-6 shadow-premium text-center flex flex-col items-center gap-4 hover:shadow-premium-lg hover:border-[#E28A3E]/40 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-background-alt text-[#E28A3E] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-base font-semibold text-black group-hover:text-[#E28A3E] transition-colors">{val.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-20 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-navy">Need Custom Spatial Guidance?</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-3 font-light leading-relaxed max-w-md mx-auto">
            Our specialized team is available for residential, corporate, and macro industrial layout designs.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#E28A3E] hover:bg-[#C67830] text-white text-xs font-bold rounded-xl shadow-premium hover:shadow-premium-lg mt-8 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Calendar className="w-4.5 h-4.5 animate-pulse" /> Book Consultation Call
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
