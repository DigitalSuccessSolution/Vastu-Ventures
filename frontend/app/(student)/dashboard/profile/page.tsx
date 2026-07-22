"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { CheckCircle2, Loader2, Save, User, Mail, Phone, Camera } from "lucide-react";
import api from "@/lib/axios";
import { useAuthStore } from "@/lib/store";

const schema = zod.object({
  name: zod.string().min(2, "Name must be at least 2 characters"),
  email: zod.string().email("Please enter a valid email address"),
  phone: zod.string().optional(),
});

type FormData = zod.infer<typeof schema>;

export default function ProfileSettingsPage() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [fetching, setFetching] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, updateUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/users/profile");
        if (data.success) {
          updateUser(data.data);
          reset({
            name: data.data.name || "",
            email: data.data.email || "",
            phone: data.data.phone || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setFetching(false);
      }
    };
    if (user && user.role === "student") {
      fetchProfile();
    } else {
      setFetching(false);
    }
  }, [user, reset, updateUser]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setSuccess(false);
    try {
      const res = await api.put("/users/profile", data);
      if (res.data.success) {
        updateUser(res.data.data);
        setSuccess(true);
      }
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    setUploadingAvatar(true);
    try {
      const res = await api.put("/users/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        updateUser({ avatar: res.data.data });
      }
    } catch (err: any) {
      console.error("Failed to upload avatar", err.response?.data || err);
      alert(`Failed to upload avatar: ${err.response?.data?.message || err.message}`);
    } finally {
      setUploadingAvatar(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  if (fetching) {
    return (
      <div className="py-16 text-center flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-7 h-7 animate-spin text-primary" />
        <p className="text-xs text-navy font-medium">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto">
      {/* Clean Page Header */}
      <div className="mb-6 text-left">
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-navy">Profile Settings</h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal mt-1">
          Manage your personal details, email preferences, and profile photo.
        </p>
      </div>

      {/* Main Profile Form Card */}
      <div className="bg-white border border-border/80 rounded-2xl p-6 sm:p-8 shadow-sm w-full">
        {success && (
          <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Profile settings updated successfully!</span>
          </div>
        )}

        {/* Avatar Section */}
        <div className="flex items-center gap-5 mb-8 pb-6 border-b border-border/60">
          <div className="relative group shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30 p-0.5 bg-white">
              <img
                src={user?.avatar?.url || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || user?.email || "User") + "&background=E28A3E&color=fff"}
                alt={user?.name || "User"}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleAvatarUpload}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingAvatar}
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-navy hover:bg-navy-light text-white flex items-center justify-center shadow transition-all cursor-pointer disabled:opacity-50"
              title="Upload Photo"
            >
              {uploadingAvatar ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
              ) : (
                <Camera className="w-3.5 h-3.5 text-primary" />
              )}
            </button>
          </div>

          <div>
            <h2 className="text-base font-semibold text-navy">{user?.name || user?.email || "Student"}</h2>
            <p className="text-xs text-muted-foreground font-normal mt-0.5">{user?.email}</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingAvatar}
              className="mt-2 text-xs font-semibold text-primary hover:underline cursor-pointer"
            >
              {uploadingAvatar ? "Uploading photo..." : "Change Profile Photo"}
            </button>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 max-w-xl">
          <div>
            <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                <User className="w-4 h-4 text-primary" />
              </div>
              <input
                type="text"
                {...register("name")}
                className="w-full text-xs sm:text-sm pl-10 pr-3.5 py-3 rounded-xl border border-border/80 bg-[#FAF9F6] focus:bg-white outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-navy font-medium"
                placeholder="Enter full name"
              />
            </div>
            {errors.name && (
              <span className="text-[11px] text-red-500 font-normal mt-1 block">{errors.name?.message as string}</span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <input
                type="email"
                {...register("email")}
                className="w-full text-xs sm:text-sm pl-10 pr-3.5 py-3 rounded-xl border border-border/80 bg-[#FAF9F6] focus:bg-white outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-navy font-medium"
                placeholder="name@example.com"
              />
            </div>
            {errors.email && (
              <span className="text-[11px] text-red-500 font-normal mt-1 block">{errors.email.message}</span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <input
                type="tel"
                {...register("phone")}
                className="w-full text-xs sm:text-sm pl-10 pr-3.5 py-3 rounded-xl border border-border/80 bg-[#FAF9F6] focus:bg-white outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-navy font-medium"
                placeholder="+91 98765 43210"
              />
            </div>
            {errors.phone && (
              <span className="text-[11px] text-red-500 font-normal mt-1 block">{errors.phone.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-gold-gradient text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Profile Details
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
