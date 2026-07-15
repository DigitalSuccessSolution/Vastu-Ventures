"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactLenis } from "lenis/react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
}
