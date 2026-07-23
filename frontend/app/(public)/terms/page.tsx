"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  BookOpen,
  Scale,
  CreditCard,
  AlertCircle,
  HelpCircle,
  FileText,
  Lock,
  RefreshCw,
  Mail,
  ChevronRight,
  Sparkles
} from "lucide-react";

export default function TermsPage() {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.16, 1, 0.3, 1] as const;

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: premiumEase }
    }
  };

  const sections = [
    { id: "section-1", title: "1. Acceptance of Terms & Services Scope" },
    { id: "section-2", title: "2. User Accounts & Access Credentials" },
    { id: "section-3", title: "3. Vastu Consultation Services & Disclaimer" },
    { id: "section-4", title: "4. Vastu Academy & Course Enrollment" },
    { id: "section-5", title: "5. Intellectual Property Rights" },
    { id: "section-6", title: "6. Pricing, Payments & Taxes" },
    { id: "section-7", title: "7. Cancellation & Refund Policy" },
    { id: "section-8", title: "8. User Conduct & Community Rules" },
    { id: "section-9", title: "9. Limitation of Liability & Warranty Disclaimer" },
    { id: "section-10", title: "10. Third-Party Integrations & External Links" },
    { id: "section-11", title: "11. Account Termination & Suspension" },
    { id: "section-12", title: "12. Amendments to Terms" },
    { id: "section-13", title: "13. Governing Law & Dispute Resolution" },
    { id: "section-14", title: "14. Contact Information & Support" },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-background vastu-mandala-bg py-12 md:py-20 text-left text-navy">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header Badge & Title */}
        <div className="mb-10 text-center md:text-left border-b border-border pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy/5 text-navy text-xs font-semibold uppercase tracking-wider mb-4 border border-navy/10">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span>Legal Agreement & Terms of Service</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy tracking-tight mb-3">
            Terms & Conditions
          </h1>
          <p className="text-sm md:text-base text-navy/70 max-w-2xl font-light">
            Please read these terms carefully before accessing or using the Vastu Ventures platform, consultations, educational materials, and digital services.
          </p>

        </div>

        {/* Quick Navigation / Table of Contents */}
        <div className="mb-12 p-6 rounded-2xl bg-white/80 backdrop-blur border border-border shadow-sm">
          <h2 className="font-serif text-lg font-bold text-navy mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gold" />
            Quick Navigation & Table of Contents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-navy/80 font-medium">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className="flex items-center gap-2 py-1.5 px-3 rounded-lg hover:bg-navy/5 hover:text-navy transition-colors text-left group"
              >
                <ChevronRight className="w-3.5 h-3.5 text-navy/40 group-hover:text-gold transition-colors shrink-0" />
                <span className="truncate">{sec.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Container */}
        <div className="prose max-w-none text-sm md:text-base text-navy leading-relaxed flex flex-col gap-10">

          {/* Section 1 */}
          <section id="section-1" className="scroll-mt-24 p-6 rounded-2xl bg-white/60 border border-border">
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold" />
              1. Acceptance of Terms & Services Scope
            </h2>
            <p className="mb-3 text-navy/80">
              Welcome to <strong>Vastu Ventures</strong> ("Platform", "Website", "Academy", "We", "Us", or "Our"). By visiting our website, creating an account, enrolling in Vastu courses, or booking residential/commercial/industrial Vastu consultations, you agree to be bound by these Terms and Conditions ("Terms").
            </p>
            <p className="text-navy/80">
              If you do not agree with any part of these Terms, you must discontinue the use of our website and services immediately. These Terms form a binding legal contract between you and Vastu Ventures.
            </p>
          </section>

          {/* Section 2 */}
          <section id="section-2" className="scroll-mt-24 p-6 rounded-2xl bg-white/60 border border-border">
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-gold" />
              2. User Accounts & Access Credentials
            </h2>
            <p className="mb-3 text-navy/80">
              To access enrolled courses, view consulting reports, or access student portals, you may be required to register for an account.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-navy/80">
              <li><strong>Account Accuracy:</strong> You agree to provide true, accurate, current, and complete information during registration and keep your account details updated.</li>
              <li><strong>Credential Security:</strong> You are solely responsible for keeping your password and login credentials confidential. Sharing accounts across multiple users or devices for commercial reselling is strictly forbidden.</li>
              <li><strong>Eligibility:</strong> You must be at least 18 years of age or have parental/guardian consent to use our paid consultation and educational services.</li>
              <li><strong>Unauthorized Access:</strong> You must notify us immediately of any unauthorized use or security breach of your account.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section id="section-3" className="scroll-mt-24 p-6 rounded-2xl bg-white/60 border border-border">
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <Scale className="w-5 h-5 text-gold" />
              3. Vastu Consultation Services & Advisory Disclaimer
            </h2>
            <p className="mb-3 text-navy/80">
              Vastu Ventures provides spatial energy audits, direction mapping, floor plan analysis, and consultation for residential, commercial, and industrial properties based on traditional Vedic Vastu Shastra and modern spatial dynamics.
            </p>

            <div className="p-4 my-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-navy/90 text-sm">
              <p className="font-semibold flex items-center gap-1.5 text-amber-900 mb-1">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                Important Advisory Disclaimer:
              </p>
              <p className="text-navy/80 leading-normal">
                Vastu consultations are advisory in nature. Recommendations are aimed at harmonizing spatial energy flow and natural elements. Vastu consultancy is not a substitute for professional architectural engineering, legal advice, medical diagnosis, or guaranteed financial performance. Clients assume full discretion in executing physical structural modifications.
              </p>
            </div>

            <ul className="list-disc pl-5 space-y-2 text-navy/80">
              <li><strong>Client Data Responsibilities:</strong> Clients are responsible for providing accurate property floor plans, compass direction bearings, and site details. We are not liable for recommendations derived from incorrect site data supplied by the client.</li>
              <li><strong>Deliverables:</strong> Consultation deliverables include written PDF audit reports, layout maps, elemental correction charts, and scheduled phone/video consultations as specified in your chosen package.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="section-4" className="scroll-mt-24 p-6 rounded-2xl bg-white/60 border border-border">
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gold" />
              4. Vastu Academy & Course Enrollment
            </h2>
            <p className="mb-3 text-navy/80">
              Our LMS portal offers educational courses, masterclasses, certifications, and learning materials on Vastu Shastra principles.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-navy/80">
              <li><strong>Personal License:</strong> Upon course purchase, Vastu Ventures grants you a personal, non-exclusive, non-transferable license to view lecture videos, download supplementary worksheets, and access learning modules.</li>
              <li><strong>Access Duration:</strong> "Lifetime Access" refers to the lifetime of the active platform service. Vastu Ventures reserves the right to migrate platform infrastructure while maintaining reasonable student access.</li>
              <li><strong>Certificates:</strong> Completion certificates are issued upon fulfilling specified curriculum requirements, watching mandatory module videos, and passing assessments.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section id="section-5" className="scroll-mt-24 p-6 rounded-2xl bg-white/60 border border-border">
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-gold" />
              5. Intellectual Property Rights & Content Protection
            </h2>
            <p className="mb-3 text-navy/80">
              All materials available on Vastu Ventures—including video lectures, audio recordings, text articles, custom floor plan diagrams, logos, branding assets, software code, and course materials—are the exclusive intellectual property of Vastu Ventures and protected by applicable copyright and trademark laws.
            </p>
            <p className="mb-3 text-navy/80 font-medium">Strictly Prohibited Actions:</p>
            <ul className="list-disc pl-5 space-y-2 text-navy/80">
              <li>Recording, downloading, ripping, or copying proprietary course video streams.</li>
              <li>Re-selling, licensing, distributing, or publicly broadcasting course materials or consultation templates.</li>
              <li>Using automated web scrapers, bots, or data mining tools to extract content from the website.</li>
              <li>Reverse engineering or tampering with the website’s underlying source code or security features.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section id="section-6" className="scroll-mt-24 p-6 rounded-2xl bg-white/60 border border-border">
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-gold" />
              6. Pricing, Payments & Tax Obligations
            </h2>
            <p className="mb-3 text-navy/80">
              Prices for consultation packages and educational courses are displayed on our platform in INR (Indian National Rupee) or converted international currencies.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-navy/80">
              <li><strong>Payment Processing:</strong> Transactions are securely processed via third-party authorized payment gateways (e.g., Razorpay, Stripe, Credit/Debit cards, UPI, Net Banking). Vastu Ventures does not store credit card CVV numbers.</li>
              <li><strong>Taxes:</strong> Fees are subject to applicable Goods and Services Tax (GST) or regional statutory duties as disclosed at checkout.</li>
              <li><strong>Price Changes:</strong> We reserve the right to revise consultation fees or course pricing at any time. Existing active course enrollments or confirmed consultation bookings will not be affected retroactively.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section id="section-7" className="scroll-mt-24 p-6 rounded-2xl bg-white/60 border border-border">
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-gold" />
              7. Cancellation & Refund Policy
            </h2>
            <p className="mb-3 text-navy/80">
              We strive to provide total satisfaction with our Vastu consultation and education offerings. Our refund terms are structured as follows:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 rounded-xl bg-white border border-border shadow-xs">
                <h3 className="font-serif text-base font-bold text-navy mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gold" />
                  Online Course Refund (14 Days)
                </h3>
                <p className="text-xs md:text-sm text-navy/80 leading-relaxed">
                  Online courses carry a <strong>14-Day Money-Back Guarantee</strong>. If you are unsatisfied, you may request a 100% refund within 14 calendar days of enrollment provided you have completed less than 30% of total video lessons and have not downloaded certification credentials.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-border shadow-xs">
                <h3 className="font-serif text-base font-bold text-navy mb-2 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-gold" />
                  Consultation Cancellation Policy
                </h3>
                <p className="text-xs md:text-sm text-navy/80 leading-relaxed">
                  Scheduled consultations can be cancelled or rescheduled up to <strong>48 hours prior</strong> to the scheduled appointment without penalty. Once a floor plan audit or live video session has commenced or been delivered, consultation fees become non-refundable.
                </p>
              </div>
            </div>

            <p className="text-xs text-navy/70 italic">
              * Approved refunds will be processed back to the original payment method within 5–7 business days.
            </p>
          </section>

          {/* Section 8 */}
          <section id="section-8" className="scroll-mt-24 p-6 rounded-2xl bg-white/60 border border-border">
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-gold" />
              8. User Conduct & Community Guidelines
            </h2>
            <p className="mb-3 text-navy/80">
              To ensure a respectful environment in live Q&A webinars, student comment sections, and community forums, users agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-navy/80">
              <li>Post abusive, defamatory, profane, or discriminatory remarks toward instructors or fellow students.</li>
              <li>Distribute unsolicited commercial advertising, spam, or promotional referral links.</li>
              <li>Upload malicious files, viruses, or code designed to interfere with website operation.</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section id="section-9" className="scroll-mt-24 p-6 rounded-2xl bg-white/60 border border-border">
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-gold" />
              9. Limitation of Liability & Warranty Disclaimer
            </h2>
            <p className="mb-3 text-navy/80">
              The platform and all services are provided on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis without warranties of any kind, whether express or implied.
            </p>
            <p className="mb-3 text-navy/80">
              To the fullest extent permitted by applicable law, Vastu Ventures and its founders, instructors, employees, and partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages (including loss of profits, business disruption, or property alterations) arising out of your access to or inability to use our services.
            </p>
            <p className="text-navy/80 text-xs text-navy/70 italic">
              In any event, our total aggregate liability for any claim related to our services shall not exceed the total amount actually paid by you to Vastu Ventures in the three (3) months preceding the claim event.
            </p>
          </section>

          {/* Section 10 */}
          <section id="section-10" className="scroll-mt-24 p-6 rounded-2xl bg-white/60 border border-border">
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gold" />
              10. Third-Party Services & External Links
            </h2>
            <p className="text-navy/80">
              Our platform may contain links to third-party web tools, video streaming servers, social media platforms, or external references. We do not endorse or assume responsibility for the content, privacy practices, or accuracy of third-party platforms. Your interactions with third-party links are governed by their respective terms and policies.
            </p>
          </section>

          {/* Section 11 */}
          <section id="section-11" className="scroll-mt-24 p-6 rounded-2xl bg-white/60 border border-border">
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-gold" />
              11. Account Termination & Suspension
            </h2>
            <p className="text-navy/80">
              We reserve the right to suspend or permanently terminate your account and access to our learning management system without prior notice if you violate these Terms, engage in copyright piracy, share access credentials, or display abusive conduct toward our team or community members.
            </p>
          </section>

          {/* Section 12 */}
          <section id="section-12" className="scroll-mt-24 p-6 rounded-2xl bg-white/60 border border-border">
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-gold" />
              12. Amendments to Terms & Conditions
            </h2>
            <p className="text-navy/80">
              Vastu Ventures reserves the right to modify or replace these Terms at any time. Updated versions will be posted on this page with a revised "Last Updated" date. Continued use of our website or services after changes take effect constitutes acceptance of the amended Terms.
            </p>
          </section>

          {/* Section 13 */}
          <section id="section-13" className="scroll-mt-24 p-6 rounded-2xl bg-white/60 border border-border">
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <Scale className="w-5 h-5 text-gold" />
              13. Governing Law & Dispute Resolution
            </h2>
            <p className="text-navy/80">
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes, claims, or controversies arising out of or relating to these Terms or our services shall first be attempted to be resolved through good-faith negotiation, and failing that, shall be subject to the exclusive jurisdiction of the competent courts in India.
            </p>
          </section>

          {/* Section 14 */}
          <section id="section-14" className="scroll-mt-24 p-6 rounded-2xl bg-navy text-white p-8 border border-navy/20">
            <h2 className="font-serif text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-gold" />
              14. Contact Information & Legal Support
            </h2>
            <p className="text-white/80 text-sm mb-4">
              If you have any questions, concerns, or legal inquiries regarding these Terms & Conditions, please contact our support team:
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm font-light text-white/90">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>Email: support@vastuventures.com</span>
              </div>
              <div className="hidden sm:block text-white/40">•</div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gold shrink-0" />
                <span>Helpdesk: Support Portal & Live Inquiry Form</span>
              </div>
            </div>
          </section>

        </div>
      </motion.div>
    </div>
  );
}

