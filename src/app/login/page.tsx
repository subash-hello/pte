'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Lock, Eye, EyeOff, Shield, User, Building2, ArrowRight, 
  Loader2, KeyRound, Sparkles, CheckCircle2, AlertTriangle, X, Check, Server
} from 'lucide-react';
import { setSession } from '@/lib/session';

export default function LoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('admin@ielts.ai');
  const [password, setPassword] = useState('adminpass123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [securityAlert, setSecurityAlert] = useState<string | null>(null);

  // Forgot Password Modal States
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetStep, setResetStep] = useState<1 | 2>(1);
  const [resetLoading, setResetLoading] = useState(false);
  const [demoCode, setDemoCode] = useState<string | null>(null);
  const [resetSuccessMsg, setResetSuccessMsg] = useState('');
  const [resetErrorMsg, setResetErrorMsg] = useState('');

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('multiple_devices') === 'true') {
        setSecurityAlert('⚠️ Security Notice: You were logged out because your account was accessed from another browser or device. Only one active session is permitted at a time.');
      }
      if (params.get('expired') === 'true') {
        setError('Your 365-day access license has expired. Please contact campus administration to renew.');
      }
    }
  }, []);

  const handleLogin = async (e?: React.FormEvent, customEmail?: string, customPass?: string) => {
    if (e) e.preventDefault();
    
    setError('');
    setIsLoading(true);

    const emailToSend = (customEmail || email).trim().toLowerCase();
    const passToSend = customPass || password;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailToSend, password: passToSend }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        // Intercept declined status
        if (data.status === 'declined') {
          if (data.token && data.user) {
            setSession(data.token, data.user);
          }
          router.push('/approval-wait');
          return;
        }
        throw new Error(data.message || 'Invalid credentials. Please verify your email and password.');
      }

      // Store session
      setSession(data.token, data.user);

      // Check if student status is pending authorization
      if (data.user.role === 'student' && data.user.status === 'pending') {
        router.push('/approval-wait');
        return;
      }

      // Redirect based on role
      if (data.user.role === 'super_admin' || data.user.role === 'branch_admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check credentials.');
      setIsLoading(false);
    }
  };

  const handleRequestResetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      setResetErrorMsg('Please enter your email address');
      return;
    }
    setResetLoading(true);
    setResetErrorMsg('');
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to request reset code.');
      }
      if (data.demoCode) {
        setDemoCode(data.demoCode);
      }
      setResetStep(2);
    } catch (err: any) {
      setResetErrorMsg(err.message || 'Failed to request reset code.');
    } finally {
      setResetLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetCode || !newPassword) {
      setResetErrorMsg('Please enter both code and new password');
      return;
    }
    if (newPassword.length < 6) {
      setResetErrorMsg('Password must be at least 6 characters');
      return;
    }

    setResetLoading(true);
    setResetErrorMsg('');
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail.trim().toLowerCase(), code: resetCode, newPassword }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to reset password.');
      }
      setResetSuccessMsg('Password reset successful! Please sign in with your new password.');
      setTimeout(() => {
        setShowResetModal(false);
        setPassword(newPassword);
        setEmail(resetEmail);
        setResetStep(1);
        setResetCode('');
        setNewPassword('');
        setResetSuccessMsg('');
      }, 1500);
    } catch (err: any) {
      setResetErrorMsg(err.message || 'Failed to reset password.');
    } finally {
      setResetLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-600 selection:text-white">
      {/* Brand Top Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
            P
          </div>
          <div className="text-left">
            <span className="text-2xl font-black text-slate-900 tracking-tight block leading-tight">PTE Master AI</span>
            <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest block">Pearson Academic Engine</span>
          </div>
        </Link>
        <h2 className="mt-6 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Candidate Portal</h2>
        <p className="mt-1 text-xs text-slate-500 font-semibold">Sign in to your practice portal or command desk</p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-[28px] border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden">
          
          {/* Multiple Devices Alert Banner */}
          {securityAlert && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold leading-relaxed flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{securityAlert}</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold leading-relaxed flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Sign In Form */}
          <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@campus.edu or student@pteai.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-2xs"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setResetEmail(email);
                    setShowResetModal(true);
                  }}
                  className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your account password"
                  className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <span className="text-xs text-slate-600 font-semibold">Keep session active</span>
              </label>

              <span className="text-[11px] text-emerald-600 font-extrabold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Supabase Protected
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 active:scale-98 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Bar (for user evaluation) */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2.5 text-center">
              Quick One-Click Test Accounts
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@ielts.ai');
                  setPassword('adminpass123');
                  handleLogin(undefined, 'admin@ielts.ai', 'adminpass123');
                }}
                className="p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-left transition-all cursor-pointer group"
              >
                <span className="text-[10px] font-black text-indigo-700 block truncate group-hover:text-indigo-800">Super Admin</span>
                <span className="text-[9px] text-slate-500 font-mono block truncate">admin@ielts.ai</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEmail('ktm.admin@pteai.com');
                  setPassword('adminpass123');
                  handleLogin(undefined, 'ktm.admin@pteai.com', 'adminpass123');
                }}
                className="p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-left transition-all cursor-pointer group"
              >
                <span className="text-[10px] font-black text-slate-800 block truncate group-hover:text-indigo-800">Branch Admin</span>
                <span className="text-[9px] text-slate-500 font-mono block truncate">ktm.admin</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEmail('student@pteai.com');
                  setPassword('adminpass123');
                  handleLogin(undefined, 'student@pteai.com', 'adminpass123');
                }}
                className="p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-left transition-all cursor-pointer group"
              >
                <span className="text-[10px] font-black text-emerald-700 block truncate group-hover:text-emerald-800">Student</span>
                <span className="text-[9px] text-slate-500 font-mono block truncate">student@pteai</span>
              </button>
            </div>
          </div>

          {/* Links to Signup & Staff Gate */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">New student?</span>
            <Link href="/signup" className="font-extrabold text-indigo-600 hover:text-indigo-700">
              Create Candidate Account →
            </Link>
          </div>
          <div className="mt-3 text-center">
            <Link href="/admin-login" className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-slate-600 hover:text-slate-900 transition-colors">
              <Server className="w-3.5 h-3.5 text-rose-500" />
              <span>Campus & System Staff Command Gate →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showResetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative"
            >
              <button
                onClick={() => setShowResetModal(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Reset Password</h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    {resetStep === 1 ? 'Step 1: Request Verification Code' : 'Step 2: Enter Code & New Password'}
                  </p>
                </div>
              </div>

              {resetErrorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {resetErrorMsg}
                </div>
              )}

              {resetSuccessMsg && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                  {resetSuccessMsg}
                </div>
              )}

              {resetStep === 1 ? (
                <form onSubmit={handleRequestResetCode} className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                      Account Email Address
                    </label>
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      placeholder="Enter registered email"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer disabled:opacity-60"
                  >
                    {resetLoading ? 'Generating Code...' : 'Send Verification Code'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  {demoCode && (
                    <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Verification Code:</span>
                      <span className="text-sm font-mono font-black text-indigo-700 tracking-widest">{demoCode}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                      6-Digit Reset Code
                    </label>
                    <input
                      type="text"
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      required
                      placeholder="e.g. 123456"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 font-mono tracking-wider focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                      New Password (Min 6 chars)
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      placeholder="Enter strong new password"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer disabled:opacity-60"
                  >
                    {resetLoading ? 'Updating Password...' : 'Save & Sign In'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
