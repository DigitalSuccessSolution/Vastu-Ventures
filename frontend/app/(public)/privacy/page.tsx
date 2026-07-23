"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-sm md:text-base text-navy/70 font-light leading-relaxed">
            Vastu Ventures ("We", "Us", "Our") is committed to protecting your personal data, property floor plans, and privacy.
          </p>
        </div>

        {/* Text Content */}
        <div className="text-sm md:text-base text-navy leading-relaxed font-light space-y-8">
          
          {/* Section 1 */}
          <div>
            <h2 className="font-serif text-xl font-bold text-navy mb-3">
              1. Information We Collect
            </h2>
            <p className="text-navy/85 mb-3">
              We collect information necessary to deliver Vastu consultation services, manage online course enrollments, and respond to your inquiries.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-navy/85">
              <li><strong>Personal Details:</strong> Name, email address, phone number, and billing address.</li>
              <li><strong>Property Data:</strong> Floor plans, compass directional data, site photographs, and property descriptions submitted for Vastu audits.</li>
              <li><strong>Learning Progress:</strong> Course enrollments, video watching history, quiz completions, and certificate issuance records.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device details, and page visitation logs.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="font-serif text-xl font-bold text-navy mb-3">
              2. How We Use Your Information
            </h2>
            <p className="text-navy/85 mb-3">
              Your information is used strictly for legitimate business and service delivery purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-navy/85">
              <li>Providing customized Vastu remedies, layout reports, and scheduled consultation sessions.</li>
              <li>Granting access to enrolled online courses and tracking student certification progress.</li>
              <li>Processing payments securely and issuing tax invoices.</li>
              <li>Communicating important service updates, booking confirmations, and customer support responses.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="font-serif text-xl font-bold text-navy mb-3">
              3. Confidentiality of Property Floor Plans
            </h2>
            <p className="text-navy/85 mb-3">
              We respect the confidentiality of your property layouts, blueprints, and personal structural information.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-navy/85">
              <li>All floor plans submitted for evaluation are stored securely in encrypted cloud directories.</li>
              <li>Floor plans are accessed exclusively by assigned Vastu consultants for diagnostic purposes.</li>
              <li>We never publish, sell, or share client floor plans as public marketing materials without explicit written consent.</li>
              <li>Clients may request complete removal of their uploaded floor plans upon consultation completion.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="font-serif text-xl font-bold text-navy mb-3">
              4. Data Sharing & Third-Party Service Providers
            </h2>
            <p className="text-navy/85 mb-3">
              We do not sell, trade, or rent your personal information to third-party data brokers. We share data only with authorized service providers needed to operate our platform:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-navy/85">
              <li><strong>Payment Gateways:</strong> Authorized payment processors (Razorpay, Stripe) to process transaction payments securely.</li>
              <li><strong>Cloud Infrastructure:</strong> Secure cloud servers hosting our encrypted database and video content.</li>
              <li><strong>Legal Compliance:</strong> Disclosures made strictly when required by applicable law, court order, or governmental regulations.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="font-serif text-xl font-bold text-navy mb-3">
              5. Cookies & Session Storage
            </h2>
            <p className="text-navy/85">
              Our website uses basic session cookies and local storage to keep you logged in, save your course progress, and analyze general website traffic patterns. You can manage or disable cookies through your browser settings, though some portal features may require cookies to function properly.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="font-serif text-xl font-bold text-navy mb-3">
              6. Data Security Safeguards
            </h2>
            <p className="text-navy/85">
              We maintain appropriate technical security measures to safeguard your personal data. All online data transfers are protected with SSL/TLS encryption, passwords are securely hashed, and administrative access is strictly restricted.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="font-serif text-xl font-bold text-navy mb-3">
              7. Data Retention & Your Rights
            </h2>
            <p className="text-navy/85 mb-3">
              We retain your personal data only as long as necessary to fulfill the services requested or comply with statutory accounting laws.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-navy/85">
              <li><strong>Access & Rectification:</strong> You can request a copy of your personal data or update inaccurate profile details.</li>
              <li><strong>Deletion:</strong> You have the right to request deletion of your account and property floor plans at any time.</li>
            </ul>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="font-serif text-xl font-bold text-navy mb-3">
              8. Contact Us
            </h2>
            <p className="text-navy/85 mb-2">
              If you have any questions or data privacy requests regarding this Privacy Policy, please contact us:
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


