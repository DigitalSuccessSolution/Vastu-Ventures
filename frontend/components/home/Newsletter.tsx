"use client";

import React, { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribing email:", email);
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-8 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Navy Newsletter Strip Card */}
        <div className="bg-[#122B54] rounded-[24px] p-6 md:p-8 border border-white/5 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6 shadow-premium-lg">
          
          {/* Subtle line art overlay */}
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_center,var(--gold-start)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

          {/* Left Block: Emblem Icon and text header */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left z-10">
            {/* Concentric Gold Double Circle Emblem */}
            <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center border border-gold-start/40 rounded-full bg-white/5 shadow-sm">
              <div className="absolute inset-1 rounded-full border border-dashed border-gold-start/20" />
              {/* House / Vastu emblem SVG */}
              <svg className="w-5.5 h-5.5 text-gold-start" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18" />
              </svg>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Stay Updated with Vastu Tips & Insights
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light mt-1.5">
                Subscribe to our newsletter and never miss an update.
              </p>
            </div>
          </div>

          {/* Right Block: Input Form Bar */}
          <div className="w-full lg:w-auto max-w-md z-10">
            {subscribed ? (
              <div className="bg-white/10 backdrop-blur-sm border border-gold-start/35 rounded-xl px-4 py-2 text-center animate-fade-in-up">
                <span className="text-xs font-bold text-gold-start">Thank you! Subscribed successfully.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex items-center bg-white rounded-xl overflow-hidden p-1 w-full lg:w-[400px] shadow-sm border border-white/10"
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow bg-transparent text-navy text-sm placeholder:text-muted-foreground/60 px-3 outline-none py-2"
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E28A3E] hover:bg-[#C1791F] text-white text-xs sm:text-sm font-extrabold rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
