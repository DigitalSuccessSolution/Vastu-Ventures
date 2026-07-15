import React from "react";
import Link from "next/link";
import { Compass } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background-alt flex flex-col justify-center py-12 sm:px-6 lg:px-8 vastu-mandala-bg">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <Link href="/" className="flex items-center gap-2 group mb-6">
          <img src="/logo.png" alt="Vastu Ventures Logo" className="h-18 w-auto object-contain" />
        </Link>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-premium-lg rounded-2xl sm:px-10 border border-border">
          {children}
        </div>
      </div>
    </div>
  );
}
