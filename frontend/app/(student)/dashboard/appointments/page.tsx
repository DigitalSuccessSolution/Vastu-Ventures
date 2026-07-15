"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Laptop, MapPin, CheckCircle, ChevronRight, Compass } from "lucide-react";

export default function AppointmentsHistoryPage() {
  const appointments = [
    {
      id: "a1",
      title: "Residential Vastu Consultation",
      type: "online",
      date: "July 15, 2026",
      time: "10:30 AM - 11:30 AM",
      status: "Upcoming"
    },
    {
      id: "a2",
      title: "Office Vastu Evaluation",
      type: "online",
      date: "May 22, 2026",
      time: "02:30 PM - 03:30 PM",
      status: "Completed"
    }
  ];

  return (
    <div className="flex flex-col gap-8 text-left max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-navy">Consultations & Audits</h2>
          <p className="text-xs text-muted-foreground mt-1 font-light">
            Track your space assessment bookings and access active session meeting links.
          </p>
        </div>
        <Link
          href="/book"
          className="px-5 py-2.5 bg-gold-gradient text-white text-xs font-bold rounded-xl shadow-premium hover:shadow-premium-lg hover:scale-[1.01] transition-all flex items-center gap-1.5"
        >
          <Calendar className="w-4 h-4" /> Book New Session
        </Link>
      </div>

      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-premium">
        <div className="divide-y divide-border/60">
          {appointments.map((app) => (
            <div
              key={app.id}
              className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-background-alt/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-background-alt text-primary flex items-center justify-center flex-shrink-0">
                  <Compass className="w-5.5 h-5.5" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-navy">{app.title}</h4>
                  <div className="flex items-center gap-2 mt-1.5 text-[10px] text-muted-foreground font-light">
                    <span className="flex items-center gap-1">
                      {app.type === "online" ? (
                        <>
                          <Laptop className="w-3.5 h-3.5 text-primary" /> Zoom Session
                        </>
                      ) : (
                        <>
                          <MapPin className="w-3.5 h-3.5 text-primary" /> Site Visit
                        </>
                      )}
                    </span>
                    <span>•</span>
                    <span>{app.date}</span>
                    <span>•</span>
                    <span>{app.time}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <span
                  className={`px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                    app.status === "Upcoming"
                      ? "bg-accent/15 text-accent border border-accent/20"
                      : "bg-muted-foreground/15 text-muted-foreground border border-muted-foreground/20"
                  }`}
                >
                  {app.status}
                </span>
                {app.status === "Upcoming" ? (
                  <button
                    onClick={() => alert("Zoom session link will open 10 mins before time.")}
                    className="px-4 py-2 bg-navy hover:bg-navy-light text-white text-[10px] font-semibold rounded-lg shadow-premium"
                  >
                    Join Zoom Call
                  </button>
                ) : (
                  <button
                    onClick={() => alert("Consultation correction report PDF mock downloads...")}
                    className="px-4 py-2 border border-border text-navy-light text-[10px] font-semibold rounded-lg hover:bg-background-alt"
                  >
                    Download Audit Report
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
