"use client";

import React, { useState } from "react";
import { FAQS } from "@/data/mockData";
import { HelpCircle, ChevronDown, Search, ArrowRight, MessageSquare, Phone, Mail, Sparkles } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

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

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  // Filter FAQs based on category and search query
  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "consultations", label: "Vastu Consultations" },
    { id: "education", label: "Courses & Academy" }
  ];

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-24 pb-20 relative overflow-hidden text-left">
      {/* Decorative concentric rings */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full border border-dashed border-[#E28A3E]/10 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 rounded-full border border-dashed border-[#E28A3E]/10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3E4] text-[#E28A3E] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Common Inquiries
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight">
            Frequently Asked <span className="text-[#E28A3E]">Questions</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-4 font-light leading-relaxed">
            Find answers to commonly asked questions about Vastu sciences, our remote or physical consultation processes, and academic courses.
          </p>
        </motion.div>

        {/* Search & Category Filter Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="bg-white border border-[#EDE3D0]/60 rounded-3xl p-6 shadow-premium mb-10 flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy"
            />
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all shadow-sm cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-gold-gradient text-white shadow-premium"
                    : "bg-[#FAF6F0] border border-[#EDE3D0]/40 text-navy hover:bg-[#FAF6F0]/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Accordion FAQ Area */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="flex flex-col gap-4 mb-20"
        >
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <motion.div
                    key={faq.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5, ease: premiumEase }}
                    className="border border-[#EDE3D0]/60 bg-white rounded-2xl overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF6F0]/20 transition-colors"
                    >
                      <span className="text-sm font-semibold text-navy pr-4">{faq.question}</span>
                      <ChevronDown
                        className={`w-4.5 h-4.5 text-primary flex-shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.35, ease: premiumEase }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 text-xs sm:text-sm text-navy/80 font-light leading-relaxed border-t border-[#EDE3D0]/20 pt-4 bg-[#FAF6F0]/10">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white border border-[#EDE3D0]/60 rounded-3xl"
              >
                <HelpCircle className="w-10 h-10 text-primary/30 mx-auto mb-3" />
                <p className="text-sm font-medium text-navy">No matches found</p>
                <p className="text-xs text-muted-foreground mt-1 font-light">Try adjusting your keywords or category filters.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Call to action section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="bg-navy rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-premium-lg text-center"
        >
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03] bg-[radial-gradient(circle_at_center,var(--gold-start)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

          <h3 className="font-serif text-2xl font-bold text-gold-start mb-2">Still Have Questions?</h3>
          <p className="text-xs sm:text-sm text-background-alt/85 max-w-xl mx-auto font-light leading-relaxed mb-8">
            If you need detailed layout guidance or custom project discussions, feel free to schedule a direct session or call our support lines.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/book"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gold-gradient text-white text-xs font-semibold shadow-premium hover:shadow-premium-lg transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02]"
            >
              Book Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02]"
            >
              Contact Support <MessageSquare className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
