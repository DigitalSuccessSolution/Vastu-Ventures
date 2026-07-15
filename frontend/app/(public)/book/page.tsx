"use client";

import React, { useState } from "react";
import { SERVICES, TIME_SLOTS } from "@/data/mockData";
import { Compass, Calendar as CalendarIcon, Clock, CheckCircle2, ChevronRight, Laptop, MapPin, User, Mail, Phone, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function BookConsultationPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(SERVICES[0].id);
  const [method, setMethod] = useState<"online" | "offline">("online");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [details, setDetails] = useState({ name: "", email: "", phone: "", notes: "" });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

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

  const activeService = SERVICES.find((s) => s.id === selectedService) || SERVICES[0];

  // Dummy dates list starting tomorrow
  const dates = [...Array(5)].map((_, i) => {
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
      setStep(2);
    } else if (step === 2) {
      if (!selectedDate || !selectedSlot) {
        alert("Please select a date and time slot first.");
        return;
      }
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.name || !details.email || !details.phone) {
      alert("Please fill in all details.");
      return;
    }
    console.log("Booking Confirmed:", {
      service: activeService.title,
      method,
      date: selectedDate,
      slot: selectedSlot,
      client: details
    });
    setBookingConfirmed(true);
  };

  if (bookingConfirmed) {
    return (
      <div className="bg-background vastu-mandala-bg min-h-screen py-20 text-center flex flex-col justify-center items-center">
        <div className="bg-white border border-border rounded-3xl p-8 sm:p-12 shadow-premium-lg max-w-xl mx-auto flex flex-col items-center gap-6 animate-fade-in-up">
          <div className="w-16 h-16 rounded-full bg-accent/15 text-accent flex items-center justify-center shadow-premium">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="text-center">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy">Consultation Scheduled!</h1>
            <p className="text-xs text-muted-foreground mt-2 font-light">Your session has been successfully booked in our calendar.</p>
          </div>

          <div className="w-full bg-background-alt border border-border rounded-2xl p-5 text-left text-xs text-navy flex flex-col gap-3">
            <div className="flex justify-between font-light">
              <span className="text-muted-foreground">Vastu Package:</span>
              <span className="font-semibold">{activeService.title}</span>
            </div>
            <div className="flex justify-between font-light">
              <span className="text-muted-foreground">Consultation Type:</span>
              <span className="font-semibold uppercase">{method} Session</span>
            </div>
            <div className="flex justify-between font-light">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-semibold">{selectedDate}</span>
            </div>
            <div className="flex justify-between font-light">
              <span className="text-muted-foreground">Time Slot:</span>
              <span className="font-semibold">{selectedSlot}</span>
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground font-light max-w-sm leading-relaxed">
            We have sent a calendar invite and payment details link to your email <span className="font-semibold text-navy">{details.email}</span>. Please review the attachments to prepare your premises floor plan beforehand.
          </p>

          <button
            onClick={() => {
              setBookingConfirmed(false);
              setStep(1);
              setSelectedDate("");
              setSelectedSlot("");
              setDetails({ name: "", email: "", phone: "", notes: "" });
            }}
            className="px-6 py-2.5 bg-navy hover:bg-navy-light text-white text-xs font-semibold rounded-xl shadow-premium transition-all cursor-pointer"
          >
            Schedule another slot
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background vastu-mandala-bg min-h-screen py-12 text-left">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariants}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold text-primary tracking-widest font-sans">Appointments Scheduler</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy mt-2">
            Book Vastu Audit Consultation
          </h1>
          <p className="text-xs text-muted-foreground mt-3 font-light">
            Follow our steps to select a service type, date, slot, and complete details for booking.
          </p>
        </div>

        {/* Multi-step progress bar */}
        <div className="flex items-center justify-center gap-2 mb-12 max-w-md mx-auto">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step >= s
                    ? "bg-navy text-white shadow-premium"
                    : "bg-white border border-border text-muted-foreground"
                }`}
              >
                {s}
              </div>
              {s !== 3 && <div className={`flex-grow h-0.5 max-w-[80px] ${step > s ? "bg-navy" : "bg-border"}`} />}
            </React.Fragment>
          ))}
        </div>

        {/* main card container */}
        <div className="bg-white border border-border rounded-3xl p-6 sm:p-10 shadow-premium-lg max-w-3xl mx-auto min-h-[400px] flex flex-col justify-between">
          
          {/* STEP 1: Select Service & Method */}
          {step === 1 && (
            <div className="flex flex-col gap-6 animate-fade-in-up">
              <div>
                <h3 className="font-serif text-lg font-bold text-navy mb-3">1. Choose Audit Type</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedService(s.id)}
                      className={`p-5 rounded-2xl border text-left flex flex-col justify-between h-36 transition-all cursor-pointer ${
                        selectedService === s.id
                          ? "border-primary bg-background-alt shadow-premium ring-1 ring-primary/45"
                          : "border-border bg-white hover:bg-background-alt/30"
                      }`}
                    >
                      <span className="text-xs font-bold text-navy">{s.title}</span>
                      <span className="text-[10px] text-primary font-bold mt-2">₹{s.price} Fee</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-navy mb-3">2. Choose Session Medium</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setMethod("online")}
                    className={`p-5 rounded-2xl border text-left flex items-start gap-4 transition-all cursor-pointer ${
                      method === "online"
                        ? "border-primary bg-background-alt shadow-premium ring-1 ring-primary/45"
                        : "border-border bg-white hover:bg-background-alt/30"
                    }`}
                  >
                    <Laptop className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-navy">Online video consultation</h4>
                      <p className="text-[10px] text-muted-foreground mt-1 font-light leading-relaxed">
                        60-min session on Zoom. Requires floor plan and direction mapping details. Available globally.
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setMethod("offline")}
                    className={`p-5 rounded-2xl border text-left flex items-start gap-4 transition-all cursor-pointer ${
                      method === "offline"
                        ? "border-primary bg-background-alt shadow-premium ring-1 ring-primary/45"
                        : "border-border bg-white hover:bg-background-alt/30"
                    }`}
                  >
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-navy">Offline site-inspection</h4>
                      <p className="text-[10px] text-muted-foreground mt-1 font-light leading-relaxed">
                        Physical audit by Raghavendra or team. Subject to location and travel expenses.
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Date & Slot Picker */}
          {step === 2 && (
            <div className="flex flex-col gap-6 animate-fade-in-up">
              <div>
                <h3 className="font-serif text-lg font-bold text-navy mb-3">1. Select Consultation Date</h3>
                <div className="grid grid-cols-5 gap-2.5">
                  {dates.map((d, idx) => {
                    const isSelected = selectedDate === d.fullVal;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedDate(d.fullVal)}
                        className={`py-3.5 px-2 rounded-xl border text-center flex flex-col justify-center items-center gap-1 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-navy border-navy text-white shadow-premium"
                            : "bg-white border-border text-navy-light hover:bg-background-alt"
                        }`}
                      >
                        <span className="text-[10px] font-medium tracking-wide uppercase opacity-75">{d.dayStr}</span>
                        <span className="text-base font-extrabold font-serif leading-none mt-0.5">{d.dateStr}</span>
                        <span className="text-[9px] uppercase font-bold tracking-wider opacity-75">{d.monthStr}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-navy mb-3">2. Select Available Time Slot</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? "bg-navy border-navy text-white shadow-premium"
                            : "bg-white border-border text-navy-light hover:bg-background-alt"
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Enter Personal details & Submit */}
          {step === 3 && (
            <form onSubmit={handleBook} className="flex flex-col gap-4 animate-fade-in-up">
              <h3 className="font-serif text-lg font-bold text-navy">Enter Details to Book</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div>
                  <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={details.name}
                    onChange={(e) => setDetails({ ...details, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none text-navy"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={details.email}
                    onChange={(e) => setDetails({ ...details, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none text-navy"
                  />
                </div>
              </div>

              <div className="text-left">
                <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={details.phone}
                  onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full text-xs px-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none text-navy"
                />
              </div>

              <div className="text-left">
                <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">
                  Space details / Consultation Goals
                </label>
                <textarea
                  rows={4}
                  value={details.notes}
                  onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                  placeholder="Describe your space concerns, size, or primary targets of this audit..."
                  className="w-full text-xs px-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none text-navy resize-none"
                />
              </div>

              <div className="bg-background-alt border border-border rounded-xl p-4 text-[10px] text-muted-foreground leading-normal mt-2 flex items-start gap-2.5">
                <Compass className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p>By scheduling, you request an assessment hold. Session link will remain active for 48 hours waiting for baseline plan uploads.</p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gold-gradient text-white text-xs font-semibold rounded-xl shadow-premium hover:shadow-premium-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-4"
              >
                Confirm Consultation Session Booking
              </button>
            </form>
          )}

          {/* Nav Controls */}
          {step !== 3 && (
            <div className="flex items-center justify-between border-t border-border pt-6 mt-8">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className="px-4 py-2 border border-border text-navy-light text-xs font-semibold rounded-lg hover:bg-background-alt disabled:opacity-40 transition-all flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>

              <button
                onClick={handleNext}
                className="px-5 py-2.5 bg-navy hover:bg-navy-light text-white text-xs font-semibold rounded-lg shadow-premium transition-all flex items-center gap-1 cursor-pointer"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="flex items-center justify-start mt-4">
              <button
                onClick={handleBack}
                className="px-4 py-2 border border-border text-navy-light text-xs font-semibold rounded-lg hover:bg-background-alt transition-all flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Slots
              </button>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
