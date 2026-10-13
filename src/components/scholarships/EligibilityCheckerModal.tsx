import React, { useState } from 'react';
import { X, CheckCircle2, Award, ArrowRight, Sparkles } from 'lucide-react';
import { Scholarship } from '../../types';

interface EligibilityCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  scholarships: Scholarship[];
  defaultCgpa: number;
  onSelectScholarship: (scholarship: Scholarship) => void;
}

export const EligibilityCheckerModal: React.FC<EligibilityCheckerModalProps> = ({
  isOpen,
  onClose,
  scholarships,
  defaultCgpa,
  onSelectScholarship,
}) => {
  const [cgpa, setCgpa] = useState<number>(defaultCgpa || 8.5);
  const [incomeLakhs, setIncomeLakhs] = useState<number>(6);
  const [category, setCategory] = useState<string>('General');
  const [gender, setGender] = useState<'All' | 'Female' | 'Male'>('All');
  const [yearOfStudy, setYearOfStudy] = useState<number>(3);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const matchedScholarships = scholarships.filter((s) => {
    const meetsCgpa = cgpa >= s.minCgpa;
    const meetsIncome = incomeLakhs <= s.maxFamilyIncomeLakhs;
    const meetsCategory =
      s.category === 'All' ||
      s.category === category ||
      (category === 'General' && s.category === 'General') ||
      (category === 'Girls Only' && (gender === 'Female' || s.gender === 'Female'));
    const meetsGender = s.gender === 'All' || s.gender === gender;
    const meetsYear = s.eligibleYears.includes(yearOfStudy);

    return meetsCgpa && meetsIncome && meetsCategory && meetsGender && meetsYear;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Scholarship Eligibility Engine
              </h3>
              <p className="text-xs text-slate-500">
                Match your profile with verified engineering grants
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Your Current CGPA: <span className="font-bold tabular-nums">{cgpa}</span>
              </label>
              <input
                type="range"
                min="5.0"
                max="10.0"
                step="0.1"
                value={cgpa}
                onChange={(e) => setCgpa(parseFloat(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Annual Family Income: <span className="font-bold tabular-nums">₹{incomeLakhs} Lakhs</span>
              </label>
              <input
                type="range"
                min="1"
                max="25"
                step="0.5"
                value={incomeLakhs}
                onChange={(e) => setIncomeLakhs(parseFloat(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-2.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              >
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC/ST">SC/ST</option>
                <option value="EWS">EWS</option>
                <option value="Minority">Minority</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-2.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              >
                <option value="All">All / Prefer not to say</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Year of Study
              </label>
              <select
                value={yearOfStudy}
                onChange={(e) => setYearOfStudy(Number(e.target.value))}
                className="w-full px-2.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              >
                <option value={1}>1st Year</option>
                <option value={2}>2nd Year</option>
                <option value={3}>3rd Year</option>
                <option value={4}>4th Year</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setHasSearched(true)}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Evaluate Eligibility Matching</span>
            </button>
          </div>

          {hasSearched && (
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Matched Scholarships ({matchedScholarships.length})</span>
                <span className="text-emerald-600 font-bold">
                  {matchedScholarships.length > 0 ? 'Eligible to Apply' : 'No exact match'}
                </span>
              </div>

              {matchedScholarships.length === 0 ? (
                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-center text-xs text-slate-500">
                  No matching scholarships found for these strict parameters. Try increasing income ceiling or adjusting category filter.
                </div>
              ) : (
                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {matchedScholarships.map((s) => (
                    <div
                      key={s.id}
                      className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {s.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {s.provider} · <span className="font-semibold text-emerald-600">{s.amount}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          onSelectScholarship(s);
                          onClose();
                        }}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold rounded-lg shrink-0 flex items-center gap-1"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
