"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Home, 
  Briefcase, 
  Factory, 
  Monitor, 
  UserRound, 
  ArrowRight, 
  Check, 
  Calendar,
  Sparkles,
  MapPin,
  Clock,
  Compass
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const serviceList = [
  {
    id: "s1",
    title: "Residential Vastu Consultation",
    slug: "residential-vastu",
    category: "residential",
    icon: Home,
    description: "Harmonize your living spaces, bedroom, kitchen, and entrance to attract health, wealth, and peaceful relationships.",
    price: 150,
    time: "2-3 Days Delivery",
    location: "Online / Email Report",
    benefits: [
      "Optimal bedroom positioning for sound sleep",
      "Kitchen fire-water element balance correction",
      "Entrance energy scanning and blocking remedies",
      "Pancha Bhoota (5 elements) chart mapping"
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "s2",
    title: "Commercial Office Vastu",
    slug: "commercial-vastu",
    category: "commercial",
    icon: Briefcase,
    description: "Boost business sales, executive decision making, team productivity, and cash flow with optimal layouts.",
    price: 300,
    time: "4-5 Days Delivery",
    location: "On-site / Video Call",
    benefits: [
      "Owner/CEO cabin direction and desk alignment",
      "Accounts section placement to lock finances",
      "Optimal sales/marketing team sitting layout",
      "Reception area welcoming positive vibrations"
    ],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "s3",
    title: "Industrial & Factory Vastu",
    slug: "industrial-vastu",
    category: "commercial",
    icon: Factory,
    description: "Ensure smooth manufacturing workflows, prevent machine breakdowns, and enhance workers' safety.",
    price: 600,
    time: "7 Days Delivery",
    location: "On-site Inspection",
    benefits: [
      "Heavy raw material Southwest storage loading",
      "Southeast boiler, furnace, and generator setup",
      "Product exit & entry gate directional correction",
      "Admin block & staff quarters Vastu sync"
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "s4",
    title: "Online Vastu Consultation",
    slug: "online-consultation",
    category: "consultation",
    icon: Monitor,
    description: "Get immediate Vastu remedies for your existing space via a layout map scan and a 1-on-1 video session.",
    price: 199,
    time: "60 Mins Session",
    location: "Zoom / Google Meet",
    benefits: [
      "Live drawing/blueprint analysis by Acharya",
      "Direction verification using digital compass",
      "Instantly applicable non-destructive remedies",
      "Post-session digital remedial blueprint PDF"
    ],
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "s5",
    title: "Offline Site Vastu Audit",
    slug: "offline-consultation",
    category: "consultation",
    icon: UserRound,
    description: "Premium on-site Vastu scanning, soil quality inspection, and full compass alignment by our master experts.",
    price: 499,
    time: "Full Day Audit",
    location: "Physical Site Visit",
    benefits: [
      "Physical dowsing & soil energy field testing",
      "Precise site elevation & slope calibration",
      "Geopathic stress line scanning & neutralization",
      "In-person consultation and correction report"
    ],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
  }
];

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredServices = activeFilter === "all"
    ? serviceList
    : serviceList.filter(service => service.category === activeFilter);

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Decorative concentric rings */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full border border-dashed border-[#E28A3E]/10 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 rounded-full border border-dashed border-[#E28A3E]/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3E4] text-[#E28A3E] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Vedic Spatial Science
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight">
            Our Vastu <span className="text-[#E28A3E]">Consultations</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-4 font-light leading-relaxed">
            Scientifically transform the energy of your space with our non-demolition alignments, color therapies, and cardinal balancing reports.
          </p>
        </div>

        {/* Categories / Filter Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
          {[
            { id: "all", label: "All Services" },
            { id: "residential", label: "Residential" },
            { id: "commercial", label: "Commercial & Factory" },
            { id: "consultation", label: "Direct Consultations" }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all shadow-sm cursor-pointer ${
                activeFilter === btn.id
                  ? "bg-gold-gradient text-white shadow-premium"
                  : "bg-white border border-[#EDE3D0]/60 text-navy hover:bg-[#FAF6F0]"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Services Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group bg-white border border-[#EDE3D0]/60 rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Cover Photo */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/20 to-transparent" />
                      
                      {/* Floating circular icon */}
                      <div className="absolute bottom-4 left-4 w-12 h-12 rounded-2xl bg-white text-[#E28A3E] flex items-center justify-center shadow-md">
                        <Icon className="w-6 h-6" strokeWidth={1.5} />
                      </div>

                      {/* Location Badge */}
                      <span className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-[#E28A3E]/95 text-white text-[10px] uppercase font-bold tracking-wider shadow-sm flex items-center gap-1">
                        <Compass className="w-3 h-3" />
                        {service.location}
                      </span>
                    </div>

                    {/* Body content */}
                    <div className="p-6">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-navy group-hover:text-[#E28A3E] transition-colors leading-snug">
                        {service.title}
                      </h3>
                      
                      <p className="text-xs text-muted-foreground mt-2.5 font-light leading-relaxed">
                        {service.description}
                      </p>

                      {/* Service Delivery Specs */}
                      <div className="mt-4 pt-3 border-t border-[#EDE3D0]/40 flex items-center gap-4 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#E28A3E]" />
                          {service.time}
                        </span>
                      </div>

                      {/* Key features / Benefits checkmarks */}
                      <div className="mt-5 flex flex-col gap-2.5">
                        {service.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex gap-2.5 items-start text-xs text-navy">
                            <div className="w-4.5 h-4.5 rounded-full bg-[#FEF3E4] flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-[#E28A3E]" strokeWidth={2.5} />
                            </div>
                            <span className="font-light leading-relaxed">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Price and Action Footer */}
                  <div className="p-6 pt-0">
                    <div className="border-t border-[#EDE3D0]/50 pt-4 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">Consultation Fee</span>
                        <p className="text-xl font-bold text-navy mt-0.5">₹{service.price}</p>
                      </div>
                      <Link
                        href="/book"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gold-gradient hover:opacity-95 text-white text-xs font-bold shadow-premium hover:shadow-premium-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                      >
                        <span>Book Session</span>
                        <Calendar className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
