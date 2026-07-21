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
  Clock
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
        const [coursesRes, appointmentsRes] = await Promise.all([
          api.get("/users/purchased-courses"),
          api.get("/users/appointments")
        ]);
        
        if (coursesRes.data.success) {
          setCourses(coursesRes.data.data);
        }
        if (appointmentsRes.data.success) {
          setAppointments(appointmentsRes.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard overview data", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchOverviewData();
    }
  }, [user]);

  if (loading) {
    return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  // Calculate metrics
  const totalCourses = courses.length;
  const completedCourses = courses.filter(c => c.progressPercentage >= 100).length;
  // Calculate average progress
  const avgProgress = totalCourses > 0 
    ? Math.round(courses.reduce((acc, curr) => acc + (curr.progressPercentage || 0), 0) / totalCourses) 
    : 0;
  
  // Upcoming appointments (assuming future dates)
  const now = new Date();
  const upcomingAppointments = appointments.filter(a => new Date(a.date) > now).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Recent courses (top 2)
  const recentCourses = [...courses].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 2);

  return (
    <div className="flex flex-col gap-8 text-left max-w-5xl">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-navy rounded-2xl p-8 shadow-premium flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 border border-[#1e2d4d]">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-gold-end/10 blur-2xl rounded-full" />
        
        <div className="relative z-10 flex items-center gap-6 text-center sm:text-left">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-primary/40 shadow-premium">
            <img 
              src={user?.avatar?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "Student")}&background=E28A3E&color=fff`} 
              alt={user?.name || "Student"}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
              Welcome back, <span className="text-primary">{user?.firstName || user?.name?.split(' ')[0] || 'Student'}</span>!
            </h2>
            <p className="text-sm text-white/70 font-light max-w-md">
              Here is an overview of your learning journey and upcoming consultations. Keep up the great work!
            </p>
          </div>
        </div>
        
        <div className="relative z-10 hidden lg:flex flex-col gap-2">
           <Link href="/dashboard/courses" className="px-6 py-2.5 rounded-xl bg-gold-gradient text-white text-sm font-semibold shadow-premium hover:shadow-premium-lg hover:scale-[1.02] active:scale-[0.98] transition-all text-center">
             Browse Courses
           </Link>
           <Link href="/book" className="px-6 py-2.5 rounded-xl border border-white/20 text-white text-sm font-semibold hover:bg-white/5 transition-all text-center">
             Book Consultation
           </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-border shadow-premium hover:shadow-premium-lg transition-all flex flex-col gap-3 group cursor-default">
          <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-navy">{totalCourses}</h3>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-0.5">Enrolled Courses</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-border shadow-premium hover:shadow-premium-lg transition-all flex flex-col gap-3 group cursor-default">
          <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-navy">{avgProgress}%</h3>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-0.5">Avg. Progress</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border shadow-premium hover:shadow-premium-lg transition-all flex flex-col gap-3 group cursor-default">
          <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-navy">{completedCourses}</h3>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-0.5">Certificates</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border shadow-premium hover:shadow-premium-lg transition-all flex flex-col gap-3 group cursor-default">
          <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-navy">{upcomingAppointments.length}</h3>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-0.5">Upcoming Appts</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Continue Learning Section */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-navy">Continue Learning</h3>
            <Link href="/dashboard/courses" className="text-xs font-semibold text-primary hover:text-gold-end flex items-center gap-1 transition-colors">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          
          {recentCourses.length === 0 ? (
            <div className="bg-white border border-dashed border-border rounded-2xl p-8 text-center shadow-sm">
               <div className="w-12 h-12 bg-[#FAF6F0] rounded-full flex items-center justify-center mx-auto mb-3">
                 <PlayCircle className="w-6 h-6 text-primary" />
               </div>
               <p className="text-sm text-navy font-semibold mb-1">No courses started yet</p>
               <p className="text-xs text-muted-foreground font-light mb-4">Enroll in a course to start your Vastu journey.</p>
               <Link href="/courses" className="px-5 py-2.5 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navy-light transition-all inline-block">
                 Browse Courses
               </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {recentCourses.map((enrollment: any) => {
                const course = enrollment.course;
                const progress = enrollment.progressPercentage || 0;
                return (
                  <Link href={`/courses/${course.slug}`} key={enrollment._id} className="bg-white border border-border rounded-2xl p-4 shadow-premium hover:shadow-premium-lg transition-all group flex flex-col justify-between block">
                    <div>
                      <div className="relative w-full h-32 rounded-xl overflow-hidden mb-4">
                        <img
                          src={course.image?.url || "https://placehold.co/600x400"}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-300" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-premium">
                           <PlayCircle className="w-5 h-5 text-primary ml-0.5" />
                        </div>
                      </div>
                      
                      <h4 className="font-serif text-sm font-bold text-navy line-clamp-2 leading-snug mb-1 group-hover:text-primary transition-colors">
                        {course.title}
                      </h4>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between items-center text-[10px] text-muted-foreground font-semibold mb-1.5">
                        <span>Progress</span>
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

        {/* Upcoming Appointments Section */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-navy">Upcoming Consultations</h3>
            <Link href="/dashboard/appointments" className="text-xs font-semibold text-primary hover:text-gold-end flex items-center gap-1 transition-colors">
              View All
            </Link>
          </div>
          
          <div className="bg-white border border-border rounded-2xl p-5 shadow-premium flex flex-col gap-4 flex-grow">
            {upcomingAppointments.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-full text-center py-6 min-h-[200px]">
                 <Calendar className="w-10 h-10 text-muted-foreground/30 mb-3" />
                 <p className="text-sm font-semibold text-navy mb-1">No upcoming appointments</p>
                 <p className="text-xs text-muted-foreground font-light mb-4 text-balance">You don't have any consultations scheduled.</p>
                 <Link href="/book" className="px-4 py-2 rounded-xl border border-primary text-primary text-xs font-semibold hover:bg-[#FAF6F0] transition-colors">
                   Book Now
                 </Link>
               </div>
            ) : (
               upcomingAppointments.slice(0, 3).map((appt: any, i: number) => {
                 const date = new Date(appt.date);
                 return (
                   <div key={appt._id} className={`flex gap-4 ${i !== 0 ? 'pt-4 border-t border-border/60' : ''}`}>
                     <div className="flex flex-col items-center justify-center bg-[#FAF6F0] w-12 h-12 rounded-xl flex-shrink-0 text-navy border border-[#EDE3D0]">
                       <span className="text-[10px] font-bold uppercase tracking-wider">{date.toLocaleString('default', { month: 'short' })}</span>
                       <span className="text-lg font-bold leading-none">{date.getDate()}</span>
                     </div>
                     <div className="flex flex-col justify-center">
                       <h4 className="text-sm font-bold text-navy mb-0.5 capitalize">{appt.service} Consultation</h4>
                       <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {appt.timeSlot || date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
