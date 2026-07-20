"use client";

import React, { useState, useEffect } from "react";
import { Download, CreditCard, Loader2 } from "lucide-react";
import api from "@/lib/axios";

export default function PaymentsHistoryPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await api.get("/users/payments");
        if (data.success) setTransactions(data.data);
      } catch (err) {
        console.error("Failed to fetch payments", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  if (loading) {
    return <div className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" /></div>;
  }

  return (
    <div className="flex flex-col gap-8 text-left max-w-4xl">
      <div>
        <h2 className="font-serif text-2xl font-bold text-navy">Billing & Payments</h2>
        <p className="text-xs text-muted-foreground mt-1 font-light">
          Review your invoices and download receipts for course enrollments and consultations.
        </p>
      </div>

      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-premium">
        <div className="overflow-x-auto">
          {transactions.length === 0 ? (
            <div className="p-8 text-center text-sm text-navy-light">No payment history found.</div>
          ) : (
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-background-alt border-b border-border text-navy uppercase tracking-wider text-[10px] font-bold">
                  <th className="p-4">Invoice No</th>
                  <th className="p-4">Billing Item</th>
                  <th className="p-4">Purchase Date</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-navy font-light">
                {transactions.map((tx) => (
                  <tr key={tx._id} className="hover:bg-background-alt/10 transition-colors">
                    <td className="p-4 font-semibold">{tx._id.slice(-8).toUpperCase()}</td>
                    <td className="p-4">{tx.course ? tx.course.title : (tx.appointment ? "Consultation" : "Service")}</td>
                    <td className="p-4 text-muted-foreground">{new Date(tx.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 font-semibold">₹{tx.amount}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${tx.status === "completed" || tx.status === "succeeded" ? "bg-accent/15 text-accent border border-accent/20" : "bg-muted-foreground/15 text-muted-foreground border border-muted-foreground/20"}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => alert(`Downloading receipt: ${tx._id}`)}
                        className="inline-flex items-center gap-1 text-primary hover:text-gold-end font-semibold cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" /> PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
