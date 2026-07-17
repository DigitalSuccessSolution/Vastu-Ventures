"use client";

import React from "react";

export default function CourseProgressPage() {
  return (
    <div className="flex flex-col gap-6 text-left">
      <div>
        <h2 className="font-serif text-2xl font-bold text-navy">Course Progress</h2>
        <p className="text-xs text-muted-foreground mt-1 font-light">
          Track your overall performance and milestones.
        </p>
      </div>
      <div className="bg-white border border-border p-8 rounded-2xl flex flex-col items-center justify-center text-center mt-6">
        <p className="text-navy-light text-sm">No progress data available yet.</p>
      </div>
    </div>
  );
}
