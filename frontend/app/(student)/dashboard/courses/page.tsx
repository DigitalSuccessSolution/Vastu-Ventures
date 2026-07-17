import React from "react";
import Link from "next/link";
import { BookOpen, Clock, ChevronRight } from "lucide-react";
import { COURSES } from "@/data/mockData";

export default function MyCoursesPage() {
  return (
    <div className="flex flex-col gap-8 text-left">
      <div>
        <h2 className="font-serif text-2xl font-bold text-navy">My Learning Academy</h2>
        <p className="text-xs text-muted-foreground mt-1 font-light">
          Access your courses, watch lesson videos, and track your certification progress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {COURSES.length === 0 ? (
          <div className="col-span-2 py-12 text-center border border-dashed border-border rounded-2xl bg-white">
            <p className="text-xs text-muted-foreground font-light">You are not enrolled in any courses yet.</p>
            <Link href="/courses" className="text-xs text-primary font-bold hover:underline mt-2 inline-block">
              Browse Academy Courses &rarr;
            </Link>
          </div>
        ) : (
          COURSES.map((course, idx) => {
            // Dummy progress data
            const progress = idx === 0 ? 44 : 0;
            return (
              <div
                key={course.id}
                className="bg-white border border-border rounded-2xl p-5 shadow-premium flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4">
                    <img
                      src={course.image}
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
                      <span>{progress}% Completed</span>
                    </div>
                    <div className="w-full h-2 bg-background border border-border rounded-full overflow-hidden">
                      <div className="h-full bg-gold-gradient" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground font-light flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-primary" /> {course.duration}
                  </span>

                  <Link
                    href={`/dashboard/courses/${course.slug}`}
                    className="flex items-center gap-1 px-4 py-2 bg-navy hover:bg-navy-light text-white text-xs font-semibold rounded-lg shadow-premium transition-all"
                  >
                    {progress > 0 ? "Continue Lesson" : "Start Course"} <ChevronRight className="w-3.5 h-3.5" />
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
