"use client";

import React, { useState, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import ServiceInquiryForm from "@/components/ServiceInquiryForm";
import {
    Home,
    Briefcase,
    Factory,
    Monitor,
    UserRound,
    ArrowLeft,
    ArrowRight,
    Check,
    HelpCircle,
    Clock,
    MapPin,
    Compass,
    ShieldCheck,
    Sparkles,
    Calendar,
    Users,
    Award,
    Zap,
    CheckCircle2,
    ChevronDown,
    Building,
    TrendingUp,
    FileText,
    Heart,
    Smile,
    Moon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// High fidelity details data for all Vastu services
const servicesDetails = {
    "commercial-vastu": {
        title: "Commercial Office Vastu",
        category: "Commercial",
        icon: Briefcase,
        heroImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200",
        aboutImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
        heroDescription: "Supercharge your business potential, staff alignment, and cash flow. Our commercial office Vastu balances the workplace compass to boost sales and lock in financial gains.",
        analyzeItems: [
            { title: "Owner's Cabin", desc: "Positioning the head executive in the Southwest stability zone.", icon: Award },
            { title: "Staff Workspace", desc: "Aligning employee sitting charts for focus and focus retention.", icon: Users },
            { title: "Accounts Section", desc: "Positioning bookkeeping in the North direction to foster cash reserves.", icon: TrendingUp },
            { title: "Conference Rooms", desc: "Setting up collaboration desks to ensure successful deals.", icon: FileText },
            { title: "Server Room", desc: "Balancing active Southeast heat components to secure system uptime.", icon: Zap },
            { title: "Reception Lobby", desc: "East-facing entryway alignment to welcome premium clientele.", icon: Building }
        ],
        successStories: [
            {
                title: "HQ Office aligned owner seat to Southwest zone",
                beforeImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400",
                afterImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400",
                result: "Co-founder disputes resolved, team productivity rose by 35% in 60 days"
            },
            {
                title: "Retail showroom shifted billing counter to North",
                beforeImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=400",
                afterImage: "https://images.unsplash.com/photo-1567401893930-7dbc5340f7f3?auto=format&fit=crop&q=80&w=400",
                result: "Sales conversion rate improved by 28% and customer footfall grew in 3 weeks"
            }
        ],
        faqs: [
            { question: "Will implementing Vastu require shutting down the office?", answer: "Not at all. The entire correction process is non-disruptive, using metallic color tapes, wire loops, and small pyramids that can be placed during off-peak hours." }
        ]
    }
};

const otherServicesList = [
    { name: "Residential Vastu", slug: "residential-vastu", icon: Home, desc: "For Homes & Villas", price: "150" },
    { name: "Industrial Vastu", slug: "industrial-vastu", icon: Factory, desc: "For Factories & Industries", price: "600" },
];

interface Props {
    params: Promise<{ slug: string }>;
}

export default function ServiceDetailsPage() {
    const slug = "commercial-vastu";
    const service = servicesDetails[slug as keyof typeof servicesDetails];

    if (!service) {
        notFound();
    }

    // Local state for interactive UI
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [activeStory, setActiveStory] = useState(0);
    const [displayTitle, setDisplayTitle] = useState(service.title);
    const [displayPrice, setDisplayPrice] = useState(0);

    React.useEffect(() => {
        const saved = localStorage.getItem('adminServices');
        let adminService = null;
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                adminService = parsed.find((s: any) => s.slug === slug);
            } catch (e) {}
        }
        
        if (adminService) {
            if (adminService.title) setDisplayTitle(adminService.title);
            if (adminService.price) setDisplayPrice(adminService.price);
        } else {
            setDisplayPrice(300);
        }
    }, [slug]);

    const Icon = service.icon;
    const otherServices = otherServicesList.filter((s) => s.slug !== slug);

    // Dynamic about features and texts for the screenshot layout
    const aboutInfo = {
        "commercial-vastu": {
            title: "About Commercial Vastu",
            text: "Commercial Vastu is the ancient science of architecture that helps in creating positive, balanced and energetic workspaces. We analyze your office layout as per Vastu principles and provide practical solutions to improve cash flow, client retention, staff productivity and overall business growth.",
            features: [
                { title: "Cash Flow Boost", icon: TrendingUp },
                { title: "Staff Sync & Productivity", icon: Users },
                { title: "Corporate Stability", icon: Award },
                { title: "Strategic Growth", icon: Briefcase }
            ]
        }
    };

    // Dynamic benefits info mapping for the screenshot layout
    const benefitsInfo = {
        "commercial-vastu": {
            title: "Benefits of Commercial Vastu",
            cards: [
                { title: "Increased Sales & Revenue", icon: TrendingUp },
                { title: "Co-Founder Alignment", icon: Users },
                { title: "Productive Workspace", icon: Briefcase },
                { title: "Clear Decision Making", icon: Award },
                { title: "Strong Financial Stability", icon: Building },
                { title: "Reduced Staff Attrition", icon: Smile }
            ]
        }
    };

    // Animation constants
    const transition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const };

    return (
        <div className="bg-[#FDFBF7] min-h-screen pt-0 pb-20 relative overflow-hidden">

            {/* Decorative concentric rings */}
            <div className="absolute top-[-10%] right-[-5%] w-[450px] h-[450px] rounded-full border border-dashed border-[#E28A3E]/10 pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[450px] h-[450px] rounded-full border border-dashed border-[#E28A3E]/10 pointer-events-none" />

            {/* 1. PREMIUM HERO SECTION (Full bleeding edge-to-edge layout) */}
            <section className="relative w-full min-h-[480px] lg:min-h-[520px] bg-white border-b border-[#EDE3D0]/40 overflow-hidden flex items-center mb-16 pt-0">

                {/* Left Side Content & Grid Container */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 pointer-events-none">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={transition}
                            className="lg:col-span-7 flex flex-col justify-center gap-5 pt-[60px] pb-8 lg:pt-[65px] lg:pb-12 pointer-events-auto text-left"
                        >
                            {/* Category Pill Tag */}
                            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#E28A3E]">
                                <Compass className="w-4 h-4 text-black" />
                                {service.category} Vastu
                            </span>

                            {/* Main Heading */}
                            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-navy leading-tight max-w-[480px]">
                                {displayTitle.split(" ").map((word, i) => {
                                    if (word.toLowerCase() === "vastu") {
                                        return <span key={i} className="text-[#E28A3E]">{word} </span>;
                                    }
                                    return word + " ";
                                })}
                            </h1>

                            {/* Description */}
                            <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed max-w-xl">
                                {service.heroDescription}
                            </p>

                            {/* Actions CTAs */}
                            <div className="flex flex-col gap-3 mt-4 w-full sm:w-fit sm:min-w-[320px]">
                                <Link
                                    href="#book-consultation"
                                    className="w-full px-8 py-4 rounded-full bg-[#E28A3E] hover:bg-[#C67830] text-white text-[15px] font-bold shadow-premium hover:shadow-premium-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center text-center tracking-wide"
                                >
                                    <span>Book Consultation &bull; From ₹{displayPrice.toLocaleString('en-IN')}</span>
                                </Link>
                                <Link
                                    href="#book-consultation"
                                    className="w-full px-8 py-4 rounded-full bg-white border border-[#EDE3D0] hover:border-[#E28A3E] hover:bg-[#FEF3E4]/35 text-navy text-[15px] font-bold shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-center tracking-wide"
                                >
                                    <span>Talk to Expert</span>
                                    <ArrowRight className="w-4 h-4 text-navy/70" />
                                </Link>
                            </div>

                            {/* Trust Indicators Strip */}
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-3 text-[10px] text-navy/80 font-bold uppercase tracking-wider">
                                <div className="flex items-center gap-1.5">
                                    <Check className="w-4 h-4 text-black" strokeWidth={3} />
                                    <span>1000+ Happy Clients</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Check className="w-4 h-4 text-black" strokeWidth={3} />
                                    <span>Expert Vastu Consultants</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Check className="w-4 h-4 text-black" strokeWidth={3} />
                                    <span>Personalized Solutions</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Right Side Image Block (Edge-to-Edge) */}
                <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-10">
                    {/* Blend layout overlay gradient - localized on the left 1/3 boundary */}
                    <div className="absolute left-0 top-0 w-full lg:w-1/3 h-full bg-gradient-to-r from-[#FDFBF7] lg:from-white via-white/40 to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/30 to-transparent lg:hidden z-10 pointer-events-none" />
                    <img
                        src={service.heroImage}
                        alt={service.title}
                        className="w-full h-full object-cover opacity-25 lg:opacity-100"
                    />
                </div>
            </section>

            {/* Main Container Wrapper for remaining elements */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">


                {/* 3. ABOUT SERVICE SECTION (Side-by-side split layout) */}
                <section className="mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
                        {/* Left Column: Image Block */}
                        <div className="lg:col-span-5 relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-premium-lg border border-[#EDE3D0]/40">
                            <img
                                src={service.aboutImage}
                                alt="About Vastu Shastra"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy/15 to-transparent" />
                        </div>

                        {/* Right Column: Narrative Content & Features Strip */}
                        <div className="lg:col-span-7 flex flex-col gap-6">
                            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-navy mt-2.5">
                                {aboutInfo[slug as keyof typeof aboutInfo]?.title}
                            </h2>
                            <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                                {aboutInfo[slug as keyof typeof aboutInfo]?.text}
                            </p>

                            {/* Icon Strip Features */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2 border-t border-[#EDE3D0]/60 pt-6 relative">
                                {aboutInfo[slug as keyof typeof aboutInfo]?.features.map((feat, index) => {
                                    const FeatIcon = feat.icon;
                                    return (
                                        <div key={index} className="flex flex-col items-center text-center relative group">
                                            {/* Vertical Divider line for larger screens */}
                                            {index > 0 && (
                                                <div className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-[#EDE3D0]/60" />
                                            )}
                                            <FeatIcon className="w-7 h-7 text-black mb-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                                            <span className="text-[10px] sm:text-xs font-semibold text-black leading-tight">
                                                {feat.title}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. WHAT WE ANALYZE */}
                <section id="what-we-analyze" className="mb-20 scroll-mt-24">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="text-xs uppercase font-bold text-[#E28A3E] tracking-widest">Methodical Evaluation</span>
                        <h2 className="font-serif text-3xl sm:text-4xl font-medium text-navy mt-2.5">
                            What We Analyze
                        </h2>
                        <p className="text-sm md:text-base text-muted-foreground mt-3 font-light max-w-lg mx-auto">
                            Our experts scan the active nodes and zones of your space to pinpoint environmental blocks.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
                        {service.analyzeItems.map((item, index) => {
                            const ItemIcon = item.icon || Compass;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ ...transition, delay: index * 0.05 }}
                                    className="bg-white border border-[#EDE3D0]/60 rounded-2xl p-3.5 sm:p-6 text-left shadow-sm hover:shadow-premium hover:-translate-y-0.5 hover:border-[#E28A3E]/40 transition-all duration-300 flex flex-col gap-2.5 sm:gap-4 group"
                                >
                                    <ItemIcon className="w-5.5 h-5.5 sm:w-7 sm:h-7 text-black flex-shrink-0 mb-1.5 sm:mb-3 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                                    <div>
                                        <h3 className="font-serif text-xs sm:text-sm font-semibold text-black group-hover:text-[#E28A3E] transition-colors">{item.title}</h3>
                                        <p className="text-[10px] sm:text-sm text-muted-foreground font-light leading-relaxed mt-2">{item.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>



                {/* 6. CONSULTATION PROCESS */}
                <section className="mb-20">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="font-serif text-3xl sm:text-4xl font-medium text-navy mt-2.5">
                            Our Consultation Process
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:flex md:flex-row md:items-stretch md:justify-between gap-x-3.5 gap-y-6 md:gap-2 max-w-5xl mx-auto">
                        {[
                            { num: 1, title: "1. Book Consultation", desc: "Choose your preferred date and time.", icon: Calendar },
                            { num: 2, title: "2. Share Details", desc: "Share floor plan, photos and basic details.", icon: FileText },
                            { num: 3, title: "3. Expert Analysis", desc: "Our expert analyzes your space as per Vastu.", icon: Compass },
                            { num: 4, title: "4. Consultation", desc: "One-on-one session with Vastu expert.", icon: UserRound },
                            { num: 5, title: "5. Report & Remedies", desc: "Get detailed report and easy remedies.", icon: CheckCircle2 }
                        ].map((step, idx) => {
                            const StepIcon = step.icon;
                            return (
                                <React.Fragment key={idx}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ ...transition, delay: idx * 0.05 }}
                                        className={`flex flex-col items-center text-center flex-1 min-w-0 group cursor-pointer ${idx === 4 ? "col-span-2 md:col-span-1" : "col-span-1"
                                            }`}
                                    >
                                        {/* Raw Black and White Icon */}
                                        <StepIcon className="w-6 h-6 sm:w-8 sm:h-8 text-black mb-2.5 sm:mb-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />

                                        {/* Content */}
                                        <h4 className="text-[11px] sm:text-sm font-semibold text-black leading-snug group-hover:text-[#E28A3E] transition-colors">{step.title}</h4>
                                        <p className="text-[10px] sm:text-sm text-muted-foreground font-light mt-1.5 leading-relaxed max-w-[160px] mx-auto">
                                            {step.desc}
                                        </p>
                                    </motion.div>

                                    {idx < 4 && (
                                        <div className="hidden md:flex items-center justify-center text-[#EDE3D0] flex-shrink-0 self-start mt-6 mx-1">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </section>



                {/* 9. CLIENT SUCCESS STORIES */}
                <section className="mb-20">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#FEF3E4] text-[#A67C37] text-xs font-bold uppercase tracking-wider mb-3">
                            Client Stories
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl font-medium text-navy mt-2.5">
                            Real Transformations
                        </h2>
                    </div>

                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                        {service.successStories.map((story, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={transition}
                                className="bg-white border border-[#EDE3D0]/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-premium hover:border-[#E28A3E]/30 hover:-translate-y-0.5 transition-all duration-300 flex flex-col group"
                            >
                                {/* Before & After Split Image Header */}
                                <div className="relative grid grid-cols-2 h-36 sm:h-40 overflow-hidden">
                                    {/* Before Side */}
                                    <div className="relative h-full border-r border-white/20">
                                        <img
                                            src={story.beforeImage}
                                            alt="Before layout"
                                            className="w-full h-full object-cover grayscale opacity-90 group-hover:scale-102 transition-transform duration-500"
                                        />
                                        <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 text-white text-[9px] uppercase font-bold tracking-wider">
                                            Before
                                        </span>
                                    </div>

                                    {/* After Side */}
                                    <div className="relative h-full">
                                        <img
                                            src={story.afterImage}
                                            alt="After layout"
                                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                                        />
                                        <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#A67C37] text-white text-[9px] uppercase font-bold tracking-wider">
                                            After
                                        </span>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-5 text-left flex flex-col justify-between flex-grow gap-3">
                                    <div className="flex flex-col gap-1.5">
                                        <h3 className="font-serif text-sm sm:text-base font-semibold text-black leading-snug group-hover:text-[#E28A3E] transition-colors">
                                            {story.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                                            {story.result}
                                        </p>
                                    </div>

                                    {/* Star Rating */}
                                    <div className="flex items-center gap-0.5 text-amber-500 text-[10px] sm:text-xs">
                                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 11. FAQ ACCORDION */}
                <section className="mb-20">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="text-xs uppercase font-bold text-[#E28A3E] tracking-widest">FAQ</span>
                        <h2 className="font-serif text-3xl sm:text-4xl font-medium text-navy mt-2.5">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto flex flex-col gap-4 text-left">
                        {service.faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white border border-[#EDE3D0]/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#E28A3E]/30 transition-all duration-300"
                            >
                                <button
                                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                    className="w-full flex items-center justify-between p-5 text-black font-serif text-sm sm:text-base font-semibold text-left cursor-pointer hover:text-[#E28A3E] transition-colors"
                                >
                                    <span>{faq.question}</span>
                                    <ChevronDown className={`w-4 h-4 text-[#E28A3E] transition-transform duration-300 ${activeFaq === index ? "rotate-180" : ""}`} />
                                </button>

                                <AnimatePresence initial={false}>
                                    {activeFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            <div className="px-5 pb-5 pt-1 text-sm md:text-base text-muted-foreground font-light leading-relaxed border-t border-dashed border-[#EDE3D0]/40">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 12. BOOK CONSULTATION CTA */}
                <section id="book-consultation" className="mb-20 scroll-mt-24">
                    <div className="relative rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(226,138,62,0.12)] min-h-[320px] sm:min-h-[380px]">
                        {/* Full-cover background image */}
                        <img
                            src="/vastu-cta-compass.png"
                            alt="Vastu Compass Blueprint Design"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Dark gradient overlay */}
                        <div className="absolute inset-0 bg-navy/60 pointer-events-none" />

                        {/* Content on top */}
                        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full min-h-[320px] sm:min-h-[380px] px-8 sm:px-12 lg:px-16 py-12">
                            <div className="max-w-2xl flex flex-col items-center gap-5 mx-auto">
                                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
                                    <span className="text-white">Ready to Balance Your Space </span>
                                    <br className="hidden sm:inline" />
                                    <span className="text-white">and </span>
                                    <span className="text-[#E28A3E]">Your Life?</span>
                                </h2>

                                <p className="text-sm md:text-base text-white/75 font-light leading-relaxed max-w-md mx-auto">
                                    Book a consultation today and take the first step towards direction harmony, sound sleep, and career success.
                                </p>

                                {/* Key checkmarks */}
                                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] text-white/80 font-bold uppercase tracking-wider">
                                    <span className="flex items-center gap-1.5">
                                        <Check className="w-4 h-4 text-white" strokeWidth={3} /> No Demolitions
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Check className="w-4 h-4 text-white" strokeWidth={3} /> 1-on-1 Expert Advice
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Check className="w-4 h-4 text-white" strokeWidth={3} /> Blueprint Scan
                                    </span>
                                </div>

                                {/* Consultation Fee Badge */}
                                <div className="flex justify-center mt-3">
                                    <Link
                                        href="#book-consultation"
                                        className="px-8 py-4 rounded-full bg-[#E28A3E] hover:bg-[#C67830] text-white text-[15px] font-bold shadow-premium hover:shadow-premium-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center text-center tracking-wide"
                                    >
                                        <span>Book Consultation &bull; From ₹{displayPrice.toLocaleString('en-IN')}</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </div>
        </div>
    );
}

// Temporary placeholders to make sure icons compile properly
function Trash2(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
    );
}

function Wind(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
        </svg>
    );
}
