"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Mail, Phone, MapPin, CheckCircle2, Loader2, Send } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const formSchema = zod.object({
  name: zod.string().min(2, "Name must be at least 2 characters"),
  email: zod.string().email("Please enter a valid email"),
  subject: zod.string().min(4, "Subject must be at least 4 characters"),
  message: zod.string().min(10, "Message must be at least 10 characters")
});

type ContactFormData = zod.infer<typeof formSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: ContactFormData) => {
    setLoading(true);
    setTimeout(() => {
      console.log("Contact form submitted:", data);
      setLoading(false);
      setSubmitted(true);
      reset();
    }, 1200);
  };

  return (
    <div className="bg-background vastu-mandala-bg min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs sm:text-sm uppercase font-bold text-primary tracking-widest">Connect With Us</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy mt-2">
            Get in Touch
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-4 font-light leading-relaxed">
            Have questions about our audits or courses? Send us a message and our team will get back to you shortly.
          </p>
        </motion.div>

        {/* Contact Info & Form Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-stretch"
        >

          {/* Contact details */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left bg-navy text-white rounded-3xl p-6 sm:p-8 shadow-premium-lg relative overflow-hidden">
            {/* Background Vastu grid decor */}
            <div className="absolute top-0 right-0 w-48 h-48 opacity-[0.03] bg-[radial-gradient(circle_at_center,var(--gold-start)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            <div className="flex flex-col gap-6">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-gold-start">Office Headquarters</h3>
              <p className="text-sm text-background-alt/80 font-light leading-relaxed">
                Our main consulting office is based in Nagpur, Maharashtra. Visits are strictly by prior appointment only.
              </p>

              <div className="flex flex-col gap-5 mt-4 text-sm font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold-start flex-shrink-0 mt-0.5" />
                  <span>2,4 A Wing, New Administrative Building, Near Zilha Parishad Office, Nagpur - 440001</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gold-start flex-shrink-0" />
                  <a href="mailto:contact@VastuVentures.com" className="hover:text-gold-start transition-colors">
                    contact@VastuVentures.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gold-start flex-shrink-0" />
                  <a href="tel:+917049985097" className="hover:text-gold-start transition-colors">
                    +91 70499 85097
                  </a>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="w-full h-40 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mt-8 text-sm text-background-alt/60 font-light">
              Interactive Map Container (Nagpur, IN)
            </div>
          </div>

          {/* Contact form panel */}
          <div className="lg:col-span-7 bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-premium text-left">
            {submitted ? (
              <div className="h-full flex flex-col justify-center items-center text-center gap-4 py-8 animate-fade-in-up">
                <div className="w-12 h-12 rounded-full bg-accent/15 text-accent flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-navy">Message Delivered</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light max-w-sm">
                  We have received your message. A client relationship officer will respond to your queries shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-sm font-semibold text-primary hover:text-gold-end cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      {...register("name")}
                      placeholder="Jane Doe"
                      className="w-full text-sm px-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy placeholder:text-muted-foreground/60"
                    />
                    {errors.name && (
                      <span className="text-[10px] sm:text-xs text-destructive mt-1 block">{errors.name.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="jane@example.com"
                      className="w-full text-sm px-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy placeholder:text-muted-foreground/60"
                    />
                    {errors.email && (
                      <span className="text-[10px] sm:text-xs text-destructive mt-1 block">{errors.email.message}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    {...register("subject")}
                    placeholder="e.g. Corporate consultation pricing or Course timeline"
                    className="w-full text-sm px-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy placeholder:text-muted-foreground/60"
                  />
                  {errors.subject && (
                    <span className="text-[10px] sm:text-xs text-destructive mt-1 block">{errors.subject.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                    Message / Question
                  </label>
                  <textarea
                    rows={5}
                    {...register("message")}
                    placeholder="Describe your queries or specifications here..."
                    className="w-full text-sm px-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-navy resize-none placeholder:text-muted-foreground/60"
                  />
                  {errors.message && (
                    <span className="text-[10px] sm:text-xs text-destructive mt-1 block">{errors.message.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gold-gradient text-white text-xs sm:text-sm font-semibold rounded-xl shadow-premium hover:shadow-premium-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 hover:opacity-95"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4.5 h-4.5 animate-spin" /> Delivering...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
