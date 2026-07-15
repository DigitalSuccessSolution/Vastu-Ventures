"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Loader2, Key, Mail, ArrowRight } from "lucide-react";

const schema = zod.object({
  email: zod.string().email("Please enter a valid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters")
});

type FormData = zod.infer<typeof schema>;

export default function LoginPage() {
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
      console.log("Login success:", data);
      setLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      <div>
        <h2 className="font-serif text-xl font-bold text-navy">Welcome Back</h2>
        <p className="text-xs text-muted-foreground mt-1 font-light">Access your certified courses and appointment history.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-[10px] font-semibold text-primary hover:text-gold-end"
            >
              Forgot Password?
            </Link>
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
          className="w-full py-3 bg-gold-gradient text-white text-xs font-semibold rounded-xl shadow-premium hover:shadow-premium-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Logging in...
            </>
          ) : (
            <>
              Sign In <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="border-t border-border/60 pt-4 text-center text-xs font-light text-muted-foreground">
        Don't have an account?{" "}
        <Link href="/register" className="font-semibold text-primary hover:text-gold-end">
          Register here
        </Link>
      </div>
    </div>
  );
}
