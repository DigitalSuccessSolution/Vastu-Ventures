"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, CheckCircle2, Loader2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      console.log("Password reset email sent to:", email);
      setLoading(false);
      setSent(true);
    }, 1000);
  };

  if (sent) {
    return (
      <div className="flex flex-col gap-6 text-center animate-fade-in-up py-4">
        <div className="w-12 h-12 rounded-full bg-accent/15 text-accent flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-serif text-xl font-bold text-navy">Check Your Inbox</h2>
          <p className="text-xs text-muted-foreground mt-2 font-light leading-relaxed">
            We have dispatched password reset credentials to <span className="font-semibold text-navy">{email}</span>. Click the attached link to configure a new password.
          </p>
        </div>
        <div className="border-t border-border/60 pt-4">
          <Link
            href="/login"
            className="text-xs font-semibold text-primary hover:text-gold-end flex items-center justify-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 text-left">
      <div>
        <h2 className="font-serif text-xl font-bold text-navy">Forgot Password</h2>
        <p className="text-xs text-muted-foreground mt-1 font-light">Specify your email below and we will dispatch a reset link.</p>
      </div>

      <form onSubmit={handleReset} className="flex flex-col gap-4">
        <div>
          <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3 w-4 h-4 text-primary" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none text-navy"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gold-gradient text-white text-xs font-semibold rounded-xl shadow-premium hover:shadow-premium-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Delivering...
            </>
          ) : (
            "Request Reset Link"
          )}
        </button>
      </form>

      <div className="border-t border-border/60 pt-4 text-center">
        <Link
          href="/login"
          className="text-xs font-semibold text-primary hover:text-gold-end flex items-center justify-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>
      </div>
    </div>
  );
}
