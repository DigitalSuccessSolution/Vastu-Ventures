import React from "react";
import Link from "next/link";
import { Star, Clock, BookOpen, ChevronRight, Heart } from "lucide-react";
import { COURSES } from "@/data/mockData";

export default function WishlistPage() {
  // Wishlisted course: Advanced Course (index 1)
  const wishlistCourses = [COURSES[1]];

  return (
    <div className="flex flex-col gap-8 text-left max-w-4xl">
      <div>
        <h2 className="font-serif text-2xl font-bold text-navy flex items-center gap-2">
          <Heart className="w-6 h-6 text-primary fill-primary" /> My Wishlist
        </h2>
        <p className="text-xs text-muted-foreground mt-1 font-light">
          Courses you are interested in enrolling in the future.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
        {wishlistCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white border border-border rounded-2xl p-5 shadow-premium flex flex-col justify-between"
          >
            <div>
              <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
              </div>

              <h3 className="font-serif text-base font-bold text-navy leading-snug">
                {course.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-3 font-light">
                {course.shortDescription}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground font-light flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-primary" /> {course.lessonsCount} lessons
              </span>
              
              <div className="flex items-center gap-3">
                <span className="text-sm font-extrabold text-navy">₹{course.price}</span>
                <Link
                  href={`/courses/${course.slug}`}
                  className="flex items-center gap-1 px-4 py-2 bg-navy hover:bg-navy-light text-white text-xs font-semibold rounded-lg shadow-premium transition-all"
                >
                  Enroll <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
