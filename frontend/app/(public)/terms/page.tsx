"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function TermsPage() {
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
          Terms & Conditions
        </h1>
        <div className="prose max-w-none text-sm md:text-base text-navy leading-relaxed font-light flex flex-col gap-6">
          <p>
            Welcome to Vastu Ventures ("Website", "Academy", "Services"). These Terms and Conditions govern your access to and use of our consulting packages, online video courses, and materials provided by Vastu Ventures.
          </p>
          <div>
            <h3 className="font-serif text-base font-bold text-navy mb-2">1. Consultation Services</h3>
            <p>
              Vastu consultations are advisory in nature. We provide layout energy evaluations based on traditional Vedic texts and modern space diagnostic theories. Recommendations are designed to optimize space flow and elements. We do not promise legal, medical, or direct financial outcomes.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-navy mb-2">2. Education Academy & Enrollments</h3>
            <p>
              Course enrollments provide personal, non-exclusive lifetime access to video lectures, worksheets, and online curriculum. Commercial sharing or redistribution of curriculum material is strictly prohibited.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-navy mb-2">3. Refund Policy</h3>
            <p>
              Our online courses include a 14-day money-back guarantee. If you are not satisfied with the course material, you may request a refund within 14 days of purchase. No refunds will be provided after 14 days.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
