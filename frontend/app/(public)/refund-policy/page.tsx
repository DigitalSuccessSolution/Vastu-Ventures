"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Clock } from "lucide-react";

export default function RefundPolicyPage() {
  const shouldReduceMotion = useReducedMotion();

  const premiumEase = [0.16, 1, 0.3, 1] as const;

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: premiumEase }
    }
  };

  return (
    <div className="bg-background vastu-mandala-bg py-12 md:py-16 text-left text-navy">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <div className="mb-10 pb-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy mb-3">
            Refund Policy
          </h1>
          <p className="text-sm md:text-base text-navy/70 font-light leading-relaxed">
            At Vastu Ventures, we strive to deliver the highest quality Vastu consultations, architecture planning, and educational courses. Please review our refund guidelines below.
          </p>
        </div>

        {/* Text Content */}
        <div className="text-sm md:text-base text-navy leading-relaxed font-light space-y-8">
          
          {/* Section 1 */}
          <div>
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <span>1. Online Courses Refund Eligibility</span>
            </h2>
            <p className="text-navy/85 mb-3">
              We offer a straightforward refund policy for online Vastu courses to ensure complete peace of mind:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-navy/85">
              <li><strong>7-Day Window:</strong> You may request a 100% refund within 7 calendar days of course purchase if you are unsatisfied with the content.</li>
              <li><strong>Completion Threshold:</strong> Refunds apply provided you have watched less than 20% of the total course video lessons and have not downloaded official course certificates.</li>
              <li><strong>Non-Refundable:</strong> If more than 20% of lessons have been watched or a course completion certificate has been issued, the fee is non-refundable.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="font-serif text-xl font-bold text-navy mb-3">
              2. Vastu Consultations & Site Audits
            </h2>
            <p className="text-navy/85 mb-3">
              Refund terms for online and offline Vastu consultation services:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-navy/85">
              <li><strong>Before Scheduling:</strong> Full refund (100%) if cancellation is requested before the expert team schedules your site visit or virtual consultation session.</li>
              <li><strong>24-Hour Notice:</strong> Cancellations made at least 24 hours before the scheduled consultation slot are eligible for a 80% refund or full store credit for future services.</li>
              <li><strong>Completed Consultations:</strong> Once the site audit, floor plan evaluation, or expert report has been delivered, consultation fees become non-refundable.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="font-serif text-xl font-bold text-navy mb-3">
              3. Architecture Planning & Custom Layouts
            </h2>
            <p className="text-navy/85 mb-3">
              Custom architectural layout blueprints involve dedicated design work by certified Vastu architects:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-navy/85">
              <li><strong>Initial Stage:</strong> Full refund if cancelled before drafting work commences.</li>
              <li><strong>Work-in-Progress:</strong> 50% refund if drafting has started but 2D/3D blueprints have not yet been delivered.</li>
              <li><strong>Final Delivery:</strong> No refunds are provided after CAD designs, 3D layouts, or final structural blueprints are transferred to the client.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="font-serif text-xl font-bold text-navy mb-3">
              4. Refund Processing Time & Method
            </h2>
            <p className="text-navy/85 mb-3">
              Approved refunds will be processed back to your original payment method (Credit/Debit Card, Net Banking, UPI, or Wallet via Razorpay).
            </p>
            <div className="p-4 bg-[#FAF6F0] border border-[#EDE3D0] rounded-2xl flex items-center gap-3 my-4">
              <Clock className="w-5 h-5 text-primary shrink-0" />
              <p className="text-xs sm:text-sm text-navy/90 font-medium">
                Refunds typically take <strong>5 to 7 business days</strong> to reflect in your bank account after approval.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="font-serif text-xl font-bold text-navy mb-3">
              5. Contact Information
            </h2>
            <p className="text-navy/85 mb-2">
              If you have any questions or wish to submit a refund request, please contact us:
            </p>
            <p className="text-navy/85">
              <strong>Email:</strong>{" "}
              <a href="mailto:ganeshparadkar0706@gmail.com" className="text-primary underline hover:text-gold-end transition-colors">
                ganeshparadkar0706@gmail.com
              </a>
            </p>
            <p className="text-navy/85">
              <strong>Phone:</strong>{" "}
              <a href="tel:+917049985097" className="text-primary underline hover:text-gold-end transition-colors">
                +91 70499 85097
              </a>
            </p>
            <p className="text-navy/85">
              <strong>Address:</strong> B-28, Near Symbiosis College, Tarodi Khurd, Kamptee, Nagpur - 441001
            </p>
          </div>

        </div>

      </motion.div>
    </div>
  );
}
