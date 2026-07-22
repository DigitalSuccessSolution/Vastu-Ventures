"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { 
  ShoppingCart, 
  Calendar, 
  Lock, 
  FileText, 
  Image as ImageIcon, 
  ShieldCheck,
  Compass,
  Loader2,
  Download,
  HelpCircle
} from "lucide-react";

function PlanDetailsContent({ params }: { params: Promise<{ slug: string; planSlug: string }> }) {
  const resolvedParams = React.use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isAuthenticated, token } = useAuthStore();

  // Read card data passed dynamically via URL query parameters
  const paramTitle = searchParams.get("title");
  const paramBuyPrice = searchParams.get("buyPrice");
  const fontConsultPrice = searchParams.get("consultPrice");
  const paramImage = searchParams.get("image");
  const paramDesc = searchParams.get("desc");

  const [dbPlan, setDbPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Buy Modal & Payment processing states
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [purchaseDetails, setPurchaseDetails] = useState({ name: "", email: "", phone: "" });
  const [isProcessing, setIsProcessing] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const fetchPlanDetails = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const res = await fetch(`${apiUrl}/architecture/plans/${resolvedParams.planSlug}`, {
        headers
      });
      const result = await res.json();
      if (result.success && result.data) {
        setDbPlan(result.data);
      }
    } catch (err) {
      console.error("Error fetching plan details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanDetails();
  }, [resolvedParams.planSlug, token]);

  useEffect(() => {
    if (typeof window !== 'undefined' && isAuthenticated && user) {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('checkout') === 'true') {
        setPurchaseDetails({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || ""
        });
        setShowBuyModal(true);
        // Remove checkout param from URL without reloading
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      }
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (showBuyModal) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [showBuyModal]);

  const handleDownloadPdf = async (url: string, filename: string) => {
    const cleanUrl = url.replace("/fl_attachment/", "/");
    try {
      const response = await fetch(cleanUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Direct download failed, opening URL instead:", err);
      window.open(cleanUrl, "_blank");
    }
  };

  const handlePayment = async () => {
    if (!purchaseDetails.name.trim() || !purchaseDetails.phone.trim()) {
      alert("Please fill all details to proceed.");
      return;
    }

    setIsProcessing(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      
      if (!token) {
        alert("Authentication required. Please log in.");
        router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
        return;
      }

      // 1. Create Razorpay Order
      const orderRes = await fetch(`${apiUrl}/payments/create-order`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          orderType: "architecture-plan",
          architecturePlanId: dbPlan._id
        })
      });
      const orderData = await orderRes.json();
      
      if (!orderData.success) {
        throw new Error(orderData.message || "Failed to create order");
      }
      
      const { razorpayOrderId, amount, currency, key_id } = orderData.data;

      // 2. Load Razorpay script
      const sdkLoaded = await loadRazorpayScript();
      if (!sdkLoaded) {
        alert("Razorpay SDK failed to load. Are you online?");
        setIsProcessing(false);
        return;
      }

      // 3. Open Razorpay UI
      const options = {
        key: key_id || "test_key",
        amount: amount,
        currency: currency,
        name: "Vastu Ventures",
        description: `Buy Blueprint: ${title}`,
        image: "/logo.png",
        order_id: razorpayOrderId,
        handler: async function (response: any) {
          try {
            // 4. Verify payment
            const verifyRes = await fetch(`${apiUrl}/payments/verify`, {
              method: "POST",
              headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature
              })
            });
            const verifyData = await verifyRes.json();
            
            if (verifyData.success) {
              alert("Payment successful! The layout blueprint has been unlocked.");
              setShowBuyModal(false);
              fetchPlanDetails(); // Reload layout info with direct downloads
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            console.error(err);
            alert("An error occurred during verification.");
          }
        },
        prefill: {
          name: purchaseDetails.name,
          email: purchaseDetails.email,
          contact: purchaseDetails.phone,
        },
        theme: {
          color: "#0F1A2C",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on('payment.failed', function (response: any) {
        alert("Payment failed: " + response.error.description);
      });
      paymentObject.open();

    } catch (error: any) {
      console.error(error);
      alert(error.message || "An unexpected error occurred");
    } finally {
      setIsProcessing(false);
    }
  };


  // Format slug as fallback if accessed via direct URL without query params or API
  const fallbackTitle = resolvedParams.planSlug
    .split("-")
    .map(w => {
      const lower = w.toLowerCase();
      if (lower === "bhk") return "BHK";
      if (lower === "1d" || lower === "2d" || lower === "3d") return lower.toUpperCase();
      if (!isNaN(Number(lower))) return lower;
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");

  const title = dbPlan?.title || paramTitle || fallbackTitle;
  const buyPrice = dbPlan?.buyPrice ? `₹${dbPlan.buyPrice}` : (paramBuyPrice || "");
  const consultPrice = dbPlan?.consultPrice ? `₹${dbPlan.consultPrice}` : (fontConsultPrice || "");
  const mainImage = dbPlan?.image || paramImage || "";
  const desc = dbPlan?.desc || paramDesc || "";

  const deliverables = (Array.isArray(dbPlan?.deliverables) && dbPlan.deliverables.length > 0) 
    ? dbPlan.deliverables 
    : [];

  return (
    <div className="bg-[#FAF9F6] min-h-screen font-sans text-navy py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Standard Full-width Container matching all website pages (max-w-7xl) */}
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        
        {/* TOP SECTION: 2 EQUAL COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Main Image (6 Cols) */}
          <div className="md:col-span-6 flex flex-col">
            {/* Main Image */}
            <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] rounded-2xl overflow-hidden bg-slate-100 border border-border/70 shadow-sm flex items-center justify-center">
              {mainImage ? (
                <img 
                  src={mainImage} 
                  alt={title}
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                  <ImageIcon className="w-10 h-10 text-slate-300" />
                  <span className="text-xs font-medium">No Image Uploaded</span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Info, Prices & Action Buttons (6 Cols) */}
          <div className="md:col-span-6 flex flex-col gap-4.5 justify-center">
            
            {/* Plan Title - DYNAMICALLY PASSED OR FETCHED */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-navy leading-snug">
              {title}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-navy/70 font-light leading-relaxed">
              {desc}
            </p>

            {/* Side-by-Side Price Cards */}
            <div className="grid grid-cols-2 gap-4 my-1">
              <div className="p-3.5 rounded-xl bg-white border border-border/70 shadow-xs flex flex-col justify-center">
                <span className="text-xs font-medium text-muted-foreground">Buy Plan</span>
                <span className="text-xl sm:text-2xl font-bold text-primary">{buyPrice}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-border/70 shadow-xs flex flex-col justify-center">
                <span className="text-xs font-medium text-muted-foreground">Book Consultation</span>
                <span className="text-xl sm:text-2xl font-bold text-navy">{consultPrice}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              {/* Primary Gold Brand Button */}
              {dbPlan?.isUnlocked ? (
                <div className="w-full py-3 px-5 bg-emerald-600 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Plan Unlocked & Purchased</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (isAuthenticated && user) {
                      setPurchaseDetails({
                        name: user.name || "",
                        email: user.email || "",
                        phone: user.phone || ""
                      });
                      setShowBuyModal(true);
                    } else {
                      router.push(`/login?redirect=${encodeURIComponent(`/architecture-planning/${resolvedParams.slug}/${resolvedParams.planSlug}?checkout=true`)}`);
                    }
                  }}
                  className="w-full py-3 px-5 bg-primary hover:bg-gold-end text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Buy Plan Now</span>
                </button>
              )}

              {/* Secondary Navy Brand Button */}
              <Link
                href={`/book?type=consultation&title=${encodeURIComponent(title)}`}
                className="w-full py-3 px-5 bg-navy hover:bg-navy-light text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-primary" />
                <span>Book Consultation</span>
              </Link>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION: LOCKED DELIVERABLES PREVIEW */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border/70 shadow-sm flex flex-col gap-6 text-left">
          
          <div className="border-b border-border/60 pb-4">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-navy">
              What You Get After Purchasing
            </h2>
            <p className="text-xs sm:text-sm text-navy/60 font-light mt-1">
              {dbPlan?.isUnlocked 
                ? "Click the download buttons below to retrieve your high-resolution layout files."
                : "Instant access to complete high-resolution blueprints, technical drawings, and Vastu guidelines."
              }
            </p>
          </div>

          {/* Locked/Unlocked Items Grid */}
          {deliverables.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {deliverables.map((item: string, idx: number) => (
                <div key={idx} className="p-4 rounded-xl border border-border/80 bg-[#FAF9F5] flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-navy/5 text-navy flex items-center justify-center font-bold text-xs">
                      {idx % 2 === 0 ? <FileText className="w-4 h-4 text-primary" /> : <ImageIcon className="w-4 h-4 text-navy" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy text-xs">{item}</h4>
                      <p className="text-[10px] text-muted-foreground font-light">Included in package</p>
                    </div>
                  </div>
                  {dbPlan?.isUnlocked ? (
                    <div className="p-1.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="p-1.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200" title="Locked until purchase">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : Array.isArray(dbPlan?.attachments) && dbPlan.attachments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dbPlan.attachments.map((att: any, idx: number) => {
                const isPdf = att.fileType === "pdf" || att.name?.toLowerCase().endsWith(".pdf");
                const isImage = att.fileType === "image" || [".png", ".jpg", ".jpeg", ".webp", ".avif", ".svg"].some(ext => att.name?.toLowerCase().endsWith(ext));

                return (
                  <div key={idx} className="p-4 rounded-xl border border-border/80 bg-[#FAF9F5] flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isPdf ? "bg-red-50 text-red-600 border border-red-100" : isImage ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      }`}>
                        {isPdf ? <FileText className="w-4 h-4" /> : isImage ? <ImageIcon className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-navy text-xs truncate" title={att.name}>{att.name}</h4>
                        <p className="text-[10px] text-muted-foreground font-light">{isPdf ? "PDF Document" : isImage ? "Image File" : "Attachment"}</p>
                      </div>
                    </div>
                    {dbPlan?.isUnlocked ? (
                      <button
                        type="button"
                        onClick={() => handleDownloadPdf(att.fileUrl, att.name)}
                        className="p-1.5 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 shrink-0 cursor-pointer transition-colors"
                        title="Download Layout Blueprint"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <div className="p-1.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 shrink-0" title="Locked until purchase">
                        <Lock className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-border/60 bg-[#FAF9F5] text-xs text-navy/70">
              Full architectural blueprint and digital documents package.
            </div>
          )}

          {/* Guarantee Badge Banner */}
          <div className="mt-2 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex items-center gap-3 text-emerald-900 text-xs sm:text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <p className="font-medium">
              100% Vastu Verified Blueprint Guarantee. All layouts are designed by certified Vastu experts.
            </p>
          </div>

        </div>

      </div>

      {/* Razorpay Checkout Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setShowBuyModal(false)}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-2xl font-serif font-bold text-navy mb-1">Buy Blueprint Layout</h2>
            <p className="text-sm text-navy-light mb-6">Enter your contact details to purchase layout files.</p>
            
            <div className="bg-[#FAF6F0] p-5 rounded-2xl mb-6 border border-[#E5E0D8]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-navy-light font-medium">Layout Plan</span>
                <span className="text-sm font-bold text-navy max-w-[200px] truncate" title={title}>{title}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#E5E0D8]/60 mt-2">
                <span className="text-sm text-navy-light font-medium">Total Price</span>
                <span className="text-lg font-bold text-primary">{buyPrice}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy-light/70 mb-1.5 tracking-wider uppercase">Full Name</label>
                <input
                  type="text"
                  value={purchaseDetails.name}
                  onChange={(e) => setPurchaseDetails({...purchaseDetails, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-[#E5E0D8] rounded-xl text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors placeholder:text-gray-400 font-medium"
                  placeholder="E.g. Dheeraj Patidar"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-light/70 mb-1.5 tracking-wider uppercase">Email Address</label>
                <input
                  type="email"
                  value={purchaseDetails.email}
                  disabled
                  className="w-full px-4 py-3 bg-gray-50 text-gray-500 border border-[#E5E0D8] rounded-xl text-sm cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-light/70 mb-1.5 tracking-wider uppercase">Phone Number</label>
                <input
                  type="tel"
                  value={purchaseDetails.phone}
                  onChange={(e) => setPurchaseDetails({...purchaseDetails, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-[#E5E0D8] rounded-xl text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors placeholder:text-gray-400 font-medium"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
              
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full py-3.5 mt-6 bg-navy hover:bg-navy-light text-white text-sm font-bold rounded-xl shadow-premium transition-all flex justify-center items-center gap-2 cursor-pointer ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <ShieldCheck className="w-5 h-5" /> 
              )}
              {isProcessing ? "Processing..." : "Proceed to Pay"}
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default function PlanDetailsPage({ params }: { params: Promise<{ slug: string; planSlug: string }> }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-xs text-muted-foreground font-medium">Loading Architecture Details...</p>
      </div>
    }>
      <PlanDetailsContent params={params} />
    </Suspense>
  );
}
