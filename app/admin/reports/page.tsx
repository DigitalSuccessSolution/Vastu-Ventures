"use client";

import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
import { COURSES as initialCourses } from "@/data/mockData";

export default function AdminReportsPage() {
  const [courses] = useState(initialCourses);
  const totalEarning = (courses.reduce((acc, c) => acc + c.price, 0) * 15) + 500;

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up text-left">
      <div className="flex justify-between items-center">
        <p className="text-xs text-muted-foreground font-light">Download consolidated financial receipts.</p>
        <button 
          onClick={() => alert("Downloading PDF & Excel spreadsheets reports log...")}
          className="px-4 py-2 bg-navy text-white text-xs font-bold rounded-xl shadow-premium hover:bg-navy-light transition-all cursor-pointer"
        >
          Export Report Sheet
        </button>
      </div>

      {/* Earnings Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-border rounded-2xl p-5 shadow-premium">
          <h3 className="font-serif text-base font-bold text-navy mb-4">Gross Revenue Allocations</h3>
          <div className="flex flex-col gap-4 text-xs">
            <div className="flex justify-between items-center p-3 bg-background-alt border border-border rounded-xl">
              <span className="font-semibold text-navy">Academy Course Sales</span>
              <span className="font-bold text-navy">₹{(courses.reduce((acc, c) => acc + c.price, 0) * 15 * 80).toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-background-alt border border-border rounded-xl">
              <span className="font-semibold text-navy">Corporate & Residential Consultations</span>
              <span className="font-bold text-navy">₹{(500 * 80).toLocaleString("en-IN")}</span>
            </div>
            <div className="border-t border-border/80 pt-4 flex justify-between items-center font-bold text-navy text-sm px-1">
              <span>Total Revenue Pool</span>
              <span>₹{(totalEarning * 80).toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-border rounded-2xl p-5 shadow-premium flex flex-col justify-between">
          <h3 className="font-serif text-base font-bold text-navy mb-2">Monthly Projections</h3>
          <div className="flex flex-col gap-3 mt-4 text-xs font-light">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">May 2026</span>
              <span className="font-bold text-navy">₹1,20,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">June 2026</span>
              <span className="font-bold text-navy">₹1,80,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">July 2026 (Current)</span>
              <span className="font-bold text-navy">₹1,28,000</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-primary font-bold text-xs mt-6 bg-primary/5 p-3 rounded-xl border border-primary/20">
            <TrendingUp className="w-5 h-5" />
            <span>Calculations reflect +18.4% month-over-month growth.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
