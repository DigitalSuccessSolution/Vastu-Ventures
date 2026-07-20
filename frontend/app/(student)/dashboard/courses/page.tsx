"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Clock, ChevronRight, Loader2 } from "lucide-react";
import api from "@/lib/axios";

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get("/users/purchased-courses");
        if (data.success) {
          setCourses(data.data);
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
    return <div className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" /></div>;
  }

  return (
    <div className="flex flex-col gap-8 text-left">
      <div>
        <h2 className="font-serif text-2xl font-bold text-navy">My Learning Academy</h2>
        <p className="text-xs text-muted-foreground mt-1 font-light">
          Access your courses, watch lesson videos, and track your certification progress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {courses.length === 0 ? (
          <div className="col-span-2 py-12 text-center border border-dashed border-border rounded-2xl bg-white">
            <p className="text-xs text-muted-foreground font-light">You are not enrolled in any courses yet.</p>
            <Link href="/courses" className="text-xs text-primary font-bold hover:underline mt-2 inline-block">
              Browse Academy Courses &rarr;
            </Link>
          </div>
        ) : (
          courses.map((enrollment: any) => {
            const course = enrollment.course;
            const progress = enrollment.progressPercentage || 0;
            return (
              <div
                key={enrollment._id}
                className="bg-white border border-border rounded-2xl p-5 shadow-premium flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4">
                    <img
                      src={course.image?.url || "https://placehold.co/600x400"}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
                  </div>

                  <h3 className="font-serif text-base font-bold text-navy leading-snug">
                    {course.title}
                  </h3>
                  
                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center text-[10px] text-muted-foreground font-semibold mb-1">
                      <span>Progress</span>
                      <span>{Math.round(progress)}% Completed</span>
                    </div>
                    <div className="w-full h-2 bg-background border border-border rounded-full overflow-hidden">
                      <div className="h-full bg-gold-gradient" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground font-light flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> Resume Learning
                  </span>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-white bg-navy hover:bg-navy-light px-3 py-1.5 rounded-lg transition-all"
                  >
                    Watch Now <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
