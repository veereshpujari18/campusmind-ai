import React, { useState, useMemo } from 'react';
import {
  Award,
  Search,
  Filter,
  Bookmark,
  Calendar,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Scholarship } from '../../types';
import { ScholarshipDetailModal } from './ScholarshipDetailModal';
import { EligibilityCheckerModal } from './EligibilityCheckerModal';

export const ScholarshipFinderView: React.FC = () => {
  const { scholarships, toggleSaveScholarship, markScholarshipApplied, profile } = useApp();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [showSavedOnly, setShowSavedOnly] = useState<boolean>(false);
  const [activeModalScholarship, setActiveModalScholarship] = useState<Scholarship | null>(null);
  const [isEligibilityModalOpen, setIsEligibilityModalOpen] = useState(false);

  const filteredScholarships = useMemo(() => {
    return scholarships.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || s.category === selectedCategory || s.category === 'All';

      const matchesState =
        selectedState === 'All' || s.state === selectedState || s.state === 'All India';

      const matchesSaved = !showSavedOnly || s.isSaved;

      return matchesSearch && matchesCategory && matchesState && matchesSaved;
    });
  }, [scholarships, searchQuery, selectedCategory, selectedState, showSavedOnly]);

  const handleSaveToggle = (id: string) => {
    toggleSaveScholarship(id);
    const item = scholarships.find((s) => s.id === id);
    if (item?.isSaved) {
      showToast(`Removed from saved scholarships`, 'info');
    } else {
      showToast(`Saved to scholarship watchlist`, 'success');
    }
  };

  const handleApply = (id: string) => {
    markScholarshipApplied(id);
    showToast('Redirecting to official scholarship verification portal', 'info');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            <Award className="w-4 h-4" />
            <span>Verified Engineering Scholarships</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Scholarship Discovery Engine
          </h1>
          <p className="text-xs text-slate-500">
            Browse corporate foundations, merit fellowships, and central/state education grants.
          </p>
        </div>

        <button
          onClick={() => setIsEligibilityModalOpen(true)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Check My Eligibility</span>
        </button>
      </div>

      {/* Official Disclaimer Banner */}
      <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>
            <strong>Demo Data Notice:</strong> All grants listed contain verified representative engineering criteria. Always verify deadlines on the official scholarship site.
          </span>
        </div>
        <span className="font-semibold text-slate-700 dark:text-slate-300 hidden sm:inline tabular-nums">
          {scholarships.length} Grants Indexed
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Keyword Search */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by grant name, provider (Google, Reliance, AICTE)..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          {/* Category Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-hidden"
            >
              <option value="All">All Categories</option>
              <option value="General">General / Open</option>
              <option value="EWS">Economically Weaker Section (EWS)</option>
              <option value="Girls Only">Women in Tech / Girls Only</option>
              <option value="SC/ST">SC / ST Categories</option>
              <option value="OBC">OBC Category</option>
            </select>
          </div>

          {/* State Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-hidden"
            >
              <option value="All">All Regions</option>
              <option value="All India">All India</option>
            </select>
          </div>

          {/* Saved Watchlist Filter Toggle */}
          <div className="md:col-span-2 flex items-center">
            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border ${
                showSavedOnly
                  ? 'bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-950 dark:border-amber-800'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-current' : ''}`} />
              <span>Saved Only</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scholarship Cards Grid */}
      {filteredScholarships.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <Award className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            No scholarships found matching your filters
          </h3>
          <p className="text-xs text-slate-500">
            Try resetting your category or search term to see more opportunities.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setShowSavedOnly(false);
            }}
            className="mt-2 text-xs font-semibold text-indigo-600 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredScholarships.map((s) => (
            <div
              key={s.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 p-5 flex flex-col justify-between transition-all hover:shadow-md group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 block">
                      {s.provider}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {s.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleSaveToggle(s.id)}
                    className="p-1.5 text-slate-400 hover:text-amber-500 rounded-lg transition-colors"
                    title={s.isSaved ? 'Remove from saved' : 'Save for later'}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        s.isSaved ? 'fill-amber-500 text-amber-500' : ''
                      }`}
                    />
                  </button>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">Award Amount</span>
                  <span className="text-base font-bold text-slate-900 dark:text-white">
                    {s.amount}
                  </span>
                </div>

                {/* Eligibility Criteria metadata adhering to zero-pill discipline */}
                <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span>Min CGPA: <strong>{s.minCgpa}</strong></span>
                    <span>·</span>
                    <span>Max Income: <strong>≤ ₹{s.maxFamilyIncomeLakhs}L</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>Category: <strong>{s.category}</strong></span>
                    <span>·</span>
                    <span>Year: <strong>{s.eligibleYears.join(', ')}</strong></span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span className="tabular-nums">Due: {s.deadline}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setActiveModalScholarship(s)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    Details
                  </button>
                  <a
                    href={s.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleApply(s.id)}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span>Apply</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <ScholarshipDetailModal
        scholarship={activeModalScholarship}
        isOpen={!!activeModalScholarship}
        onClose={() => setActiveModalScholarship(null)}
        onSaveToggle={handleSaveToggle}
        onApply={handleApply}
      />

      <EligibilityCheckerModal
        isOpen={isEligibilityModalOpen}
        onClose={() => setIsEligibilityModalOpen(false)}
        scholarships={scholarships}
        defaultCgpa={profile.currentCgpa}
        onSelectScholarship={(s) => setActiveModalScholarship(s)}
      />
    </div>
  );
};
