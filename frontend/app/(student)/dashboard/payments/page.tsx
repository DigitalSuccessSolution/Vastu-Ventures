"use client";

import React from "react";
import { Download, CreditCard } from "lucide-react";

export default function PaymentsHistoryPage() {
  const transactions = [
    {
      invoice: "INV-2026-081",
      item: "Vastu Shastra Foundation Certification",
      date: "July 12, 2026",
      amount: "₹199.00",
      status: "Paid"
    },
    {
      invoice: "INV-2026-042",
      item: "Residential Vastu Consultation Deposit",
      date: "June 28, 2026",
      amount: "₹150.00",
      status: "Paid"
    }
  ];

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
                <tr key={tx.invoice} className="hover:bg-background-alt/10 transition-colors">
                  <td className="p-4 font-semibold">{tx.invoice}</td>
                  <td className="p-4">{tx.item}</td>
                  <td className="p-4 text-muted-foreground">{tx.date}</td>
                  <td className="p-4 font-semibold">{tx.amount}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded bg-accent/15 text-accent border border-accent/20 text-[9px] font-bold uppercase tracking-wider">
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => alert(`Downloading receipt: ${tx.invoice}`)}
                      className="inline-flex items-center gap-1 text-primary hover:text-gold-end font-semibold cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
