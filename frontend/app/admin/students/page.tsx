"use client";

import React, { useState } from "react";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState([
    { id: "st1", name: "Aditya Sharma", email: "aditya@gmail.com", joined: "12 June 2026", course: "Vastu Shastra Foundation", status: "Active" },
    { id: "st2", name: "Karan Johar", email: "karan@johar.com", joined: "20 June 2026", course: "Advanced Professional Vastu", status: "Active" },
    { id: "st3", name: "Sneha Patel", email: "sneha@patel.com", joined: "05 July 2026", course: "Vastu Remedial Science", status: "Suspended" }
  ]);

  const handleToggleStudentStatus = (id: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, status: s.status === "Active" ? "Suspended" : "Active" } : s));
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up text-left">
      <p className="text-xs text-muted-foreground font-light">Moderate student portal access configurations.</p>

      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-premium">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Student Name</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Registration Date</th>
                <th className="p-4 font-semibold">Active Program</th>
                <th className="p-4 font-semibold">Access Status</th>
                <th className="p-4 font-semibold text-right">Lock Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {students.map((item) => (
                <tr key={item.id} className="hover:bg-background-alt/50 transition-colors">
                  <td className="p-4 font-bold text-navy">{item.name}</td>
                  <td className="p-4 text-navy-light">{item.email}</td>
                  <td className="p-4 text-navy-light">{item.joined}</td>
                  <td className="p-4 text-navy font-medium">{item.course}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                      item.status === "Active" 
                        ? "bg-green-50 text-green-700 border-green-200" 
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right flex justify-end">
                    <button 
                      onClick={() => handleToggleStudentStatus(item.id)}
                      className={`px-3 py-1 border rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                        item.status === "Active"
                          ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                          : "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                      }`}
                    >
                      {item.status === "Active" ? "Suspend Access" : "Activate"}
                    </button>
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
