"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import api from "@/lib/axios";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const { data } = await api.get("/users/certificates");
        if (data.success) setCertificates(data.data);
      } catch (err) {
        console.error("Failed to fetch certificates", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  if (loading) {
    return <div className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" /></div>;
  }

  return (
    <div className="flex flex-col gap-6 text-left">
      <div>
        <h2 className="font-serif text-2xl font-bold text-navy">Certificates</h2>
        <p className="text-xs text-muted-foreground mt-1 font-light">
          View and download your earned course certificates.
        </p>
      </div>
      
      {certificates.length === 0 ? (
        <div className="bg-white border border-border p-8 rounded-2xl flex flex-col items-center justify-center text-center mt-6 shadow-premium">
          <p className="text-navy-light text-sm">You haven't earned any certificates yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {certificates.map((cert: any) => (
            <div key={cert._id} className="bg-white border border-border p-5 rounded-xl shadow-premium">
              <h3 className="font-serif font-bold text-navy">{cert.course?.title || "Course Certificate"}</h3>
              <p className="text-xs text-muted-foreground mt-1">Issued: {new Date(cert.issuedAt).toLocaleDateString()}</p>
              <button className="mt-4 text-xs font-semibold bg-gold-gradient text-white px-4 py-2 rounded-lg">Download PDF</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
