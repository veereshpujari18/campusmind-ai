import React, { useState } from 'react';
import {
  CalendarCheck,
  Plus,
  Clock,
  CheckCircle2,
  Circle,
  Trash2,
  Sparkles,
  Calendar,
  AlertCircle,
  Timer,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { StudyTask } from '../../types';
import { AddTaskModal } from './AddTaskModal';
import { PomodoroTimerModal } from './PomodoroTimerModal';

export const StudyPlannerView: React.FC = () => {
  const { studyTasks, addTask, toggleTask, deleteTask } = useApp();
  const { showToast } = useToast();

  const [activeFilter, setActiveFilter] = useState<'all' | 'today' | 'upcoming' | 'completed'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];

  const filteredTasks = studyTasks.filter((task) => {
    if (activeFilter === 'completed') return task.completed;
    if (activeFilter === 'today') return !task.completed && task.deadline <= todayStr;
    if (activeFilter === 'upcoming') return !task.completed && task.deadline > todayStr;
    return true;
  });

  const totalMinutes = studyTasks
    .filter((t) => !t.completed)
    .reduce((acc, t) => acc + t.estimatedMinutes, 0);
  const completedCount = studyTasks.filter((t) => t.completed).length;
  const pendingCount = studyTasks.filter((t) => !t.completed).length;

  const handleToggle = (task: StudyTask) => {
    toggleTask(task.id);
    if (!task.completed) {
      showToast(`Completed: "${task.title}"`, 'success');
    } else {
      showToast(`Marked "${task.title}" as pending`, 'info');
    }
  };

  const handleDelete = (id: string, title: string) => {
    deleteTask(id);
    showToast(`Removed task "${title}"`, 'info');
  };

  const getPriorityBadge = (p: StudyTask['priority']) => {
    switch (p) {
      case 'High':
        return 'text-rose-700 bg-rose-50 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      case 'Medium':
        return 'text-amber-700 bg-amber-50 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Low':
        return 'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
            <CalendarCheck className="w-4 h-4" />
            <span>Academic Time Management</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Study Planner & Task Calendar
          </h1>
          <p className="text-xs text-slate-500">
            Organize lab milestones, assignment deadlines, and daily LeetCode practice routines.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsTimerModalOpen(true)}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Timer className="w-4 h-4 text-indigo-500" />
            <span>Focus Timer</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Study Task</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 block">Pending Tasks</span>
          <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {pendingCount}
          </span>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 block">Completed</span>
          <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
            {completedCount}
          </span>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 block">Estimated Time</span>
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
            {Math.round(totalMinutes / 60)}h {totalMinutes % 60}m
          </span>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 block">Completion Rate</span>
          <span className="text-2xl font-bold text-purple-600 dark:text-purple-400 tabular-nums">
            {Math.round((completedCount / (studyTasks.length || 1)) * 100)}%
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 w-fit">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeFilter === 'all'
              ? 'bg-indigo-600 text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          All Tasks ({studyTasks.length})
        </button>
        <button
          onClick={() => setActiveFilter('today')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeFilter === 'today'
              ? 'bg-indigo-600 text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Today&apos;s Focus
        </button>
        <button
          onClick={() => setActiveFilter('upcoming')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeFilter === 'upcoming'
              ? 'bg-indigo-600 text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveFilter('completed')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeFilter === 'completed'
              ? 'bg-indigo-600 text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* Tasks List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800/60 overflow-hidden shadow-2xs">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              All caught up in this view!
            </h3>
            <p className="text-xs text-slate-500">
              No tasks pending under &ldquo;{activeFilter}&rdquo;. Create a new study goal or review completed items.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 flex items-center justify-between gap-3 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors ${
                task.completed ? 'opacity-60 bg-slate-50/40 dark:bg-slate-900/40' : ''
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <button
                  onClick={() => handleToggle(task)}
                  className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-xs font-bold ${
                        task.completed
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {task.title}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getPriorityBadge(
                        task.priority
                      )}`}
                    >
                      {task.priority} Priority
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {task.subject}
                    </span>
                    <span>·</span>
                    <span>{task.category}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{task.estimatedMinutes} mins</span>
                    </span>
                    <span>·</span>
                    <span className="tabular-nums">Due: {task.deadline}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleDelete(task.id, task.title)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                  title="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modals */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(task) => {
          addTask(task);
          showToast(`Scheduled: "${task.title}"`, 'success');
        }}
      />

      <PomodoroTimerModal
        isOpen={isTimerModalOpen}
        onClose={() => setIsTimerModalOpen(false)}
      />
    </div>
  );
};
