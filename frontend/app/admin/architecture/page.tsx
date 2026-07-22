"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  PencilRuler, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Building2, 
  Home, 
  MapPin, 
  Compass, 
  ArrowLeft, 
  Layers, 
  Save, 
  FolderPlus,
  Tag,
  Upload,
  Lock,
  FileText,
  HelpCircle,
  X,
  Loader2,
  AlertCircle,
  FileCode,
  FileImage
} from "lucide-react";
import securedFetch from "@/lib/securedFetch";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";

export default function AdminArchitecturePage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  const [plans, setPlans] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Hidden File Input Refs
  const imageInputRef = useRef<HTMLInputElement>(null);
  const multiFileInputRef = useRef<HTMLInputElement>(null);
  
  // Page View Modes: "plans" (table list), "form" (inline form page), "categories" (manage categories inline page)
  const [currentView, setCurrentView] = useState<"plans" | "form" | "categories">("plans");
  
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Form State (for Plan Add/Edit inline form page)
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [planForm, setPlanForm] = useState({
    title: "",
    category: "",
    buyPrice: "",
    consultPrice: "",
    image: "",
    desc: "",
    status: "Active"
  });

  // Dynamic deliverables items list
  const [deliverables, setDeliverables] = useState<string[]>([]);
  const [newDeliverableInput, setNewDeliverableInput] = useState("");
  const [showAddDeliverableInput, setShowAddDeliverableInput] = useState(false);

  // Dynamic Multi-File Attachments (Unlimited PDFs, PNGs, JPGs, WEBP, DWG, etc.)
  const [attachments, setAttachments] = useState<Array<{ name: string; fileUrl: string; fileType: string }>>([]);

  // File Upload Loading States
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [uploadingProgressText, setUploadingProgressText] = useState("");

  // Category Add Inline Form State
  const [newCatName, setNewCatName] = useState("");

  // Delete confirm modal state
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: "",
    type: "plan" as "plan" | "category",
    title: "",
    message: "",
    isLoading: false,
    error: null as string | null
  });

  // Fetch categories and plans on mount
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch categories
      const catRes = await securedFetch(`${API_URL}/admin/architecture-categories`);
      const catData = await catRes.json();
      if (catData.success && Array.isArray(catData.data)) {
        setCategories(catData.data);
      }

      // Fetch plans
      const planRes = await securedFetch(`${API_URL}/admin/architecture`);
      const planData = await planRes.json();
      if (planData.success && Array.isArray(planData.data)) {
        setPlans(planData.data);
      }
    } catch (err) {
      console.error("Failed to load admin architecture data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Switch to Plan Form View (Create or Edit)
  const handleOpenForm = (plan?: any) => {
    setFormError(null);
    setUploadingImage(false);
    setUploadingFiles(false);
    setUploadingProgressText("");
    if (plan) {
      setEditingPlan(plan);
      setPlanForm({
        title: plan.title || "",
        category: plan.categoryName || plan.category || (categories[0]?.name || ""),
        buyPrice: plan.buyPrice !== undefined ? plan.buyPrice.toString() : "",
        consultPrice: plan.consultPrice !== undefined ? plan.consultPrice.toString() : "",
        image: plan.image || "",
        desc: plan.desc || "",
        status: plan.status || "Active"
      });
      if (Array.isArray(plan.deliverables) && plan.deliverables.length > 0) {
        setDeliverables(plan.deliverables);
      } else {
        setDeliverables([]);
      }
      if (Array.isArray(plan.attachments) && plan.attachments.length > 0) {
        setAttachments(plan.attachments);
      } else if (plan.pdfFileName) {
        setAttachments([{ name: plan.pdfFileName, fileUrl: plan.pdfUrl || "", fileType: "pdf" }]);
      } else {
        setAttachments([]);
      }
    } else {
      setEditingPlan(null);
      setPlanForm({
        title: "",
        category: categories[0]?.name || "",
        buyPrice: "",
        consultPrice: "",
        image: "",
        desc: "",
        status: "Active"
      });
      setDeliverables([]);
      setAttachments([]);
    }
    setCurrentView("form");
  };

  // Upload Single Thumbnail Image to Cloudinary with Live Loading State (No Base64 Fallback)
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setFormError(null);
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await securedFetch(`${API_URL}/admin/architecture/upload`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.success && data.data?.url) {
        setPlanForm(prev => ({ ...prev, image: data.data.url }));
        setFormError(null);
      } else {
        alert(data.message || "Failed to upload image. Please verify Cloudinary credentials.");
        setFormError(data.message || "Failed to upload image to Cloudinary.");
      }
    } catch (err: any) {
      console.error("Cloudinary image upload error:", err);
      alert(`Error uploading image: ${err.message || err}`);
      setFormError("Error uploading image to server.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Upload Multiple Blueprint Files (PDFs, Images, CADs) to Cloudinary with Live Progress State (No Base64 Fallback)
  const handleMultiFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    setUploadingFiles(true);
    
    try {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        setUploadingProgressText(`Uploading ${i + 1} of ${fileList.length} files...`);

        const extension = file.name.split('.').pop()?.toLowerCase() || '';
        let fileType = "document";
        if (["pdf"].includes(extension)) fileType = "pdf";
        else if (["png", "jpg", "jpeg", "webp", "svg", "gif"].includes(extension)) fileType = "image";
        else fileType = extension.toUpperCase();

        try {
          const formData = new FormData();
          formData.append("file", file);

          const res = await securedFetch(`${API_URL}/admin/architecture/upload`, {
            method: "POST",
            body: formData
          });
          const data = await res.json();

          if (data.success && data.data?.url) {
            setAttachments(prev => [
              ...prev,
              { name: file.name, fileUrl: data.data.url, fileType }
            ]);
          } else {
            alert(`Failed to upload "${file.name}": ${data.message || "Unknown error"}`);
          }
        } catch (err: any) {
          console.error("Cloudinary file upload error:", err);
          alert(`Error uploading "${file.name}": ${err.message || err}`);
        }
      }
    } finally {
      setUploadingFiles(false);
      setUploadingProgressText("");
      setFormError(null);
      e.target.value = "";
    }
  };

  // Remove individual attachment file
  const handleRemoveAttachment = (indexToRemove: number) => {
    setAttachments(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Save Architecture Plan with STRICT Field Validation
  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // 1. Validate Category
    if (!planForm.category) {
      setFormError("Please select an Architecture Category.");
      return;
    }

    // 2. Validate Plan Title
    if (!planForm.title.trim()) {
      setFormError("Plan Title is required. Please enter a title.");
      return;
    }

    // 3. Validate Short Description
    if (!planForm.desc.trim()) {
      setFormError("Short Description is required. Please enter a description.");
      return;
    }

    // 4. Validate Buy Price
    if (!planForm.buyPrice || isNaN(Number(planForm.buyPrice)) || Number(planForm.buyPrice) <= 0) {
      setFormError("Buy Plan Price is required and must be greater than ₹0.");
      return;
    }

    // 5. Validate Book Consultation Price
    if (!planForm.consultPrice || isNaN(Number(planForm.consultPrice)) || Number(planForm.consultPrice) <= 0) {
      setFormError("Book Consultation Price is required and must be greater than ₹0.");
      return;
    }

    // 6. Validate Card Image
    if (!planForm.image) {
      setFormError("Card Image is required. Please click 'Upload Image' to select an image file.");
      return;
    }

    // 7. Validate Plan Attachments (PDFs / Blueprint Images)
    if (attachments.length === 0) {
      setFormError("At least 1 PDF or Blueprint image attachment is required. Please click '+ Add PDF / Images' to select files.");
      return;
    }

    try {
      setSaving(true);

      const selectedCategoryName = planForm.category || (categories[0]?.name || "");
      const primaryPdf = attachments.find(a => a.fileType === "pdf") || attachments[0];

      const payload = {
        title: planForm.title.trim(),
        categoryName: selectedCategoryName,
        buyPrice: Number(planForm.buyPrice),
        consultPrice: Number(planForm.consultPrice),
        image: planForm.image,
        desc: planForm.desc.trim(),
        status: planForm.status,
        deliverables,
        attachments,
        pdfFileName: primaryPdf ? primaryPdf.name : "",
        pdfUrl: primaryPdf ? primaryPdf.fileUrl : ""
      };

      if (editingPlan) {
        const res = await securedFetch(`${API_URL}/admin/architecture/${editingPlan.id || editingPlan._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          fetchData();
          setCurrentView("plans");
        } else {
          setFormError(data.message || "Failed to update plan");
        }
      } else {
        const res = await securedFetch(`${API_URL}/admin/architecture`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          fetchData();
          setCurrentView("plans");
        } else {
          setFormError(data.message || "Failed to create plan");
        }
      }
    } catch (err) {
      console.error("Save plan error:", err);
      setFormError("Error saving architecture plan. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Add new deliverable item
  const handleAddDeliverable = () => {
    if (newDeliverableInput.trim()) {
      setDeliverables(prev => [...prev, newDeliverableInput.trim()]);
      setNewDeliverableInput("");
      setShowAddDeliverableInput(false);
    }
  };

  // Add New Category
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    try {
      const res = await securedFetch(`${API_URL}/admin/architecture-categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCatName.trim() })
      });
      const data = await res.json();
      if (data.success) {
        setNewCatName("");
        fetchData();
      } else {
        alert(data.message || "Failed to add category");
      }
    } catch (err) {
      console.error("Add category error:", err);
    }
  };

  // Trigger Delete Category Modal with Business Logic Protection
  const promptDeleteCategory = (category: any) => {
    const catId = category.id || category._id;
    
    // BUSINESS LOGIC RULE: Prevent deleting category if it has linked plans
    if (category.planCount > 0) {
      setDeleteModal({
        isOpen: true,
        id: catId,
        type: "category",
        title: `Cannot Delete Category`,
        message: `Category "${category.name}" cannot be deleted because it has ${category.planCount} linked architecture plan(s).`,
        error: `Please delete or reassign all linked architecture plans before deleting this category.`,
        isLoading: false
      });
      return;
    }

    setDeleteModal({
      isOpen: true,
      id: catId,
      type: "category",
      title: "Delete Category",
      message: `Are you sure you want to delete the category "${category.name}"? This action cannot be undone.`,
      error: null,
      isLoading: false
    });
  };

  // Trigger Delete Plan Modal
  const promptDeletePlan = (plan: any) => {
    const planId = plan.id || plan._id;
    setDeleteModal({
      isOpen: true,
      id: planId,
      type: "plan",
      title: "Delete Architecture Plan",
      message: `Are you sure you want to delete "${plan.title}"? This action cannot be undone.`,
      error: null,
      isLoading: false
    });
  };

  // Confirm Delete Action Handler inside DeleteConfirmModal
  const handleConfirmDelete = async () => {
    if (!deleteModal.id) return;

    try {
      setDeleteModal(prev => ({ ...prev, isLoading: true, error: null }));

      if (deleteModal.type === "category") {
        const res = await securedFetch(`${API_URL}/admin/architecture-categories/${deleteModal.id}`, {
          method: "DELETE"
        });
        const data = await res.json();
        if (data.success) {
          fetchData();
          setDeleteModal(prev => ({ ...prev, isOpen: false, isLoading: false }));
        } else {
          setDeleteModal(prev => ({ ...prev, isLoading: false, error: data.message || "Failed to delete category" }));
        }
      } else {
        const res = await securedFetch(`${API_URL}/admin/architecture/${deleteModal.id}`, {
          method: "DELETE"
        });
        const data = await res.json();
        if (data.success) {
          fetchData();
          setDeleteModal(prev => ({ ...prev, isOpen: false, isLoading: false }));
        } else {
          setDeleteModal(prev => ({ ...prev, isLoading: false, error: data.message || "Failed to delete plan" }));
        }
      }
    } catch (err) {
      console.error("Delete error:", err);
      setDeleteModal(prev => ({ ...prev, isLoading: false, error: "An error occurred during deletion." }));
    }
  };

  const toggleStatus = async (id: string) => {
    try {
      const res = await securedFetch(`${API_URL}/admin/architecture/${id}/status`, {
        method: "PATCH"
      });
      const data = await res.json();
      if (data.success) {
        setPlans(prev => prev.map(p => {
          if ((p.id || p._id) === id) {
            return { ...p, status: p.status === "Active" ? "Inactive" : "Active" };
          }
          return p;
        }));
      }
    } catch (err) {
      console.error("Toggle status error:", err);
    }
  };

  // Filter plans
  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const catName = plan.categoryName || plan.category;
    const matchesCategory = categoryFilter === "all" || catName === categoryFilter;
    const matchesStatus = statusFilter === "all" || plan.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6 text-navy text-left animate-fade-in-up">

      {/* Hidden Inputs for Single Image & Unlimited Multi-File Selection */}
      <input 
        type="file" 
        ref={imageInputRef} 
        accept="image/*" 
        className="hidden" 
        onChange={handleImageFileChange} 
      />
      <input 
        type="file" 
        multiple
        ref={multiFileInputRef} 
        accept="*/*" 
        className="hidden" 
        onChange={handleMultiFileChange} 
      />

      {/* ========================================================================= */}
      {/* VIEW 1: PLANS LIST VIEW (Default View) */}
      {/* ========================================================================= */}
      {currentView === "plans" && (
        <>
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-border/80 shadow-sm">
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-semibold text-navy">
                Architecture Management
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-light">
                Manage Vastu-compliant blueprints, commercial layouts, pricing, and categories.
              </p>
            </div>

            {/* Action Buttons: Add Category & Add Plan */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setCurrentView("categories")}
                className="px-4 py-2.5 rounded-xl bg-background hover:bg-white text-navy border border-border text-xs sm:text-sm font-semibold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Tag className="w-4 h-4 text-primary" />
                <span>Manage Categories ({categories.length})</span>
              </button>

              <button
                onClick={() => handleOpenForm()}
                className="px-5 py-2.5 rounded-xl bg-[#E28A3E] hover:bg-[#c9742b] text-white font-semibold text-xs sm:text-sm shadow-premium transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Architecture Plan</span>
              </button>
            </div>
          </div>

          {/* Search & Category Filter Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-border/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search plan title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy placeholder:text-muted-foreground/60 font-medium"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
              {/* Dynamic Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy font-medium cursor-pointer"
              >
                <option value="all">All Categories ({categories.length})</option>
                {categories.map(cat => (
                  <option key={cat.id || cat._id} value={cat.name}>{cat.name}</option>
                ))}
              </select>

              {/* Status Dropdown */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy font-medium cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Plans Data Table */}
          <div className="bg-white rounded-2xl border border-border/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-navy text-white uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="p-4 font-semibold">Plan Title & Category</th>
                    <th className="p-4 font-semibold">Plan Price</th>
                    <th className="p-4 font-semibold">Consult Price</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="text-center py-12">
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                          <Loader2 className="w-5 h-5 text-primary animate-spin" />
                          <span>Loading architecture plans...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredPlans.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-muted-foreground font-light">
                        No architecture plans found. Click "+ Add Architecture Plan" to create one.
                      </td>
                    </tr>
                  ) : (
                    filteredPlans.map((plan) => (
                      <tr key={plan.id || plan._id} className="hover:bg-background/50 transition-colors">
                        
                        {/* Title with Category underneath */}
                        <td className="p-4">
                          <div className="font-semibold text-navy text-xs sm:text-sm leading-snug">
                            {plan.title}
                          </div>
                          <div className="text-[11px] text-muted-foreground font-medium mt-0.5 flex items-center gap-2">
                            <span>{plan.categoryName || plan.category}</span>
                            {Array.isArray(plan.attachments) && plan.attachments.length > 0 && (
                              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold">
                                📁 {plan.attachments.length} Files Attached
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Buy Price */}
                        <td className="p-4 font-semibold text-[#E28A3E]">
                          ₹{plan.buyPrice}
                        </td>

                        {/* Consult Price */}
                        <td className="p-4 font-semibold text-navy">
                          ₹{plan.consultPrice}
                        </td>

                        {/* Status Toggle (Active / Inactive) */}
                        <td className="p-4">
                          <button
                            onClick={() => toggleStatus(plan.id || plan._id)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold cursor-pointer transition-all ${
                              plan.status === "Active"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                            }`}
                          >
                            {plan.status === "Active" ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            <span>{plan.status}</span>
                          </button>
                        </td>

                        {/* Actions: Edit & Delete ONLY */}
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenForm(plan)}
                              className="p-2 rounded-lg bg-background hover:bg-blue-50 text-navy hover:text-blue-600 transition-colors cursor-pointer border border-border/60"
                              title="Edit Plan"
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => promptDeletePlan(plan)}
                              className="p-2 rounded-lg bg-background hover:bg-red-50 text-navy hover:text-red-600 transition-colors cursor-pointer border border-border/60"
                              title="Delete Plan"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: ADD / EDIT ARCHITECTURE PLAN FORM VIEW (UNLIMITED MULTI-FILE UPLOADS) */}
      {/* ========================================================================= */}
      {currentView === "form" && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-sm space-y-6 text-xs text-left">
          
          {/* Form Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
            <div>
              <h2 className="font-serif text-xl font-semibold text-navy">
                {editingPlan ? `Edit Architecture Plan` : "Add Architecture Plan"}
              </h2>
              <p className="text-xs text-muted-foreground mt-1 font-light">
                Fill in the details below to add or update an architectural plan with unlimited blueprint attachments.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentView("plans")}
                className="h-10 px-5 rounded-xl bg-background border border-border text-navy font-semibold text-xs hover:bg-white transition-colors cursor-pointer inline-flex items-center justify-center whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePlan}
                disabled={saving}
                className="h-10 px-6 rounded-xl bg-[#E28A3E] hover:bg-[#c9742b] text-white font-semibold text-xs shadow-sm transition-all cursor-pointer inline-flex items-center justify-center whitespace-nowrap disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Plan"}
              </button>
            </div>
          </div>

          {/* Form Error Banner */}
          {formError && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-xs font-semibold animate-fade-in">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Form Body */}
          <form onSubmit={handleSavePlan} className="space-y-6">
            
            {/* ROW 1: Select Category, Plan Title, Auto-Slug (3 Equal Columns Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
              <div>
                <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
                  Select Category <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={planForm.category}
                  onChange={(e) => setPlanForm({ ...planForm, category: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy font-medium cursor-pointer"
                >
                  <option value="">-- Select Category --</option>
                  {categories.map(cat => (
                    <option key={cat.id || cat._id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
                  Plan Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1 BHK Modern House Plan"
                  value={planForm.title}
                  onChange={(e) => setPlanForm({ ...planForm, title: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy font-medium placeholder:text-muted-foreground/60"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
                  Slug (Auto-generated)
                </label>
                <input
                  type="text"
                  readOnly
                  placeholder="e.g. 1-bhk-modern-house-plan"
                  value={planForm.title ? planForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : ""}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border text-muted-foreground bg-slate-100/70 font-mono cursor-not-allowed"
                />
              </div>
            </div>

            {/* ROW 2: Short Description (Full Width) */}
            <div>
              <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
                Short Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                placeholder="Enter short description of the architecture plan..."
                value={planForm.desc}
                onChange={(e) => setPlanForm({ ...planForm, desc: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy font-medium leading-relaxed placeholder:text-muted-foreground/60"
              />
            </div>

            {/* ROW 3: Card Image * & Prices (2 Balanced Columns) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Card Image Dropzone Preview (6 cols) */}
              <div className="lg:col-span-6">
                <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
                  Card Thumbnail Image <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-36 h-[96px] rounded-xl overflow-hidden border border-border bg-slate-100 flex-shrink-0 shadow-xs flex items-center justify-center">
                    {planForm.image ? (
                      <img 
                        src={planForm.image} 
                        alt="Preview"
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-muted-foreground text-[10px] gap-1 p-2 text-center">
                        <Tag className="w-5 h-5 text-slate-300" />
                        <span>No Thumbnail</span>
                      </div>
                    )}
                  </div>
                  
                  {/* File Upload Box (Clickable File Picker Trigger) */}
                  <button
                    type="button"
                    disabled={uploadingImage}
                    onClick={() => imageInputRef.current?.click()}
                    className={`flex-grow h-[96px] border-2 border-dashed border-border hover:border-primary/60 rounded-xl p-3 flex flex-col items-center justify-center text-center bg-background hover:bg-white transition-all cursor-pointer group w-full ${uploadingImage ? "opacity-60 cursor-not-allowed" : ""}`}
                  >
                    {uploadingImage ? (
                      <>
                        <Loader2 className="w-5 h-5 text-[#E28A3E] animate-spin mb-0.5" />
                        <span className="font-semibold text-navy text-xs">Uploading Image...</span>
                        <span className="text-[10px] text-muted-foreground">Saving to secure storage</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 text-[#E28A3E] mb-0.5 group-hover:scale-110 transition-transform" />
                        <span className="font-semibold text-navy text-xs">
                          {planForm.image ? "Change Thumbnail" : "Upload Thumbnail"}
                        </span>
                        <span className="text-[10px] text-muted-foreground">PNG, JPG, WEBP Image</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Prices Side-by-Side (6 cols) */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
                    Buy Plan Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 999"
                    value={planForm.buyPrice}
                    onChange={(e) => setPlanForm({ ...planForm, buyPrice: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy font-semibold placeholder:text-muted-foreground/60"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <span>Book Consultation Price (₹)</span>
                    <span className="text-red-500">*</span>
                    <HelpCircle className="w-3.5 h-3.5 text-muted-foreground ml-0.5" />
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 499"
                    value={planForm.consultPrice}
                    onChange={(e) => setPlanForm({ ...planForm, consultPrice: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy font-semibold placeholder:text-muted-foreground/60"
                  />
                </div>
              </div>
            </div>

            {/* ROW 4: What will user get after purchasing? (Displayed as locked preview) */}
            <div className="pt-1">
              <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
                What will user get after purchasing? <span className="text-muted-foreground font-normal lowercase">(displayed as locked preview)</span>
              </label>
              
              <div className="flex items-center gap-2.5 flex-wrap">
                {deliverables.length === 0 && !showAddDeliverableInput && (
                  <span className="text-xs text-muted-foreground italic font-normal py-1">
                    No deliverables added yet. Click + Add Item to specify what user gets after purchasing.
                  </span>
                )}

                {deliverables.map((item, idx) => (
                  <div key={idx} className="px-3.5 py-2 rounded-xl bg-background border border-border text-navy font-semibold text-xs flex items-center gap-2 shadow-2xs group/del">
                    <span>{item}</span>
                    <Lock className="w-3.5 h-3.5 text-[#E28A3E]" />
                    <button
                      type="button"
                      onClick={() => setDeliverables(prev => prev.filter((_, i) => i !== idx))}
                      className="ml-1 text-muted-foreground hover:text-red-600 transition-colors cursor-pointer"
                      title="Remove Item"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {showAddDeliverableInput ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      autoFocus
                      placeholder="e.g. Floor Plan PDF, 3D Elevation"
                      value={newDeliverableInput}
                      onChange={(e) => setNewDeliverableInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddDeliverable())}
                      className="text-xs px-3 py-1.5 rounded-xl border border-primary bg-white outline-none text-navy"
                    />
                    <button
                      type="button"
                      onClick={handleAddDeliverable}
                      className="px-3 py-1.5 rounded-xl bg-[#E28A3E] text-white font-semibold text-xs cursor-pointer"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddDeliverableInput(false)}
                      className="p-1.5 text-muted-foreground hover:text-navy cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowAddDeliverableInput(true)}
                    className="px-3.5 py-2 rounded-xl border-2 border-dashed border-border hover:border-primary text-navy font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer bg-white"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#E28A3E]" />
                    <span>Add Item</span>
                  </button>
                )}
              </div>
            </div>

            {/* ROW 5: UNLIMITED MULTI-FILE ATTACHMENTS (PDFs, PNG, JPG, WEBP, DWG, ANY EXTENSION) */}
            <div className="pt-1 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider">
                  Plan Attachments (PDFs & Blueprint Images for Buyer) <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] text-muted-foreground">
                  Upload multiple PDFs, PNGs, JPGs, DWG files (Unlimited)
                </span>
              </div>

              {/* Upload Trigger Button */}
              <button
                type="button"
                disabled={uploadingFiles}
                onClick={() => multiFileInputRef.current?.click()}
                className={`w-full border-2 border-dashed border-border hover:border-primary/60 rounded-2xl p-4 flex flex-col items-center justify-center text-center bg-background hover:bg-white transition-all cursor-pointer group ${uploadingFiles ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {uploadingFiles ? (
                  <>
                    <div className="w-10 h-10 rounded-xl bg-[#E28A3E]/10 flex items-center justify-center mb-1">
                      <Loader2 className="w-5 h-5 text-[#E28A3E] animate-spin" />
                    </div>
                    <span className="font-semibold text-[#E28A3E] text-xs">
                      {uploadingProgressText || "Uploading Files..."}
                    </span>
                    <span className="text-[10px] text-muted-foreground mt-0.5">
                      Please wait while files are being securely uploaded
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-xl bg-[#E28A3E]/10 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                      <Upload className="w-5 h-5 text-[#E28A3E]" />
                    </div>
                    <span className="font-semibold text-navy text-xs">
                      + Add PDFs & High-Res Blueprint Images
                    </span>
                    <span className="text-[10px] text-muted-foreground mt-0.5">
                      Supports .pdf, .png, .jpg, .jpeg, .webp, .svg, .dwg (Select 1 or multiple files at once)
                    </span>
                  </>
                )}
              </button>

              {/* Uploaded Attachments List Display Grid */}
              {attachments.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                  {attachments.map((fileItem, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-border bg-slate-50 flex items-center justify-between gap-3 shadow-2xs group">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-[9px] flex-shrink-0 ${
                          fileItem.fileType === "pdf" ? "bg-red-600" : fileItem.fileType === "image" ? "bg-blue-600" : "bg-emerald-600"
                        }`}>
                          {fileItem.fileType === "pdf" ? <FileText className="w-4 h-4 text-white" /> : fileItem.fileType === "image" ? <FileImage className="w-4 h-4 text-white" /> : <FileCode className="w-4 h-4 text-white" />}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-navy text-xs truncate" title={fileItem.name}>{fileItem.name}</p>
                          <span className="text-[9px] font-bold text-muted-foreground uppercase">{fileItem.fileType} Document</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveAttachment(idx)}
                        className="p-1 rounded-md text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer flex-shrink-0"
                        title="Remove Attachment"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: INLINE CATEGORIES MANAGEMENT VIEW */}
      {/* ========================================================================= */}
      {currentView === "categories" && (
        <div className="space-y-6">
          {/* Top Bar with Back Button */}
          <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-border/80 shadow-sm">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setCurrentView("plans")}
                className="px-3.5 py-2 rounded-xl bg-background hover:bg-white text-navy border border-border transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap flex-shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Plans List</span>
              </button>
              <h2 className="font-serif text-lg sm:text-xl font-semibold text-navy">
                Architecture Categories Management
              </h2>
            </div>
          </div>

          {/* Add Category Form Bar */}
          <form onSubmit={handleAddCategory} className="bg-white p-6 rounded-2xl border border-border/80 shadow-sm flex flex-col sm:flex-row items-end gap-3.5">
            <div className="flex-grow w-full">
              <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
                Add New Architecture Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Villa Planning & Elevation"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy font-medium placeholder:text-muted-foreground/60"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto h-[42px] px-6 rounded-xl bg-[#E28A3E] hover:bg-[#c9742b] text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap flex-shrink-0"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          </form>

          {/* Categories Grid / Table */}
          <div className="bg-white rounded-2xl border border-border/80 shadow-xs overflow-hidden">
            <div className="p-4 bg-navy text-white uppercase text-[10px] tracking-wider font-semibold flex items-center justify-between">
              <span>Managed Categories ({categories.length})</span>
              <span className="text-slate-300 font-normal text-[10px] normal-case">First create categories, then assign architecture plans</span>
            </div>

            <div className="divide-y divide-border/60">
              {categories.map((cat) => (
                <div key={cat.id || cat._id} className="p-4 flex items-center justify-between hover:bg-background/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <Tag className="w-5 h-5 text-[#E28A3E]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy text-xs sm:text-sm">{cat.name}</h4>
                      <p className="text-[11px] text-muted-foreground">URL Slug: <span className="font-mono">{cat.slug}</span></p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <span className="px-3 py-1 rounded-full bg-navy/5 text-navy font-semibold text-xs border border-navy/10 whitespace-nowrap">
                      {cat.planCount || 0} Linked Plans
                    </span>

                    <button
                      onClick={() => promptDeleteCategory(cat)}
                      className="p-2 rounded-xl bg-background hover:bg-red-50 text-navy hover:text-red-600 transition-colors cursor-pointer border border-border/60"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
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

    </div>
  );
}
