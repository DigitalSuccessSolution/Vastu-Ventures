"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Loader2, Users } from "lucide-react";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/admin/students");
      if (res.data.success) {
        setStudents(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch students", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleToggleStudentStatus = async (id: string, currentlyBlocked: boolean) => {
    setActionId(id);
    try {
      const res = await api.patch(`/admin/students/${id}/block`, { block: !currentlyBlocked });
      if (res.data.success) {
        setStudents(students.map(s => s._id === id ? { ...s, isBlocked: !currentlyBlocked } : s));
      }
    } catch (err) {
      console.error("Failed to update student status", err);
      alert("Failed to update student access status.");
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-serif text-xl font-bold text-navy">Student Management</h2>
          <p className="text-xs text-muted-foreground font-light mt-0.5">Moderate registered student accounts and portal access.</p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-navy/5 text-navy rounded-full">
          Total Registered: {students.length}
        </span>
      </div>

      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-premium">
        {students.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <Users className="w-10 h-10 text-muted-foreground/30 mb-3" />
            <p className="text-sm font-semibold text-navy mb-1">No Students Registered Yet</p>
            <p className="text-xs text-muted-foreground font-light">
              When new students register on the portal, their account details will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-navy text-white uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4 font-semibold">Student Name</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Phone</th>
                  <th className="p-4 font-semibold">Registration Date</th>
                  <th className="p-4 font-semibold">Access Status</th>
                  <th className="p-4 font-semibold text-right">Lock Toggle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {students.map((item) => {
                  const studentName = `${item.firstName || ''} ${item.lastName || ''}`.trim() || item.name || 'Student';
                  const isBlocked = item.isBlocked;
                  const joinedDate = item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A';

                  return (
                    <tr key={item._id} className="hover:bg-background-alt/50 transition-colors">
                      <td className="p-4 font-bold text-navy">{studentName}</td>
                      <td className="p-4 text-navy-light">{item.email}</td>
                      <td className="p-4 text-navy-light">{item.phone || '-'}</td>
                      <td className="p-4 text-navy-light">{joinedDate}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${
                          !isBlocked 
                            ? "bg-green-50 text-green-700 border-green-200" 
                            : "bg-red-50 text-red-700 border-red-200"
                        }`}>
                          {!isBlocked ? "Active" : "Suspended"}
                        </span>
                      </td>
                      <td className="p-4 text-right flex justify-end">
                        <button 
                          onClick={() => handleToggleStudentStatus(item._id, isBlocked)}
                          disabled={actionId === item._id}
                          className={`px-3 py-1 border rounded-lg text-[10px] font-bold transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1 ${
                            !isBlocked
                              ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                              : "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                          }`}
                        >
                          {actionId === item._id && <Loader2 className="w-3 h-3 animate-spin" />}
                          {!isBlocked ? "Suspend Access" : "Activate Access"}
                        </button>
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
