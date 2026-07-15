"use client";

import React, { useState, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { COURSES } from "@/data/mockData";
import { Play, FileText, CheckCircle, ArrowLeft, Download, Award, MessageSquare, BookOpen, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function StudentCoursePlayerPage({ params }: Props) {
  const { slug } = use(params);
  const course = COURSES.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  // State to track current active section and lesson
  const [activeSecIdx, setActiveSecIdx] = useState(0);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "resources" | "qa">("overview");

  // Track checked lesson completions
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({
    "0-0": true,
    "0-1": true,
    "0-2": true
  });

  const handleLessonSelect = (secIdx: number, lesIdx: number) => {
    setActiveSecIdx(secIdx);
    setActiveLessonIdx(lesIdx);
  };

  const toggleComplete = (secIdx: number, lesIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const key = `${secIdx}-${lesIdx}`;
    setCompletedLessons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeLesson = course.curriculum[activeSecIdx]?.lessons[activeLessonIdx];

  // Calculate progress
  const totalLessons = course.curriculum.reduce((acc, curr) => acc + curr.lessons.length, 0);
  const completedCount = Object.values(completedLessons).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="flex flex-col gap-6 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/courses"
            className="p-2 rounded-lg hover:bg-background-alt border border-border text-navy transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-navy">{course.title}</h2>
            <p className="text-[10px] text-muted-foreground font-light mt-0.5">Academy Classroom Player</p>
          </div>
        </div>

        {/* Progress Badge */}
        <div className="flex items-center gap-3 bg-white border border-border px-4 py-2 rounded-xl shadow-premium">
          <div className="flex flex-col text-right">
            <span className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground">Class progress</span>
            <span className="text-xs font-bold text-navy">{progressPercent}% Completed</span>
          </div>
          <div className="w-16 h-2 bg-background border border-border rounded-full overflow-hidden">
            <div className="h-full bg-gold-gradient" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Classroom Viewport grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Lesson Player Area (Left) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Video Mock Player */}
          <div className="relative w-full aspect-video rounded-3xl bg-navy overflow-hidden shadow-premium-lg border-4 border-white flex flex-col justify-center items-center text-white">
            <div className="absolute inset-0 bg-cover bg-center opacity-40 filter blur-[2px]" style={{ backgroundImage: `url(${course.image})` }} />
            
            {/* Overlay controller */}
            <div className="relative z-10 flex flex-col items-center gap-4 p-4 text-center">
              <button
                onClick={() => alert(`Starting video streaming: "${activeLesson?.title}"`)}
                className="w-16 h-16 rounded-full bg-gold-gradient text-white flex items-center justify-center shadow-premium-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Play className="w-7 h-7 fill-white translate-x-0.5" />
              </button>
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-gold-start">Playing lesson</h4>
                <p className="text-sm font-semibold mt-1 max-w-md">{activeLesson?.title}</p>
              </div>
            </div>

            {/* Duration strip */}
            <div className="absolute bottom-4 left-6 right-6 flex justify-between text-[10px] text-background-alt/80 font-light z-10">
              <span>00:00 / {activeLesson?.duration}</span>
              <span>HD Video Player</span>
            </div>
          </div>

          {/* Tab Selection */}
          <div className="border-b border-border flex gap-4">
            {["overview", "resources", "qa"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-navy"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="bg-white border border-border rounded-2xl p-6 shadow-premium min-h-[160px]">
            {activeTab === "overview" && (
              <div className="flex flex-col gap-3">
                <h4 className="font-serif text-sm font-bold text-navy">Lesson: {activeLesson?.title}</h4>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  In this lesson, we study layout grids and zone mappings relative to the geometric center. We explore traditional Vedic compass readings, the history of spatial orientation, and elements placement basics. Make sure to complete the study worksheet before taking the quiz project.
                </p>
              </div>
            )}

            {activeTab === "resources" && (
              <div className="flex flex-col gap-3">
                <h4 className="font-serif text-sm font-bold text-navy">Downloadable Study Guides</h4>
                <div className="flex flex-col gap-2 mt-2">
                  <div className="p-3 bg-background-alt border border-border rounded-xl flex items-center justify-between text-xs text-navy font-light">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <span>{activeLesson?.title} - Student Study Guide.pdf</span>
                    </div>
                    <button
                      onClick={() => alert("Downloading PDF placeholder...")}
                      className="text-primary hover:text-gold-end cursor-pointer flex items-center gap-1 font-semibold"
                    >
                      <Download className="w-4 h-4" /> Download
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "qa" && (
              <div className="flex flex-col gap-3">
                <h4 className="font-serif text-sm font-bold text-navy">Class Discussion Q&A</h4>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  Ask our Acharyas queries regarding compass calibration, zone coordinates, and remedial wire setup details.
                </p>
                <button
                  onClick={() => alert("Submit query dialog mock...")}
                  className="mt-3 px-4 py-2 bg-navy text-white text-xs font-semibold rounded-lg shadow-premium w-max"
                >
                  Post New Question
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Curriculum Sidebar (Right) */}
        <div className="lg:col-span-4 bg-white border border-border rounded-2xl p-5 shadow-premium flex flex-col gap-4 max-h-[600px] overflow-y-auto">
          <h3 className="font-serif text-sm font-bold text-navy pb-2 border-b border-border">Course Curriculum</h3>
          
          <div className="flex flex-col gap-4 text-left">
            {course.curriculum.map((section, secIdx) => (
              <div key={secIdx} className="flex flex-col gap-2">
                <span className="text-[10px] uppercase font-bold text-primary tracking-wide">
                  {section.sectionTitle}
                </span>

                <div className="flex flex-col gap-1.5 pl-1.5">
                  {section.lessons.map((lesson, lesIdx) => {
                    const isCompleted = !!completedLessons[`${secIdx}-${lesIdx}`];
                    const isActive = activeSecIdx === secIdx && activeLessonIdx === lesIdx;
                    return (
                      <div
                        key={lesIdx}
                        onClick={() => handleLessonSelect(secIdx, lesIdx)}
                        className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-3 transition-all cursor-pointer ${
                          isActive
                            ? "border-primary bg-background-alt/80 shadow-premium"
                            : "border-border/60 bg-white hover:bg-background-alt/30"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => toggleComplete(secIdx, lesIdx, e)}
                            className="p-0.5 rounded focus:outline-none"
                          >
                            <CheckCircle
                              className={`w-4 h-4 ${
                                isCompleted ? "text-accent fill-accent text-white" : "text-muted-foreground/40"
                              }`}
                            />
                          </button>
                          <span className={`font-light line-clamp-1 ${isActive ? "font-bold text-navy" : "text-navy-light"}`}>
                            {lesson.title}
                          </span>
                        </div>
                        <span className="text-[9px] text-muted-foreground shrink-0">{lesson.duration}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
