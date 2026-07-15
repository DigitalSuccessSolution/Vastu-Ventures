"use client";

import React from "react";
import HeroBanner from "@/components/home/HeroBanner";
import StatsStrip from "@/components/home/StatsStrip";
import ServiceOverview from "@/components/home/ServiceOverview";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ConsultationProcess from "@/components/home/ConsultationProcess";
import ExpertProfile from "@/components/home/ExpertProfile";
import SuccessStories from "@/components/home/SuccessStories";
import Testimonials from "@/components/home/Testimonials";
import LatestBlogs from "@/components/home/LatestBlogs";
import FAQPreview from "@/components/home/FAQPreview";
import { ArrowRight, HelpCircle, Calendar, Check } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.25, 1, 0.5, 1] as const;

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: premiumEase }
    }
  };

  return (
    <>
      <HeroBanner />
      <StatsStrip />
      <ServiceOverview />
      <FeaturedCourses />
      <WhyChooseUs />
      <ConsultationProcess />
      <ExpertProfile />
      <SuccessStories />
      <Testimonials />
      <LatestBlogs />
      <FAQPreview />
      
      {/* Contact CTA Section */}
      <section className="py-16 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            className="relative rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(226,138,62,0.12)] min-h-[320px] sm:min-h-[380px]"
          >
            {/* Full-cover background image */}
            <img
              src="/vastu-cta-compass.png"
              alt="Vastu Compass Blueprint Design"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark gradient overlay so text is readable */}
            <div className="absolute inset-0 bg-navy/60 pointer-events-none" />

            {/* Content on top */}
            <div className="relative z-10 flex flex-col justify-center items-center text-center h-full min-h-[320px] sm:min-h-[380px] px-8 sm:px-12 lg:px-16 py-12">
              <div className="max-w-2xl flex flex-col items-center gap-5 mx-auto">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
                  <span className="text-white">Ready to Transform Your Space </span>
                  <br className="hidden sm:inline" />
                  <span className="text-white">and </span>
                  <span className="text-[#E28A3E]">Your Life?</span>
                </h2>

                <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed max-w-md mx-auto">
                  Book a consultation today and take the first step towards positivity and prosperity.
                </p>

                {/* Key value checkmarks */}
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] text-white/80 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#E28A3E]" /> No Demolitions
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#E28A3E]" /> 1-on-1 Expert Advice
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#E28A3E]" /> Blueprint Scan
                  </span>
                </div>

                <div>
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gold-gradient hover:opacity-95 text-white text-xs font-bold shadow-premium hover:shadow-premium-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Book Consultation</span>
                    <Calendar className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>



          </motion.div>
        </div>
      </section>
    </>
  );
}
