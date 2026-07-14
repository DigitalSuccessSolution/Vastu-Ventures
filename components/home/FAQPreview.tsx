"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { FAQS } from "@/data/mockData";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function FAQPreview() {
  const [openId, setOpenId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.25, 1, 0.5, 1] as const;

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const previewFaqs = FAQS.slice(0, 3);

  const headerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: premiumEase }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: premiumEase }
    }
  };

  return (
    <section className="py-20 bg-background relative vastu-mandala-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs uppercase font-bold text-primary tracking-widest">
            Common Inquiries
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy mt-2.5">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted-foreground mt-3 font-light">
            Got questions about Vastu corrections? We have compiled responses to help clarify common queries.
          </p>
        </motion.div>

        {/* FAQ Accordion List */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="flex flex-col gap-4 max-w-3xl mx-auto"
        >
          {previewFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                className="bg-white border border-border rounded-2xl overflow-hidden shadow-premium transition-all duration-300"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left text-navy hover:text-primary transition-colors cursor-pointer"
                >
                  <span className="text-sm font-semibold flex items-center gap-2.5">
                    <HelpCircle className="w-4.5 h-4.5 text-primary flex-shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs text-muted-foreground font-light leading-relaxed border-t border-border/40">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA link */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, delay: 0.2, ease: premiumEase }}
          className="text-center mt-8"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-gold-end group transition-colors"
          >
            Have more questions? Read our full FAQ Guide
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
