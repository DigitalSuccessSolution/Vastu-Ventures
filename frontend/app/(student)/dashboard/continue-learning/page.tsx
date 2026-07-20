"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, PlayCircle } from "lucide-react";
import api from "@/lib/axios";

export default function ContinueLearningPage() {
  const [activeCourses, setActiveCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get("/users/purchased-courses");
        if (data.success) {
          // Filter to only show courses that are started but not finished (e.g. progress > 0)
          const inProgress = data.data.filter((e: any) => e.progressPercentage > 0 && e.progressPercentage < 100);
          setActiveCourses(inProgress.length > 0 ? inProgress : data.data.slice(0, 1)); // Show at least one if none in progress
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
    <div className="flex flex-col gap-6 text-left">
      <div>
        <h2 className="font-serif text-2xl font-bold text-navy">Continue Learning</h2>
        <p className="text-xs text-muted-foreground mt-1 font-light">
          Resume your active courses from where you left off.
        </p>
      </div>

      {activeCourses.length === 0 ? (
        <div className="bg-white border border-border p-8 rounded-2xl flex flex-col items-center justify-center text-center mt-6">
          <p className="text-navy-light text-sm">You do not have any active courses in progress.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {activeCourses.map((enrollment: any) => (
            <div key={enrollment._id} className="bg-white border border-border p-5 rounded-xl shadow-premium flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-navy">{enrollment.course?.title}</h3>
                <p className="text-[10px] text-muted-foreground mt-1">Progress: {Math.round(enrollment.progressPercentage || 0)}%</p>
              </div>
              <Link href={`/courses/${enrollment.course?.slug}`} className="p-3 bg-gold-gradient text-white rounded-full hover:scale-105 transition-transform">
                <PlayCircle className="w-5 h-5" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
