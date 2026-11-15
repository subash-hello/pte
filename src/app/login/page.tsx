'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Lock, Eye, EyeOff, Shield, ArrowRight, 
  Loader2, KeyRound, Sparkles, AlertTriangle, X, MessageCircle
} from 'lucide-react';
import { setSession } from '@/lib/session';

export default function LoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        setError('Your access validity has expired. Please contact your consultancy or admin on WhatsApp to renew.');
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
        if (data.status === 'declined') {
          if (data.token && data.user) {
            setSession(data.token, data.user);
          }
          router.push('/approval-wait');
          return;
        }
        throw new Error(data.message || 'Invalid credentials. Please verify your email and password.');
      }

      setSession(data.token, data.user);

      if (data.user.role === 'student' && data.user.status === 'pending') {
        router.push('/approval-wait');
        return;
      }

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
    <div className="min-h-screen bg-[#f4f5fa] relative overflow-hidden flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-600 selection:text-white">
      {/* Subtle Radial Violet Glow matching masterieltsai.com */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-[440px] relative z-10">
        {/* Brand Top Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">
              Master PTE <span className="text-rose-600">AI</span>
            </span>
          </Link>
        </div>

        {/* Top Bar: STUDENT PORTAL + Staff & Admin Sign In */}
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="text-[11px] font-black uppercase tracking-widest text-indigo-600">
            STUDENT PORTAL
          </span>
          <Link
            href="/admin-login"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 hover:border-indigo-300 text-[11px] font-extrabold text-slate-700 hover:text-indigo-600 shadow-2xs transition-all"
          >
            <Lock className="w-3 h-3 text-amber-500" />
            <span>Staff & Admin Sign In</span>
          </Link>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight font-satoshi">Welcome Back</h1>
          <p className="mt-1.5 text-xs text-slate-500 font-semibold">Sign in to continue your PTE preparation</p>
        </div>

        {/* Multiple Devices Alert Banner */}
        {securityAlert && (
          <div className="mb-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold leading-relaxed flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>{securityAlert}</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold leading-relaxed flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Sign In Form */}
        <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email address"
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200/90 rounded-2xl text-slate-900 text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/10 transition-all shadow-2xs"
            />
          </div>

          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="w-full pl-11 pr-11 py-3.5 bg-white border border-slate-200/90 rounded-2xl text-slate-900 text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/10 transition-all shadow-2xs"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center justify-between pt-0.5 px-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
              <span className="text-xs text-slate-600 font-semibold">Remember me</span>
            </label>

            <button
              type="button"
              onClick={() => {
                setResetEmail(email);
                setShowResetModal(true);
              }}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 active:scale-[0.99]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In to Study</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-[#f4f5fa] text-slate-400 font-semibold">Or continue with</span>
          </div>
        </div>

        {/* Google Sign In Button matching masterieltsai.com */}
        <button
          type="button"
          onClick={async () => {
            setError('');
            try {
              const { supabaseClient } = await import('@/server/db/supabase');
              const { error: oauthErr } = await supabaseClient.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: `${window.location.origin}/login` },
              });
              if (oauthErr) throw oauthErr;
            } catch (err: any) {
              setError(err.message || 'Google Sign-In requires Google OAuth to be enabled or please sign in with your registered Email & Password.');
            }
          }}
          className="w-full py-3.5 px-4 bg-[#1e293b] hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.8C6.2 7.2 8.9 5 12 5z" />
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6l3.7 2.9c2.2-2 3.7-5 3.7-8.7z" />
            <path fill="#FBBC05" d="M5.3 14.8c-.2-.8-.4-1.6-.4-2.5s.2-1.7.4-2.5L1.6 7C.6 9 0 11.2 0 13.5s.6 4.5 1.6 6.5l3.7-2.9z" />
            <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5l-3.7 2.9C3.5 21.4 7.4 24 12 24z" />
          </svg>
          <span>Sign in with Google</span>
        </button>

        {/* Don't have an account */}
        <p className="mt-6 text-center text-xs font-semibold text-slate-500">
          Don&apos;t have a student account?{' '}
          <Link href="/signup" className="text-indigo-600 font-extrabold hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      {/* Floating Chat with Admin WhatsApp Pill */}
      <a
        href="https://wa.me/9779763876490"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition-all hover:scale-105"
      >
        <MessageCircle className="w-4 h-4 fill-white" />
        <span>Chat with Admin</span>
      </a>

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
