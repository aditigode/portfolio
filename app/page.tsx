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
  { label: "Music", desc: "Always have my headphones on",
    icon: <svg width="28" height="28" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 28V16a8 8 0 0116 0v12" /><rect x="5" y="26" width="5" height="7" rx="2.5" /><rect x="26" y="26" width="5" height="7" rx="2.5" /></svg> },
  { label: "Reading", desc: "Lost in a good book",
    icon: <svg width="28" height="28" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8c4-2 8-1 13 2 5-3 9-4 13-2v20c-4-2-8-1-13 2-5-3-9-4-13-2V8z" /><path d="M18 10v20" /></svg> },
  { label: "Travel", desc: "Exploring new places",
    icon: <svg width="28" height="28" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="12" /><ellipse cx="18" cy="18" rx="5" ry="12" /><path d="M6 14h24M6 22h24" /></svg> },
];

/* ─────────────── skill avatars ─────────────── */

const skillAvatars = [
  {
    id: "ml", label: "Machine Learning", skills: ["TensorFlow", "Keras", "Scikit-Learn", "NumPy"],
    anim: "floatSlow 6s ease-in-out infinite",
    svg: (
      <svg width="80" height="90" viewBox="0 0 80 90" fill="none">
        <line x1="40" y1="22" x2="40" y2="10" stroke="#C4A882" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="40" cy="7" r="4" fill="#C4A882"/>
        <rect x="16" y="22" width="48" height="38" rx="10" fill="#FAF4EC" stroke="#C4A882" strokeWidth="2"/>
        <circle cx="30" cy="37" r="7" fill="white" stroke="#C4A882" strokeWidth="1.5"/>
        <circle cx="50" cy="37" r="7" fill="white" stroke="#C4A882" strokeWidth="1.5"/>
        <circle cx="30" cy="37" r="3" fill="#C4A882"/><circle cx="50" cy="37" r="3" fill="#C4A882"/>
        <circle cx="31.5" cy="35.5" r="1" fill="white"/><circle cx="51.5" cy="35.5" r="1" fill="white"/>
        <rect x="26" y="51" width="3" height="4" rx="1" fill="#C4A882" opacity="0.6"/>
        <rect x="31" y="49" width="3" height="6" rx="1" fill="#C4A882" opacity="0.8"/>
        <rect x="36" y="50" width="3" height="5" rx="1" fill="#C4A882"/>
        <rect x="41" y="48" width="3" height="7" rx="1" fill="#C4A882" opacity="0.8"/>
        <rect x="46" y="51" width="3" height="4" rx="1" fill="#C4A882" opacity="0.6"/>
        <rect x="22" y="62" width="36" height="22" rx="8" fill="#FAF4EC" stroke="#C4A882" strokeWidth="1.5"/>
        <path d="M30 71 h5 v3 h5" stroke="#C4A882" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
        <circle cx="44" cy="74" r="2.5" fill="none" stroke="#C4A882" strokeWidth="1" opacity="0.5"/>
        <rect x="8" y="63" width="14" height="8" rx="4" fill="#FAF4EC" stroke="#C4A882" strokeWidth="1.5"/>
        <rect x="58" y="63" width="14" height="8" rx="4" fill="#FAF4EC" stroke="#C4A882" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: "cv", label: "Computer Vision", skills: ["VGG16", "OpenCV", "FER2013", "Keras"],
    anim: "float 5s 0.5s ease-in-out infinite",
    svg: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <path d="M8 40 Q40 8 72 40 Q40 72 8 40Z" fill="#FAF4EC" stroke="#C4A882" strokeWidth="2"/>
        <circle cx="40" cy="40" r="16" fill="white" stroke="#C4A882" strokeWidth="1.5"/>
        <circle cx="40" cy="40" r="10" fill="#FAF4EC" stroke="#C4A882" strokeWidth="1.5"/>
        <circle cx="40" cy="40" r="5" fill="#C4A882"/>
        <circle cx="42" cy="38" r="1.5" fill="white"/>
        <line x1="40" y1="30" x2="40" y2="34" stroke="#C4A882" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="40" y1="46" x2="40" y2="50" stroke="#C4A882" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="30" y1="40" x2="34" y2="40" stroke="#C4A882" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="46" y1="40" x2="50" y2="40" stroke="#C4A882" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 33 L20 33" stroke="#C4A882" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <path d="M14 40 L20 40" stroke="#C4A882" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <path d="M14 47 L20 47" stroke="#C4A882" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <path d="M60 33 L66 33" stroke="#C4A882" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <path d="M60 40 L66 40" stroke="#C4A882" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <path d="M60 47 L66 47" stroke="#C4A882" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <path d="M28 20 L30 26" stroke="#C4A882" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M40 16 L40 22" stroke="#C4A882" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M52 20 L50 26" stroke="#C4A882" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "linux", label: "Linux", skills: ["Bash", "Shell Scripting", "PowerShell", "OpenStack"],
    anim: "floatReverse 7s 1s ease-in-out infinite",
    svg: (
      <svg width="80" height="90" viewBox="0 0 80 90" fill="none">
        <ellipse cx="40" cy="58" rx="24" ry="28" fill="#2d2d2d"/>
        <ellipse cx="40" cy="62" rx="15" ry="20" fill="#FAF4EC"/>
        <ellipse cx="40" cy="28" rx="20" ry="20" fill="#2d2d2d"/>
        <ellipse cx="40" cy="30" rx="13" ry="14" fill="#FAF4EC"/>
        <circle cx="34" cy="24" r="4" fill="white"/><circle cx="46" cy="24" r="4" fill="white"/>
        <circle cx="34" cy="24" r="2.5" fill="#C4A882"/><circle cx="46" cy="24" r="2.5" fill="#C4A882"/>
        <circle cx="35" cy="23" r="1" fill="white"/><circle cx="47" cy="23" r="1" fill="white"/>
        <path d="M36 33 L40 39 L44 33Z" fill="#C4A882"/>
        <circle cx="29" cy="31" r="4" fill="#C4A882" opacity="0.25"/>
        <circle cx="51" cy="31" r="4" fill="#C4A882" opacity="0.25"/>
        <ellipse cx="16" cy="60" rx="8" ry="16" fill="#2d2d2d" transform="rotate(-15 16 60)"/>
        <ellipse cx="64" cy="60" rx="8" ry="16" fill="#2d2d2d" transform="rotate(15 64 60)"/>
        <ellipse cx="32" cy="85" rx="9" ry="5" fill="#C4A882"/>
        <ellipse cx="48" cy="85" rx="9" ry="5" fill="#C4A882"/>
      </svg>
    ),
  },
  {
    id: "db", label: "Databases", skills: ["MySQL", "MongoDB", "SQL", "ServiceNow"],
    anim: "drift 8s 0.5s ease-in-out infinite",
    svg: (
      <svg width="80" height="90" viewBox="0 0 80 90" fill="none">
        <ellipse cx="40" cy="18" rx="28" ry="10" fill="#FAF4EC" stroke="#C4A882" strokeWidth="2"/>
        <rect x="12" y="18" width="56" height="20" fill="#FAF4EC" stroke="#C4A882" strokeWidth="2"/>
        <ellipse cx="40" cy="38" rx="28" ry="10" fill="#FAF4EC" stroke="#C4A882" strokeWidth="2"/>
        <rect x="12" y="38" width="56" height="18" fill="#F5EFE8" stroke="#C4A882" strokeWidth="2"/>
        <ellipse cx="40" cy="56" rx="28" ry="10" fill="#F5EFE8" stroke="#C4A882" strokeWidth="2"/>
        <rect x="12" y="56" width="56" height="18" fill="#EDE5D8" stroke="#C4A882" strokeWidth="2"/>
        <ellipse cx="40" cy="74" rx="28" ry="10" fill="#EDE5D8" stroke="#C4A882" strokeWidth="2"/>
        <line x1="22" y1="27" x2="58" y2="27" stroke="#C4A882" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
        <line x1="22" y1="31" x2="50" y2="31" stroke="#C4A882" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
        <line x1="22" y1="46" x2="58" y2="46" stroke="#C4A882" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
        <line x1="22" y1="50" x2="44" y2="50" stroke="#C4A882" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
        <line x1="22" y1="63" x2="58" y2="63" stroke="#C4A882" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
        <circle cx="28" cy="18" r="3" fill="#C4A882"/>
        <circle cx="40" cy="14" r="3" fill="#C4A882" opacity="0.7"/>
        <circle cx="52" cy="18" r="3" fill="#C4A882"/>
      </svg>
    ),
  },
  {
    id: "music", label: "Music", skills: ["Always on headphones", "Indie · Pop · Lo-fi"],
    anim: "floatSlow 9s 2s ease-in-out infinite",
    svg: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <path d="M14 48 C14 24 66 24 66 48" stroke="#C4A882" strokeWidth="5" strokeLinecap="round" fill="none"/>
        <rect x="6" y="44" width="16" height="24" rx="8" fill="#FAF4EC" stroke="#C4A882" strokeWidth="2"/>
        <rect x="10" y="49" width="8" height="14" rx="4" fill="#C4A882" opacity="0.3"/>
        <rect x="58" y="44" width="16" height="24" rx="8" fill="#FAF4EC" stroke="#C4A882" strokeWidth="2"/>
        <rect x="62" y="49" width="8" height="14" rx="4" fill="#C4A882" opacity="0.3"/>
        <path d="M24 56 L28 48 L32 60 L36 44 L40 58 L44 50 L48 62 L52 48 L56 56" stroke="#C4A882" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
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

const editorial = { fontFamily: "var(--font-playfair), Georgia, serif" };
const hw        = { fontFamily: "var(--font-caveat), cursive" };

/* ─────────────── scroll-fade hook ─────────────── */

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.1 }
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

/* ─────────────── SkillAvatar ─────────────── */

function SkillAvatar({ avatar }: { avatar: typeof skillAvatars[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative flex flex-col items-center cursor-pointer select-none"
      style={{ animation: avatar.anim }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="transition-transform duration-200" style={{ transform: hovered ? "scale(1.12)" : "scale(1)" }}>
        {avatar.svg}
      </div>
      <span className="mt-1 text-xs font-medium text-[#8B6830] text-center" style={hw}>{avatar.label}</span>
      {hovered && (
        <div className="absolute -top-2 left-1/2 z-20 pointer-events-none" style={{ transform: "translate(-50%, -100%)" }}>
          <div className="bg-white/95 backdrop-blur-sm border border-[#E8D9C0] rounded-xl shadow-lg px-4 py-3 min-w-[140px] text-center">
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

/* ─────────────── Home ─────────────── */

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
    const sections = navLinks.map((l) => document.getElementById(l.toLowerCase())).filter(Boolean) as HTMLElement[];
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-sm border-b border-stone-100" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="font-bold text-xl tracking-tight text-white" style={{ ...editorial, color: scrolled ? "#111" : "white" }}>
              AG
            </a>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.toLowerCase();
                return (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className={`relative text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
                      scrolled
                        ? isActive ? "text-[#111]" : "text-stone-400 hover:text-[#111]"
                        : isActive ? "text-white" : "text-white/50 hover:text-white"
                    }`}
                  >
                    {link}
                    {isActive && <div className="absolute -bottom-1 left-0 right-0 h-px bg-[#C4A882]" style={{ animation: "draw-line 0.4s ease-out forwards" }} />}
                  </a>
                );
              })}
              <a
                href="/portfolio/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs font-semibold uppercase tracking-[0.2em] border px-4 py-2 transition-all duration-200 hover:-translate-y-px ${
                  scrolled ? "border-[#111] text-[#111] hover:bg-[#111] hover:text-white" : "border-white/40 text-white hover:bg-white hover:text-[#111]"
                }`}
              >
                Resume
              </a>
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 ${scrolled ? "text-[#111]" : "text-white"}`}
              aria-label="Toggle menu"
            >
              {menuOpen
                ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              }
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400 hover:text-[#111] py-3 border-b border-stone-50">{link}</a>
            ))}
            <a href="/portfolio/Resume.pdf" target="_blank" rel="noopener noreferrer" className="block text-center text-xs font-semibold uppercase tracking-[0.2em] border border-[#111] text-[#111] px-4 py-3 mt-3 hover:bg-[#111] hover:text-white transition-colors">Resume</a>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="min-h-screen flex flex-col bg-[#0F0F0F] pt-16 relative overflow-hidden">

        {/* Top meta bar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center gap-6 py-8 border-b border-white/10">
            <span className="text-[#C4A882] text-xs font-semibold uppercase tracking-[0.3em]">Portfolio · {new Date().getFullYear()}</span>
            <div className="flex-1" />
            <span className="text-white/25 text-xs uppercase tracking-[0.2em] hidden sm:block">Cloud · ML · Infrastructure</span>
          </div>
        </div>

        {/* Main */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center py-12">
          <p className="text-[#C4A882] text-xs uppercase tracking-[0.35em] font-semibold mb-6" style={{ animation: "fadeInUp 0.5s 0.1s ease-out both" }}>
            Hello, I&apos;m
          </p>
          <h1
            className="font-black text-white leading-[0.88] tracking-tight mb-8"
            style={{ ...editorial, fontSize: "clamp(4.5rem, 13vw, 11rem)", animation: "fadeInUp 0.6s 0.2s ease-out both" }}
          >
            ADITI<br />GODE
          </h1>
          <div className="w-20 h-0.5 bg-[#C4A882] mb-8" style={{ animation: "fadeInUp 0.5s 0.35s ease-out both" }} />
          <div className="grid md:grid-cols-2 gap-8 items-end max-w-3xl" style={{ animation: "fadeInUp 0.6s 0.45s ease-out both" }}>
            <div>
              <p className="text-[#C4A882] text-xs uppercase tracking-[0.25em] font-semibold mb-2">Director · Cloud & Infrastructure</p>
              <p className="text-white text-2xl font-light" style={editorial}>Morgan Stanley</p>
            </div>
            <p className="text-white/45 leading-relaxed text-sm">
              Building secure, scalable database infrastructure and self-service solutions. Passionate about data security, distributed systems, and machine learning.
            </p>
          </div>
        </div>

        {/* Bottom CTA bar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-wrap items-center justify-between gap-4 py-8 border-t border-white/10" style={{ animation: "fadeInUp 0.6s 0.6s ease-out both" }}>
            <div className="flex gap-3">
              <a href="#projects" className="text-sm font-semibold bg-[#C4A882] text-white px-6 py-2.5 hover:bg-[#B09060] transition-colors duration-200">
                View Projects
              </a>
              <a href="#contact" className="text-sm font-semibold border border-white/25 text-white px-6 py-2.5 hover:bg-white/10 transition-colors duration-200">
                Get In Touch
              </a>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="https://linkedin.com/in/aditi-gode" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors">LinkedIn</a>
              <a href="https://github.com/aditigode" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors">GitHub</a>
              <a href="/portfolio/Resume.pdf" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors">Resume</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pull-quote stats strip ── */}
      <div className="bg-[#FAF4EC] border-y border-[#E8D9C0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#E8D9C0]">
            {[
              { value: "85%",  label: "Incident reduction",  sub: "PowerShell automation" },
              { value: "3.9",  label: "MS GPA",              sub: "Indiana University" },
              { value: "#1",   label: "Department rank",     sub: "University of Mumbai" },
              { value: "140+", label: "Students mentored",   sub: "Applied ML · IU" },
            ].map((stat) => (
              <div key={stat.value} className="py-8 px-4 md:px-8 text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#111] leading-none" style={editorial}>{stat.value}</div>
                <div className="text-[10px] font-semibold text-[#8B6830] uppercase tracking-[0.2em] mt-2">{stat.label}</div>
                <div className="text-[10px] text-stone-400 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── About ── */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="01 — Profile" title="About Me" />

          <FadeIn>
            <div className="grid md:grid-cols-5 gap-12 items-start">
              {/* Photo */}
              <div className="md:col-span-2">
                <Image
                  src="/portfolio/portfolio_picture.jpg"
                  alt="Aditi Gode"
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover rounded-sm border border-stone-100"
                  priority
                />
                <p className="text-[10px] text-stone-400 mt-2 uppercase tracking-[0.2em]">Aditi Gode · Cloud & Infrastructure</p>
              </div>

              {/* Bio */}
              <div className="md:col-span-3">
                <p className="text-[#C4A882] text-[10px] uppercase tracking-[0.3em] font-semibold mb-5">By Aditi Gode</p>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    I&apos;m a Cloud & Infrastructure Engineer at Morgan Stanley, where I hold the title of Director. I focus on building secure self-service database solutions and infrastructure to detect and remediate unauthorized database access.
                  </p>
                  <p>
                    I hold a Master&apos;s in Computer Science from Indiana University Bloomington (GPA: 3.9), with deep expertise spanning machine learning, distributed systems, and cloud computing.
                  </p>
                  <p>
                    My journey spans research in ML-driven data visualization, teaching graduate-level ML, and enterprise system engineering at Citibank and StateStreet.
                  </p>
                </div>

                {/* Pull quote */}
                <blockquote className="border-l-4 border-[#C4A882] pl-6 my-8">
                  <p className="text-lg md:text-xl text-[#111] font-medium italic leading-snug" style={editorial}>
                    &ldquo;Building infrastructure that detects and removes unauthorized access — security at scale.&rdquo;
                  </p>
                </blockquote>

                <div className="flex flex-wrap gap-5 pt-2">
                  <a href="https://linkedin.com/in/aditi-gode" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#111] border-b border-[#C4A882] pb-0.5 hover:text-[#C4A882] transition-colors">LinkedIn</a>
                  <a href="https://github.com/aditigode" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#111] border-b border-[#C4A882] pb-0.5 hover:text-[#C4A882] transition-colors">GitHub</a>
                  <a href="/portfolio/Resume.pdf" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#111] border-b border-[#C4A882] pb-0.5 hover:text-[#C4A882] transition-colors">Resume</a>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Skill avatars */}
          <FadeIn className="mt-20 pt-12 border-t border-stone-100">
            <p className="text-[10px] text-[#C4A882] uppercase tracking-[0.3em] font-semibold mb-10">What I work with · hover to explore</p>
            <div className="flex flex-wrap gap-8 md:gap-12 justify-start items-end">
              {skillAvatars.map((avatar) => <SkillAvatar key={avatar.id} avatar={avatar} />)}
            </div>
          </FadeIn>

          {/* Beyond the Code */}
          <FadeIn className="mt-20 pt-12 border-t border-stone-100">
            <p className="text-[10px] text-[#C4A882] uppercase tracking-[0.3em] font-semibold mb-8">Outside the office</p>
            <div className="flex flex-wrap gap-4">
              {interests.map((item) => (
                <div key={item.label} className="group flex items-center gap-3 border border-stone-200 px-5 py-3 hover:-translate-y-0.5 hover:border-[#C4A882] transition-all duration-200 cursor-default">
                  <div className="text-[#C4A882]">{item.icon}</div>
                  <div>
                    <div className="text-sm font-semibold text-[#111]" style={editorial}>{item.label}</div>
                    <div className="text-xs text-stone-400">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="py-24 bg-[#F8F7F4]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="02 — Career" title="Experience" />
          <p className="text-xs text-stone-400 uppercase tracking-[0.2em] mb-10 -mt-6">Click any role to expand details</p>
          <div className="space-y-3">
            {experiences.map((exp, i) => {
              const a = A[exp.accent];
              const isOpen = expandedExp === i;
              return (
                <FadeIn key={i}>
                  <div
                    className={`border transition-all duration-300 cursor-pointer ${isOpen ? "border-[#C4A882] bg-white" : "border-stone-200 bg-white hover:border-stone-300"}`}
                    onClick={() => setExpandedExp(isOpen ? null : i)}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 p-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                          {exp.current && <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C4A882] border border-[#C4A882] px-2 py-0.5">Current</span>}
                          {"badge" in exp && exp.badge && !exp.current && <span className={`text-[10px] font-semibold uppercase tracking-widest ${a.text}`}>{exp.badge}</span>}
                        </div>
                        <h3 className="text-lg font-bold text-[#111] leading-tight" style={editorial}>{exp.title}</h3>
                        <p className={`text-sm font-semibold mt-1 ${a.text}`}>{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-stone-400 uppercase tracking-wider">{exp.period}</p>
                          <p className="text-xs text-stone-300 mt-0.5">{exp.location}</p>
                        </div>
                        <svg className={`w-4 h-4 text-stone-300 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {/* Period on mobile */}
                    <div className="sm:hidden px-6 pb-3 -mt-3">
                      <p className="text-xs text-stone-400 uppercase tracking-wider">{exp.period} · {exp.location}</p>
                    </div>
                    {/* Expandable bullets */}
                    <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: isOpen ? "400px" : "0px", opacity: isOpen ? 1 : 0 }}>
                      <ul className="px-6 pb-6 space-y-2.5 border-t border-stone-100 pt-4">
                        {exp.bullets.map((b, j) => (
                          <li key={j} className="text-sm text-slate-500 flex gap-3" style={{ animation: isOpen ? `fadeInUp 0.3s ${j * 0.08}s ease-out both` : "none" }}>
                            <span className="text-[#C4A882] flex-shrink-0 mt-0.5 text-xs">&#9656;</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="03 — Work" title="Projects" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-100">
            {projects.map((proj, i) => {
              const a = A[proj.accent];
              return (
                <FadeIn key={i}>
                  <div className="bg-white p-6 flex flex-col h-full hover:bg-[#FAF4EC] transition-colors duration-300 group">
                    <div className={`w-8 h-0.5 ${a.bar} mb-5`} />
                    <h3 className="text-base font-bold text-[#111] mb-4 leading-snug group-hover:text-[#8B6830] transition-colors duration-200" style={editorial}>{proj.title}</h3>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.tech.map((t) => (
                        <span key={t} className={`text-[10px] px-2 py-0.5 uppercase tracking-wider font-medium ${a.bg} ${a.text} border ${a.border}`}>{t}</span>
                      ))}
                    </div>
                    <ul className="space-y-2 flex-1">
                      {proj.bullets.map((b, j) => (
                        <li key={j} className="text-xs text-slate-500 flex gap-2 leading-relaxed">
                          <span className={`${a.text} flex-shrink-0 mt-0.5`}>&#9656;</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 pt-4 border-t border-stone-100">
                      <a href="https://github.com/aditigode" target="_blank" rel="noopener noreferrer" className={`text-[10px] uppercase tracking-[0.2em] font-semibold ${a.text} hover:underline flex items-center gap-1.5`}>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
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
      <section id="skills" className="py-24 bg-[#F8F7F4]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="04 — Expertise" title="Skills" />
          <FadeIn>
            <div className="bg-white border border-stone-100 p-8 space-y-7">
              {Object.entries(skillGroups).map(([category, { list, accent }]) => {
                const a = A[accent];
                return (
                  <div key={category} className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8">
                    <h3 className={`text-[10px] font-bold uppercase tracking-[0.25em] ${a.text} sm:w-40 shrink-0 mt-1`}>{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {list.map((skill) => (
                        <span key={skill} className={`text-xs px-3 py-1 border font-medium ${a.bg} ${a.text} ${a.border} cursor-default`}>{skill}</span>
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
      <section id="education" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="05 — Academic" title="Education" />
          <FadeIn>
            <div className="grid md:grid-cols-2 gap-px bg-stone-100">
              {education.map((edu, i) => {
                const a = A[edu.accent];
                return (
                  <div key={i} className="bg-white p-8 hover:bg-[#FAF4EC] transition-colors duration-300">
                    <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${a.text}`}>{edu.period}</span>
                    <h3 className="text-xl font-bold text-[#111] mt-3 mb-1 leading-snug" style={editorial}>{edu.degree}</h3>
                    <p className={`text-sm font-semibold ${a.text} mb-1`}>{edu.school}</p>
                    <p className="text-sm text-stone-400 mb-5">GPA: {edu.gpa}{"note" in edu && edu.note ? ` · ${edu.note}` : ""}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.courses.map((c) => (
                        <span key={c} className={`text-[10px] px-2 py-0.5 uppercase tracking-wider font-medium border ${a.bg} ${a.text} ${a.border}`}>{c}</span>
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
      <section id="contact" className="py-24 bg-[#0F0F0F] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-[#C4A882]" />
              <span className="text-[#C4A882] text-[10px] uppercase tracking-[0.3em] font-semibold">06 — Contact</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" style={editorial}>
              Get In<br />Touch
            </h2>
            <div className="w-16 h-0.5 bg-[#C4A882] mb-8" />
            <p className="text-white/40 max-w-md mb-12 leading-relaxed">
              Open to discussing new opportunities, collaborations, or interesting ideas. Feel free to reach out.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="mailto:adigode@iu.edu" className="flex items-center gap-2 bg-[#C4A882] text-white text-sm font-semibold px-6 py-3 hover:bg-[#B09060] transition-colors duration-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Email Me
              </a>
              <a href="https://linkedin.com/in/aditi-gode" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-white/20 text-white text-sm font-semibold px-6 py-3 hover:bg-white/10 transition-colors duration-200">LinkedIn</a>
              <a href="https://github.com/aditigode" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-white/20 text-white text-sm font-semibold px-6 py-3 hover:bg-white/10 transition-colors duration-200">GitHub</a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-6 bg-[#0a0a0a] border-t border-white/5 text-center">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.3em]">© {new Date().getFullYear()} Aditi Gode · Built with Next.js & Tailwind CSS</p>
      </footer>
    </div>
  );
}

/* ─────────────── shared components ─────────────── */

function SectionHeading({ label, title }: { label?: string; title: string }) {
  return (
    <div className="mb-12">
      {label && (
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-px bg-[#C4A882]" />
          <span className="text-[#C4A882] text-[10px] font-bold uppercase tracking-[0.3em]">{label}</span>
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-bold text-[#111] leading-tight" style={editorial}>{title}</h2>
      <div className="w-full h-px bg-stone-200 mt-6" />
    </div>
  );
}
