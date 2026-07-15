"use client";

import React from "react";
import Link from "next/link";
import { Compass, BookOpen, Clock, Calendar, ChevronRight, Award, Heart, CheckCircle2 } from "lucide-react";

export default function StudentDashboardPage() {
  const metrics = [
    { label: "Enrolled Courses", value: "2", icon: BookOpen, desc: "Active academy studies" },
    { label: "Lessons Completed", value: "8 / 60", icon: CheckCircle2, desc: "Total study progress" },
    { label: "Scheduled Audits", value: "1", icon: Calendar, desc: "Next session: July 15" }
  ];

  return (
    <div className="flex flex-col gap-8 text-left">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-navy">Welcome back, Priya</h2>
        <p className="text-xs text-muted-foreground mt-1 font-light">
          Track your course certifications and scheduled Vastu consultations.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div
              key={i}
              className="bg-white border border-border p-5 rounded-2xl shadow-premium flex items-center justify-between"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{metric.label}</span>
                <span className="text-2xl font-extrabold text-navy">{metric.value}</span>
                <span className="text-[10px] text-muted-foreground font-light mt-0.5">{metric.desc}</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-background-alt text-primary flex items-center justify-center">
                <Icon className="w-5.5 h-5.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Learning Status Banner */}
      <div className="bg-navy text-white rounded-3xl p-6 sm:p-8 shadow-premium-lg grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 opacity-[0.03] bg-[radial-gradient(circle_at_center,var(--gold-start)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
        
        <div className="md:col-span-8 flex flex-col gap-3">
          <span className="px-2.5 py-0.5 rounded-lg bg-gold-start/20 text-gold-start border border-gold-start/30 w-max text-[9px] uppercase font-bold tracking-wider">
            In Progress
          </span>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-white">Vastu Shastra Foundation Certification</h3>
          <p className="text-xs text-background-alt/80 font-light max-w-xl">
            You completed "The Origin & Vedic Foundations". Up next: "Section 2: The Pancha Bhootas (5 Elements)".
          </p>
        </div>

        <div className="md:col-span-4 flex justify-end">
          <Link
            href="/dashboard/courses/vastu-shastra-foundation"
            className="px-6 py-3 bg-gold-gradient text-white text-xs font-bold rounded-xl shadow-premium hover:shadow-premium-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center gap-1.5"
          >
            Continue Learning <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Grid columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Appointments List (Left) */}
        <div className="lg:col-span-8 bg-white border border-border rounded-2xl p-6 shadow-premium">
          <h3 className="font-serif text-base font-bold text-navy mb-4">Upcoming consultations</h3>
          
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-background-alt border border-border rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border border-border text-primary flex items-center justify-center">
                  <Compass className="w-5.5 h-5.5" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-navy">Residential Vastu audit call</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5 font-light">Online Video Session (Zoom)</p>
                </div>
              </div>
              <div className="flex flex-col text-left sm:text-right gap-1 text-[10px] text-navy">
                <span className="font-semibold">July 15, 2026</span>
                <span className="text-muted-foreground">10:30 AM - 11:30 AM</span>
              </div>
              <button
                onClick={() => alert("Zoom link is not active yet. Check back 10 mins before session.")}
                className="px-4 py-1.5 bg-navy text-white text-[10px] font-semibold rounded-lg shadow-premium hover:bg-navy-light cursor-pointer"
              >
                Join Video Meeting
              </button>
            </div>
          </div>
        </div>

        {/* Certificates & Achievements (Right) */}
        <div className="lg:col-span-4 bg-white border border-border rounded-2xl p-6 shadow-premium text-left">
          <h3 className="font-serif text-base font-bold text-navy mb-4">Certificates</h3>
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-background-alt border border-border rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-border text-gold-end flex items-center justify-center">
                <Award className="w-5.5 h-5.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-navy leading-none">No verified certificates yet</h4>
                <p className="text-[9px] text-muted-foreground mt-1.5 font-light leading-relaxed">
                  Complete your active foundation program to verify credentials.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
