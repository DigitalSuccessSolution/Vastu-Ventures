"use client";

import React, { useState, useEffect } from "react";
import { Edit } from "lucide-react";
import { SERVICES as initialServices } from "@/data/mockData";

export default function AdminServicesPage() {
  const [services, setServices] = useState(initialServices);
  const [serviceModal, setServiceModal] = useState<{ open: boolean; mode: "add" | "edit"; id?: string }>({ open: false, mode: "add" });
  const [serviceForm, setServiceForm] = useState({ title: "", slug: "", price: 150 });

  useEffect(() => {
    const saved = localStorage.getItem('adminServices');
    if (saved) {
      setServices(JSON.parse(saved));
    }
  }, []);

  const handleOpenEditService = (id: string) => {
    const s = services.find(item => item.id === id);
    if (s) {
      setServiceForm({ title: s.title, slug: s.slug || "", price: s.price });
      setServiceModal({ open: true, mode: "edit", id });
    }
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (serviceModal.mode === "edit" && serviceModal.id) {
      const updated = services.map(s => s.id === serviceModal.id ? { ...s, title: serviceForm.title, slug: serviceForm.slug, price: serviceForm.price } : s);
      setServices(updated);
      localStorage.setItem('adminServices', JSON.stringify(updated));
    }
    setServiceModal({ open: false, mode: "add" });
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up text-left">
      <div className="flex justify-between items-center">
        <p className="text-xs text-muted-foreground font-light">Edit and adjust price sheets for consultations.</p>
      </div>

      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-premium">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Service Name</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {services.map((item) => (
                <tr key={item.id} className="hover:bg-background-alt/50 transition-colors">
                  <td className="p-4 font-semibold text-navy">{item.title}</td>
                  <td className="p-4 font-bold text-navy">₹{item.price}</td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => handleOpenEditService(item.id)}
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

      {serviceModal.open && (
        <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-border rounded-2xl p-6 max-w-md w-full shadow-premium-lg text-left animate-fade-in-up">
            <h3 className="font-serif text-lg font-bold text-navy mb-4">
              Edit Vastu Service
            </h3>

            <form onSubmit={handleSaveService} className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">Service Title</label>
                <input
                  type="text"
                  required
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  placeholder="e.g. Master bedroom alignments"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-navy uppercase tracking-wider mb-1.5">Price (INR)</label>
                  <input
                    type="number"
                    required
                    value={serviceForm.price}
                    onChange={(e) => setServiceForm({ ...serviceForm, price: parseInt(e.target.value) })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:bg-white outline-none focus:border-primary transition-all text-navy"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setServiceModal({ open: false, mode: "add" })}
                  className="px-4 py-2 border border-border rounded-xl text-xs font-semibold text-navy hover:bg-background-alt cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-navy text-white text-xs font-bold rounded-xl hover:bg-navy-light cursor-pointer shadow-premium"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
