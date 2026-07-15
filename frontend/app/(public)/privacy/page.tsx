"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function PrivacyPage() {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.16, 1, 0.3, 1] as const;

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: premiumEase }
    }
  };

  return (
    <div className="bg-background vastu-mandala-bg py-16 text-left">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariants}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h1 className="font-serif text-3xl font-bold text-navy mb-8 border-b border-border pb-4">
          Privacy Policy
        </h1>
        <div className="prose max-w-none text-sm md:text-base text-navy leading-relaxed font-light flex flex-col gap-6">
          <p>
            Vastu Ventures respects your privacy and is committed to protecting the personal information you share with us during consultations, course sign-ups, and form submissions.
          </p>
          <div>
            <h3 className="font-serif text-base font-bold text-navy mb-2">1. Information We Collect</h3>
            <p>
              We collect names, emails, phone numbers, and physical property floor plans submitted during service booking or contact forms. Floor plans are used strictly for diagnostic space mapping and deleted upon consultation conclusion or stored on secure local caches per client preferences.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-navy mb-2">2. How We Use Information</h3>
            <p>
              Your personal data is used to process bookings, send course credentials, dispatch physical auditing kits, and respond to support queries. We do not sell or lease client details to third-party databases.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-navy mb-2">3. Cookies & Logging</h3>
            <p>
              Our website uses basic cookies to persist user portal session logs. Analytical services like Google Analytics measure visitor metrics.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
