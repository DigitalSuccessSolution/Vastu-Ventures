"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Loader2, Key, Mail, ArrowRight, ShieldAlert, GraduationCap } from "lucide-react";

const schema = zod.object({
  email: zod.string().email("Please enter a valid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters")
});

type FormData = zod.infer<typeof schema>;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"student" | "admin">("admin"); // Default to admin for user's convenience
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({ 
    resolver: zodResolver(schema),
    defaultValues: {
      email: "admin@vastuventures.com",
      password: "adminpassword"
    }
  });

  const handleModeChange = (newMode: "student" | "admin") => {
    setMode(newMode);
    reset({
      email: newMode === "student" ? "student@vastuventures.com" : "admin@vastuventures.com",
      password: newMode === "student" ? "studentpassword" : "adminpassword"
    });
  };

  const onSubmit = (data: FormData) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mode === "admin") {
        console.log("Admin Login success:", data);
        localStorage.setItem("isAdminLoggedIn", "true");
        router.push("/admin");
      } else {
        console.log("Student Login success:", data);
        localStorage.setItem("isStudentLoggedIn", "true");
        router.push("/dashboard");
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      {/* Title */}
      <div>
        <h2 className="font-serif text-xl font-bold text-navy flex items-center gap-1.5">
          VastuVentures Sign In
        </h2>
        <p className="text-xs text-muted-foreground mt-1.5 font-light">
          Access your personalized dashboard. Switch portals below as needed.
        </p>
      </div>

      {/* Unified Switcher Pill Tab */}
      <div className="flex bg-background border border-border p-1 rounded-xl w-full">
        <button
          type="button"
          onClick={() => handleModeChange("student")}
          className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            mode === "student"
              ? "bg-gold-gradient text-white shadow-sm"
              : "text-navy hover:bg-background-alt/50"
          }`}
        >
          <GraduationCap className="w-4 h-4" /> Student Portal
        </button>
        <button
          type="button"
          onClick={() => handleModeChange("admin")}
          className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            mode === "admin"
              ? "bg-navy text-white shadow-sm"
              : "text-navy hover:bg-background-alt/50"
          }`}
        >
          <ShieldAlert className="w-4 h-4" /> Admin Portal
        </button>
      </div>

      {/* Main Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Email */}
        <div>
          <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
            {mode === "admin" ? "Admin Email Address" : "Student Email Address"}
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3 w-4 h-4 text-primary" />
            <input
              type="email"
              {...register("email")}
              placeholder={mode === "admin" ? "admin@vastuventures.com" : "student@vastuventures.com"}
              className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy"
            />
          </div>
          {errors.email && (
            <span className="text-[10px] text-destructive mt-1 block">{errors.email.message}</span>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider">
              {mode === "admin" ? "Secret Passkey" : "Password"}
            </label>
            {mode === "student" && (
              <Link
                href="/forgot-password"
                className="text-[10px] font-semibold text-primary hover:text-gold-end"
              >
                Forgot Password?
              </Link>
            )}
          </div>
          <div className="relative flex items-center">
            <Key className="absolute left-3 w-4 h-4 text-primary" />
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy"
            />
          </div>
          {errors.password && (
            <span className="text-[10px] text-destructive mt-1 block">{errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white text-xs font-semibold rounded-xl shadow-premium hover:shadow-premium-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 mt-2 ${
            mode === "admin" ? "bg-navy hover:bg-navy-light" : "bg-gold-gradient"
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Verifying Access...
            </>
          ) : (
            <>
              {mode === "admin" ? "Authorize & Enter" : "Sign In"} <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Footer info link */}
      <div className="border-t border-border/60 pt-4 text-center text-xs font-light text-muted-foreground flex justify-between items-center">
        <span>
          {mode === "student" ? (
            <>
              Don't have an account?{" "}
              <Link href="/register" className="font-semibold text-primary hover:text-gold-end">
                Register here
              </Link>
            </>
          ) : (
            "Access Level: Root Admin"
          )}
        </span>
        <Link href="/" className="font-semibold text-primary hover:text-gold-end">
          Return to Main Site
        </Link>
      </div>
    </div>
  );
}
