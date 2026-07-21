"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Loader2, Key, Mail, ArrowRight, ShieldAlert } from "lucide-react";
import { useAuthStore } from "@/lib/store";

const schema = zod.object({
  email: zod.string().email("Please enter a valid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters")
});

type FormData = zod.infer<typeof schema>;

function AdminLoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ 
    resolver: zodResolver(schema),
    defaultValues: {
      email: "admin@vastuventures.com",
      password: "adminpassword"
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
      
      if (resData.data.user.role !== "admin") {
        throw new Error("Unauthorized access. Admin privileges required.");
      }
      
      // Store user and token using Zustand
      loginAction(resData.data.user, resData.data.accessToken);

      const redirectPath = searchParams.get("redirect");
      if (redirectPath) {
        router.push(redirectPath);
      } else {
        router.push("/admin");
      }
    } catch (err: any) {
      setServerError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#FDFBF7]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-premium p-8">
        <div className="flex flex-col gap-6 text-left">
          <div className="text-center">
            <ShieldAlert className="w-12 h-12 text-navy mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-navy flex items-center justify-center gap-1.5">
              Admin Portal
            </h2>
            <p className="text-xs text-muted-foreground mt-1.5 font-light">
              Secure access for administrators only.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {serverError && (
              <div className="bg-red-50 text-red-600 border border-red-200 text-xs p-3 rounded-lg">
                {serverError}
              </div>
            )}
            
            <div>
              <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
                Admin Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-4 h-4 text-primary" />
                <input
                  type="email"
                  {...register("email")}
                  placeholder="admin@vastuventures.com"
                  className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy"
                />
              </div>
              {errors.email && (
                <span className="text-[10px] text-destructive mt-1 block">{errors.email.message}</span>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
                Secret Passkey
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-white text-xs font-semibold rounded-xl shadow-premium hover:shadow-premium-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 mt-2 bg-navy hover:bg-navy-light"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Verifying Access...
                </>
              ) : (
                <>
                  Authorize & Enter <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="border-t border-border/60 pt-4 text-center text-xs font-light text-muted-foreground flex justify-between items-center">
            <span>Access Level: Root Admin</span>
            <Link href="/" className="font-semibold text-primary hover:text-gold-end">
              Return to Main Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-8 min-h-screen items-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
