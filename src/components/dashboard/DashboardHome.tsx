import React from 'react';
import {
  GraduationCap,
  Award,
  Briefcase,
  Code,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Calculator,
  Plus,
  CheckCircle2,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';

export const DashboardHome: React.FC = () => {
  const {
    profile,
    semesters,
    scholarships,
    internships,
    dsaProblems,
    studyTasks,
    setCurrentTab,
    calculateOverallCgpa,
  } = useApp();

  const currentCgpa = calculateOverallCgpa();
  const currentSemester = semesters.find((s) => s.semesterNumber === profile.semester) || semesters[0];

  const totalDsa = dsaProblems.length;
  const solvedDsa = dsaProblems.filter((p) => p.status === 'Solved').length;
  const attemptedDsa = dsaProblems.filter((p) => p.status === 'Attempted').length;
  const dsaPercentage = Math.round((solvedDsa / (totalDsa || 1)) * 100);

  const activeInternships = internships.filter(
    (i) => i.status !== 'Rejected' && i.status !== 'Selected'
  ).length;

  const savedScholarships = scholarships.filter((s) => s.isSaved).length;

  // Upcoming Deadlines (aggregate from internships, scholarships, and tasks)
  const upcomingItems = [
    {
      type: 'internship',
      title: 'Microsoft SWE Intern — Online Assessment',
      deadline: 'This Saturday, Oct 18',
      urgency: 'high',
      tab: 'internships' as NavigationTab,
    },
    {
      type: 'task',
      title: 'DBMS Lab Assignment 4: Triggers & Procedures',
      deadline: 'Due Tomorrow, Oct 15',
      urgency: 'high',
      tab: 'planner' as NavigationTab,
    },
    {
      type: 'scholarship',
      title: 'Reliance Foundation Scholarship Submission',
      deadline: 'Nov 30, 2026',
      urgency: 'medium',
      tab: 'scholarships' as NavigationTab,
    },
    {
      type: 'task',
      title: 'Machine Learning Project Milestone 1',
      deadline: 'Oct 19, 2026',
      urgency: 'medium',
      tab: 'planner' as NavigationTab,
    },
  ];

  // SGPA History Data for Chart
  const semesterHistory = [...semesters].sort((a, b) => a.semesterNumber - b.semesterNumber);

  // Internship Status Breakdown for Chart
  const statusCounts = {
    Wishlist: internships.filter((i) => i.status === 'Wishlist').length,
    Applied: internships.filter((i) => i.status === 'Applied').length,
    OA: internships.filter((i) => i.status === 'Online Assessment').length,
    Interview: internships.filter((i) => i.status === 'Interview').length,
    Offer: internships.filter((i) => i.status === 'Selected').length,
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl text-white shadow-md">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/10 text-indigo-200 text-xs font-medium">
            <span>Semester {profile.semester} · {profile.branch}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {profile.name}
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200">
            {profile.college} · Target CGPA: <span className="font-bold text-white tabular-nums">{profile.targetCgpa}</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentTab('assistant')}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-semibold text-white transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>AI Assistant</span>
          </button>
          <button
            onClick={() => setCurrentTab('cgpa')}
            className="px-4 py-2.5 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-xs font-semibold text-white transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Calculate CGPA</span>
          </button>
        </div>
      </div>

      {/* 5 Core Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {/* Card 1: CGPA */}
        <div
          onClick={() => setCurrentTab('cgpa')}
          className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Current CGPA</span>
            <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {currentCgpa}
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Target: {profile.targetCgpa}</span>
          </div>
        </div>

        {/* Card 2: Current Semester */}
        <div
          onClick={() => setCurrentTab('academics')}
          className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Semester {profile.semester}</span>
            <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {currentSemester.sgpa} <span className="text-xs font-normal text-slate-400">SGPA</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            {currentSemester.subjects.length} Subjects enrolled
          </div>
        </div>

        {/* Card 3: Internships */}
        <div
          onClick={() => setCurrentTab('internships')}
          className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Internships</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {activeInternships}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            {internships.length} total applications
          </div>
        </div>

        {/* Card 4: DSA Solved */}
        <div
          onClick={() => setCurrentTab('dsa')}
          className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">DSA Problems</span>
            <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <Code className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {solvedDsa} <span className="text-xs font-normal text-slate-400">/ {totalDsa}</span>
          </div>
          <div className="mt-1 text-[11px] text-purple-600 dark:text-purple-400 font-medium">
            {dsaPercentage}% syllabus mastered
          </div>
        </div>

        {/* Card 5: Scholarships Matched */}
        <div
          onClick={() => setCurrentTab('scholarships')}
          className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group shadow-2xs col-span-2 lg:col-span-1"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Scholarships</span>
            <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {scholarships.length}
          </div>
          <div className="mt-1 text-[11px] text-amber-600 dark:text-amber-400 font-medium">
            {savedScholarships} saved in watchlist
          </div>
        </div>
      </div>

      {/* Two Column Layout: Charts & Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Progress Charts */}
        <div className="lg:col-span-8 space-y-6">
          {/* Chart 1: CGPA Progression */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Academic SGPA Progression
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Semester-wise GPA trajectory across your engineering degree
                </p>
              </div>
              <button
                onClick={() => setCurrentTab('academics')}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>View Details</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Custom SVG/Bar Chart */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-6 gap-2 sm:gap-4 items-end h-44 border-b border-slate-100 dark:border-slate-800 pb-3">
                {semesterHistory.map((sem) => {
                  const heightPercent = Math.min(100, Math.max(10, ((sem.sgpa - 6) / 4) * 100));
                  const isCurrent = sem.semesterNumber === profile.semester;
                  return (
                    <div key={sem.semesterNumber} className="flex flex-col items-center h-full justify-end group">
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1 tabular-nums group-hover:text-indigo-600">
                        {sem.sgpa}
                      </span>
                      <div className="w-full max-w-[42px] bg-slate-100 dark:bg-slate-800 rounded-t-lg overflow-hidden flex items-end h-full">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-t-lg transition-all duration-500 ${
                            isCurrent
                              ? 'bg-gradient-to-t from-indigo-600 to-violet-500 shadow-md shadow-indigo-500/20'
                              : 'bg-indigo-300 dark:bg-indigo-900/80 group-hover:bg-indigo-400'
                          }`}
                        />
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-medium">
                        Sem {sem.semesterNumber}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                <span>Degree Average: {currentCgpa} CGPA</span>
                <span>Grading scale: 10.0 Maximum</span>
              </div>
            </div>
          </div>

          {/* Chart 2: DSA Topic Progress & Internship Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DSA Mastery */}
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">DSA Progress</h3>
                <button
                  onClick={() => setCurrentTab('dsa')}
                  className="text-xs font-semibold text-indigo-600 hover:underline"
                >
                  Solve Next
                </button>
              </div>

              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Solved</span>
                    <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                      {solvedDsa} ({dsaPercentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      style={{ width: `${dsaPercentage}%` }}
                      className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <span className="text-[10px] text-slate-500 block">Solved</span>
                    <span className="text-sm font-bold text-emerald-600 tabular-nums">{solvedDsa}</span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <span className="text-[10px] text-slate-500 block">Attempted</span>
                    <span className="text-sm font-bold text-amber-600 tabular-nums">{attemptedDsa}</span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <span className="text-[10px] text-slate-500 block">Remaining</span>
                    <span className="text-sm font-bold text-slate-600 tabular-nums">{totalDsa - solvedDsa}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Internship Funnel */}
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Internship Pipeline</h3>
                <button
                  onClick={() => setCurrentTab('internships')}
                  className="text-xs font-semibold text-indigo-600 hover:underline"
                >
                  Kanban Board
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Applied</span>
                  <span className="text-base font-bold text-blue-700 dark:text-blue-300 tabular-nums">
                    {statusCounts.Applied}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/60">
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Assessments (OA)</span>
                  <span className="text-base font-bold text-amber-700 dark:text-amber-300 tabular-nums">
                    {statusCounts.OA}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/60">
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Interview</span>
                  <span className="text-base font-bold text-purple-700 dark:text-purple-300 tabular-nums">
                    {statusCounts.Interview}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60">
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Selected / Offer</span>
                  <span className="text-base font-bold text-emerald-700 dark:text-emerald-300 tabular-nums">
                    {statusCounts.Offer}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Upcoming Deadlines & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Actions */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setCurrentTab('cgpa')}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 transition-colors text-left flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                <div className="flex items-center gap-2.5">
                  <Calculator className="w-4 h-4 text-indigo-500" />
                  <span>Calculate SGPA / CGPA</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-50" />
              </button>

              <button
                onClick={() => setCurrentTab('scholarships')}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-600 transition-colors text-left flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-emerald-500" />
                  <span>Find Matching Scholarships</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-50" />
              </button>

              <button
                onClick={() => setCurrentTab('internships')}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 transition-colors text-left flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-blue-500" />
                  <span>Add Internship Application</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-50" />
              </button>

              <button
                onClick={() => setCurrentTab('dsa')}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-purple-50 dark:hover:bg-purple-950/50 hover:text-purple-600 transition-colors text-left flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                <div className="flex items-center gap-2.5">
                  <Code className="w-4 h-4 text-purple-500" />
                  <span>Practice LeetCode DSA</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-50" />
              </button>

              <button
                onClick={() => setCurrentTab('profile')}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/50 hover:text-amber-600 transition-colors text-left flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  <span>Update Resume & Skills</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-50" />
              </button>
            </div>
          </div>

          {/* Upcoming Section */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Upcoming Deadlines
              </h3>
              <button
                onClick={() => setCurrentTab('planner')}
                className="text-xs font-semibold text-indigo-600 hover:underline"
              >
                Planner
              </button>
            </div>

            <div className="space-y-2.5">
              {upcomingItems.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentTab(item.tab)}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{item.deadline}</span>
                      </div>
                    </div>
                    {item.urgency === 'high' ? (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold text-rose-700 bg-rose-50 dark:bg-rose-950 dark:text-rose-300 rounded shrink-0">
                        Urgent
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-600 bg-slate-200/60 dark:bg-slate-800 dark:text-slate-400 rounded shrink-0">
                        Soon
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
