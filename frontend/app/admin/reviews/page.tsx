"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([
    { id: "r1", course: "Vastu Foundation", student: "Vikram Mehra", rating: 5, text: "Incredible guidance, solved our sleep issues without any breaking of walls!" },
    { id: "r2", course: "Advanced Professional", student: "Rajesh Singhal", rating: 5, text: "Our factory efficiency improved tremendously after rearranging boilers." }
  ]);

  const handleDeleteReview = (id: string) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up text-left">
      <p className="text-xs text-muted-foreground font-light">Moderate student reviews before catalog publishing.</p>

      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-premium">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Course</th>
                <th className="p-4 font-semibold">Student</th>
                <th className="p-4 font-semibold">Score</th>
                <th className="p-4 font-semibold">Student Review</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {reviews.map((item) => (
                <tr key={item.id} className="hover:bg-background-alt/50 transition-colors">
                  <td className="p-4 font-bold text-navy">{item.course}</td>
                  <td className="p-4 text-navy-light">{item.student}</td>
                  <td className="p-4 text-primary font-bold">⭐ {item.rating}</td>
                  <td className="p-4 text-navy-light font-light max-w-sm truncate">{item.text}</td>
                  <td className="p-4 text-right flex justify-end">
                    <button 
                      onClick={() => handleDeleteReview(item.id)}
                      className="p-1.5 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
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
