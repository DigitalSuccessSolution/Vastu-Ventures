"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Loader2, Key, Mail, ArrowRight, ShieldAlert, GraduationCap } from "lucide-react";
import { useAuthStore } from "@/lib/store";

const schema = zod.object({
  email: zod.string().email("Please enter a valid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters")
});

type FormData = zod.infer<typeof schema>;

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"student" | "admin">("admin"); // Default to admin for user's convenience
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get("registered") === "true";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({ 
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const handleModeChange = (newMode: "student" | "admin") => {
    setMode(newMode);
    reset({
      email: "",
      password: ""
    });
  };

  const [serverError, setServerError] = useState("");
  const loginAction = useAuthStore((state: any) => state.login);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setServerError("");
    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1") + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password })
      });
      const resData = await res.json();
      
      if (!res.ok) {
        throw new Error(resData.message || "Login failed");
      }
      
      // Store user and token using Zustand
      loginAction(resData.data.user, resData.data.accessToken);

      const redirectPath = searchParams.get("redirect");
      if (redirectPath) {
        router.push(redirectPath);
      } else if (resData.data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setServerError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
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
        {isRegistered && !serverError && (
          <div className="bg-green-50 text-green-700 border border-green-200 text-xs p-3 rounded-lg font-semibold">
            Registration successful! Please sign in.
          </div>
        )}
        {serverError && (
          <div className="bg-red-50 text-red-600 border border-red-200 text-xs p-3 rounded-lg">
            {serverError}
          </div>
        )}
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
              placeholder="name@example.com"
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
              <Link href={searchParams.get("redirect") ? `/register?redirect=${searchParams.get("redirect")}` : "/register"} className="font-semibold text-primary hover:text-gold-end">
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

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
