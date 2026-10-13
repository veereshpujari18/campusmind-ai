import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

interface PomodoroTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PomodoroTimerModal: React.FC<PomodoroTimerModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'focus' | 'shortBreak' | 'longBreak'>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const getDuration = (m: 'focus' | 'shortBreak' | 'longBreak') => {
    switch (m) {
      case 'focus':
        return 25 * 60;
      case 'shortBreak':
        return 5 * 60;
      case 'longBreak':
        return 15 * 60;
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft]);

  const switchMode = (newMode: 'focus' | 'shortBreak' | 'longBreak') => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(getDuration(newMode));
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(getDuration(mode));
  };

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const totalDuration = getDuration(mode);
  const progress = ((totalDuration - timeLeft) / totalDuration) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 text-center space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-4 h-4" />
            <span>Deep Work Session</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center justify-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => switchMode('focus')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              mode === 'focus'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            25m Focus
          </button>
          <button
            onClick={() => switchMode('shortBreak')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              mode === 'shortBreak'
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-300 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            5m Break
          </button>
          <button
            onClick={() => switchMode('longBreak')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              mode === 'longBreak'
                ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            15m Rest
          </button>
        </div>

        {/* Big Digit Timer */}
        <div className="py-4">
          <div className="text-6xl font-black text-slate-900 dark:text-white font-mono tracking-tight tabular-nums">
            {formattedTime}
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {mode === 'focus' ? 'Deep focus on engineering coursework' : 'Recharge your mind'}
          </p>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 mt-4 overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-indigo-600 rounded-full transition-all duration-500"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-md flex items-center gap-2"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? 'Pause Timer' : 'Start Focus'}</span>
          </button>

          <button
            onClick={resetTimer}
            className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
