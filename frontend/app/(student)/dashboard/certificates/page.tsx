"use client";

import React from "react";

export default function CertificatesPage() {
  return (
    <div className="flex flex-col gap-6 text-left">
      <div>
        <h2 className="font-serif text-2xl font-bold text-navy">Certificates</h2>
        <p className="text-xs text-muted-foreground mt-1 font-light">
          View and download your earned course certificates.
        </p>
      </div>
      <div className="bg-white border border-border p-8 rounded-2xl flex flex-col items-center justify-center text-center mt-6">
        <p className="text-navy-light text-sm">You haven't earned any certificates yet.</p>
      </div>
    </div>
  );
}
