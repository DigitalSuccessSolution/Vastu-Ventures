"use client";

import React, { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailsPage({ params }: Props) {
  const { slug } = use(params);
  const [blog, setBlog] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/blogs/${slug}`);
        const data = await res.json();
        if (data.success && data.data) {
          const blogData = data.data;
          const now = new Date();
          if (blogData.status === "Draft") {
            setBlog(null);
          } else if (blogData.status === "Scheduled" && now < new Date(blogData.date)) {
            setBlog(null);
          } else {
            setBlog(blogData);
            
            // Fetch related
            const relRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/blogs/${slug}/related`);
            const relData = await relRes.json();
            if (relData.success) {
              setRelated(relData.data || []);
            }
          }
        } else {
          setBlog(null);
        }
      } catch (err) {
        console.error("Error loading blog details from DB:", err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };
    loadBlogData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#E28A3E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!blog) {
    notFound();
  }

  return (
    <div className="bg-background vastu-mandala-bg py-12 text-left">
      <style dangerouslySetInnerHTML={{ __html: `
        .html-content h1 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          font-family: serif;
          color: #0b1a30;
        }
        .html-content h2 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          font-family: serif;
          color: #0b1a30;
        }
        .html-content h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-top: 1.2rem;
          margin-bottom: 0.6rem;
          font-family: serif;
          color: #0b1a30;
        }
        .html-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .html-content ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .html-content blockquote {
          border-left: 4px solid #E28A3E;
          padding-left: 1.25rem;
          font-style: italic;
          color: #64748b;
          margin-top: 1.25rem;
          margin-bottom: 1.25rem;
          background-color: rgba(226, 138, 62, 0.05);
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          border-radius: 0 0.5rem 0.5rem 0;
        }
        .html-content p {
          margin-bottom: 1rem;
        }
        .html-content table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 1.5rem 0;
          overflow: hidden;
        }
        .html-content td, .html-content th {
          border: 1px solid #cbd5e1;
          padding: 8px 12px;
          vertical-align: top;
          box-sizing: border-box;
        }
        .html-content th {
          font-weight: bold;
          text-align: left;
          background-color: #f8fafc;
        }
        .html-content .text-align-center {
          text-align: center;
        }
        .html-content .text-align-right {
          text-align: right;
        }
        .html-content mark {
          background-color: #fef08a;
          padding: 0.1rem 0.25rem;
          border-radius: 0.25rem;
        }
        .html-content hr {
          border: 0;
          border-top: 1px solid #cbd5e1;
          margin: 2rem 0;
        }
        .html-content a {
          color: #E28A3E;
          text-decoration: underline;
        }
      ` }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
          
          {/* Article content (Left) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div>
              <span className="px-3 py-1 bg-background-alt text-primary border border-border rounded-lg text-[10px] uppercase font-bold tracking-wider">
                {blog.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-navy mt-4 leading-tight">
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

            {/* Body Content */}
            <div 
              className="prose max-w-none text-xs sm:text-sm text-navy leading-relaxed font-light html-content animate-fade-in"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* Main Image (Right) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-premium border border-border/40 bg-white/40">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>
          </div>

        </motion.div>

        {/* Related Articles (Bottom) */}
        <div className="mt-16 pt-12 border-t border-border">
          <h3 className="font-serif text-2xl font-bold text-navy mb-8">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {related.map((item) => (
              <Link
                href={`/blogs/${item.slug}`}
                key={item.id || item._id}
                className="group flex gap-4 bg-white border border-border/60 rounded-2xl p-4 shadow-sm hover:shadow-premium transition-all"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col justify-between py-1 text-left">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-primary">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-semibold text-navy mt-1 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h4>
                  </div>
                  <div className="text-[10px] text-muted-foreground flex gap-3">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
