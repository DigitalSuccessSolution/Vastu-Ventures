"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Loader2, Key, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "@/lib/store";

const schema = zod.object({
  email: zod.string().email("Please enter a valid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters")
});

type FormData = zod.infer<typeof schema>;

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get("registered") === "true";

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

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
    <div className="relative min-h-screen w-full flex items-center justify-end overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 bg-[url('/auth-bg.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent backdrop-blur-[2px]"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full flex justify-between items-center px-4 sm:px-12 lg:px-24">
        {/* Left Pane - Image & Branding */}
        <div className="hidden lg:flex flex-col w-6/12 xl:w-5/12 pt-4 pb-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 w-max mb-8">
            <img src="/logo.png" alt="Vastu Ventures Logo" className="h-18 w-auto object-contain" />
          </Link>

          {/* Typography */}
          <div>
            <h1 className="font-serif text-5xl font-semibold text-navy mb-4 leading-tight">
              Welcome Back
            </h1>
            <h2 className="font-serif text-2xl font-semibold text-gold-end mb-6">
              Glad to see you again!
            </h2>
            <p className="text-sm text-navy/80 font-light max-w-sm mb-10 leading-relaxed">
              Login to access your dashboard, manage your consultations, and continue your journey towards positive energy and prosperity.
            </p>

            <ul className="flex flex-col gap-5">
              <li className="flex items-center gap-3 text-sm text-navy/90 font-medium">
                <CheckCircle2 className="w-5 h-5 text-gold-end" /> Expert Vastu Consultation
              </li>
              <li className="flex items-center gap-3 text-sm text-navy/90 font-medium">
                <CheckCircle2 className="w-5 h-5 text-gold-end" /> Learn Vastu from Anywhere
              </li>
              <li className="flex items-center gap-3 text-sm text-navy/90 font-medium">
                <CheckCircle2 className="w-5 h-5 text-gold-end" /> Energize Your Space, Elevate Your Life
              </li>
            </ul>
          </div>
        </div>

        {/* Right Pane - Form */}
        <div className="w-full lg:w-5/12 xl:w-4/12 bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] p-8 sm:p-10 relative my-auto shrink-0 mx-auto lg:mx-0">
          
          {/* Back Button */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 hidden lg:block">
            <Link href="/" className="text-xs font-semibold text-muted-foreground hover:text-navy transition-colors flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              Back
            </Link>
          </div>

          {/* Mobile Logo */}
          <div className="lg:hidden mb-6 flex justify-center">
            <img src="/logo.png" alt="Vastu Ventures Logo" className="h-12 w-auto object-contain" />
          </div>

          <div>
            <div className="mb-8">
              <h2 className="font-serif text-3xl font-bold text-navy mb-2">Sign In</h2>
              <p className="text-sm text-muted-foreground font-light">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              {isRegistered && !serverError && (
                <div className="bg-green-50 text-green-700 border border-green-200 text-sm p-4 rounded-xl font-medium">
                  Registration successful! Please sign in.
                </div>
              )}
              {serverError && (
                <div className="bg-red-50 text-red-600 border border-red-200 text-sm p-4 rounded-xl font-medium">
                  {serverError}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-navy mb-2">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email"
                    className="w-full text-sm pl-11 pr-4 py-3.5 rounded-xl border border-border bg-white focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy placeholder:text-muted-foreground/60"
                  />
                </div>
                {errors.email && (
                  <span className="text-xs text-destructive mt-1.5 block">{errors.email.message}</span>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-navy mb-2">
                  Password
                </label>
                <div className="relative flex items-center mb-2">
                  <Key className="absolute left-4 w-4 h-4 text-muted-foreground" />
                  <input
                    type="password"
                    {...register("password")}
                    placeholder="Enter your password"
                    className="w-full text-sm pl-11 pr-4 py-3.5 rounded-xl border border-border bg-white focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy placeholder:text-muted-foreground/60"
                  />
                </div>
                <div className="flex justify-between items-center px-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-border text-primary focus:ring-primary/20 accent-primary" />
                    <span className="text-xs text-navy font-medium">Remember Me</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-gold-end hover:text-primary transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
                {errors.password && (
                  <span className="text-xs text-destructive mt-1.5 block">{errors.password.message}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3.5 bg-navy hover:bg-navy-light text-white text-sm font-semibold rounded-xl shadow-premium hover:shadow-premium-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Signing In...
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <span className="text-sm text-muted-foreground font-medium">
                Don't have an account?{" "}
                <Link href={searchParams.get("redirect") ? `/register?redirect=${searchParams.get("redirect")}` : "/register"} className="font-semibold text-gold-end hover:text-primary transition-colors">
                  Create Account
                </Link>
              </span>
            </div>

            {/* Mobile Decorative elements for right pane */}
            <div className="mt-4 text-center lg:hidden block">
              <Link href="/" className="text-xs font-semibold text-muted-foreground hover:text-navy transition-colors">Back</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-8 min-h-screen items-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
