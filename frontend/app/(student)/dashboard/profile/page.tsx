"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { CheckCircle2, Loader2, Save } from "lucide-react";
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
    fetchProfile();
  }, [reset, updateUser]);

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
    return <div className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" /></div>;
  }

  return (
    <div className="flex flex-col gap-8 text-left max-w-2xl">
      <div>
        <h2 className="font-serif text-2xl font-bold text-navy">My Profile</h2>
        <p className="text-xs text-muted-foreground mt-1 font-light">
          Manage your personal details, email preferences, and billing credentials.
        </p>
      </div>

      <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-premium">
        
        {success && (
          <div className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-xl text-xs text-accent font-semibold flex items-center gap-2 animate-fade-in-up">
            <CheckCircle2 className="w-4.5 h-4.5" />
            Profile settings updated successfully!
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 pb-6 border-b border-border/60">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 shadow-premium flex-shrink-0">
            <img
              src={user?.avatar?.url || "https://ui-avatars.com/api/?name=" + (user?.name || "Student")}
              alt={user?.name || "Student"}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-navy">{user?.name || "Student"}</h4>
            <span className="text-[10px] text-muted-foreground font-light capitalize">{user?.role || "Student"}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleAvatarUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingAvatar}
              className="block mt-2 text-xs font-semibold text-primary hover:text-gold-end disabled:opacity-50 flex items-center gap-1.5"
            >
              {uploadingAvatar ? (
                <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading...</>
              ) : (
                "Upload New Photo"
              )}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                {...register("name")}
                className="w-full text-xs px-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy"
              />
              {errors.name && (
                <span className="text-[10px] text-destructive mt-1 block">{errors.name?.message as string}</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full text-xs px-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy"
            />
            {errors.email && (
              <span className="text-[10px] text-destructive mt-1 block">{errors.email.message}</span>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              {...register("phone")}
              className="w-full text-xs px-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy"
            />
            {errors.phone && (
              <span className="text-[10px] text-destructive mt-1 block">{errors.phone.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gold-gradient text-white text-xs font-semibold rounded-xl shadow-premium hover:shadow-premium-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="w-4.5 h-4.5 animate-spin" /> Saving Changes...
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
