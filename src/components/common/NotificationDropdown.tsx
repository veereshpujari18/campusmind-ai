import React, { useState, useRef, useEffect } from 'react';
import { Bell, CheckCheck, Clock, Award, Briefcase, Calendar, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';

export const NotificationDropdown: React.FC = () => {
  const { notifications, markNotificationRead, clearAllNotifications, setCurrentTab } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'scholarship':
        return <Award className="w-4 h-4 text-emerald-500" />;
      case 'internship':
        return <Briefcase className="w-4 h-4 text-blue-500" />;
      case 'deadline':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'academic':
        return <BookOpen className="w-4 h-4 text-indigo-500" />;
      default:
        return <Calendar className="w-4 h-4 text-slate-500" />;
    }
  };

  const handleItemClick = (id: string, tab?: NavigationTab) => {
    markNotificationRead(id);
    if (tab) {
      setCurrentTab(tab);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</span>
              {unreadCount > 0 && (
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  ({unreadCount} new)
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={clearAllNotifications}
                className="text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">No notifications</div>
            ) : (
              notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() => handleItemClick(n.id, n.actionTab)}
                  className={`w-full text-left p-3.5 flex items-start gap-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                    !n.read ? 'bg-indigo-50/30 dark:bg-indigo-950/20' : ''
                  }`}
                >
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 mt-0.5">
                    {getNotificationIcon(n.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                        {n.title}
                      </span>
                      <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {n.message}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
