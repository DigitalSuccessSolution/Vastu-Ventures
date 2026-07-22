"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Home, Building2, MapPin, PencilRuler, ShieldCheck, Users, Edit3, Clock, CheckCircle2 } from "lucide-react";
import Image from "next/image";

// Data Structure
const pageData: Record<string, any> = {
  "house-planning-with-vastu": {
    breadcrumb: "House Planning with Vastu",
    titlePre: "House Planning",
    titleHighlight: "Vastu",
    titlePost: "",
    description: "Well-designed homes that align with Vastu principles for health, happiness and prosperity.",
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    servicesTitle: "Explore House Plans with Vastu",
    servicesDesc: "Choose from a wide range of Vastu-aligned house plans customized to your needs.",
    cards: [
      { title: "1 BHK House Plan", desc: "Smart and efficient 1 BHK house plans perfect for small families.", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" },
      { title: "2 BHK House Plan", desc: "Comfortable and balanced 2 BHK plans for modern living.", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop" },
      { title: "3 BHK House Plan", desc: "Spacious 3 BHK house plans designed for growing families.", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop" },
      { title: "4 BHK House Plan", desc: "Premium 4 BHK house plans with more space and luxury.", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2070&auto=format&fit=crop" },
      { title: "Duplex House Plan", desc: "Stylish duplex house plans that offer privacy and elegance.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" },
      { title: "Bungalow Planning", desc: "Beautiful bungalow designs with Vastu harmony and comfort.", image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=2070&auto=format&fit=crop" },
    ],
    ctaTitle: "Ready to Plan Your Dream Home?",
    ctaDesc: "Get a personalized Vastu-aligned house plan crafted just for you.",
    ctaBg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  },
  "commercial-planning-with-vastu": {
    breadcrumb: "Commercial Planning with Vastu",
    titlePre: "Commercial Planning with",
    titleHighlight: "Vastu",
    titlePost: "",
    description: "Empower your business with Vastu-compliant commercial spaces that attract growth, stability, and success.",
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    servicesTitle: "Explore Commercial Plans",
    servicesDesc: "Choose from a wide range of Vastu-aligned commercial spaces customized for success.",
    cards: [
      { title: "Office Planning", desc: "Vastu-aligned office layouts for productivity and growth.", image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop" },
      { title: "Shop Planning", desc: "Retail spaces designed to attract more footfall and sales.", image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop" },
      { title: "Hotel Planning", desc: "Hospitality designs focused on customer comfort and prosperity.", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop" },
      { title: "Hospital Planning", desc: "Healthcare spaces optimized for healing and positive energy.", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop" },
      { title: "School Planning", desc: "Educational environments designed for focus and knowledge.", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" },
      { title: "Mall Planning", desc: "Large retail layouts structured for maximum commercial success.", image: "https://images.unsplash.com/photo-1519567281013-51f04d161d2a?q=80&w=2070&auto=format&fit=crop" },
    ],
    ctaTitle: "Ready to Plan Your Workspace?",
    ctaDesc: "Get a personalized Vastu-aligned commercial plan crafted just for your business.",
    ctaBg: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop",
  },
  "plot-planning-analysis": {
    breadcrumb: "Plot Planning & Analysis",
    titlePre: "Plot Planning &",
    titleHighlight: "Analysis",
    titlePost: "",
    description: "Expert evaluation and planning of your land to ensure it aligns perfectly with the elements of nature for maximum prosperity.",
    heroImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2064&auto=format&fit=crop",
    servicesTitle: "Plot Selection & Planning",
    servicesDesc: "Ensure your land is perfectly aligned with Vastu for future prosperity.",
    cards: [
      { title: "Plot Selection", desc: "Expert guidance in selecting the perfect Vastu-compliant plot.", image: "https://images.unsplash.com/photo-1464047736614-af63643285bf?q=80&w=2070&auto=format&fit=crop" },
      { title: "Plot Analysis", desc: "Detailed analysis of your existing land's energy and layout.", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2064&auto=format&fit=crop" },
      { title: "Plot Planning", desc: "Strategic planning to maximize the potential of your land.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" },
    ],
    ctaTitle: "Need Help With Your Plot?",
    ctaDesc: "Get expert analysis and planning for your land today.",
    ctaBg: "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?q=80&w=2078&auto=format&fit=crop",
  },
  "architecture-consultation": {
    breadcrumb: "Architecture Consultation",
    titlePre: "Architecture",
    titleHighlight: "Consultation",
    titlePost: "",
    description: "Professional architectural guidance incorporating Vastu principles to bring your vision to life seamlessly.",
    heroImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop",
    servicesTitle: "Expert Consultation Services",
    servicesDesc: "Professional architectural guidance tailored to your specific needs.",
    cards: [
      { title: "Space Planning", desc: "Efficient and aesthetic spatial arrangements for any building.", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop" },
      { title: "Interior Consultation", desc: "Vastu-guided interior layouts for harmony and style.", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" },
      { title: "Floor Plan Consultation", desc: "Expert review and refinement of your architectural floor plans.", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop" },
      { title: "Architecture Guidance", desc: "Comprehensive architectural advice from start to finish.", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" },
    ],
    ctaTitle: "Start Your Architectural Journey",
    ctaDesc: "Book a consultation with our experts to bring your vision to reality.",
    ctaBg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop",
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
} as const;

export default function ArchitecturePlanningPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const data = pageData[resolvedParams.slug];

  if (!data) {
    notFound();
  }

  // Choose icon based on slug
  let CardIcon = Home;
  if (resolvedParams.slug === "commercial-planning-with-vastu") CardIcon = Building2;
  if (resolvedParams.slug === "plot-planning-analysis") CardIcon = MapPin;
  if (resolvedParams.slug === "architecture-consultation") CardIcon = PencilRuler;

  return (
    <div className="bg-[#FAF9F5] min-h-screen font-sans text-navy overflow-hidden">
      
    
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[350px] md:h-[400px] lg:h-[450px] flex items-center justify-center mb-8">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/architecture-planning.png" 
            alt="Architecture Planning"
            className="w-full h-full object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Centered Title Content Only */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto -mt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight drop-shadow-lg"
          >
            {data.breadcrumb}
          </motion.h1>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="pt-8 pb-20 lg:pt-12 lg:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-[#B58B54] uppercase mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15 8H21L16 12L18 18L12 14.5L6 18L8 12L3 8H9L12 2Z" fill="currentColor"/>
            </svg>
            OUR SERVICES
          </motion.div>
          <motion.h2 variants={fadeInUp} className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal text-navy mb-6">
            Explore {data.breadcrumb}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-navy/70 text-base max-w-xl mx-auto">
            {data.servicesDesc}
          </motion.p>
        </motion.div>

        {/* CARDS GRID */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 gap-y-6 md:gap-y-10 lg:px-12"
        >
          {data.cards.map((card: any, idx: number) => (
            <motion.div 
              key={idx} 
              variants={fadeInUp}
              className="group rounded-2xl overflow-hidden flex flex-col bg-white border border-[#EBEBEB] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Card Image */}
              <div className="relative h-32 sm:h-48 w-full overflow-hidden">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>

              {/* Card Content */}
              <div className="pt-4 pb-4 px-2.5 sm:pt-6 sm:pb-6 sm:px-5 flex flex-col flex-grow text-center items-center bg-[#FCFCFA]">
                <h3 className="font-serif text-sm sm:text-lg font-bold text-navy mb-1 sm:mb-2 line-clamp-1 sm:line-clamp-none">
                  {card.title}
                </h3>
                <p className="text-[10px] sm:text-sm text-navy/70 mb-3 sm:mb-4 leading-relaxed max-w-xs line-clamp-2 sm:line-clamp-none">
                  {card.desc}
                </p>
                
                <div className="text-[#B58B54] font-bold text-sm sm:text-lg mb-3 sm:mb-6">
                  {card.price || "₹4,999"}
                </div>
                
                <div className="mt-auto flex w-full">
                  <Link 
                    href="/book" 
                    className="w-full py-1.5 sm:py-2.5 px-2 sm:px-4 bg-[#B58B54] hover:bg-[#A37946] text-white text-[10px] sm:text-sm font-semibold rounded-full text-center transition-colors shadow-sm flex items-center justify-center gap-1 group/btn2"
                  >
                    Consult <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Removed CTA and Features as per user request */}

    </div>
  );
}
