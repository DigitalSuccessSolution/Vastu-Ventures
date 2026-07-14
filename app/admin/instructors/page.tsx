"use client";

import React, { useState } from "react";
import { Edit } from "lucide-react";

export default function AdminInstructorsPage() {
  const [instructors, setInstructors] = useState([
    { id: "ins1", name: "Acharya Raghavendra", role: "Lead Vastu Acharya", courses: "3 Courses", bio: "22+ years of Vedic architectural audits worldwide." },
    { id: "ins2", name: "Dr. Arundhati Roy", role: "Remedial Pyramids Specialist", courses: "2 Courses", bio: "Specialist in non-demolition metal helix installations." }
  ]);
  const [instructorForm, setInstructorForm] = useState({ id: "", name: "", role: "", bio: "" });
  const [instructorEditModal, setInstructorEditModal] = useState(false);

  const handleOpenEditInstructor = (id: string) => {
    const ins = instructors.find(item => item.id === id);
    if (ins) {
      setInstructorForm({ id: ins.id, name: ins.name, role: ins.role, bio: ins.bio });
      setInstructorEditModal(true);
    }
  };

  const handleSaveInstructor = (e: React.FormEvent) => {
    e.preventDefault();
    setInstructors(instructors.map(ins => ins.id === instructorForm.id ? { ...ins, name: instructorForm.name, role: instructorForm.role, bio: instructorForm.bio } : ins));
    setInstructorEditModal(false);
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up text-left">
      <p className="text-xs text-muted-foreground font-light">Manage academic consultants and biography logs.</p>

      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-premium">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-dark text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Instructor Name</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold">Assigned Courses</th>
                <th className="p-4 font-semibold">Biography Details</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {instructors.map((item) => (
                <tr key={item.id} className="hover:bg-background-alt/50 transition-colors">
                  <td className="p-4 font-bold text-navy">{item.name}</td>
                  <td className="p-4 text-primary font-bold uppercase text-[10px]">{item.role}</td>
                  <td className="p-4 text-navy-light">{item.courses}</td>
                  <td className="p-4 text-navy-light font-light max-w-sm truncate">{item.bio}</td>
                  <td className="p-4 text-right flex justify-end">
                    <button 
                      onClick={() => handleOpenEditInstructor(item.id)}
                      className="p-1.5 bg-background-alt hover:bg-primary/10 border border-border rounded-lg text-primary transition-colors cursor-pointer"
                    >
                      <Edit className="w-4.5 h-4.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {instructorEditModal && (
        <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-border rounded-2xl p-6 max-w-md w-full shadow-premium-lg text-left animate-fade-in-up">
            <h3 className="font-serif text-lg font-bold text-navy mb-4">Edit Instructor Biography</h3>
            
            <form onSubmit={handleSaveInstructor} className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">Instructor Name</label>
                <input
                  type="text"
                  required
                  value={instructorForm.name}
                  onChange={(e) => setInstructorForm({ ...instructorForm, name: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">Role Title</label>
                <input
                  type="text"
                  required
                  value={instructorForm.role}
                  onChange={(e) => setInstructorForm({ ...instructorForm, role: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">Teacher Biography</label>
                <textarea
                  required
                  rows={4}
                  value={instructorForm.bio}
                  onChange={(e) => setInstructorForm({ ...instructorForm, bio: e.target.value })}
                  className="w-full text-xs px-3.5 py-3 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy resize-none"
                />
              </div>

              <div className="flex gap-3 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setInstructorEditModal(false)}
                  className="px-4 py-2 border border-border rounded-xl text-xs font-semibold text-navy hover:bg-background-alt cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-navy text-white text-xs font-bold rounded-xl hover:bg-navy-light cursor-pointer shadow-premium"
                >
                  Save Bio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
