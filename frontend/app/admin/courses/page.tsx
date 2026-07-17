"use client";

import React, { useState, useEffect } from "react";
import {
  Plus, Edit, Trash2, Upload, FileText, Video, Play,
  Image as ImageIcon, Link as LinkIcon, Trash, BookOpen, X, ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";

interface CurriculumItem {
  id: string;
  title: string;
  contentType: "pdf" | "youtube" | "video_upload";
  youtubeUrl?: string;
  fileName?: string;
  file?: File | null;
  loading?: boolean;
}

interface DemoVideoItem {
  id: string;
  title: string;
  videoUrl: string;
}
export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  // Delete confirm modal state
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: "",
    type: "course" as "course" | "category" | "demo_video" | "curriculum",
    title: "",
    message: "",
    isLoading: false,
    error: null as string | null
  });

  // File uploading states
  const [imageUploading, setImageUploading] = useState(false);
  const [demoVideoUploading, setDemoVideoUploading] = useState(false);

  // State for Course Form & Modal Toggle
  const [courseModal, setCourseModal] = useState<{ open: boolean; mode: "add" | "edit"; id?: string }>({ open: false, mode: "add" });

  const [categories, setCategories] = useState<any[]>([]);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const [courseForm, setCourseForm] = useState({
    title: "",
    category: "",
    overview: "",
    lessonsCount: 0,
    duration: 0,
    price: 0,
    originalPrice: 0,
    imageFile: null as File | null,
    imagePreview: "",

    // Multiple demo videos list builder
    demoVideos: [] as DemoVideoItem[],

    // Curriculum dynamic builder list
    curriculum: [] as CurriculumItem[]
  });

  // Fetch courses from backend API
  const fetchCourses = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/courses/admin/list`);
      const data = await res.json();
      if (data.success) {
        setCourses(data.data);
      }
    } catch (err) {
      console.error("Error fetching courses from database:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/courses/admin/categories/list`);
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/courses/admin/categories/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName.trim(), description: `${newCategoryName.trim()} category` })
      });
      const data = await res.json();
      if (data.success) {
        setNewCategoryName("");
        fetchCategories();
      } else {
        alert(data.message || "Failed to create category");
      }
    } catch (err) {
      console.error("Error creating category:", err);
    }
  };

  const openDeleteConfirm = (id: string, type: "course" | "category" | "demo_video" | "curriculum", name?: string) => {
    let title = "Delete Category";
    let message = "Are you sure you want to delete this category?";
    
    if (type === "course") {
      title = "Delete Course";
      message = `Are you sure you want to delete the course "${name || 'this course'}"? This action cannot be undone.`;
    } else if (type === "demo_video") {
      title = "Remove Demo Video";
      message = `Are you sure you want to remove the demo video "${name || 'this video'}" from the course preview?`;
    } else if (type === "curriculum") {
      title = "Remove Curriculum Item";
      message = `Are you sure you want to remove "${name || 'this lecture'}" from the course syllabus?`;
    } else {
      title = "Delete Category";
      message = `Are you sure you want to delete the category "${name || 'this category'}"? This action cannot be undone.`;
    }

    setDeleteModal({
      isOpen: true,
      id,
      type,
      title,
      message,
      isLoading: false,
      error: null
    });
  };

  const handleConfirmDelete = async () => {
    const { id, type } = deleteModal;

    // Handle local state removals immediately without API call
    if (type === "demo_video") {
      setCourseForm(prev => ({
        ...prev,
        demoVideos: prev.demoVideos.filter(item => item.id !== id)
      }));
      setDeleteModal(prev => ({ ...prev, isOpen: false }));
      return;
    }

    if (type === "curriculum") {
      setCourseForm(prev => ({
        ...prev,
        curriculum: prev.curriculum.filter(item => item.id !== id)
      }));
      setDeleteModal(prev => ({ ...prev, isOpen: false }));
      return;
    }

    setDeleteModal(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      if (type === "course") {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/courses/admin/${id}`, {
          method: "DELETE"
        });
        const data = await res.json();
        if (data.success) {
          fetchCourses();
          setDeleteModal(prev => ({ ...prev, isOpen: false }));
        } else {
          setDeleteModal(prev => ({ ...prev, error: data.message, isLoading: false }));
        }
      } else if (type === "category") {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/courses/admin/categories/${id}`, {
          method: "DELETE"
        });
        const data = await res.json();
        if (data.success) {
          fetchCategories();
          fetchCourses();
          if (courseForm.category === id) {
            setCourseForm(prev => ({ ...prev, category: "" }));
          }
          setDeleteModal(prev => ({ ...prev, isOpen: false }));
        } else {
          setDeleteModal(prev => ({ ...prev, error: data.message || "Failed to delete category.", isLoading: false }));
        }
      }
    } catch (err: any) {
      setDeleteModal(prev => ({ ...prev, error: err.message || "An error occurred during deletion.", isLoading: false }));
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchCourses();
      fetchCategories();
    }
  }, [mounted]);

  // Lock background scroll when Course Category modal is open
  useEffect(() => {
    if (showCategoryManager) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showCategoryManager]);

  // Calculate discount percentage
  const discountPercent = courseForm.originalPrice > 0
    ? Math.round(((courseForm.originalPrice - courseForm.price) / courseForm.originalPrice) * 100)
    : 0;

  const handleOpenAddCourse = () => {
    setCourseForm({
      title: "",
      category: "",
      overview: "",
      lessonsCount: 0,
      duration: 0,
      price: 0,
      originalPrice: 0,
      imageFile: null,
      imagePreview: "",
      demoVideos: [],
      curriculum: []
    });
    setCourseModal({ open: true, mode: "add" });
  };

  const handleOpenEditCourse = (id: string) => {
    const c = courses.find(item => item.id === id || item._id === id);
    if (c) {
      console.log("c.curriculum:", JSON.stringify(c.curriculum, null, 2));
      // Map nested curriculum sections to flat CurriculumItem array
      const flatCurriculum: CurriculumItem[] = [];
      if (c.curriculum && c.curriculum.length > 0) {
        c.curriculum.forEach((section: any, secIdx: number) => {
          (section.lessons || []).forEach((lesson: any, lesIdx: number) => {
            flatCurriculum.push({
              id: `cur-${secIdx}-${lesIdx}-${Date.now()}`,
              title: lesson.title || "Untitled Lecture",
              contentType: lesson.contentType || "youtube",
              youtubeUrl: lesson.contentType === "pdf" ? (lesson.fileUrl || "") : (lesson.videoUrl || ""),
              fileName: lesson.fileName || ""
            });
          });
        });
      }

      // Map demoVideos array from DB or fallback to demoVideoUrl
      const flatDemoVideos: DemoVideoItem[] = [];
      if (c.demoVideos && c.demoVideos.length > 0) {
        c.demoVideos.forEach((video: any, idx: number) => {
          flatDemoVideos.push({
            id: `demo-${idx}-${Date.now()}`,
            title: video.title || `Demo Video ${idx + 1}`,
            videoUrl: video.videoUrl || ""
          });
        });
      } else if (c.demoVideoUrl) {
        flatDemoVideos.push({
          id: `demo-0-${Date.now()}`,
          title: "Course Demo Video",
          videoUrl: c.demoVideoUrl
        });
      }

      const desc = c.description || c.shortDescription || "";

      setCourseForm({
        title: c.title,
        category: c.category?._id || c.category || "",
        overview: desc,
        lessonsCount: c.lessonsCount || c.totalLessons || 0,
        duration: parseInt(c.duration) || 0,
        price: c.price,
        originalPrice: c.originalPrice,
        imageFile: null,
        imagePreview: c.thumbnail?.url || c.image || "",
        demoVideos: flatDemoVideos,
        curriculum: flatCurriculum
      });
      setCourseModal({ open: true, mode: "edit", id });
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCourseForm(prev => ({
        ...prev,
        imagePreview: URL.createObjectURL(file)
      }));
      setImageUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/courses/admin/upload`, {
          method: "POST",
          body: formData
        });
        const data = await res.json();
        if (data.success) {
          setCourseForm(prev => ({
            ...prev,
            imagePreview: data.data.url
          }));
        }
      } catch (err) {
        console.error("Image upload failed:", err);
      } finally {
        setImageUploading(false);
      }
    }
  };

  // Add new blank demo video
  const handleAddDemoVideo = () => {
    const newItem: DemoVideoItem = {
      id: `demo-${Date.now()}`,
      title: "",
      videoUrl: ""
    };
    setCourseForm(prev => ({
      ...prev,
      demoVideos: [...prev.demoVideos, newItem]
    }));
  };

  // Remove demo video from list
  const handleRemoveDemoVideo = (id: string) => {
    setCourseForm(prev => ({
      ...prev,
      demoVideos: prev.demoVideos.filter(item => item.id !== id)
    }));
  };

  // Update specific property of demo video item
  const handleUpdateDemoVideo = (id: string, updates: Partial<DemoVideoItem>) => {
    setCourseForm(prev => ({
      ...prev,
      demoVideos: prev.demoVideos.map(item => item.id === id ? { ...item, ...updates } : item)
    }));
  };

  // Add new blank curriculum item
  const handleAddCurriculumItem = () => {
    const newItem: CurriculumItem = {
      id: `cur-${Date.now()}`,
      title: "",
      contentType: "youtube",
      youtubeUrl: "",
      fileName: "",
      file: null
    };
    setCourseForm(prev => ({
      ...prev,
      curriculum: [...prev.curriculum, newItem]
    }));
  };

  // Remove curriculum item from list
  const handleRemoveCurriculumItem = (id: string) => {
    setCourseForm(prev => ({
      ...prev,
      curriculum: prev.curriculum.filter(item => item.id !== id)
    }));
  };

  // Update specific property of curriculum item
  const handleUpdateCurriculumItem = (id: string, updates: Partial<CurriculumItem>) => {
    setCourseForm(prev => ({
      ...prev,
      curriculum: prev.curriculum.map(item => item.id === id ? { ...item, ...updates } : item)
    }));
  };

  // Upload PDF for curriculum item
  const handleCurriculumPdfUpload = async (id: string, file: File) => {
    handleUpdateCurriculumItem(id, { loading: true, fileName: file.name });
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/courses/admin/upload`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        handleUpdateCurriculumItem(id, {
          youtubeUrl: data.data.url,
          fileName: file.name,
          loading: false
        });
      } else {
        alert("Upload failed. Please try again.");
        handleUpdateCurriculumItem(id, { loading: false, fileName: "" });
      }
    } catch (err) {
      console.error("PDF upload failed:", err);
      alert("Error uploading file.");
      handleUpdateCurriculumItem(id, { loading: false, fileName: "" });
    }
  };



  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    const overviewContent = courseForm.overview;

    const formattedCurriculum = [
      {
        sectionTitle: "Course Syllabus Content",
        lessons: courseForm.curriculum.map((item, idx) => ({
          title: item.title || `Chapter ${idx + 1}`,
          contentType: item.contentType || "youtube",
          videoDuration: "45 mins",
          videoUrl: item.contentType === "pdf" ? "" : (item.youtubeUrl || ""),
          fileUrl: item.contentType === "pdf" ? (item.youtubeUrl || "") : "",
          fileName: item.contentType === "pdf" ? (item.fileName || "") : ""
        }))
      }
    ];

    const payload = {
      title: courseForm.title,
      category: courseForm.category,
      description: overviewContent,
      shortDescription: overviewContent.replace(/<[^>]*>/g, "").substring(0, 100) + "...",
      price: courseForm.price,
      originalPrice: courseForm.originalPrice || 0,
      duration: courseForm.duration ? `${courseForm.duration} Hours (Self-paced)` : "",
      totalLessons: courseForm.lessonsCount || 0,
      thumbnail: courseForm.imagePreview ? { url: courseForm.imagePreview, publicId: "" } : { url: "", publicId: "" },
      status: "published",
      isActive: true,
      level: "beginner",
      demoVideoUrl: courseForm.demoVideos[0]?.videoUrl || "",
      demoVideos: courseForm.demoVideos.map(video => ({
        title: video.title || "Course Demo",
        videoUrl: video.videoUrl || ""
      })),
      curriculum: formattedCurriculum
    };

    try {
      let res;
      if (courseModal.mode === "add") {
        res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/courses/admin/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/courses/admin/${courseModal.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      const data = await res.json();
      if (data.success) {
        fetchCourses();
        setCourseModal({ open: false, mode: "add" });
      }
    } catch (err) {
      console.error("Error saving course to database:", err);
    }
  };

  // Native confirm deleted in favor of openDeleteConfirm modal

  return (
    <>
      <div className="flex flex-col gap-6 animate-fade-in-up text-left">
      {!courseModal.open && (
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-serif text-xl font-bold text-navy">Academy Courses</h2>
            <p className="text-sm text-muted-foreground font-light mt-1">Publish learning materials and structure academic pricing.</p>
          </div>
          <button
            onClick={handleOpenAddCourse}
            className="px-4 py-2.5 bg-navy text-white text-xs font-bold rounded-xl shadow-premium hover:bg-navy-light transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Course
          </button>
        </div>
      )}

      {/* Inline Add/Edit Form Card */}
      <AnimatePresence initial={false}>
        {courseModal.open && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
            animate={{ height: "auto", opacity: 1, marginBottom: 24 }}
            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-premium overflow-hidden text-left"
          >
            <form onSubmit={handleSaveCourse} className="flex flex-col gap-6 w-full">
              
              {/* Sticky Top Header Style */}
              <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between pb-5 border-b border-border/60">
                <div className="flex items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => setCourseModal({ open: false, mode: "add" })}
                    className="p-2.5 border border-border hover:bg-background-alt rounded-xl transition-all cursor-pointer bg-white shadow-sm"
                  >
                    <ArrowLeft className="w-4 h-4 text-navy" />
                  </button>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-navy">
                      {courseModal.mode === "add" ? "Create New Course Material" : "Update Course Syllabus"}
                    </h3>
                    <p className="text-[11px] text-muted-foreground font-light mt-0.5">Define your curriculum, pricing, and media resources.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCourseModal({ open: false, mode: "add" })}
                    className="px-4.5 py-2.5 border border-border rounded-xl text-xs font-semibold text-navy hover:bg-background-alt cursor-pointer bg-white transition-colors shadow-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={imageUploading || demoVideoUploading || courseForm.curriculum.some(i => i.loading)}
                    className="px-5 py-2.5 bg-navy text-white text-xs font-bold rounded-xl hover:bg-navy-light cursor-pointer shadow-premium transition-colors disabled:opacity-50"
                  >
                    Save Course
                  </button>
                </div>
              </div>

              {/* Grid 1: Basic Specifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">Course Title</label>
                  <input
                    type="text"
                    required
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    placeholder="e.g. Advanced Vastu Consultant Certification"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider">Category</label>
                    <button
                      type="button"
                      onClick={() => setShowCategoryManager(true)}
                      className="text-[9px] font-extrabold text-primary hover:underline cursor-pointer"
                    >
                      + Manage
                    </button>
                  </div>
                  <select
                    required
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy cursor-pointer"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id || cat.id} value={cat._id || cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">Total Lectures</label>
                  <input
                    type="number"
                    min={1}
                    placeholder="e.g. 24"
                    value={courseForm.lessonsCount || ""}
                    onChange={(e) => setCourseForm({ ...courseForm, lessonsCount: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy"
                  />
                </div>
              </div>

              {/* Grid 2: Pricing details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">Total Hours (Duration)</label>
                  <input
                    type="number"
                    min={1}
                    placeholder="e.g. 40"
                    value={courseForm.duration || ""}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">Sell Price (INR ₹) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    required
                    min={0}
                    placeholder="e.g. 4999"
                    value={courseForm.price || ""}
                    onChange={(e) => setCourseForm({ ...courseForm, price: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
                    Original Price (INR ₹)
                    {discountPercent > 0 && (
                      <span className="ml-2 text-[9px] lowercase bg-green-50 text-green-700 border border-green-200 px-1.5 py-0.5 rounded font-bold">
                        {discountPercent}% off
                      </span>
                    )}
                  </label>
                  <input
                    type="number"
                    min={0}
                    placeholder="e.g. 7999"
                    value={courseForm.originalPrice || ""}
                    onChange={(e) => setCourseForm({ ...courseForm, originalPrice: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy"
                  />
                </div>
              </div>

              {/* Grid 3: Overview Description Textarea */}
              <div className="w-full">
                <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">Course Overview Description</label>
                <textarea
                  rows={6}
                  value={courseForm.overview}
                  onChange={(e) => setCourseForm({ ...courseForm, overview: e.target.value })}
                  placeholder="Provide a detailed description of the course, key topics, outcomes, etc."
                  className="w-full text-xs p-3.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy resize-y min-h-[150px] text-left"
                />
              </div>

              {/* Course Thumbnail Image Box (Styled Card) */}
              <div className="p-5 bg-background-alt border border-border/80 rounded-2xl flex flex-col gap-2 w-full">
                <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider">
                  Course Thumbnail Image {imageUploading && <span className="ml-2 text-[9px] text-primary animate-pulse">(Uploading...)</span>}
                </label>

                <div className="max-w-sm w-full mt-1">
                  {courseForm.imagePreview ? (
                    /* Preview + Change button */
                    <div className="flex flex-col gap-3">
                      <div className="relative w-full h-44 rounded-xl overflow-hidden border border-border bg-white shadow-sm">
                        <img src={courseForm.imagePreview} alt="Course Thumbnail" className="w-full h-full object-cover" />
                        {imageUploading && (
                          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                            <span className="text-[10px] text-primary font-semibold animate-pulse">Uploading...</span>
                          </div>
                        )}
                      </div>
                      <label className="flex items-center justify-center gap-1.5 px-4 py-2.5 border border-border rounded-xl bg-white hover:bg-[#FAF6F0] text-navy font-semibold text-xs cursor-pointer shadow-sm transition-all hover:border-primary/30">
                        <Upload className="w-4 h-4 text-navy-light" /> Change Thumbnail Image
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} disabled={imageUploading} />
                      </label>
                    </div>
                  ) : (
                    /* Empty upload area */
                    <label className="flex flex-col items-center justify-center gap-2.5 h-44 border border-dashed border-border rounded-xl bg-white hover:bg-[#FAF6F0] text-navy cursor-pointer transition-all group shadow-sm hover:border-primary/40">
                      <div className="w-10 h-10 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Upload className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-[11px] font-semibold text-navy">Click to Upload Thumbnail</span>
                      <span className="text-[9px] text-muted-foreground font-light">Recommended size: 1280x720 (16:9)</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} disabled={imageUploading} />
                    </label>
                  )}
                </div>
              </div>

              {/* Course Demo Videos Builder (Below, full-width matching Curriculum layout) */}
              <div className="flex flex-col gap-4 border-t border-border/60 pt-5">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-bold text-navy uppercase tracking-wider">Demo Videos Builder</h4>
                    <p className="text-[11px] text-muted-foreground font-light mt-0.5">Add course preview titles and paste YouTube video links for free student access.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddDemoVideo}
                    className="px-3.5 py-1.5 border border-primary text-primary hover:bg-[#FEF3E4]/30 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Demo Video
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {courseForm.demoVideos.map((video, idx) => (
                    <div key={video.id} className="p-4 bg-white border border-border rounded-xl flex flex-col sm:flex-row gap-3 items-stretch sm:items-center animate-fade-in-up">
                      
                      {/* Video index badge */}
                      <span className="w-7 h-7 rounded-lg bg-navy/5 text-navy flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {idx + 1}
                      </span>

                      {/* Video Title */}
                      <input
                        type="text"
                        required
                        value={video.title}
                        onChange={(e) => handleUpdateDemoVideo(video.id, { title: e.target.value })}
                        placeholder="Video Title (e.g. Free Preview Chapter)"
                        className="flex-1 text-xs px-3 py-2 rounded-lg border border-border outline-none focus:border-primary/50 text-navy"
                      />

                      {/* YouTube URL */}
                      <div className="relative sm:w-64">
                        <input
                          type="url"
                          required
                          value={video.videoUrl}
                          onChange={(e) => handleUpdateDemoVideo(video.id, { videoUrl: e.target.value })}
                          placeholder="https://youtube.com/watch?v=..."
                          className="w-full text-xs pl-7 pr-2.5 py-2 rounded-lg border border-border outline-none focus:border-primary/50 text-navy"
                        />
                        <Play className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-red-500" />
                      </div>

                      {/* Delete button */}
                      <button
                        type="button"
                        onClick={() => openDeleteConfirm(video.id, "demo_video", video.title)}
                        className="p-2 text-red-500 hover:bg-red-50 border border-red-200/50 rounded-lg hover:text-red-700 flex-shrink-0 transition-colors cursor-pointer"
                      >
                        <Trash className="w-4 h-4" />
                      </button>

                    </div>
                  ))}

                  {courseForm.demoVideos.length === 0 && (
                    <div className="py-8 border border-dashed border-border rounded-xl text-center bg-white">
                      <p className="text-xs text-muted-foreground font-light">No demo videos added to this course preview yet.</p>
                      <button
                        type="button"
                        onClick={handleAddDemoVideo}
                        className="mt-3 text-xs font-bold text-primary hover:underline cursor-pointer"
                      >
                        + Add First Demo Video
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Grid 5: Curriculum Syllabus Dynamic Builder */}
              <div className="flex flex-col gap-4 border-t border-border/60 pt-5">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-bold text-navy uppercase tracking-wider">Curriculum Builder</h4>
                    <p className="text-[11px] text-muted-foreground font-light mt-0.5">Add chapter titles and select either a YouTube link or upload a PDF document for study resources.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddCurriculumItem}
                    className="px-3.5 py-1.5 border border-primary text-primary hover:bg-[#FEF3E4]/30 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Chapter/Lecture
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {courseForm.curriculum.map((item, idx) => (
                    <div key={item.id} className="p-4 bg-white border border-border rounded-xl flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">

                      {/* Lecture number badge */}
                      <span className="w-7 h-7 rounded-lg bg-navy/5 text-navy flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {idx + 1}
                      </span>

                      {/* Lecture title */}
                      <input
                        type="text"
                        required
                        value={item.title}
                        onChange={(e) => handleUpdateCurriculumItem(item.id, { title: e.target.value })}
                        placeholder="e.g. Chapter 1: Introduction to Pancha Bhootas"
                        className="flex-1 text-xs px-3 py-2 rounded-lg border border-border outline-none focus:border-primary/50 text-navy"
                      />

                      {/* Content Type Selector */}
                      <select
                        value={item.contentType || "youtube"}
                        onChange={(e) => handleUpdateCurriculumItem(item.id, { contentType: e.target.value as "youtube" | "pdf", youtubeUrl: "" })}
                        className="text-xs px-3 py-2 rounded-lg border border-border bg-white outline-none focus:border-primary/50 text-navy shrink-0 cursor-pointer"
                      >
                        <option value="youtube">📺 YouTube Video</option>
                        <option value="pdf">📄 PDF Document</option>
                      </select>

                      {/* Video URL or PDF Upload */}
                      {(!item.contentType || item.contentType === "youtube") ? (
                        /* YouTube URL input */
                        <div className="relative sm:w-64">
                          <input
                            type="url"
                            value={item.youtubeUrl || ""}
                            onChange={(e) => handleUpdateCurriculumItem(item.id, { youtubeUrl: e.target.value, contentType: "youtube" })}
                            placeholder="https://youtube.com/watch?v=..."
                            className="w-full text-xs pl-7 pr-2.5 py-2 rounded-lg border border-border outline-none focus:border-primary/50 text-navy"
                          />
                          <Play className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-red-500" />
                        </div>
                      ) : (
                        /* PDF File upload and status box */
                        <div className="flex items-center gap-2 sm:w-64">
                          {item.loading ? (
                            <div className="flex items-center gap-1.5 text-[10px] text-primary animate-pulse py-2 w-full justify-center">
                              <Upload className="w-3.5 h-3.5 animate-spin" /> Uploading PDF...
                            </div>
                          ) : item.youtubeUrl ? (
                            <div className="flex items-center gap-1.5 border border-border bg-background-alt px-2.5 py-1.5 rounded-lg flex-1 truncate w-full" title={item.fileName || "Uploaded Document"}>
                              <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
                              <span className="text-[10px] text-navy font-semibold truncate flex-1">{item.fileName || "Uploaded PDF"}</span>
                              <label className="text-[9px] text-primary font-bold cursor-pointer hover:underline shrink-0">
                                Change
                                <input
                                  type="file"
                                  accept="application/pdf"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleCurriculumPdfUpload(item.id, file);
                                  }}
                                />
                              </label>
                            </div>
                          ) : (
                            <label className="flex items-center justify-center gap-1.5 px-3 py-2 border border-dashed border-border rounded-lg bg-[#FAF6F0]/20 hover:bg-[#FAF6F0] text-navy font-semibold text-[10px] cursor-pointer shadow-sm w-full transition-all">
                              <Upload className="w-3.5 h-3.5 text-navy-light" /> Select PDF
                              <input
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleCurriculumPdfUpload(item.id, file);
                                }}
                              />
                            </label>
                          )}
                        </div>
                      )}

                      {/* Delete button */}
                      <button
                        type="button"
                        onClick={() => openDeleteConfirm(item.id, "curriculum", item.title)}
                        className="p-2 text-red-500 hover:bg-red-50 border border-red-200/50 rounded-lg hover:text-red-700 flex-shrink-0 transition-colors cursor-pointer"
                      >
                        <Trash className="w-4 h-4" />
                      </button>

                    </div>
                  ))}

                  {courseForm.curriculum.length === 0 && (
                    <div className="py-8 border border-dashed border-border rounded-xl text-center">
                      <p className="text-xs text-muted-foreground font-light">No lectures or curriculum content added to this syllabus yet.</p>
                      <button
                        type="button"
                        onClick={handleAddCurriculumItem}
                        className="mt-3 text-xs font-bold text-primary hover:underline cursor-pointer"
                      >
                        + Create First Lecture
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Courses Inventory Grid Table */}
      {!courseModal.open && (
        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-premium">
          {courses.length === 0 ? (
            <div className="py-16 px-4 text-center flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-navy/5 text-navy flex items-center justify-center flex-shrink-0 animate-pulse">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-navy">No Courses Published Yet</h4>
                <p className="text-xs text-muted-foreground font-light mt-1 max-w-sm mx-auto">
                  Your syllabus is currently empty. Click the button above to publish your first academic course material.
                </p>
              </div>
              <button
                onClick={handleOpenAddCourse}
                className="mt-2 px-4 py-2 border border-primary text-primary hover:bg-[#FEF3E4]/30 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                + Add First Course
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-navy text-white uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4 font-semibold">Course Title</th>
                    <th className="p-4 font-semibold">Category</th>
                    <th className="p-4 font-semibold">Rating</th>
                    <th className="p-4 font-semibold">Price</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {courses.map((item) => (
                    <tr key={item._id || item.id} className="hover:bg-background-alt/50 transition-colors">
                      <td className="p-4 font-semibold text-navy">{item.title}</td>
                      <td className="p-4 text-navy-light">{item.category?.name || item.category || "Foundational"}</td>
                      <td className="p-4 font-medium text-navy">⭐ {(item.averageRating || item.rating || 4.8)}</td>
                      <td className="p-4 font-bold text-navy">₹{item.price}</td>
                      <td className="p-4 text-right flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditCourse(item._id || item.id)}
                          className="p-1.5 bg-background-alt hover:bg-primary/10 border border-border rounded-lg text-primary transition-colors cursor-pointer"
                        >
                          <Edit className="w-4.5 h-4.5" />
                        </button>
                        <button
                          onClick={() => openDeleteConfirm(item._id || item.id, "course", item.title)}
                          className="p-1.5 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      </div>

      {/* Category Manager Popup Modal Overlay */}
      {showCategoryManager && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-navy/40 backdrop-blur-sm animate-fade-in p-4">
          <div className="bg-white border border-border rounded-2xl w-full max-w-md p-6 shadow-2xl flex flex-col gap-4 animate-scale-up text-left max-h-[85vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="font-serif text-base font-bold text-navy">Manage Course Categories</h3>
              <button
                type="button"
                onClick={() => setShowCategoryManager(false)}
                className="p-1 hover:bg-background-alt rounded-lg text-navy-light hover:text-navy cursor-pointer transition-colors border-0 bg-transparent flex items-center justify-center"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Category List */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] uppercase font-bold text-navy-light tracking-wide">Existing Categories</span>
              <div className="max-h-60 overflow-y-auto flex flex-col gap-2 border border-border/60 rounded-xl p-3 bg-background shadow-inner">
                {categories.length === 0 ? (
                  <span className="text-xs text-muted-foreground italic text-center py-4">No categories found. Create one below.</span>
                ) : (
                  categories.map((cat) => (
                    <div key={cat._id || cat.id} className="flex justify-between items-center bg-white border border-border/40 rounded-xl px-3 py-2 text-xs shadow-sm">
                      <span className="font-semibold text-navy truncate max-w-[200px]">{cat.name}</span>
                      <button
                        type="button"
                        onClick={() => openDeleteConfirm(cat._id || cat.id, "category", cat.name)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg border-0 bg-transparent cursor-pointer transition-colors"
                        title="Delete Category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Modal Footer: Add Category Inline */}
            <div className="border-t border-border pt-4 flex flex-col gap-2.5">
              <span className="text-[10px] uppercase font-bold text-navy-light tracking-wide">Add New Category</span>
              <div className="flex gap-2.5">
                <input
                  type="text"
                  placeholder="e.g. Vastu Masterclass"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="flex-grow text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary text-navy font-medium"
                />
                <button
                  type="button"
                  onClick={handleCreateCategory}
                  className="px-4 py-2.5 bg-navy text-white text-xs font-bold rounded-xl hover:bg-[#1e2d4d] cursor-pointer transition-colors shadow-sm shrink-0"
                >
                  Add Category
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Reusable Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        title={deleteModal.title}
        message={deleteModal.message}
        error={deleteModal.error}
        isLoading={deleteModal.isLoading}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal(prev => ({ ...prev, isOpen: false, error: null }))}
      />
    </>
  );
}
