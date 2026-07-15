"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  DollarSign, 
  Users, 
  Calendar, 
  BookOpen, 
  Check, 
  X, 
  ArrowRight,
  TrendingUp
} from "lucide-react";
import { SERVICES as initialServices, COURSES as initialCourses } from "@/data/mockData";

export default function AdminDashboardPage() {
  const [courses] = useState(initialCourses);
  const [appointments, setAppointments] = useState([
    { id: "a1", name: "Aditya Sharma", service: "Residential Vastu Consultation", date: "18 July 2026", time: "10:30 AM", status: "Pending" },
    { id: "a2", name: "Meera Nair", service: "Commercial Office Vastu", date: "20 July 2026", time: "02:30 PM", status: "Confirmed" },
    { id: "a3", name: "Vijay Kulkarni", service: "Industrial & Factory Vastu", date: "22 July 2026", time: "12:00 PM", status: "Cancelled" },
    { id: "a4", name: "Sneha Patel", service: "Residential Vastu Consultation", date: "24 July 2026", time: "04:00 PM", status: "Pending" }
  ]);
  const [students] = useState([
    { id: "st1", name: "Aditya Sharma", email: "aditya@gmail.com", joined: "12 June 2026", course: "Vastu Shastra Foundation", status: "Active" },
    { id: "st2", name: "Karan Johar", email: "karan@johar.com", joined: "20 June 2026", course: "Advanced Professional Vastu", status: "Active" },
    { id: "st3", name: "Sneha Patel", email: "sneha@patel.com", joined: "05 July 2026", course: "Vastu Remedial Science", status: "Suspended" }
  ]);

  const totalEarning = (courses.reduce((acc, c) => acc + c.price, 0) * 15) + (appointments.filter(a => a.status === "Confirmed").reduce((acc, a) => acc + 250, 0));

  const handleUpdateAppointmentStatus = (id: string, newStatus: string) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

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
            <h3 className="text-lg font-bold text-navy mt-0.5">₹{(totalEarning * 80).toLocaleString("en-IN")}</h3>
          </div>
        </div>

        <div className="bg-white border border-border rounded-2xl p-5 shadow-premium flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-md">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Total Students</span>
            <h3 className="text-lg font-bold text-navy mt-0.5">{students.length} Registered</h3>
          </div>
        </div>

        <div className="bg-white border border-border rounded-2xl p-5 shadow-premium flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent text-white flex items-center justify-center shadow-md">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Consultations</span>
            <h3 className="text-lg font-bold text-navy mt-0.5">{appointments.length} Booked</h3>
          </div>
        </div>

        <div className="bg-white border border-border rounded-2xl p-5 shadow-premium flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Active Courses</span>
            <h3 className="text-lg font-bold text-navy mt-0.5">{courses.length} Available</h3>
          </div>
        </div>
      </div>

      {/* Layout splits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Activities */}
        <div className="lg:col-span-7 bg-white border border-border rounded-2xl p-5 shadow-premium">
          <h3 className="font-serif text-base font-bold text-navy mb-4">Pending Consultations Queue</h3>
          <div className="flex flex-col gap-3">
            {appointments.filter(a => a.status === "Pending").map(app => (
              <div key={app.id} className="p-3.5 bg-background-alt border border-border rounded-xl flex items-center justify-between gap-4">
                <div className="text-left">
                  <p className="text-xs font-bold text-navy">{app.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{app.service} ({app.date})</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleUpdateAppointmentStatus(app.id, "Confirmed")}
                    className="p-1 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleUpdateAppointmentStatus(app.id, "Cancelled")}
                    className="p-1 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {appointments.filter(a => a.status === "Pending").length === 0 && (
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
