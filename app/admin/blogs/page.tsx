"use client";

import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { BLOGS as initialBlogs } from "@/data/mockData";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [blogModal, setBlogModal] = useState({ open: false, mode: "add" });
  const [blogForm, setBlogForm] = useState({ title: "", author: "Acharya Raghavendra", category: "Residential Vastu", shortDescription: "", content: "" });

  const handleOpenAddBlog = () => {
    setBlogForm({ title: "", author: "Acharya Raghavendra", category: "Residential Vastu", shortDescription: "", content: "" });
    setBlogModal({ open: true, mode: "add" });
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (blogModal.mode === "add") {
      const newBlog = {
        id: `b${blogs.length + 1}`,
        title: blogForm.title,
        slug: blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        date: "Today",
        author: blogForm.author,
        category: blogForm.category,
        shortDescription: blogForm.shortDescription,
        content: blogForm.content,
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800",
        readTime: "5 min read"
      };
      setBlogs([...blogs, newBlog]);
    }
    setBlogModal({ open: false, mode: "add" });
  };

  const handleDeleteBlog = (id: string) => {
    setBlogs(blogs.filter(b => b.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up text-left">
      <div className="flex justify-between items-center">
        <p className="text-xs text-muted-foreground font-light">Draft and publish Vastu wisdom blogs.</p>
        <button 
          onClick={handleOpenAddBlog}
          className="px-4 py-2 bg-navy text-white text-xs font-bold rounded-xl shadow-premium hover:bg-navy-light transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create Article
        </button>
      </div>

      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-premium">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-dark text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Article Title</th>
                <th className="p-4 font-semibold">Author</th>
                <th className="p-4 font-semibold">Publish Date</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {blogs.map((item) => (
                <tr key={item.id} className="hover:bg-background-alt/50 transition-colors">
                  <td className="p-4 font-semibold text-navy max-w-xs truncate">{item.title}</td>
                  <td className="p-4 text-navy-light">{item.author}</td>
                  <td className="p-4 text-navy-light">{item.date}</td>
                  <td className="p-4 text-navy font-semibold">{item.category}</td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button 
                      onClick={() => handleDeleteBlog(item.id)}
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

      {blogModal.open && (
        <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-border rounded-2xl p-6 max-w-md w-full shadow-premium-lg text-left animate-fade-in-up">
            <h3 className="font-serif text-lg font-bold text-navy mb-4">Draft Vastu Wisdom Article</h3>
            
            <form onSubmit={handleSaveBlog} className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">Blog Title</label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  placeholder="e.g. Master Bedroom Placements"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">Author</label>
                  <input
                    type="text"
                    required
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">Category</label>
                  <input
                    type="text"
                    required
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">Short Summary Description</label>
                <input
                  type="text"
                  required
                  value={blogForm.shortDescription}
                  onChange={(e) => setBlogForm({ ...blogForm, shortDescription: e.target.value })}
                  placeholder="e.g. The cardinal directions guidelines..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">Detailed Content</label>
                <textarea
                  required
                  rows={4}
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  placeholder="Detailed Vedic spatial geometry write-up..."
                  className="w-full text-xs px-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy resize-none"
                />
              </div>

              <div className="flex gap-3 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setBlogModal({ open: false, mode: "add" })}
                  className="px-4 py-2 border border-border rounded-xl text-xs font-semibold text-navy hover:bg-background-alt cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-navy text-white text-xs font-bold rounded-xl hover:bg-navy-light cursor-pointer shadow-premium"
                >
                  Save Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
