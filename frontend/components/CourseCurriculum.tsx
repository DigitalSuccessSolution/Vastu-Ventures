"use client";

import React, { useState } from "react";
import { ChevronDown, Play, FileText, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Lesson {
  title: string;
  duration: string;
  isPreview: boolean;
}

interface CurriculumSection {
  sectionTitle: string;
  lessons: Lesson[];
}

export default function CourseCurriculum({ sections }: { sections: CurriculumSection[] }) {
  const [openSectionIdx, setOpenSectionIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenSectionIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="flex flex-col gap-3">
      {sections.map((section, idx) => {
        const isOpen = openSectionIdx === idx;
        return (
          <div
            key={idx}
            className="bg-white border border-border rounded-xl overflow-hidden shadow-premium transition-all duration-300"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between p-4 text-left text-navy hover:text-primary transition-colors cursor-pointer"
            >
              <span className="text-xs sm:text-sm font-semibold">
                {section.sectionTitle}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground uppercase font-medium">{section.lessons.length} lessons</span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="px-4 pb-4 pt-1 text-xs border-t border-border/40 divide-y divide-border/30">
                    {section.lessons.map((lesson, lessonIdx) => (
                      <div key={lessonIdx} className="py-3 flex items-center justify-between font-light">
                        <div className="flex items-center gap-2.5">
                          {lesson.isPreview ? (
                            <Play className="w-3.5 h-3.5 text-primary fill-primary" />
                          ) : (
                            <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                          )}
                          <span className="text-navy">{lesson.title}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-muted-foreground text-[10px]">{lesson.duration}</span>
                          {lesson.isPreview && (
                            <button
                              onClick={() => alert("Playing preview video placeholder...")}
                              className="px-2 py-0.5 border border-primary text-primary hover:bg-background-alt rounded text-[9px] font-semibold transition-all cursor-pointer"
                            >
                              Free Preview
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
