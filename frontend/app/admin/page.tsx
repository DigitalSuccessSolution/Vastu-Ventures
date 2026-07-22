"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  DollarSign, 
  Users, 
  Calendar, 
  BookOpen, 
  Check, 
  X, 
  ArrowRight,
  Loader2
} from "lucide-react";
import api from "@/lib/axios";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalRevenue: 0,
    totalConsultations: 0
  });
  const [pendingConsultations, setPendingConsultations] = useState<any[]>([]);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, consultationsRes] = await Promise.all([
        api.get("/admin/analytics/dashboard"),
        api.get("/admin/consultations")
      ]);

      if (statsRes.data.success) {
        setStats(statsRes.data.data);
      }

      if (consultationsRes.data.success) {
        const pending = consultationsRes.data.data.filter((c: any) => c.status === "pending");
        setPendingConsultations(pending);
      }
    } catch (err) {
      console.error("Failed to load admin dashboard stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleUpdateAppointmentStatus = async (id: string, newStatus: string) => {
    try {
      const res = await api.patch(`/admin/consultations/${id}/status`, { status: newStatus });
      if (res.data.success) {
        setPendingConsultations(prev => prev.filter(c => c._id !== id));
      }
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update status");
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
    <div className="flex flex-col gap-8 animate-fade-in-up text-left">
      {/* Stats Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-border rounded-2xl p-5 shadow-premium flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gold-gradient text-white flex items-center justify-center shadow-md">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Gross Earning</span>
            <h3 className="text-lg font-bold text-navy mt-0.5">₹{stats.totalRevenue.toLocaleString("en-IN")}</h3>
          </div>
        </div>

        <div className="bg-white border border-border rounded-2xl p-5 shadow-premium flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-md">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Total Students</span>
            <h3 className="text-lg font-bold text-navy mt-0.5">{stats.totalUsers} Registered</h3>
          </div>
        </div>

        <div className="bg-white border border-border rounded-2xl p-5 shadow-premium flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent text-white flex items-center justify-center shadow-md">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Consultations</span>
            <h3 className="text-lg font-bold text-navy mt-0.5">{stats.totalConsultations} Booked</h3>
          </div>
        </div>

        <div className="bg-white border border-border rounded-2xl p-5 shadow-premium flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Active Courses</span>
            <h3 className="text-lg font-bold text-navy mt-0.5">{stats.totalCourses} Available</h3>
          </div>
        </div>
      </div>

      {/* Layout splits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Activities */}
        <div className="lg:col-span-7 bg-white border border-border rounded-2xl p-5 shadow-premium">
          <h3 className="font-serif text-base font-bold text-navy mb-4">Pending Consultations Queue</h3>
          <div className="flex flex-col gap-3">
            {pendingConsultations.map(app => {
              const userName = app.user ? `${app.user.firstName || ''} ${app.user.lastName || ''}`.trim() : (app.contactDetails?.name || 'Guest');
              const serviceName = app.service?.title || app.serviceName || 'General Consultation';
              const dateStr = app.preferredDate ? new Date(app.preferredDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'Pending';

              return (
                <div key={app._id} className="p-3.5 bg-background-alt border border-border rounded-xl flex items-center justify-between gap-4">
                  <div className="text-left">
                    <p className="text-xs font-bold text-navy">{userName}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{serviceName} ({dateStr})</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleUpdateAppointmentStatus(app._id, "approved")}
                      className="p-1 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 cursor-pointer"
                      title="Approve"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleUpdateAppointmentStatus(app._id, "rejected")}
                      className="p-1 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 cursor-pointer"
                      title="Reject"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
            {pendingConsultations.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-6 font-light">No pending consultation bookings in queue.</p>
            )}
          </div>
        </div>

        {/* Quick actions panel */}
        <div className="lg:col-span-5 bg-white border border-border rounded-2xl p-5 shadow-premium flex flex-col gap-4 text-left">
          <h3 className="font-serif text-base font-bold text-navy mb-1">Administrative Utilities</h3>
          <p className="text-xs text-muted-foreground font-light mb-2">Configure and dispatch Vedic space audit metrics instantly.</p>
          
          <Link 
            href="/admin/courses"
            className="w-full flex items-center justify-between p-3.5 bg-background-alt hover:bg-primary/5 rounded-xl border border-border transition-colors group cursor-pointer"
          >
            <span className="text-xs font-semibold text-navy">Manage Academy Courses</span>
            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link 
            href="/admin/services"
            className="w-full flex items-center justify-between p-3.5 bg-background-alt hover:bg-primary/5 rounded-xl border border-border transition-colors group cursor-pointer"
          >
            <span className="text-xs font-semibold text-navy">Manage Consultation Services</span>
            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link 
            href="/admin/blogs"
            className="w-full flex items-center justify-between p-3.5 bg-background-alt hover:bg-primary/5 rounded-xl border border-border transition-colors group cursor-pointer"
          >
            <span className="text-xs font-semibold text-navy">Draft Vastu Philosophy Article</span>
            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
