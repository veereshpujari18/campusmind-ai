import React from 'react';
import { X, ExternalLink, Calendar, CheckCircle2, FileText, AlertCircle, Bookmark } from 'lucide-react';
import { Scholarship } from '../../types';

interface ScholarshipDetailModalProps {
  scholarship: Scholarship | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveToggle: (id: string) => void;
  onApply: (id: string) => void;
}

export const ScholarshipDetailModal: React.FC<ScholarshipDetailModalProps> = ({
  scholarship,
  isOpen,
  onClose,
  onSaveToggle,
  onApply,
}) => {
  if (!isOpen || !scholarship) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {scholarship.provider}
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
              {scholarship.name}
            </h2>
            <div className="text-sm font-bold text-slate-900 dark:text-white pt-1">
              Grant Amount: <span className="text-emerald-600 dark:text-emerald-400">{scholarship.amount}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Key Eligibility Tags */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 block">Min Academic Score</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white tabular-nums">
                {scholarship.minCgpa} CGPA
              </span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 block">Max Family Income</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white tabular-nums">
                ≤ ₹{scholarship.maxFamilyIncomeLakhs} Lakhs/yr
              </span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 block">Category</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {scholarship.category}
              </span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 block">Deadline</span>
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 tabular-nums">
                {scholarship.deadline}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              About Scholarship
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {scholarship.description}
            </p>
          </div>

          {/* Required Documents */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Mandatory Documents Checklist
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {scholarship.documentsRequired.map((doc, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300"
                >
                  <FileText className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Official Verification Notice */}
          <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-xl flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Official Verification Required:</strong> While StudentOS keeps eligibility rules up-to-date, please verify final submission dates and official forms directly on the official scholarship website.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={() => onSaveToggle(scholarship.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
              scholarship.isSaved
                ? 'bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-950 dark:border-amber-700'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${scholarship.isSaved ? 'fill-current' : ''}`} />
            <span>{scholarship.isSaved ? 'Saved in Watchlist' : 'Save Scholarship'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              Close
            </button>
            <a
              href={scholarship.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onApply(scholarship.id)}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span>Visit Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
