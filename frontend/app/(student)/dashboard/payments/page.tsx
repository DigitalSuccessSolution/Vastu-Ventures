"use client";

import React, { useState, useEffect } from "react";
import { Download, CreditCard, Loader2, CheckCircle2 } from "lucide-react";
import api from "@/lib/axios";

export default function PaymentsHistoryPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await api.get("/users/payments");
        if (data.success) setTransactions(data.data || []);
      } catch (err) {
        console.error("Failed to fetch payments", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-7 h-7 animate-spin text-primary" />
        <p className="text-xs text-navy font-medium">Loading Invoices...</p>
      </div>
    );
  }

  const totalSpent = transactions.reduce((acc, tx) => acc + (tx.amount || 0), 0);

  return (
    <div className="flex flex-col w-full">
      {/* Clean Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-navy">Billing & Payment History</h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal mt-1">
            Review your order invoices and download PDF payment receipts.
          </p>
        </div>

        <div className="text-xs font-medium text-navy bg-white px-4 py-2 rounded-xl border border-border/80 shrink-0">
          Total Spent: <span className="font-semibold text-primary">₹{totalSpent > 100000 ? (totalSpent/100).toLocaleString() : totalSpent.toLocaleString()}</span>
        </div>
      </div>

      {/* Payment Table Container */}
      <div className="bg-white border border-border/80 rounded-2xl overflow-hidden shadow-sm w-full">
        {transactions.length === 0 ? (
          <div className="py-16 text-center flex flex-col items-center justify-center p-8">
            <CreditCard className="w-8 h-8 text-muted-foreground/30 mb-2" />
            <h2 className="text-sm font-semibold text-navy mb-1">No payment history found</h2>
            <p className="text-xs text-muted-foreground font-normal max-w-xs">
              Invoices for course enrollments and consultations will be listed here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF6F0] border-b border-[#EDE3D0] text-navy uppercase tracking-wider text-[10px] font-semibold">
                  <th className="p-4">Invoice Ref</th>
                  <th className="p-4">Billing Item</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-navy font-normal">
                {transactions.map((tx) => {
                  const txId = (tx.razorpayPaymentId || tx._id || "INV").slice(-10).toUpperCase();
                  const itemTitle = tx.course 
                    ? `Course: ${tx.course.title}` 
                    : tx.consultation 
                      ? `Consultation: ${tx.consultation.service?.title || "Vastu Audit"}` 
                      : tx.architecturePlan 
                        ? `Architecture Plan: ${tx.architecturePlan.title}` 
                        : "Vastu Ventures Service";
                  
                  return (
                    <tr key={tx._id} className="hover:bg-[#FAF9F6] transition-colors">
                      <td className="p-4 font-semibold text-primary font-mono">{txId}</td>
                      <td className="p-4 font-medium text-navy max-w-xs truncate">{itemTitle}</td>
                      <td className="p-4 text-muted-foreground font-normal">
                        {new Date(tx.createdAt || Date.now()).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="p-4 font-semibold text-navy">₹{tx.amount ? (tx.amount / (tx.amount > 10000 ? 100 : 1)).toLocaleString() : "0"}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {tx.status || "Paid"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          type="button"
                          onClick={() => alert(`Downloading official PDF Invoice for ${txId}`)}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-xl border border-border bg-white text-navy text-xs font-semibold hover:bg-[#FAF6F0] hover:text-primary transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-primary" /> Invoice PDF
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
