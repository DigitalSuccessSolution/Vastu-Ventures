"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ThumbsUp } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/courses`);
        const data = await res.json();
        if (data.success) {
          setCourses(data.data);
        }
      } catch (err) {
        console.error("Error fetching published courses:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/course-categories`);
        const data = await res.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCourses();
    fetchCategories();
  }, []);

  const filteredCourses = selectedCategory === "all"
    ? courses
    : courses.filter(course => {
        if (!course) return false;
        const cat = course.category;
        if (!cat) return false;

        const catId = typeof cat === "object" ? String(cat._id || cat.id || "") : String(cat);
        const catName = typeof cat === "object" ? String(cat.name || "").toLowerCase() : String(cat).toLowerCase();
        const catSlug = typeof cat === "object" ? String(cat.slug || "").toLowerCase() : String(cat).toLowerCase();
        
        const selectedStr = String(selectedCategory).toLowerCase();

        return (
          catId === selectedCategory ||
          catName === selectedStr ||
          catSlug === selectedStr
        );
      });

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: premiumEase }
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

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-navy-light font-medium">Loading academy syllabus...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-base text-muted-foreground font-light">No courses published at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-10 w-full items-center">
            {/* Dynamic Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  selectedCategory === "all"
                    ? "bg-primary border-primary text-white shadow-premium"
                    : "bg-white border-border text-navy hover:border-primary/40"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id || cat.id}
                  onClick={() => setSelectedCategory(cat._id || cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    selectedCategory === (cat._id || cat.id)
                      ? "bg-primary border-primary text-white shadow-premium"
                      : "bg-white border-border text-navy hover:border-primary/40"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {filteredCourses.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-base text-muted-foreground font-light">No courses published under this category yet.</p>
              </div>
            ) : (
              /* Course Grid - 3 Columns on desktop for smaller, compact cards */
              <motion.div 
                key={selectedCategory}
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.08
                    }
                  }
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto w-full text-left"
              >
                {filteredCourses.map((course) => {
              const discountPercent = course.originalPrice > 0 
                ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
                : 0;
              const courseImage = course.thumbnail?.url || course.image || "";
              const likesKey = course._id ? `c${courses.indexOf(course) + 1}` : course.id;

              return (
                <motion.div
                  key={course._id || course.id}
                  variants={fadeUpVariants}
                  className="group bg-white border border-border rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-lg hover:border-primary/30 transition-all duration-300 flex flex-col justify-between p-4 text-left"
                >
                  <div>
                    {/* Image Block */}
                    <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4">
                      {courseImage ? (
                        <>
                          <img
                            src={courseImage}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#F5EFE6] to-[#E8D5B7] flex items-center justify-center">
                          <span className="text-3xl opacity-30">🏛️</span>
                        </div>
                      )}
                    </div>

                    {/* Content Block */}
                    <div className="px-1">
                      {/* Category Label */}
                      <div className="mb-2">
                        <span className="text-[9px] font-extrabold uppercase tracking-wider text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
                          {course.category?.name || course.category || "General"}
                        </span>
                      </div>

                      {/* Title */}
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-serif text-base font-semibold text-navy leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          <Link href={`/courses/${course.slug}`}>{course.title}</Link>
                        </h3>
                      </div>

                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2 font-light leading-relaxed">
                        {course.shortDescription || "Interactive Vedic space auditing program."}
                      </p>

                    </div>
                  </div>

                  {/* Bottom section: Price, discount percent and Full-width Button */}
                  <div className="px-1 mt-4">
                    {/* Pricing strip */}
                    <div className="flex items-center justify-between pt-3.5 border-t border-border/60">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-extrabold text-primary">₹{course.price}</span>
                        {course.originalPrice > 0 && (
                          <span className="text-xs sm:text-sm text-muted-foreground line-through">₹{course.originalPrice}</span>
                        )}
                      </div>
                      {discountPercent > 0 && (
                        <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-200/50 rounded-lg text-[10px] font-bold">
                          {discountPercent}% off
                        </span>
                      )}
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
            )}
          </div>
        )}

      </section>

    </div>
  );
}
