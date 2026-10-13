import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, Award, Briefcase, Code, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    setCurrentTab,
    scholarships,
    internships,
    resources,
    dsaProblems,
    semesters,
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    const results: Array<{
      id: string;
      title: string;
      subtitle: string;
      tab: NavigationTab;
      icon: React.ReactNode;
      category: string;
    }> = [];

    // Search Scholarships
    scholarships.forEach((s) => {
      if (s.name.toLowerCase().includes(q) || s.provider.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) {
        results.push({
          id: `sch_${s.id}`,
          title: s.name,
          subtitle: `${s.provider} · ${s.amount}`,
          tab: 'scholarships',
          icon: <Award className="w-4 h-4 text-emerald-500" />,
          category: 'Scholarships',
        });
      }
    });

    // Search Internships
    internships.forEach((i) => {
      if (i.company.toLowerCase().includes(q) || i.role.toLowerCase().includes(q) || i.location.toLowerCase().includes(q)) {
        results.push({
          id: `int_${i.id}`,
          title: `${i.company} — ${i.role}`,
          subtitle: `Status: ${i.status} · ${i.location}`,
          tab: 'internships',
          icon: <Briefcase className="w-4 h-4 text-blue-500" />,
          category: 'Internships',
        });
      }
    });

    // Search DSA Problems
    dsaProblems.forEach((p) => {
      if (p.title.toLowerCase().includes(q) || p.topicName.toLowerCase().includes(q) || p.difficulty.toLowerCase().includes(q)) {
        results.push({
          id: `dsa_${p.id}`,
          title: p.title,
          subtitle: `${p.topicName} · ${p.difficulty} (${p.status})`,
          tab: 'dsa',
          icon: <Code className="w-4 h-4 text-purple-500" />,
          category: 'DSA Practice',
        });
      }
    });

    // Search College Resources
    resources.forEach((r) => {
      if (r.title.toLowerCase().includes(q) || r.subject.toLowerCase().includes(q) || r.type.toLowerCase().includes(q)) {
        results.push({
          id: `res_${r.id}`,
          title: r.title,
          subtitle: `${r.subject} · ${r.type}`,
          tab: 'resources',
          icon: <BookOpen className="w-4 h-4 text-amber-500" />,
          category: 'College Resources',
        });
      }
    });

    // Search Subjects in Academics
    semesters.forEach((sem) => {
      sem.subjects.forEach((s) => {
        if (s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)) {
          results.push({
            id: `sub_${s.id}`,
            title: `${s.code}: ${s.name}`,
            subtitle: `Semester ${sem.semesterNumber} · Grade: ${s.grade} (${s.credits} Credits)`,
            tab: 'academics',
            icon: <GraduationCap className="w-4 h-4 text-indigo-500" />,
            category: 'Academics',
          });
        }
      });
    });

    return results.slice(0, 10);
  }, [query, scholarships, internships, dsaProblems, resources, semesters]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search scholarships, internships, resources, DSA problems..."
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
            ESC
          </kbd>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-slate-400">
              Type keywords to search across your college ecosystem
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
              No results found for &ldquo;<span className="font-semibold text-slate-800 dark:text-slate-200">{query}</span>&rdquo;
            </div>
          ) : (
            <div className="space-y-1">
              {searchResults.map((res) => (
                <button
                  key={res.id}
                  onClick={() => {
                    setCurrentTab(res.tab);
                    setIsSearchOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                      {res.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                        {res.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {res.subtitle}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                      {res.category}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Press ESC or click outside to dismiss</span>
          <span>{searchResults.length} results</span>
        </div>
      </div>
    </div>
  );
};
