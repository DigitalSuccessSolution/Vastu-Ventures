"use client";

import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Link as LinkExtension } from "@tiptap/extension-link";
import { Image as ImageExtension } from "@tiptap/extension-image";
import { Youtube as YoutubeExtension } from "@tiptap/extension-youtube";
import { Highlight } from "@tiptap/extension-highlight";
import { TextAlign } from "@tiptap/extension-text-align";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";

import {
  Plus,
  Trash2,
  Edit,
  ArrowLeft,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Eraser,
  Link as LinkIcon,
  Video,
  Image as ImageIcon,
  Table as TableIcon,
  Split,
  PlusSquare,
  MinusSquare,
  Trash,
  Minus,
  Settings,
  Image as ImageFileIcon,
  Info,
  X
} from "lucide-react";

import DeleteConfirmModal from "@/components/DeleteConfirmModal";

export default function AdminBlogsPage() {
  const [mounted, setMounted] = useState(false);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "create" | "edit">("list");
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  // Delete confirm modal state
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: "",
    type: "blog" as "blog" | "category",
    title: "",
    message: "",
    isLoading: false,
    error: null as string | null
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryVal, setNewCategoryVal] = useState("");
  const [manageCategoriesOpen, setManageCategoriesOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    author: "",
    category: "",
    image: "",
    date: "",
    status: "",
    content: ""
  });

  // Hydration safety
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch categories from DB
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/blog-categories/admin/list`);
      const data = await res.json();
      if (data.success) {
        setCategories(data.data || []);
      }
    } catch (err) {
      console.error("Error fetching categories from DB:", err);
    }
  };

  // Fetch blogs from DB
  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/blogs/admin/list`);
      const data = await res.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (err) {
      console.error("Error fetching blogs from DB:", err);
    }
  };

  useEffect(() => {
    if (mounted) {
      fetchBlogs();
      fetchCategories();
    }
  }, [mounted]);

  // Lock background scroll when Category modal is open
  useEffect(() => {
    if (manageCategoriesOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [manageCategoriesOpen]);

  // Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline hover:text-primary-dark transition-colors cursor-pointer"
        }
      }),
      ImageExtension.configure({
        HTMLAttributes: {
          class: "rounded-xl max-w-full my-4 shadow-md inline-block"
        }
      }),
      YoutubeExtension.configure({
        width: 640,
        height: 380,
        HTMLAttributes: {
          class: "rounded-xl overflow-hidden aspect-video max-w-full my-6 mx-auto block"
        }
      }),
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"]
      }),
      Table.configure({
        resizable: true
      }),
      TableRow,
      TableHeader,
      TableCell
    ],
    content: "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setBlogForm((prev) => ({ ...prev, content: html }));
    }
  });

  // Load editor content on mode change
  useEffect(() => {
    if (editor && viewMode !== "list") {
      editor.commands.setContent(blogForm.content || "");
    }
  }, [viewMode, selectedBlogId, editor]);

  const getDatePickerValue = (dateStr: string) => {
    if (!dateStr) return "";
    let d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      d = new Date();
    }
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const formatDateString = (dateStr: string) => {
    if (!dateStr) return "Today";
    const dateParts = dateStr.split("-");
    if (dateParts.length !== 3) return dateStr;
    const d = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleVal = e.target.value;
    const generatedSlug = titleVal
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    setBlogForm((prev) => ({
      ...prev,
      title: titleVal,
      slug: generatedSlug
    }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogForm((prev) => ({
      ...prev,
      slug: e.target.value
    }));
  };

  const handleOpenAddBlog = () => {
    setBlogForm({
      title: "",
      slug: "",
      author: "",
      category: "",
      image: "",
      date: "",
      status: "",
      content: ""
    });
    setPreviewUrl(null);
    setShowNewCategoryInput(false);
    setNewCategoryVal("");
    setViewMode("create");
    setSelectedBlogId(null);
  };

  const handleOpenEditBlog = (blog: any) => {
    setBlogForm({
      title: blog.title || "",
      slug: blog.slug || "",
      author: blog.author || "",
      category: blog.category || "",
      image: blog.image || "",
      date: getDatePickerValue(blog.date),
      status: blog.status || "",
      content: blog.content || ""
    });
    setPreviewUrl(null);
    setShowNewCategoryInput(false);
    setNewCategoryVal("");
    setViewMode("edit");
    setSelectedBlogId(blog._id || blog.id);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/courses/admin/upload`, {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success && data.data?.url) {
        setBlogForm((prev) => ({ ...prev, image: data.data.url }));
        setPreviewUrl(null);
      } else {
        alert("Image upload failed: " + (data.message || "Invalid response structure"));
        setPreviewUrl(null);
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      alert("Error uploading image: " + error.message);
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!blogForm.title.trim()) return alert("Article Title is required.");
    if (!blogForm.slug.trim()) return alert("Url Slug is required.");
    if (!blogForm.category.trim()) return alert("Category selection is required. Please select or add a category first.");
    if (!blogForm.author.trim()) return alert("Author name is required.");
    if (!blogForm.status) return alert("Please select a status.");
    if (!blogForm.date) return alert("Publish date is required.");
    if (!blogForm.image) return alert("Featured image is required. Please upload an image first.");
    if (!blogForm.content || (editor?.getText() || "").trim().length < 20) {
      return alert("Detailed Blog Content is required and must be at least 20 characters long.");
    }

    const plainText = (editor?.getText() || "").trim();
    const wordCount = plainText.split(/\s+/).filter(Boolean).length;
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
    const computedReadTime = `${readTimeMinutes} min read`;

    const computedShortDescription =
      plainText.substring(0, 150) + (plainText.length > 150 ? "..." : "");

    const formattedPublishDate = formatDateString(blogForm.date);

    const payload = {
      title: blogForm.title,
      slug: blogForm.slug,
      date: formattedPublishDate,
      author: blogForm.author,
      category: blogForm.category,
      image: blogForm.image,
      readTime: computedReadTime,
      shortDescription: computedShortDescription,
      content: blogForm.content,
      status: blogForm.status
    };

    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/blogs/admin/create`;
      let method = "POST";

      if (viewMode === "edit" && selectedBlogId) {
        url = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/blogs/admin/${selectedBlogId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        fetchBlogs();
        setViewMode("list");
      } else {
        alert("Failed to save article: " + data.message);
      }
    } catch (err: any) {
      console.error("Error saving blog:", err);
      alert("Failed to connect to backend server: " + err.message);
    }
  };

  const openDeleteConfirm = (id: string, type: "blog" | "category", name?: string) => {
    setDeleteModal({
      isOpen: true,
      id,
      type,
      title: type === "blog" ? "Delete Blog Post" : "Delete Category",
      message: type === "blog"
        ? `Are you sure you want to delete the blog post "${name || 'this article'}"? This action cannot be undone.`
        : `Are you sure you want to delete the category "${name || 'this category'}"? This action cannot be undone.`,
      isLoading: false,
      error: null
    });
  };

  const handleConfirmDelete = async () => {
    setDeleteModal(prev => ({ ...prev, isLoading: true, error: null }));
    const { id, type } = deleteModal;
    try {
      if (type === "blog") {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/blogs/admin/${id}`, {
          method: "DELETE"
        });
        const data = await res.json();
        if (data.success) {
          fetchBlogs();
          setDeleteModal(prev => ({ ...prev, isOpen: false }));
        } else {
          setDeleteModal(prev => ({ ...prev, error: data.message, isLoading: false }));
        }
      } else {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/blog-categories/admin/${id}`, {
          method: "DELETE"
        });
        const data = await res.json();
        if (data.success) {
          // If current selected category was the one deleted, clear it
          const deletedCatObj = categories.find(c => c._id === id);
          if (deletedCatObj && blogForm.category === deletedCatObj.name) {
            setBlogForm(prev => ({ ...prev, category: "" }));
          }
          fetchCategories();
          setDeleteModal(prev => ({ ...prev, isOpen: false }));
        } else {
          setDeleteModal(prev => ({ ...prev, error: data.message || "Failed to delete category.", isLoading: false }));
        }
      }
    } catch (err: any) {
      setDeleteModal(prev => ({ ...prev, error: err.message || "An error occurred during deletion.", isLoading: false }));
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/blog-categories/admin/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName.trim() })
      });
      const data = await res.json();
      if (data.success) {
        setNewCategoryName("");
        fetchCategories();
      } else {
        alert(data.message || "Failed to create category");
      }
    } catch (err: any) {
      alert("Error creating category: " + err.message);
    }
  };

  // Native confirm deleted in favor of openDeleteConfirm modal

  const handleToolbarClick = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    action();
  };

  if (!mounted) {
    return (
      <div className="min-h-[450px] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#E28A3E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6 animate-fade-in-up text-left">
      <style dangerouslySetInnerHTML={{ __html: `
        .ProseMirror {
          outline: none;
          min-height: 400px;
          max-height: 480px;
          overflow-y: auto;
          padding: 1.5rem;
          font-size: 0.95rem;
          line-height: 1.75;
          color: #0b1a30;
        }
        .ProseMirror p {
          margin-bottom: 1.25rem;
        }
        .ProseMirror h1 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
          font-family: serif;
          color: #0b1a30;
        }
        .ProseMirror h2 {
          font-size: 1.4rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          font-family: serif;
          color: #0b1a30;
        }
        .ProseMirror h3 {
          font-size: 1.2rem;
          font-weight: 700;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
          font-family: serif;
          color: #0b1a30;
        }
        .ProseMirror ul {
          list-style-type: disc;
          padding-left: 2rem;
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 2rem;
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .ProseMirror blockquote {
          border-left: 4px solid #E28A3E;
          padding-left: 1.25rem;
          font-style: italic;
          color: #475569;
          margin: 1.5rem 0;
          background-color: rgba(226, 138, 62, 0.04);
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          border-radius: 0 0.5rem 0.5rem 0;
        }
        .ProseMirror table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 1.5rem 0;
          overflow: hidden;
        }
        .ProseMirror td, .ProseMirror th {
          border: 1px solid #e2e8f0;
          padding: 10px 14px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
        }
        .ProseMirror th {
          font-weight: bold;
          text-align: left;
          background-color: #f8fafc;
        }
        .ProseMirror hr {
          border: 0;
          border-top: 1px solid #cbd5e1;
          margin: 2rem 0;
        }
        .ProseMirror mark {
          background-color: #fef08a;
          padding: 0.1rem 0.3rem;
          border-radius: 0.25rem;
        }
        .ProseMirror a {
          color: #E28A3E;
          text-decoration: underline;
        }
        .editor-content-area:empty:before {
          content: attr(placeholder);
          color: #94a3b8;
          pointer-events: none;
          display: block;
        }
      ` }} />

      {viewMode === "list" ? (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-serif text-lg font-bold text-navy">Blogs Directory</h2>
              <p className="text-xs text-muted-foreground font-light">Draft, schedule, and publish Vastu wisdom blogs directly to the database.</p>
            </div>
            <button
              onClick={handleOpenAddBlog}
              className="px-4.5 py-2.5 bg-navy text-white text-xs font-bold rounded-xl shadow-premium hover:bg-[#1e2d4d] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Create Article
            </button>
          </div>

          <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-premium">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#111e38] text-white uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4.5 font-semibold w-18">Preview</th>
                    <th className="p-4.5 font-semibold">Article Title</th>
                    <th className="p-4.5 font-semibold">Author</th>
                    <th className="p-4.5 font-semibold">Publish Date</th>
                    <th className="p-4.5 font-semibold">Category</th>
                    <th className="p-4.5 font-semibold">Status</th>
                    <th className="p-4.5 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {blogs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-12 text-center text-muted-foreground">
                        No articles in database. Click "Create Article" to write one.
                      </td>
                    </tr>
                  ) : (
                    blogs.map((item) => (
                      <tr key={item._id || item.id} className="hover:bg-background-alt/50 transition-colors">
                        <td className="p-4.5">
                          <div className="w-14 h-10 rounded-lg overflow-hidden border border-border bg-background-alt">
                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                          </div>
                        </td>
                        <td className="p-4.5 font-semibold text-navy max-w-sm truncate">{item.title}</td>
                        <td className="p-4.5 text-navy-light">{item.author}</td>
                        <td className="p-4.5 text-navy-light">{item.date}</td>
                        <td className="p-4.5 text-navy font-semibold">{item.category}</td>
                        <td className="p-4.5">
                          <span
                            className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                              item.status === "Published"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : item.status === "Scheduled"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-slate-100 text-slate-700 border border-slate-200"
                            }`}
                          >
                            {item.status || "Published"}
                          </span>
                        </td>
                        <td className="p-4.5 text-right flex justify-end gap-2.5 items-center h-18">
                          <button
                            onClick={() => handleOpenEditBlog(item)}
                            className="p-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-blue-600 transition-colors cursor-pointer"
                            title="Edit Article"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openDeleteConfirm(item._id || item.id, "blog", item.title)}
                            className="p-2 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-red-600 transition-colors cursor-pointer"
                            title="Delete Article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center pb-4 border-b border-border bg-white p-5 rounded-2xl border shadow-premium">
            <div className="flex items-center gap-3.5">
              <button
                onClick={() => setViewMode("list")}
                className="p-2.5 border border-border hover:bg-background-alt rounded-xl transition-all cursor-pointer bg-white"
              >
                <ArrowLeft className="w-4 h-4 text-navy" />
              </button>
              <div>
                <h2 className="font-serif text-lg font-bold text-navy">
                  {viewMode === "create" ? "Create Vastu Wisdom Article" : "Edit Vastu Wisdom Article"}
                </h2>
                <p className="text-xs text-muted-foreground font-light">Draft and publish with the professional publishing system.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className="px-4.5 py-2.5 border border-border rounded-xl text-xs font-semibold text-navy hover:bg-background-alt cursor-pointer bg-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBlog}
                className="px-5 py-2.5 bg-navy text-white text-xs font-bold rounded-xl hover:bg-[#1e2d4d] cursor-pointer transition-colors shadow-premium"
              >
                Save Article
              </button>
            </div>
          </div>

          <form onSubmit={handleSaveBlog} className="w-full bg-white border border-border rounded-2xl p-6 shadow-premium flex flex-col gap-6 text-left">
            
            {/* Top Row: Metadata Fields in 3-column horizontal grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Field 1: Article Title */}
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Article Title</label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={handleTitleChange}
                  placeholder="e.g. 5 Vastu Rules for Entrance Door Alignment"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy font-semibold placeholder:font-light"
                />
              </div>

              {/* Field 2: URL Slug */}
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Url Slug</label>
                <input
                  type="text"
                  required
                  value={blogForm.slug}
                  onChange={handleSlugChange}
                  placeholder="e.g. 5-vastu-rules-for-entrance-door"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy placeholder:font-light font-mono"
                />
              </div>

              {/* Field 3: Category */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider">Category</label>
                  <button
                    type="button"
                    onClick={() => setManageCategoriesOpen(true)}
                    className="text-[10px] font-bold text-primary hover:underline cursor-pointer bg-transparent border-0 outline-none"
                  >
                    Manage Categories
                  </button>
                </div>

                {/* Category Manager Modal block moved to root level */}

                <select
                  required
                  value={blogForm.category}
                  onChange={(e) => setBlogForm((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy cursor-pointer font-medium"
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((c) => (
                    <option key={c._id || c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 4: Author */}
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Author</label>
                <input
                  type="text"
                  required
                  value={blogForm.author}
                  onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                  placeholder="e.g. Acharya Raghavendra"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy font-semibold placeholder:font-light"
                />
              </div>

              {/* Field 5: Status Settings */}
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Status Settings</label>
                <select
                  required
                  value={blogForm.status}
                  onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy cursor-pointer font-semibold"
                >
                  <option value="">-- Choose Status --</option>
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Scheduled">Scheduled</option>
                </select>
              </div>

              {/* Field 6: Publish Date */}
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Publish Date</label>
                <input
                  type="date"
                  required
                  value={blogForm.date}
                  onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy cursor-pointer"
                />
              </div>

            </div>

            {/* Separator Divider */}
            <div className="border-t border-border/80 w-full" />

            {/* Featured Image Section (above editor) */}
            <div className="flex flex-col gap-2">
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">Featured Image</label>
              <div className="border border-border rounded-xl p-4 flex flex-col sm:flex-row gap-4 bg-background items-center shadow-inner">
                {(previewUrl || blogForm.image) && (
                  <div className="w-full sm:w-64 h-36 rounded-xl overflow-hidden border border-border bg-background-alt shadow-sm relative shrink-0">
                    <img
                      src={previewUrl || blogForm.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    {uploading && (
                      <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px] flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span className="text-[9px] text-white font-medium">Uploading...</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full text-xs text-navy-light file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-semibold file:bg-navy/15 file:text-navy hover:file:bg-navy/20 cursor-pointer"
                  />
                  <p className="text-[10px] text-muted-foreground font-light leading-relaxed">
                    Upload JPG, PNG or WebP (stored securely on Cloudinary). This image will serve as the header thumbnail of your article.
                  </p>
                </div>
              </div>
            </div>

            {/* Separator Divider */}
            <div className="border-t border-border/80 w-full" />

            {/* Detailed Content Editor (Full width) */}
            <div className="flex flex-col gap-2 w-full">
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">Detailed Blog Content</label>
              {editor && (
                <div className="border border-border rounded-xl overflow-hidden bg-background focus-within:bg-white focus-within:border-primary transition-all shadow-sm w-full">
                  {/* Tiptap Toolbar */}
                  <div className="flex flex-wrap gap-1 p-2 bg-[#111e38] border-b border-border text-white select-none">
                    <button
                      type="button"
                      onMouseDown={(e) => handleToolbarClick(e, () => editor.chain().focus().toggleBold().run())}
                      className={`p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer ${
                        editor.isActive("bold") ? "bg-white/15 text-[#E28A3E]!" : ""
                      }`}
                      title="Bold"
                    >
                      <Bold className="w-4.5 h-4.5" />
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => handleToolbarClick(e, () => editor.chain().focus().toggleItalic().run())}
                      className={`p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer ${
                        editor.isActive("italic") ? "bg-white/15 text-[#E28A3E]!" : ""
                      }`}
                      title="Italic"
                    >
                      <Italic className="w-4.5 h-4.5" />
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => handleToolbarClick(e, () => editor.chain().focus().toggleUnderline().run())}
                      className={`p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer ${
                        editor.isActive("underline") ? "bg-white/15 text-[#E28A3E]!" : ""
                      }`}
                      title="Underline"
                    >
                      <UnderlineIcon className="w-4.5 h-4.5" />
                    </button>

                    <div className="w-[1px] bg-white/20 mx-1.5 self-stretch" />

                    <button
                      type="button"
                      onMouseDown={(e) => handleToolbarClick(e, () => editor.chain().focus().toggleHeading({ level: 1 }).run())}
                      className={`p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer ${
                        editor.isActive("heading", { level: 1 }) ? "bg-white/15 text-[#E28A3E]!" : ""
                      }`}
                      title="H1"
                    >
                      <Heading1 className="w-4.5 h-4.5" />
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => handleToolbarClick(e, () => editor.chain().focus().toggleHeading({ level: 2 }).run())}
                      className={`p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer ${
                        editor.isActive("heading", { level: 2 }) ? "bg-white/15 text-[#E28A3E]!" : ""
                      }`}
                      title="H2"
                    >
                      <Heading2 className="w-4.5 h-4.5" />
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => handleToolbarClick(e, () => editor.chain().focus().toggleHeading({ level: 3 }).run())}
                      className={`p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer ${
                        editor.isActive("heading", { level: 3 }) ? "bg-white/15 text-[#E28A3E]!" : ""
                      }`}
                      title="H3"
                    >
                      <Heading3 className="w-4.5 h-4.5" />
                    </button>

                    <div className="w-[1px] bg-white/20 mx-1.5 self-stretch" />

                    <button
                      type="button"
                      onMouseDown={(e) => handleToolbarClick(e, () => editor.chain().focus().toggleBulletList().run())}
                      className={`p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer ${
                        editor.isActive("bulletList") ? "bg-white/15 text-[#E28A3E]!" : ""
                      }`}
                      title="Bullet List"
                    >
                      <List className="w-4.5 h-4.5" />
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => handleToolbarClick(e, () => editor.chain().focus().toggleOrderedList().run())}
                      className={`p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer ${
                        editor.isActive("orderedList") ? "bg-white/15 text-[#E28A3E]!" : ""
                      }`}
                      title="Numbered List"
                    >
                      <ListOrdered className="w-4.5 h-4.5" />
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => handleToolbarClick(e, () => editor.chain().focus().toggleBlockquote().run())}
                      className={`p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer ${
                        editor.isActive("blockquote") ? "bg-white/15 text-[#E28A3E]!" : ""
                      }`}
                      title="Quote"
                    >
                      <Quote className="w-4.5 h-4.5" />
                    </button>

                    <div className="w-[1px] bg-white/20 mx-1.5 self-stretch" />

                    <button
                      type="button"
                      onMouseDown={(e) => handleToolbarClick(e, () => editor.chain().focus().setTextAlign("left").run())}
                      className={`p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer ${
                        editor.isActive({ textAlign: "left" }) ? "bg-white/15 text-[#E28A3E]!" : ""
                      }`}
                      title="Align Left"
                    >
                      <AlignLeft className="w-4.5 h-4.5" />
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => handleToolbarClick(e, () => editor.chain().focus().setTextAlign("center").run())}
                      className={`p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer ${
                        editor.isActive({ textAlign: "center" }) ? "bg-white/15 text-[#E28A3E]!" : ""
                      }`}
                      title="Align Center"
                    >
                      <AlignCenter className="w-4.5 h-4.5" />
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => handleToolbarClick(e, () => editor.chain().focus().setTextAlign("right").run())}
                      className={`p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer ${
                        editor.isActive({ textAlign: "right" }) ? "bg-white/15 text-[#E28A3E]!" : ""
                      }`}
                      title="Align Right"
                    >
                      <AlignRight className="w-4.5 h-4.5" />
                    </button>

                    <div className="w-[1px] bg-white/20 mx-1.5 self-stretch" />

                    <button
                      type="button"
                      onMouseDown={(e) => handleToolbarClick(e, () => editor.chain().focus().toggleHighlight().run())}
                      className={`p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer ${
                        editor.isActive("highlight") ? "bg-white/15 text-[#E28A3E]!" : ""
                      }`}
                      title="Highlight Text"
                    >
                      <span className="font-bold text-sm bg-yellow-300 text-black px-1.5 py-0.5 rounded">A</span>
                    </button>

                    <button
                      type="button"
                      onMouseDown={(e) =>
                        handleToolbarClick(e, () => {
                          const url = prompt("Enter Link URL:");
                          if (url === "") {
                            editor.chain().focus().unsetLink().run();
                          } else if (url) {
                            editor.chain().focus().setLink({ href: url }).run();
                          }
                        })
                      }
                      className={`p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer ${
                        editor.isActive("link") ? "bg-white/15 text-[#E28A3E]!" : ""
                      }`}
                      title="Insert Link"
                    >
                      <LinkIcon className="w-4.5 h-4.5" />
                    </button>

                    <button
                      type="button"
                      onMouseDown={(e) =>
                        handleToolbarClick(e, () => {
                          const ytUrl = prompt("Enter YouTube Video URL:");
                          if (ytUrl) {
                            editor.chain().focus().setYoutubeVideo({ src: ytUrl }).run();
                          }
                        })
                      }
                      className="p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Insert YouTube Video"
                    >
                      <Video className="w-4.5 h-4.5" />
                    </button>

                    <label
                      className="p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer inline-flex items-center justify-center"
                      title="Upload & Insert Image"
                    >
                      <ImageIcon className="w-4.5 h-4.5" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const formData = new FormData();
                          formData.append("file", file);
                          try {
                            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/courses/admin/upload`, {
                              method: "POST",
                              body: formData
                            });
                            const data = await res.json();
                            if (data.success && data.data?.url) {
                              editor.chain().focus().setImage({ src: data.data.url }).run();
                            } else {
                              alert("Image insert failed: " + (data.message || "Invalid response structure"));
                            }
                          } catch (err: any) {
                            alert("Error uploading image in editor: " + err.message);
                          }
                        }}
                        className="hidden"
                      />
                    </label>

                    <div className="w-[1px] bg-white/20 mx-1.5 self-stretch" />

                    <button
                      type="button"
                      onMouseDown={(e) =>
                        handleToolbarClick(e, () =>
                          editor
                            .chain()
                            .focus()
                            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                            .run
                        )
                      }
                      className={`p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer ${
                        editor.isActive("table") ? "bg-white/15 text-[#E28A3E]!" : ""
                      }`}
                      title="Insert Table (3x3)"
                    >
                      <TableIcon className="w-4.5 h-4.5" />
                    </button>

                    {editor.isActive("table") && (
                      <>
                        <button
                          type="button"
                          onMouseDown={(e) => handleToolbarClick(e, () => editor.chain().focus().addColumnAfter().run())}
                          className="p-2 hover:bg-white/10 rounded-lg text-[#E28A3E] hover:text-white transition-colors cursor-pointer"
                          title="Add Column"
                        >
                          <PlusSquare className="w-4.5 h-4.5" />
                        </button>
                        <button
                          type="button"
                          onMouseDown={(e) => handleToolbarClick(e, () => editor.chain().focus().addRowAfter().run())}
                          className="p-2 hover:bg-white/10 rounded-lg text-[#E28A3E] hover:text-white transition-colors cursor-pointer"
                          title="Add Row"
                        >
                          <Split className="w-4.5 h-4.5 rotate-90" />
                        </button>
                        <button
                          type="button"
                          onMouseDown={(e) => handleToolbarClick(e, () => editor.chain().focus().deleteColumn().run())}
                          className="p-2 hover:bg-white/10 rounded-lg text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                          title="Delete Column"
                        >
                          <MinusSquare className="w-4.5 h-4.5" />
                        </button>
                        <button
                          type="button"
                          onMouseDown={(e) => handleToolbarClick(e, () => editor.chain().focus().deleteRow().run())}
                          className="p-2 hover:bg-white/10 rounded-lg text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                          title="Delete Row"
                        >
                          <Trash className="w-4.5 h-4.5" />
                        </button>
                      </>
                    )}

                    <div className="w-[1px] bg-white/20 mx-1.5 self-stretch" />

                    <button
                      type="button"
                      onMouseDown={(e) => handleToolbarClick(e, () => editor.chain().focus().setHorizontalRule().run())}
                      className="p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Horizontal Divider"
                    >
                      <Minus className="w-4.5 h-4.5" />
                    </button>

                    <button
                      type="button"
                      onMouseDown={(e) => handleToolbarClick(e, () => editor.chain().focus().unsetAllMarks().clearNodes().run())}
                      className="p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer ml-auto"
                      title="Clear Format"
                    >
                      <Eraser className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  {/* Editor area */}
                  <EditorContent
                    editor={editor}
                    placeholder="Write the detailed description, paragraphs, and insights of this blog post..."
                    className="w-full bg-white outline-none min-h-[400px] overflow-y-auto editor-content-area animate-fade-in"
                  />
                </div>
              )}
            </div>

          </form>
        </div>
      )}
      </div>

      {/* Category Manager Popup Modal Overlay */}
      {manageCategoriesOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-navy/40 backdrop-blur-sm animate-fade-in p-4">
          <div className="bg-white border border-border rounded-2xl w-full max-w-md p-6 shadow-2xl flex flex-col gap-4 animate-scale-up text-left max-h-[85vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="font-serif text-base font-bold text-navy">Manage Blog Categories</h3>
              <button
                type="button"
                onClick={() => setManageCategoriesOpen(false)}
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
                  categories.map((c) => (
                    <div key={c._id || c.id} className="flex justify-between items-center bg-white border border-border/40 rounded-xl px-3 py-2 text-xs shadow-sm">
                      <span className="font-semibold text-navy">{c.name}</span>
                      <button
                        type="button"
                        onClick={() => openDeleteConfirm(c._id || c.id, "category", c.name)}
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
                  placeholder="e.g. Vastu Shastra Tips"
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
