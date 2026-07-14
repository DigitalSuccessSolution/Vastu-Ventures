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

export const COURSES: VastuCourse[] = [
  {
    id: 'c1',
    title: 'Vastu Shastra Foundation Certification',
    slug: 'vastu-shastra-foundation',
    rating: 4.8,
    reviewsCount: 124,
    category: 'Foundational',
    shortDescription: 'Master the fundamental principles of directions, five elements (Pancha Bhootas), and residential planning.',
    description: `Become a certified Vastu consultant with this comprehensive foundational course. This module covers traditional Vastu history, energy dynamics, mapping directions using a modern compass, and basic residential evaluation methodologies. By the end of this course, you will be able to analyze your own home and provide basic Vastu guidance to friends and family.

Key Topics Covered in this Foundational Program:
1. Origin & Vedic Foundations of Vastu Purusha Mandala
2. Mapping the 8 Directions & 16 Angular Zones
3. Understanding the Pancha Bhootas (5 Elements) of Architecture
4. Main Door Placement & Remedial Science
5. Kitchen, Bedroom & Bathroom Orientation Formulas`,
    price: 199,
    originalPrice: 299,
    duration: '12 Hours (Self-paced)',
    lessonsCount: 18,
    instructor: {
      name: 'Acharya Raghavendra',
      role: 'Lead Vastu Acharya & Vedic Scholar',
      bio: 'With over 22 years of practice, Acharya Raghavendra has consulted for 1,500+ homes and businesses worldwide and is dedicated to making Vedic architecture accessible to the modern world.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
    curriculum: [
      {
        sectionTitle: 'Section 1: Origin & Vedic Foundations',
        lessons: [
          { title: 'Introduction to Vastu Purusha Mandala', duration: '45 mins', isPreview: true },
          { title: 'The Story of Vastu Purusha', duration: '30 mins', isPreview: false },
          { title: 'Understanding the 8 Primary Directions', duration: '55 mins', isPreview: false }
        ]
      },
      {
        sectionTitle: 'Section 2: The Pancha Bhootas (5 Elements)',
        lessons: [
          { title: 'Earth (Prithvi) & Water (Jal) Alignment', duration: '50 mins', isPreview: true },
          { title: 'Fire (Agni) & Space (Akash) Zones', duration: '45 mins', isPreview: false },
          { title: 'Air (Vayu) Zone & Elemental Interplay', duration: '60 mins', isPreview: false }
        ]
      },
      {
        sectionTitle: 'Section 3: Practical Residential Audit',
        lessons: [
          { title: 'How to use a compass for exact degree checks', duration: '40 mins', isPreview: false },
          { title: 'Analyzing main entrance positions', duration: '60 mins', isPreview: false },
          { title: 'Kitchen & Bedroom evaluation worksheet', duration: '50 mins', isPreview: false }
        ]
      }
    ],
    benefits: [
      'Lifetime access to 18 High-definition video lectures',
      'Downloadable Vastu auditing checklist templates',
      'Verifiable digital Certificate of Completion',
      'Access to private student Discord community'
    ],
    requirements: [
      'No prior knowledge of astrology or Vastu required.',
      'A notebook and a physical or smartphone compass.'
    ],
    certificateImageUrl: 'https://images.unsplash.com/photo-1589330694653-ded6df53f7eb?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'c2',
    title: 'Advanced Professional Vastu Consultant Training',
    slug: 'advanced-professional-vastu',
    rating: 4.9,
    reviewsCount: 86,
    category: 'Professional',
    shortDescription: 'Deep dive into commercial layouts, industrial spaces, energy mapping, and non-demolition remedial treatments.',
    description: `Transform your passion into a lucrative career. This advanced certification covers macro-Vastu analysis, soil health tests, industrial zoning, geo-pathic stress testing, and remedial corrections using metals, gemstones, and elemental pyramids. Ideal for interior designers, architects, and aspiring professional consultants.

Key Topics Covered in this Professional Program:
1. Soil Bio-resonance & Land Selection Formulas
2. Commercial Office Layout Balancing & Strategic Desk Placements
3. Industrial Factory Zoning for Furnaces, Boilers & Heavy Machine Assembly Lines
4. Advanced Energy Mapping & Remedial Science (Non-demolition corrections)
5. Practical Site-Audit blueprints & Client Acquisition methods`,
    price: 499,
    originalPrice: 699,
    duration: '35 Hours (Guided + Live)',
    lessonsCount: 42,
    instructor: {
      name: 'Acharya Raghavendra',
      role: 'Lead Vastu Acharya & Vedic Scholar',
      bio: 'With over 22 years of practice, Acharya Raghavendra has consulted for 1,500+ homes and businesses worldwide and is dedicated to making Vedic architecture accessible to the modern world.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
    curriculum: [
      {
        sectionTitle: 'Section 1: Soil, Slopes & Land Selection',
        lessons: [
          { title: 'Evaluating Earth Energy & Bio-resonance', duration: '60 mins', isPreview: true },
          { title: 'Identifying negative energy channels (Geo-pathic stress)', duration: '75 mins', isPreview: false },
          { title: 'Plot shape corrections & extensions', duration: '90 mins', isPreview: false }
        ]
      },
      {
        sectionTitle: 'Section 2: Commercial & High-Value Sites',
        lessons: [
          { title: 'Corporate office structural balancing', duration: '90 mins', isPreview: false },
          { title: 'Malls, Hotels, and Retail Vastu formulas', duration: '80 mins', isPreview: false },
          { title: 'Industrial zoning for furnaces, boilers, storage', duration: '120 mins', isPreview: false }
        ]
      },
      {
        sectionTitle: 'Section 3: Professional Remedial Science',
        lessons: [
          { title: 'Introduction to pyramids, helixes, and metal wire corrections', duration: '75 mins', isPreview: true },
          { title: 'Color therapy & gemstone Vastu corrections', duration: '90 mins', isPreview: false },
          { title: 'Case Study: Turning a failing business into a profit-making venture', duration: '110 mins', isPreview: false }
        ]
      }
    ],
    benefits: [
      '35 Hours of comprehensive expert-led sessions',
      '4 Live Q&A and site-audit sessions with Acharya Raghavendra',
      'Physical consultant kit shipped directly to your home (remotes, rods, metal items)',
      'Job and consulting client acquisition guidance'
    ],
    requirements: [
      'Completion of Vastu Shastra Foundation course or equivalent base understanding.',
      'Familiarity with basic building terminology.'
    ],
    certificateImageUrl: 'https://images.unsplash.com/photo-1589330694653-ded6df53f7eb?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'c3',
    title: 'Commercial Vastu & Office Layout Design',
    slug: 'commercial-vastu-office-layout',
    rating: 4.8,
    reviewsCount: 98,
    category: 'Professional',
    shortDescription: 'Learn spatial balancing for commercial complexes, high-rise office cubicles, and shopping retail environments.',
    description: 'Master Vastu for commercial establishments. This course covers office layouts, cash counters, placement of executives, entrance analysis, and energy alignment specifically tailored to boost business productivity, sales, and employee retention.',
    price: 299,
    originalPrice: 499,
    duration: '18 Hours (Self-paced)',
    lessonsCount: 24,
    instructor: {
      name: 'Acharya Raghavendra',
      role: 'Lead Vastu Acharya & Vedic Scholar',
      bio: 'With over 22 years of practice, Acharya Raghavendra has consulted for 1,500+ homes and businesses worldwide.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    curriculum: [
      {
        sectionTitle: 'Section 1: Commercial Entrance & Reception',
        lessons: [
          { title: 'Commercial Entrance Directions', duration: '40 mins', isPreview: true },
          { title: 'Reception Desk Orientation', duration: '35 mins', isPreview: false }
        ]
      }
    ],
    benefits: [
      'Understand commercial layout guidelines',
      'Downloadable commercial auditing checksheets',
      'Digital certificate of accomplishment'
    ],
    requirements: [
      'Basic knowledge of residential Vastu directions.'
    ],
    certificateImageUrl: 'https://images.unsplash.com/photo-1589330694653-ded6df53f7eb?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'c4',
    title: 'Industrial Vastu & Factory Energy Remedial Course',
    slug: 'industrial-vastu-factory-remedial',
    rating: 4.9,
    reviewsCount: 64,
    category: 'Professional',
    shortDescription: 'Learn machine zoning, furnace placements, and heavy metal remedial corrections for modern factories.',
    description: 'A professional training on Vastu for manufacturing plants. Align industrial heat generators, raw material storage, heavy machinery, and office blocks. Implement elemental corrections using metals, helixes, and pyramids.',
    price: 399,
    originalPrice: 599,
    duration: '22 Hours (Guided)',
    lessonsCount: 30,
    instructor: {
      name: 'Acharya Raghavendra',
      role: 'Lead Vastu Acharya & Vedic Scholar',
      bio: 'With over 22 years of practice, Acharya Raghavendra has consulted for 1,500+ homes and businesses worldwide.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    curriculum: [
      {
        sectionTitle: 'Section 1: Industrial Layout & Heat Zones',
        lessons: [
          { title: 'Placing Furnaces and Boilers in SE', duration: '50 mins', isPreview: true },
          { title: 'Raw Material southwest zones alignment', duration: '45 mins', isPreview: false }
        ]
      }
    ],
    benefits: [
      'Optimize factory zones for safe operations',
      'Lifetime factory energy blueprint sheets',
      'Certified Industrial Vastu Consultant badge'
    ],
    requirements: [
      'Understanding of Advanced Vastu tools.'
    ],
    certificateImageUrl: 'https://images.unsplash.com/photo-1589330694653-ded6df53f7eb?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'c5',
    title: 'Vastu Remedial Science & Pyramids Masterclass',
    slug: 'vastu-remedial-science-pyramids',
    rating: 4.7,
    reviewsCount: 112,
    category: 'Foundational',
    shortDescription: 'Correct spatial imbalances without demolition using brass helixes, copper wires, and pyramid systems.',
    description: 'Learn modern non-demolition remedies. Balance negative entrances, toilets, and structural cuts using metals, colors, crystals, and spatial pyramids.',
    price: 149,
    originalPrice: 249,
    duration: '10 Hours (Self-paced)',
    lessonsCount: 14,
    instructor: {
      name: 'Acharya Raghavendra',
      role: 'Lead Vastu Acharya & Vedic Scholar',
      bio: 'With over 22 years of practice, Acharya Raghavendra has consulted for 1,500+ homes and businesses worldwide.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=800',
    curriculum: [
      {
        sectionTitle: 'Section 1: Basics of Non-Demolition Remedies',
        lessons: [
          { title: 'The Power of Pyramids and Materials', duration: '35 mins', isPreview: true },
          { title: 'Color Therapy corrections', duration: '40 mins', isPreview: false }
        ]
      }
    ],
    benefits: [
      'Master non-demolition correction science',
      'Practical demonstration worksheets',
      'Remedial Specialist certificate'
    ],
    requirements: [
      'No prior knowledge required.'
    ],
    certificateImageUrl: 'https://images.unsplash.com/photo-1589330694653-ded6df53f7eb?auto=format&fit=crop&q=80&w=500'
  }
];

export const BLOGS: BlogArticle[] = [
  {
    id: 'b1',
    title: 'Top 5 Main Entrance Vastu Mistakes You Must Fix Right Away',
    slug: 'top-5-main-entrance-vastu-mistakes',
    date: 'July 10, 2026',
    author: 'Acharya Raghavendra',
    category: 'Residential Vastu',
    shortDescription: 'The entrance (Maha Dwaar) determines what energies flow into your home. Learn how to identify and resolve entrance blocks.',
    content: 'In traditional Vastu, the main entrance is considered the mouth of the house. If the entrance is cluttered, poorly lit, or falls into a negative zone, it blocks wealth and harmony from entering. In this article, we cover why you must keep your main door larger than other doors, avoid shadows over the entrance, avoid mirrors reflecting the entrance, clean rusty locks, and place brass or copper elements to shield negative energies.',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min read'
  },
  {
    id: 'b2',
    title: 'How to Place Boilers and Furnaces in Commercial Offices',
    slug: 'how-to-place-boilers-furnaces-vastu',
    date: 'June 28, 2026',
    author: 'Vastu Specialist Team',
    category: 'Commercial & Industrial',
    shortDescription: 'Improper fire elements cause friction and heavy expenses. Master the Southeast zone placement rules.',
    content: 'Fire (Agni) represents power, drive, and wealth. Placing boilers, generators, computer servers, or heavy electrical panels in the wrong quadrant (like Northeast) causes direct cash-flow losses, legal issues, or accidental damage. Here we discuss structural mappings for corporate workspaces, locating electrical hubs in the Southeast, and simple remedies if your server room is permanently stuck in the North.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
    readTime: '8 min read'
  },
  {
    id: 'b3',
    title: 'Understanding Pancha Bhootas: The Five Elements of Architecture',
    slug: 'understanding-pancha-bhoot-architecture',
    date: 'May 15, 2026',
    author: 'Acharya Raghavendra',
    category: 'Vastu Philosophy',
    shortDescription: 'Discover the profound connection between nature’s elements—Earth, Water, Fire, Air, and Space—and modern structural design.',
    content: 'Pancha Bhootas are the building blocks of existence. When we construct a building, we partition space, which changes the local dynamics of Earth, Air, Water, and Fire. Learn how traditional Indian temple architecture and home builders harmonize these forces to create structures that stand for centuries while radiating positive vibrations.',
    image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=800',
    readTime: '6 min read'
  }
];

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
    answer: 'VastuVidya certificates are recognized by leading traditional Vedic research boards and architecture forums. It showcases your rigorous coursework, live training hours, and technical understanding of layout metrics.',
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
