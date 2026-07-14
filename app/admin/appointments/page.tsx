"use client";

import React, { useState } from "react";
import { Check, X } from "lucide-react";

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState([
    { id: "a1", name: "Aditya Sharma", service: "Residential Vastu Consultation", date: "18 July 2026", time: "10:30 AM", status: "Pending" },
    { id: "a2", name: "Meera Nair", service: "Commercial Office Vastu", date: "20 July 2026", time: "02:30 PM", status: "Confirmed" },
    { id: "a3", name: "Vijay Kulkarni", service: "Industrial & Factory Vastu", date: "22 July 2026", time: "12:00 PM", status: "Cancelled" },
    { id: "a4", name: "Sneha Patel", service: "Residential Vastu Consultation", date: "24 July 2026", time: "04:00 PM", status: "Pending" }
  ]);

  const handleUpdateAppointmentStatus = (id: string, newStatus: string) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up text-left">
      <p className="text-xs text-muted-foreground font-light">Moderate time slots and schedule confirmed Vedic consultations.</p>

      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-premium">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-dark text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Student</th>
                <th className="p-4 font-semibold">Consultation</th>
                <th className="p-4 font-semibold">Schedule Date</th>
                <th className="p-4 font-semibold">Time Slot</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {appointments.map((a) => (
                <tr key={a.id} className="hover:bg-background-alt/50 transition-colors">
                  <td className="p-4 font-bold text-navy">{a.name}</td>
                  <td className="p-4 text-navy-light">{a.service}</td>
                  <td className="p-4 text-navy-light">{a.date}</td>
                  <td className="p-4 text-navy-light font-medium">{a.time}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                      a.status === "Confirmed" 
                        ? "bg-green-50 text-green-700 border-green-200" 
                        : a.status === "Cancelled" 
                        ? "bg-red-50 text-red-700 border-red-200" 
                        : "bg-yellow-50 text-yellow-700 border-yellow-200"
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    {a.status === "Pending" && (
                      <>
                        <button 
                          onClick={() => handleUpdateAppointmentStatus(a.id, "Confirmed")}
                          className="p-1 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleUpdateAppointmentStatus(a.id, "Cancelled")}
                          className="p-1 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {a.status !== "Pending" && (
                      <span className="text-[10px] text-muted-foreground italic font-light pr-2">Action logged</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
