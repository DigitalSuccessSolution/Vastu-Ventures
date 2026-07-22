"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, PlayCircle, ChevronRight, BookOpen } from "lucide-react";
import api from "@/lib/axios";

export default function ContinueLearningPage() {
  const [activeCourses, setActiveCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get("/users/purchased-courses");
        if (data.success) {
          const inProgress = data.data.filter((e: any) => (e.progressPercentage || 0) > 0 && (e.progressPercentage || 0) < 100);
          setActiveCourses(inProgress.length > 0 ? inProgress : data.data.slice(0, 2));
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
        <p className="text-xs text-navy font-medium">Loading Active Courses...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* Clean Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-navy">Continue Learning</h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal mt-1">
            Resume active Vastu course video lessons right from where you left off.
          </p>
        </div>

        <div className="text-xs font-medium text-navy bg-white px-4 py-2 rounded-xl border border-border/80 shrink-0">
          Active: <span className="font-semibold text-primary">{activeCourses.length}</span>
        </div>
      </div>

      {/* Active Courses Grid */}
      <div className="w-full">
        {activeCourses.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-border rounded-2xl bg-white flex flex-col items-center justify-center p-8 shadow-sm">
            <BookOpen className="w-8 h-8 text-muted-foreground/30 mb-2" />
            <h2 className="text-sm font-semibold text-navy mb-1">No active courses in progress</h2>
            <p className="text-xs text-muted-foreground font-normal mb-4 max-w-xs">
              Enroll in a course to start your Vastu learning journey.
            </p>
            <Link
              href="/courses"
              className="px-4 py-2 bg-navy text-white text-xs font-semibold rounded-xl hover:bg-navy-light transition-all"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            {activeCourses.map((enrollment: any) => {
              const course = enrollment.course;
              const progress = Math.round(enrollment.progressPercentage || 0);

              return (
                <div key={enrollment._id} className="bg-white border border-border/80 p-5 rounded-2xl shadow-sm flex flex-col justify-between group">
                  <div>
                    <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3">
                      <img
                        src={course?.image?.url || "https://placehold.co/600x400"}
                        alt={course?.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors" />
                    </div>

                    <h2 className="font-serif text-sm sm:text-base font-semibold text-navy leading-snug group-hover:text-primary transition-colors">
                      {course?.title || "Vastu Course"}
                    </h2>

                    <div className="mt-3 pt-2.5 border-t border-border/40">
                      <div className="flex justify-between items-center text-xs font-semibold mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-primary">{progress}%</span>
                      </div>
                      <div className="w-full bg-[#FAF6F0] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gold-gradient h-full rounded-full" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-normal">Resume Lesson</span>
                    <Link
                      href={`/courses/${course?.slug}`}
                      className="px-4 py-2 bg-navy hover:bg-navy-light text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                    >
                      <span>Resume</span>
                      <ChevronRight className="w-3.5 h-3.5 text-primary" />
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
