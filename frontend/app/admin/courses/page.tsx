"use client";

import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { COURSES as initialCourses } from "@/data/mockData";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState(initialCourses);
  const [courseModal, setCourseModal] = useState<{ open: boolean; mode: "add" | "edit"; id?: string }>({ open: false, mode: "add" });
  const [courseForm, setCourseForm] = useState({ title: "", category: "Foundational", price: 199, originalPrice: 299, rating: 4.8, lessonsCount: 18 });

  const handleOpenAddCourse = () => {
    setCourseForm({ title: "", category: "Foundational", price: 199, originalPrice: 299, rating: 4.8, lessonsCount: 18 });
    setCourseModal({ open: true, mode: "add" });
  };

  const handleOpenEditCourse = (id: string) => {
    const c = courses.find(item => item.id === id);
    if (c) {
      setCourseForm({ title: c.title, category: c.category, price: c.price, originalPrice: c.originalPrice, rating: c.rating, lessonsCount: c.lessonsCount });
      setCourseModal({ open: true, mode: "edit", id });
    }
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (courseModal.mode === "add") {
      const newCourse = {
        id: `c${courses.length + 1}`,
        title: courseForm.title,
        slug: courseForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        rating: courseForm.rating,
        reviewsCount: 10,
        category: courseForm.category,
        shortDescription: "Interactive Vedic study block",
        description: "Interactive Vedic study block",
        price: courseForm.price,
        originalPrice: courseForm.originalPrice,
        duration: "10 Hours (Self-paced)",
        lessonsCount: courseForm.lessonsCount,
        instructor: { name: "Acharya Raghavendra", role: "Lead Vastu Acharya", bio: "Scholar", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" },
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
        curriculum: [],
        benefits: ["Course completion certificate"],
        requirements: ["No requirements"]
      };
      setCourses([...courses, newCourse]);
    } else if (courseModal.mode === "edit" && courseModal.id) {
      setCourses(courses.map(c => c.id === courseModal.id ? { ...c, title: courseForm.title, category: courseForm.category, price: courseForm.price, originalPrice: courseForm.originalPrice, rating: courseForm.rating, lessonsCount: courseForm.lessonsCount } : c));
    }
    setCourseModal({ open: false, mode: "add" });
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up text-left">
      <div className="flex justify-between items-center">
        <p className="text-xs text-muted-foreground font-light">Publish learning materials and structure academic pricing.</p>
        <button 
          onClick={handleOpenAddCourse}
          className="px-4 py-2 bg-navy text-white text-xs font-bold rounded-xl shadow-premium hover:bg-navy-light transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Course
        </button>
      </div>

      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-premium">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-dark text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Course Title</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Lessons</th>
                <th className="p-4 font-semibold">Rating</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {courses.map((item) => (
                <tr key={item.id} className="hover:bg-background-alt/50 transition-colors">
                  <td className="p-4 font-semibold text-navy">{item.title}</td>
                  <td className="p-4 text-navy-light">{item.category}</td>
                  <td className="p-4 font-medium text-navy">{item.lessonsCount} Chapters</td>
                  <td className="p-4 font-medium text-navy">⭐ {item.rating}</td>
                  <td className="p-4 font-bold text-navy">₹{item.price * 80}</td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button 
                      onClick={() => handleOpenEditCourse(item.id)}
                      className="p-1.5 bg-background-alt hover:bg-primary/10 border border-border rounded-lg text-primary transition-colors cursor-pointer"
                    >
                      <Edit className="w-4.5 h-4.5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteCourse(item.id)}
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
      </div>

      {courseModal.open && (
        <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-border rounded-2xl p-6 max-w-md w-full shadow-premium-lg text-left animate-fade-in-up">
            <h3 className="font-serif text-lg font-bold text-navy mb-4">
              {courseModal.mode === "add" ? "Add New Course" : "Edit Course Content"}
            </h3>
            
            <form onSubmit={handleSaveCourse} className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">Course Title</label>
                <input
                  type="text"
                  required
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  placeholder="e.g. Vastu Masterclass"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">Category</label>
                  <select
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy cursor-pointer"
                  >
                    <option value="Foundational">Foundational</option>
                    <option value="Professional">Professional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">Lectures Count</label>
                  <input
                    type="number"
                    required
                    value={courseForm.lessonsCount}
                    onChange={(e) => setCourseForm({ ...courseForm, lessonsCount: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">Sell Price (INR)</label>
                  <input
                    type="number"
                    required
                    value={courseForm.price}
                    onChange={(e) => setCourseForm({ ...courseForm, price: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">Original Price (INR)</label>
                  <input
                    type="number"
                    required
                    value={courseForm.originalPrice}
                    onChange={(e) => setCourseForm({ ...courseForm, originalPrice: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setCourseModal({ open: false, mode: "add" })}
                  className="px-4 py-2 border border-border rounded-xl text-xs font-semibold text-navy hover:bg-background-alt cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-navy text-white text-xs font-bold rounded-xl hover:bg-navy-light cursor-pointer shadow-premium"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
