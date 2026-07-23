"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/lib/store";
import { 
  BookOpen, 
  Award, 
  Calendar, 
  TrendingUp, 
  ChevronRight,
  PlayCircle,
  Loader2,
  Clock,
  Video
} from "lucide-react";
import api from "@/lib/axios";

export default function StudentDashboardRoot() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  
  const [courses, setCourses] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const [coursesRes, appointmentsRes] = await Promise.allSettled([
          api.get("/users/purchased-courses"),
          api.get("/users/appointments")
        ]);
        
        if (coursesRes.status === "fulfilled" && coursesRes.value.data?.success) {
          setCourses(coursesRes.value.data.data || []);
        }
        if (appointmentsRes.status === "fulfilled" && appointmentsRes.value.data?.success) {
          setAppointments(appointmentsRes.value.data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard overview data", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (user && user.role === "student") {
      fetchOverviewData();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="py-16 text-center flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-7 h-7 animate-spin text-primary" />
        <p className="text-xs text-navy font-medium">Loading Dashboard...</p>
      </div>
    );
  }

  // Metrics calculation
  const totalCourses = courses.length;
  const completedCourses = courses.filter(c => (c.progressPercentage || 0) >= 100).length;
  const avgProgress = totalCourses > 0 
    ? Math.round(courses.reduce((acc, curr) => acc + (curr.progressPercentage || 0), 0) / totalCourses) 
    : 0;
  
  const now = new Date();
  const upcomingAppointments = appointments.filter(a => new Date(a.date) > now).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const recentCourses = [...courses].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 2);

  const studentName = (user as any)?.firstName || user?.name?.split(' ')[0] || user?.email?.split('@')[0] || 'Student';

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Welcome Banner */}
      <div className="bg-navy text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#1e2d4d]">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-primary/40 shrink-0">
            <img 
              src={user?.avatar?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || user?.email || "User")}&background=E28A3E&color=fff`} 
              alt={user?.name || "User"}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-serif font-semibold text-white">
              Welcome back, <span className="text-primary font-bold">{studentName}</span>
            </h1>
            <p className="text-xs sm:text-sm text-white/75 font-normal mt-1">
              Overview of your Vastu courses, certificates, and consultations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link href="/dashboard/courses" className="px-4 py-2.5 rounded-xl bg-gold-gradient text-white text-xs font-semibold shadow-sm hover:opacity-95 transition-all">
            Browse Courses
          </Link>
          <Link href="/book" className="px-4 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-white text-xs font-semibold transition-all">
            Book Consultation
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-border/80 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-primary shrink-0 border border-[#EDE3D0]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-semibold text-navy">{totalCourses}</h3>
            <p className="text-[11px] text-muted-foreground font-medium">Enrolled Courses</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border/80 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-primary shrink-0 border border-[#EDE3D0]">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-semibold text-navy">{avgProgress}%</h3>
            <p className="text-[11px] text-muted-foreground font-medium">Avg. Progress</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border/80 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-primary shrink-0 border border-[#EDE3D0]">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-semibold text-navy">{completedCourses}</h3>
            <p className="text-[11px] text-muted-foreground font-medium">Certificates</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border/80 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-primary shrink-0 border border-[#EDE3D0]">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-semibold text-navy">{upcomingAppointments.length}</h3>
            <p className="text-[11px] text-muted-foreground font-medium">Upcoming Appts</p>
          </div>
        </div>
      </div>

      {/* Main Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning Section */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold text-navy">Continue Learning</h2>
            <Link href="/dashboard/courses" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          
          {recentCourses.length === 0 ? (
            <div className="bg-white border border-dashed border-border rounded-2xl p-8 text-center shadow-sm flex flex-col items-center justify-center">
               <PlayCircle className="w-8 h-8 text-muted-foreground/40 mb-2" />
               <p className="text-xs text-navy font-semibold mb-1">No courses started yet</p>
               <p className="text-[11px] text-muted-foreground font-normal mb-4">Enroll in a course to start your Vastu journey.</p>
               <Link href="/courses" className="px-4 py-2 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navy-light transition-all">
                 Browse Courses
               </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentCourses.map((enrollment: any) => {
                const course = enrollment.course;
                if (!course) return null;
                const progress = enrollment.progressPercentage || 0;
                const imgUrl = course.image?.url || (typeof course.image === "string" ? course.image : "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80");
                return (
                  <Link href={`/dashboard/courses/${course.slug}`} key={enrollment._id} className="bg-white border border-border/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between block">
                    <div>
                      <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3">
                        <img
                          src={imgUrl}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors" />
                      </div>
                      <h3 className="font-serif text-xs sm:text-sm font-semibold text-navy line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-border/40">
                      <div className="flex justify-between items-center text-[10px] font-semibold mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-primary">{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#FAF6F0] rounded-full overflow-hidden">
                        <div className="h-full bg-gold-gradient rounded-full" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Upcoming Consultations Section */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold text-navy">Upcoming Consultations</h2>
            <Link href="/dashboard/appointments" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
              View All
            </Link>
          </div>
          
          <div className="bg-white border border-border/80 rounded-2xl p-5 shadow-sm flex flex-col gap-4 flex-grow">
            {upcomingAppointments.length === 0 ? (
               <div className="flex flex-col items-center justify-center text-center py-6">
                 <Calendar className="w-8 h-8 text-muted-foreground/30 mb-2" />
                 <p className="text-xs font-semibold text-navy mb-1">No upcoming appointments</p>
                 <p className="text-[11px] text-muted-foreground font-normal mb-4">Book a consultation session with our experts.</p>
                 <Link href="/book" className="px-4 py-2 rounded-xl border border-primary text-primary text-xs font-semibold hover:bg-[#FAF6F0] transition-colors">
                   Book Session
                 </Link>
               </div>
            ) : (
               upcomingAppointments.slice(0, 3).map((appt: any, i: number) => {
                 const date = new Date(appt.date);
                 return (
                   <div key={appt._id} className={`flex gap-3 items-center ${i !== 0 ? 'pt-3 border-t border-border/40' : ''}`}>
                     <div className="flex flex-col items-center justify-center bg-[#FAF6F0] w-11 h-11 rounded-xl flex-shrink-0 text-navy border border-[#EDE3D0]">
                       <span className="text-[9px] font-bold uppercase tracking-wider text-primary">{date.toLocaleString('default', { month: 'short' })}</span>
                       <span className="text-base font-bold leading-none">{date.getDate()}</span>
                     </div>
                     <div className="flex flex-col justify-center overflow-hidden">
                       <h3 className="text-xs font-semibold text-navy truncate capitalize">{appt.service} Consultation</h3>
                       <p className="text-[11px] text-muted-foreground font-normal flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-primary" /> {appt.timeSlot || date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </p>
                     </div>
                   </div>
                 );
               })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
