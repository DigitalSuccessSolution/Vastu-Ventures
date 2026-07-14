"use client";

import React from "react";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function SuccessStories() {
  const stories = [
    {
      title: "The Tech Office Turnaround",
      category: "Corporate Vastu",
      problem: "Staff friction, declining client retention, and persistent server room outages.",
      solution: "Shifted server racks from Northeast to Southeast. Realigned CEO desk to face North. Balanced entry zone using brass boundary bars.",
      impact: "38% increase in productivity, zero server downtime, and 3 key enterprise clients closed within 90 days.",
      stat: "38%",
      statLabel: "Productivity Rise",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600",
      slug: "tech-office-turnaround"
    },
    {
      title: "The Harmony Villa Correction",
      category: "Residential Vastu",
      problem: "Homeowner experienced chronic fatigue and family conflict immediately after moving into a new villa.",
      solution: "Balanced the kitchen's element configuration (relocated stove placement relative to sink). Balanced South-West master bedroom zone.",
      impact: "Restored sound sleep patterns, resolved marital stress, and overall family cohesion increased within 3 weeks.",
      stat: "3 Wks",
      statLabel: "Visible Results",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600",
      slug: "harmony-villa-correction"
    }
  ];

  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.25, 1, 0.5, 1] as const;

  const headerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: premiumEase } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.05 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: premiumEase } }
  };

  return (
    <section className="py-20 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="text-xs uppercase font-bold text-[#E28A3E] tracking-widest">
            Real Transformations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy mt-2.5">
            Success Stories & Case Studies
          </h2>
          <p className="text-sm text-muted-foreground mt-3 font-light leading-relaxed">
            Read about actual spaces corrected using our bio-energy maps and traditional Vastu guidelines.
          </p>
        </motion.div>

        {/* Stories Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          {stories.map((story, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="bg-white border border-border rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300 grid grid-cols-1 sm:grid-cols-12 gap-6"
            >
              {/* Image Block */}
              <div className="sm:col-span-5 relative h-48 sm:h-full min-h-[200px] rounded-xl overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/35 to-transparent" />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-navy text-white text-[10px] uppercase font-bold tracking-wider">
                  {story.category}
                </span>
              </div>

              {/* Text Block */}
              <div className="sm:col-span-7 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-navy hover:text-primary transition-colors leading-snug">
                    {story.title}
                  </h3>

                  <div className="mt-3 flex flex-col gap-2.5 text-xs">
                    <div>
                      <span className="font-semibold text-navy">The Challenge:</span>
                      <p className="text-muted-foreground font-light mt-0.5">{story.problem}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-primary">The Alignment:</span>
                      <p className="text-muted-foreground font-light mt-0.5">{story.solution}</p>
                    </div>
                  </div>
                </div>

                {/* Impact strip */}
                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-accent">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-bold font-serif">Verified Result</span>
                  </div>
                  <Link
                    href="/services/case-studies"
                    className="text-xs font-bold text-navy hover:text-primary transition-colors flex items-center gap-1"
                  >
                    Read Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
