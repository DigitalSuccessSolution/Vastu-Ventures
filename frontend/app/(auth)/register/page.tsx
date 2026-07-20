"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Loader2, Key, Mail, User, ArrowRight } from "lucide-react";

const schema = zod.object({
  name: zod.string().min(2, "Name must be at least 2 characters"),
  email: zod.string().email("Please enter a valid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: zod.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type FormData = zod.infer<typeof schema>;

import { Suspense } from "react";

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

      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1") + "/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email: data.email, password: data.password })
      });
      const resData = await res.json();
      
      if (!res.ok) {
        if (resData.errors && Array.isArray(resData.errors)) {
          let mappedField = false;
          resData.errors.forEach((err: any) => {
            if (err.field && err.message) {
              const fieldName = (err.field === "firstName" || err.field === "lastName") ? "name" : err.field;
              if (["name", "email", "password"].includes(fieldName)) {
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
    <div className="flex flex-col gap-6 text-left">
      <div>
        <h2 className="font-serif text-xl font-bold text-navy">Create Account</h2>
        <p className="text-xs text-muted-foreground mt-1 font-light">Join the Academy and start spatial architecture studies.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {serverError && (
          <div className="bg-red-50 text-red-600 border border-red-200 text-xs p-3 rounded-lg">
            {serverError}
          </div>
        )}
        {/* Full Name */}
        <div>
          <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
            Full Name
          </label>
          <div className="relative flex items-center">
            <User className="absolute left-3 w-4 h-4 text-primary" />
            <input
              type="text"
              {...register("name")}
              placeholder="John Doe"
              className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy"
            />
          </div>
          {errors.name && (
            <span className="text-[10px] text-destructive mt-1 block">{errors.name.message}</span>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
            Email Address
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
          <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
            Password
          </label>
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

        {/* Confirm Password */}
        <div>
          <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
            Confirm Password
          </label>
          <div className="relative flex items-center">
            <Key className="absolute left-3 w-4 h-4 text-primary" />
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="••••••••"
              className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy"
            />
          </div>
          {errors.confirmPassword && (
            <span className="text-[10px] text-destructive mt-1 block">{errors.confirmPassword.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gold-gradient text-white text-xs font-semibold rounded-xl shadow-premium hover:shadow-premium-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Creating account...
            </>
          ) : (
            <>
              Register <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
      {/* Footer link */}
      <div className="border-t border-border/60 pt-4 text-center text-xs font-light text-muted-foreground mt-2">
        Already have an account?{" "}
        <Link href={redirectPath ? `/login?redirect=${encodeURIComponent(redirectPath)}` : "/login"} className="font-semibold text-primary hover:text-gold-end">
          Log in
        </Link>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>}>
      <RegisterForm />
    </Suspense>
  );
}
