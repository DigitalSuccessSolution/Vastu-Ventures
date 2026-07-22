"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, ChevronRight, Loader2, PlayCircle, CheckCircle2 } from "lucide-react";
import api from "@/lib/axios";

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get("/users/purchased-courses");
        if (data.success) {
          setCourses(data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-7 h-7 animate-spin text-primary" />
        <p className="text-xs text-navy font-medium">Loading Courses...</p>
      </div>
    );
  }

  const completedCount = courses.filter(e => (e.progressPercentage || 0) >= 100).length;

  return (
    <div className="flex flex-col w-full">
      {/* Clean Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-navy">My Courses</h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal mt-1">
            Access your enrolled Vastu learning modules and continue video lessons.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs text-navy font-medium bg-white px-4 py-2 rounded-xl border border-border/80 shrink-0">
          <span><strong className="text-primary font-semibold">{courses.length}</strong> Enrolled</span>
          <span>•</span>
          <span><strong className="text-emerald-600 font-semibold">{completedCount}</strong> Completed</span>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="w-full">
        {courses.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-border rounded-2xl bg-white flex flex-col items-center justify-center p-8 shadow-sm">
            <BookOpen className="w-8 h-8 text-muted-foreground/30 mb-3" />
            <h2 className="text-sm font-semibold text-navy mb-1">No courses enrolled yet</h2>
            <p className="text-xs text-muted-foreground font-normal mb-5 max-w-sm">
              Discover our certified Vastu modules and start learning.
            </p>
            <Link
              href="/courses"
              className="px-5 py-2.5 rounded-xl bg-gold-gradient text-white text-xs font-semibold shadow-sm hover:opacity-95 transition-all"
            >
              Browse Academy Courses &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {courses.map((enrollment: any) => {
              const course = enrollment.course;
              const progress = enrollment.progressPercentage || 0;
              const isCompleted = progress >= 100;
              return (
                <div
                  key={enrollment._id}
                  className="bg-white border border-border/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative w-full h-40 rounded-xl overflow-hidden mb-3">
                      <img
                        src={course?.image?.url || "https://placehold.co/600x400"}
                        alt={course?.title || "Course Title"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-navy/10 to-transparent" />
                      
                      <div className="absolute top-2.5 left-2.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase shadow-sm ${
                          isCompleted ? "bg-emerald-600 text-white" : "bg-white/90 text-navy"
                        }`}>
                          {isCompleted ? "Completed" : "In Progress"}
                        </span>
                      </div>
                    </div>

                    <h2 className="font-serif text-sm font-semibold text-navy leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {course?.title || "Untitled Course"}
                    </h2>
                    
                    {/* Progress Bar */}
                    <div className="mt-3 pt-2.5 border-t border-border/40">
                      <div className="flex justify-between items-center text-[10px] font-semibold mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-primary">{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#FAF6F0] rounded-full overflow-hidden">
                        <div className="h-full bg-gold-gradient rounded-full" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground font-normal flex items-center gap-1">
                      <PlayCircle className="w-3.5 h-3.5 text-primary" />
                      {isCompleted ? "Review" : "Continue"}
                    </span>
                    <Link
                      href={`/courses/${course?.slug}`}
                      className="flex items-center gap-1 text-xs font-semibold text-white bg-navy hover:bg-navy-light px-3.5 py-1.5 rounded-xl transition-all shadow-sm"
                    >
                      <span>{isCompleted ? "Review" : "Watch Now"}</span>
                      <ChevronRight className="w-3 h-3 text-primary" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
