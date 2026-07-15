"use client";

import React from "react";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { COURSES } from "@/data/mockData";
import { motion, useReducedMotion } from "framer-motion";

export default function FeaturedCourses() {
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
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: premiumEase }
    }
  };

  // Maps the mock courses to match the exact names and styles shown in the user's screenshot
  const featuredCoursesData = [
    {
      id: "c1",
      slug: "vastu-shastra-foundation",
      image: COURSES[0]?.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
      title: "Vastu Fundamentals",
      level: "Beginner Friendly",
      badge: "Bestseller",
      leftFooter: "★ 4.8 (1300+)",
      rightFooter: "₹11,920"
    },
    {
      id: "c2",
      slug: "advanced-professional-vastu",
      image: COURSES[1]?.image || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
      title: "Advanced Vastu Techniques",
      level: "Advanced Level",
      badge: null,
      leftFooter: "★ Advanced Level",
      rightFooter: "★ 4.9 (890+)"
    },
    {
      id: "c3",
      slug: "vastu-remedial-science-pyramids",
      image: COURSES[4]?.image || "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=800",
      title: "Vastu for Home Happiness",
      level: "Beginner Friendly",
      badge: null,
      leftFooter: "★ 4.7 (650+)",
      rightFooter: "★ 4.7 (650+)"
    },
    {
      id: "c4",
      slug: "commercial-vastu-consultancy-training",
      image: COURSES[2]?.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
      title: "Vastu for Business Success",
      level: "Advanced Level",
      badge: null,
      leftFooter: "★ Advanced Level",
      rightFooter: "★ 4.8 (760+)"
    }
  ];

  return (
    <section className="py-16 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="relative flex flex-col md:flex-row items-center justify-center gap-4 mb-10 w-full"
        >
          {/* Centered Title text */}
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#E28A3E]">
              • Learn, Apply, Transform. •
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium mt-1 leading-none text-center">
              <span className="text-navy">Featured Vastu </span>
              <span className="text-[#E28A3E]">Courses</span>
            </h2>
          </div>

          {/* View All button on the right for md+ screens, centered below on mobile */}
          <div className="md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2">
            <Link
              href="/courses"
              className="border border-border/80 bg-white hover:bg-[#FAF6F0] text-navy font-semibold text-xs px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-4 h-4 text-[#E28A3E]" />
            </Link>
          </div>
        </motion.div>

        {/* Slider row container */}
        <div className="relative">
          {/* Courses Grid Row */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredCoursesData.map((course) => (
              <motion.div
                key={course.id}
                variants={cardVariants}
                className="bg-white border border-border/70 rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-300 flex flex-col group"
              >
                {/* Image Block */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/15 to-transparent" />
                  
                  {/* Category badge */}
                  {course.badge && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#E28A3E] text-white rounded-lg shadow-sm border border-[#E28A3E]/30">
                      <span className="text-[9px] uppercase tracking-wider font-extrabold">
                        {course.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-grow flex flex-col justify-between text-left">
                  <div>
                    <h3 className="font-serif text-sm font-semibold text-black hover:text-primary transition-colors line-clamp-2 min-h-[40px] leading-snug">
                      <Link href={`/courses/${course.slug}`}>{course.title}</Link>
                    </h3>
                    <p className="text-[11px] text-muted-foreground mt-2 font-medium">
                      {course.level}
                    </p>
                  </div>

                  {/* Rating star/reviews strip */}
                  <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center text-[#E28A3E] text-[11px] font-extrabold gap-0.5">
                      {course.id === "c1" ? (
                        <>
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>4.8 (1300+)</span>
                        </>
                      ) : (
                        <span>{course.leftFooter}</span>
                      )}
                    </div>

                    <div className="text-right text-[#E28A3E] text-[11px] font-extrabold">
                      {course.id === "c1" ? (
                        <span className="text-black font-semibold">{course.rightFooter}</span>
                      ) : (
                        <span className="text-black font-semibold">{course.rightFooter}</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
