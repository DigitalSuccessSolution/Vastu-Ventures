"use client";

import React, { useState, useEffect } from "react";
import { Loader2, Award, Download, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import api from "@/lib/axios";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const { data } = await api.get("/users/certificates");
        if (data.success) setCertificates(data.data || []);
      } catch (err) {
        console.error("Failed to fetch certificates", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-7 h-7 animate-spin text-primary" />
        <p className="text-xs text-navy font-medium">Loading Certificates...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* Clean Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-navy">Certificates</h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal mt-1">
            Download and view your official Vastu Ventures course completion certificates.
          </p>
        </div>

        <div className="text-xs font-medium text-navy bg-white px-4 py-2 rounded-xl border border-border/80 shrink-0">
          Total Earned: <span className="font-semibold text-primary">{certificates.length}</span>
        </div>
      </div>

      {/* Certificates Container */}
      <div className="w-full">
        {certificates.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-border rounded-2xl bg-white flex flex-col items-center justify-center p-8 shadow-sm">
            <Award className="w-8 h-8 text-muted-foreground/30 mb-2" />
            <h2 className="text-sm font-semibold text-navy mb-1">No certificates earned yet</h2>
            <p className="text-xs text-muted-foreground font-normal mb-4 max-w-xs">
              Complete 100% of your course video modules to earn official certificates.
            </p>
            <Link
              href="/dashboard/courses"
              className="px-4 py-2 bg-navy text-white text-xs font-semibold rounded-xl hover:bg-navy-light transition-all"
            >
              Continue Learning
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            {certificates.map((cert: any) => (
              <div key={cert._id} className="bg-white border border-border/80 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] border border-[#EDE3D0] flex items-center justify-center text-primary">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified
                    </span>
                  </div>

                  <h2 className="font-serif text-base font-semibold text-navy leading-snug mb-1">
                    {cert.course?.title || "Vastu Practitioner Certificate"}
                  </h2>
                  <p className="text-xs text-muted-foreground font-normal">
                    Issued: {new Date(cert.issuedAt || Date.now()).toLocaleDateString("en-IN", { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground font-normal">Official Credential</span>
                  <button
                    type="button"
                    onClick={() => alert(`Downloading certificate PDF for ${cert.course?.title || "Course"}`)}
                    className="px-3.5 py-1.5 bg-navy hover:bg-navy-light text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
