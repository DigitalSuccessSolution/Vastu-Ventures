"use client";

import React, { useState, useEffect, use, useCallback } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  Play, 
  FileText, 
  CheckCircle, 
  ArrowLeft, 
  Download, 
  Loader2, 
  Video, 
  Award,
  ChevronLeft,
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import { useAuthStore } from "@/lib/store";
import api from "@/lib/axios";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function StudentCoursePlayerPage({ params }: Props) {
  const { slug } = use(params);
  const { token } = useAuthStore();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // State to track current active section and lesson
  const [activeSecIdx, setActiveSecIdx] = useState(0);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);

  // Track checked lesson completions by lesson ID
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const [dbCompletionPercent, setDbCompletionPercent] = useState<number | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const { data } = await api.get(`/courses/${slug}`);
        if (data.success && data.data) {
          const courseData = data.data;
          setCourse(courseData);
          const courseId = courseData._id;

          // 1. Read local storage cache first
          const localKey = `vastu_completed_${courseId}`;
          let localMap: Record<string, boolean> = {};
          try {
            const cached = localStorage.getItem(localKey);
            if (cached) localMap = JSON.parse(cached);
          } catch (e) {}

          if (Object.keys(localMap).length > 0) {
            setCompletedLessons(localMap);
          }

          // 2. Fetch DB enrollment & progress
          try {
            const enrollRes = await api.get(`/enrollments/${courseId}`);
            if (enrollRes.data.success && enrollRes.data.data) {
              const { enrollment, progress } = enrollRes.data.data;
              const isCourse100Completed = enrollment?.isCompleted || (enrollment?.completionPercentage || 0) >= 100;

              if (enrollment) {
                setDbCompletionPercent(isCourse100Completed ? 100 : enrollment.completionPercentage || 0);
              }

              const mergedMap: Record<string, boolean> = { ...localMap };

              if (Array.isArray(progress)) {
                progress.forEach((p: any) => {
                  if (p.isCompleted && p.lesson) {
                    const lesIdStr = typeof p.lesson === "object" && p.lesson._id ? String(p.lesson._id) : String(p.lesson);
                    mergedMap[lesIdStr] = true;
                  }
                });
              }

              // If course is 100% completed in DB, mark ALL curriculum lessons completed
              if (isCourse100Completed && Array.isArray(courseData.curriculum)) {
                courseData.curriculum.forEach((sec: any) => {
                  (sec.lessons || []).forEach((les: any) => {
                    if (les._id) mergedMap[String(les._id)] = true;
                  });
                });
              }

              setCompletedLessons(mergedMap);
              try {
                localStorage.setItem(localKey, JSON.stringify(mergedMap));
              } catch (e) {}
            }
          } catch (enrollErr) {
            console.error("No specific enrollment progress record yet", enrollErr);
          }
        }
      } catch (err) {
        console.error("Failed to fetch course details for player", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [slug]);

  const curriculum = course?.curriculum || [];
  const activeSection = curriculum[activeSecIdx] || { lessons: [] };
  const activeLesson = activeSection.lessons?.[activeLessonIdx] || null;

  // Linearize lessons list for Previous/Next navigation
  const allLessons: Array<{ secIdx: number; lesIdx: number; lesson: any; sectionTitle: string }> = [];
  curriculum.forEach((sec: any, sIdx: number) => {
    (sec.lessons || []).forEach((les: any, lIdx: number) => {
      allLessons.push({ secIdx: sIdx, lesIdx: lIdx, lesson: les, sectionTitle: sec.sectionTitle });
    });
  });

  const currentFlatIndex = allLessons.findIndex(
    (item) => item.secIdx === activeSecIdx && item.lesIdx === activeLessonIdx
  );

  // Automatic Lesson Completion API Call (Permanent DB Record)
  const autoMarkCompleted = useCallback(async (les: any) => {
    if (!les || !les._id || !course?._id) return;
    const lesId = String(les._id);
    const courseId = course._id;
    const localKey = `vastu_completed_${courseId}`;

    setCompletedLessons((prev) => {
      if (prev[lesId]) return prev;
      const updated = { ...prev, [lesId]: true, [les._id]: true };
      try {
        localStorage.setItem(localKey, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    try {
      const res = await api.post(`/enrollments/${courseId}/lesson/${les._id}/complete`);
      if (res.data.success && res.data.data) {
        const { completionPercentage, isCompleted } = res.data.data;
        if (completionPercentage !== undefined) {
          setDbCompletionPercent(completionPercentage);
        }
        if (isCompleted && Array.isArray(course.curriculum)) {
          const allMap: Record<string, boolean> = {};
          course.curriculum.forEach((sec: any) => {
            (sec.lessons || []).forEach((l: any) => {
              if (l._id) allMap[String(l._id)] = true;
            });
          });
          setCompletedLessons(allMap);
          try {
            localStorage.setItem(localKey, JSON.stringify(allMap));
          } catch (e) {}
        }
      }
    } catch (err) {
      console.error("Auto lesson complete error", err);
    }
  }, [course]);

  // Auto completion when student opens/views a lesson
  useEffect(() => {
    if (activeLesson && activeLesson._id) {
      const timer = setTimeout(() => {
        autoMarkCompleted(activeLesson);
      }, 1500); // Automatically marks complete 1.5s after viewing/playing
      return () => clearTimeout(timer);
    }
  }, [activeLesson, autoMarkCompleted]);

  const handleLessonSelect = (secIdx: number, lesIdx: number) => {
    if (activeLesson) {
      autoMarkCompleted(activeLesson);
    }
    setActiveSecIdx(secIdx);
    setActiveLessonIdx(lesIdx);
  };

  const handlePrevLesson = () => {
    if (activeLesson) {
      autoMarkCompleted(activeLesson);
    }
    if (currentFlatIndex > 0) {
      const prev = allLessons[currentFlatIndex - 1];
      setActiveSecIdx(prev.secIdx);
      setActiveLessonIdx(prev.lesIdx);
    }
  };

  const handleNextLesson = () => {
    if (activeLesson) {
      autoMarkCompleted(activeLesson);
    }
    if (currentFlatIndex < allLessons.length - 1) {
      const next = allLessons[currentFlatIndex + 1];
      setActiveSecIdx(next.secIdx);
      setActiveLessonIdx(next.lesIdx);
    }
  };

  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  };

  const handleDownloadPdf = async (url: string, filename: string) => {
    if (!url) return;
    if (activeLesson) {
      autoMarkCompleted(activeLesson);
    }
    const cleanUrl = url.replace("/fl_attachment/", "/");
    try {
      const response = await fetch(cleanUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.open(cleanUrl, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-xs text-navy font-semibold">Loading Vastu Classroom...</p>
      </div>
    );
  }

  if (!course) {
    notFound();
  }

  // Progress metrics
  const totalLessons = allLessons.length;
  const completedCount = Object.values(completedLessons).filter(Boolean).length;
  const computedPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const progressPercent = dbCompletionPercent !== null ? dbCompletionPercent : computedPercent;

  const activeYoutubeId = activeLesson?.videoUrl ? getYoutubeId(activeLesson.videoUrl) : null;

  return (
    <div className="flex flex-col gap-6 text-left w-full">
      
      {/* Top Header Navigation & Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-5">
        <div className="flex items-center gap-3.5">
          <Link
            href="/dashboard/courses"
            className="p-2.5 rounded-xl bg-white hover:bg-[#FAF6F0] border border-border/80 text-navy transition-all shadow-sm shrink-0"
            title="Back to My Courses"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-serif text-lg sm:text-xl font-bold text-navy leading-snug">{course.title}</h1>
          </div>
        </div>

        {/* Header Progress Card */}
        <div className="flex items-center gap-4 bg-white border border-border/80 px-4 py-2.5 rounded-2xl shadow-sm shrink-0">
          <div className="flex flex-col text-right">
            <span className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground">Classroom Progress</span>
            <span className="text-xs font-bold text-navy">{progressPercent}% Completed ({completedCount}/{totalLessons})</span>
          </div>
          <div className="w-24 h-2.5 bg-[#FAF6F0] border border-border/60 rounded-full overflow-hidden">
            <div className="h-full bg-gold-gradient transition-all duration-300 rounded-full" style={{ width: `${progressPercent}%` }} />
          </div>

          {progressPercent >= 100 && (
            <Link
              href="/dashboard/certificates"
              className="p-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-colors shrink-0"
              title="View Certificate"
            >
              <Award className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Main Grid: LEFT (Syllabus Navigation) | RIGHT (Video Player & Lesson Content) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
        
        {/* ======================================================== */}
        {/* LEFT SIDE: Course Syllabus Navigation (lg:col-span-4)     */}
        {/* ======================================================== */}
        <div className="lg:col-span-4 bg-white border border-border/80 rounded-2xl p-5 shadow-sm flex flex-col gap-4 max-h-[680px] overflow-y-auto w-full sticky top-24">
          <div className="pb-3 border-b border-border/60 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-base font-bold text-navy">Course Syllabus</h2>
              <p className="text-[10px] text-muted-foreground font-normal">Lessons complete automatically as you study</p>
            </div>
            <span className="text-xs font-bold text-primary bg-[#FAF6F0] border border-[#EDE3D0] px-2.5 py-1 rounded-xl">
              {completedCount}/{totalLessons} Done
            </span>
          </div>

          {/* Curriculum Sections List */}
          <div className="flex flex-col gap-5 text-left">
            {curriculum.map((section: any, secIdx: number) => (
              <div key={secIdx} className="flex flex-col gap-2">
                {/* Section Lessons */}
                <div className="flex flex-col gap-1.5 pl-1">
                  {(section.lessons || []).map((lesson: any, lesIdx: number) => {
                    const isCompleted = !!completedLessons[String(lesson._id)] || !!completedLessons[lesson._id];
                    const isActive = activeSecIdx === secIdx && activeLessonIdx === lesIdx;
                    const isPdf = lesson.contentType === "pdf";

                    return (
                      <div
                        key={lesIdx}
                        onClick={() => handleLessonSelect(secIdx, lesIdx)}
                        className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-3 transition-all cursor-pointer ${
                          isActive
                            ? "border-primary bg-primary/10 shadow-sm font-bold text-navy"
                            : isCompleted
                            ? "border-border/40 bg-[#F8F7F4] text-navy/70 opacity-80 hover:opacity-100 hover:bg-white"
                            : "border-border/60 bg-white hover:bg-[#FAF9F6] text-navy font-medium"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          {/* Automatic Tick Icon (Read-only, no unticking) */}
                          <div className="shrink-0 pointer-events-none">
                            <CheckCircle
                              className={`w-4 h-4 transition-colors ${
                                isCompleted ? "text-emerald-600 fill-emerald-100" : "text-muted-foreground/30"
                              }`}
                            />
                          </div>

                          <span className={`truncate leading-tight font-medium ${isCompleted ? "text-navy/70 font-normal" : ""}`}>
                            {lesson.title}
                          </span>
                        </div>

                        {/* Content Type Badge */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {isActive && (
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          )}
                          <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded border ${
                            isPdf 
                              ? "bg-navy/5 text-navy border-navy/10" 
                              : "bg-primary/10 text-primary border-primary/20"
                          }`}>
                            {isPdf ? "PDF" : "Video"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT SIDE: Video Player & Lesson Content (lg:col-span-8) */}
        {/* ======================================================== */}
        <div className="lg:col-span-8 flex flex-col gap-5 w-full">
          
          {/* Cinema Player / PDF Viewer Container */}
          <div className="relative w-full aspect-video rounded-2xl bg-navy overflow-hidden shadow-md border border-border flex flex-col justify-center items-center text-white">
            {activeLesson?.contentType === "pdf" ? (
              <div className="p-8 text-center flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-white/10 text-primary border border-white/20 flex items-center justify-center shadow-inner">
                  <FileText className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{activeLesson?.title || "PDF Study Document"}</h3>
                  <p className="text-xs text-white/70 max-w-md">
                    This curriculum module contains official Vastu study guidelines and downloadable reference material.
                  </p>
                </div>
                {activeLesson?.fileUrl && (
                  <button
                    type="button"
                    onClick={() => handleDownloadPdf(activeLesson.fileUrl, activeLesson.fileName || `${activeLesson.title}.pdf`)}
                    className="mt-2 px-6 py-3 bg-gold-gradient text-white text-xs font-bold rounded-xl shadow-md hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" /> Download PDF Document ({activeLesson.fileName || "Study_Guide.pdf"})
                  </button>
                )}
              </div>
            ) : activeYoutubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${activeYoutubeId}?autoplay=0&rel=0`}
                title={activeLesson?.title || "Lesson Video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full absolute inset-0 border-0"
              />
            ) : activeLesson?.videoUrl ? (
              <video
                src={activeLesson.videoUrl}
                controls
                controlsList="nodownload"
                className="w-full h-full object-contain bg-black"
              />
            ) : (
              <div className="p-8 text-center flex flex-col items-center gap-2">
                <Video className="w-12 h-12 text-primary/80 mb-2 animate-bounce" />
                <h3 className="text-base font-semibold text-white">{activeLesson?.title || "Select a lesson to begin"}</h3>
                <p className="text-xs text-white/60">No video stream link configured for this lesson.</p>
              </div>
            )}
          </div>

          {/* Centered Previous & Next Buttons below Video */}
          <div className="flex items-center justify-center gap-3.5 mt-1">
            <button
              type="button"
              onClick={handlePrevLesson}
              disabled={currentFlatIndex <= 0}
              className="px-5 py-2.5 bg-[#FAF6F0] hover:bg-[#EDE3D0] disabled:opacity-40 disabled:cursor-not-allowed border border-[#EDE3D0] text-navy rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <button
              type="button"
              onClick={handleNextLesson}
              disabled={currentFlatIndex >= allLessons.length - 1}
              className="px-5 py-2.5 bg-navy hover:bg-navy-light disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              Next <ChevronRight className="w-4 h-4 text-primary" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
