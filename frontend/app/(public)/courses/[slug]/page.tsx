"use client";

import React, { use, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { notFound } from "next/navigation";
import Link from "next/link";
import { COURSES } from "@/data/mockData";
import CourseCurriculum from "@/components/CourseCurriculum";
import { 
  Star, 
  Clock, 
  BookOpen, 
  CheckCircle, 
  ShieldCheck, 
  ArrowLeft, 
  Award, 
  ThumbsUp, 
  ChevronRight, 
  ChevronDown,
  Play,
  FileText,
  Video
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function CourseDetailsPage({ params }: Props) {
  const { slug } = use(params);
  const course = COURSES.find((c) => c.slug === slug);
  const [activeTab, setActiveTab] = useState("overview");

  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.16, 1, 0.3, 1] as const;

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: premiumEase }
    }
  };

  if (!course) {
    notFound();
  }

  const discountPercent = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  const getLikesCount = (id: string) => {
    switch (id) {
      case "c1": return "551";
      case "c2": return "1.9K";
      case "c3": return "820";
      case "c4": return "430";
      case "c5": return "1.2K";
      default: return "310";
    }
  };

  return (
    <div className="bg-background vastu-mandala-bg min-h-screen pb-16">
      
      {/* Premium Hero Banner */}
      <section className="relative py-12 md:py-16 bg-navy text-white overflow-hidden border-b border-border">
        {/* Background Image with subtle overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/image.png"
            alt="Course Details Background"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/80 to-navy" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left animate-fade-in-up">
          {/* Back Navigation Link */}
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" /> 
            <span>Back to all courses</span>
          </Link>

          {/* Banner Contents */}
          <div className="max-w-3xl flex flex-col gap-4">
            <span className="px-3 py-1 bg-white/10 text-primary border border-white/10 rounded-lg text-[10px] uppercase font-bold tracking-wider w-max">
              {course.category} Certification
            </span>
            
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-tight text-white mt-1">
              {course.title}
            </h1>

            {/* Quick Ratings & Review Counts */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 mt-2">
              <div className="flex items-center gap-1">
                <div className="flex items-center text-gold-start">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="font-bold text-white">{course.rating} Rating</span>
                <span className="text-white/60">({course.reviewsCount} verified reviews)</span>
              </div>
              <span className="text-white/30">•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-primary" /> {course.duration}
              </span>
              <span className="text-white/30">•</span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4 text-primary" /> {course.lessonsCount} Lectures
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout Content Area */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Details Block (Left - 8 columns) */}
          <div className="lg:col-span-8 flex flex-col gap-8 text-left">
            
            {/* Tabs Bar */}
            <div className="border-b border-border flex gap-6 sm:gap-10 overflow-x-auto whitespace-nowrap">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-4 text-sm font-semibold transition-all cursor-pointer border-b-2 ${
                  activeTab === "overview"
                    ? "border-primary text-primary font-bold"
                    : "border-transparent text-navy-light hover:text-navy"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("curriculum")}
                className={`pb-4 text-sm font-semibold transition-all cursor-pointer border-b-2 ${
                  activeTab === "curriculum"
                    ? "border-primary text-primary font-bold"
                    : "border-transparent text-navy-light hover:text-navy"
                }`}
              >
                Curriculum Content
              </button>
              <button
                onClick={() => setActiveTab("demo")}
                className={`pb-4 text-sm font-semibold transition-all cursor-pointer border-b-2 ${
                  activeTab === "demo"
                    ? "border-primary text-primary font-bold"
                    : "border-transparent text-navy-light hover:text-navy"
                }`}
              >
                Demo Videos
              </button>
            </div>

            {/* Tab Rendering Logic */}
            {activeTab === "overview" && (
              <div className="flex flex-col gap-8 animate-fade-in-up">
                
                {/* Description */}
                <div>
                  <h2 className="font-serif text-xl font-semibold text-navy mb-3">Course Description</h2>
                  <p className="text-sm sm:text-base text-navy-light leading-relaxed font-light whitespace-pre-line">
                    {course.description}
                  </p>
                </div>

              </div>
            )}

            {activeTab === "curriculum" && (
              <div className="flex flex-col gap-6 animate-fade-in-up">
                
                {/* Search Bar */}
                <div className="flex gap-2 max-w-sm ml-auto w-full mb-2">
                  <input
                    type="text"
                    placeholder="Search lectures..."
                    className="flex-grow text-sm px-4 py-2 border border-border bg-white rounded-xl outline-none focus:border-primary/50"
                  />
                  <button className="px-4 py-2 bg-primary text-white text-xs sm:text-sm font-bold rounded-xl shadow-premium hover:bg-navy-light transition-all">
                    Search
                  </button>
                </div>

                {/* PDF Syllabus Download Item */}
                <div className="bg-white border border-border rounded-2xl p-4 flex items-center justify-between shadow-premium hover:border-primary/20 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-navy leading-snug">
                        {course.title} - Live Course Syllabus PDF
                      </h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5 font-light">Created on: 12 July 2026</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs sm:text-sm font-bold transition-all shadow-premium">
                    Download
                  </button>
                </div>

                {/* Folder/Reference Materials Item */}
                <div className="bg-white border border-border rounded-2xl p-4 flex items-center shadow-premium hover:border-primary/20 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-navy leading-snug">
                        Course Reference Materials & Checklist Guides
                      </h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5 font-light flex items-center gap-2">
                        <span>📁 8 Folders</span>
                        <span>•</span>
                        <span>📄 14 files</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Lecture Videos list looping through course.curriculum */}
                <div className="flex flex-col gap-4">
                  {course.curriculum.map((section, secIdx) => (
                    <div key={secIdx} className="flex flex-col gap-3">
                      <h3 className="text-xs uppercase font-bold text-muted-foreground tracking-wider pl-1 mt-4">
                        {section.sectionTitle}
                      </h3>
                      
                      {section.lessons.map((lesson, lesIdx) => {
                        const numPrefix = String(secIdx * 3 + lesIdx + 1).padStart(2, "0");
                        return (
                          <div 
                            key={lesIdx}
                            className="bg-white border border-border rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-premium hover:border-primary/20 transition-all duration-300"
                          >
                            <div className="flex items-center gap-4">
                              {/* Left Icon box */}
                              <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary border border-blue-100 flex items-center justify-center flex-shrink-0">
                                <Play className="w-5 h-5 fill-current text-primary ml-0.5" />
                              </div>
                              
                              <div className="text-left">
                                <h4 className="text-sm font-semibold text-navy leading-snug">
                                  {numPrefix}. {lesson.title}
                                </h4>
                                <p className="text-[10px] text-muted-foreground mt-0.5 font-light flex items-center gap-2">
                                  <span>Created on: 12 July 2026</span>
                                  <span>•</span>
                                  <span>⏱ {lesson.duration}</span>
                                </p>
                              </div>
                            </div>

                            <button 
                              onClick={() => alert(`Launching Lecture Preview Video: "${lesson.title}"...`)}
                              className="px-5 py-2 bg-navy hover:bg-navy-light text-white rounded-lg text-xs sm:text-sm font-bold shadow-premium transition-all sm:self-center w-full sm:w-auto"
                            >
                              Watch
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

              </div>
            )}

            {activeTab === "demo" && (
              <div className="flex flex-col gap-5 animate-fade-in-up">
                
                {/* 1. Live Advance Course Intro */}
                <div className="bg-white border border-border rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-premium hover:border-primary/20 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-16 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-border relative">
                      <img src={course.image} alt="Demo 1" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-left flex flex-col gap-1">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 text-[9px] font-bold w-max">
                        <Video className="w-3 h-3" /> Video
                      </span>
                      <h4 className="text-sm font-semibold text-navy leading-snug">
                        1. Live Advance Vastu (Overview, Syllabus, Interface, Scope, Settings)
                      </h4>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert("Launching Video Lecture Preview...")}
                    className="px-5 py-2.5 bg-navy hover:bg-navy-light text-white rounded-xl text-xs sm:text-sm font-bold shadow-premium transition-all sm:self-center shrink-0 cursor-pointer"
                  >
                    Watch
                  </button>
                </div>

                {/* 2. What Students Saying */}
                <div className="bg-white border border-border rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-premium hover:border-primary/20 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-16 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-border relative">
                      <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=200" alt="Demo 2" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-left flex flex-col gap-1">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 text-[9px] font-bold w-max">
                        <Video className="w-3 h-3" /> Video
                      </span>
                      <h4 className="text-sm font-semibold text-navy leading-snug">
                        What Students Are Saying About Us ⭐⭐⭐⭐⭐
                      </h4>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert("Launching Student Feedback Preview Video...")}
                    className="px-5 py-2.5 bg-navy hover:bg-navy-light text-white rounded-xl text-xs sm:text-sm font-bold shadow-premium transition-all sm:self-center shrink-0 cursor-pointer"
                  >
                    Watch
                  </button>
                </div>

                {/* 3. Syllabus PDF preview */}
                <div className="bg-white border border-border rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-premium hover:border-primary/20 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-16 rounded-xl bg-slate-100 flex-shrink-0 border border-border flex items-center justify-center">
                      <FileText className="w-6 h-6 text-muted-foreground/60" />
                    </div>
                    <div className="text-left flex flex-col gap-1">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-100 text-[9px] font-bold w-max">
                        <FileText className="w-3 h-3" /> PDF
                      </span>
                      <h4 className="text-sm font-semibold text-navy leading-snug">
                        {course.title} Syllabus Guide
                      </h4>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert("Opening PDF Document Preview...")}
                    className="px-5 py-2.5 bg-navy hover:bg-navy-light text-white rounded-xl text-xs sm:text-sm font-bold shadow-premium transition-all sm:self-center shrink-0 cursor-pointer"
                  >
                    View PDF
                  </button>
                </div>

                {/* 4. Day-2 Lecture */}
                <div className="bg-white border border-border rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-premium hover:border-primary/20 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-16 rounded-xl bg-slate-100 flex-shrink-0 border border-border flex items-center justify-center">
                      <FileText className="w-6 h-6 text-muted-foreground/60" />
                    </div>
                    <div className="text-left flex flex-col gap-1">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 text-[9px] font-bold w-max">
                        <Video className="w-3 h-3" /> Video
                      </span>
                      <h4 className="text-sm font-semibold text-navy leading-snug">
                        Day-2 Lecture Preview
                      </h4>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert("Launching Day-2 Lecture Preview...")}
                    className="px-5 py-2.5 bg-navy hover:bg-navy-light text-white rounded-xl text-xs sm:text-sm font-bold shadow-premium transition-all sm:self-center shrink-0 cursor-pointer"
                  >
                    Watch
                  </button>
                </div>

                {/* 5. Key Principles */}
                <div className="bg-white border border-border rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-premium hover:border-primary/20 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-16 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-border relative">
                      <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=200" alt="Demo 5" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-left flex flex-col gap-1">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 text-[9px] font-bold w-max">
                        <Video className="w-3 h-3" /> Video
                      </span>
                      <h4 className="text-sm font-semibold text-navy leading-snug">
                        01. Key Principles of Spatial Balancing
                      </h4>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert("Launching Key Principles Preview Video...")}
                    className="px-5 py-2.5 bg-navy hover:bg-navy-light text-white rounded-xl text-xs sm:text-sm font-bold shadow-premium transition-all sm:self-center shrink-0 cursor-pointer"
                  >
                    Watch
                  </button>
                </div>

                {/* Center statement footer */}
                <p className="text-xs text-muted-foreground text-center mt-6 font-light">
                  You've seen all demo videos
                </p>

              </div>
            )}
          </div>

          {/* Sticky Buy Card Column (Right - 4 columns) */}
          <div className="lg:col-span-4 lg:-mt-48 sticky top-24 z-30">
            <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-premium text-left flex flex-col p-5 gap-5">
              
              {/* Course Preview Image */}
              <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-sm">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Likes and Price Details */}
              <div className="flex flex-col gap-4">
                
                {/* Price and Likes header */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-semibold">Tuition Fee</span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-2xl font-extrabold text-navy">₹{course.price}</span>
                      <span className="text-xs sm:text-sm text-muted-foreground line-through">₹{course.originalPrice}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    {/* Thumbs up count */}
                    <div className="flex items-center gap-1 text-navy-light font-bold text-xs sm:text-sm bg-background-alt px-2.5 py-1 rounded-lg border border-border/40">
                      <ThumbsUp className="w-3.5 h-3.5 text-navy-light" />
                      <span>{getLikesCount(course.id)} Likes</span>
                    </div>
                    {/* Discount badge */}
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-200/50 rounded-lg text-xs font-bold">
                      {discountPercent}% off
                    </span>
                  </div>
                </div>

                {/* Choose Currency Selector */}
                <div>
                  <label className="text-xs uppercase font-bold tracking-wider text-muted-foreground block mb-1.5">
                    Choose Currency
                  </label>
                  <div className="relative">
                    <select className="w-full text-sm font-semibold text-navy bg-background-alt border border-border px-3 py-2.5 rounded-xl outline-none focus:border-primary/50 cursor-pointer appearance-none">
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                {/* Purchase CTA Buttons */}
                <div className="flex flex-col gap-2.5 mt-2">
                  <button
                    onClick={() => alert("Redirecting to secure payment portal...")}
                    className="w-full py-3.5 bg-navy hover:bg-navy-light text-white text-xs sm:text-sm font-bold rounded-xl shadow-premium hover:shadow-premium-lg transition-all cursor-pointer text-center"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => alert("Redirecting to installment setup options...")}
                    className="w-full py-3.5 border border-border bg-white text-navy hover:bg-background-alt text-xs sm:text-sm font-bold rounded-xl shadow-premium transition-all cursor-pointer text-center"
                  >
                    Buy with Installment
                  </button>
                </div>



              </div>

            </div>
          </div>

        </div>
      </motion.div>

    </div>
  );
}
