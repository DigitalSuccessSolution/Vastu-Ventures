"use client";

import React, { useState, useEffect } from "react";
import { Loader2, TrendingUp, CheckCircle } from "lucide-react";
import api from "@/lib/axios";

export default function CourseProgressPage() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const { data } = await api.get("/users/purchased-courses");
        if (data.success) {
          setEnrollments(data.data);
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
    return <div className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" /></div>;
  }

  const completedCourses = enrollments.filter(e => e.progressPercentage === 100).length;
  const totalCourses = enrollments.length;

  return (
    <div className="flex flex-col gap-6 text-left max-w-4xl">
      <div>
        <h2 className="font-serif text-2xl font-bold text-navy">Course Progress</h2>
        <p className="text-xs text-muted-foreground mt-1 font-light">
          Track your overall performance and milestones.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
        <div className="bg-white border border-border p-4 rounded-xl shadow-sm text-center">
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Total Enrolled</p>
          <p className="text-2xl font-serif font-bold text-navy mt-1">{totalCourses}</p>
        </div>
        <div className="bg-white border border-border p-4 rounded-xl shadow-sm text-center">
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Completed</p>
          <p className="text-2xl font-serif font-bold text-green-600 mt-1">{completedCourses}</p>
        </div>
        <div className="bg-white border border-border p-4 rounded-xl shadow-sm text-center">
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">In Progress</p>
          <p className="text-2xl font-serif font-bold text-primary mt-1">{totalCourses - completedCourses}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <h3 className="font-bold text-navy text-sm flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /> Detailed Progress</h3>
        
        {enrollments.length === 0 ? (
          <div className="bg-white border border-border p-8 rounded-2xl flex flex-col items-center justify-center text-center">
            <p className="text-navy-light text-sm">No progress data available yet.</p>
          </div>
        ) : (
          enrollments.map((enrollment: any) => (
            <div key={enrollment._id} className="bg-white border border-border p-5 rounded-xl shadow-premium">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-serif font-bold text-navy">{enrollment.course?.title}</h4>
                {enrollment.progressPercentage === 100 && <CheckCircle className="w-4 h-4 text-green-600" />}
              </div>
              <div className="w-full bg-background-alt h-2 rounded-full overflow-hidden">
                <div className="bg-gold-gradient h-full transition-all" style={{ width: `${enrollment.progressPercentage || 0}%` }} />
              </div>
              <p className="text-right text-[10px] font-bold text-primary mt-1">{Math.round(enrollment.progressPercentage || 0)}%</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
