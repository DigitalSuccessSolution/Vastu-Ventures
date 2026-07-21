"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Loader2, Key, Mail, User, Phone, ArrowRight, CheckCircle2 } from "lucide-react";

const schema = zod.object({
  name: zod.string().min(2, "Name must be at least 2 characters"),
  phone: zod.string().min(10, "Phone number is required").optional(),
  email: zod.string().email("Please enter a valid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: zod.string(),
  terms: zod.literal(true, {
    errorMap: () => ({ message: "You must accept terms & conditions" }),
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type FormData = zod.infer<typeof schema>;

function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [serverError, setServerError] = useState("");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setServerError("");
    try {
      const nameParts = data.name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || firstName; // Fallback to firstName if no lastName

      const payload = {
        firstName,
        lastName,
        email: data.email,
        phone: data.phone,
        password: data.password
      };

      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1") + "/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const resData = await res.json();

      if (!res.ok) {
        if (resData.errors && Array.isArray(resData.errors)) {
          let mappedField = false;
          resData.errors.forEach((err: any) => {
            if (err.field && err.message) {
              const fieldName = (err.field === "firstName" || err.field === "lastName") ? "name" : err.field;
              if (["name", "email", "password", "phone"].includes(fieldName)) {
                setError(fieldName as any, { type: "server", message: err.message });
                mappedField = true;
              }
            }
          });

          if (mappedField) {
            setLoading(false);
            return;
          }

          const firstErr = typeof resData.errors[0] === "string" ? resData.errors[0] : resData.errors[0].message;
          throw new Error(firstErr || resData.message || "Validation failed");
        }
        throw new Error(resData.message || "Registration failed");
      }

      // Pass email to login page via query param for convenience
      const url = `/login?email=${encodeURIComponent(data.email)}&registered=true${redirectPath ? `&redirect=${encodeURIComponent(redirectPath)}` : ""}`;
      router.push(url);
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
              Create Your Account
            </h1>
            <h2 className="font-serif text-2xl font-semibold text-gold-end mb-6">
              Begin your journey with VastuVentures
            </h2>
            <p className="text-sm text-navy/80 font-light max-w-sm mb-10 leading-relaxed">
              Join thousands of people who have transformed their lives by aligning their spaces with ancient Vastu wisdom.
            </p>

            <ul className="flex flex-col gap-5">
              <li className="flex items-center gap-3 text-sm text-navy/90 font-medium">
                <CheckCircle2 className="w-5 h-5 text-gold-end" /> Personalized Vastu Solutions
              </li>
              <li className="flex items-center gap-3 text-sm text-navy/90 font-medium">
                <CheckCircle2 className="w-5 h-5 text-gold-end" /> Access to Online Courses
              </li>
              <li className="flex items-center gap-3 text-sm text-navy/90 font-medium">
                <CheckCircle2 className="w-5 h-5 text-gold-end" /> Book Consultations with Experts
              </li>
            </ul>
          </div>
        </div>

        {/* Right Pane - Form */}
        <div className="w-full lg:w-6/12 xl:w-5/12 max-w-[600px] bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] p-8 sm:p-10 relative my-auto shrink-0 mx-auto lg:mx-0">
          
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
              <h2 className="font-serif text-3xl font-bold text-navy mb-2">Create Account</h2>
              <p className="text-sm text-muted-foreground font-light">
                Fill in your details to get started
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              {serverError && (
                <div className="bg-red-50 text-red-600 border border-red-200 text-sm p-4 rounded-xl font-medium">
                  {serverError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-navy mb-2">
                    Full Name
                  </label>
                  <div className="relative flex items-center">
                    <User className="absolute left-4 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      {...register("name")}
                      placeholder="Enter your full name"
                      className="w-full text-sm pl-11 pr-4 py-3.5 rounded-xl border border-border bg-white focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy placeholder:text-muted-foreground/60"
                    />
                  </div>
                  {errors.name && (
                    <span className="text-xs text-destructive mt-1.5 block">{errors.name.message}</span>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-navy mb-2">
                    Phone Number
                  </label>
                  <div className="relative flex items-center">
                    <Phone className="absolute left-4 w-4 h-4 text-muted-foreground" />
                    <input
                      type="tel"
                      {...register("phone")}
                      placeholder="Enter your phone"
                      className="w-full text-sm pl-11 pr-4 py-3.5 rounded-xl border border-border bg-white focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy placeholder:text-muted-foreground/60"
                    />
                  </div>
                  {errors.phone && (
                    <span className="text-xs text-destructive mt-1.5 block">{errors.phone.message}</span>
                  )}
                </div>
              </div>

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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-navy mb-2">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <Key className="absolute left-4 w-4 h-4 text-muted-foreground" />
                    <input
                      type="password"
                      {...register("password")}
                      placeholder="Create a password"
                      className="w-full text-sm pl-11 pr-4 py-3.5 rounded-xl border border-border bg-white focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy placeholder:text-muted-foreground/60"
                    />
                  </div>
                  {errors.password && (
                    <span className="text-xs text-destructive mt-1.5 block">{errors.password.message}</span>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-semibold text-navy mb-2">
                    Confirm Password
                  </label>
                  <div className="relative flex items-center">
                    <Key className="absolute left-4 w-4 h-4 text-muted-foreground" />
                    <input
                      type="password"
                      {...register("confirmPassword")}
                      placeholder="Confirm your password"
                      className="w-full text-sm pl-11 pr-4 py-3.5 rounded-xl border border-border bg-white focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy placeholder:text-muted-foreground/60"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <span className="text-xs text-destructive mt-1.5 block">{errors.confirmPassword.message}</span>
                  )}
                </div>
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("terms")}
                    className="rounded border-border text-primary focus:ring-primary/20 accent-primary"
                  />
                  <span className="text-xs text-navy font-medium">
                    I agree to the <Link href="/terms" className="text-gold-end hover:text-primary transition-colors">Terms & Conditions</Link> and <Link href="/privacy" className="text-gold-end hover:text-primary transition-colors">Privacy Policy</Link>
                  </span>
                </label>
                {errors.terms && (
                  <span className="text-xs text-destructive mt-1.5 block">{errors.terms.message}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3.5 bg-navy hover:bg-navy-light text-white text-sm font-semibold rounded-xl shadow-premium hover:shadow-premium-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Creating account...
                  </>
                ) : (
                  <>
                    Create Account <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <span className="text-sm text-muted-foreground font-medium">
                Already have an account?{" "}
                <Link href={redirectPath ? `/login?redirect=${encodeURIComponent(redirectPath)}` : "/login"} className="font-semibold text-gold-end hover:text-primary transition-colors">
                  Sign In
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

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-8 min-h-screen items-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>}>
      <RegisterForm />
    </Suspense>
  );
}
