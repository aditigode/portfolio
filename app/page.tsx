"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/* ─────────────── constants ─────────────── */

const navLinks = ["About", "Experience", "Projects", "Skills", "Education", "Contact"];

const experiences = [
  {
    title: "Cloud & Infrastructure Engineer 3",
    badge: "Director · Current",
    company: "Morgan Stanley",
    period: "Apr 2024 – Present",
    location: "Hybrid",
    bullets: [
      "Developing secure and robust self-service solutions for databases",
      "Building infrastructure to detect, report, and remove unauthorized access to databases",
      "Identifying and remediating security vulnerabilities to enhance data protection and compliance",
    ],
    accent: "beige" as const,
    current: true,
  },
  {
    title: "Teaching Assistant — Applied Machine Learning",
    company: "Indiana University Bloomington",
    period: "Aug 2022 – Dec 2022",
    location: "Bloomington, Indiana",
    bullets: [
      "Mentored 140+ graduate students through office hours and Q&A platforms",
      "Ensured accurate evaluation of submissions; technologies: Scikit-Learn, Pandas, NumPy, TensorFlow",
    ],
    accent: "stone" as const,
  },
  {
    title: "Research Assistant",
    company: "Indiana University Bloomington",
    period: "May 2022 – Jul 2022",
    location: "Bloomington, Indiana",
    bullets: [
      "Developed a data browsing and visualization tool using Streamlit.io for Blink dynamics research",
      "Performed peak shape analysis of segmented blinks to prepare data for ML classification",
    ],
    accent: "stone" as const,
  },
  {
    title: "System Engineer",
    company: "Citibank (Contract)",
    period: "Nov 2019 – Apr 2021",
    location: "Mumbai, India",
    bullets: [
      "Developed PowerShell automation scripts achieving 85% reduction in missing data incidents",
      "Resolved 11+ high-priority server storage and security incidents daily using ServiceNow",
    ],
    accent: "taupe" as const,
  },
  {
    title: "System Engineer",
    company: "StateStreet (Contract)",
    period: "Feb 2019 – Nov 2019",
    location: "Bangalore, India",
    bullets: [
      "Managed StateStreet's Enterprise Data Warehouse maintaining a 98% SLA success rate",
      "Optimized SQL queries to identify and rectify missing data, enhancing system stability",
    ],
    accent: "taupe" as const,
  },
];

const projects = [
  {
    title: "ML Inferences on Data using Serverless Functions",
    tech: ["AWS Lambda", "Rekognition", "S3", "TensorFlow", "Flask", "Docker", "Boto3"],
    bullets: [
      "Implemented serverless ML inference with Multi-Buffer System (MBS) for NLP tasks",
      "Built a UI for object detection, text translation, and concurrent file management",
      "Achieved 15% cost-saving and 30% reduction in inference time across Lambda configurations",
    ],
    accent: "beige" as const,
  },
  {
    title: "Distributed Analysis of Large Datasets with Spark",
    tech: ["PySpark", "Spark-SQL", "HDFS", "OpenStack", "K-Means"],
    bullets: [
      "Analyzed 1.8 GB of NYC parking violation data on IU's Jetstream2 running OpenStack",
      "Leveraged K-means clustering for NBA player shooting pattern analysis (silhouette: 0.703)",
    ],
    accent: "stone" as const,
  },
  {
    title: "Emotion Recognition in Toddlers for Social Robots",
    tech: ["TensorFlow", "Keras", "VGG16", "Python", "FER2013", "Google Colab"],
    bullets: [
      "Achieved 79.71% training accuracy with VGG16, outperforming ResNet18 and CCT models",
      "Addressed dataset imbalance via batch normalization and dropout layers",
    ],
    accent: "taupe" as const,
  },
  {
    title: "Automatic Tag Prediction using NLP",
    tech: ["Python", "Scikit-learn", "NLTK", "Pandas", "NumPy"],
    bullets: [
      "Solved multilabel classification predicting 1–3 tags for 200k StackOverflow Q&A posts",
      "Trained One-vs-Rest, Multi-label KNN, Naïve Bayes, and Binary Relevance classifiers",
    ],
    accent: "slate" as const,
  },
  {
    title: "Delivery Service Database",
    tech: ["MySQL", "ERDPlus"],
    bullets: [
      "Designed a normalized relational database for a local-store online shopping application",
      "Validated the design through comprehensive business-intelligence queries",
    ],
    accent: "parchment" as const,
  },
];

const skillGroups = {
  Languages:             { list: ["Python", "C", "SQL", "Java", "PowerShell"],                                     accent: "beige"     as const },
  "Cloud & Distributed": { list: ["AWS", "Docker", "PySpark", "Hadoop", "OpenStack"],                              accent: "stone"     as const },
  "Web Development":     { list: ["HTML", "CSS", "JavaScript", "Flask", "MongoDB", "RESTful API", "PHP"],          accent: "taupe"     as const },
  "Machine Learning":    { list: ["TensorFlow", "Keras", "Scikit-Learn", "NLTK", "Pandas", "NumPy", "Matplotlib"], accent: "slate"     as const },
  "Tools & Databases":   { list: ["Git", "MySQL", "ServiceNow", "Streamlit", "Beautiful Soup", "Seaborn"],         accent: "parchment" as const },
};

const education = [
  {
    degree: "Master of Science in Computer Science",
    school: "Indiana University Bloomington",
    period: "Aug 2021 – May 2023",
    gpa: "3.9 / 4.0",
    courses: ["Applied Machine Learning", "Computer Vision", "Cloud Computing", "AI", "Security for Networked Systems", "HPC"],
    accent: "beige" as const,
  },
  {
    degree: "Bachelor of Engineering in Computer Engineering",
    school: "University of Mumbai",
    period: "Jul 2014 – May 2018",
    gpa: "8.93 / 10",
    note: "Department Rank: 1",
    courses: ["Data Warehousing & Mining", "Software Engineering", "OOP", "AI", "Machine Learning"],
    accent: "stone" as const,
  },
];

const interests = [
  {
    label: "Music",
    desc: "Always have my headphones on",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 28V16a8 8 0 0116 0v12" />
        <rect x="5" y="26" width="5" height="7" rx="2.5" />
        <rect x="26" y="26" width="5" height="7" rx="2.5" />
      </svg>
    ),
  },
  {
    label: "Reading",
    desc: "Lost in a good book",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 8c4-2 8-1 13 2 5-3 9-4 13-2v20c-4-2-8-1-13 2-5-3-9-4-13-2V8z" />
        <path d="M18 10v20" />
      </svg>
    ),
  },
  {
    label: "Travel",
    desc: "Exploring new places",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="12" />
        <ellipse cx="18" cy="18" rx="5" ry="12" />
        <path d="M6 14h24M6 22h24" />
      </svg>
    ),
  },
];

/* ─────────────── skill avatars ─────────────── */

const skillAvatars = [
  {
    id: "ml",
    label: "Machine Learning",
    skills: ["TensorFlow", "Keras", "Scikit-Learn", "NumPy"],
    anim: "floatSlow 6s ease-in-out infinite",
    svg: (
      <svg width="80" height="90" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Antenna */}
        <line x1="40" y1="22" x2="40" y2="10" stroke="#C4A882" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="40" cy="7" r="4" fill="#C4A882"/>
        {/* Head */}
        <rect x="16" y="22" width="48" height="38" rx="10" fill="#FAF4EC" stroke="#C4A882" strokeWidth="2"/>
        {/* Eyes */}
        <circle cx="30" cy="37" r="7" fill="white" stroke="#C4A882" strokeWidth="1.5"/>
        <circle cx="50" cy="37" r="7" fill="white" stroke="#C4A882" strokeWidth="1.5"/>
        <circle cx="30" cy="37" r="3" fill="#C4A882"/>
        <circle cx="50" cy="37" r="3" fill="#C4A882"/>
        <circle cx="31.5" cy="35.5" r="1" fill="white"/>
        <circle cx="51.5" cy="35.5" r="1" fill="white"/>
        {/* Mini bar chart mouth */}
        <rect x="26" y="51" width="3" height="4" rx="1" fill="#C4A882" opacity="0.6"/>
        <rect x="31" y="49" width="3" height="6" rx="1" fill="#C4A882" opacity="0.8"/>
        <rect x="36" y="50" width="3" height="5" rx="1" fill="#C4A882"/>
        <rect x="41" y="48" width="3" height="7" rx="1" fill="#C4A882" opacity="0.8"/>
        <rect x="46" y="51" width="3" height="4" rx="1" fill="#C4A882" opacity="0.6"/>
        {/* Body */}
        <rect x="22" y="62" width="36" height="22" rx="8" fill="#FAF4EC" stroke="#C4A882" strokeWidth="1.5"/>
        {/* Circuit lines on body */}
        <path d="M30 71 h5 v3 h5" stroke="#C4A882" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
        <circle cx="44" cy="74" r="2.5" fill="none" stroke="#C4A882" strokeWidth="1" opacity="0.5"/>
        {/* Arms */}
        <rect x="8" y="63" width="14" height="8" rx="4" fill="#FAF4EC" stroke="#C4A882" strokeWidth="1.5"/>
        <rect x="58" y="63" width="14" height="8" rx="4" fill="#FAF4EC" stroke="#C4A882" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: "cv",
    label: "Computer Vision",
    skills: ["VGG16", "OpenCV", "FER2013", "Keras"],
    anim: "float 5s 0.5s ease-in-out infinite",
    svg: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer eye shape */}
        <path d="M8 40 Q40 8 72 40 Q40 72 8 40Z" fill="#FAF4EC" stroke="#C4A882" strokeWidth="2"/>
        {/* Iris */}
        <circle cx="40" cy="40" r="16" fill="white" stroke="#C4A882" strokeWidth="1.5"/>
        {/* Camera aperture */}
        <circle cx="40" cy="40" r="10" fill="#FAF4EC" stroke="#C4A882" strokeWidth="1.5"/>
        <circle cx="40" cy="40" r="5" fill="#C4A882"/>
        <circle cx="42" cy="38" r="1.5" fill="white"/>
        {/* Aperture blades */}
        <line x1="40" y1="30" x2="40" y2="34" stroke="#C4A882" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="40" y1="46" x2="40" y2="50" stroke="#C4A882" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="30" y1="40" x2="34" y2="40" stroke="#C4A882" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="46" y1="40" x2="50" y2="40" stroke="#C4A882" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Scan lines */}
        <path d="M14 33 L20 33" stroke="#C4A882" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <path d="M14 40 L20 40" stroke="#C4A882" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <path d="M14 47 L20 47" stroke="#C4A882" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <path d="M60 33 L66 33" stroke="#C4A882" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <path d="M60 40 L66 40" stroke="#C4A882" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <path d="M60 47 L66 47" stroke="#C4A882" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        {/* Eyelashes top */}
        <path d="M28 20 L30 26" stroke="#C4A882" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M40 16 L40 22" stroke="#C4A882" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M52 20 L50 26" stroke="#C4A882" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "linux",
    label: "Linux",
    skills: ["Bash", "Shell Scripting", "PowerShell", "OpenStack"],
    anim: "floatReverse 7s 1s ease-in-out infinite",
    svg: (
      <svg width="80" height="90" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Penguin body */}
        <ellipse cx="40" cy="58" rx="24" ry="28" fill="#2d2d2d"/>
        {/* White belly */}
        <ellipse cx="40" cy="62" rx="15" ry="20" fill="#FAF4EC"/>
        {/* Head */}
        <ellipse cx="40" cy="28" rx="20" ry="20" fill="#2d2d2d"/>
        {/* Face white patch */}
        <ellipse cx="40" cy="30" rx="13" ry="14" fill="#FAF4EC"/>
        {/* Eyes */}
        <circle cx="34" cy="24" r="4" fill="white"/>
        <circle cx="46" cy="24" r="4" fill="white"/>
        <circle cx="34" cy="24" r="2.5" fill="#C4A882"/>
        <circle cx="46" cy="24" r="2.5" fill="#C4A882"/>
        <circle cx="35" cy="23" r="1" fill="white"/>
        <circle cx="47" cy="23" r="1" fill="white"/>
        {/* Beak */}
        <path d="M36 33 L40 39 L44 33Z" fill="#C4A882"/>
        {/* Blush */}
        <circle cx="29" cy="31" r="4" fill="#C4A882" opacity="0.25"/>
        <circle cx="51" cy="31" r="4" fill="#C4A882" opacity="0.25"/>
        {/* Wings */}
        <ellipse cx="16" cy="60" rx="8" ry="16" fill="#2d2d2d" transform="rotate(-15 16 60)"/>
        <ellipse cx="64" cy="60" rx="8" ry="16" fill="#2d2d2d" transform="rotate(15 64 60)"/>
        {/* Feet */}
        <ellipse cx="32" cy="85" rx="9" ry="5" fill="#C4A882"/>
        <ellipse cx="48" cy="85" rx="9" ry="5" fill="#C4A882"/>
      </svg>
    ),
  },
  {
    id: "db",
    label: "Databases",
    skills: ["MySQL", "MongoDB", "SQL", "ServiceNow"],
    anim: "drift 8s 0.5s ease-in-out infinite",
    svg: (
      <svg width="80" height="90" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main cylinder stack */}
        <ellipse cx="40" cy="18" rx="28" ry="10" fill="#FAF4EC" stroke="#C4A882" strokeWidth="2"/>
        <rect x="12" y="18" width="56" height="20" fill="#FAF4EC" stroke="#C4A882" strokeWidth="2"/>
        <ellipse cx="40" cy="38" rx="28" ry="10" fill="#FAF4EC" stroke="#C4A882" strokeWidth="2"/>
        {/* Second layer */}
        <rect x="12" y="38" width="56" height="18" fill="#F5EFE8" stroke="#C4A882" strokeWidth="2"/>
        <ellipse cx="40" cy="56" rx="28" ry="10" fill="#F5EFE8" stroke="#C4A882" strokeWidth="2"/>
        {/* Third layer */}
        <rect x="12" y="56" width="56" height="18" fill="#EDE5D8" stroke="#C4A882" strokeWidth="2"/>
        <ellipse cx="40" cy="74" rx="28" ry="10" fill="#EDE5D8" stroke="#C4A882" strokeWidth="2"/>
        {/* Data lines on layers */}
        <line x1="22" y1="27" x2="58" y2="27" stroke="#C4A882" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
        <line x1="22" y1="31" x2="50" y2="31" stroke="#C4A882" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
        <line x1="22" y1="46" x2="58" y2="46" stroke="#C4A882" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
        <line x1="22" y1="50" x2="44" y2="50" stroke="#C4A882" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
        <line x1="22" y1="63" x2="58" y2="63" stroke="#C4A882" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
        {/* Connection dots on top */}
        <circle cx="28" cy="18" r="3" fill="#C4A882"/>
        <circle cx="40" cy="14" r="3" fill="#C4A882" opacity="0.7"/>
        <circle cx="52" cy="18" r="3" fill="#C4A882"/>
      </svg>
    ),
  },
  {
    id: "music",
    label: "Music",
    skills: ["Always on headphones", "Indie · Pop · Lo-fi"],
    anim: "floatSlow 9s 2s ease-in-out infinite",
    svg: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Headband arc */}
        <path d="M14 48 C14 24 66 24 66 48" stroke="#C4A882" strokeWidth="5" strokeLinecap="round" fill="none"/>
        {/* Left earpiece */}
        <rect x="6" y="44" width="16" height="24" rx="8" fill="#FAF4EC" stroke="#C4A882" strokeWidth="2"/>
        <rect x="10" y="49" width="8" height="14" rx="4" fill="#C4A882" opacity="0.3"/>
        {/* Right earpiece */}
        <rect x="58" y="44" width="16" height="24" rx="8" fill="#FAF4EC" stroke="#C4A882" strokeWidth="2"/>
        <rect x="62" y="49" width="8" height="14" rx="4" fill="#C4A882" opacity="0.3"/>
        {/* Waveform in center */}
        <path d="M24 56 L28 48 L32 60 L36 44 L40 58 L44 50 L48 62 L52 48 L56 56" stroke="#C4A882" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        {/* Music notes floating */}
        <text x="32" y="22" fontSize="12" fill="#C4A882" opacity="0.7">♪</text>
        <text x="44" y="16" fontSize="10" fill="#C4A882" opacity="0.5">♫</text>
      </svg>
    ),
  },
];

/* ─────────────── accent palette ─────────────── */

type Accent = "beige" | "stone" | "taupe" | "slate" | "parchment";

const A: Record<Accent, { bg: string; text: string; border: string; dot: string; bar: string }> = {
  beige:     { bg: "bg-[#FAF4EC]",  text: "text-[#8B6830]", border: "border-[#E8D9C0]", dot: "bg-[#C4A882]", bar: "bg-[#C4A882]" },
  stone:     { bg: "bg-stone-50",   text: "text-stone-500", border: "border-stone-200", dot: "bg-stone-300", bar: "bg-stone-300" },
  taupe:     { bg: "bg-[#F5EFE8]",  text: "text-[#7A6A55]", border: "border-[#DDD0BC]", dot: "bg-[#B0A090]", bar: "bg-[#B0A090]" },
  slate:     { bg: "bg-slate-50",   text: "text-slate-400", border: "border-slate-200", dot: "bg-slate-300", bar: "bg-slate-300" },
  parchment: { bg: "bg-[#F8F2E8]",  text: "text-[#857560]", border: "border-[#E0D3C0]", dot: "bg-[#C0B0A0]", bar: "bg-[#C0B0A0]" },
};

const hw = { fontFamily: "var(--font-caveat), cursive" };

/* ─────────────── scroll-fade hook ─────────────── */

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return ref;
}

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useFadeIn();
  return <div ref={ref} className={`fade-section ${className}`}>{children}</div>;
}

/* ─────────────── SkillAvatar component ─────────────── */

function SkillAvatar({ avatar }: { avatar: typeof skillAvatars[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative flex flex-col items-center cursor-pointer select-none"
      style={{ animation: avatar.anim }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="transition-transform duration-200"
        style={{ transform: hovered ? "scale(1.12)" : "scale(1)" }}
      >
        {avatar.svg}
      </div>
      <span
        className="mt-1 text-xs font-medium text-[#8B6830] text-center"
        style={hw}
      >
        {avatar.label}
      </span>

      {/* Tooltip */}
      {hovered && (
        <div
          className="absolute -top-2 left-1/2 z-20 pointer-events-none"
          style={{ transform: "translate(-50%, -100%)" }}
        >
          <div className="bg-white/90 backdrop-blur-sm border border-[#E8D9C0] rounded-2xl shadow-md px-4 py-3 min-w-[140px] text-center">
            <p className="text-xs font-semibold text-[#8B6830] mb-1.5" style={hw}>{avatar.label}</p>
            <div className="flex flex-wrap gap-1 justify-center">
              {avatar.skills.map((s) => (
                <span key={s} className="text-[10px] bg-[#FAF4EC] text-[#8B6830] border border-[#E8D9C0] px-1.5 py-0.5 rounded-full">{s}</span>
              ))}
            </div>
          </div>
          <div className="w-3 h-3 bg-white border-r border-b border-[#E8D9C0] mx-auto rotate-45 -mt-1.5 relative z-10" />
        </div>
      )}
    </div>
  );
}

/* ─────────────── component ─────────────── */

export default function Home() {
  const [menuOpen, setMenuOpen]           = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [expandedExp, setExpandedExp]     = useState<number | null>(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.toLowerCase()))
      .filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F7F4]" style={{ fontFamily: "var(--font-nunito), Arial, sans-serif" }}>

      {/* ── Navbar ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#F8F7F4]/95 backdrop-blur-sm shadow-sm" : "bg-[#F8F7F4]/80 backdrop-blur-sm"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="text-[#C4A882] font-bold text-2xl" style={hw}>AG</a>

            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.toLowerCase();
                return (
                  <a key={link} href={`#${link.toLowerCase()}`} className={`relative inline-block px-2 py-1 text-sm font-medium transition-colors ${isActive ? "text-[#8B6830]" : "text-slate-500 hover:text-[#8B6830]"}`}>
                    {link}
                    {isActive && (
                      <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 100 32" fill="none" preserveAspectRatio="none">
                        <path d="M 5,16 C 4,5 22,1 50,2 C 78,1 96,5 95,16 C 94,27 76,31 50,30 C 24,31 5,26 5,16" stroke="#C4A882" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="240" style={{ animation: "draw-circle 0.45s ease-out forwards" }} />
                      </svg>
                    )}
                  </a>
                );
              })}
              <a href="/portfolio/Resume.pdf" target="_blank" rel="noopener noreferrer" className="text-sm bg-[#C4A882] text-white px-4 py-2 rounded-full hover:bg-[#B09060] transition-colors font-medium">Resume</a>
            </div>

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-slate-500 hover:text-[#8B6830]" aria-label="Toggle menu">
              {menuOpen
                ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              }
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#F8F7F4] border-t border-stone-200 px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block text-slate-500 hover:text-[#8B6830] transition-colors font-medium py-3">{link}</a>
            ))}
            <a href="/portfolio/Resume.pdf" target="_blank" rel="noopener noreferrer" className="block text-center bg-[#C4A882] text-white px-4 py-2 rounded-full hover:bg-[#B09060] transition-colors font-medium">Resume</a>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-[#FAF4EC] via-[#F8F7F4] to-stone-50 pt-16 relative overflow-hidden">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: text */}
            <div>
              <p className="text-[#C4A882] font-medium text-lg tracking-wide mb-2" style={{ ...hw, animation: "fadeInUp 0.5s 0.1s ease-out both" }}>
                Hello, I&apos;m
              </p>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-slate-800 tracking-tight mb-4" style={{ ...hw, animation: "fadeInUp 0.6s 0.2s ease-out both" }}>
                Aditi Gode
              </h1>
              <h2 className="text-xl sm:text-2xl text-slate-400 font-light mb-6" style={{ animation: "fadeInUp 0.6s 0.4s ease-out both" }}>
                Cloud & Infrastructure Engineer ·{" "}
                <span className="text-[#8B6830] font-medium">Director at Morgan Stanley</span>
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed max-w-xl mb-10" style={{ animation: "fadeInUp 0.6s 0.55s ease-out both" }}>
                Building secure, scalable database infrastructure and self-service solutions. Passionate about data security, distributed systems, and machine learning.
              </p>
              <div className="flex flex-wrap gap-3" style={{ animation: "fadeInUp 0.6s 0.7s ease-out both" }}>
                <a href="#projects" className="bg-[#C4A882] text-white px-6 py-3 rounded-full font-medium hover:bg-[#B09060] transition-all duration-200 hover:-translate-y-0.5">View Projects</a>
                <a href="#contact" className="border border-[#C4A882] text-[#8B6830] px-6 py-3 rounded-full font-medium hover:bg-[#FAF4EC] transition-all duration-200 hover:-translate-y-0.5">Get In Touch</a>
              </div>
            </div>

            {/* Right: interactive skill avatars */}
            <div className="hidden lg:block" style={{ animation: "fadeInUp 0.7s 0.5s ease-out both" }}>
              <p className="text-center text-sm text-slate-400 mb-6 tracking-wide" style={hw}>hover to explore my skills ✦</p>
              <div className="grid grid-cols-3 gap-6 place-items-center">
                {/* Row 1: ML, CV, Linux */}
                <SkillAvatar avatar={skillAvatars[0]} />
                <SkillAvatar avatar={skillAvatars[1]} />
                <SkillAvatar avatar={skillAvatars[2]} />
                {/* Row 2: DB centered, Music */}
                <div className="col-start-1 col-end-2">
                  <SkillAvatar avatar={skillAvatars[3]} />
                </div>
                <div className="col-start-3 col-end-4">
                  <SkillAvatar avatar={skillAvatars[4]} />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Subtle background doodle */}
        <Doodle className="bottom-16 right-[5%] hidden xl:block" anim="floatReverse 10s ease-in-out infinite">
          <svg width="60" height="20" viewBox="0 0 60 20" fill="none" stroke="#C4A882" strokeWidth="1.2" opacity="0.15" strokeLinecap="round">
            <path d="M2 10 Q10 2, 18 10 Q26 18, 34 10 Q42 2, 50 10 Q58 18, 58 10" />
          </svg>
        </Doodle>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="About Me" subtitle="A little bit about who I am" />

          <FadeIn>
            <div className="grid md:grid-cols-5 gap-10 items-center">
              {/* Photo */}
              <div className="md:col-span-2 flex justify-center">
                <Image
                  src="/portfolio/portfolio_picture.jpg"
                  alt="Aditi Gode"
                  width={320}
                  height={320}
                  className="w-64 h-64 md:w-72 md:h-72 rounded-3xl object-cover border-2 border-[#E8D9C0] shadow-sm"
                  priority
                />
              </div>

              {/* Bio */}
              <div className="md:col-span-3 space-y-4 text-slate-500 leading-relaxed">
                <p>
                  I&apos;m a Cloud & Infrastructure Engineer at Morgan Stanley, where I hold the title of Director. I focus on building secure self-service database solutions and infrastructure to detect and remediate unauthorized database access.
                </p>
                <p>
                  I hold a Master&apos;s in Computer Science from Indiana University Bloomington (GPA: 3.9), with deep expertise spanning machine learning, distributed systems, and cloud computing.
                </p>
                <p>
                  My journey spans research in ML-driven data visualization, teaching graduate-level ML, and enterprise system engineering at Citibank and StateStreet.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a href="https://linkedin.com/in/aditi-gode" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#8B6830] hover:underline">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                    LinkedIn
                  </a>
                  <a href="https://github.com/aditigode" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#8B6830] hover:underline">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
                    GitHub
                  </a>
                  <a href="/portfolio/Resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#8B6830] hover:underline">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Resume
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Beyond the Code */}
          <FadeIn className="mt-16">
            <h3 className="text-2xl text-slate-700 mb-6" style={hw}>Beyond the Code</h3>
            <div className="flex flex-wrap gap-5 justify-center md:justify-start">
              {interests.map((item, i) => (
                <div
                  key={item.label}
                  className="group flex items-center gap-4 bg-white border border-stone-100 rounded-2xl px-6 py-4 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-default"
                  style={{ animation: `fadeInUp 0.5s ${0.1 + i * 0.12}s ease-out both` }}
                >
                  <div className="text-[#C4A882] group-hover:animate-[wiggle_0.4s_ease-in-out]">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-slate-700" style={hw}>{item.label}</div>
                    <div className="text-sm text-slate-400">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="py-20 bg-[#F2EDE6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Experience" subtitle="Click any role to expand details" />
          <div className="relative">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-stone-200 hidden md:block" />
            <div className="absolute left-0 top-2 bottom-2 w-px bg-stone-200 md:hidden" />
            <div className="space-y-4">
              {experiences.map((exp, i) => {
                const a = A[exp.accent];
                const isOpen = expandedExp === i;
                return (
                  <FadeIn key={i}>
                    <div className="relative flex gap-4 md:gap-8">
                      <div className={`relative z-10 flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full ${a.bg} ${a.border} border-2 flex items-center justify-center mt-4`}>
                        <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${a.dot}`} style={exp.current ? { animation: "pulse-dot 2s ease-in-out infinite" } : {}} />
                      </div>
                      <div
                        className={`flex-1 bg-white rounded-2xl border shadow-sm transition-all duration-300 cursor-pointer ${isOpen ? "border-[#E8D9C0] shadow-md" : "border-stone-100 hover:-translate-y-0.5 hover:shadow-md"}`}
                        onClick={() => setExpandedExp(isOpen ? null : i)}
                      >
                        {/* Header — always visible */}
                        <div className="flex items-start justify-between gap-2 p-5 md:p-6">
                          <div className="flex-1">
                            <h3 className="text-base font-semibold text-slate-700">{exp.title}</h3>
                            <p className={`text-sm font-medium ${a.text}`}>{exp.company}</p>
                            {"badge" in exp && exp.badge && (
                              <span className={`inline-block text-xs px-2.5 py-0.5 rounded-full ${a.bg} ${a.text} font-medium mt-1.5`}>{exp.badge}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <div className="text-right">
                              <p className="text-sm text-slate-400">{exp.period}</p>
                              <p className="text-xs text-slate-300">{exp.location}</p>
                            </div>
                            {/* Chevron */}
                            <svg
                              className={`w-4 h-4 text-slate-300 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                              fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>

                        {/* Expandable bullets */}
                        <div
                          className="overflow-hidden transition-all duration-300"
                          style={{ maxHeight: isOpen ? "400px" : "0px", opacity: isOpen ? 1 : 0 }}
                        >
                          <ul className="px-5 md:px-6 pb-5 space-y-2 border-t border-stone-50 pt-3">
                            {exp.bullets.map((b, j) => (
                              <li
                                key={j}
                                className="text-sm text-slate-500 flex gap-2"
                                style={{ animation: isOpen ? `fadeInUp 0.3s ${j * 0.08}s ease-out both` : "none" }}
                              >
                                <span className={`${a.text} flex-shrink-0 mt-0.5`}>&#9657;</span>
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Projects" subtitle="Things I've built and explored" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, i) => {
              const a = A[proj.accent];
              return (
                <FadeIn key={i}>
                  <div className="bg-white border border-stone-100 rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
                    <div className={`h-1 ${a.bar}`} />
                    <div className="p-6 flex-1">
                      <h3 className="text-base font-semibold text-slate-700 mb-3 leading-snug">{proj.title}</h3>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {proj.tech.map((t) => (
                          <span key={t} className={`text-xs px-2 py-0.5 rounded-full ${a.bg} ${a.text} cursor-default`}>{t}</span>
                        ))}
                      </div>
                      <ul className="space-y-1.5">
                        {proj.bullets.map((b, j) => (
                          <li key={j} className="text-sm text-slate-500 flex gap-2">
                            <span className={`${a.text} flex-shrink-0 mt-0.5`}>&#9657;</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="px-6 pb-5">
                      <a href="https://github.com/aditigode" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1.5 text-xs font-medium ${a.text} hover:underline`}>
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
                        View on GitHub
                      </a>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="py-16 bg-[#F2EDE6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Skills" subtitle="Technologies and tools I work with" />
          <FadeIn>
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 md:p-8 space-y-6">
              {Object.entries(skillGroups).map(([category, { list, accent }]) => {
                const a = A[accent];
                return (
                  <div key={category}>
                    <h3 className={`text-xs font-semibold uppercase tracking-wider ${a.text} mb-3`}>{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {list.map((skill) => (
                        <span key={skill} className={`text-sm px-3 py-1 rounded-full ${a.bg} ${a.text} border ${a.border} cursor-default`}>{skill}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Education ── */}
      <section id="education" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Education" subtitle="Where I studied and what I learned" />
          <FadeIn>
            <div className="grid md:grid-cols-2 gap-6">
              {education.map((edu, i) => {
                const a = A[edu.accent];
                return (
                  <div key={i} className="bg-white border border-stone-100 shadow-sm rounded-2xl p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                    <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${a.bg} ${a.text} mb-4`}>{edu.period}</span>
                    <h3 className="text-lg font-semibold text-slate-700 mb-1">{edu.degree}</h3>
                    <p className={`font-medium text-sm ${a.text} mb-2`}>{edu.school}</p>
                    <p className="text-sm text-slate-400 mb-3">GPA: {edu.gpa}{"note" in edu && edu.note ? ` · ${edu.note}` : ""}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.courses.map((c) => (
                        <span key={c} className={`text-xs px-2 py-0.5 rounded-full ${a.bg} ${a.text}`}>{c}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 bg-gradient-to-br from-[#FAF4EC] via-[#F8F7F4] to-stone-50 relative overflow-hidden">
        <Doodle className="bottom-10 left-8 hidden lg:block" anim="floatSlow 7s ease-in-out infinite">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" stroke="#C4A882" strokeWidth="1" opacity="0.15" strokeLinecap="round">
            <path d="M25 5l6 14h15l-12 9 5 14-14-10-14 10 5-14L4 19h15z" />
          </svg>
        </Doodle>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl font-bold text-slate-700 mb-3" style={hw}>Get In Touch</h2>
            <WavyLine />
            <p className="text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed">
              I&apos;m always open to discussing new opportunities, collaborations, or interesting ideas. Feel free to reach out!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:adigode@iu.edu" className="flex items-center gap-2 bg-[#C4A882] text-white px-6 py-3 rounded-full font-medium hover:bg-[#B09060] hover:-translate-y-0.5 transition-all duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Email Me
              </a>
              <a href="https://linkedin.com/in/aditi-gode" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-stone-200 bg-white text-slate-600 px-6 py-3 rounded-full font-medium hover:bg-stone-50 hover:-translate-y-0.5 transition-all duration-300">
                <svg className="w-4 h-4 text-[#8B6830]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                LinkedIn
              </a>
              <a href="https://github.com/aditigode" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-stone-200 bg-white text-slate-600 px-6 py-3 rounded-full font-medium hover:bg-stone-50 hover:-translate-y-0.5 transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
                GitHub
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-6 bg-[#F8F7F4] border-t border-stone-200 text-center text-sm text-slate-300">
        <p>© {new Date().getFullYear()} Aditi Gode · Built with Next.js & Tailwind CSS</p>
      </footer>
    </div>
  );
}

/* ─────────────── shared components ─────────────── */

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-10">
      <h2 className="text-4xl font-bold text-slate-700 mb-1" style={hw}>{title}</h2>
      {subtitle && <p className="text-sm text-slate-400 mb-3">{subtitle}</p>}
      <WavyLine align="left" />
    </div>
  );
}

function WavyLine({ align = "center" }: { align?: "left" | "center" }) {
  return (
    <svg width="60" height="8" viewBox="0 0 60 8" fill="none" className={`${align === "center" ? "mx-auto" : ""} mb-2`}>
      <path
        d="M2 4 Q8 0, 14 4 Q20 8, 26 4 Q32 0, 38 4 Q44 8, 50 4 Q56 0, 58 4"
        stroke="#C4A882" strokeWidth="2" strokeLinecap="round" fill="none"
        strokeDasharray="100"
        style={{ animation: "draw-line 0.6s ease-out forwards" }}
      />
    </svg>
  );
}

function Doodle({ children, className = "", anim }: { children: React.ReactNode; className?: string; anim: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`} style={{ animation: anim }}>
      {children}
    </div>
  );
}
