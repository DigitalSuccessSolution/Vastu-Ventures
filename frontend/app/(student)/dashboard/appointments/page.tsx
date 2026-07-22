"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Laptop, MapPin, Loader2, Clock, Video, FileText } from "lucide-react";
import api from "@/lib/axios";

export default function AppointmentsHistoryPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await api.get("/users/appointments");
        if (data.success) setAppointments(data.data || []);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-7 h-7 animate-spin text-primary" />
        <p className="text-xs text-navy font-medium">Loading Consultations...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* Clean Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-navy">Consultations & Audits</h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal mt-1">
            Track your space assessment bookings and access active session meeting links.
          </p>
        </div>

        <Link
          href="/book"
          className="px-4 py-2.5 bg-gold-gradient text-white text-xs font-semibold rounded-xl shadow-sm hover:opacity-95 transition-all flex items-center gap-1.5 shrink-0"
        >
          <Calendar className="w-4 h-4" /> Book New Session
        </Link>
      </div>

      {/* Appointments List Container */}
      <div className="bg-white border border-border/80 rounded-2xl overflow-hidden shadow-sm w-full">
        {appointments.length === 0 ? (
          <div className="py-16 text-center flex flex-col items-center justify-center p-8">
            <Calendar className="w-8 h-8 text-muted-foreground/30 mb-2" />
            <h2 className="text-sm font-semibold text-navy mb-1">No appointment history found</h2>
            <p className="text-xs text-muted-foreground font-normal mb-4 max-w-xs">
              You haven't scheduled any Vastu consultations yet.
            </p>
            <Link
              href="/book"
              className="px-4 py-2 bg-navy text-white text-xs font-semibold rounded-xl hover:bg-navy-light transition-all"
            >
              Book Session
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border/60">
            {appointments.map((app) => {
              const apptDate = new Date(app.date);
              return (
                <div
                  key={app._id}
                  className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-[#FAF9F6] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center bg-[#FAF6F0] w-12 h-12 rounded-xl flex-shrink-0 text-navy border border-[#EDE3D0]">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-primary">{apptDate.toLocaleString('default', { month: 'short' })}</span>
                      <span className="text-base font-bold leading-none">{apptDate.getDate()}</span>
                    </div>

                    <div className="text-left">
                      <h2 className="text-sm font-semibold text-navy leading-snug">{app.service?.title || app.service || "Vastu Consultation"}</h2>
                      
                      <div className="flex flex-wrap items-center gap-2.5 mt-1 text-xs text-muted-foreground font-normal">
                        <span className="flex items-center gap-1 text-navy-light font-medium">
                          {app.service?.type === "Online" || app.type === "Online" ? (
                            <>
                              <Laptop className="w-3.5 h-3.5 text-primary" /> Online Session
                            </>
                          ) : (
                            <>
                              <MapPin className="w-3.5 h-3.5 text-primary" /> On-site Audit
                            </>
                          )}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-primary" /> {app.timeSlot || apptDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-border/40">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                        app.status === "Pending" || app.status === "Confirmed"
                          ? "bg-amber-50 text-amber-800 border border-amber-200"
                          : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      }`}
                    >
                      {app.status || "Confirmed"}
                    </span>

                    {app.status === "Pending" || app.status === "Confirmed" ? (
                      <button
                        type="button"
                        onClick={() => alert("Zoom session link will open 10 mins before your scheduled time.")}
                        className="px-3.5 py-1.5 bg-navy hover:bg-navy-light text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Video className="w-3.5 h-3.5 text-primary" /> Join Session
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => alert("Downloading consultation audit report...")}
                        className="px-3.5 py-1.5 border border-border bg-white text-navy text-xs font-semibold rounded-xl hover:bg-[#FAF6F0] transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-primary" /> Audit Report
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
