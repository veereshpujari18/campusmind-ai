import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Logo } from '../common/Logo';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, login } = useApp();
  const { showToast } = useToast();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(authModalMode);
  const [email, setEmail] = useState('aryan.sharma@engg.edu');
  const [password, setPassword] = useState('StudentOS2026!');
  const [fullName, setFullName] = useState('Aryan Sharma');
  const [forgotSent, setForgotSent] = useState(false);

  // Sync mode when open mode changes
  React.useEffect(() => {
    setMode(authModalMode);
    setForgotSent(false);
  }, [authModalMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'forgot') {
      if (!email) {
        showToast('Please enter your registered student email', 'error');
        return;
      }
      setForgotSent(true);
      showToast('Password reset link sent to your email inbox', 'success');
      return;
    }

    if (!email || !password) {
      showToast('Please fill in all required credentials', 'error');
      return;
    }

    login(email);
    showToast(
      mode === 'signup'
        ? `Welcome to StudentOS, ${fullName || 'Student'}!`
        : `Welcome back to your workspace!`,
      'success'
    );
  };

  const handleQuickDemoLogin = () => {
    login('aryan.sharma@engg.edu');
    showToast('Signed in with Verified Engineering Demo Profile', 'success');
  };

  const handleGoogleSignIn = () => {
    login('aryan.sharma@engg.edu');
    showToast('Authenticated via Google Single Sign-On', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-6 pb-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <Logo size="sm" />
          <button
            onClick={closeAuthModal}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Header titles */}
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {mode === 'login' && 'Sign In to StudentOS'}
              {mode === 'signup' && 'Create Your Student Account'}
              {mode === 'forgot' && 'Reset Your Password'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {mode === 'login' && 'Access your academic records, internships & preparation tools'}
              {mode === 'signup' && 'Join thousands of engineering students leveling up their careers'}
              {mode === 'forgot' && 'We will send a secure password recovery instruction'}
            </p>
          </div>

          {/* Quick Demo Login Pill */}
          {mode !== 'forgot' && (
            <div className="mb-5">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2.5 px-4 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>⚡ Quick Demo Login (Aryan Sharma — 6th Sem)</span>
              </button>
            </div>
          )}

          {/* Google Sign In UI Button */}
          {mode !== 'forgot' && (
            <>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full py-2.5 px-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2.5 transition-colors shadow-2xs mb-4"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google Student Account</span>
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white dark:bg-slate-900 text-slate-400">
                    or continue with email
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Form */}
          {forgotSent ? (
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Check Your Inbox</h3>
              <p className="text-xs text-slate-500">
                We sent password instructions to <span className="font-semibold">{email}</span>
              </p>
              <button
                type="button"
                onClick={() => setMode('login')}
                className="mt-3 text-xs font-semibold text-indigo-600 hover:underline"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Aryan Sharma"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  College / Institutional Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@engg.edu"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      Password
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl text-xs transition-colors shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2"
              >
                <span>
                  {mode === 'login' && 'Sign In to Workspace'}
                  {mode === 'signup' && 'Create Account'}
                  {mode === 'forgot' && 'Send Recovery Email'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Bottom Switcher */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
            {mode === 'login' && (
              <p>
                Don&apos;t have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Create one now
                </button>
              </p>
            )}
            {mode === 'signup' && (
              <p>
                Already have a StudentOS account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Sign In
                </button>
              </p>
            )}
            {mode === 'forgot' && (
              <p>
                Remember your credentials?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Back to Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
