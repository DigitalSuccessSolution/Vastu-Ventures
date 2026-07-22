"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Eye, ShoppingCart, Calendar, CheckCircle2, ShieldCheck, Star, Compass } from "lucide-react";

// Data Structure for Architecture Planning Categories
const pageData: Record<string, any> = {
  "house-planning-with-vastu": {
    breadcrumb: "House Planning with Vastu",
    titlePre: "House Planning",
    titleHighlight: "Vastu",
    description: "Well-designed homes that align with ancient Vastu principles for health, wealth, and prosperity.",
    servicesTitle: "Explore House Plans with Vastu",
    servicesDesc: "Choose from a wide range of Vastu-aligned residential blueprints customized to your plot size.",
    cards: [
      {
        slug: "1-bhk-vastu-house-plan",
        title: "1 BHK Compact Vastu House Plan",
        desc: "Smart and efficient 1 BHK layout perfect for small families, nuclear homes, or rental units.",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
        buyPrice: "₹2,999",
        buyOriginalPrice: "₹5,999",
        consultPrice: "₹999",
        consultOriginalPrice: "₹1,999",
        dimensions: "20' x 30' (600 sq.ft)",
        facing: "East Facing",
        vastuScore: "96%"
      },
      {
        slug: "2-bhk-modern-vastu-house-plan",
        title: "2 BHK Modern Vastu Blueprint",
        desc: "Comfortable and balanced 2 BHK layout designed with optimal Ishan & Agneya directional placement.",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
        buyPrice: "₹4,999",
        buyOriginalPrice: "₹9,999",
        consultPrice: "₹1,499",
        consultOriginalPrice: "₹2,999",
        dimensions: "30' x 40' (1200 sq.ft)",
        facing: "North-East Facing",
        vastuScore: "98%"
      },
      {
        slug: "3-bhk-spacious-vastu-house-plan",
        title: "3 BHK Premium Vastu Villa Plan",
        desc: "Spacious 3 BHK plan with master suite in Nairutya and dedicated Puja room in North-East.",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
        buyPrice: "₹6,999",
        buyOriginalPrice: "₹13,999",
        consultPrice: "₹1,999",
        consultOriginalPrice: "₹3,999",
        dimensions: "35' x 50' (1750 sq.ft)",
        facing: "East Facing",
        vastuScore: "99%"
      },
      {
        slug: "4-bhk-luxury-vastu-house-plan",
        title: "4 BHK Luxury Vastu Residence Blueprint",
        desc: "High-end 4 BHK layout with double-height ceiling, private garden, and complete Vastu compliance.",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2070&auto=format&fit=crop",
        buyPrice: "₹8,999",
        buyOriginalPrice: "₹17,999",
        consultPrice: "₹2,499",
        consultOriginalPrice: "₹4,999",
        dimensions: "40' x 60' (2400 sq.ft)",
        facing: "North Facing",
        vastuScore: "97%"
      },
      {
        slug: "duplex-vastu-house-plan",
        title: "Duplex Royal Vastu Villa Plan",
        desc: "Stylish 2-floor duplex blueprint featuring spacious living zones, balcony, and staircase in South-West.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
        buyPrice: "₹7,999",
        buyOriginalPrice: "₹15,999",
        consultPrice: "₹2,199",
        consultOriginalPrice: "₹4,399",
        dimensions: "30' x 50' (3000 sq.ft total)",
        facing: "East Facing",
        vastuScore: "98%"
      },
      {
        slug: "bungalow-vastu-masterplan",
        title: "Independent Bungalow Vastu Masterplan",
        desc: "Exclusive independent bungalow layout with open courtyard, gazebo, and Vastu-optimized landscape.",
        image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=2070&auto=format&fit=crop",
        buyPrice: "₹9,999",
        buyOriginalPrice: "₹19,999",
        consultPrice: "₹2,999",
        consultOriginalPrice: "₹5,999",
        dimensions: "50' x 80' (4000 sq.ft)",
        facing: "North-East Facing",
        vastuScore: "99%"
      }
    ]
  },
  "commercial-planning-with-vastu": {
    breadcrumb: "Commercial Planning with Vastu",
    titlePre: "Commercial Planning with",
    titleHighlight: "Vastu",
    description: "Empower your business with Vastu-compliant commercial spaces that attract growth, stability, and financial success.",
    servicesTitle: "Explore Commercial Plans",
    servicesDesc: "Choose from a wide range of Vastu-aligned commercial spaces customized for business expansion.",
    cards: [
      {
        slug: "office-space-vastu-layout",
        title: "Corporate Office Vastu Layout",
        desc: "Productivity-focused office layout with MD cabin in South-West and accounts section in North.",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
        buyPrice: "₹5,999",
        buyOriginalPrice: "₹11,999",
        consultPrice: "₹1,999",
        consultOriginalPrice: "₹3,999",
        dimensions: "30' x 60' (1800 sq.ft)",
        facing: "North-East Facing",
        vastuScore: "98%"
      },
      {
        slug: "retail-shop-vastu-plan",
        title: "Retail Store & Showroom Vastu Plan",
        desc: "Customer-centric retail shop layout designed to maximize footfall and cash register energy.",
        image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop",
        buyPrice: "₹4,499",
        buyOriginalPrice: "₹8,999",
        consultPrice: "₹1,499",
        consultOriginalPrice: "₹2,999",
        dimensions: "20' x 45' (900 sq.ft)",
        facing: "East Facing",
        vastuScore: "97%"
      },
      {
        slug: "hotel-resort-vastu-blueprint",
        title: "Hotel & Resort Vastu Masterplan",
        desc: "Hospitality designs focused on guest comfort, kitchen energy (Agneya), and high occupancy rates.",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
        buyPrice: "₹12,999",
        buyOriginalPrice: "₹24,999",
        consultPrice: "₹3,999",
        consultOriginalPrice: "₹7,999",
        dimensions: "100' x 150' (15000 sq.ft)",
        facing: "North Facing",
        vastuScore: "99%"
      },
      {
        slug: "hospital-clinic-vastu-layout",
        title: "Healthcare Clinic & Hospital Vastu Plan",
        desc: "Medical facility layout structured for quick recovery, positive patient aura, and operation theatre energy.",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
        buyPrice: "₹9,999",
        buyOriginalPrice: "₹19,999",
        consultPrice: "₹2,999",
        consultOriginalPrice: "₹5,999",
        dimensions: "50' x 80' (4000 sq.ft)",
        facing: "East Facing",
        vastuScore: "98%"
      },
      {
        slug: "school-institution-vastu-plan",
        title: "School & Educational Campus Vastu Blueprint",
        desc: "Educational environment designed for focus, knowledge growth, and student safety.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
        buyPrice: "₹11,499",
        buyOriginalPrice: "₹22,999",
        consultPrice: "₹3,499",
        consultOriginalPrice: "₹6,999",
        dimensions: "80' x 120' (9600 sq.ft)",
        facing: "North-East Facing",
        vastuScore: "99%"
      },
      {
        slug: "commercial-shopping-complex-plan",
        title: "Shopping Mall & Complex Vastu Blueprint",
        desc: "Multi-floor commercial retail structure optimized for high rental yields and footfall circulation.",
        image: "https://images.unsplash.com/photo-1519567281013-51f04d161d2a?q=80&w=2070&auto=format&fit=crop",
        buyPrice: "₹14,999",
        buyOriginalPrice: "₹29,999",
        consultPrice: "₹4,999",
        consultOriginalPrice: "₹9,999",
        dimensions: "120' x 200' (24000 sq.ft)",
        facing: "North Facing",
        vastuScore: "97%"
      }
    ]
  },
  "plot-planning-analysis": {
    breadcrumb: "Plot Planning & Analysis",
    titlePre: "Plot Planning &",
    titleHighlight: "Analysis",
    description: "Expert evaluation and architectural mapping of your land to ensure natural alignment and energy flow.",
    servicesTitle: "Plot Selection & Analysis Masterplans",
    servicesDesc: "Ensure your land is perfectly aligned with Vastu for future residential or commercial construction.",
    cards: [
      {
        slug: "residential-plot-vastu-evaluation",
        title: "Residential Plot Energy & Shape Audit",
        desc: "Comprehensive analysis of land slope, soil quality, road facing, and corner extensions (Sher Mukhi / Gaumukhi).",
        image: "https://images.unsplash.com/photo-1464047736614-af63643285bf?q=80&w=2070&auto=format&fit=crop",
        buyPrice: "₹3,499",
        buyOriginalPrice: "₹6,999",
        consultPrice: "₹1,199",
        consultOriginalPrice: "₹2,399",
        dimensions: "Any Plot Size",
        facing: "All Orientations",
        vastuScore: "100%"
      },
      {
        slug: "industrial-land-vastu-analysis",
        title: "Industrial & Factory Land Site Evaluation",
        desc: "Deep site analysis for heavy machinery placement, transformer (Agneya), and water tank (Ishan) alignment.",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2064&auto=format&fit=crop",
        buyPrice: "₹7,999",
        buyOriginalPrice: "₹15,999",
        consultPrice: "₹2,499",
        consultOriginalPrice: "₹4,999",
        dimensions: "1 Acre+",
        facing: "North / East Priority",
        vastuScore: "98%"
      },
      {
        slug: "farmhouse-land-vastu-masterplan",
        title: "Farmhouse & Estate Land Vastu Masterplan",
        desc: "Strategic boundary wall, borewell, entrance gate, and farmhouse zoning for peaceful retreats.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        buyPrice: "₹8,999",
        buyOriginalPrice: "₹17,999",
        consultPrice: "₹2,799",
        consultOriginalPrice: "₹5,599",
        dimensions: "0.5 Acre+",
        facing: "East / North-East",
        vastuScore: "99%"
      }
    ]
  },
  "architecture-consultation": {
    breadcrumb: "Architecture Consultation",
    titlePre: "Architecture",
    titleHighlight: "Consultation",
    description: "Professional architectural guidance incorporating Vastu principles to bring your vision to life seamlessly.",
    servicesTitle: "Architectural & Vastu Consultation Packages",
    servicesDesc: "Direct 1-on-1 architectural reviews, blueprint modifications, and space planning guidance.",
    cards: [
      {
        slug: "1-on-1-architectural-vastu-review",
        title: "1-on-1 Live Blueprint Review & Modification",
        desc: "Live video consultation with Senior Vastu Architect to review and optimize your existing floor plans.",
        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop",
        buyPrice: "₹3,999",
        buyOriginalPrice: "₹7,999",
        consultPrice: "₹1,299",
        consultOriginalPrice: "₹2,599",
        dimensions: "Custom Scope",
        facing: "Direct Video Session",
        vastuScore: "100%"
      },
      {
        slug: "interior-vastu-planning-consultation",
        title: "Interior Spatial Layout & Color Vastu",
        desc: "Vastu-guided interior layout recommendations for furniture, kitchen stove, bed orientation, and wall colors.",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
        buyPrice: "₹4,999",
        buyOriginalPrice: "₹9,999",
        consultPrice: "₹1,499",
        consultOriginalPrice: "₹2,999",
        dimensions: "Full House / Office",
        facing: "Vastu Color Palette",
        vastuScore: "98%"
      },
      {
        slug: "structural-renovation-vastu-audit",
        title: "Renovation & Non-Demolition Vastu Remedies",
        desc: "Architectural remedies for existing structures without demolition using pyramidal energy & directional tools.",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop",
        buyPrice: "₹5,499",
        buyOriginalPrice: "₹10,999",
        consultPrice: "₹1,699",
        consultOriginalPrice: "₹3,399",
        dimensions: "Existing Property",
        facing: "Non-Demolition",
        vastuScore: "96%"
      },
      {
        slug: "full-turnkey-architecture-guidance",
        title: "Turnkey Architecture & Construction Advisory",
        desc: "Complete end-to-end guidance from conceptual drawing, 3D visualization, to structural site execution.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
        buyPrice: "₹14,999",
        buyOriginalPrice: "₹29,999",
        consultPrice: "₹4,999",
        consultOriginalPrice: "₹9,999",
        dimensions: "Full Project Scope",
        facing: "Complete Supervision",
        vastuScore: "100%"
      }
    ]
  }
};

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
  const data = pageData[resolvedParams.slug];

  if (!data) {
    notFound();
  }

  return (
    <div className="bg-[#FAF9F5] min-h-screen font-sans text-navy overflow-hidden">
      
      {/* 1. HERO BANNER */}
      <section className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] flex items-center justify-center mb-8">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/architecture-planning.png" 
            alt={data.breadcrumb}
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
            {data.breadcrumb}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto mt-3 font-light leading-relaxed"
          >
            {data.description}
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
            {data.servicesTitle}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-navy/70 text-sm sm:text-base max-w-2xl mx-auto font-light">
            {data.servicesDesc}
          </motion.p>
        </motion.div>

        {/* CARDS GRID (3 Columns on Desktop) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:px-4"
        >
          {data.cards.map((card: any, idx: number) => {
            const cardSlug = card.slug;
            const detailsHref = `/architecture-planning/${resolvedParams.slug}/${cardSlug}`;

            return (
              <motion.div 
                key={cardSlug || idx} 
                variants={fadeInUp}
                className="group rounded-2xl overflow-hidden flex flex-col bg-white border border-border/80 shadow-premium hover:shadow-premium-lg hover:border-primary/40 transition-all duration-300 text-left"
              >
                {/* 1. Card Image */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-navy/5">
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
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
                        <span className="text-[10px] text-white/90 font-medium">{card.buyPrice}</span>
                      </Link>

                      <Link 
                        href={`/book?type=consultation&title=${encodeURIComponent(card.title)}`}
                        className="py-2.5 px-2 bg-navy hover:bg-navy-light text-white rounded-xl transition-all shadow-sm flex flex-col items-center justify-center cursor-pointer text-center"
                      >
                        <span className="text-xs font-bold text-white">Consultation</span>
                        <span className="text-[10px] text-primary font-bold">{card.consultPrice}</span>
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
      </section>

    </div>
  );
}
