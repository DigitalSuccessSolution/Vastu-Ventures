import React from "react";
import { Compass, CheckCircle2, Award, Calendar } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    { title: "Mathematical Accuracy", desc: "We map energy sectors down to the single degree, avoiding guesswork." },
    { title: "Preservation-First Remedies", desc: "Over 95% of our recommendations are non-destructive and visual-only." },
    { title: "Continuous Learning", desc: "We are committed to sharing traditional formulas through modern certification programs." }
  ];

  return (
    <div className="bg-background vastu-mandala-bg">
      {/* Page Header */}
      <section className="bg-background-alt py-16 border-b border-border text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase font-bold text-primary tracking-widest">Our Heritage</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy mt-2">
            Ancient Wisdom, Modern Guidance
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-4 max-w-xl mx-auto font-light leading-relaxed">
            At Vastu Ventures, we bridge the gap between traditional Indian spatial guidelines (Shilpashastra) and contemporary architecture requirements.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
              Honoring a Lineage of Vedic Harmony
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
              Vastu Ventures is not just a consultation practice—it is an educational guild. Founded by Acharya Raghavendra, a practitioner with over two decades of experience, our mission is to demystify traditional architecture.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
              We focus on elemental chemistry: managing the flow of Solar Energy (from the East), Magnetic Currents (from the North), and elemental fire, water, earth, and air balances.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
              <div className="text-center p-4 bg-background-alt border border-border rounded-xl">
                <span className="font-serif text-2xl font-bold text-primary block">22+</span>
                <span className="text-[10px] text-muted-foreground uppercase font-medium mt-1 block">Years of Audit</span>
              </div>
              <div className="text-center p-4 bg-background-alt border border-border rounded-xl">
                <span className="font-serif text-2xl font-bold text-primary block">15k+</span>
                <span className="text-[10px] text-muted-foreground uppercase font-medium mt-1 block">Homes Balanced</span>
              </div>
              <div className="text-center p-4 bg-background-alt border border-border rounded-xl">
                <span className="font-serif text-2xl font-bold text-primary block">5,000+</span>
                <span className="text-[10px] text-muted-foreground uppercase font-medium mt-1 block">Students Certified</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-premium-lg border-2 border-white">
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800"
                alt="Traditional Indian Vedic architecture elements layout"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
            </div>
          </div>

        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background-alt border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mb-12">
            Our Core Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <div key={i} className="bg-white border border-border rounded-2xl p-6 shadow-premium text-center flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-background-alt text-primary flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-base font-bold text-navy">{val.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-20 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy">Need Custom Spatial Guidance?</h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-3 font-light leading-relaxed max-w-md mx-auto">
          Our specialized team is available for residential, corporate, and macro industrial layout designs.
        </p>
        <Link
          href="/book"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold-gradient text-white text-sm font-semibold rounded-xl shadow-premium hover:shadow-premium-lg mt-8 hover:scale-[1.02] transition-all"
        >
          <Calendar className="w-4.5 h-4.5" /> Book Consultation Call
        </Link>
      </section>
    </div>
  );
}
