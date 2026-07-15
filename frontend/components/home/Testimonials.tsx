"use client";

import React from "react";
import { Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function Testimonials() {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.25, 1, 0.5, 1] as const;

  const testimonialsData = [
    {
      id: "t1",
      name: "Neha Sharma",
      city: "Mumbai",
      text: "The Vastu consultation completely transformed the energy of my home. We are now more peaceful and prosperous.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
      rating: 5
    },
    {
      id: "t2",
      name: "Rajesh Verma",
      city: "Delhi",
      text: "Our office productivity has improved significantly after applying Vastu recommendations. Highly recommended!",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
      rating: 5
    },
    {
      id: "t3",
      name: "Anjali Mehta",
      city: "Bangalore",
      text: "The online courses are very informative and easy to understand. Great learning experience!",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      rating: 5
    },
    {
      id: "t4",
      name: "Vikram Malhotra",
      city: "Delhi",
      text: "The structural-free remedies worked wonders for my factory layout. Energy is balanced and production is up by 30%!",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150",
      rating: 5
    },
    {
      id: "t5",
      name: "Priya Sen",
      city: "Kolkata",
      text: "Highly professional consultation. The elemental balance in our house brought immediate peace and mental clarity.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      rating: 5
    }
  ];

  // Duplicate the list of testimonials to achieve a seamless loop marquee
  const doubledTestimonials = [...testimonialsData, ...testimonialsData];

  const headerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: premiumEase }
    }
  };

  return (
    <section className="py-16 bg-[#FDFBF7] relative overflow-hidden">
      {/* Inline marquee style track */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

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
            • Client Love •
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium mt-2 leading-none">
            <span className="text-navy">What Our </span>
            <span className="text-[#E28A3E]">Clients Say</span>
          </h2>
        </motion.div>

        {/* Slider track container */}
        <div className="relative w-full overflow-hidden py-4">
          
          {/* Fading borders overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#FDFBF7] to-transparent z-10 pointer-events-none hidden md:block" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#FDFBF7] to-transparent z-10 pointer-events-none hidden md:block" />

          {/* Marquee sliding row */}
          <div className="marquee-track gap-6">
            {doubledTestimonials.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="w-[280px] sm:w-[320px] flex-shrink-0 flex flex-col justify-between bg-white border border-border/70 rounded-3xl p-6 sm:p-7 shadow-premium hover:shadow-premium-lg hover:border-primary/20 transition-all duration-300 min-h-[220px] text-left group"
              >
                {/* Card Top: Gold Quote Symbol */}
                <div>
                  <span className="text-3xl font-serif text-[#E28A3E] font-extrabold leading-none opacity-85 select-none block">
                    ““
                  </span>
                  <p className="text-xs sm:text-sm text-black font-light leading-relaxed mt-2.5">
                    {item.text}
                  </p>
                </div>

                {/* Card Bottom Profile strip */}
                <div className="mt-6 pt-5 border-t border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden border border-border/80 bg-background-alt flex-shrink-0 shadow-sm">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-black leading-none">
                        {item.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1.5 leading-none">
                        {item.city}
                      </p>
                    </div>
                  </div>

                  {/* Star reviews block */}
                  <div className="flex gap-0.5 text-[#E28A3E]">
                    {[...Array(item.rating)].map((_, starIdx) => (
                      <Star key={starIdx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
