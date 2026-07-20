"use client";

import React, { useState } from "react";
import { TIME_SLOTS } from "@/data/mockData";
import {
  Compass, Calendar as CalendarIcon, Clock, CheckCircle2, ChevronRight,
  MapPin, ChevronLeft, Home, Building2, Factory, Laptop, FileText, CreditCard
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const BOOKING_SERVICES = [
  { id: "residential", title: "Residential Vastu", icon: Home, price: 5000, desc: "Comprehensive Vastu analysis for homes, apartments, and villas." },
  { id: "commercial", title: "Commercial Vastu", icon: Building2, price: 8000, desc: "Vastu solutions for offices, shops, and commercial complexes." },
  { id: "industrial", title: "Industrial Vastu", icon: Factory, price: 15000, desc: "Specialized Vastu guidance for factories and manufacturing units." },
  { id: "online", title: "Online Consultation", icon: Laptop, price: 3000, desc: "Virtual video consultation with detailed floor plan analysis." },
  { id: "offline", title: "Offline Consultation", icon: MapPin, price: 10000, desc: "In-person site visit and physical inspection by our experts." },
];

export default function BookConsultationPage() {
  const [step, setStep] = useState(1);
  const [servicesList, setServicesList] = useState(BOOKING_SERVICES);
  const [selectedServiceId, setSelectedServiceId] = useState(BOOKING_SERVICES[0].id);
  const [propertyType, setPropertyType] = useState<"old" | "new" | null>(null);
  const [details, setDetails] = useState({ name: "", email: "", phone: "", date: "", slot: "" });
  const [coupon, setCoupon] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("");

  React.useEffect(() => {
    const saved = localStorage.getItem('adminServices');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setServicesList(prev => prev.map(s => {
          const adminService = parsed.find((as: any) => as.slug === `${s.id}-vastu`);
          if (adminService && adminService.price) {
            return { ...s, price: adminService.price };
          }
          return s;
        }));
      } catch (e) { }
    }
  }, []);

  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.16, 1, 0.3, 1] as const;

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: premiumEase } }
  };

  const activeService = servicesList.find((s) => s.id === selectedServiceId) || servicesList[0];
  const finalPrice = propertyType === "new" ? activeService.price + 10000 : activeService.price;

  // Dummy dates list starting tomorrow
  const dates = [...Array(14)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      dayStr: d.toLocaleDateString("en-US", { weekday: "short" }),
      dateStr: d.toLocaleDateString("en-US", { day: "numeric" }),
      monthStr: d.toLocaleDateString("en-US", { month: "short" }),
      fullVal: d.toISOString().split("T")[0]
    };
  });

  const handleNext = () => {
    if (step === 1) {
      if (!selectedServiceId) return alert("Please select a service");
      if (!(selectedServiceId === 'online' || selectedServiceId === 'offline') && !propertyType) {
        return alert("Please select a property type (Old / New)");
      }
      setStep(2);
    } else if (step === 2) {
      if (!details.name || !details.email || !details.phone) {
        return alert("Please fill in your personal details.");
      }
      if (!details.date) {
        return alert("Please select a preferred date.");
      }
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate Razorpay Payment Processing
    setTimeout(() => {
      setBookingId("VV-" + Math.floor(Math.random() * 1000000));
      setBookingConfirmed(true);
      setStep(4);
    }, 1500);
  };

  const STEPS = [
    { num: 1, title: "Choose Service" },
    { num: 2, title: "Your Details" },
    { num: 3, title: "Payment" },
    { num: 4, title: "Confirmed" }
  ];

  if (bookingConfirmed && step === 4) {
    return (
      <div className="bg-[#FDFBF7] min-h-screen py-16 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: premiumEase }}
          className="bg-white border border-[#E5E0D8] rounded-2xl p-8 sm:p-10 shadow-premium max-w-lg w-full flex flex-col items-center gap-6 relative overflow-hidden"
        >
          {/* Decorative background circle */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-50 rounded-full blur-3xl"></div>

          <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center shadow-sm relative z-10">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="text-center relative z-10">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy">Booking Successful!</h1>
            <p className="text-sm text-navy-light mt-2 font-medium">Booking ID: <span className="text-navy font-bold">{bookingId}</span></p>
          </div>

          <div className="w-full bg-[#FAF6F0] rounded-xl p-5 text-sm text-navy flex flex-col gap-3 border border-[#E5E0D8] relative z-10">
            <div className="flex justify-between items-center border-b border-[#E5E0D8] pb-3">
              <span className="text-navy-light">Service</span>
              <span className="font-semibold text-right">{activeService.title}</span>
            </div>
            <div className="flex justify-between items-center border-b border-[#E5E0D8] pb-3">
              <span className="text-navy-light">Date & Time</span>
              <span className="font-semibold text-right">{details.date} at {details.slot}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-navy-light">Payment Status</span>
              <span className="font-semibold text-green-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Paid Successfully
              </span>
            </div>
          </div>

          <p className="text-sm text-navy-light text-center leading-relaxed relative z-10">
            A confirmation email with meeting links and preparation instructions has been sent to <span className="font-semibold text-navy">{details.email}</span>.
          </p>

          <Link
            href="/dashboard"
            className="w-full py-3.5 mt-2 bg-navy hover:bg-[#1a2942] text-white text-sm font-semibold rounded-xl shadow-premium transition-all text-center relative z-10"
          >
            Go to Student Dashboard
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-left pb-20">

      {/* Hero Banner */}
      <section className="relative pt-24 pb-48 md:pt-32 md:pb-56 bg-navy text-white overflow-hidden border-b border-border">
        {/* Background Image with subtle overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="images/cources.png"
            alt="Consultation Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#172033] via-[#172033]/90 to-[#172033]/50" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-tight text-white mb-4">
              How To Book a Free Appointment for a Vastu Consultant.
            </h1>
            <p className="text-sm md:text-base text-white/85 font-light leading-relaxed max-w-lg">
              Follow these 3 simple and easy steps for booking a free appointment for a Vastu Consultant.
              Step No.1 : Tap on the Book Button • Step No.2 : Fill the form according to your needs. • Step No.3 : Submit Now
            </p>
          </div>

          {/* Feature boxes on the right */}
          <div className="flex flex-col gap-4 animate-fade-in-up lg:max-w-sm lg:ml-auto w-full mt-8 lg:mt-0">
            <div className="flex items-center gap-3 bg-black/20 border border-white/10 rounded-xl px-5 py-4 backdrop-blur-sm">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0"><CheckCircle2 className="w-3 h-3 text-white" /></div>
              <span className="text-sm font-medium">Full payment online</span>
            </div>
            <div className="flex items-center gap-3 bg-black/20 border border-white/10 rounded-xl px-5 py-4 backdrop-blur-sm">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0"><CheckCircle2 className="w-3 h-3 text-white" /></div>
              <span className="text-sm font-medium">WhatsApp confirmation</span>
            </div>
            <div className="flex items-center gap-3 bg-black/20 border border-white/10 rounded-xl px-5 py-4 backdrop-blur-sm">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0"><CheckCircle2 className="w-3 h-3 text-white" /></div>
              <span className="text-sm font-medium">Consultant assigned after pay</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24 md:-mt-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column (Main Card) */}
          <div className="lg:col-span-8">
            <motion.div
              key={step}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="bg-white border border-[#E5E0D8] rounded-[2rem] p-6 sm:p-10 shadow-premium min-h-[500px] flex flex-col justify-between"
            >

              {/* Premium Stepper */}
              <div className="mb-12 relative w-full max-w-[85%] mx-auto hidden sm:block border-b border-[#E5E0D8]/0 pb-8">
                {/* Progress Line */}
                <div className="absolute top-6 left-0 right-0 h-[3px] bg-[#EDE9E1] rounded-full z-0"></div>

                <div className="relative z-10 flex justify-between items-center">
                  {STEPS.map((s) => {
                    const isActive = step === s.num;
                    const isCompleted = step > s.num;
                    return (
                      <div key={s.num} className="flex flex-col items-center gap-4 relative">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-xs transition-all duration-300 bg-white ${isActive
                            ? "border-[2px] border-[#C39A3A] text-[#3D2C1C] font-extrabold font-serif shadow-[0_0_25px_rgba(195,154,58,0.25)]"
                            : isCompleted
                              ? "border border-[#EDE9E1] text-[#A39E99] font-serif"
                              : "border border-[#EDE9E1] text-[#A39E99] font-serif"
                            }`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-5 h-5 text-[#C39A3A]" /> : <span className="font-serif font-medium">{s.num}</span>}
                        </div>
                        <span className={`text-xs absolute top-[3.5rem] w-32 text-center whitespace-nowrap ${isActive
                          ? "text-[#3D2C1C] font-bold"
                          : "text-[#9A949F] font-semibold"
                          }`}>
                          {s.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Stepper (Simplified) */}
              <div className="sm:hidden mb-8 text-center border-b border-[#E5E0D8] pb-4">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#E28A3E]">Step {step} of 4</span>
                <h2 className="text-lg font-serif font-bold text-navy mt-1">{STEPS[step - 1].title}</h2>
              </div>

              {/* STEP 1: Choose Service */}
              {step === 1 && (
                <div className="flex flex-col h-full">
                  <div className="mb-8 text-center sm:text-left">
                    <h2 className="text-2xl font-serif font-bold text-navy">Select a Service</h2>
                    <p className="text-sm text-navy-light mt-2">Choose the type of consultation you require.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                    {servicesList.map((s) => {
                      const Icon = s.icon;
                      const isSelected = selectedServiceId === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => setSelectedServiceId(s.id)}
                          className={`group p-5 rounded-xl border text-left flex flex-col h-full transition-all cursor-pointer ${isSelected
                            ? "border-[#E28A3E] bg-[#FAF6F0] shadow-sm ring-1 ring-[#E28A3E]/30"
                            : "border-[#E5E0D8] bg-white hover:border-[#E28A3E]/50 hover:bg-gray-50 hover:-translate-y-1 hover:shadow-premium"
                            }`}
                        >
                          <Icon
                            className={`w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ${isSelected ? 'text-[#E28A3E]' : 'text-black'}`}
                            strokeWidth={1.2}
                          />
                          <h3 className={`font-serif text-xs sm:text-base font-semibold leading-snug transition-colors mb-1.5 ${isSelected ? 'text-[#E28A3E]' : 'text-black group-hover:text-[#E28A3E]'}`}>{s.title}</h3>
                          <p className="text-[10px] sm:text-xs text-muted-foreground font-light leading-relaxed flex-grow">{s.desc}</p>
                          <div className="mt-4 font-bold text-navy">₹{s.price.toLocaleString('en-IN')}</div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Property Type Block */}
                  {!(selectedServiceId === 'online' || selectedServiceId === 'offline') && (() => {
                    const propContent = selectedServiceId === 'commercial'
                      ? { old: { t: "Old Office / Shop", d: "Existing office or shop — full Vastu analysis" }, new: { t: "New Office / Shop", d: "Under construction or new commercial purchase — planning guidance" } }
                      : selectedServiceId === 'industrial'
                        ? { old: { t: "Old Factory / Industry", d: "Existing factory or industry — full Vastu analysis" }, new: { t: "New Factory / Industry", d: "Under construction or new industrial setup — planning guidance" } }
                        : { old: { t: "Old house", d: "Existing home or apartment — full Vastu analysis" }, new: { t: "New house", d: "Under construction or new villa purchase — planning guidance" } };

                    return (
                      <div className="border border-[#E5E0D8] rounded-2xl p-6 sm:p-8 bg-white shadow-sm mt-2">
                        <div className="flex items-start gap-4 mb-6">
                          <div>
                            <h3 className="font-serif text-xl text-navy font-semibold">Property type</h3>
                            <p className="text-sm text-navy-light mt-1">Vastu team pricing differs for existing vs new properties.</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <button
                            onClick={() => setPropertyType("old")}
                            className={`group p-4 sm:p-5 rounded-xl border text-left transition-all ${propertyType === "old"
                              ? "border-[#E28A3E] bg-[#FAF6F0] shadow-sm ring-1 ring-[#E28A3E]/30"
                              : "border-[#E5E0D8] bg-white hover:border-[#E28A3E]/50 hover:bg-gray-50 hover:-translate-y-1 hover:shadow-premium"
                              }`}
                          >
                            <div className="flex items-start gap-3 sm:gap-4 h-full">
                              <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${propertyType === "old" ? "border-[#E28A3E]" : "border-[#E5E0D8]"
                                }`}>
                                {propertyType === "old" && <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#E28A3E]"></div>}
                              </div>
                              <div className="flex flex-col h-full">
                                <h4 className={`font-serif text-xs sm:text-base font-semibold leading-snug transition-colors mb-1.5 ${propertyType === 'old' ? 'text-[#E28A3E]' : 'text-black group-hover:text-[#E28A3E]'}`}>{propContent.old.t}</h4>
                                <p className="text-[10px] sm:text-xs text-muted-foreground font-light leading-relaxed flex-grow mb-3">{propContent.old.d}</p>
                                <div className="font-bold text-navy">₹{activeService.price.toLocaleString('en-IN')}</div>
                              </div>
                            </div>
                          </button>

                          <button
                            onClick={() => setPropertyType("new")}
                            className={`group p-4 sm:p-5 rounded-xl border text-left transition-all ${propertyType === "new"
                              ? "border-[#E28A3E] bg-[#FAF6F0] shadow-sm ring-1 ring-[#E28A3E]/30"
                              : "border-[#E5E0D8] bg-white hover:border-[#E28A3E]/50 hover:bg-gray-50 hover:-translate-y-1 hover:shadow-premium"
                              }`}
                          >
                            <div className="flex items-start gap-3 sm:gap-4 h-full">
                              <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${propertyType === "new" ? "border-[#E28A3E]" : "border-[#E5E0D8]"
                                }`}>
                                {propertyType === "new" && <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#E28A3E]"></div>}
                              </div>
                              <div className="flex flex-col h-full">
                                <h4 className={`font-serif text-xs sm:text-base font-semibold leading-snug transition-colors mb-1.5 ${propertyType === 'new' ? 'text-[#E28A3E]' : 'text-black group-hover:text-[#E28A3E]'}`}>{propContent.new.t}</h4>
                                <p className="text-[10px] sm:text-xs text-muted-foreground font-light leading-relaxed flex-grow mb-3">{propContent.new.d}</p>
                                <div className="font-bold text-navy">₹{(activeService.price + 10000).toLocaleString('en-IN')}</div>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* STEP 2: Your Details */}
              {step === 2 && (
                <div className="flex flex-col h-full gap-8">
                  <div>
                    <h2 className="text-2xl font-serif text-navy mb-1">Your contact details</h2>
                    <p className="text-sm text-navy-light mb-8">We'll send your confirmation and session link here.</p>

                    <div className="flex flex-col gap-6">
                      <div>
                        <label className="block text-sm font-bold text-navy mb-2">Full name</label>
                        <input
                          type="text"
                          value={details.name}
                          onChange={(e) => setDetails({ ...details, name: e.target.value })}
                          placeholder="Enter your full name"
                          className="w-full text-sm px-4 py-3.5 rounded-xl border border-[#E5E0D8] bg-[#FAF6F0] focus:bg-white focus:border-[#E28A3E] outline-none text-navy transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-navy mb-2">WhatsApp number</label>
                        <input
                          type="tel"
                          value={details.phone}
                          onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                          placeholder="10-digit mobile number"
                          className="w-full text-sm px-4 py-3.5 rounded-xl border border-[#E5E0D8] bg-[#FAF6F0] focus:bg-white focus:border-[#E28A3E] outline-none text-navy transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-navy mb-2">Email address</label>
                        <input
                          type="email"
                          value={details.email}
                          onChange={(e) => setDetails({ ...details, email: e.target.value })}
                          placeholder="you@example.com"
                          className="w-full text-sm px-4 py-3.5 rounded-xl border border-[#E5E0D8] bg-[#FAF6F0] focus:bg-white focus:border-[#E28A3E] outline-none text-navy transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#E5E0D8] pt-8">
                    <h3 className="text-lg font-serif text-navy mb-1">Select session date</h3>
                    <p className="text-sm text-navy-light mb-4">Available dates:</p>

                    <div className="mb-6 flex overflow-x-auto pb-2 gap-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      {dates.map((d, idx) => {
                        const isSelected = details.date === d.fullVal;
                        return (
                          <button
                            key={idx}
                            onClick={() => setDetails({ ...details, date: d.fullVal })}
                            className={`flex-shrink-0 px-5 py-2.5 rounded-full border text-center transition-all cursor-pointer whitespace-nowrap text-sm ${isSelected
                              ? "bg-[#E28A3E] border-[#E28A3E] text-white font-bold shadow-md"
                              : "bg-white border-[#E5E0D8] text-navy hover:border-[#E28A3E]/50"
                              }`}
                          >
                            {d.dayStr}, {d.dateStr} {d.monthStr}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-4 border border-dashed border-[#E5E0D8] rounded-2xl p-5 bg-[#FAF6F0]">
                      <div className="flex items-center gap-2 mb-2 font-bold text-sm text-navy">
                        <span>📅</span> Continuous Session Timing (10:00 AM - 07:00 PM IST)
                      </div>
                      <p className="text-xs text-navy-light leading-relaxed">
                        Once booked, our support team will contact you on WhatsApp/Email to finalize the exact timing of your session on your selected date, based on the availability of the consultant.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Payment */}
              {step === 3 && (
                <div className="flex flex-col h-full justify-center">
                  <div className="max-w-md mx-auto w-full">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-serif font-bold text-navy">Checkout</h2>
                      <p className="text-sm text-navy-light mt-2">Review your details and complete payment.</p>
                    </div>

                    <div className="bg-[#FAF6F0] rounded-2xl p-6 border border-[#E5E0D8] mb-6">
                      <h3 className="font-bold text-navy mb-4 pb-4 border-b border-[#E5E0D8]">Consultation Summary</h3>

                      <div className="flex flex-col gap-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-navy-light">Service</span>
                          <span className="font-semibold text-navy">{activeService.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-navy-light">Date</span>
                          <span className="font-semibold text-navy">{details.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-navy-light">Time</span>
                          <span className="font-semibold text-navy">Continuous Session</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-navy-light">Name</span>
                          <span className="font-semibold text-navy">{details.name}</span>
                        </div>
                      </div>

                      <div className="mt-5 pt-5 border-t border-[#E5E0D8]">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-navy-light">Consultation Fee</span>
                          <span className="font-semibold text-navy">₹{finalPrice.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-navy-light">Taxes (18% GST)</span>
                          <span className="font-semibold text-navy">₹{Math.round(finalPrice * 0.18).toLocaleString('en-IN')}</span>
                        </div>

                        <div className="flex gap-2 mb-4">
                          <input
                            type="text"
                            placeholder="Coupon Code"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                            className="flex-grow text-sm px-3 py-2 rounded-lg border border-[#E5E0D8] outline-none focus:border-[#E28A3E]"
                          />
                          <button className="px-4 py-2 bg-navy text-white text-xs font-semibold rounded-lg hover:bg-navy-light transition-colors">
                            Apply
                          </button>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-dashed border-[#E5E0D8]">
                          <span className="font-bold text-navy text-base">Total Payable</span>
                          <span className="font-bold text-[#E28A3E] text-xl">₹{Math.round(finalPrice * 1.18).toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handlePayment}
                      className="w-full py-4 bg-[#02042A] hover:bg-navy-light text-white text-sm font-semibold rounded-xl shadow-premium transition-all flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10 flex items-center gap-2">
                        <CreditCard className="w-5 h-5" /> Pay via Razorpay
                      </span>
                    </button>
                    <div className="text-center mt-3 text-xs text-navy-light flex items-center justify-center gap-1">
                      Secure encrypted payment gateway
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons (Steps 1 & 2 only) */}
              {step < 3 && (
                <div className="flex items-center justify-between border-t border-[#E5E0D8] pt-8 mt-10">
                  <button
                    onClick={handleBack}
                    disabled={step === 1}
                    className={`px-8 py-3 text-sm font-bold rounded-full transition-all flex items-center gap-2 cursor-pointer ${step === 1
                      ? "text-gray-300 border border-gray-200 cursor-not-allowed opacity-0"
                      : "text-navy bg-white border border-[#E5E0D8] hover:bg-gray-50"
                      }`}
                  >
                    ← Back
                  </button>

                  <button
                    onClick={handleNext}
                    className="px-8 py-3 bg-navy hover:bg-[#1a2942] text-white text-sm font-bold rounded-full transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {step === 1 ? "Proceed to your details →" : "Proceed to payment →"}
                  </button>
                </div>
              )}

              {step === 3 && (
                <div className="flex items-center justify-center mt-4">
                  <button
                    onClick={handleBack}
                    className="text-sm font-medium text-navy-light hover:text-navy transition-colors flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back to Edit Details
                  </button>
                </div>
              )}

            </motion.div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-4 sticky top-24 hidden lg:block">
            <div className="bg-navy text-white rounded-t-[2rem] p-6 shadow-premium">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-bold tracking-widest text-white/70 uppercase">BOOKING SUMMARY</span>
                <span className="bg-white/10 text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wide">STEP {step}/4</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#E28A3E]"></div>
                <h3 className="font-serif text-lg font-bold">{activeService.title}</h3>
              </div>
              <div className="text-3xl font-bold font-serif mb-2">₹{finalPrice.toLocaleString('en-IN')}</div>
              <p className="text-xs text-white/70 mb-4 font-medium">Vastu Venture's</p>
              <p className="text-xs text-white/50 leading-relaxed font-light">Select old or new property for exact team pricing.</p>
            </div>

            <div className="bg-white border-x border-b border-[#E5E0D8] rounded-b-[2rem] p-6 shadow-premium relative">
              <div className="border border-[#E28A3E]/30 bg-[#FAF6F0] rounded-xl p-4 mb-6 relative">
                <p className="text-xs text-navy font-semibold mb-1">Package price</p>
                <div className="flex justify-between items-end">
                  <p className="text-[10px] text-navy-light leading-relaxed max-w-[140px]">Full session under Acharya Ji's reference</p>
                  <p className="text-xl font-serif text-[#E28A3E] font-bold leading-none">₹{finalPrice.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#F3F4F6] flex items-center justify-center flex-shrink-0"><CheckCircle2 className="w-2.5 h-2.5 text-gray-400" /></div>
                  <span className="text-xs font-medium text-navy-light">Secure Razorpay checkout</span>
                </div>
                <div className="w-full h-px bg-[#F3F4F6]"></div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#F3F4F6] flex items-center justify-center flex-shrink-0"><CheckCircle2 className="w-2.5 h-2.5 text-gray-400" /></div>
                  <span className="text-xs font-medium text-navy-light">WhatsApp & email confirmation</span>
                </div>
                <div className="w-full h-px bg-[#F3F4F6]"></div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#F3F4F6] flex items-center justify-center flex-shrink-0"><CheckCircle2 className="w-2.5 h-2.5 text-gray-400" /></div>
                  <span className="text-xs font-medium text-navy-light">Session scheduled after payment</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
