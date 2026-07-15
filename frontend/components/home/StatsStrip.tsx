"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, animate, useReducedMotion } from "framer-motion";

function CountUp({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    if (shouldReduceMotion) {
      if (decimals > 0) {
        node.textContent = to.toFixed(decimals);
      } else {
        node.textContent = to.toLocaleString();
      }
      return;
    }

    if (!inView) return;

    const controls = animate(0, to, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
      onUpdate(value) {
        if (decimals > 0) {
          node.textContent = value.toFixed(decimals);
        } else {
          node.textContent = Math.round(value).toLocaleString();
        }
      }
    });

    return () => controls.stop();
  }, [to, inView, decimals, shouldReduceMotion]);

  return <span ref={nodeRef}>0</span>;
}

export default function StatsStrip() {
  const stats = [
    { value: 15000, suffix: "+", label: "Spaces Harmonized" },
    { value: 45, suffix: "+", label: "Countries Reached" },
    { value: 22, suffix: "+", label: "Years Lineage Wisdom" },
    { value: 98.6, suffix: "%", decimals: 1, label: "Satisfaction Rate" }
  ];

  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-navy py-6 text-white border-y border-navy-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-center p-2 ${i !== stats.length - 1 ? "md:border-r border-navy-light/60" : ""
                }`}
            >
              <span className="font-serif text-2xl sm:text-3xl font-semibold text-gold-start tracking-tight">
                <CountUp to={stat.value} decimals={stat.decimals} />
                {stat.suffix}
              </span>
              <span className="text-xs sm:text-sm text-background-alt/80 uppercase font-medium tracking-widest mt-1.5">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
