"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { CheckCircle2, Loader2, Save, User } from "lucide-react";

const schema = zod.object({
  firstName: zod.string().min(2, "First name must be at least 2 characters"),
  lastName: zod.string().min(2, "Last name must be at least 2 characters"),
  email: zod.string().email("Please enter a valid email address"),
  phone: zod.string().min(10, "Phone number must be at least 10 digits")
});

type FormData = zod.infer<typeof schema>;

export default function ProfileSettingsPage() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      firstName: "Priya",
      lastName: "Sharma",
      email: "priya@sharmadesign.com",
      phone: "9876543210"
    },
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    setLoading(true);
    setTimeout(() => {
      console.log("Profile updated:", data);
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-8 text-left max-w-2xl">
      <div>
        <h2 className="font-serif text-2xl font-bold text-navy">My Profile</h2>
        <p className="text-xs text-muted-foreground mt-1 font-light">
          Manage your personal details, email preferences, and billing credentials.
        </p>
      </div>

      <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-premium">
        
        {success && (
          <div className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-xl text-xs text-accent font-semibold flex items-center gap-2 animate-fade-in-up">
            <CheckCircle2 className="w-4.5 h-4.5" />
            Profile settings updated successfully!
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 pb-6 border-b border-border/60">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 shadow-premium flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
              alt="Priya Sharma"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-navy">Priya Sharma</h4>
            <span className="text-[10px] text-muted-foreground font-light">Student / Homeowner</span>
            <button
              onClick={() => alert("Image upload mock...")}
              className="block mt-2 text-xs font-semibold text-primary hover:text-gold-end"
            >
              Upload New Photo
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
                First Name
              </label>
              <input
                type="text"
                {...register("firstName")}
                className="w-full text-xs px-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy"
              />
              {errors.firstName && (
                <span className="text-[10px] text-destructive mt-1 block">{errors.firstName.message}</span>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                {...register("lastName")}
                className="w-full text-xs px-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy"
              />
              {errors.lastName && (
                <span className="text-[10px] text-destructive mt-1 block">{errors.lastName.message}</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full text-xs px-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy"
            />
            {errors.email && (
              <span className="text-[10px] text-destructive mt-1 block">{errors.email.message}</span>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              {...register("phone")}
              className="w-full text-xs px-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy"
            />
            {errors.phone && (
              <span className="text-[10px] text-destructive mt-1 block">{errors.phone.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gold-gradient text-white text-xs font-semibold rounded-xl shadow-premium hover:shadow-premium-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="w-4.5 h-4.5 animate-spin" /> Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Profile Details
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
