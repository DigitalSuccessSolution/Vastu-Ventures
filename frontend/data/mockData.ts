export interface VastuService {
  id: string;
  title: string;
  slug: string;
  category: 'residential' | 'commercial' | 'industrial';
  icon: string;
  description: string;
  longDescription: string;
  price: number;
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  offlineAvailable: boolean;
  onlineAvailable: boolean;
  image: string;
}

export interface VastuCourse {
  id: string;
  title: string;
  slug: string;
  rating: number;
  reviewsCount: number;
  category: string;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice: number;
  duration: string;
  lessonsCount: number;
  instructor: {
    name: string;
    role: string;
    bio: string;
    image: string;
  };
  image: string;
  curriculum: {
    sectionTitle: string;
    lessons: { title: string; duration: string; isPreview: boolean }[];
  }[];
  benefits: string[];
  requirements: string[];
  certificateImageUrl?: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  shortDescription: string;
  content: string;
  image: string;
  readTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const SERVICES: VastuService[] = [
  {
    id: 's1',
    title: 'Residential Vastu Consultation',
    slug: 'residential-vastu',
    category: 'residential',
    icon: 'Home',
    description: 'Harmonize your living space, bedrooms, kitchen, and entrance to attract health, wealth, and peaceful relationships.',
    longDescription: 'Our Residential Vastu Consultation is a deep dive into the energetic matrix of your home. By mapping the eight primary directions and five core elements (Pancha Bhootas), we ensure that your living spaces promote longevity, peace, and abundance. From finding the perfect orientation of the master bedroom to correcting kitchen placements, this consultation offers practical, non-demolition remedies.',
    price: 150,
    benefits: [
      'Enhanced family harmony and reduced stress levels',
      'Better sleep patterns and physical health revitalization',
      'Clearing of obstacles blocking financial progress',
      'Harmonizing entry points for continuous positive energy flow'
    ],
    process: [
      { step: 1, title: 'Layout Map Submission', description: 'Upload your home floor plan with an accurate North-point reading.' },
      { step: 2, title: 'In-Depth Analysis', description: 'Our Vastu experts analyze the elements, zones, and entrance configurations.' },
      { step: 3, title: '1-on-1 Consultation Call', description: 'A 60-minute video session to walk you through our findings and remedies.' },
      { step: 4, title: 'Remedies Report', description: 'Receive a personalized, easy-to-implement correction blueprint.' }
    ],
    offlineAvailable: true,
    onlineAvailable: true,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's2',
    title: 'Commercial Office Vastu',
    slug: 'commercial-vastu',
    category: 'commercial',
    icon: 'Briefcase',
    description: 'Boost business growth, team productivity, and cash flow with optimal seating arrangements and entrance configurations.',
    longDescription: 'A balanced office environment yields higher productivity, enhanced creativity, and steady financial turnover. This service aligns the owner’s cabin, staff workspace, accounts section, and reception with the precise cardinal directions. Suitable for tech startups, corporate offices, and consulting firms seeking to maximize their enterprise success.',
    price: 300,
    benefits: [
      'Accelerated business growth and client acquisition',
      'Minimized team conflicts and improved operational efficiency',
      'Optimal placement of executive cabins for sound decision-making',
      'Stronger cash reserves and regular investment returns'
    ],
    process: [
      { step: 1, title: 'Office Layout Map Share', description: 'Provide the official floor plan along with employee headcount details.' },
      { step: 2, title: 'Corporate Astrology & Direction Alignment', description: 'Analyze owner’s chart alongside physical office directions.' },
      { step: 3, title: 'Site Inspection (or Video Walkthrough)', description: 'Detailed review of desks, storage, server rooms, and pantries.' },
      { step: 4, title: 'Strategic Action Plan', description: 'Receive colors, directions, and elemental placements for maximum ROI.' }
    ],
    offlineAvailable: true,
    onlineAvailable: true,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's3',
    title: 'Industrial & Factory Vastu',
    slug: 'industrial-vastu',
    category: 'industrial',
    icon: 'Factory',
    description: 'Ensure smooth manufacturing processes, safety for workers, and avoid frequent machinery breakdowns.',
    longDescription: 'Factories involve heavy machinery, heat processes, raw material stock, and waste discharge, making them highly susceptible to elemental imbalances. Industrial Vastu aligns fire elements (boiler, furnace) with the Southeast, water elements (chilled plant, drainage) with the Northeast, and heavy storage in the Southwest to ensure hazard-free, high-yield operations.',
    price: 600,
    benefits: [
      'Dramatic reduction in machine downtime and breakdowns',
      'Enhanced worker safety and lower industrial accident rates',
      'Consistent product quality and steady supply chain output',
      'Optimal raw material intake and finished goods dispatch flow'
    ],
    process: [
      { step: 1, title: 'Industrial Site Survey', description: 'Submission of land layouts, machinery blueprints, and utilities map.' },
      { step: 2, title: 'Energy Scan & Soil Testing', description: 'Evaluate slope of land, soil quality, and neighboring environment.' },
      { step: 3, title: 'Machinery Placement Mapping', description: 'Align ovens, boilers, assembly lines, and staff quarters.' },
      { step: 4, title: 'Execution & Energizing', description: 'Deliver precise positioning recommendations and energy balancing remedies.' }
    ],
    offlineAvailable: true,
    onlineAvailable: false,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
  }
];

export const COURSES: VastuCourse[] = [];

export const BLOGS: BlogArticle[] = [];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Vikram & Shalini Mehra',
    role: 'Homeowners, Bangalore',
    text: 'Our new apartment felt chaotic and my wife suffered from sleepless nights. After Acharya ji suggested simple copper wire boundary placement and kitchen color adjustments, the atmosphere transformed. Peace has returned to our home.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 't2',
    name: 'Rajesh Singhal',
    role: 'CEO, Singhal Textiles Pvt. Ltd.',
    text: 'Machinery breakdowns and labor union strikes were draining our profits. The Industrial Vastu consultation pinpointed that our furnace was in the water quadrant. Shifting the boilers and installing energy grids saved us millions in downtime.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 't3',
    name: 'Priyah Patel',
    role: 'Architect & Consultant, Mumbai',
    text: 'The Advanced Professional Course gave me a complete scientific backing for things I was curious about. Now I integrate Vastu directly into my floor plan designs for premium clients, adding immense value to my practice.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'f1',
    question: 'Does Vastu correction require breaking down walls or remodeling?',
    answer: 'Absolutely not. Modern Vastu correction (remedial science) uses elemental metals (like brass, copper, lead), energy-shifting helixes, color therapy, and gemstone layout shifts to neutralize defects. Over 95% of Vastu defects can be resolved without structural demolition.',
    category: 'Consultations'
  },
  {
    id: 'f2',
    question: 'How long does it take to see positive changes after implementation?',
    answer: 'Energy adjustments begin immediately, but their tangible effects on health, mind, and business usually stabilize and manifest clearly within 21 to 90 days of complete remedy execution.',
    category: 'Consultations'
  },
  {
    id: 'f3',
    question: 'Can I practice professionally after completing the courses?',
    answer: 'Yes! The Foundation course gives you personal auditing capabilities, while our Advanced Professional course provides the certification, client blueprints, marketing guidance, and professional tools required to establish a full-fledged consulting practice.',
    category: 'Education'
  },
  {
    id: 'f4',
    question: 'Is the certificate globally recognized?',
    answer: 'Vastu Ventures certificates are recognized by leading traditional Vedic research boards and architecture forums. It showcases your rigorous coursework, live training hours, and technical understanding of layout metrics.',
    category: 'Education'
  }
];

export const TIME_SLOTS = [
  '09:00 AM - 10:00 AM',
  '10:30 AM - 11:30 AM',
  '12:00 PM - 01:00 PM',
  '02:30 PM - 03:30 PM',
  '04:00 PM - 05:00 PM',
  '05:30 PM - 06:30 PM'
];
