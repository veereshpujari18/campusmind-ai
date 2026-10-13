import React, { useState } from 'react';
import {
  ArrowRight,
  GraduationCap,
  Award,
  Briefcase,
  Target,
  Code,
  Calculator,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  TrendingUp,
  ShieldCheck,
  Star,
  Users,
  Compass,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';

export const LandingPage: React.FC = () => {
  const { openAuthModal, setCurrentTab, isAuthenticated } = useApp();
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  const handleCtaClick = () => {
    if (isAuthenticated) {
      setCurrentTab('dashboard');
    } else {
      openAuthModal('signup');
    }
  };

  const handleSignInClick = () => {
    if (isAuthenticated) {
      setCurrentTab('dashboard');
    } else {
      openAuthModal('login');
    }
  };

  const scrollToFeatures = () => {
    const el = document.getElementById('features-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      title: 'Academic Performance',
      description: 'Track internal marks, external grades, credits, attendance percentages, and dynamic semester SGPA.',
      icon: <GraduationCap className="w-5 h-5 text-indigo-600" />,
      tab: 'academics' as const,
    },
    {
      title: 'Scholarship Finder',
      description: 'Filter government, private, and global corporate scholarships by eligibility, category, and income limits.',
      icon: <Award className="w-5 h-5 text-emerald-600" />,
      tab: 'scholarships' as const,
    },
    {
      title: 'Internship Kanban',
      description: 'Drag & track job applications across Wishlist, Applied, Online Assessment, Interview, and Offer stages.',
      icon: <Briefcase className="w-5 h-5 text-blue-600" />,
      tab: 'internships' as const,
    },
    {
      title: 'Placement Preparation',
      description: 'Targeted roadmaps for Core CS (DBMS, OS, CN), Java, Python, SQL, System Design, and Behavioral HR rounds.',
      icon: <Target className="w-5 h-5 text-purple-600" />,
      tab: 'placement' as const,
    },
    {
      title: 'DSA Practice Tracker',
      description: 'Monitor problem solving across 11 core data structure patterns with status tags and LeetCode deep links.',
      icon: <Code className="w-5 h-5 text-violet-600" />,
      tab: 'dsa' as const,
    },
    {
      title: 'CGPA & SGPA Calculator',
      description: 'Accurately forecast your cumulative GPA with customizable 10-point grade scales and printable report cards.',
      icon: <Calculator className="w-5 h-5 text-amber-600" />,
      tab: 'cgpa' as const,
    },
    {
      title: 'AI Study Assistant',
      description: 'Instant conceptual explanations, SQL query checks, and exam prep outlines tailored for engineering syllabi.',
      icon: <Sparkles className="w-5 h-5 text-indigo-600" />,
      tab: 'assistant' as const,
    },
    {
      title: 'College Resources Hub',
      description: 'Access department lecture notes, solved previous year university question papers, and lab manuals.',
      icon: <BookOpen className="w-5 h-5 text-rose-600" />,
      tab: 'resources' as const,
    },
  ];

  const stats = [
    { value: '15,000+', label: 'Engineering Students Active' },
    { value: '₹1.4 Cr+', label: 'Scholarships Unlocked' },
    { value: '94.2%', label: 'Campus Placement Rate' },
    { value: '180,000+', label: 'DSA Problems Solved' },
  ];

  const steps = [
    {
      num: '01',
      title: 'Organize Your Academics',
      desc: 'Input your semester subjects, track attendance against the 75% bar, and simulate your target CGPA.',
    },
    {
      num: '02',
      title: 'Discover Verified Opportunities',
      desc: 'Match your criteria with active scholarships and track your summer internship applications on a Kanban board.',
    },
    {
      num: '03',
      title: 'Conquer Placements & Coding',
      desc: 'Master curated DSA patterns, review OS & DBMS core cheat sheets, and practice behavioral STAR answers.',
    },
  ];

  const testimonials = [
    {
      name: 'Rohan Deshmukh',
      college: 'COEP Technological University',
      role: 'Incoming SDE @ Microsoft',
      text: 'StudentOS replaced my chaotic mess of 15 WhatsApp groups and 4 disconnected spreadsheets. The DSA tracker and Core CS cheat sheets were instrumental in clearing my Microsoft technical interviews.',
    },
    {
      name: 'Sneha Venkatesh',
      college: 'PES University, Bengaluru',
      role: 'Reliance Foundation Scholar & Amazon Intern',
      text: 'I found the Reliance Foundation Scholarship through the eligibility finder on StudentOS and received ₹2,00,000 in tuition aid. The application deadlines reminder kept me right on schedule!',
    },
    {
      name: 'Aditya Kulkarni',
      college: 'Thapar Institute of Engineering',
      role: '6th Sem CSE Undergrad (CGPA 9.2)',
      text: 'The SGPA calculator and attendance tracker gave me total clarity on which courses needed more attention before end-semesters. It looks and feels like a modern Silicon Valley product.',
    },
  ];

  const faqs = [
    {
      q: 'Is StudentOS completely free for engineering students?',
      a: 'Yes, StudentOS is 100% free for college students. You can manage all your semesters, track internships, find scholarships, and practice DSA without any subscription fees.',
    },
    {
      q: 'Can I customize the grading scale and credit values for my university?',
      a: 'Absolutely. Whether your college follows a 10-point scale (O, A+, A, B+...) or a 4.0 GPA scale, you can configure grades, credits, internal marks, and exam weightings.',
    },
    {
      q: 'Are the scholarships updated for the current academic year?',
      a: 'Yes! StudentOS indexes scholarships from central government portals (NSP), state schemes, and top tech foundations (Google, Reliance, Tata, Siemens) with verified eligibility deadlines.',
    },
    {
      q: 'How does the Internship Tracker help during placement season?',
      a: 'It provides a visual Kanban board to track every stage from Wishlist to Online Assessment, Interview rounds, and Final Offers, ensuring you never miss a submission or interview time.',
    },
    {
      q: 'Can I export my CGPA breakdown and resume details?',
      a: 'Yes, you can generate clean printable grade card reports and keep your profile ready for recruiter referrals with direct GitHub, LinkedIn, and project links.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header adhering to Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <Logo size="md" />

          {/* Zone 2: Concise Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={scrollToFeatures}
              className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Features
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('how-it-works');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              How It Works
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('testimonials');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Student Stories
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('faq');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              FAQ
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleSignInClick}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
            >
              {isAuthenticated ? 'Open Dashboard' : 'Sign In'}
            </button>
            <button
              onClick={handleCtaClick}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm shadow-indigo-500/20 whitespace-nowrap flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 rounded-lg text-xs font-medium text-indigo-700 dark:text-indigo-300">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>The All-In-One Platform for Engineering Students</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] text-balance">
                Your College Life. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Organized.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                StudentOS brings academics, scholarships, internships, coding preparation, and career resources into one intelligent, cohesive operating platform.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={handleCtaClick}
                  className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 group"
                >
                  <span>Launch StudentOS</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={scrollToFeatures}
                  className="w-full sm:w-auto px-5 py-3.5 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-800 font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4 text-slate-500" />
                  <span>Explore Features</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Free Forever for Students</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Verified Scholarship Data</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Zero Spam or Clutter</span>
                </div>
              </div>
            </div>

            {/* Right Column: Modern SaaS Interactive Dashboard Preview */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 sm:p-5 overflow-hidden">
                {/* Mini Top Mock Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-xs font-mono text-slate-400 ml-2">studentos.internal/dashboard</span>
                  </div>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-0.5 rounded-md">
                    6th Sem CSE
                  </span>
                </div>

                {/* KPI Metrics Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium block">Current CGPA</span>
                    <span className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">8.78</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium block">DSA Solved</span>
                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">182 / 300</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium block">Internships</span>
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">6 Active</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium block">Attendance</span>
                    <span className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">91.4%</span>
                  </div>
                </div>

                {/* Mini Kanban & DSA Preview */}
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 font-bold text-xs">
                        G
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-white">Google — SWE Intern 2027</div>
                        <div className="text-[11px] text-slate-500">Bengaluru · Status: Applied (Referral)</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 dark:bg-blue-900/60 dark:text-blue-200 px-2 py-0.5 rounded">
                      In Review
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 font-bold text-xs">
                        M
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-white">Microsoft — Core OS SWE</div>
                        <div className="text-[11px] text-slate-500">Hyderabad · Online Assessment Saturday</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 dark:bg-amber-900/60 dark:text-amber-200 px-2 py-0.5 rounded">
                      OA Scheduled
                    </span>
                  </div>

                  <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span className="text-xs font-medium text-indigo-900 dark:text-indigo-200">
                        AI Assistant: 2 high-yield DBMS questions for tomorrow&apos;s viva
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        if (isAuthenticated) setCurrentTab('assistant');
                        else openAuthModal('login');
                      }}
                      className="text-xs font-semibold text-indigo-600 hover:underline"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features-section" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
              EVERYTHING IN ONE PLACE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-balance">
              Engineered for the Modern Tech Undergrad
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              No more juggling between spreadsheets, messy bookmark folders, and missed deadlines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                onClick={() => {
                  if (isAuthenticated) {
                    setCurrentTab(f.tab);
                  } else {
                    openAuthModal('login');
                  }
                }}
                className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-lg cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    {f.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {f.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {f.description}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                  <span>Explore Module</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              From Semester 1 to Dream Placement
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Three simple steps to streamline your engineering college journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((st, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-4"
              >
                <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                  {st.num}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{st.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
              STUDENT TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Loved by Engineers Across India
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Hear from students who streamlined their academics and secured top tech roles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</div>
                  <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    {t.role}
                  </div>
                  <div className="text-[11px] text-slate-400">{t.college}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-100/50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-4 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Take Control of Your College Life?
          </h2>
          <p className="text-sm sm:text-base text-indigo-200 max-w-xl mx-auto">
            Join thousands of engineering students leveling up their academics, internships, and placements.
          </p>
          <div className="pt-2">
            <button
              onClick={handleCtaClick}
              className="px-8 py-3.5 bg-white text-indigo-950 hover:bg-slate-100 font-bold text-sm rounded-xl transition-all shadow-xl shadow-black/20 inline-flex items-center gap-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Logo size="sm" />
              <span className="text-slate-500">·</span>
              <span>The Operating System for Engineering Students</span>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <button onClick={() => setCurrentTab('academics')} className="hover:text-white transition-colors">
                Academics
              </button>
              <button onClick={() => setCurrentTab('scholarships')} className="hover:text-white transition-colors">
                Scholarships
              </button>
              <button onClick={() => setCurrentTab('internships')} className="hover:text-white transition-colors">
                Internships
              </button>
              <button onClick={() => setCurrentTab('dsa')} className="hover:text-white transition-colors">
                DSA Tracker
              </button>
              <button onClick={() => setCurrentTab('cgpa')} className="hover:text-white transition-colors">
                CGPA Calculator
              </button>
              <button onClick={() => setCurrentTab('assistant')} className="hover:text-white transition-colors">
                AI Assistant
              </button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <span>© {new Date().getFullYear()} StudentOS Inc. Built for engineering excellence.</span>
            <span>All mock data for demonstration purposes.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
