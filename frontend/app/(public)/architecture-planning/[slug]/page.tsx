"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Compass, Loader2 } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
} as const;

export default function ArchitecturePlanningPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;

  const [categoryData, setCategoryData] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryAndPlans = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
        const res = await fetch(`${apiUrl}/architecture-categories/${slug}`);
        const result = await res.json();

        if (result.success && result.data) {
          setCategoryData(result.data.category);
          setPlans(result.data.plans || []);
        } else {
          // Fallback title formatting
          const formattedTitle = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
          setCategoryData({ name: formattedTitle, slug });
          setPlans([]);
        }
      } catch (err) {
        console.error("Error fetching architecture category:", err);
        const formattedTitle = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        setCategoryData({ name: formattedTitle, slug });
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndPlans();
  }, [slug]);

  const categoryTitle = categoryData?.name || slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <div className="bg-[#FAF9F5] min-h-screen font-sans text-navy overflow-hidden">

      {/* 1. HERO BANNER */}
      <section className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] flex items-center justify-center mb-8">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/architecture-planning.png"
            alt={categoryTitle}
            className="w-full h-full object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy/70"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight drop-shadow-lg"
          >
            {categoryTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto mt-3 font-light leading-relaxed"
          >
            Well-designed floor plans and blueprints that align with ancient Vastu principles for health, wealth, and positivity.
          </motion.p>
        </div>
      </section>

      {/* 2. SERVICES & BLUEPRINTS GRID */}
      <section className="pt-6 pb-20 lg:pt-10 lg:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-[#E28A3E] uppercase mb-3">
            <Compass className="w-4 h-4" />
            Vastu Compliant Architecture Plans
          </motion.div>
          <motion.h2 variants={fadeInUp} className="font-serif text-2xl sm:text-3xl font-bold text-navy mb-4">
            Explore {categoryTitle}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-navy/70 text-sm sm:text-base max-w-2xl mx-auto font-light">
            Choose from a wide range of Vastu-aligned architecture plans and blueprints customized to your plot size.
          </motion.p>
        </motion.div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground font-medium">Loading Architecture Plans...</p>
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-border/80 p-8 max-w-xl mx-auto shadow-xs">
            <Compass className="w-12 h-12 text-primary/40 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-semibold text-navy">No Architecture Plans Available</h3>
            <p className="text-xs text-muted-foreground mt-1">Check back soon for new Vastu-compliant blueprints in this category.</p>
          </div>
        ) : (
          /* CARDS GRID (3 Columns on Desktop) */
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:px-4"
          >
            {plans.map((card: any, idx: number) => {
              const cardSlug = card.slug;
              const buyPriceText = card.buyPrice ? `₹${card.buyPrice}` : "";
              const consultPriceText = card.consultPrice ? `₹${card.consultPrice}` : "";

              const detailsHref = `/architecture-planning/${slug}/${cardSlug}`;

              return (
                <motion.div
                  key={card.id || card._id || idx}
                  variants={fadeInUp}
                  className="group rounded-2xl overflow-hidden flex flex-col bg-white border border-border/80 shadow-premium hover:shadow-premium-lg hover:border-primary/40 transition-all duration-300 text-left"
                >
                  {/* 1. Card Image */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-navy/5 flex items-center justify-center">
                    {card.image ? (
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-muted-foreground text-xs gap-1">
                        <Compass className="w-6 h-6 text-slate-300" />
                        <span>No Image Available</span>
                      </div>
                    )}
                  </div>

                  {/* 2. Card Content */}
                  <div className="p-5 flex flex-col flex-grow justify-between bg-white gap-4">
                    {/* Title */}
                    <h3 className="font-serif text-base sm:text-lg font-bold text-navy leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {card.title}
                    </h3>

                    {/* Actions Area */}
                    <div className="flex flex-col gap-2.5 mt-auto">
                      {/* Buy Plan & Consultation Row */}
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/book?type=buy-plan&title=${encodeURIComponent(card.title)}`}
                          className="py-2.5 px-2 bg-primary hover:bg-gold-end text-white rounded-xl transition-all shadow-sm flex flex-col items-center justify-center cursor-pointer text-center"
                        >
                          <span className="text-xs font-bold">Buy Plan</span>
                          <span className="text-[10px] text-white/90 font-medium">{buyPriceText}</span>
                        </Link>

                        <Link
                          href={`/book?type=consultation&title=${encodeURIComponent(card.title)}`}
                          className="py-2.5 px-2 bg-navy hover:bg-navy-light text-white rounded-xl transition-all shadow-sm flex flex-col items-center justify-center cursor-pointer text-center"
                        >
                          <span className="text-xs font-bold text-white">Consultation</span>
                          <span className="text-[10px] text-primary font-bold">{consultPriceText}</span>
                        </Link>
                      </div>

                      {/* View Details Button */}
                      <Link
                        href={detailsHref}
                        className="w-full py-2.5 px-4 bg-background-alt hover:bg-[#FAF6F0] text-navy border border-border text-xs font-bold rounded-xl text-center transition-all flex items-center justify-center gap-1.5 group/view"
                      >
                        <Eye className="w-3.5 h-3.5 text-primary" />
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5 text-navy group-hover/view:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </section>

    </div>
  );
}
