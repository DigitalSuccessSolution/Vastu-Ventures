"use client";

import React, { useState, useEffect } from "react";
import { Loader2, TrendingUp, CheckCircle, PlayCircle } from "lucide-react";
import Link from "next/link";
import api from "@/lib/axios";

export default function CourseProgressPage() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const { data } = await api.get("/users/purchased-courses");
        if (data.success) {
          setEnrollments(data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch progress", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-7 h-7 animate-spin text-primary" />
        <p className="text-xs text-navy font-medium">Loading Progress...</p>
      </div>
    );
  }

  const completedCourses = enrollments.filter(e => (e.progressPercentage || 0) >= 100).length;
  const totalCourses = enrollments.length;
  const inProgressCourses = totalCourses - completedCourses;

  return (
    <div className="flex flex-col w-full">
      {/* Clean Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-navy">Course Progress</h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal mt-1">
            Track your completion metrics across enrolled Vastu learning modules.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-navy bg-white px-4 py-2 rounded-xl border border-border/80 shrink-0">
          <span>Total: <strong className="font-semibold text-navy">{totalCourses}</strong></span>
          <span>•</span>
          <span>In Progress: <strong className="font-semibold text-primary">{inProgressCourses}</strong></span>
          <span>•</span>
          <span>Completed: <strong className="font-semibold text-emerald-600">{completedCourses}</strong></span>
        </div>
      </div>

      {/* Progress Cards Grid */}
      <div className="w-full flex flex-col gap-4">
        {enrollments.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-border rounded-2xl bg-white flex flex-col items-center justify-center p-8 shadow-sm">
            <TrendingUp className="w-8 h-8 text-muted-foreground/30 mb-2" />
            <h2 className="text-sm font-semibold text-navy mb-1">No progress data available</h2>
            <p className="text-xs text-muted-foreground font-normal mb-4 max-w-xs">
              Enroll in a course to start tracking your completion analytics.
            </p>
            <Link
              href="/courses"
              className="px-4 py-2 bg-navy text-white text-xs font-semibold rounded-xl hover:bg-navy-light transition-all"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {enrollments.map((enrollment: any) => {
              const progress = Math.round(enrollment.progressPercentage || 0);
              const isFinished = progress >= 100;

              return (
                <div key={enrollment._id} className="bg-white border border-border/80 p-5 rounded-2xl shadow-sm flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h2 className="font-serif font-semibold text-sm sm:text-base text-navy leading-snug group-hover:text-primary transition-colors">
                        {enrollment.course?.title || "Vastu Course"}
                      </h2>
                      {isFinished ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1 shrink-0">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Completed
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1 shrink-0">
                          <PlayCircle className="w-3.5 h-3.5 text-amber-600" /> {progress}%
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border/40">
                    <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                      <span className="text-muted-foreground">Completion Rate</span>
                      <span className="text-primary">{progress}%</span>
                    </div>
                    <div className="w-full bg-[#FAF6F0] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gold-gradient h-full rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <div className="mt-3 flex justify-end">
                      <Link
                        href={`/courses/${enrollment.course?.slug}`}
                        className="text-xs font-semibold text-navy hover:text-primary transition-colors flex items-center gap-1"
                      >
                        <span>Continue &rarr;</span>
                      </Link>
                    </div>
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
