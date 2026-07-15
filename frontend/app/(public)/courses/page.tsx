"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ThumbsUp } from "lucide-react";
import { COURSES } from "@/data/mockData";
import { motion, useReducedMotion } from "framer-motion";

export default function CoursesPage() {
  const filteredCourses = COURSES;
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

  const getLikesCount = (id: string) => {
    switch (id) {
      case "c1": return "551";
      case "c2": return "1.9K";
      case "c3": return "820";
      case "c4": return "430";
      case "c5": return "1.2K";
      default: return "310";
    }
  };

  return (
    <div className="bg-background vastu-mandala-bg min-h-screen">
      
      {/* Academy Hero Banner */}
      <section className="relative py-20 md:py-28 bg-navy text-white overflow-hidden border-b border-border">
        {/* Background Image with subtle overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="images/cources.png"
            alt="Courses Background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/35 via-navy/55 to-navy/80" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center gap-4 animate-fade-in-up">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-tight text-white max-w-3xl">
            Vastu Shastra Certification Courses
          </h1>
          
          <p className="text-sm md:text-base text-white/85 max-w-xl font-light leading-relaxed">
            Acquire verified Vedic space auditing capabilities. Study at your own pace with expert instructions, live check-ins, and auditing tool kits.
          </p>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">

        {/* Course Grid - 3 Columns on desktop for smaller, compact cards */}
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {filteredCourses.map((course) => {
            const discountPercent = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
            return (
              <motion.div
                key={course.id}
                variants={fadeUpVariants}
                className="group bg-white border border-border rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-lg hover:border-primary/30 transition-all duration-300 flex flex-col justify-between p-4 text-left"
              >
                <div>
                  {/* Image Block */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
                  </div>

                  {/* Content Block */}
                  <div className="px-1">
                    {/* Title and Likes Counter */}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-base font-semibold text-navy leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        <Link href={`/courses/${course.slug}`}>{course.title}</Link>
                      </h3>
                      <div className="flex items-center gap-1 text-navy-light font-bold text-[11px] shrink-0 mt-0.5 bg-background-alt px-2 py-0.5 rounded-lg border border-border/40">
                        <ThumbsUp className="w-3 h-3 text-navy-light" />
                        <span>{getLikesCount(course.id)}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2 font-light leading-relaxed">
                      {course.shortDescription}
                    </p>

                  </div>
                </div>

                {/* Bottom section: Price, discount percent and Full-width Button */}
                <div className="px-1 mt-4">
                  {/* Pricing strip */}
                  <div className="flex items-center justify-between pt-3.5 border-t border-border/60">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-extrabold text-primary">₹{course.price}</span>
                      <span className="text-xs sm:text-sm text-muted-foreground line-through">₹{course.originalPrice}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-200/50 rounded-lg text-[10px] font-bold">
                      {discountPercent}% off
                    </span>
                  </div>

                  {/* Full-width View Details button */}
                  <Link
                    href={`/courses/${course.slug}`}
                    className="w-full mt-4 py-3 bg-navy hover:bg-navy-light text-white text-center rounded-xl text-xs sm:text-sm font-bold shadow-premium hover:shadow-premium-lg transition-all duration-300 flex items-center justify-center gap-1.5 group/btn"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                  </Link>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </section>

    </div>
  );
}
