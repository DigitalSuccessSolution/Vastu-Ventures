import React from "react";
import Link from "next/link";
import { Compass, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 py-16 text-center vastu-mandala-bg">
      <div className="flex flex-col items-center gap-6 max-w-md">
        
        {/* Rotating Compass Graphic */}
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gold-gradient shadow-premium-lg text-white">
          <Compass className="w-12 h-12 animate-spin-slow" />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-extrabold text-primary uppercase tracking-widest">
            Error 404
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy leading-tight">
            Lost Your Direction?
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed mt-2">
            The coordinates of this page seem misaligned with the cardinal grid. Let the compass guide you back to the center of harmony.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
          <Link
            href="/"
            className="flex-grow py-3 bg-navy hover:bg-navy-light text-white text-xs font-semibold rounded-xl shadow-premium flex items-center justify-center gap-1.5 transition-all"
          >
            <Home className="w-4 h-4" /> Back to Home Page
          </Link>
          <Link
            href="/services"
            className="flex-grow py-3 border border-border bg-white text-navy text-xs font-semibold rounded-xl shadow-premium flex items-center justify-center gap-1.5 hover:bg-background-alt transition-all"
          >
            Explore Services <ArrowLeft className="w-4 h-4 rotate-180 text-primary" />
          </Link>
        </div>

      </div>
    </div>
  );
}
