// Portfolio v2.0.0 — Redesigned: 3D animated developer portfolio
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Smartphone,
  Database,
  Globe,
  Cloud,
  Cpu,
  Wrench,
  Rocket,
  Workflow,
  ChevronUp,
  ChevronDown,
  Send,
  Terminal,
  Sparkles,
  ExternalLink,
  GraduationCap,
  Award,
  X,
  Menu,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

// When running as Android APK (Capacitor), origin is capacitor://localhost — use live API for contact form
const API_BASE =
  typeof window !== "undefined" &&
  (window.location.protocol === "capacitor:" || window.location.protocol === "file:")
    ? "https://m-umar.vercel.app"
    : "";

const RESUME_URL = "/Muhammad-Umar-Resume.pdf";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const ROLES = [
  "Flutter Developer",
  "Mobile App Engineer",
  "Full-Stack Developer",
  "Firebase & AI Integrator",
];

const NAV_ITEMS = ["about", "skills", "experience", "projects", "freelance", "certifications", "contact"];

const SOCIALS = [
  { href: "https://github.com/umarshad", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/in/muhammad-umar-802235286/", label: "LinkedIn", icon: Linkedin },
  { href: "mailto:umarshad0309@gmail.com", label: "Email", icon: Mail },
];

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const ABOUT_CARDS = [
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Cross-platform apps with Flutter — native performance, adaptive UI, and Play Store / App Store delivery.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Database,
    title: "Backend & APIs",
    description: "Firebase Auth, Firestore, Cloud Functions & FCM, plus RESTful APIs and real-time data sync.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Workflow,
    title: "AI & Automation",
    description: "ChatGPT & Groq APIs, Google ML-Kit, and end-to-end n8n workflow automation pipelines.",
    color: "from-emerald-500 to-teal-500",
  },
];

const FEATURED_PROJECTS = [
  {
    title: "LinkedIn Automation System",
    description: "End-to-end AI content pipeline: give it a niche and it finds trending topics, writes a professional LinkedIn post, generates a matching image, and publishes — fully hands-off.",
    technologies: ["n8n", "Groq API", "Pollinations AI", "LinkedIn API", "Google Sheets"],
    features: [
      "Automated pipeline turns a single niche input into a published LinkedIn post with zero manual work",
      "AI topic discovery surfaces trending subjects, then drafts a professional post via the Groq API",
      "Pollinations AI generates a context-aware image for every post, attached automatically at publish time",
      "Direct publishing to LinkedIn through the LinkedIn API",
      "Google Sheets logging layer records every post, topic, and image prompt for review and tracking",
    ],
    url: "https://www.linkedin.com/in/muhammad-umar-802235286/",
    color: "from-cyan-500 to-blue-500",
    status: "Automation",
    statusColor: "blue",
  },
  {
    title: "My Invoice",
    description: "Comprehensive invoice management application with PDF generation, Stripe payments, and AI-powered features for seamless financial tracking.",
    technologies: ["Flutter", "Firebase", "Stripe", "ChatGPT API", "Push Notifications", "Cloud Functions"],
    features: [
      "Advanced Firebase integration and real-time database management",
      "Stripe payment processing with secure transaction handling",
      "PDF generation and email automation using SMTP",
      "AI-powered features with ChatGPT API integration",
      "Push notifications for payment reminders and invoice updates",
      "Cloud Functions for automated backend processing and data management",
      "HTML/CSS email templates for professional invoice delivery",
      "Invoice preview functionality with responsive design",
    ],
    url: "https://play.google.com/store/apps/details?id=com.my_invoice.app",
    color: "from-blue-500 to-cyan-500",
    status: "Currently Working On",
    statusColor: "green",
  },
  {
    title: "My Madina",
    description: "Navigation platform for pilgrims to locate prayer areas, wudu facilities, and amenities with bilingual support and interactive mapping.",
    technologies: ["React", "TypeScript", "PostgreSQL", "Supabase", "Express.js", "Tailwind CSS"],
    features: [
      "Bilingual support (English/Arabic) with context-based language switching",
      "Interactive map with coordinate-based location system",
      "Admin panel for comprehensive content management",
      "Responsive design with mobile-first approach",
      "Dark/Light theme support with seamless switching",
      "Progressive Web App capabilities for offline access",
    ],
    url: "https://mymadina.site",
    color: "from-green-500 to-emerald-500",
    status: "Live",
    statusColor: "green",
  },
  {
    title: "Everpure Organics",
    description: "Full-featured ecommerce platform for organic health products with advanced cart management and WhatsApp business integration.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Digital Ocean", "Tailwind CSS"],
    features: [
      "Advanced product catalog with filtering and dynamic management",
      "Smart shopping cart with multiple pricing tiers and variants",
      "WhatsApp Business integration for customer support",
      "User authentication and comprehensive admin dashboard",
      "Dynamic content management system with real-time updates",
      "Performance optimized with SEO and responsive design",
    ],
    url: "https://everpureorganics.com",
    color: "from-green-500 to-emerald-500",
    status: "Live",
    statusColor: "green",
  },
  {
    title: "Al Tayyab Recovery",
    description: "Professional website landing page for recovery services with modern design and responsive layout.",
    technologies: ["JavaScript", "HTML", "CSS", "PHP", "Vercel"],
    features: [
      "Modern and professional landing page design",
      "Fully responsive layout for all devices",
      "Contact forms with PHP backend processing",
      "Fast loading and optimized performance",
      "SEO-friendly structure and content",
      "Clean and intuitive user interface",
    ],
    url: "https://altayyabrecovery.com",
    color: "from-orange-500 to-red-500",
    status: "Live",
    statusColor: "blue",
  },
  {
    title: "Clika App",
    description: "A comprehensive tower management application streamlining operations between tower companies and employees. Features a super admin interface for event creation and discount management, with integrated chat functionality.",
    technologies: ["AWS", "Stream Chat API", "React Native", "Node.js"],
    features: [
      "Multi-level management system for Tower Companies and Employees",
      "Super Admin dashboard for global event and discount management",
      "Real-time communication using Stream Chat APIs",
      "Scalable backend infrastructure hosting on AWS",
      "Role-based access control and user hierarchy",
    ],
    url: "#",
    color: "from-blue-600 to-indigo-600",
    status: "Completed",
    statusColor: "blue",
  },
  {
    title: "Realtors Lead",
    description: "A specialized lead generation platform for USA realtors featuring real-time payment processing and automated email systems.",
    technologies: ["React", "PayPal API", "SMTP", "Node.js"],
    features: [
      "Real-time payment processing using PayPal Client ID APIs",
      "Automated email notifications via SMTP integration",
      "Dynamic pricing and plan management system",
      "Lead capture and management dashboard",
      "Responsive design tailored for real estate professionals",
    ],
    url: "https://realtorslead.com",
    color: "from-blue-400 to-cyan-400",
    status: "Live",
    statusColor: "green",
  },
  {
    title: "Emotions Analyzer",
    description: "An advanced AI-powered mobile application that detects and analyzes human emotions in real-time using on-device machine learning and cloud-based processing.",
    technologies: ["Flutter", "Google ML Kit", "Python", "AWS Elastic Beanstalk"],
    features: [
      "Real-time facial emotion detection using Google ML Kit",
      "Cloud-based analysis using Python backend on AWS Elastic Beanstalk",
      "Instant visual feedback and emotion mapping",
      "High-performance camera integration",
      "Secure and scalable cloud architecture",
    ],
    url: "#",
    color: "from-purple-600 to-violet-600",
    status: "Completed",
    statusColor: "blue",
  },
];

const SKILLS = [
  {
    category: "Core Technologies",
    icon: Code2,
    skills: ["Flutter", "Dart", "Firebase", "REST APIs", "GitHub"],
    description: "Primary technologies I work with daily",
  },
  {
    category: "Mobile Development",
    icon: Smartphone,
    skills: ["Cross-platform", "Native Performance", "UI/UX Design", "State Management"],
    description: "Mobile app development expertise",
  },
  {
    category: "Backend & Cloud",
    icon: Cloud,
    skills: ["Firebase", "Cloud Functions", "Real-time DB", "Authentication"],
    description: "Backend and cloud services",
  },
  {
    category: "Tools & Frameworks",
    icon: Wrench,
    skills: ["VS Code", "Git", "Figma", "Postman", "Android Studio"],
    description: "Development tools and frameworks",
  },
  {
    category: "Database & Storage",
    icon: Database,
    skills: ["Firestore", "SQLite", "Shared Preferences", "Cloud Storage"],
    description: "Data management and storage",
  },
  {
    category: "Testing & Deployment",
    icon: Rocket,
    skills: ["Unit Testing", "Widget Testing", "Play Store", "App Store"],
    description: "Testing and deployment strategies",
  },
];

const EXPERIENCE = [
  {
    title: "Full Stack Developer",
    company: "Cygnus Ventures",
    period: "Oct 2025 - Dec 2025",
    location: "Remote",
    logo: "/cv.png",
    description: [
      "Developing My Madina - Navigation platform for pilgrims with bilingual support",
      "Building Everpure Organics - Full-featured ecommerce platform for organic products",
      "Implementing comprehensive admin panels and user interfaces",
      "Working with React, TypeScript, Node.js, and PostgreSQL",
      "Managing database architecture with Supabase and Neon Database",
      "Integrating WhatsApp Business API for customer support",
    ],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Supabase", "Express.js", "Tailwind CSS"],
  },
  {
    title: "Flutter Developer",
    company: "DM Worx LLC",
    period: "May 2025 - Current",
    location: "West Chester, PA, USA • Remote",
    logo: "https://dmworxllc.com/assets/DM%20Final-01%20(1)-BmXXw5Gw.png",
    description: [
      "Developing My Invoice App - comprehensive invoice management system",
      "Implementing real-time database management and API handling",
      "Working on payment integration and subscription management",
      "Creating advanced PDF generation and email automation features",
      "Integrating AI-powered features and push notifications",
    ],
    technologies: ["Flutter", "Firebase", "REST APIs", "State Management", "Payment Integration"],
  },
  {
    title: "Flutter Developer",
    company: "Solution Soul",
    period: "June 2024 - Jan 2025",
    location: "Lahore, Pakistan",
    logo: "https://bit.ly/4o4sl6E",
    description: [
      "Developed Restaurant App - comprehensive restaurant management application",
      "Created Whisky App - specialized whisky management and inventory system",
      "Built Chat App - real-time messaging application with encryption",
      "Developed Mind Script - mental health and mindfulness application",
      "Created Fit Max App - comprehensive fitness tracking application",
      "Built Education Learning App - online learning platform with course management",
      "Developed Weather App - weather forecasting application with real-time data",
    ],
    technologies: ["Flutter", "Firebase", "Payment Integration", "Real-time Database", "Restaurant Management"],
  },
  {
    title: "Flutter Developer Intern",
    company: "Orbilon Technology",
    period: "March 2024 - June 2024",
    location: "Lahore, Pakistan",
    logo: "https://orbilontech.gumlet.io/wp-content/uploads/2025/04/orbilon-technologies-color-text-200by65px.png?compress=true&quality=60&w=1024&dpr=1",
    description: [
      "Developed Search Screen with dynamic filters and integrated Search API",
      "Implemented responsive UI using Flutter framework",
      "Integrated RESTful APIs for efficient data exchange",
      "Implemented Firebase Authentication for secure user management",
      "Managed application state using Provider and Riverpod",
    ],
    technologies: ["Flutter", "Firebase", "REST APIs", "Provider", "Riverpod"],
  },
  {
    title: "Information Technology Intern",
    company: "Ibrahim Fibres Ltd",
    period: "Sept 2023 - Oct 2023",
    location: "Lahore, Pakistan",
    logo: "https://bit.ly/46XSUUp",
    description: [
      "Installed, configured, and maintained computer systems, peripherals, and software",
      "Troubleshooted hardware, software, and network issues",
      "Conducted routine maintenance tasks, including backups and updates",
      "Monitored system performance, security, and network infrastructure",
      "Provided technical support to employees, responding to help desk requests",
    ],
    technologies: ["IT Support", "System Maintenance", "Troubleshooting", "Network Management"],
  },
];

const COMPANY_PROJECTS = [
  {
    company: "Cygnus Ventures",
    logo: "/cv.png",
    period: "Oct 2025 - Dec 2025",
    location: "Remote",
    projects: [
      {
        title: "My Madina",
        description: [
          "Developed navigation platform for pilgrims to locate prayer areas and facilities",
          "Implemented bilingual support with context-based language switching (English/Arabic)",
          "Created interactive map with coordinate-based location system",
          "Built comprehensive admin panel for content management",
          "Integrated Progressive Web App capabilities for offline access",
        ],
        technologies: ["React", "TypeScript", "PostgreSQL", "Supabase", "Express.js", "Tailwind CSS"],
        status: "Completed",
      },
      {
        title: "Everpure Organics",
        description: [
          "Built full-featured ecommerce platform for organic health products",
          "Implemented advanced product catalog with filtering and dynamic management",
          "Developed smart shopping cart with multiple pricing tiers and variants",
          "Integrated WhatsApp Business API for seamless customer support",
          "Created comprehensive admin dashboard and user authentication system",
        ],
        technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Digital Ocean", "Tailwind CSS"],
        status: "Completed",
      },
    ],
  },
  {
    company: "DM Worx LLC",
    logo: "https://dmworxllc.com/assets/DM%20Final-01%20(1)-BmXXw5Gw.png",
    period: "May 2025 - Current",
    location: "West Chester, PA, USA • Remote",
    projects: [
      {
        title: "My Invoice App",
        description: [
          "Built a complete invoice management system",
          "Implemented automated billing and payment tracking",
          "Created PDF generation and email functionality",
          "Developed client management and reporting features",
        ],
        technologies: ["Flutter", "PDF Generation", "Email Integration", "Database Management"],
        status: "Currently Working",
      },
    ],
  },
  {
    company: "Solution Soul",
    logo: "https://bit.ly/4o4sl6E",
    period: "June 2024 - Jan 2025",
    location: "Lahore, Pakistan",
    projects: [
      {
        title: "Restaurant App",
        description: [
          "Developed a comprehensive restaurant management application",
          "Implemented real-time order tracking and management system",
          "Integrated payment processing and customer management features",
          "Created intuitive UI/UX for restaurant staff and customers",
        ],
        technologies: ["Flutter", "Firebase", "Payment Integration", "Real-time Database"],
        status: "Completed",
      },
      {
        title: "Whisky App",
        description: [
          "Developed a specialized whisky management application",
          "Implemented inventory tracking and management system",
          "Created user-friendly interface for whisky enthusiasts",
          "Integrated database management for whisky collections",
        ],
        technologies: ["Flutter", "Database Management", "Inventory System", "UI/UX Design"],
        status: "Completed",
      },
      {
        title: "Chat App",
        description: [
          "Built a real-time messaging application",
          "Implemented secure chat functionality with encryption",
          "Created group chat and private messaging features",
          "Integrated push notifications for real-time updates",
        ],
        technologies: ["Flutter", "Real-time Messaging", "Firebase", "Push Notifications"],
        status: "Completed",
      },
      {
        title: "Mind Script",
        description: [
          "Developed a mental health and mindfulness application",
          "Implemented meditation and relaxation features",
          "Created user progress tracking and analytics",
          "Integrated audio and visual meditation guides",
        ],
        technologies: ["Flutter", "Audio Integration", "Progress Tracking", "Mental Health"],
        status: "Completed",
      },
      {
        title: "Fit Max App",
        description: [
          "Built a comprehensive fitness tracking application",
          "Implemented workout planning and tracking features",
          "Created nutrition and diet management tools",
          "Integrated fitness analytics and progress monitoring",
        ],
        technologies: ["Flutter", "Fitness Tracking", "Nutrition Management", "Analytics"],
        status: "Completed",
      },
      {
        title: "Education Learning App",
        description: [
          "Developed an educational platform for online learning",
          "Implemented course management and progress tracking",
          "Created interactive learning modules and quizzes",
          "Integrated video streaming and content delivery",
        ],
        technologies: ["Flutter", "Video Streaming", "Course Management", "Interactive Learning"],
        status: "Completed",
      },
      {
        title: "Weather App",
        description: [
          "Built a comprehensive weather forecasting application",
          "Implemented real-time weather data integration",
          "Created location-based weather services",
          "Integrated weather alerts and notifications",
        ],
        technologies: ["Flutter", "Weather API", "Location Services", "Real-time Data"],
        status: "Completed",
      },
    ],
  },
  {
    company: "Orbilon Technology",
    logo: "https://orbilontech.gumlet.io/wp-content/uploads/2025/04/orbilon-technologies-color-text-200by65px.png?compress=true&quality=60&w=1024&dpr=1",
    period: "March 2024 - June 2024",
    location: "Lahore, Pakistan",
    projects: [
      {
        title: "Search Screen with Dynamic Filters",
        description: [
          "Developed Search Screen with dynamic filters and integrated Search API",
          "Implemented responsive UI using Flutter",
          "Integrated RESTful APIs for efficient data exchange",
          "Implemented Firebase Authentication for secure user management",
          "Managed application state using Provider and Riverpod",
        ],
        technologies: ["Flutter", "REST APIs", "Firebase Authentication", "Provider", "Riverpod"],
        status: "Completed",
      },
    ],
  },
];

const FREELANCE = [
  {
    title: "LAT Preparation App",
    description: "Final year project focused on LAT exam preparation with comprehensive study materials and practice tests.",
    technologies: ["Flutter", "Firebase", "Education", "Study Management"],
  },
  {
    title: "Olizon Mobile App",
    description: "Complete app UI design and Firebase authentication system integration for modern mobile experience.",
    technologies: ["Flutter", "Firebase Auth", "UI/UX Design", "Authentication"],
  },
  {
    title: "E-Shop App",
    description: "Complete e-commerce app UI with Firebase authentication system for online shopping experience.",
    technologies: ["Flutter", "Firebase Auth", "E-commerce", "UI Design"],
  },
  {
    title: "Gearup Pro",
    description: "Final year project app with Firebase authentication implementation for enhanced user security.",
    technologies: ["Flutter", "Firebase Auth", "Project Management", "Security"],
  },
  {
    title: "Advance Case Management System",
    description: "Complete app UI with Firebase Authentication and Cloud Firestore for case management and tracking.",
    technologies: ["Flutter", "Firebase Auth", "Cloud Firestore", "Case Management"],
  },
  {
    title: "MIpueblo App",
    description: "E-commerce app with complete UI design for online marketplace and shopping experience.",
    technologies: ["Flutter", "E-commerce", "UI/UX Design", "Marketplace"],
  },
  {
    title: "Al Tayyab Recovery",
    description: "Professional website landing page for recovery services with modern design and responsive layout.",
    technologies: ["Web Development", "Landing Page", "Responsive Design", "Professional"],
    url: "https://altayyabrecovery.com",
  },
];

const CERTIFICATIONS = [
  {
    title: "Bachelor of Science in Computer Science",
    institution: "Lahore Garrison University",
    type: "Degree",
    description: "Comprehensive computer science education covering programming, algorithms, data structures, and software engineering principles.",
    icon: GraduationCap,
    logo: "https://lgu.edu.pk/wp-content/uploads/2024/01/lLAHORE-GARRISON-UNIVERSITY.png",
  },
  {
    title: "Flutter Development Course",
    institution: "NexSkills",
    type: "Certification",
    description: "Professional Flutter development certification covering mobile app development, UI/UX design, and cross-platform development.",
    icon: Smartphone,
    logo: "https://nexskill.com/assets/images/org_white.webp",
  },
  {
    title: "Campus Ambassador at Youth Speak Forum 2023",
    institution: "AIESEC",
    type: "Leadership",
    description: "Served as Campus Ambassador for AIESEC's Youth Speak Forum 2023, promoting youth leadership and global citizenship initiatives.",
    icon: Award,
    logo: "https://cdn-expa.aiesec.org/assets/images/aiesec_logo_black.svg",
  },
];

const TECH_MARQUEE = [
  "Flutter", "Dart", "Firebase", "React", "TypeScript", "Node.js",
  "PostgreSQL", "Supabase", "Stripe", "PayPal", "ChatGPT API", "Groq API",
  "n8n", "Google ML-Kit", "AWS", "Cloud Functions", "Tailwind CSS", "REST APIs",
];

const STATS = [
  { value: "2+", label: "Years Experience" },
  { value: "15+", label: "Apps Shipped" },
  { value: "8+", label: "Featured Projects" },
  { value: "4", label: "Companies" },
];

// Profile avatar inside a gradient ring — reused for navbar, splash & footer
const Avatar = ({
  className = "w-8 h-8",
  rounded = "rounded-lg",
  glow = false,
}: {
  className?: string;
  rounded?: string;
  glow?: boolean;
}) => (
  <span
    className={`${className} ${rounded} p-[2px] bg-gradient-to-br from-cyan-400 via-sky-400 to-violet-500 flex items-center justify-center overflow-hidden shrink-0 ${
      glow ? "shadow-[0_0_30px_rgba(34,211,238,0.4)]" : ""
    }`}
  >
    <img
      src="/profile.jpg"
      alt="Muhammad Umar"
      className={`w-full h-full object-cover ${rounded}`}
    />
  </span>
);

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
  </svg>
);

// ---------------------------------------------------------------------------
// Reusable bits
// ---------------------------------------------------------------------------

const statusClasses = (c: string) =>
  c === "green"
    ? "border-emerald-500/40 text-emerald-300 bg-emerald-500/10"
    : c === "yellow"
      ? "border-amber-500/40 text-amber-300 bg-amber-500/10"
      : "border-cyan-500/40 text-cyan-300 bg-cyan-500/10";

const statusDot = (c: string) =>
  c === "green" ? "bg-emerald-400" : c === "yellow" ? "bg-amber-400" : "bg-cyan-400";

// 3D tilt wrapper
function TiltCard({
  children,
  className = "",
  intensity = 8,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), { stiffness: 150, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Section heading with mono index + gradient accent
function SectionHeading({
  index,
  title,
  accent,
  subtitle,
}: {
  index: string;
  title: string;
  accent: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-14"
    >
      <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5 font-mono text-xs text-cyan-300">
        <span className="text-violet-400">{index}</span>
        <span className="text-white/40">/</span>
        <span>{title.toLowerCase()}</span>
      </div>
      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
        {title} <span className="gradient-text">{accent}</span>
      </h2>
      {subtitle && <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">{subtitle}</p>}
    </motion.div>
  );
}

// Animated 3D background
function Background({ mouse }: { mouse: { x: number; y: number } }) {
  const [particles] = useState(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      delay: Math.random() * 6,
      duration: 6 + Math.random() * 8,
    })),
  );

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base radial wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.10),transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.12),transparent_55%)]" />

      {/* Drifting color blobs */}
      <motion.div
        className="absolute -top-32 -left-24 w-[40rem] h-[40rem] rounded-full bg-cyan-500/10 blur-[120px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-24 w-[36rem] h-[36rem] rounded-full bg-violet-500/10 blur-[120px]"
        animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-cyan-300/40"
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -28, 0], opacity: [0.15, 0.6, 0.15] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}

      {/* Perspective grid floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[55vh] grid-floor opacity-60"
        style={{
          transform: "perspective(420px) rotateX(62deg) scale(2)",
          transformOrigin: "bottom",
          maskImage: "linear-gradient(to top, black 10%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to top, black 10%, transparent 80%)",
        }}
      />

      {/* Cursor-follow glow */}
      <div
        className="absolute w-[28rem] h-[28rem] rounded-full bg-cyan-400/5 blur-[100px] transition-transform duration-300 ease-out"
        style={{ left: mouse.x - 224, top: mouse.y - 224 }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(3,5,12,0.6)_100%)]" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

function App() {
  const [roleText, setRoleText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [expandedExperience, setExpandedExperience] = useState<{ [k: string]: boolean }>({});
  const [expandedProjects, setExpandedProjects] = useState<{ [k: string]: boolean }>({});
  const [expandedFeatured, setExpandedFeatured] = useState<{ [k: string]: boolean }>({});

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSInstallSteps, setShowIOSInstallSteps] = useState(false);

  // Loading splash
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  // Role typewriter (type + delete loop)
  useEffect(() => {
    const current = ROLES[roleIdx];
    if (!deleting && roleText === current) {
      const t = setTimeout(() => setDeleting(true), 1600);
      return () => clearTimeout(t);
    }
    if (deleting && roleText === "") {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
      return;
    }
    const t = setTimeout(() => {
      setRoleText((prev) =>
        deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
      );
    }, deleting ? 45 : 90);
    return () => clearTimeout(t);
  }, [roleText, deleting, roleIdx]);

  // Mouse tracking (for cursor glow)
  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Scroll spy + progress
  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (top / docH) * 100 : 0);

      const sections = ["home", ...NAV_ITEMS, "company-projects"];
      const pos = top + 120;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // PWA install prompt
  useEffect(() => {
    const protocol = window.location.protocol;
    if (protocol === "capacitor:" || protocol === "file:") return;

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    setIsStandalone(standalone);
    const ua = window.navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    setIsIOS(ios);
    if (standalone) return;
    if (localStorage.getItem("pwa-install-dismissed")) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallBanner(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const t = isMobile ? setTimeout(() => setShowInstallBanner(true), 2800) : undefined;
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      if (t) clearTimeout(t);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const response = await fetch(`${API_BASE}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error("Error sending email:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#04060d] text-white relative overflow-x-hidden font-sans antialiased">
      <Background mouse={mouse} />

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ---------------- Loading splash ---------------- */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#04060d]"
          >
            <div className="text-center px-6">
              <motion.div
                initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto mb-6 w-24 h-24"
              >
                {/* Spinning gradient halo */}
                <span className="absolute -inset-2 rounded-full bg-[conic-gradient(from_0deg,#22d3ee,#a78bfa,#22d3ee)] blur-md opacity-60 animate-spin-slow" />
                <Avatar className="relative w-24 h-24" rounded="rounded-2xl" glow />
              </motion.div>
              <div className="font-mono text-sm text-cyan-300 mb-4">
                <span className="text-violet-400">$</span> initializing portfolio
                <span className="animate-blink">_</span>
              </div>
              <div className="w-56 h-1 mx-auto rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-violet-500"
                />
              </div>
              <p className="mt-4 font-mono text-[11px] tracking-widest text-slate-500 uppercase">
                Muhammad Umar • Developer
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- Navbar ---------------- */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-3">
          <div className="glass rounded-2xl px-4 sm:px-5 py-3 flex items-center justify-between relative">
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-2 font-heading font-bold text-lg z-10 group"
            >
              <Avatar className="w-9 h-9 transition-transform group-hover:scale-110" />
              <span className="hidden lg:inline">Muhammad Umar</span>
            </button>

            {/* Centered name on mobile / tablet */}
            <button
              onClick={() => scrollToSection("home")}
              className="lg:hidden absolute left-1/2 -translate-x-1/2 font-heading font-bold text-base sm:text-lg gradient-text whitespace-nowrap"
            >
              Muhammad Umar
            </button>

            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-all duration-300 hover:-translate-y-0.5 ${
                    activeSection === item
                      ? "text-cyan-300 bg-cyan-500/10"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 z-10">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={RESUME_URL}
                download
                target="_blank"
                rel="noopener"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-cyan-500 to-violet-500 text-[#04060d] hover:shadow-[0_0_24px_rgba(34,211,238,0.4)] transition-shadow"
              >
                <Download className="w-4 h-4" />
                Resume
              </motion.a>
              <button
                onClick={() => setIsMenuOpen((o) => !o)}
                className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10"
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="lg:hidden glass rounded-2xl mt-2 p-3 grid grid-cols-2 gap-2"
              >
                {NAV_ITEMS.map((item, i) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => scrollToSection(item)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium capitalize transition-colors ${
                      activeSection === item
                        ? "text-cyan-300 bg-cyan-500/10"
                        : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    {item}
                  </motion.button>
                ))}
                <a
                  href={RESUME_URL}
                  download
                  target="_blank"
                  rel="noopener"
                  className="col-span-2 mt-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-cyan-500 to-violet-500 text-[#04060d]"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <main className="relative z-10">
        {/* ---------------- Hero ---------------- */}
        <section id="home" className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <div className="mx-auto max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {/* Mobile-only avatar */}
              <motion.div
                className="md:hidden mb-6"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Avatar className="w-24 h-24" rounded="rounded-2xl" glow />
              </motion.div>

              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 font-mono text-xs text-cyan-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Available for high-impact roles
              </div>

              <p className="font-mono text-cyan-300 text-sm mb-3">
                <span className="text-violet-400">const</span> developer ={" "}
                <span className="text-amber-300">"Muhammad Umar"</span>;
              </p>

              <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-4">
                Muhammad <span className="gradient-text">Umar</span>
              </h1>

              <div className="font-mono text-lg sm:text-2xl text-slate-200 mb-6 h-9 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-400 shrink-0" />
                <span>{roleText}</span>
                <span className="w-[2px] h-6 bg-cyan-400 animate-blink" />
              </div>

              <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
                Flutter &amp; Full-Stack developer with{" "}
                <span className="text-white font-semibold">2+ years</span> shipping production apps used by real
                people — Firebase backends, Stripe &amp; PayPal payments, ChatGPT-powered features, and end-to-end
                automation. I own features from database to pixel-perfect UI to release.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => scrollToSection("projects")}
                  className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-violet-500 text-[#04060d] shadow-lg shadow-cyan-500/20 hover:shadow-[0_0_28px_rgba(34,211,238,0.5)] transition-shadow"
                >
                  View Work <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  href={RESUME_URL}
                  download
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold border border-white/15 bg-white/5 hover:bg-white/10 hover:border-cyan-400/40 transition-colors"
                >
                  <Download className="w-4 h-4" /> Download Resume
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => scrollToSection("contact")}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" /> Get in touch
                </motion.button>
              </div>

              {/* Socials + contact */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
                    >
                      <s.icon className="w-5 h-5" />
                    </a>
                  ))}
                  <a
                    href="https://wa.me/923124345138"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-emerald-300 hover:border-emerald-400/40 transition-colors"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                  </a>
                </div>
                <div className="font-mono text-xs text-slate-500 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" /> Lahore, Pakistan
                </div>
              </div>
            </motion.div>

            {/* Right — 3D terminal + avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative mt-4 md:mt-0"
            >
              <TiltCard intensity={10} className="relative">
                {/* Avatar ring — floats over the terminal on md+ (mobile already shows one up top) */}
                <div
                  className="hidden md:block absolute -top-10 -right-4 z-20 animate-float"
                  style={{ transform: "translateZ(60px)" }}
                >
                  <Avatar className="w-28 h-28" rounded="rounded-2xl" glow />
                </div>

                {/* Terminal window */}
                <div className="glow-border rounded-2xl glass overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                    <span className="w-3 h-3 rounded-full bg-red-400/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                    <span className="ml-2 font-mono text-xs text-slate-400">developer.ts</span>
                  </div>
                  <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed">
                    <p><span className="text-violet-400">const</span> <span className="text-cyan-300">umar</span> = {"{"}</p>
                    <p className="pl-4"><span className="text-sky-300">role</span>: <span className="text-amber-300">"Flutter &amp; Full-Stack Dev"</span>,</p>
                    <p className="pl-4"><span className="text-sky-300">stack</span>: [<span className="text-emerald-300">"Flutter"</span>, <span className="text-emerald-300">"Firebase"</span>, <span className="text-emerald-300">"React"</span>],</p>
                    <p className="pl-4"><span className="text-sky-300">automation</span>: [<span className="text-emerald-300">"n8n"</span>, <span className="text-emerald-300">"Groq"</span>],</p>
                    <p className="pl-4"><span className="text-sky-300">appsShipped</span>: <span className="text-orange-300">15</span>,</p>
                    <p className="pl-4"><span className="text-sky-300">available</span>: <span className="text-orange-300">true</span>,</p>
                    <p>{"}"};</p>
                    <p className="mt-3 text-slate-500"><span className="text-violet-400">while</span> (<span className="text-cyan-300">awake</span>) umar.<span className="text-sky-300">ship</span>();<span className="animate-blink">_</span></p>
                  </div>
                </div>

                {/* Floating stack chips */}
                <div
                  className="absolute -bottom-5 -left-5 z-20 glass rounded-xl px-3 py-2 font-mono text-xs text-cyan-300 flex items-center gap-2 animate-float"
                  style={{ transform: "translateZ(40px)", animationDelay: "1.2s" }}
                >
                  <Sparkles className="w-4 h-4 text-violet-400" /> shipping daily
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </section>

        {/* ---------------- Tech marquee ---------------- */}
        <div className="relative py-6 border-y border-white/5 bg-white/[0.02] overflow-hidden">
          <div className="flex w-max animate-marquee">
            {[...TECH_MARQUEE, ...TECH_MARQUEE].map((t, i) => (
              <span key={i} className="mx-6 font-mono text-sm text-slate-500 whitespace-nowrap">
                <span className="text-cyan-400/60">#</span> {t}
              </span>
            ))}
          </div>
        </div>

        {/* ---------------- About ---------------- */}
        <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading index="01" title="About" accent="Me" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-16"
            >
              A results-driven <span className="text-white font-semibold">Full-Stack &amp; Flutter Developer</span>{" "}
              crafting high-performance digital experiences. I architect scalable solutions that bridge complex
              backend logic with intuitive, pixel-perfect frontends — spanning{" "}
              <span className="text-white font-semibold">Flutter, React, and Firebase</span> — and ship them all the
              way to the store.
            </motion.p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: 1200 }}>
              {ABOUT_CARDS.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                >
                  <TiltCard className="h-full">
                    <div className="glow-border h-full rounded-2xl glass p-7 hover:bg-white/[0.06] transition-colors">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 shadow-lg`}>
                        <item.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-heading text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-slate-400 leading-relaxed">{item.description}</p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Skills ---------------- */}
        <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              index="02"
              title="My"
              accent="Skills"
              subtitle="The technologies and tools I reach for to design, build, and ship."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: 1200 }}>
              {SKILLS.map((cat, i) => (
                <motion.div
                  key={cat.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <TiltCard intensity={6} className="h-full">
                    <div className="glow-border h-full rounded-2xl glass p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                          <cat.icon className="w-5 h-5 text-cyan-300" />
                        </div>
                        <h3 className="font-heading text-lg font-semibold">{cat.category}</h3>
                      </div>
                      <p className="text-slate-500 text-sm mb-5">{cat.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-200 font-mono hover:border-cyan-400/40 hover:text-cyan-300 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Experience ---------------- */}
        <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <SectionHeading index="03" title="Work" accent="Experience" />

            <div className="flex flex-wrap justify-center gap-3 mb-14">
              {STATS.map((s) => (
                <div key={s.label} className="glass rounded-xl px-5 py-3 text-center">
                  <div className="font-heading text-2xl font-bold gradient-text">{s.value}</div>
                  <div className="text-xs text-slate-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="relative pl-6 sm:pl-8">
              {/* timeline line */}
              <div className="absolute left-2 sm:left-3 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/60 via-violet-500/40 to-transparent" />

              <div className="space-y-6">
                {EXPERIENCE.map((job, i) => {
                  const key = `${job.title}-${job.company}`;
                  const open = expandedExperience[key];
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative"
                    >
                      {/* node */}
                      <span className="absolute -left-[1.35rem] sm:-left-[1.65rem] top-6 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-cyan-400/15" />
                      <div className="glow-border rounded-2xl glass p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            {job.logo && (
                              <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center overflow-hidden shrink-0">
                                <img src={job.logo} alt={job.company} className="w-full h-full object-contain p-1.5" />
                              </div>
                            )}
                            <div>
                              <h3 className="font-heading text-lg font-bold">{job.title}</h3>
                              <div className="flex items-center flex-wrap gap-2">
                                <span className="text-cyan-300 font-semibold">{job.company}</span>
                                {job.company === "DM Worx LLC" && (
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/40 text-emerald-300 bg-emerald-500/10">
                                    Current
                                  </span>
                                )}
                              </div>
                              <p className="font-mono text-xs text-slate-500 mt-1">
                                {job.period} • {job.location}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => setExpandedExperience((p) => ({ ...p, [key]: !p[key] }))}
                            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-colors shrink-0"
                            aria-label="Toggle details"
                          >
                            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>

                        <AnimatePresence>
                          {open && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <ul className="space-y-2 mt-5 mb-4">
                                {job.description.map((d, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                                    {d}
                                  </li>
                                ))}
                              </ul>
                              <div className="flex flex-wrap gap-2">
                                {job.technologies.map((t) => (
                                  <span key={t} className="px-2.5 py-1 rounded-md text-xs font-mono border border-cyan-500/30 text-cyan-300 bg-cyan-500/5">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Featured Projects ---------------- */}
        <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              index="04"
              title="Featured"
              accent="Projects"
              subtitle="A showcase of products I've built and shipped end-to-end."
            />
            <div className="grid lg:grid-cols-2 gap-6" style={{ perspective: 1400 }}>
              {FEATURED_PROJECTS.map((project, i) => {
                const open = expandedFeatured[project.title];
                return (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 2) * 0.1 }}
                  >
                    <TiltCard intensity={5} className="h-full">
                      <div className="glow-border h-full rounded-2xl glass p-6 flex flex-col">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h3 className={`font-heading text-2xl font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className={`w-2 h-2 rounded-full animate-pulse ${statusDot(project.statusColor)}`} />
                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${statusClasses(project.statusColor)}`}>
                              {project.status}
                            </span>
                          </div>
                        </div>

                        <p className="text-slate-400 text-sm leading-relaxed mb-4 min-h-[3rem]">{project.description}</p>

                        <div className="flex flex-wrap gap-2 mb-5">
                          {project.technologies.slice(0, 5).map((t) => (
                            <span key={t} className="px-2.5 py-1 rounded-md text-xs font-mono border border-white/10 bg-white/5 text-slate-300">
                              {t}
                            </span>
                          ))}
                        </div>

                        {project.title === "My Invoice" ? (
                          <a href={project.url} target="_blank" rel="noopener noreferrer" className="mb-4 inline-block hover:scale-105 transition-transform w-fit">
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                              alt="Get it on Google Play"
                              className="h-12 w-auto"
                            />
                          </a>
                        ) : project.url && project.url !== "#" ? (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold w-fit bg-gradient-to-r ${project.color} text-white hover:scale-105 transition-transform`}
                          >
                            View Project <ArrowUpRight className="w-4 h-4" />
                          </a>
                        ) : null}

                        <button
                          onClick={() => setExpandedFeatured((p) => ({ ...p, [project.title]: !p[project.title] }))}
                          className="mt-auto w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center gap-2 text-sm text-slate-300 transition-colors"
                        >
                          {open ? <>Hide Details <ChevronUp className="w-4 h-4" /></> : <>Show Details <ChevronDown className="w-4 h-4" /></>}
                        </button>

                        <AnimatePresence>
                          {open && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-5">
                                <h4 className="font-heading font-semibold mb-3 flex items-center gap-2">
                                  <span className={`w-1 h-4 rounded-full bg-gradient-to-b ${project.color}`} /> Key Features
                                </h4>
                                <div className="space-y-2 mb-5">
                                  {project.features.map((f, idx) => (
                                    <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.color} shrink-0`} />
                                      <span className="text-slate-300 text-xs leading-relaxed">{f}</span>
                                    </div>
                                  ))}
                                </div>
                                <h4 className="font-heading font-semibold mb-3 flex items-center gap-2">
                                  <span className={`w-1 h-4 rounded-full bg-gradient-to-b ${project.color}`} /> Tech Stack
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {project.technologies.map((t) => (
                                    <span key={t} className="px-2.5 py-1 rounded-md text-xs font-mono border border-white/10 bg-white/5 text-slate-300">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------- Company Projects ---------------- */}
        <section id="company-projects" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <SectionHeading
              index="05"
              title="Company"
              accent="Projects"
              subtitle="Projects delivered across companies I've worked with."
            />
            <div className="space-y-5">
              {COMPANY_PROJECTS.map((company, i) => {
                const open = expandedProjects[company.company];
                return (
                  <motion.div
                    key={company.company}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="glow-border rounded-2xl glass p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          {company.logo && (
                            <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center overflow-hidden shrink-0">
                              <img src={company.logo} alt={company.company} className="w-full h-full object-contain p-1.5" />
                            </div>
                          )}
                          <div>
                            <h3 className="font-heading text-lg font-bold flex items-center gap-2">
                              {company.company}
                              {company.company === "DM Worx LLC" && (
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/40 text-emerald-300 bg-emerald-500/10">
                                  Current
                                </span>
                              )}
                            </h3>
                            <p className="font-mono text-xs text-slate-500 mt-1">{company.period} • {company.location}</p>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {company.projects.length} Project{company.projects.length > 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setExpandedProjects((p) => ({ ...p, [company.company]: !p[company.company] }))}
                          className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-colors shrink-0"
                          aria-label="Toggle projects"
                        >
                          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>

                      <AnimatePresence>
                        {open && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-4 mt-5">
                              {company.projects.map((project, pi) => (
                                <div key={pi} className="rounded-xl bg-white/5 border border-white/10 p-5">
                                  <div className="flex items-center justify-between mb-3 gap-2">
                                    <h4 className="font-heading font-bold">{project.title}</h4>
                                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                                      project.status === "Currently Working"
                                        ? "border-emerald-500/40 text-emerald-300 bg-emerald-500/10"
                                        : "border-cyan-500/40 text-cyan-300 bg-cyan-500/10"
                                    }`}>
                                      {project.status}
                                    </span>
                                  </div>
                                  <ul className="space-y-2 mb-4">
                                    {project.description.map((d, idx) => (
                                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                                        {d}
                                      </li>
                                    ))}
                                  </ul>
                                  <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((t) => (
                                      <span key={t} className="px-2.5 py-1 rounded-md text-xs font-mono border border-cyan-500/30 text-cyan-300 bg-cyan-500/5">
                                        {t}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------- Freelance ---------------- */}
        <section id="freelance" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              index="06"
              title="Freelance"
              accent="Work"
              subtitle="Independent projects showcasing range and versatility."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: 1200 }}>
              {FREELANCE.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <TiltCard intensity={6} className="h-full">
                    <div className="glow-border h-full rounded-2xl glass p-6">
                      <h3 className="font-heading text-lg font-bold mb-2">{project.title}</h3>
                      <p className="text-slate-400 text-sm mb-4 leading-relaxed">{project.description}</p>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 text-sm font-medium mb-4 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" /> Visit Live Site
                        </a>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((t) => (
                          <span key={t} className="px-2 py-1 rounded-md text-xs font-mono border border-white/10 bg-white/5 text-slate-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Certifications ---------------- */}
        <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              index="07"
              title="Education &amp;"
              accent="Certifications"
              subtitle="Credentials and achievements that back the work."
            />
            <div className="grid lg:grid-cols-3 gap-6" style={{ perspective: 1200 }}>
              {CERTIFICATIONS.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                >
                  <TiltCard className="h-full">
                    <div className="glow-border h-full rounded-2xl glass p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center overflow-hidden shrink-0">
                          {cert.logo ? (
                            <img src={cert.logo} alt={cert.institution} className="w-10 h-10 object-contain" />
                          ) : (
                            <cert.icon className="w-6 h-6 text-cyan-600" />
                          )}
                        </div>
                        <span className="font-mono text-xs px-2 py-1 rounded-md border border-violet-500/30 text-violet-300 bg-violet-500/5">
                          {cert.type}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold mb-1">{cert.title}</h3>
                      <p className="text-cyan-300 text-sm font-semibold mb-3">{cert.institution}</p>
                      <p className="text-slate-400 text-sm leading-relaxed">{cert.description}</p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Contact ---------------- */}
        <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              index="08"
              title="Get In"
              accent="Touch"
              subtitle="Have a project or role in mind? Let's build something that ships."
            />
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Info */}
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "umarshad0309@gmail.com", href: "mailto:umarshad0309@gmail.com" },
                  { icon: Phone, label: "Phone & WhatsApp", value: "+92 312 434 5138", href: "https://wa.me/923124345138" },
                  { icon: MapPin, label: "Location", value: "Lahore, Pakistan" },
                ].map((c) => (
                  <div key={c.label} className="glow-border rounded-2xl glass p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center shrink-0">
                      <c.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-slate-400 text-sm hover:text-cyan-300 transition-colors break-all">
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-slate-400 text-sm">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}

                <a
                  href={RESUME_URL}
                  download
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold border border-white/15 bg-white/5 hover:bg-white/10 hover:border-cyan-400/40 hover:scale-[1.02] transition-all w-full justify-center"
                >
                  <Download className="w-4 h-4" /> Download My Resume
                </a>
              </div>

              {/* Form */}
              <div className="glow-border rounded-2xl glass p-6">
                <h3 className="font-heading text-xl font-bold mb-5">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                  />
                  {submitStatus === "success" && (
                    <div className="p-3 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm">
                      ✅ Message sent successfully! I'll get back to you soon.
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 text-sm">
                      ❌ Failed to send message. Please try again.
                    </div>
                  )}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 text-[#04060d] font-semibold hover:opacity-90 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 mr-2 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" /> Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Footer ---------------- */}
        <footer className="border-t border-white/5 py-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-heading font-bold">
              <Avatar className="w-8 h-8" />
              Muhammad Umar
            </div>
            <p className="font-mono text-xs text-slate-500">
              © {new Date().getFullYear()} Muhammad Umar • Flutter &amp; Full-Stack Developer
            </p>
            <div className="flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>

      {/* ---------------- PWA install banner ---------------- */}
      <AnimatePresence>
        {showInstallBanner && !isStandalone && window.location.protocol !== "capacitor:" && window.location.protocol !== "file:" && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-[90] p-4 bg-[#06080f]/95 backdrop-blur-md border-t border-white/10"
          >
            <div className="max-w-lg mx-auto flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-medium text-sm truncate">
                    {deferredPrompt ? "Install app" : "Add to Home Screen"}
                  </p>
                  <p className="text-slate-400 text-xs truncate">
                    {isIOS
                      ? "Tap Share, then Add to Home Screen"
                      : deferredPrompt
                        ? "Open faster and work offline"
                        : "Install may appear in the browser menu (⋮)"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {deferredPrompt ? (
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-cyan-500 to-violet-500 text-[#04060d] font-semibold"
                    onClick={async () => {
                      await deferredPrompt.prompt();
                      const { outcome } = await deferredPrompt.userChoice;
                      if (outcome === "accepted") setShowInstallBanner(false);
                    }}
                  >
                    Install
                  </Button>
                ) : isIOS ? (
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-cyan-500 to-violet-500 text-[#04060d] font-semibold"
                    onClick={() => setShowIOSInstallSteps(true)}
                  >
                    How to add
                  </Button>
                ) : null}
                <button
                  type="button"
                  aria-label="Dismiss"
                  onClick={() => {
                    setShowInstallBanner(false);
                    localStorage.setItem("pwa-install-dismissed", "true");
                  }}
                  className="p-2 text-slate-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {showIOSInstallSteps && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[91] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setShowIOSInstallSteps(false);
              setShowInstallBanner(false);
              localStorage.setItem("pwa-install-dismissed", "true");
            }}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "tween", duration: 0.25 }}
              className="w-full max-w-sm rounded-2xl bg-[#0a0e1a] border border-white/10 p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-heading text-white font-semibold text-lg mb-4">Add to Home Screen</h3>
              <ol className="text-slate-300 text-sm space-y-3 mb-6 list-decimal list-inside">
                <li>Tap the <strong className="text-white">Share</strong> icon (box with arrow up) in Safari.</li>
                <li>Scroll and tap <strong className="text-white">&quot;Add to Home Screen&quot;</strong>.</li>
                <li>Tap <strong className="text-white">&quot;Add&quot;</strong> in the top right.</li>
              </ol>
              <Button
                className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 text-[#04060d] font-semibold"
                onClick={() => {
                  setShowIOSInstallSteps(false);
                  setShowInstallBanner(false);
                  localStorage.setItem("pwa-install-dismissed", "true");
                }}
              >
                Done
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
