"use client";

import React, { useState, useEffect } from "react";
import { Check, X, Loader2, Calendar } from "lucide-react";
import api from "@/lib/axios";

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const fetchConsultations = async () => {
    try {
      const res = await api.get("/admin/consultations");
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch consultations", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  const handleUpdateAppointmentStatus = async (id: string, newStatus: string) => {
    setActionId(id);
    try {
      const res = await api.patch(`/admin/consultations/${id}/status`, { status: newStatus });
      if (res.data.success) {
        setAppointments(appointments.map(a => a._id === id ? { ...a, status: newStatus } : a));
      }
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update consultation status");
    } finally {
      setActionId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up text-left">
      <div>
        <h2 className="font-serif text-xl font-bold text-navy">Appointment Management</h2>
        <p className="text-xs text-muted-foreground font-light mt-0.5">Moderate time slots and schedule confirmed consultations.</p>
      </div>

      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-premium">
        {appointments.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <Calendar className="w-10 h-10 text-muted-foreground/30 mb-3" />
            <p className="text-sm font-semibold text-navy mb-1">No Consultations Booked Yet</p>
            <p className="text-xs text-muted-foreground font-light">
              When users book consultation sessions, their appointments will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-navy text-white uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4 font-semibold">User</th>
                  <th className="p-4 font-semibold">Consultation / Service</th>
                  <th className="p-4 font-semibold">Schedule Date</th>
                  <th className="p-4 font-semibold">Time Slot</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {appointments.map((a) => {
                  const userName = a.user ? `${a.user.firstName || ''} ${a.user.lastName || ''}`.trim() : (a.contactDetails?.name || 'Guest');
                  const serviceName = a.service?.title || a.serviceName || 'General Consultation';
                  const dateStr = a.preferredDate ? new Date(a.preferredDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : (a.date || 'N/A');
                  const statusFormatted = a.status ? a.status.charAt(0).toUpperCase() + a.status.slice(1) : 'Pending';

                  return (
                    <tr key={a._id} className="hover:bg-background-alt/50 transition-colors">
                      <td className="p-4 font-bold text-navy">{userName}</td>
                      <td className="p-4 text-navy-light">{serviceName}</td>
                      <td className="p-4 text-navy-light">{dateStr}</td>
                      <td className="p-4 text-navy-light font-medium">{a.preferredTimeSlot || a.timeSlot || 'TBD'}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border capitalize ${
                          statusFormatted === "Approved" || statusFormatted === "Confirmed" || statusFormatted === "Completed"
                            ? "bg-green-50 text-green-700 border-green-200" 
                            : statusFormatted === "Rejected" || statusFormatted === "Cancelled"
                            ? "bg-red-50 text-red-700 border-red-200" 
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }`}>
                          {statusFormatted}
                        </span>
                      </td>
                      <td className="p-4 text-right flex justify-end gap-2">
                        {statusFormatted === "Pending" && (
                          <>
                            <button 
                              onClick={() => handleUpdateAppointmentStatus(a._id, "approved")}
                              disabled={actionId === a._id}
                              className="p-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 cursor-pointer disabled:opacity-50"
                              title="Approve Session"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleUpdateAppointmentStatus(a._id, "rejected")}
                              disabled={actionId === a._id}
                              className="p-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 cursor-pointer disabled:opacity-50"
                              title="Reject Session"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {statusFormatted !== "Pending" && (
                          <span className="text-[10px] text-muted-foreground italic font-light pr-2">Status: {statusFormatted}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
