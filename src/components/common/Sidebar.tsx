import React from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  Award,
  Briefcase,
  Target,
  Code,
  Calculator,
  CalendarCheck,
  BookOpen,
  Sparkles,
  User,
  Settings,
  LogOut,
  X,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';
import { Logo } from './Logo';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  tab: NavigationTab;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { currentTab, setCurrentTab, logout, scholarships, internships, studyTasks } = useApp();

  const activeInternshipsCount = internships.filter(
    (i) => i.status !== 'Rejected' && i.status !== 'Selected'
  ).length;
  const pendingTasksCount = studyTasks.filter((t) => !t.completed).length;

  const navItems: NavItem[] = [
    {
      tab: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4 shrink-0" />,
    },
    {
      tab: 'academics',
      label: 'Academics',
      icon: <GraduationCap className="w-4 h-4 shrink-0" />,
    },
    {
      tab: 'scholarships',
      label: 'Scholarships',
      icon: <Award className="w-4 h-4 shrink-0" />,
      badge: scholarships.length,
    },
    {
      tab: 'internships',
      label: 'Internships',
      icon: <Briefcase className="w-4 h-4 shrink-0" />,
      badge: activeInternshipsCount > 0 ? activeInternshipsCount : undefined,
    },
    {
      tab: 'placement',
      label: 'Placement Prep',
      icon: <Target className="w-4 h-4 shrink-0" />,
    },
    {
      tab: 'dsa',
      label: 'DSA Tracker',
      icon: <Code className="w-4 h-4 shrink-0" />,
    },
    {
      tab: 'cgpa',
      label: 'CGPA Calculator',
      icon: <Calculator className="w-4 h-4 shrink-0" />,
    },
    {
      tab: 'planner',
      label: 'Study Planner',
      icon: <CalendarCheck className="w-4 h-4 shrink-0" />,
      badge: pendingTasksCount > 0 ? pendingTasksCount : undefined,
    },
    {
      tab: 'resources',
      label: 'College Resources',
      icon: <BookOpen className="w-4 h-4 shrink-0" />,
    },
    {
      tab: 'assistant',
      label: 'AI Study Assistant',
      icon: <Sparkles className="w-4 h-4 shrink-0 text-indigo-500" />,
    },
    {
      tab: 'profile',
      label: 'Profile',
      icon: <User className="w-4 h-4 shrink-0" />,
    },
    {
      tab: 'settings',
      label: 'Settings',
      icon: <Settings className="w-4 h-4 shrink-0" />,
    },
  ];

  const handleTabClick = (tab: NavigationTab) => {
    setCurrentTab(tab);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      {/* Brand Header */}
      <div>
        <div className="p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <Logo size="md" showTagline />
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-210px)]">
          {navItems.map((item) => {
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => handleTabClick(item.tab)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                    }
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-semibold rounded-md tabular-nums ${
                      isActive
                        ? 'bg-indigo-200/60 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Action */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
        <button
          onClick={() => handleTabClick('landing')}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            Landing Page
          </span>
          <span className="text-[10px] text-slate-400">Preview</span>
        </button>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-full bg-white dark:bg-slate-900 h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
