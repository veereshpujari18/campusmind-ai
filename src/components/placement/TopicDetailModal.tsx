import React from 'react';
import { X, CheckCircle2, BookOpen, Lightbulb, ArrowRight } from 'lucide-react';
import { PlacementTopic } from '../../types';

interface TopicDetailModalProps {
  topic: PlacementTopic | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProgress: (topicId: string, delta: number) => void;
}

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({
  topic,
  isOpen,
  onClose,
  onUpdateProgress,
}) => {
  if (!isOpen || !topic) return null;

  const percentage = Math.round((topic.completedModules / topic.totalModules) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              {topic.category} Placement Track
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
              {topic.title}
            </h2>
            <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
              <span>{topic.completedModules} of {topic.totalModules} modules mastered</span>
              <span>·</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{percentage}%</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Recommended Next Step Callout */}
          <div className="p-4 bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 rounded-2xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
              Recommended Next Step
            </span>
            <p className="text-xs sm:text-sm font-medium text-indigo-950 dark:text-indigo-100 leading-relaxed">
              {topic.recommendedNext}
            </p>
          </div>

          {/* Key Concepts Checklist */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Core Technical Concepts Tested
            </h3>
            <div className="space-y-1.5">
              {topic.keyConcepts.map((concept, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{concept}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cheat Sheet Summary */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span>Interview Cheat Sheet</span>
            </div>
            <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl text-xs font-mono leading-relaxed overflow-x-auto">
              {topic.cheatSheetSummary}
            </div>
          </div>

          {/* Interview Tips */}
          <div className="p-4 bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 rounded-2xl flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block mb-0.5">Recruiter & Interviewer Tip:</strong>
              <p className="leading-relaxed">{topic.interviewTips}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateProgress(topic.id, -1)}
              disabled={topic.completedModules <= 0}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40"
            >
              -1 Module
            </button>
            <button
              onClick={() => onUpdateProgress(topic.id, 1)}
              disabled={topic.completedModules >= topic.totalModules}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white disabled:opacity-40"
            >
              +1 Module Complete
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
