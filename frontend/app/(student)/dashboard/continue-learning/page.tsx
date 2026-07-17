"use client";

import React from "react";

export default function ContinueLearningPage() {
  return (
    <div className="flex flex-col gap-6 text-left">
      <div>
        <h2 className="font-serif text-2xl font-bold text-navy">Continue Learning</h2>
        <p className="text-xs text-muted-foreground mt-1 font-light">
          Resume your active courses from where you left off.
        </p>
      </div>
      <div className="bg-white border border-border p-8 rounded-2xl flex flex-col items-center justify-center text-center mt-6">
        <p className="text-navy-light text-sm">You do not have any active courses in progress.</p>
      </div>
    </div>
  );
}
