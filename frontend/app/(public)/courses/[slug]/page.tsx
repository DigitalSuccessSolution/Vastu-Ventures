"use client";

import React, { use, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/store";
import {
  Star,
  Clock,
  BookOpen,
  CheckCircle,
  ShieldCheck,
  ArrowLeft,
  Award,
  ThumbsUp,
  Play,
  FileText,
  Video
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function CourseDetailsPage({ params }: Props) {
  const { slug } = use(params);
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [purchaseDetails, setPurchaseDetails] = useState({ name: "", email: "", phone: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated, token } = useAuthStore();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!purchaseDetails.name || !purchaseDetails.email || !purchaseDetails.phone) {
      alert("Please fill all details to proceed.");
      return;
    }
    
    setIsProcessing(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      
      if (!token) {
        alert("Authentication required. Please log in.");
        router.push(`/login?redirect=/courses/${slug}`);
        return;
      }

      // 2. Create Razorpay Order
      const orderRes = await fetch(`${apiUrl}/payments/create-order`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          orderType: "course",
          courseId: course._id
        })
      });
      const orderData = await orderRes.json();
      
      if (!orderData.success) {
        throw new Error(orderData.message || "Failed to create order");
      }
      
      const { razorpayOrderId, amount, currency, keyId } = orderData.data;

      // 3. Load script
      const res = await loadRazorpayScript();
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        setIsProcessing(false);
        return;
      }

      // 4. Open Razorpay UI
      const options = {
        key: keyId || "test_key", // Will fail gracefully if no real key is set yet
        amount: amount,
        currency: currency,
        name: "Vastu Ventures",
        description: `Enroll in ${course.title}`,
        image: "/logo.png", // Path to our logo
        order_id: razorpayOrderId,
        handler: async function (response: any) {
          try {
            // 5. Verify payment
            const verifyRes = await fetch(`${apiUrl}/payments/verify`, {
              method: "POST",
              headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature
              })
            });
            const verifyData = await verifyRes.json();
            
            if (verifyData.success) {
              alert("Payment successful! You are now enrolled in the course.");
              setShowBuyModal(false);
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            console.error(err);
            alert("An error occurred during verification.");
          }
        },
        prefill: {
          name: purchaseDetails.name,
          email: purchaseDetails.email,
          contact: purchaseDetails.phone,
        },
        theme: {
          color: "#0F1A2C", // Navy color matching our theme
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on('payment.failed', function (response: any) {
        alert("Payment failed: " + response.error.description);
      });
      paymentObject.open();

    } catch (error: any) {
      console.error(error);
      alert(error.message || "An unexpected error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadPdf = async (url: string, filename: string) => {
    // Get the clean original file URL by removing fl_attachment if present
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
      console.error("Direct download failed, opening URL instead:", err);
      window.open(cleanUrl, "_blank");
    }
  };

  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    if (showBuyModal) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [showBuyModal]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/courses/${slug}`);
        const data = await res.json();
        if (data.success) {
          setCourse(data.data);
        }
      } catch (err) {
        console.error("Error fetching course details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [slug]);

  useEffect(() => {
    if (typeof window !== 'undefined' && isAuthenticated && user) {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('checkout') === 'true') {
        setPurchaseDetails({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || ""
        });
        setShowBuyModal(true);
        // Remove checkout param from URL without reloading
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      }
    }
  }, [isAuthenticated, user]);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: premiumEase }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-background">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-navy-light font-medium">Loading course syllabus details...</p>
      </div>
    );
  }

  if (!course) {
    notFound();
  }

  const discountPercent = course.originalPrice > 0
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;



  // Helper to extract YouTube video ID from URL
  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const courseCategoryName = course.category?.name || course.category || "Foundational";
  const courseImage = course.thumbnail?.url || course.image || "";

  const tabs = ["overview", "curriculum", "demo videos"];

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
              {courseCategoryName}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-tight text-white mt-1">
              {course.title}
            </h1>

            {/* Quick Ratings & Review Counts */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 mt-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="font-bold text-white">{(course.averageRating || course.rating || 4.8)}</span>
                <span className="opacity-75">({course.reviewsCount || 120} reviews)</span>
              </div>
              {course.duration && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{course.duration}</span>
                  </div>
                </>
              )}
              {((course.lessonsCount || course.totalLessons || 0) > 0) && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span>{course.lessonsCount || course.totalLessons} lectures</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout (Grid) */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Content Column (Left - 8 columns) */}
          <div className="lg:col-span-8 flex flex-col gap-8 min-w-0 lg:pr-16">
            {/* Custom Premium Tabs Navigation */}
            <div className="flex border-b border-border/80 sticky top-0 bg-background/95 backdrop-blur-md z-10 py-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-navy"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "overview" && (
              <div className="flex flex-col gap-8 animate-fade-in-up text-left px-1">
                <style dangerouslySetInnerHTML={{
                  __html: `
                  .html-content h1 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-top: 1.5rem;
                    margin-bottom: 0.5rem;
                    color: #0F1A2C;
                  }
                  .html-content h2 {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-top: 1.5rem;
                    margin-bottom: 0.75rem;
                    color: #0F1A2C;
                  }
                  .html-content h3 {
                    font-size: 1.1rem;
                    font-weight: 700;
                    margin-top: 1.2rem;
                    margin-bottom: 0.6rem;
                    color: #0F1A2C;
                  }
                  .html-content ul {
                    list-style-type: disc;
                    padding-left: 1.5rem;
                    margin-top: 0.75rem;
                    margin-bottom: 0.75rem;
                  }
                  .html-content ol {
                    list-style-type: decimal;
                    padding-left: 1.5rem;
                    margin-top: 0.75rem;
                    margin-bottom: 0.75rem;
                  }
                  .html-content p {
                    margin-bottom: 0.75rem;
                    line-height: 1.5;
                    font-weight: 400;
                  }
                ` }} />
                {course.description && course.description.replace(/<[^>]*>/g, "").trim().length > 0 ? (
                  <div
                    className="html-content text-navy text-sm sm:text-base font-normal leading-normal whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: course.description }}
                  />
                ) : (
                  <p className="text-navy-light text-sm sm:text-base font-normal leading-normal whitespace-pre-line">
                    Detailed course description and learning objectives are currently being finalized by the academy. Please check back shortly!
                  </p>
                )}
              </div>
            )}

            {activeTab === "curriculum" && (
              <div className="flex flex-col gap-6 animate-fade-in-up">
                {/* Lecture Videos list looping through course.curriculum */}
                <div className="flex flex-col gap-4">
                  {course.curriculum && course.curriculum.length > 0 ? (
                    course.curriculum.map((section: any, secIdx: number) => (
                      <div key={secIdx} className="flex flex-col gap-3">
                        <h3 className="text-xs uppercase font-bold text-muted-foreground tracking-wider pl-1 mt-4 text-left">
                          {section.sectionTitle}
                        </h3>

                        {(section.lessons || []).map((lesson: any, lesIdx: number) => {
                          const numPrefix = String(secIdx * 3 + lesIdx + 1).padStart(2, "0");
                          const isPdf = lesson.contentType === "pdf";
                          const expandedKey = `${secIdx}-${lesIdx}`;

                          if (isPdf) {
                            const fileUrl = lesson.fileUrl || "";

                            return (
                              <div
                                key={lesIdx}
                                className="bg-white border border-border rounded-2xl overflow-hidden shadow-premium hover:border-primary/20 transition-all duration-300"
                              >
                                {/* Lesson header row */}
                                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                  <div className="flex items-center gap-4">
                                    {/* PDF Icon box */}
                                    <div className="w-12 h-12 rounded-xl bg-navy/5 text-navy border border-navy/10 flex items-center justify-center flex-shrink-0">
                                      <FileText className="w-5 h-5" />
                                    </div>

                                    <div className="text-left">
                                      <h4 className="text-sm font-semibold text-navy leading-snug">
                                        {numPrefix}. {lesson.title}
                                      </h4>
                                      <p className="text-[10px] text-muted-foreground mt-0.5 font-light flex items-center gap-2">
                                        <span className="uppercase text-[9px] font-bold text-navy bg-navy/5 border border-navy/10 px-1.5 py-0.5 rounded">
                                          PDF Document
                                        </span>
                                        {lesson.fileName && <span className="truncate max-w-[120px] sm:max-w-xs">{lesson.fileName}</span>}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                                    {fileUrl && (
                                      <button
                                        type="button"
                                        onClick={() => handleDownloadPdf(fileUrl, lesson.fileName || `${lesson.title.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`)}
                                        className="px-5 py-2 bg-navy hover:bg-navy-light text-white text-center rounded-lg text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                      >
                                        <FileText className="w-3.5 h-3.5" />
                                        Download PDF
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          }

                          // YouTube Item Layout
                          const videoUrl = lesson.videoUrl || "";
                          const youtubeId = videoUrl ? getYoutubeId(videoUrl) : null;

                          return (
                            <div
                              key={lesIdx}
                              className="bg-white border border-border rounded-2xl overflow-hidden shadow-premium hover:border-primary/20 transition-all duration-300"
                            >
                              {/* Lesson header row */}
                              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                  {/* Left Icon box */}
                                  <div className="w-12 h-12 rounded-xl bg-navy/5 text-navy border border-navy/10 flex items-center justify-center flex-shrink-0">
                                    <Play className="w-5 h-5 fill-current ml-0.5" />
                                  </div>

                                  <div className="text-left">
                                    <h4 className="text-sm font-semibold text-navy leading-snug">
                                      {numPrefix}. {lesson.title}
                                    </h4>
                                    <p className="text-[10px] text-muted-foreground mt-0.5 font-light flex items-center gap-2">
                                      <span className="uppercase text-[9px] font-bold text-navy bg-navy/5 border border-navy/10 px-1.5 py-0.5 rounded">
                                        YouTube Video
                                      </span>
                                    </p>
                                  </div>
                                </div>

                                {youtubeId && (
                                  <button
                                    type="button"
                                    onClick={() => setExpandedLesson(prev => prev === expandedKey ? null : expandedKey)}
                                    className="px-5 py-2 bg-navy hover:bg-navy-light text-white text-center rounded-lg text-xs sm:text-sm font-bold shadow-sm transition-all sm:self-center w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer"
                                  >
                                    <Play className="w-3.5 h-3.5 fill-current" />
                                    {expandedLesson === expandedKey ? "Close" : "Play Video"}
                                  </button>
                                )}
                              </div>

                              {/* Inline YouTube embed — expands when Play is clicked */}
                              {youtubeId && expandedLesson === expandedKey && (
                                <div className="border-t border-border">
                                  <div className="relative aspect-video w-full bg-black">
                                    <iframe
                                      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                                      title={lesson.title}
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                      className="w-full h-full absolute inset-0"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))
                  ) : (
                    <div className="bg-white border border-border rounded-2xl p-6 shadow-premium">
                      <p className="text-navy-light text-sm font-light leading-relaxed">
                        Interactive curriculum sections and syllabus chapters are currently being structured. Check back soon to explore the full course outline!
                      </p>
                    </div>
                  )}
                </div>

              </div>
            )}

            {activeTab === "demo videos" && (
              <div className="flex flex-col gap-6 animate-fade-in-up text-left">
                <div className="flex flex-col gap-4">
                  {(course.demoVideos && course.demoVideos.length > 0) ? (
                    course.demoVideos.map((video: any, idx: number) => {
                      const numPrefix = String(idx + 1).padStart(2, "0");
                      const youtubeId = video.videoUrl ? getYoutubeId(video.videoUrl) : null;
                      const expandedKey = `demo-${idx}`;

                      return (
                        <div
                          key={idx}
                          className="bg-white border border-border rounded-2xl overflow-hidden shadow-premium hover:border-primary/20 transition-all duration-300"
                        >
                          {/* Video Header Row */}
                          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-navy/5 text-navy border border-navy/10 flex items-center justify-center flex-shrink-0">
                                <Play className="w-5 h-5 fill-current ml-0.5" />
                              </div>
                              <div className="text-left">
                                <h4 className="text-sm font-semibold text-navy leading-snug">
                                  Demo {numPrefix}: {video.title || "Introductory Video"}
                                </h4>
                                <p className="text-[10px] text-muted-foreground mt-0.5 font-light">
                                  Free Course Preview Video
                                </p>
                              </div>
                            </div>

                            {youtubeId && (
                              <button
                                type="button"
                                onClick={() => setExpandedLesson(prev => prev === expandedKey ? null : expandedKey)}
                                className="px-5 py-2 bg-navy hover:bg-navy-light text-white text-center rounded-lg text-xs sm:text-sm font-bold shadow-sm transition-all sm:self-center w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer"
                              >
                                <Play className="w-3.5 h-3.5 fill-current" />
                                {expandedLesson === expandedKey ? "Close Preview" : "Play Preview"}
                              </button>
                            )}
                          </div>

                          {/* YouTube Embed Player */}
                          {youtubeId && expandedLesson === expandedKey && (
                            <div className="border-t border-border">
                              <div className="relative aspect-video w-full bg-black">
                                <iframe
                                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                                  title={video.title || "Demo Video"}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  className="w-full h-full absolute inset-0"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : course.demoVideoUrl ? (
                    // Fallback to single legacy demoVideoUrl if multiple videos aren't present
                    <div className="bg-white border border-border rounded-2xl p-6 shadow-premium">
                      <h3 className="font-serif text-lg font-bold text-navy mb-4">Course Preview Demo Video</h3>
                      {getYoutubeId(course.demoVideoUrl) ? (
                        <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm border border-border bg-black">
                          <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${getYoutubeId(course.demoVideoUrl)}?autoplay=0`}
                            title="Demo Video Preview"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm border border-border bg-black">
                          <video
                            src={course.demoVideoUrl}
                            controls
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-white border border-border rounded-2xl p-6 shadow-premium">
                      <p className="text-navy-light text-sm font-light leading-relaxed">
                        The demo video for this course is currently being prepared. Please check back shortly!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Buy Card Column (Right - 4 columns) */}
          <div className="lg:col-span-4 lg:-mt-48 sticky top-24 z-30">
            <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-premium text-left flex flex-col p-5 gap-5">

              {/* Course Preview Image */}
              {courseImage ? (
                <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-sm">
                  <img
                    src={courseImage}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-48 rounded-xl bg-gradient-to-br from-[#F5EFE6] to-[#E8D5B7] flex items-center justify-center border border-border">
                  <span className="text-4xl opacity-25">🏛️</span>
                </div>
              )}

              {/* Likes and Price Details */}
              <div className="flex flex-col gap-4">

                {/* Price and Likes header */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-semibold">Tuition Fee</span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-2xl font-extrabold text-navy">₹{course.price}</span>
                      {course.originalPrice > 0 && (
                        <span className="text-xs sm:text-sm text-muted-foreground line-through">₹{course.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    {/* Discount badge */}
                    {discountPercent > 0 && (
                      <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-200/50 rounded-lg text-xs font-bold">
                        {discountPercent}% off
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2.5 mt-4">
                  <button
                    onClick={() => {
                      if (isAuthenticated && user) {
                        setPurchaseDetails({
                          name: user.name || "",
                          email: user.email || "",
                          phone: user.phone || ""
                        });
                        setShowBuyModal(true);
                      } else {
                        router.push(`/login?redirect=${encodeURIComponent(`/courses/${slug}?checkout=true`)}`);
                      }
                    }}
                    className="w-full py-3.5 bg-navy hover:bg-navy-light text-white text-xs sm:text-sm font-bold rounded-xl shadow-premium hover:shadow-premium-lg transition-all cursor-pointer text-center"
                  >
                    Buy Now
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </motion.div>

      {/* Purchase Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2rem] p-6 sm:p-8 max-w-md w-full shadow-2xl relative"
          >
            <button
              onClick={() => setShowBuyModal(false)}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-serif font-bold text-navy mb-1">Enroll in Course</h2>
            <p className="text-sm text-navy-light mb-6">Enter your details to secure your spot.</p>
            
            <div className="bg-[#FAF6F0] p-5 rounded-2xl mb-6 border border-[#E5E0D8]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-navy-light font-medium">Course</span>
                <span className="text-sm font-bold text-navy max-w-[200px] truncate" title={course.title}>{course.title}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#E5E0D8]/60 mt-2">
                <span className="text-sm text-navy-light font-medium">Total Price</span>
                <div className="flex items-center gap-2">
                  {course.originalPrice > course.price && (
                    <span className="text-xs text-muted-foreground line-through">₹{course.originalPrice}</span>
                  )}
                  <span className="text-lg font-bold text-[#E28A3E]">₹{course.price}</span>
                  {discountPercent > 0 && (
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-200/50 rounded-lg text-xs font-bold ml-1">
                      {discountPercent}% off
                    </span>
                  )}
                </div>
              </div>
            </div>

             <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy-light/70 mb-1.5 tracking-wider uppercase">Full Name</label>
                <input
                  type="text"
                  value={purchaseDetails.name}
                  onChange={(e) => setPurchaseDetails({...purchaseDetails, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-[#E5E0D8] rounded-xl text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors placeholder:text-gray-400"
                  placeholder="E.g. Dheeraj Patidar"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-light/70 mb-1.5 tracking-wider uppercase">Email Address</label>
                <input
                  type="email"
                  value={purchaseDetails.email}
                  disabled
                  className="w-full px-4 py-3 bg-gray-50 text-gray-500 border border-[#E5E0D8] rounded-xl text-sm cursor-not-allowed"
                  placeholder="E.g. dheeraj@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-light/70 mb-1.5 tracking-wider uppercase">Phone Number</label>
                <input
                  type="tel"
                  value={purchaseDetails.phone}
                  onChange={(e) => setPurchaseDetails({...purchaseDetails, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-[#E5E0D8] rounded-xl text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors placeholder:text-gray-400"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
              
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className={`w-full py-3.5 mt-2 bg-navy hover:bg-navy-light text-white text-sm font-bold rounded-xl shadow-premium transition-all flex justify-center items-center gap-2 group ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" /> 
                )}
                {isProcessing ? "Processing..." : "Proceed to Pay"}
              </button>
          </motion.div>
        </div>
      )}

    </div>
  );
}
