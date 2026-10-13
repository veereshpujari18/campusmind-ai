import React from 'react';
import {
  Settings,
  Sun,
  Moon,
  Bell,
  Shield,
  RotateCcw,
  Download,
  CheckCircle2,
  Trash2,
  Lock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';

export const SettingsView: React.FC = () => {
  const { settings, updateSettings, resetAllData } = useApp();
  const { showToast } = useToast();

  const handleToggleTheme = (theme: 'light' | 'dark') => {
    updateSettings({ theme });
    showToast(`Theme switched to ${theme} mode`, 'info');
  };

  const handleExportData = () => {
    try {
      const allData = {
        profile: localStorage.getItem('studentos_profile'),
        semesters: localStorage.getItem('studentos_semesters'),
        scholarships: localStorage.getItem('studentos_scholarships'),
        internships: localStorage.getItem('studentos_internships'),
        dsaProblems: localStorage.getItem('studentos_dsa_problems'),
        tasks: localStorage.getItem('studentos_study_tasks'),
        exportDate: new Date().toISOString(),
      };
      const blob = new Blob([JSON.stringify(allData, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `StudentOS_Backup_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Exported complete StudentOS workspace JSON', 'success');
    } catch {
      showToast('Could not export data', 'error');
    }
  };

  const handleResetConfirm = () => {
    if (window.confirm('Are you sure you want to restore all initial engineering demo data? This will clear local changes.')) {
      resetAllData();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Top Banner */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
          <Settings className="w-4 h-4" />
          <span>Application Preferences</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          System Settings
        </h1>
        <p className="text-xs text-slate-500">
          Configure interface appearance, notifications, privacy, and local storage data.
        </p>
      </div>

      {/* Theme Settings */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Appearance & Theme</h3>
          <p className="text-xs text-slate-500">
            Choose light SaaS interface or dark mode for late-night coding sessions.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-sm">
          <button
            onClick={() => handleToggleTheme('light')}
            className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
              settings.theme === 'light'
                ? 'bg-indigo-50 border-indigo-600 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 shadow-2xs'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Light Mode</span>
          </button>

          <button
            onClick={() => handleToggleTheme('dark')}
            className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
              settings.theme === 'dark'
                ? 'bg-indigo-50 border-indigo-600 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 shadow-2xs'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Moon className="w-4 h-4 text-indigo-400" />
            <span>Dark Mode</span>
          </button>
        </div>
      </div>

      {/* Grading Scale Settings */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">University Grading Scale</h3>
          <p className="text-xs text-slate-500">
            Configure whether CGPA is calculated on 10.0 or 4.0 scale.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium cursor-pointer">
            <input
              type="radio"
              name="gradingScale"
              checked={settings.gradingScale === 10}
              onChange={() => updateSettings({ gradingScale: 10 })}
              className="accent-indigo-600"
            />
            <span>10.0 Point Scale (Standard Indian Autonomous / AICTE)</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium cursor-pointer">
            <input
              type="radio"
              name="gradingScale"
              checked={settings.gradingScale === 4}
              onChange={() => updateSettings({ gradingScale: 4 })}
              className="accent-indigo-600"
            />
            <span>4.0 Scale (US / International Standard)</span>
          </label>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Notifications & Alerts</h3>
          <p className="text-xs text-slate-500">
            Control reminders for scholarship deadlines and internship assessment dates.
          </p>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 cursor-pointer">
            <div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white">
                Upcoming Deadline Alerts
              </div>
              <div className="text-[11px] text-slate-500">
                Receive warnings 3 days before scholarship and internship deadlines expire.
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => updateSettings({ emailNotifications: e.target.checked })}
              className="accent-indigo-600 w-4 h-4"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 cursor-pointer">
            <div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white">
                Study Planner Daily Reminders
              </div>
              <div className="text-[11px] text-slate-500">
                Notify when high-priority lab assignments or study tasks are due today.
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.desktopReminders}
              onChange={(e) => updateSettings({ desktopReminders: e.target.checked })}
              className="accent-indigo-600 w-4 h-4"
            />
          </label>
        </div>
      </div>

      {/* Data Management & Demo Reset */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Data & Backup</h3>
          <p className="text-xs text-slate-500">
            Export your complete student records or restore factory demo state.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            onClick={handleExportData}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Workspace (JSON)</span>
          </button>

          <button
            onClick={handleResetConfirm}
            className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
