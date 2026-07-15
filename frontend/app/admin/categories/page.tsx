"use client";

import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([
    "Residential", 
    "Commercial", 
    "Industrial", 
    "Remedial Science", 
    "Vedic Space Alignments"
  ]);
  const [categoryInput, setCategoryInput] = useState("");

  const handleAddCategory = () => {
    if (categoryInput.trim() && !categories.includes(categoryInput.trim())) {
      setCategories([...categories, categoryInput.trim()]);
      setCategoryInput("");
    }
  };

  const handleDeleteCategory = (cat: string) => {
    setCategories(categories.filter(item => item !== cat));
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up text-left">
      <p className="text-xs text-muted-foreground font-light">Classify consultation areas and academic topics.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Input box */}
        <div className="md:col-span-5 bg-white border border-border rounded-2xl p-5 shadow-premium flex flex-col gap-4 text-left">
          <h3 className="font-serif text-sm font-semibold text-navy">Create New Domain</h3>
          <div>
            <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">Category Name</label>
            <input
              type="text"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              placeholder="e.g. Remedial Science"
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy"
            />
          </div>
          <button 
            onClick={handleAddCategory}
            className="w-full py-2.5 bg-navy text-white text-xs font-bold rounded-xl shadow-premium hover:bg-navy-light transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Save Category
          </button>
        </div>

        {/* List categories */}
        <div className="md:col-span-7 bg-white border border-border rounded-2xl p-5 shadow-premium text-left">
          <h3 className="font-serif text-sm font-semibold text-navy mb-4">Active Vastu Domains</h3>
          <div className="flex flex-col gap-3">
            {categories.map((cat, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-background-alt border border-border rounded-xl">
                <span className="text-xs font-bold text-navy">{cat}</span>
                <button 
                  onClick={() => handleDeleteCategory(cat)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
