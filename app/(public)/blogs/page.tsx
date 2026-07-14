import React from "react";
import Link from "next/link";
import { BLOGS } from "@/data/mockData";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";

export default function BlogsPage() {
  return (
    <div className="bg-background vastu-mandala-bg min-h-screen">
      
      {/* Header */}
      <section className="bg-background-alt py-16 border-b border-border text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase font-bold text-primary tracking-widest">Insights Hub</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy mt-2">
            Vastu Science & Architectural Wisdom
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-4 max-w-xl mx-auto font-light leading-relaxed">
            Discover simple spatial adjustments, design formulas, and tips to clean energy zones in your properties.
          </p>
        </div>
      </section>

      {/* Blogs list */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {BLOGS.map((blog) => (
            <article
              key={blog.id}
              className="group bg-white border border-border rounded-2xl p-5 shadow-premium hover:shadow-premium-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-5">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/35 to-transparent" />
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-lg text-[9px] uppercase tracking-wider font-bold text-navy">
                    {blog.category}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-[10px] text-muted-foreground mb-3 font-light">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    {blog.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    {blog.readTime}
                  </span>
                </div>

                <h3 className="font-serif text-base font-bold text-navy group-hover:text-primary transition-colors leading-snug">
                  <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                </h3>

                <p className="text-xs text-muted-foreground mt-2 line-clamp-3 font-light leading-relaxed">
                  {blog.shortDescription}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px] text-navy font-semibold">
                  <User className="w-3.5 h-3.5 text-primary" />
                  {blog.author}
                </div>
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="text-xs font-semibold text-navy group-hover:text-primary transition-colors flex items-center gap-0.5"
                >
                  Read Article <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}
