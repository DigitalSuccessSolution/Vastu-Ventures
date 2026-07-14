"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    setLoading(true);
    setTimeout(() => {
      console.log("Registration success:", data);
      setLoading(false);
      router.push("/verify-otp");
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      <div>
        <h2 className="font-serif text-xl font-bold text-navy">Create Account</h2>
        <p className="text-xs text-muted-foreground mt-1 font-light">Join the Academy and start spatial architecture studies.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

      <div className="border-t border-border/60 pt-4 text-center text-xs font-light text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:text-gold-end">
          Login here
        </Link>
      </div>
    </div>
  );
}
