"use client";

import React from "react";
import Link from "next/link";
import { Home, Briefcase, Factory, Monitor, UserRound, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const services = [
  {
    id: "s1",
    icon: Home,
    title: "Residential Vastu",
    description: "Bring harmony and positive energy to your home.",
    href: "/services/residential-vastu"
  },
  {
    id: "s2",
    icon: Briefcase,
    title: "Commercial Vastu",
    description: "Enhance productivity and prosperity in your business.",
    href: "/services/commercial-vastu"
  },
  {
    id: "s3",
    icon: Factory,
    title: "Industrial Vastu",
    description: "Optimize spaces for growth and success.",
    href: "/services/industrial-vastu"
  },
  {
    id: "s4",
    icon: Monitor,
    title: "Online Consultation",
    description: "Get expert guidance from the comfort of home.",
    href: "/book"
  },
  {
    id: "s5",
    icon: UserRound,
    title: "Offline Consultation",
    description: "On-site visits and detailed Vastu analysis.",
    href: "/contact"
  }
];

export default function ServiceOverview() {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.25, 1, 0.5, 1] as const;

  const headerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: premiumEase } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: premiumEase } }
  };

  return (
    <section className="py-20 bg-[#FDFBF7] relative vastu-mandala-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header — centered */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="text-center mb-12"
        >
          <span className="text-[11px] uppercase font-bold text-[#E28A3E] tracking-[0.22em]">
            • What We Offer •
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy mt-2.5">
            Our Vastu <span className="text-[#E28A3E]">Services</span>
          </h2>
        </motion.div>

        {/* Services — 5 cards in a row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="group bg-white border border-[#EDE3D0]/60 rounded-2xl p-6 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col items-start gap-3"
              >
                {/* Icon in circular warm bg */}
                <div className="w-14 h-14 rounded-full bg-[#FEF3E4] flex items-center justify-center mb-1 group-hover:bg-[#E28A3E]/10 transition-colors">
                  <Icon className="w-7 h-7 text-[#E28A3E]" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-serif text-base font-bold text-navy leading-snug group-hover:text-[#E28A3E] transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-muted-foreground font-light leading-relaxed flex-1">
                  {service.description}
                </p>

                {/* Learn More link */}
                <Link
                  href={service.href}
                  className="flex items-center gap-1 text-xs font-semibold text-[#E28A3E] hover:gap-2 transition-all mt-1"
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
