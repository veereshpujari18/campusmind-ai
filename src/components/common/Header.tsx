import React from 'react';
import { Search, Sun, Moon, Menu } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NotificationDropdown } from './NotificationDropdown';

interface HeaderProps {
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu }) => {
  const { currentTab, setIsSearchOpen, settings, updateSettings, profile, setCurrentTab } = useApp();

  const getBreadcrumbTitle = () => {
    switch (currentTab) {
      case 'dashboard':
        return 'Overview';
      case 'academics':
        return 'Academic Performance';
      case 'scholarships':
        return 'Scholarship Finder';
      case 'internships':
        return 'Internship Tracker';
      case 'placement':
        return 'Placement Preparation';
      case 'dsa':
        return 'DSA Progress Tracker';
      case 'cgpa':
        return 'CGPA & SGPA Calculator';
      case 'planner':
        return 'Study Planner';
      case 'resources':
        return 'College Resources';
      case 'assistant':
        return 'AI Study Assistant';
      case 'profile':
        return 'Student Profile';
      case 'settings':
        return 'System Settings';
      default:
        return 'Workspace';
    }
  };

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Zone 1: Brand / Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-slate-900 dark:text-white">StudentOS</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-600 dark:text-slate-300 font-medium truncate max-w-[150px] sm:max-w-xs">
            {getBreadcrumbTitle()}
          </span>
        </div>
      </div>

      {/* Zone 2: Global Search Bar Affordance */}
      <div className="flex-1 max-w-md hidden md:block">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-slate-400 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search resources, scholarships, DSA, internships...</span>
          </div>
          <kbd className="px-1.5 py-0.5 font-mono text-[10px] text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded shadow-2xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Zone 3: Actions & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile search trigger */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle theme"
          title={`Switch to ${settings.theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {settings.theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </button>

        {/* Notifications */}
        <NotificationDropdown />

        <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

        {/* User Mini Avatar & Switch to Profile */}
        <button
          onClick={() => setCurrentTab('profile')}
          className="flex items-center gap-2.5 p-1 sm:px-2 sm:py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
            {profile.name.charAt(0)}
          </div>
          <div className="hidden sm:block">
            <div className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">
              {profile.name}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Sem {profile.semester} · {profile.branch.split(' ')[0]}
            </div>
          </div>
        </button>
      </div>
    </header>
  );
};
