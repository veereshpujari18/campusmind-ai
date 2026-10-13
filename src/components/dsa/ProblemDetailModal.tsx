import React, { useState } from 'react';
import { X, ExternalLink, Code, Save, CheckCircle2 } from 'lucide-react';
import { DsaProblem, DsaStatus } from '../../types';

interface ProblemDetailModalProps {
  problem: DsaProblem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, status: DsaStatus) => void;
  onUpdateNotes: (id: string, notes: string) => void;
}

export const ProblemDetailModal: React.FC<ProblemDetailModalProps> = ({
  problem,
  isOpen,
  onClose,
  onUpdateStatus,
  onUpdateNotes,
}) => {
  const [notes, setNotes] = useState(problem?.notes || '');

  React.useEffect(() => {
    if (problem) {
      setNotes(problem.notes || '');
    }
  }, [problem]);

  if (!isOpen || !problem) return null;

  const handleSaveNotes = () => {
    onUpdateNotes(problem.id, notes);
    onClose();
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/80 dark:text-emerald-300';
      case 'Medium':
        return 'text-amber-700 bg-amber-50 dark:bg-amber-950/80 dark:text-amber-300';
      case 'Hard':
        return 'text-rose-700 bg-rose-50 dark:bg-rose-950/80 dark:text-rose-300';
      default:
        return 'text-slate-600 bg-slate-100';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-slate-500">{problem.topicName}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${getDifficultyBadge(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {problem.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4">
          {/* Status selector */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Current Practice Status
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['Not Started', 'Attempted', 'Solved', 'Revision'] as DsaStatus[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => onUpdateStatus(problem.id, st)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                    problem.status === st
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Solution Notes */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              My Solution Approach & Complexity Notes
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Use two-pointers from both ends; O(N) time and O(1) auxiliary space. Handle negative index boundary."
              className="w-full p-3 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          {/* External Problem Link */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-600 dark:text-slate-400">
              Practice on <strong>{problem.platform}</strong>
            </span>
            <a
              href={problem.platformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>Open Problem</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveNotes}
            className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
