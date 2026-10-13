import React, { useState } from 'react';
import {
  Target,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Lightbulb,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { PlacementTopic } from '../../types';
import { TopicDetailModal } from './TopicDetailModal';

export const PlacementPrepView: React.FC = () => {
  const { placementTopics, updatePlacementTopicProgress, setCurrentTab } = useApp();
  const { showToast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalTopic, setActiveModalTopic] = useState<PlacementTopic | null>(null);

  const categories = ['All', 'Core CS', 'Languages', 'Systems', 'Soft Skills'];

  const filteredTopics = placementTopics.filter(
    (t) => selectedCategory === 'All' || t.category === selectedCategory
  );

  // Overall Placement Readiness
  const totalModules = placementTopics.reduce((acc, t) => acc + t.totalModules, 0);
  const completedModules = placementTopics.reduce((acc, t) => acc + t.completedModules, 0);
  const readinessPercentage = Math.round((completedModules / (totalModules || 1)) * 100);

  const handleUpdateProgress = (topicId: string, delta: number) => {
    updatePlacementTopicProgress(topicId, delta);
    showToast('Updated placement module progress', 'success');

    // Update the active modal topic state as well
    if (activeModalTopic && activeModalTopic.id === topicId) {
      setActiveModalTopic((prev) =>
        prev
          ? {
              ...prev,
              completedModules: Math.max(
                0,
                Math.min(prev.totalModules, prev.completedModules + delta)
              ),
            }
          : null
      );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">
            <Target className="w-4 h-4" />
            <span>Campus Recruitment & Tier-1 Tech Preparation</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Placement Preparation Dashboard
          </h1>
          <p className="text-xs text-slate-500">
            Systematic coverage of CS fundamentals, programming languages, system design, and HR rounds.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-right">
            <span className="text-[11px] text-slate-500 block">Readiness Index</span>
            <span className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 tabular-nums">
              {readinessPercentage}%
            </span>
          </div>
          <button
            onClick={() => setCurrentTab('assistant')}
            className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Mock Viva</span>
          </button>
        </div>
      </div>

      {/* Prominent Recommended Next Step Banner */}
      <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-2xl flex items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-600 text-white shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block">
              Recommended Next Step
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
              Complete Arrays & Strings mastery before starting Linked Lists and Trees. Practice Two-Pointer sliding windows.
            </p>
          </div>
        </div>
        <button
          onClick={() => setCurrentTab('dsa')}
          className="px-3.5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold shrink-0 hover:bg-indigo-700 transition-colors hidden sm:flex items-center gap-1.5"
        >
          <span>Go to DSA</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white shadow-2xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTopics.map((topic) => {
          const pct = Math.round((topic.completedModules / topic.totalModules) * 100);

          return (
            <div
              key={topic.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 p-5 flex flex-col justify-between transition-all hover:shadow-md group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 block uppercase tracking-wider">
                      {topic.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {topic.title}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white tabular-nums">
                    {pct}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    style={{ width: `${pct}%` }}
                    className="h-full bg-purple-600 rounded-full transition-all duration-300"
                  />
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {topic.description}
                </p>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                  <strong className="text-purple-600 dark:text-purple-400 font-semibold block text-[10px] uppercase">
                    Next Focus:
                  </strong>
                  <span className="line-clamp-2 leading-normal">{topic.recommendedNext}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 tabular-nums">
                  {topic.completedModules} / {topic.totalModules} modules
                </span>

                <button
                  onClick={() => setActiveModalTopic(topic)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <span>Study Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <TopicDetailModal
        topic={activeModalTopic}
        isOpen={!!activeModalTopic}
        onClose={() => setActiveModalTopic(null)}
        onUpdateProgress={handleUpdateProgress}
      />
    </div>
  );
};
