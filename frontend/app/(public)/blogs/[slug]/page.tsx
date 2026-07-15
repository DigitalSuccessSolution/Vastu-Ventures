"use client";

import React, { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOGS } from "@/data/mockData";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailsPage({ params }: Props) {
  const { slug } = use(params);
  const blog = BLOGS.find((b) => b.slug === slug);
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

  if (!blog) {
    notFound();
  }

  // Find related articles (excluding current)
  const related = BLOGS.filter((b) => b.id !== blog.id).slice(0, 2);

  return (
    <div className="bg-background vastu-mandala-bg py-12 text-left">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to blog directory
        </Link>

        {/* Layout grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          
          {/* Article details (Left) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div>
              <span className="px-3 py-1 bg-background-alt text-primary border border-border rounded-lg text-[10px] uppercase font-bold tracking-wider">
                {blog.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-navy mt-4 leading-tight">
                {blog.title}
              </h1>

              {/* Metadata */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4 border-b border-border pb-4">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4 text-primary" /> {blog.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-primary" /> {blog.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-primary" /> {blog.readTime}
                </span>
              </div>
            </div>

            {/* Main Image */}
            <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-premium">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Body Content */}
            <div className="prose max-w-none text-xs sm:text-sm text-navy leading-relaxed font-light flex flex-col gap-4">
              <p>{blog.content}</p>
              <p>
                Applying Vastu principles requires careful mapping of environmental factors. An ideal setup doesn't involve hacking walls. Instead, we can introduce balancing metals like copper wire for South-East blocks, or brass dividers for primary entrances. These metals work as energy shields.
              </p>
              <h3 className="font-serif text-lg font-bold text-navy mt-6">Implementing Basic Corrections</h3>
              <p>
                Before executing corrections, make sure to verify the magnetic directions using an accurate compass reading. Smartphones can have calibration offsets, so a standard fluid-filled lensatic compass is recommended. Measure directions from the exact geometric center (Brahmasthan) of your space.
              </p>
            </div>
          </div>

          {/* Related Articles Sidebar (Right) */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="bg-white border border-border rounded-2xl p-5 shadow-premium">
              <h3 className="font-serif text-base font-bold text-navy mb-4 pb-2 border-b border-border">Related Articles</h3>
              <div className="flex flex-col gap-5">
                {related.map((item) => (
                  <div key={item.id} className="flex flex-col gap-1.5 text-left">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-primary">{item.category}</span>
                    <h4 className="text-xs font-semibold text-navy hover:text-primary transition-colors leading-snug">
                      <Link href={`/blogs/${item.slug}`}>{item.title}</Link>
                    </h4>
                    <span className="text-[10px] text-muted-foreground">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
