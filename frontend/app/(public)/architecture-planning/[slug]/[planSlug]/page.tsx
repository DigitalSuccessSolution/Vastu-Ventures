"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShoppingCart, 
  Calendar, 
  Lock, 
  FileText, 
  Image as ImageIcon, 
  ShieldCheck, 
  Sparkles,
  Compass
} from "lucide-react";

// Plans database lookup
const plansDatabase: Record<string, any> = {
  "1-bhk-vastu-house-plan": {
    title: "1 BHK Modern House Plan",
    desc: "Smart and efficient 1 BHK house plan designed as per Vastu principles. Perfect for small families seeking comfort and positivity.",
    buyPrice: "₹999",
    consultPrice: "₹499",
    mainImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  },
  "1-bhk-compact-vastu-house-plan": {
    title: "1 BHK Modern House Plan",
    desc: "Smart and efficient 1 BHK house plan designed as per Vastu principles. Perfect for small families seeking comfort and positivity.",
    buyPrice: "₹999",
    consultPrice: "₹499",
    mainImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  },
  "2-bhk-modern-vastu-house-plan": {
    title: "2 BHK Modern Vastu Blueprint",
    desc: "Comfortable and balanced 2 BHK layout designed with optimal Ishan & Agneya directional placement.",
    buyPrice: "₹1,499",
    consultPrice: "₹699",
    mainImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
  },
  "3-bhk-spacious-vastu-house-plan": {
    title: "3 BHK Premium Vastu Villa Plan",
    desc: "Spacious 3 BHK villa plan with master suite in Nairutya and dedicated Puja room in North-East.",
    buyPrice: "₹1,999",
    consultPrice: "₹999",
    mainImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
  }
};

const getPlan = (planSlug: string) => {
  if (plansDatabase[planSlug]) return plansDatabase[planSlug];
  
  const title = planSlug
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: title || "1 BHK Modern House Plan",
    desc: "Smart and efficient 1 BHK house plan designed as per Vastu principles. Perfect for small families seeking comfort and positivity.",
    buyPrice: "₹999",
    consultPrice: "₹499",
    mainImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  };
};

export default function ArchitecturePlanDetailsPage({ params }: { params: Promise<{ slug: string; planSlug: string }> }) {
  const resolvedParams = React.use(params);
  const plan = getPlan(resolvedParams.planSlug);

  const [activeImage, setActiveImage] = useState(plan.mainImage);

  // 4 Locked Thumbnail previews
  const thumbnails = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen font-sans text-navy py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Standard Full-width Container matching all website pages (max-w-7xl) */}
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        
        {/* TOP SECTION: 2 EQUAL COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Main Image + 4 Locked Thumbnails (6 Cols) */}
          <div className="md:col-span-6 flex flex-col gap-3.5">
            {/* Main Image */}
            <div className="relative w-full h-[280px] sm:h-[340px] md:h-[380px] rounded-2xl overflow-hidden bg-slate-100 border border-border/70 shadow-sm">
              <img 
                src={activeImage} 
                alt={plan.title}
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white">
                <Compass className="w-4 h-4" />
              </div>
            </div>

            {/* 4 Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {thumbnails.map((thumb, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setActiveImage(thumb)}
                  className="relative h-16 sm:h-20 rounded-xl overflow-hidden bg-slate-200 cursor-pointer group shadow-xs border border-border/50"
                >
                  <img src={thumb} alt="Preview" className="w-full h-full object-cover filter brightness-[0.8] contrast-[0.9]" />
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center">
                    <div className="w-6.5 h-6.5 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-slate-800">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Info, Prices & Action Buttons (6 Cols) */}
          <div className="md:col-span-6 flex flex-col gap-4.5 justify-center">
            
            {/* Gold Vastu Compliant Pill Badge */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF3E6] text-[#A87B38] text-xs font-medium border border-[#F3E5CD]">
                <Sparkles className="w-3.5 h-3.5 text-[#A87B38]" />
                Vastu Compliant
              </span>
            </div>

            {/* Plan Title */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-navy leading-snug">
              {plan.title}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-navy/70 font-light leading-relaxed">
              {plan.desc}
            </p>

            {/* Side-by-Side Price Cards */}
            <div className="grid grid-cols-2 gap-4 my-1">
              <div className="p-3.5 rounded-xl bg-white border border-border/70 shadow-xs flex flex-col justify-center">
                <span className="text-xs font-medium text-muted-foreground">Buy Plan</span>
                <span className="text-xl sm:text-2xl font-bold text-primary">{plan.buyPrice}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-border/70 shadow-xs flex flex-col justify-center">
                <span className="text-xs font-medium text-muted-foreground">Book Consultation</span>
                <span className="text-xl sm:text-2xl font-bold text-navy">{plan.consultPrice}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              {/* Primary Gold Brand Button */}
              <Link
                href={`/book?type=buy-plan&title=${encodeURIComponent(plan.title)}`}
                className="w-full py-3 px-5 bg-primary hover:bg-gold-end text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Buy Plan Now</span>
              </Link>

              {/* Navy Brand Button */}
              <Link
                href={`/book?type=consultation&title=${encodeURIComponent(plan.title)}`}
                className="w-full py-3 px-5 bg-navy hover:bg-navy-light text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-primary" />
                <span>Book Consultation</span>
              </Link>
            </div>

          </div>

        </div>

        {/* BOTTOM SECTION: What you will get after purchase */}
        <div className="pt-8 border-t border-border/60 flex flex-col items-center">
          
          {/* Header Divider */}
          <div className="flex items-center gap-4 w-full max-w-md mx-auto mb-1">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-border to-transparent flex-grow" />
            <h2 className="font-serif text-base sm:text-lg font-medium text-navy text-center">
              What you will get after purchase
            </h2>
            <div className="h-[1px] bg-gradient-to-r from-transparent via-border to-transparent flex-grow" />
          </div>
          <div className="text-primary/60 text-xs mb-8">❀</div>

          {/* 5 Deliverables Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full mb-8">
            
            {/* Card 1: Floor Plan PDF */}
            <div className="bg-white rounded-xl p-4 border border-border/70 shadow-xs flex flex-col items-center text-center justify-between min-h-[150px]">
              <div className="relative mb-2">
                <div className="w-10 h-12 bg-red-600 rounded-md flex items-center justify-center text-white font-bold text-[11px]">
                  PDF
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow-xs border border-border flex items-center justify-center text-navy">
                  <Lock className="w-3 h-3" />
                </div>
              </div>
              <span className="font-medium text-xs text-navy mb-2 leading-snug">Floor Plan PDF</span>
              <span className="px-2.5 py-0.5 rounded-full bg-background-alt text-[10px] font-medium text-muted-foreground flex items-center gap-1 border border-border/50">
                <Lock className="w-2.5 h-2.5" /> Locked
              </span>
            </div>

            {/* Card 2: HD Floor Plan Images */}
            <div className="bg-white rounded-xl p-4 border border-border/70 shadow-xs flex flex-col items-center text-center justify-between min-h-[150px]">
              <div className="relative mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow-xs border border-border flex items-center justify-center text-navy">
                  <Lock className="w-3 h-3" />
                </div>
              </div>
              <span className="font-medium text-xs text-navy mb-2 leading-snug">HD Floor Plan Images</span>
              <span className="px-2.5 py-0.5 rounded-full bg-background-alt text-[10px] font-medium text-muted-foreground flex items-center gap-1 border border-border/50">
                <Lock className="w-2.5 h-2.5" /> Locked
              </span>
            </div>

            {/* Card 3: 3D Elevation Images */}
            <div className="bg-white rounded-xl p-4 border border-border/70 shadow-xs flex flex-col items-center text-center justify-between min-h-[150px]">
              <div className="relative mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow-xs border border-border flex items-center justify-center text-navy">
                  <Lock className="w-3 h-3" />
                </div>
              </div>
              <span className="font-medium text-xs text-navy mb-2 leading-snug">3D Elevation Images</span>
              <span className="px-2.5 py-0.5 rounded-full bg-background-alt text-[10px] font-medium text-muted-foreground flex items-center gap-1 border border-border/50">
                <Lock className="w-2.5 h-2.5" /> Locked
              </span>
            </div>

            {/* Card 4: Interior Images */}
            <div className="bg-white rounded-xl p-4 border border-border/70 shadow-xs flex flex-col items-center text-center justify-between min-h-[150px]">
              <div className="relative mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow-xs border border-border flex items-center justify-center text-navy">
                  <Lock className="w-3 h-3" />
                </div>
              </div>
              <span className="font-medium text-xs text-navy mb-2 leading-snug">Interior Images</span>
              <span className="px-2.5 py-0.5 rounded-full bg-background-alt text-[10px] font-medium text-muted-foreground flex items-center gap-1 border border-border/50">
                <Lock className="w-2.5 h-2.5" /> Locked
              </span>
            </div>

            {/* Card 5: Vastu & Room Details */}
            <div className="bg-white rounded-xl p-4 border border-border/70 shadow-xs flex flex-col items-center text-center justify-between min-h-[150px]">
              <div className="relative mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow-xs border border-border flex items-center justify-center text-navy">
                  <Lock className="w-3 h-3" />
                </div>
              </div>
              <span className="font-medium text-xs text-navy mb-2 leading-snug">Vastu & Room Details</span>
              <span className="px-2.5 py-0.5 rounded-full bg-background-alt text-[10px] font-medium text-muted-foreground flex items-center gap-1 border border-border/50">
                <Lock className="w-2.5 h-2.5" /> Locked
              </span>
            </div>

          </div>

          {/* Bottom Preview Notice Banner */}
          <div className="w-full py-3.5 px-6 rounded-xl bg-[#FBF6ED] border border-[#F3E5CD] flex items-center justify-center gap-2 text-navy text-xs sm:text-sm font-medium">
            <ShieldCheck className="w-4.5 h-4.5 text-primary flex-shrink-0" />
            <span>This is a preview. Purchase this plan to unlock all files.</span>
          </div>

        </div>

      </div>
    </div>
  );
}
