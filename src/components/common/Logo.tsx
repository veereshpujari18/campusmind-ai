import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showTagline = false }) => {
  const iconSizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Modern geometric StudentOS mark: layered graduation cap & dashboard node */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-md shadow-indigo-500/20`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          {/* Mortarboard cap top */}
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          {/* Dashboard node pillar */}
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className={`${textSizes[size]} font-bold tracking-tight text-slate-900 dark:text-white`}>
            Student<span className="text-indigo-600 dark:text-indigo-400">OS</span>
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium tracking-normal -mt-0.5">
            Everything a student needs
          </span>
        )}
      </div>
    </div>
  );
};
