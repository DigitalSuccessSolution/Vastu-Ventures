"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  ChevronRight, 
  Loader2, 
  PlayCircle, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  Award, 
  TrendingUp,
  Clock,
  Filter
} from "lucide-react";
import api from "@/lib/axios";

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "in-progress" | "completed">("all");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get("/users/purchased-courses");
        if (data.success) {
          setCourses(data.data || []);
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
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-xs text-navy font-semibold">Loading Your Learning Hub...</p>
      </div>
    );
  }

  // Calculate metrics
  const totalCourses = courses.length;
  const completedCount = courses.filter((e) => e.isCompleted || (e.progressPercentage || 0) >= 100).length;
  const inProgressCount = totalCourses - completedCount;
  const avgProgress = totalCourses > 0 
    ? Math.round(courses.reduce((acc, curr) => acc + (curr.progressPercentage || 0), 0) / totalCourses) 
    : 0;

  // Filter courses by tab & search query
  const filteredCourses = courses.filter((enrollment) => {
    const course = enrollment.course;
    if (!course) return false;

    const matchesSearch = course.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const isCompleted = enrollment.isCompleted || (enrollment.progressPercentage || 0) >= 100;

    if (!matchesSearch) return false;

    if (activeTab === "in-progress") return !isCompleted;
    if (activeTab === "completed") return isCompleted;
    return true;
  });

  const getCourseImage = (course: any) => {
    if (!course) return "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80";
    if (typeof course.image === "string" && course.image.trim() !== "") return course.image;
    if (course.image?.url) return course.image.url;
    return "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80";
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/80 pb-5">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy">My Courses</h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal mt-1">
            Your personal Vastu learning hub. Track classroom progress, resume active video lectures, and download study guides.
          </p>
        </div>

        <Link
          href="/courses"
          className="px-4 py-2.5 rounded-xl bg-gold-gradient text-white text-xs font-bold shadow-sm hover:opacity-95 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>Explore New Courses</span>
        </Link>
      </div>

      {/* Analytics Metric Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4.5 rounded-2xl border border-border/80 shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-primary shrink-0 border border-[#EDE3D0]">
            <BookOpen className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-navy">{totalCourses}</h2>
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Enrolled Courses</p>
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-border/80 shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0 border border-amber-200/60">
            <Clock className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-navy">{inProgressCount}</h2>
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">In Progress</p>
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-border/80 shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-200/60">
            <CheckCircle2 className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-navy">{completedCount}</h2>
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Completed</p>
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-border/80 shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-primary shrink-0 border border-[#EDE3D0]">
            <TrendingUp className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-navy">{avgProgress}%</h2>
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Avg. Completion</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-3.5 rounded-2xl border border-border/80 shadow-sm">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 bg-[#FAF6F0] p-1 rounded-xl border border-[#EDE3D0]/80">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-navy text-white shadow-sm"
                : "text-muted-foreground hover:text-navy"
            }`}
          >
            All Courses ({totalCourses})
          </button>
          <button
            onClick={() => setActiveTab("in-progress")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "in-progress"
                ? "bg-navy text-white shadow-sm"
                : "text-muted-foreground hover:text-navy"
            }`}
          >
            Active ({inProgressCount})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "completed"
                ? "bg-navy text-white shadow-sm"
                : "text-muted-foreground hover:text-navy"
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search enrolled courses..."
            className="w-full pl-9 pr-4 py-1.5 bg-[#FAF6F0]/50 border border-border/70 rounded-xl text-xs text-navy placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Enrolled Courses Grid */}
      <div className="w-full">
        {filteredCourses.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-border rounded-2xl bg-white flex flex-col items-center justify-center p-8 shadow-sm">
            <BookOpen className="w-10 h-10 text-muted-foreground/30 mb-3" />
            <h3 className="text-sm font-bold text-navy mb-1">No courses found</h3>
            <p className="text-xs text-muted-foreground font-normal mb-5 max-w-xs">
              {searchQuery
                ? `No courses matching "${searchQuery}"`
                : activeTab === "completed"
                ? "You haven't completed any course yet. Keep learning!"
                : "No active courses in progress."}
            </p>
            {totalCourses === 0 && (
              <Link
                href="/courses"
                className="px-5 py-2.5 rounded-xl bg-gold-gradient text-white text-xs font-bold shadow-sm hover:opacity-95 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Browse Academy Courses</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {filteredCourses.map((enrollment: any) => {
              const course = enrollment.course;
              if (!course) return null;

              const progress = Math.round(enrollment.progressPercentage || 0);
              const isCompleted = enrollment.isCompleted || progress >= 100;
              const imgUrl = getCourseImage(course);
              const totalModules = enrollment.totalModules || (course.curriculum?.reduce((acc: number, sec: any) => acc + (sec.lessons?.length || 0), 0) || 0);
              const completedModules = isCompleted ? totalModules : (enrollment.completedModules || 0);

              return (
                <div
                  key={enrollment._id}
                  className="bg-white border border-border/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Thumbnail Image Container */}
                    <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-navy/5">
                      <img
                        src={imgUrl}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/15 to-transparent" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm ${
                          isCompleted 
                            ? "bg-emerald-600 text-white" 
                            : "bg-white/95 text-navy border border-border/60"
                        }`}>
                          {isCompleted ? "Completed" : "In Progress"}
                        </span>

                        {totalModules > 0 && (
                          <span className="px-2 py-0.5 bg-navy/80 backdrop-blur-sm text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">
                            {completedModules}/{totalModules} Modules
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Course Category & Title */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] uppercase font-bold text-primary tracking-wider">
                        {course.category?.name || "Vastu Course"}
                      </span>
                    </div>

                    <h2 className="font-serif text-base font-bold text-navy leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {course.title}
                    </h2>
                    
                    {/* Progress Bar & Details */}
                    <div className="mt-4 pt-3 border-t border-border/40">
                      <div className="flex justify-between items-center text-[10px] font-bold mb-1.5">
                        <span className="text-muted-foreground uppercase tracking-wider">Classroom Completion</span>
                        <span className="text-primary">{progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#FAF6F0] rounded-full overflow-hidden border border-border/40">
                        <div className="h-full bg-gold-gradient rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Footer Action Links */}
                  <div className="mt-5 pt-3.5 border-t border-border/60 flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground font-normal flex items-center gap-1.5">
                      <PlayCircle className="w-3.5 h-3.5 text-primary" />
                      {isCompleted ? "Review" : "Continue"}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      {isCompleted && (
                        <Link
                          href="/dashboard/certificates"
                          className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl border border-emerald-200 transition-colors"
                          title="View Certificate"
                        >
                          <Award className="w-4 h-4" />
                        </Link>
                      )}

                      <Link
                        href={`/dashboard/courses/${course.slug}`}
                        className="flex items-center gap-1.5 text-xs font-bold text-white bg-navy hover:bg-navy-light px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
                      >
                        <span>{isCompleted ? "Review Syllabus" : "Resume Learning"}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-primary" />
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
