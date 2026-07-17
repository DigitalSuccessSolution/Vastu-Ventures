"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function FeaturedCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.25, 1, 0.5, 1] as const;

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/courses`);
        const data = await res.json();
        if (data.success) {
          setCourses(data.data.slice(0, 4)); // Show first 4 courses
        }
      } catch (err) {
        console.error("Error fetching featured courses from DB:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedCourses();
  }, []);

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

  // If loading or no courses exist in DB, hide the section completely
  if (loading || courses.length === 0) {
    return null;
  }

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
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#E28A3E]">
              • Learn, Apply, Transform. •
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium mt-1 leading-none text-center">
              <span className="text-navy">Featured Vastu </span>
              <span className="text-[#E28A3E]">Courses</span>
            </h2>
          </div>

          {/* View All button on the right for md+ screens, centered below on mobile */}
          <div className="md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 mt-4 md:mt-0">
            <Link
              href="/courses"
              className="border border-border/80 bg-white hover:bg-[#FAF6F0] text-navy font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-4 h-4 text-[#E28A3E]" />
            </Link>
          </div>
        </motion.div>

        {/* Slider row container */}
        <div className="relative">
          {/* Courses Grid Row (2 columns on mobile, 2 on tablet, 4 on desktop) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6"
          >
            {courses.map((course) => {
              const discountPercent = course.originalPrice > 0 
                ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
                : 0;
              const courseImage = course.thumbnail?.url || course.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800";
              const categoryBadge = course.category?.name || course.category || "Foundational";

              return (
                <motion.div
                  key={course._id || course.id}
                  variants={cardVariants}
                  className="bg-white border border-border/70 rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-300 flex flex-col group text-left"
                >
                  {/* Image Block */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={courseImage}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/15 to-transparent" />
                    
                    {/* Category badge */}
                    {categoryBadge && (
                      <div className="absolute top-3 left-3 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#E28A3E] text-white rounded-lg shadow-sm border border-[#E28A3E]/30">
                        <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-extrabold">
                          {categoryBadge}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-3.5 sm:p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-xs sm:text-sm font-semibold text-navy hover:text-primary transition-colors line-clamp-2 min-h-[36px] sm:min-h-[40px] leading-snug">
                        <Link href={`/courses/${course.slug}`}>{course.title}</Link>
                      </h3>
                      <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 font-medium">
                        {(course.lessonsCount || course.totalLessons || 12)} Chapters • {course.duration || "Self-paced"}
                      </p>
                    </div>

                    {/* Rating star/reviews strip */}
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/50 flex items-center justify-between">
                      <div className="flex items-center text-[#E28A3E] text-[10px] sm:text-xs font-extrabold gap-0.5">
                        <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                        <span>{(course.averageRating || course.rating || 4.8)}</span>
                      </div>

                      <div className="text-right text-[#E28A3E] text-[10px] sm:text-xs font-extrabold">
                        <span className="text-navy font-semibold">₹{course.price}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
