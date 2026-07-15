"use client";

import React from "react";
import Link from "next/link";
import { BLOGS } from "@/data/mockData";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function BlogsPage() {
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

  return (
    <div className="bg-background vastu-mandala-bg min-h-screen">
      
      {/* Academy Hero Banner */}
      <section className="relative py-20 md:py-28 bg-navy text-white overflow-hidden border-b border-border">
        {/* Background Image with subtle overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/vastu-cta-compass.png"
            alt="Blogs Background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/35 via-navy/55 to-navy/80" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center gap-4 animate-fade-in-up">
          <span className="text-xs uppercase font-bold text-[#E28A3E] tracking-widest">Insights Hub</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight text-white max-w-3xl">
            Vastu Science & Architectural Wisdom
          </h1>
          
          <p className="text-xs sm:text-sm text-white/80 max-w-xl font-light leading-relaxed">
            Discover simple spatial adjustments, design formulas, and tips to clean energy zones in your properties.
          </p>
        </div>
      </section>

      {/* Blogs list */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {BLOGS.map((blog) => (
            <motion.article
              key={blog.id}
              variants={fadeUpVariants}
              className="group bg-white border border-border/80 rounded-2xl p-5 shadow-premium hover:shadow-premium-lg hover:border-[#E28A3E]/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-5">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/15 to-transparent" />
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-lg text-[9px] uppercase tracking-wider font-semibold text-black shadow-sm border border-[#EDE3D0]/60">
                    {blog.category}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-[10px] text-muted-foreground mb-3 font-light">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#E28A3E]" />
                    {blog.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#E28A3E]" />
                    {blog.readTime}
                  </span>
                </div>

                <h3 className="font-serif text-base font-semibold text-black group-hover:text-primary transition-colors leading-snug">
                  <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                </h3>

                <p className="text-xs text-muted-foreground mt-2 line-clamp-3 font-light leading-relaxed">
                  {blog.shortDescription}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px] text-black font-semibold">
                  <User className="w-3.5 h-3.5 text-[#E28A3E]" />
                  {blog.author}
                </div>
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="text-xs font-semibold text-black group-hover:text-primary transition-colors flex items-center gap-0.5"
                >
                  Read Article <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

    </div>
  );
}
