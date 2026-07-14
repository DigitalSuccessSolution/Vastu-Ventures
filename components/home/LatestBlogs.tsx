"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function LatestBlogs() {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.25, 1, 0.5, 1] as const;

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
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: premiumEase }
    }
  };

  const blogsData = [
    {
      id: "b1",
      slug: "7-vastu-tips-for-a-happy-and-peaceful-home",
      date: "May 20, 2024",
      title: "7 Vastu Tips for a Happy and Peaceful Home",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "b2",
      slug: "vastu-for-office-boost-productivity-and-growth",
      date: "May 15, 2024",
      title: "Vastu for Office: Boost Productivity & Growth",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "b3",
      slug: "vastu-colors-how-colors-impact-your-life",
      date: "May 10, 2024",
      title: "Vastu Colors: How Colors Impact Your Life",
      image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "b4",
      slug: "kitchen-vastu-important-tips-for-good-health",
      date: "May 05, 2024",
      title: "Kitchen Vastu: Important Tips for Good Health",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section className="py-16 bg-[#FDFBF7] border-t border-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="relative flex flex-col md:flex-row items-center justify-center gap-4 mb-10 w-full"
        >
          {/* Centered Title text */}
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#E28A3E]">
              • Latest Blogs •
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium mt-1 leading-none text-center">
              <span className="text-navy">Insights & </span>
              <span className="text-[#E28A3E]">Vastu Tips</span>
            </h2>
          </div>

          {/* View All button on the right for md+ screens, centered below on mobile */}
          <div className="md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2">
            <Link
              href="/blogs"
              className="border border-border/80 bg-white hover:bg-[#FAF6F0] text-navy font-semibold text-xs px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>View All Blogs</span>
              <ArrowRight className="w-4 h-4 text-[#E28A3E]" />
            </Link>
          </div>
        </motion.div>

        {/* Blogs Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {blogsData.map((blog) => (
            <motion.article
              key={blog.id}
              variants={cardVariants}
              className="group bg-white border border-border/70 rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Blog Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/15 to-transparent" />
              </div>

              {/* Text Body */}
              <div className="p-5 flex-grow flex flex-col justify-between text-left">
                <div>
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider block mb-2">
                    {blog.date}
                  </span>
                  <h3 className="font-serif text-sm font-bold text-navy hover:text-primary transition-colors leading-snug line-clamp-2 min-h-[40px]">
                    <Link href={`/blogs/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h3>
                </div>

                {/* Read More Link */}
                <div className="mt-4 pt-4 border-t border-border/40">
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="inline-flex items-center gap-1 text-[#E28A3E] hover:text-gold-end text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
