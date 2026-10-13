import React, { useState, useMemo } from 'react';
import {
  Code,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Search,
  Filter,
  Bookmark,
  TrendingUp,
  FileEdit,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { DsaProblem, DsaStatus, DsaDifficulty } from '../../types';
import { ProblemDetailModal } from './ProblemDetailModal';

export const DsaTrackerView: React.FC = () => {
  const { dsaProblems, updateDsaStatus, updateDsaNotes } = useApp();
  const { showToast } = useToast();

  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProblem, setActiveModalProblem] = useState<DsaProblem | null>(null);

  const topics = [
    'All',
    'Arrays',
    'Strings',
    'Linked Lists',
    'Stacks',
    'Binary Search',
    'Trees',
    'Graphs',
    'Dynamic Programming',
    'Greedy',
    'Recursion',
  ];

  // Topic summaries
  const topicSummaries = useMemo(() => {
    const list = topics.filter((t) => t !== 'All');
    return list.map((topName) => {
      const proms = dsaProblems.filter((p) => p.topicName === topName);
      const total = proms.length;
      const solved = proms.filter((p) => p.status === 'Solved').length;
      const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
      return {
        name: topName,
        total,
        solved,
        remaining: total - solved,
        pct,
      };
    });
  }, [dsaProblems]);

  // Overall statistics
  const totalCount = dsaProblems.length;
  const solvedCount = dsaProblems.filter((p) => p.status === 'Solved').length;
  const attemptedCount = dsaProblems.filter((p) => p.status === 'Attempted').length;
  const revisionCount = dsaProblems.filter((p) => p.status === 'Revision').length;
  const overallPercentage = Math.round((solvedCount / (totalCount || 1)) * 100);

  const filteredProblems = useMemo(() => {
    return dsaProblems.filter((p) => {
      const matchTopic = selectedTopic === 'All' || p.topicName === selectedTopic;
      const matchDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
      const matchStatus = selectedStatus === 'All' || p.status === selectedStatus;
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.topicName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchTopic && matchDiff && matchStatus && matchSearch;
    });
  }, [dsaProblems, selectedTopic, selectedDifficulty, selectedStatus, searchQuery]);

  const handleStatusChange = (problemId: string, newStatus: DsaStatus, problemTitle: string) => {
    updateDsaStatus(problemId, newStatus);

    if (newStatus === 'Solved') {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
        });
      } catch {
        // graceful ignore
      }
      showToast(`🎉 Mastered: "${problemTitle}"!`, 'success');
    } else {
      showToast(`Updated status for "${problemTitle}" to ${newStatus}`, 'info');
    }
  };

  const getDifficultyBadge = (diff: DsaDifficulty) => {
    switch (diff) {
      case 'Easy':
        return 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Medium':
        return 'text-amber-700 bg-amber-50 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Hard':
        return 'text-rose-700 bg-rose-50 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-800';
    }
  };

  const getStatusBadge = (status: DsaStatus) => {
    switch (status) {
      case 'Solved':
        return 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/80 dark:text-emerald-300';
      case 'Attempted':
        return 'text-blue-700 bg-blue-50 dark:bg-blue-950/80 dark:text-blue-300';
      case 'Revision':
        return 'text-purple-700 bg-purple-50 dark:bg-purple-950/80 dark:text-purple-300';
      default:
        return 'text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
            <Code className="w-4 h-4" />
            <span>Curated Coding Preparation</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            DSA Problem Tracker
          </h1>
          <p className="text-xs text-slate-500">
            Track pattern mastery across LeetCode, GFG, and top interview question lists.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-right">
            <span className="text-[11px] text-slate-500 block">Problems Solved</span>
            <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">
              {solvedCount} <span className="text-xs font-normal text-slate-400">/ {totalCount}</span>
            </span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-right">
            <span className="text-[11px] text-slate-500 block">Mastery Rate</span>
            <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
              {overallPercentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Topic Cards Horizontal Reel */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Topic Breakdown
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-2.5">
          {topicSummaries.map((top) => {
            const isSelected = selectedTopic === top.name;
            return (
              <button
                key={top.name}
                onClick={() => setSelectedTopic(isSelected ? 'All' : top.name)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-500 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-100 shadow-2xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold truncate">{top.name}</div>
                <div className="text-[11px] text-slate-500 mt-1 flex justify-between tabular-nums">
                  <span>{top.solved}/{top.total}</span>
                  <span className="font-semibold">{top.pct}%</span>
                </div>
                <div className="w-full h-1 rounded-full bg-slate-100 dark:bg-slate-800 mt-1.5 overflow-hidden">
                  <div
                    style={{ width: `${top.pct}%` }}
                    className="h-full bg-indigo-600 rounded-full"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems (Two Sum, LRU Cache, Trapping Rain Water)..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
            >
              <option value="All">All Statuses</option>
              <option value="Not Started">Not Started</option>
              <option value="Attempted">Attempted</option>
              <option value="Solved">Solved</option>
              <option value="Revision">Revision</option>
            </select>
          </div>
        </div>
      </div>

      {/* Problems Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-800/40 text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <th className="py-3 px-4 font-semibold w-12 text-center">Status</th>
              <th className="py-3 px-4 font-semibold">Problem Title</th>
              <th className="py-3 px-4 font-semibold">Topic</th>
              <th className="py-3 px-4 font-semibold text-center">Difficulty</th>
              <th className="py-3 px-4 font-semibold">Platform Link</th>
              <th className="py-3 px-4 font-semibold text-right">Notes & Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
            {filteredProblems.map((prob) => {
              const isSolved = prob.status === 'Solved';

              return (
                <tr key={prob.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() =>
                        handleStatusChange(
                          prob.id,
                          isSolved ? 'Not Started' : 'Solved',
                          prob.title
                        )
                      }
                      className="p-1 text-slate-400 hover:text-emerald-600 transition-colors"
                      title={isSolved ? 'Mark as Not Started' : 'Mark as Solved'}
                    >
                      <CheckCircle2
                        className={`w-5 h-5 ${
                          isSolved ? 'text-emerald-500 fill-emerald-100 dark:fill-emerald-950' : ''
                        }`}
                      />
                    </button>
                  </td>

                  <td className="py-3.5 px-4 font-medium">
                    <div className="text-slate-900 dark:text-white font-bold">{prob.title}</div>
                    {prob.notes && (
                      <div className="text-[11px] text-slate-500 truncate max-w-sm mt-0.5">
                        {prob.notes}
                      </div>
                    )}
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    {prob.topicName}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold border ${getDifficultyBadge(
                        prob.difficulty
                      )}`}
                    >
                      {prob.difficulty}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <a
                      href={prob.platformUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                    >
                      <span>{prob.platform}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <select
                        value={prob.status}
                        onChange={(e) =>
                          handleStatusChange(
                            prob.id,
                            e.target.value as DsaStatus,
                            prob.title
                          )
                        }
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-md cursor-pointer border border-transparent ${getStatusBadge(
                          prob.status
                        )}`}
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="Attempted">Attempted</option>
                        <option value="Solved">Solved</option>
                        <option value="Revision">Revision</option>
                      </select>

                      <button
                        onClick={() => setActiveModalProblem(prob)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Edit solution notes"
                      >
                        <FileEdit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <ProblemDetailModal
        problem={activeModalProblem}
        isOpen={!!activeModalProblem}
        onClose={() => setActiveModalProblem(null)}
        onUpdateStatus={(id, status) => {
          handleStatusChange(id, status, activeModalProblem?.title || '');
          if (activeModalProblem) {
            setActiveModalProblem({ ...activeModalProblem, status });
          }
        }}
        onUpdateNotes={(id, notes) => {
          updateDsaNotes(id, notes);
          showToast('Updated problem notes', 'success');
        }}
      />
    </div>
  );
};
