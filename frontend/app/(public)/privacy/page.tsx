"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  FileText, 
  Server, 
  Cookie, 
  UserCheck, 
  Globe, 
  AlertCircle, 
  Mail, 
  ChevronRight,
  Sparkles,
  CheckCircle2,
  HardDrive
} from "lucide-react";

export default function PrivacyPage() {
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
    { id: "privacy-1", title: "1. Information We Collect" },
    { id: "privacy-2", title: "2. How We Use Your Information" },
    { id: "privacy-3", title: "3. Confidentiality of Floor Plans & Site Blueprints" },
    { id: "privacy-4", title: "4. Data Sharing & Third-Party Service Providers" },
    { id: "privacy-5", title: "5. Cookies & Local Storage Technologies" },
    { id: "privacy-6", title: "6. Data Security Safeguards & Encryption" },
    { id: "privacy-7", title: "7. Data Retention & Archival Policies" },
    { id: "privacy-8", title: "8. Your Rights & Data Control Options" },
    { id: "privacy-9", title: "9. International Data Transfers" },
    { id: "privacy-10", title: "10. Protection of Minors & Children's Privacy" },
    { id: "privacy-11", title: "11. Changes to This Privacy Policy" },
    { id: "privacy-12", title: "12. Contact Our Privacy & Data Protection Team" },
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
            <Shield className="w-4 h-4 text-gold" />
            <span>Data Protection & Privacy Standards</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm md:text-base text-navy/70 max-w-2xl font-light">
            Vastu Ventures ("We", "Us", "Our") is committed to protecting the personal data, property blueprints, and confidentiality of our clients and academy students.
          </p>
         
        </div>

        {/* Quick Navigation / Table of Contents */}
        <div className="mb-12 p-6 rounded-2xl bg-white/80 backdrop-blur border border-border shadow-sm">
          <h2 className="font-serif text-lg font-bold text-navy mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gold" />
            Privacy Overview & Navigation
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
          <section id="privacy-1" className="scroll-mt-24 p-6 rounded-2xl bg-white/60 border border-border">
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <Database className="w-5 h-5 text-gold" />
              1. Information We Collect
            </h2>
            <p className="mb-3 text-navy/80">
              We collect information to provide seamless Vastu consultations, process course enrollments, and improve your user experience on our platform.
            </p>
            
            <div className="space-y-4 text-navy/80">
              <div>
                <h3 className="font-semibold text-navy mb-1 text-sm md:text-base">A. Personal Identification Data</h3>
                <p>When you register, enroll in a course, or request a consultation, we collect your full name, email address, phone number, physical address, and account credentials.</p>
              </div>

              <div>
                <h3 className="font-semibold text-navy mb-1 text-sm md:text-base">B. Consultation & Architectural Data</h3>
                <p>For residential, commercial, or industrial Vastu audits, you may submit property floor plans, site photographs, compass direction readings, elevation diagrams, and structural notes.</p>
              </div>

              <div>
                <h3 className="font-semibold text-navy mb-1 text-sm md:text-base">C. LMS & Student Learning Data</h3>
                <p>We log your course progress, module completions, quiz submissions, assignment uploads, live webinar attendance, and certificate issuance records.</p>
              </div>

              <div>
                <h3 className="font-semibold text-navy mb-1 text-sm md:text-base">D. Technical & Usage Metrics</h3>
                <p>When navigating our website, our servers automatically collect IP addresses, browser types, device specifications, operating systems, referring URLs, and page navigation history.</p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="privacy-2" className="scroll-mt-24 p-6 rounded-2xl bg-white/60 border border-border">
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-gold" />
              2. How We Use Your Information
            </h2>
            <p className="mb-3 text-navy/80">
              We process your personal information strictly for legitimate operational, educational, and service delivery purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-navy/80">
              <li><strong>Fulfilling Vastu Consultations:</strong> Evaluating spatial energy layout, generating customized remedy blueprints, and conducting scheduled consultation sessions.</li>
              <li><strong>Academy & Course Access:</strong> Authenticating student logins, tracking video lecture completion, delivering certificates, and managing Q&A forums.</li>
              <li><strong>Payment Processing & Tax Compliance:</strong> Processing course fees or consulting packages securely and generating statutory tax invoices.</li>
              <li><strong>Customer Support & Service Updates:</strong> Sending appointment reminders, consultation reports, software updates, and responding to support queries.</li>
              <li><strong>Marketing & Newsletter Communications:</strong> Sending Vastu tips, blog updates, and promotional offers only when you have explicitly opted in. You can unsubscribe at any time.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section id="privacy-3" className="scroll-mt-24 p-6 rounded-2xl bg-white/60 border border-border">
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-gold" />
              3. Confidentiality of Floor Plans & Site Blueprints
            </h2>
            <p className="mb-3 text-navy/80">
              We understand the sensitive nature of architectural floor plans, residential layouts, and commercial site blueprints.
            </p>
            
            <div className="p-4 my-3 rounded-xl bg-navy/5 border border-navy/15 text-navy text-sm">
              <p className="font-semibold flex items-center gap-1.5 text-navy mb-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Our Floor Plan Confidentiality Pledge:
              </p>
              <ul className="space-y-1.5 text-navy/80 text-xs md:text-sm">
                <li>• All floor plans and site diagrams are stored in encrypted, non-public cloud directories.</li>
                <li>• Floor plans are accessed exclusively by assigned senior Vastu consultants for auditing purposes.</li>
                <li>• We <strong>NEVER</strong> sell, publish, share, or use client floor plans as public marketing case studies without written consent.</li>
                <li>• Clients may request complete deletion of their property files upon consultation completion.</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section id="privacy-4" className="scroll-mt-24 p-6 rounded-2xl bg-white/60 border border-border">
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <Server className="w-5 h-5 text-gold" />
              4. Data Sharing & Third-Party Service Providers
            </h2>
            <p className="mb-3 text-navy/80">
              We do not sell, rent, or trade your personal information to third-party data brokers. We share data only with trusted infrastructure partners essential for platform operation:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-navy/80">
              <li><strong>Payment Gateways:</strong> PCI-DSS compliant providers (e.g., Razorpay, Stripe) process card, UPI, and net-banking transactions securely.</li>
              <li><strong>Cloud Hosting & Streaming:</strong> Secure cloud servers host our encrypted databases and video streams under strict data protection agreements.</li>
              <li><strong>Analytics Services:</strong> Anonymized tools (e.g., Google Analytics) measure website performance and user engagement patterns.</li>
              <li><strong>Legal & Compliance Disclosures:</strong> We may disclose data if required to do so by court orders, law enforcement requests, or applicable statutory laws.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section id="privacy-5" className="scroll-mt-24 p-6 rounded-2xl bg-white/60 border border-border">
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <Cookie className="w-5 h-5 text-gold" />
              5. Cookies & Local Storage Technologies
            </h2>
            <p className="mb-3 text-navy/80">
              Our platform utilizes cookies and local storage items to maintain session state and enhance website responsiveness:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-navy/80">
              <li><strong>Essential Cookies:</strong> Required for user login authentication, course video playback state, and shopping cart persistence.</li>
              <li><strong>Analytical Cookies:</strong> Help us analyze web traffic, popular blog posts, and navigation flow to improve platform usability.</li>
              <li><strong>Managing Cookies:</strong> You can configure your web browser to block or alert you about cookies. However, disabling essential cookies may affect student portal features.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section id="privacy-6" className="scroll-mt-24 p-6 rounded-2xl bg-white/60 border border-border">
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-gold" />
              6. Data Security Safeguards & Encryption
            </h2>
            <p className="mb-3 text-navy/80">
              We implement robust technical and organizational security measures to protect your personal data against unauthorized access, loss, or alteration:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-navy/80">
              <li><strong>SSL/TLS Encryption:</strong> All data transmitted between your browser and our website is encrypted using 256-bit SSL protocols (HTTPS).</li>
              <li><strong>Secure Passwords:</strong> Account passwords are hashed using industry-standard cryptographic algorithms before storage.</li>
              <li><strong>Access Control:</strong> Administrative access to user data is restricted to authorized personnel under strict non-disclosure obligations.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section id="privacy-7" className="scroll-mt-24 p-6 rounded-2xl bg-white/60 border border-border">
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <Database className="w-5 h-5 text-gold" />
              7. Data Retention & Archival Policies
            </h2>
            <p className="text-navy/80">
              We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, including fulfilling course access, consultation record-keeping, and complying with statutory tax/accounting regulations. Account details are retained while your account remains active.
            </p>
          </section>

          {/* Section 8 */}
          <section id="privacy-8" className="scroll-mt-24 p-6 rounded-2xl bg-white/60 border border-border">
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-gold" />
              8. Your Rights & Data Control Options
            </h2>
            <p className="mb-3 text-navy/80">
              Depending on your location, you hold the following privacy rights regarding your personal information:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
              <div className="p-3.5 rounded-xl bg-white border border-border">
                <p className="font-bold text-navy mb-1">Right to Access & Export</p>
                <p className="text-navy/70">Request a copy of your personal data and floor plan files stored in our system.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-border">
                <p className="font-bold text-navy mb-1">Right to Rectification</p>
                <p className="text-navy/70">Update or correct inaccurate profile details and contact information.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-border">
                <p className="font-bold text-navy mb-1">Right to Erasure</p>
                <p className="text-navy/70">Request complete deletion of your account, history, and uploaded floor plans.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-border">
                <p className="font-bold text-navy mb-1">Right to Opt-Out</p>
                <p className="text-navy/70">Unsubscribe from promotional emails or news updates at any time with one click.</p>
              </div>
            </div>
          </section>

          {/* Section 9 */}
          <section id="privacy-9" className="scroll-mt-24 p-6 rounded-2xl bg-white/60 border border-border">
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5 text-gold" />
              9. International Data Transfers
            </h2>
            <p className="text-navy/80">
              As a global Vastu consultancy and academy, your information may be processed on servers located outside your home state or country. We ensure all cross-border data transfers comply with international privacy standards and encrypted transmission protocols.
            </p>
          </section>

          {/* Section 10 */}
          <section id="privacy-10" className="scroll-mt-24 p-6 rounded-2xl bg-white/60 border border-border">
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-gold" />
              10. Protection of Minors & Children's Privacy
            </h2>
            <p className="text-navy/80">
              Our website, consultations, and courses are intended for adults aged 18 and older. We do not knowingly collect personal information from children under 18. If we discover that a minor under 18 has registered without verified parental consent, we will delete their account promptly.
            </p>
          </section>

          {/* Section 11 */}
          <section id="privacy-11" className="scroll-mt-24 p-6 rounded-2xl bg-white/60 border border-border">
            <h2 className="font-serif text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold" />
              11. Changes to This Privacy Policy
            </h2>
            <p className="text-navy/80">
              We may update this Privacy Policy from time to time to reflect changes in our services or legal obligations. We encourage you to review this page periodically. Continued use of our website following posted revisions indicates acceptance of the updated terms.
            </p>
          </section>

          {/* Section 12 */}
          <section id="privacy-12" className="scroll-mt-24 p-6 rounded-2xl bg-navy text-white p-8 border border-navy/20">
            <h2 className="font-serif text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-gold" />
              12. Contact Our Privacy & Data Protection Team
            </h2>
            <p className="text-white/80 text-sm mb-4">
              If you have any questions, concerns, data access requests, or floor plan deletion requests regarding this Privacy Policy, please contact our Data Protection Officer:
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm font-light text-white/90">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>Privacy Email: privacy@vastuventures.com</span>
              </div>
              <div className="hidden sm:block text-white/40">•</div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gold shrink-0" />
                <span>Support Portal: Privacy & Data Request Desk</span>
              </div>
            </div>
          </section>

        </div>
      </motion.div>
    </div>
  );
}

