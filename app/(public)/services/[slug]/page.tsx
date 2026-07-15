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
  "residential-vastu": {
    title: "Residential Vastu Consultation",
    category: "Residential",
    icon: Home,
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
    aboutImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    heroDescription: "Transform your home into a sanctuary of peace, health, and abundance. Our expert Vastu consultation balances the Pancha Bhootas (five elements) to invite positive energy and prosperity.",
    trustPoints: [
      "No structural demolition required",
      " लाइन-आधारित Lineage Remedies",
      "Scientific energy scans"
    ],
    stats: [
      { value: "5,000+", label: "Homes Harmonized" },
      { value: "20+", label: "Years Experience" },
      { value: "99.4%", label: "Satisfaction Rate" },
      { value: "100%", label: "Scientific Approach" }
    ],
    aboutTitle: "Unlocking Harmony in Your Living Space",
    aboutText: "Residential Vastu Shastra is the ancient Vedic science of architecture that maps the elements of nature with human living. By aligning directions with elemental energy centers (such as Water in the Northeast, Fire in the Southeast, Earth in the Southwest, and Air in the Northwest), we create a customized energy layout for your home. This process balances the invisible forces acting on your property, creating structural harmony that promotes peaceful sleep, clear thinking, and physical vitality.",
    analyzeItems: [
      { title: "Main Entrance", desc: "Verifying direction thresholds to filter positive energy flow.", icon: Compass },
      { title: "Master Bedroom", desc: "Southwest zone stabilization for sound sleep & relationship harmony.", icon: Home },
      { title: "Kitchen Zone", desc: "Balancing fire and water elements to prevent health and cash drain.", icon: Zap },
      { title: "Living Room", desc: "Northeast/East layout to foster warm social connections and joy.", icon: Users },
      { title: "Pooja Room", desc: "Northeast configuration for pure spiritual and meditative vibration.", icon: Sparkles },
      { title: "Bathroom & WCs", desc: "Remedying energy drainage and structural disposal outlets.", icon: Trash2 },
      { title: "Balcony & Openings", desc: "Promoting light entry pathways and fresh air circulation.", icon: Wind },
      { title: "Staircase Alignment", desc: "Weight balancing calibration to lock positive growth.", icon: TrendingUp }
    ],
    benefits: [
      { title: "Restored Peaceful Sleep", desc: "Neutralize negative energy zones in bedrooms to resolve chronic fatigue and anxiety.", icon: ShieldCheck },
      { title: "Financial Abundance", desc: "Unlock wealth blocks by aligning the North opportunities direction in your layout.", icon: TrendingUp },
      { title: "Family Relationship Sync", desc: "Remove friction and misunderstandings by balancing Southwest elements.", icon: Users },
      { title: "Improved Health & Vigor", desc: "Correct kitchen placements to protect family metabolism and support long-term health.", icon: Award }
    ],
    requiredInfo: [
      { title: "Accurate Floor Plan", desc: "A scaled PDF or sketch showing walls, doors, and window openings." },
      { title: "Digital North Angle", desc: "Exact compass degrees taken from the center of the house using a phone." },
      { title: "Property Surroundings", desc: "Details on high-voltage poles, neighboring tall buildings, or water bodies." },
      { title: "Family Birth Details", desc: "Date, time, and place of birth of the primary earners for astrovastu tuning." }
    ],
    whyPoints: [
      { title: "100% Non-Destructive Solutions", desc: "We utilize copper/brass rods, color therapy, and elemental crystals to shift energy grids without breaking single bricks." },
      { title: "Lineage & Modern Integration", desc: "Acharya Raghavendra blends ancient architectural texts with modern energy scanning tools for high accuracy." },
      { title: "Detailed Digital Blueprints", desc: "Receive highly detailed, visual Vastu maps highlighting exact remedy placements." }
    ],
    successStories: [
      {
        title: "Family in Delhi shifted master bedroom to SW zone",
        beforeImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400",
        afterImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=400",
        result: "Health issues resolved within 60 days, relationship harmony restored"
      },
      {
        title: "Kitchen relocated away from NE corner in Mumbai flat",
        beforeImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=400",
        afterImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=400",
        result: "Financial losses stopped, business stabilised within 3 months"
      }
    ],
    testimonials: [
      { name: "Meera Sen", role: "Homeowner, Bangalore", text: "The Vastu advice completely changed the vibes of our apartment. We sleep better, and there is a beautiful calm in the house now.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150", rating: 5 },
      { name: "Rahul Deshmukh", role: "Villa Owner, Pune", text: " Raghavendra Ji suggested simple color patches and copper rings that solved our long-standing issues without any structural breakages.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150", rating: 5 }
    ],
    faqs: [
      { question: "Do you require structural changes or demolitions?", answer: "No. We believe in non-destructive Vastu. Energetic imbalances can be corrected using elemental colors, specialized metal wires, crystal energy bars, and direction placements." },
      { question: "How long does it take to see visible changes?", answer: "Typically, physical and emotional energies begin to shift within 3 to 4 weeks after remedy execution. Financial or career opportunities often unlock within 60 to 90 days." },
      { question: "Can Online Vastu consulting be as effective as site visits?", answer: "Yes, provided the layout maps and direction degree measurements are accurate. A detailed map grid scanning yields identical diagnostic reports for remedial placements." }
    ]
  },
  "commercial-vastu": {
    title: "Commercial Office Vastu",
    category: "Commercial",
    icon: Briefcase,
    heroImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200",
    aboutImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    heroDescription: "Supercharge your business potential, staff alignment, and cash flow. Our commercial office Vastu balances the workplace compass to boost sales and lock in financial gains.",
    trustPoints: [
      "Optimized seating chart planning",
      "Southeast server room balance",
      "Increased executive decision clarity"
    ],
    stats: [
      { value: "1,200+", label: "Offices Structured" },
      { value: "20+", label: "Years Experience" },
      { value: "98.7%", label: "Business ROI Rate" },
      { value: "100%", label: "Vedic Science Sync" }
    ],
    aboutTitle: "Enhancing Corporate Productivity & Cash Flow",
    aboutText: "Corporate environments are hubs of decision making, strategy, and client interactions. Imbalances in office directions can cause executive blocks, employee friction, and cash flow bottlenecks. Commercial Vastu analyzes the workspace layout, ensuring the CEO cabin is in the Southwest stability center, sales teams sit in the active Northwest flow zone, and accounts are placed in the North growth sector to secure high margins.",
    analyzeItems: [
      { title: "Owner's Cabin", desc: "Positioning the head executive in the Southwest stability zone.", icon: Award },
      { title: "Staff Workspace", desc: "Aligning employee sitting charts for focus and focus retention.", icon: Users },
      { title: "Accounts Section", desc: "Positioning bookkeeping in the North direction to foster cash reserves.", icon: TrendingUp },
      { title: "Conference Rooms", desc: "Setting up collaboration desks to ensure successful deals.", icon: FileText },
      { title: "Server Room", desc: "Balancing active Southeast heat components to secure system uptime.", icon: Zap },
      { title: "Reception Lobby", desc: "East-facing entryway alignment to welcome premium clientele.", icon: Building }
    ],
    benefits: [
      { title: "Accelerated Business Growth", desc: "Align opportunities zone to welcome premium inquiries and major deals.", icon: TrendingUp },
      { title: "Minimized Employee Turnover", desc: "Balance internal office seating coordinates to resolve staff disputes and boost focus.", icon: Users },
      { title: "Secured Financial Margins", desc: "Position payment processing & ledger books in Vastu-compliant directions.", icon: ShieldCheck },
      { title: "Decisive Executive Leadership", desc: "Ensure owners sit in command positions to make sharp strategic moves.", icon: Award }
    ],
    requiredInfo: [
      { title: "Detailed Floor Layout Plan", desc: "Office drawing showing walls, desk positions, exits, and pantries." },
      { title: "Compass Degrees reading", desc: "Degrees reading taken from the center of the office premises." },
      { title: "Owner's Birth Chart", desc: "Kundli or birth details of the main founders for direction tuning." },
      { title: "Staff Distribution Chart", desc: "Headcount and seating department arrangements overview." }
    ],
    whyPoints: [
      { title: "Zero Work Disruptions", desc: "Remedies utilize crystals, metallic pins, and color bands, executing smoothly without shutting down your office floor." },
      { title: "Corporate Astrovastu Alignment", desc: "We harmonize physical corporate directions with the birth charts of business partners." },
      { title: "Visual Placement Guides", desc: "Provides high-quality CAD mapping layers specifying remedy points." }
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
    testimonials: [
      { name: "Anand Gupta", role: "CEO, TechVantage solutions", text: "Realigning our workstations according to Raghavendra Ji's directions reduced worker friction and noticeably improved sales output.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150", rating: 5 }
    ],
    faqs: [
      { question: "Will implementing Vastu require shutting down the office?", answer: "Not at all. The entire correction process is non-disruptive, using metallic color tapes, wire loops, and small pyramids that can be placed during off-peak hours." }
    ]
  },
  "industrial-vastu": {
    title: "Industrial & Factory Vastu",
    category: "Industrial",
    icon: Factory,
    heroImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    aboutImage: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200",
    heroDescription: "Streamline raw material processing, prevent frequent machinery breakdowns, and secure worker safety with industrial Vastu corrections.",
    trustPoints: [
      "Reduced machine breakdown rate",
      "Optimal raw material storage routing",
      "Worker safety energy enhancement"
    ],
    stats: [
      { value: "450+", label: "Factories Audited" },
      { value: "20+", label: "Years Experience" },
      { value: "99.1%", label: "Machinery Uptime" },
      { value: "100%", label: "Vastu Shastra Compliance" }
    ],
    aboutTitle: "Optimizing High-Yield Industrial Workflows",
    aboutText: "Factory layouts involve complex integrations of heavy raw inputs, thermal machinery, electrical substations, and exhaust lines. A minor directional misalignment of furnace plants or drainage tanks can lead to recurrent machine failures, supply delays, or site safety hazards. Factory Vastu balances high-weight elements in the Southwest and heat units in the Southeast to create a smooth workflow.",
    analyzeItems: [
      { title: "Heavy Machinery", desc: "Placing heavy industrial equipment in the Southwest stability sector.", icon: Factory },
      { title: "Boilers & Furnaces", desc: "Ensuring heating units are set in the Southeast fire quadrant.", icon: Zap },
      { title: "Raw Material", desc: "Stacking high-weight incoming raw stock in the Southwest storage.", icon: Home },
      { title: "Finished Inventory", desc: "Storing final goods in Northwest zone for rapid shipping turnaround.", icon: TrendingUp },
      { title: "Electrical Substation", desc: "Aligning main high-voltage grids and panels in the Southeast.", icon: Compass },
      { title: "Effluent Outlets", desc: "Positioning chemical discharges correctly to prevent regulatory blockages.", icon: FileText }
    ],
    benefits: [
      { title: "Minimized Machinery Downtime", desc: "Correct furnace & boiler coordinates to avoid recurring structural breakdown costs.", icon: Zap },
      { title: "Enhanced Site Safety", desc: "Clear energy blockages in worker quarters to reduce workplace accident rates.", icon: ShieldCheck },
      { title: "Consistent Output Quality", desc: "Establish stable directional flows to keep manufacturing runs precise.", icon: Award },
      { title: "Fast Stock Turnaround", desc: "Position final product loading in Northwest gates to boost sales shipping.", icon: TrendingUp }
    ],
    requiredInfo: [
      { title: "Factory Land Layout Blueprint", desc: "Site boundaries layout including land slopes and neighboring plots." },
      { title: "Machinery Positioning Map", desc: "Detailed plans showing exact boiler, transformer, and press layout placement." },
      { title: "Location Degrees Reading", desc: "Compass degrees reading verified from the plot center." },
      { title: "Water Line Layout", desc: "Position of overhead tanks, tube wells, and chemical discharge lines." }
    ],
    whyPoints: [
      { title: "Practical Heavy Industry Solutions", desc: "We focus on elements placement and energy corrections without disturbing structural structural walls." },
      { title: "Deep Industrial Science", desc: "We calibrate machinery weight distribution with Earth gravity vectors." },
      { title: "Detailed Remedial Blueprints", desc: "Receive layout maps charting machine placements and energy correcting elements." }
    ],
    successStories: [
      {
        title: "Factory shifted boiler units to Southeast fire corner",
        beforeImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400",
        afterImage: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=400",
        result: "Machinery breakdown rate dropped to zero, monthly yield rose by 30%"
      },
      {
        title: "Steel mill aligned main entry gate to Northeast",
        beforeImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400",
        afterImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400",
        result: "Logistics delay resolved, product delivery transit speed grew by 45%"
      }
    ],
    testimonials: [
      { name: "Suresh Hegde", role: "Factory Owner, Chennai", text: "Raghavendra Ji's advice on machinery layout dramatically lowered machine failures and improved staff alignment.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150", rating: 5 }
    ],
    faqs: [
      { question: "Can heavy industrial equipment be adjusted without physical shifting?", answer: "Yes. In cases where moving heavy machinery is impossible, we neutralize field imbalances using metallic energy bars and color grids." }
    ]
  },
  "online-consultation": {
    title: "Online Vastu Consultation",
    category: "Consultation",
    icon: Monitor,
    heroImage: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80&w=1200",
    aboutImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200",
    heroDescription: "Get swift Vastu guidance from our experts anywhere in the world. Submit your space blueprint for a detailed 1-on-1 virtual walkthrough.",
    trustPoints: [
      "Interactive 60-Min Video Session",
      "Detailed Digital Remedy Blueprint",
      "No Geographical Barriers"
    ],
    stats: [
      { value: "3,500+", label: "Virtual Scans" },
      { value: "100%", label: "Digital Accuracy" },
      { value: "99.2%", label: "Client Satisfaction" },
      { value: "24 Hrs", label: "Report Delivery" }
    ],
    aboutTitle: "Vastu Solutions Made Globally Accessible",
    aboutText: "Online consultation enables quick and precise directional checking of your premises. By plotting your layout drawing onto a 16-zone digital grid using professional compass readings, our experts pinpoint energy blockages. You will participate in a detailed live video call to discuss custom Vastu remedies, receiving complete instructions on elemental balances and colors.",
    analyzeItems: [
      { title: "Layout Mapping", desc: "Plotting structural lines on a digital 16-zone Vastu grid.", icon: FileText },
      { title: "Entrance Direction", desc: "Checking compass values to identify threshold energy blocks.", icon: Compass },
      { title: "Five Elements", desc: "Balancing fire, water, air, space, and earth placements virtual map.", icon: Zap },
      { title: "Bed & Kitchen Seating", desc: "Correcting key sleeping & cooking vectors interactively.", icon: Home }
    ],
    benefits: [
      { title: "Fast Turnaround Time", desc: "Receive expert analysis and remedial blueprints within 24-48 hours.", icon: Clock },
      { title: "Completely Remote Session", desc: "Connect with lead Acharyas from the comfort of your home over video calls.", icon: Monitor },
      { title: "Interactive Digital Reports", desc: "Get high-quality PDF guides mapping exact remedies directly onto your floor plan.", icon: FileText },
      { title: "Cost-Effective Packages", desc: "Achieve the same professional Vastu advice without the cost of travel.", icon: Award }
    ],
    requiredInfo: [
      { title: "Aesthetic Floor Blueprint", desc: "PDF or image of the building floor plan layout drawing." },
      { title: "Center Compass Reading", desc: "Degrees reading taken from the physical center of the property." },
      { title: "List of Concerns", desc: "Outline of specific problems or objectives (health, finance, relations)." }
    ],
    whyPoints: [
      { title: "Precision Grid Grating", desc: "We use digital tools to ensure directional lines are mapped within 1 degree." },
      { title: "Face-To-Face Calls", desc: "Live screensharing session where you can see the remedies plotted on your plan." },
      { title: "Unlimited Query Resolution", desc: "Post-consultation support chat window to address implementation questions." }
    ],
    successStories: [
      {
        title: "London apartment adjusted blocked North zones",
        beforeImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=400",
        afterImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=400",
        result: "Stuck financial payments cleared and new consulting contracts unlocked in 30 days"
      },
      {
        title: "Singapore flat corrected kitchen gas stove clash",
        beforeImage: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&q=80&w=400",
        afterImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=400",
        result: "Digestion and health issues resolved for partners within 4 weeks"
      }
    ],
    testimonials: [
      { name: "Pooja Malhotra", role: "Rented Flat, London", text: "The online video session was extremely helpful. Raghavendra Ji explained everything using our PDF map.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150", rating: 5 }
    ],
    faqs: [
      { question: "How do I measure the compass degrees accurately?", answer: "Once you register, we send a simple step-by-step video guide explaining how to use any mobile compass app at the center of your house." }
    ]
  },
  "offline-consultation": {
    title: "Offline Site Vastu Audit",
    category: "Audit",
    icon: UserRound,
    heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
    aboutImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200",
    heroDescription: "Secure our premium physical site audit. Our Vastu Acharyas visit your site to scan soils, slopes, and geopathic lines for a complete analysis.",
    trustPoints: [
      "In-person Geopathic Stress Scanning",
      "Physical Dowsing & Soil Field Testing",
      "Immediate On-Site Remedy Guidance"
    ],
    stats: [
      { value: "2,000+", label: "Physical Audits" },
      { value: "20+", label: "Years Experience" },
      { value: "99.6%", label: "Satisfaction Rate" },
      { value: "3D", label: "Diagnostic Scans" }
    ],
    aboutTitle: "On-Site Diagnostic Energy Validation",
    aboutText: "A physical Vastu site audit is the gold standard for high-value properties, factories, and new land purchases. Our master Acharyas inspect the premises equipped with professional tools. We test soil energy fields, identify hidden geopathic stress zones, and measure physical land elevations, providing direct on-site guidance followed by a detailed digital report.",
    analyzeItems: [
      { title: "Geopathic Stress", desc: "Locating underground magnetic stress lines using scanning devices.", icon: Compass },
      { title: "Soil Dowsing", desc: "Evaluating land energy field vitality and organic compatibility.", icon: Home },
      { title: "Land Elevation", desc: "Checking plot slope dynamics and boundary wall heights.", icon: TrendingUp },
      { title: "Environment Factors", desc: "Scanning surrounding roads, tall structures, and water bodies.", icon: MapPin }
    ],
    benefits: [
      { title: "Deep Energy Diagnostics", desc: "Detect geopathic lines that cannot be identified from paper plans.", icon: ShieldCheck },
      { title: "Direct On-site Guidance", desc: "Ask questions face-to-face and get immediate placement suggestions.", icon: UserRound },
      { title: "Soil Energy Verification", desc: "Ensure new plots are fertile and energetically compatible for construction.", icon: Sparkles },
      { title: "Comprehensive Blueprint Layout", desc: "Get detailed remedy blueprints mapped directly onto your plan.", icon: FileText }
    ],
    requiredInfo: [
      { title: "Premises Map Plan", desc: "Architectural floor plans or cadastral land layout maps." },
      { title: "Site Address Details", desc: "Exact coordinates to verify Google satellite surrounding views." },
      { title: "Owner Profile", desc: "Key concerns and birth details of the main property developer." }
    ],
    whyPoints: [
      { title: "Advanced Scanning Equipment", desc: "We use professional scanners and dowsing instruments on-site." },
      { title: "Comprehensive Diagnostics", desc: "Covers geopathic stress, soil quality, and elevation gradients." },
      { title: "Tailored Post-Visit Support", desc: "Dedicated support team to guide you through remedy implementation." }
    ],
    successStories: [
      {
        title: "Warehouse neutralized geopathic magnetic stress lines",
        beforeImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400",
        afterImage: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&q=80&w=400",
        result: "Worker health complaints stopped, operational output stabilized"
      },
      {
        title: "New villa site slope graded to Northeast corner",
        beforeImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=400",
        afterImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400",
        result: "Plot construction design approved smoothly without any delays"
      }
    ],
    testimonials: [
      { name: "Vikram Malhotra", role: "Warehouse Developer, Bangalore", text: "Raghavendra Ji visited our site and detected a geopathic line. Neutralizing it brought an immediate calm to the site.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150", rating: 5 }
    ],
    faqs: [
      { question: "What is geopathic stress and how does it affect properties?", answer: "Geopathic stress is the natural radiation from underground water channels or fault zones. Living over these lines can cause sleep issues, health problems, and negative vibes." }
    ]
  }
};

const otherServicesList = [
  { name: "Residential Vastu", slug: "residential-vastu", icon: Home, desc: "For Homes & Villas", price: "150" },
  { name: "Commercial Vastu", slug: "commercial-vastu", icon: Briefcase, desc: "For Offices & Businesses", price: "300" },
  { name: "Industrial Vastu", slug: "industrial-vastu", icon: Factory, desc: "For Factories & Industries", price: "600" },
  { name: "Online Consultation", slug: "online-consultation", icon: Monitor, desc: "Consult from Anywhere", price: "199" },
  { name: "Offline Site Vastu Audit", slug: "offline-consultation", icon: UserRound, desc: "Expert Visit to Your Place", price: "499" }
];

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ServiceDetailsPage({ params }: Props) {
  const { slug } = use(params);
  const service = servicesDetails[slug as keyof typeof servicesDetails];

  if (!service) {
    notFound();
  }

  // Local state for interactive UI
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeStory, setActiveStory] = useState(0);

  const Icon = service.icon;
  const otherServices = otherServicesList.filter((s) => s.slug !== slug);

  // Dynamic about features and texts for the screenshot layout
  const aboutInfo = {
    "residential-vastu": {
      title: "About Residential Vastu",
      text: "Residential Vastu is the ancient science of architecture that helps in creating positive, balanced and energetic living spaces. We analyze your home as per Vastu principles and provide practical solutions to improve health, relationships, wealth and overall well-being.",
      features: [
        { title: "Positive Energy Flow", icon: Sparkles },
        { title: "Better Health & Wellness", icon: Heart },
        { title: "Financial Prosperity", icon: Building },
        { title: "Peace & Happiness", icon: Smile }
      ]
    },
    "commercial-vastu": {
      title: "About Commercial Vastu",
      text: "Commercial Vastu is the ancient science of architecture that helps in creating positive, balanced and energetic workspaces. We analyze your office layout as per Vastu principles and provide practical solutions to improve cash flow, client retention, staff productivity and overall business growth.",
      features: [
        { title: "Cash Flow Boost", icon: TrendingUp },
        { title: "Staff Sync & Productivity", icon: Users },
        { title: "Corporate Stability", icon: Award },
        { title: "Strategic Growth", icon: Briefcase }
      ]
    },
    "industrial-vastu": {
      title: "About Industrial Vastu",
      text: "Industrial Vastu is the ancient science of architecture that helps in creating positive, balanced and energetic factory spaces. We analyze your layout as per Vastu principles and provide practical solutions to improve machine uptime, worker safety, production yield and overall operational growth.",
      features: [
        { title: "Machinery Uptime", icon: Factory },
        { title: "Worker Safety Grid", icon: ShieldCheck },
        { title: "Consistent Yield", icon: Zap },
        { title: "Optimal Storage", icon: Home }
      ]
    },
    "online-consultation": {
      title: "About Online Vastu Consultation",
      text: "Online Vastu Consultation is the modern approach to the ancient science of architecture. We analyze your layout plan digitally as per Vastu principles and provide practical solutions to improve health, relationships, wealth and overall peace of mind.",
      features: [
        { title: "Remote Convenience", icon: Monitor },
        { title: "16-Zone Digital Map", icon: FileText },
        { title: "Live Video Advice", icon: Calendar },
        { title: "Fast Action Plan", icon: Clock }
      ]
    },
    "offline-consultation": {
      title: "About Offline Site Vastu Audit",
      text: "Physical Site Vastu Audit is the most comprehensive diagnostic of the ancient science of architecture. We scan your land dowsing grid and soil energy fields physically as per Vastu principles to identify geopathic stress and unlock absolute growth.",
      features: [
        { title: "In-Person Scan", icon: UserRound },
        { title: "Geopathic Detection", icon: Compass },
        { title: "Soil Energy Test", icon: Sparkles },
        { title: "Direct Remediation", icon: ShieldCheck }
      ]
    }
  };

  // Dynamic benefits info mapping for the screenshot layout
  const benefitsInfo = {
    "residential-vastu": {
      title: "Benefits of Residential Vastu",
      cards: [
        { title: "Improved Health & Well-being", icon: Heart },
        { title: "Better Relationships & Harmony", icon: Users },
        { title: "Financial Growth & Stability", icon: TrendingUp },
        { title: "Mental Peace & Happiness", icon: Smile },
        { title: "Positive Energy In Every Corner", icon: Sparkles },
        { title: "Better Sleep & Relaxation", icon: Moon }
      ]
    },
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
    },
    "industrial-vastu": {
      title: "Benefits of Industrial Vastu",
      cards: [
        { title: "Minimal Machine Failures", icon: Zap },
        { title: "High Output Efficiency", icon: Factory },
        { title: "Reduced Work Accidents", icon: ShieldCheck },
        { title: "Stable Labor Dynamics", icon: Users },
        { title: "Smooth Supply Logistics", icon: Compass },
        { title: "Regulatory Clearness", icon: FileText }
      ]
    },
    "online-consultation": {
      title: "Benefits of Online Consultation",
      cards: [
        { title: "Fast Virtual Turnaround", icon: Clock },
        { title: "Accurate Digital Scans", icon: FileText },
        { title: "No Geographical Limits", icon: MapPin },
        { title: "Interactive Video Walk", icon: Monitor },
        { title: "Cost-Effective Pricing", icon: Award },
        { title: "Continuous Chat Support", icon: HelpCircle }
      ]
    },
    "offline-consultation": {
      title: "Benefits of Offline Audit",
      cards: [
        { title: "Soil Field Dowsing Scan", icon: Sparkles },
        { title: "Geopathic Line Neutralizing", icon: Compass },
        { title: "Site Elevation Testing", icon: TrendingUp },
        { title: "Direct Master Advice", icon: UserRound },
        { title: "Comprehensive CAD Reports", icon: FileText },
        { title: "Long-term Security", icon: ShieldCheck }
      ]
    }
  };

  // Animation constants
  const transition = { duration: 0.8, ease: [0.25, 1, 0.5, 1] as const };

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
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#E28A3E]">
                <Compass className="w-4 h-4 text-black" />
                {service.category} Vastu
              </span>
              
              {/* Main Heading */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-navy leading-tight max-w-[480px]">
                {service.title.split(" ").map((word, i) => {
                  if (word.toLowerCase() === "vastu") {
                    return <span key={i} className="text-[#E28A3E]">{word} </span>;
                  }
                  return word + " ";
                })}
              </h1>
              
              {/* Description */}
              <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed max-w-xl">
                {service.heroDescription}
              </p>

              {/* Actions CTAs */}
              <div className="flex flex-wrap gap-4 mt-1">
                <Link
                  href="#book-consultation"
                  className="px-6 py-3.5 rounded-xl bg-[#E28A3E] hover:bg-[#C67830] text-white text-xs font-bold shadow-premium hover:shadow-premium-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                >
                  <span>Book Consultation</span>
                  <Calendar className="w-4 h-4" />
                </Link>
                <Link
                  href="#book-consultation"
                  className="px-6 py-3.5 rounded-xl bg-white border border-[#EDE3D0] hover:border-[#E28A3E] hover:bg-[#FEF3E4]/35 text-navy text-xs font-bold shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
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
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-navy">
                {aboutInfo[slug as keyof typeof aboutInfo]?.title}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
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
                      <span className="text-[10px] sm:text-xs font-semibold text-navy leading-tight">
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
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mt-2">
              What We Analyze
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-3 font-light max-w-lg mx-auto">
              Our experts scan the active nodes and zones of your space to pinpoint environmental blocks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.analyzeItems.map((item, index) => {
              const ItemIcon = item.icon || Compass;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...transition, delay: index * 0.05 }}
                  className="bg-white border border-[#EDE3D0]/60 rounded-2xl p-6 text-left shadow-sm hover:shadow-premium hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4"
                >
                  <ItemIcon className="w-7 h-7 text-black flex-shrink-0 mb-3" strokeWidth={1.5} />
                  <div>
                    <h3 className="font-serif text-sm font-bold text-navy">{item.title}</h3>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed mt-2">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 5. BENEFITS SECTION */}
        <section className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-navy">
              {benefitsInfo[slug as keyof typeof benefitsInfo]?.title}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {benefitsInfo[slug as keyof typeof benefitsInfo]?.cards.map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...transition, delay: index * 0.05 }}
                  className="bg-white border border-[#EDE3D0]/60 rounded-3xl p-5 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center min-h-[140px] text-center group"
                >
                  <BenefitIcon className="w-7 h-7 text-black mb-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                  <h3 className="font-serif text-xs sm:text-sm font-bold text-navy mt-3 leading-snug">
                    {benefit.title}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 6. CONSULTATION PROCESS */}
        <section className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-navy">
              Our Consultation Process
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-6 md:gap-2 max-w-5xl mx-auto">
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
                    className="flex flex-col items-center text-center flex-1 min-w-0"
                  >
                    {/* Raw Black and White Icon */}
                    <StepIcon className="w-8 h-8 text-black mb-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                    
                    {/* Content */}
                    <h4 className="text-xs sm:text-sm font-bold text-navy leading-snug">{step.title}</h4>
                    <p className="text-[10px] sm:text-xs text-muted-foreground font-light mt-1.5 leading-relaxed max-w-[160px] mx-auto">
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
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy mt-2.5">
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
                className="bg-white border border-[#EDE3D0]/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-premium transition-all duration-300 flex flex-col group"
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
                    <h3 className="font-serif text-sm sm:text-base font-bold text-navy leading-snug group-hover:text-[#E28A3E] transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-muted-foreground font-light leading-relaxed">
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
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-4 text-left">
            {service.faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-[#EDE3D0]/60 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-navy font-serif text-sm sm:text-base font-bold text-left cursor-pointer hover:text-[#E28A3E] transition-colors"
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
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed border-t border-dashed border-[#EDE3D0]/40">
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

                <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed max-w-md mx-auto">
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
                <div className="flex items-center gap-3 mt-1 justify-center">
                  <Link
                    href="#book-consultation"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gold-gradient hover:opacity-95 text-white text-xs font-bold shadow-premium hover:shadow-premium-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Inquire Now</span>
                    <Calendar className="w-4 h-4" />
                  </Link>
                  <div className="text-white text-left">
                    <span className="text-[9px] uppercase text-white/60 block leading-none">Consultation Fee</span>
                    <span className="text-sm font-extrabold">₹{otherServicesList.find(s => s.slug === slug)?.price || "150"}</span>
                  </div>
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
