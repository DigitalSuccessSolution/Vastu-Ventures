"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";

const schema = zod.object({
  fullName: zod.string().min(2, "Name must be at least 2 characters"),
  email: zod.string().email("Please enter a valid email address"),
  phone: zod.string().min(10, "Phone number must be at least 10 digits"),
  spaceSize: zod.string().min(1, "Please specify approximate square footage"),
  message: zod.string().min(10, "Please describe your concerns in at least 10 characters")
});

type FormData = zod.infer<typeof schema>;

export default function ServiceInquiryForm({ serviceTitle }: { serviceTitle: string }) {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    setLoading(true);
    // Mock submit delay
    setTimeout(() => {
      console.log("Inquiry submitted:", { service: serviceTitle, ...data });
      setLoading(false);
      setSuccess(true);
      reset();
    }, 1200);
  };

  if (success) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-border shadow-premium text-center flex flex-col items-center gap-4 animate-fade-in-up">
        <div className="w-12 h-12 rounded-full bg-accent/15 text-accent flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-lg font-bold text-navy">Inquiry Received</h3>
        <p className="text-xs text-muted-foreground leading-relaxed font-light">
          Thank you! Our Vastu specialists will review your layout specifications and contact you via email or phone within 24 hours.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-2 text-xs font-semibold text-primary hover:text-gold-end cursor-pointer"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border rounded-2xl p-6 shadow-premium">
      <h3 className="font-serif text-lg font-bold text-navy mb-1.5">Request Consultation</h3>
      <p className="text-xs text-muted-foreground mb-6 font-light">Fill out your space details to get a personalized audit estimate.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-left">
        {/* Full Name */}
        <div>
          <label className="block text-[11px] font-semibold text-navy uppercase tracking-wider mb-1">
            Full Name
          </label>
          <input
            type="text"
            {...register("fullName")}
            placeholder="John Doe"
            className="w-full text-xs px-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy"
          />
          {errors.fullName && (
            <span className="text-[10px] text-destructive mt-1 block">{errors.fullName.message}</span>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-[11px] font-semibold text-navy uppercase tracking-wider mb-1">
            Email Address
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="john@example.com"
            className="w-full text-xs px-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy"
          />
          {errors.email && (
            <span className="text-[10px] text-destructive mt-1 block">{errors.email.message}</span>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-[11px] font-semibold text-navy uppercase tracking-wider mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            {...register("phone")}
            placeholder="+1 (555) 000-0000"
            className="w-full text-xs px-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy"
          />
          {errors.phone && (
            <span className="text-[10px] text-destructive mt-1 block">{errors.phone.message}</span>
          )}
        </div>

        {/* Space Size */}
        <div>
          <label className="block text-[11px] font-semibold text-navy uppercase tracking-wider mb-1">
            Approximate Space Size (Sq. Ft.)
          </label>
          <input
            type="text"
            {...register("spaceSize")}
            placeholder="e.g. 1,500 sq ft or 3 BHK"
            className="w-full text-xs px-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy"
          />
          {errors.spaceSize && (
            <span className="text-[10px] text-destructive mt-1 block">{errors.spaceSize.message}</span>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-[11px] font-semibold text-navy uppercase tracking-wider mb-1">
            Specific Vastu Issues / Main Concerns
          </label>
          <textarea
            rows={4}
            {...register("message")}
            placeholder="Describe any specific issues (e.g., entrance direction, kitchen location, or health/career blockages)..."
            className="w-full text-xs px-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy resize-none"
          />
          {errors.message && (
            <span className="text-[10px] text-destructive mt-1 block">{errors.message.message}</span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gold-gradient text-white text-xs font-semibold rounded-xl shadow-premium hover:shadow-premium-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4.5 h-4.5 animate-spin" /> Sending Request...
            </>
          ) : (
            <>
              Send Inquiry <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
