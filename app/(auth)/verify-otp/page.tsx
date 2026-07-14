"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck, ArrowRight } from "lucide-react";

export default function VerifyOtpPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 4) {
      alert("Please enter a valid verification code.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      console.log("OTP code verified:", code);
      setLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 text-left animate-fade-in-up">
      <div>
        <h2 className="font-serif text-xl font-bold text-navy flex items-center gap-1.5">
          <ShieldCheck className="w-5 h-5 text-primary" /> Verify Your Email
        </h2>
        <p className="text-xs text-muted-foreground mt-1 font-light">
          We have sent a verification code to your email. Enter the code below to complete registration.
        </p>
      </div>

      <form onSubmit={handleVerify} className="flex flex-col gap-4">
        <div>
          <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5 text-center">
            Verification Code
          </label>
          <input
            type="text"
            required
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="e.g. 123456"
            className="w-full text-center tracking-widest text-lg font-bold px-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary text-navy"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gold-gradient text-white text-xs font-semibold rounded-xl shadow-premium hover:shadow-premium-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
            </>
          ) : (
            <>
              Confirm Code <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="border-t border-border/60 pt-4 text-center text-xs font-light text-muted-foreground">
        Didn't receive the email?{" "}
        <button
          type="button"
          onClick={() => alert("Mock OTP resent successfully!")}
          className="font-semibold text-primary hover:text-gold-end cursor-pointer"
        >
          Resend code
        </button>
      </div>
    </div>
  );
}
