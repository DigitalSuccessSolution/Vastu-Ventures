"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Loader2, Key, CheckCircle2, ArrowRight } from "lucide-react";

const schema = zod.object({
  password: zod.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: zod.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type FormData = zod.infer<typeof schema>;

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    setLoading(true);
    setTimeout(() => {
      console.log("Password reset completed successfully");
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  if (success) {
    return (
      <div className="flex flex-col gap-6 text-center animate-fade-in-up py-4">
        <div className="w-12 h-12 rounded-full bg-accent/15 text-accent flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-serif text-xl font-bold text-navy">Password Configured</h2>
          <p className="text-xs text-muted-foreground mt-2 font-light leading-relaxed">
            Your login details have been updated. You can now use your new password.
          </p>
        </div>
        <div className="border-t border-border/60 pt-4">
          <Link
            href="/login"
            className="w-full py-3 bg-navy hover:bg-navy-light text-white text-xs font-semibold rounded-xl shadow-premium block text-center"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 text-left">
      <div>
        <h2 className="font-serif text-xl font-bold text-navy">Configure New Password</h2>
        <p className="text-xs text-muted-foreground mt-1 font-light">Set your new password details below.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* New Password */}
        <div>
          <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
            New Password
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
            Confirm New Password
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
              <Loader2 className="w-4 h-4 animate-spin" /> Saving password...
            </>
          ) : (
            <>
              Save Password <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
