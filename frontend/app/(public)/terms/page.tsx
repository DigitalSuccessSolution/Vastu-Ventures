"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function TermsPage() {
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
            Terms & Conditions
          </h1>
          <p className="text-sm md:text-base text-navy/70 font-light leading-relaxed">
            Welcome to Vastu Ventures. Please read these terms carefully before accessing or using our platform, consultation services, and educational courses.
          </p>
        </div>

        {/* Text Content */}
        <div className="text-sm md:text-base text-navy leading-relaxed font-light space-y-8">
          
          {/* Section 1 */}
          <div>
            <h2 className="font-serif text-xl font-bold text-navy mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-navy/85">
              By accessing or using the Vastu Ventures website, booking Vastu consultations, or enrolling in our online courses, you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, please do not use our website or services.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="font-serif text-xl font-bold text-navy mb-3">
              2. User Accounts & Security
            </h2>
            <p className="text-navy/85 mb-3">
              To access enrolled courses, view consultation reports, or interact with student features, you may need to register an account.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-navy/85">
              <li>You agree to provide accurate, current, and complete information during registration.</li>
              <li>You are responsible for maintaining the confidentiality of your account password and login credentials.</li>
              <li>Account sharing or multi-user access under a single account is strictly prohibited.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="font-serif text-xl font-bold text-navy mb-3">
              3. Vastu Consultation Services & Advisory Disclaimer
            </h2>
            <p className="text-navy/85 mb-3">
              Vastu Ventures provides spatial evaluation, layout analysis, and directional guidance based on traditional Vastu Shastra principles and spatial energy dynamics for residential, commercial, and industrial properties.
            </p>
            <p className="text-navy/85 mb-3 font-normal">
              <strong>Advisory Nature Disclaimer:</strong> Vastu consultations are advisory in nature. Recommendations aim to harmonize space flow and natural elements. Vastu guidance is not a substitute for professional architectural engineering, legal counsel, or medical advice, and does not guarantee specific financial or life outcomes. Clients exercise their own discretion when implementing structural or spatial modifications.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-navy/85">
              <li>Clients are responsible for providing accurate property floor plans and direction details.</li>
              <li>Vastu Ventures is not liable for recommendations derived from inaccurate site inputs provided by the client.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="font-serif text-xl font-bold text-navy mb-3">
              4. Vastu Academy & Online Courses
            </h2>
            <p className="text-navy/85 mb-3">
              Enrolling in an online course grants you a personal, non-exclusive, non-transferable license to access course lectures, worksheets, and study materials for personal learning purposes.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-navy/85">
              <li>Course content cannot be redistributed, resold, or shared publicly.</li>
              <li>Certificates of completion are issued upon fulfilling specified curriculum requirements.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="font-serif text-xl font-bold text-navy mb-3">
              5. Intellectual Property Rights
            </h2>
            <p className="text-navy/85">
              All materials published on Vastu Ventures—including video lectures, text articles, custom floor plan diagrams, graphics, logos, and website design—are the exclusive intellectual property of Vastu Ventures and protected by copyright laws. Downloading, screen recording, or copying course videos and proprietary templates is strictly prohibited.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="font-serif text-xl font-bold text-navy mb-3">
              6. Payments, Pricing & Taxes
            </h2>
            <p className="text-navy/85">
              Prices for consultation packages and courses are listed on our website and are payable in INR or converted currency at checkout. All payments are processed through secure payment gateways. Applicable taxes are included or calculated at checkout per statutory requirements.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="font-serif text-xl font-bold text-navy mb-3">
              7. Cancellation & Refund Policy
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-navy/85">
              <li>
                <strong>Online Courses:</strong> We offer a 14-day money-back guarantee for online courses. Refund requests must be made within 14 days of purchase, provided less than 30% of total video content has been viewed.
              </li>
              <li>
                <strong>Consultations:</strong> Appointments can be rescheduled or cancelled up to 48 hours prior to the scheduled session. Once a consultation audit or live session has been completed, consultation fees are non-refundable.
              </li>
            </ul>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="font-serif text-xl font-bold text-navy mb-3">
              8. User Conduct & Acceptable Use
            </h2>
            <p className="text-navy/85">
              Users agree to use the website lawfully and respectfully. You must not post abusive content in student forums, attempt to compromise website security, or use automated scripts to scrape platform data.
            </p>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="font-serif text-xl font-bold text-navy mb-3">
              9. Limitation of Liability
            </h2>
            <p className="text-navy/85">
              To the maximum extent permitted by law, Vastu Ventures shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services or implementation of Vastu suggestions. Our maximum liability for any claim shall not exceed the total amount paid by you for the specific service or course.
            </p>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="font-serif text-xl font-bold text-navy mb-3">
              10. Governing Law
            </h2>
            <p className="text-navy/85">
              These Terms and Conditions are governed by the laws of India. Any legal disputes or claims shall be subject to the exclusive jurisdiction of the courts located in Nagpur, Maharashtra, India.
            </p>
          </div>

          {/* Section 11 */}
          <div>
            <h2 className="font-serif text-xl font-bold text-navy mb-3">
              11. Contact Information
            </h2>
            <p className="text-navy/85 mb-2">
              If you have any questions regarding these Terms & Conditions, please contact us:
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


