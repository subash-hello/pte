'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, Shield, User, Building2, ArrowRight, Loader2, KeyRound, Sparkles, CheckCircle2, Zap, Award } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/types/auth';
import { setSession } from '@/lib/session';

export default function LoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('student@pteai.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e?: React.FormEvent, customEmail?: string, customPass?: string) => {
    if (e) e.preventDefault();
    
    setError('');
    setSuccess('');
    setIsLoading(true);

    const emailToSend = customEmail || email;
    const passToSend = customPass || password;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailToSend, password: passToSend }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || data.error || 'Invalid credentials. Please check your email and password.');
      }

      // Success - set session
      setSession(data.token, data.user);
      setSuccess('Signed in successfully! Redirecting...');

      // Redirect based on role
      setTimeout(() => {
        if (data.user.role === 'super_admin' || data.user.role === 'branch_admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/dashboard';
        }
      }, 350);
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in');
      setIsLoading(false);
    }
  };

  const handlePresetSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'student') {
      setEmail('student@pteai.com');
      setPassword('password123');
    } else if (role === 'branch_admin') {
      setEmail('ktm.admin@pteai.com');
      setPassword('admin123');
    } else if (role === 'super_admin') {
      setEmail('admin@ptemaster.com');
      setPassword('admin123');
    }
  };

  const handleDirectDemoLogin = async (role: UserRole) => {
    setIsDemoLoading(role);
    setSelectedRole(role);
    let demoEmail = 'student@pteai.com';
    let demoPass = 'password123';

    if (role === 'branch_admin') {
      demoEmail = 'ktm.admin@pteai.com';
      demoPass = 'admin123';
    } else if (role === 'super_admin') {
      demoEmail = 'admin@ptemaster.com';
      demoPass = 'admin123';
    }

    setEmail(demoEmail);
    setPassword(demoPass);
    await handleLogin(undefined, demoEmail, demoPass);
    setIsDemoLoading(null);
  };

  if (!mounted) return null;

  return (
    <div suppressHydrationWarning className="min-h-screen bg-[#f8f9fc] text-[#0f172a] flex font-sans selection:bg-indigo-600 selection:text-white">
      {/* Left Feature Showcase (Desktop) */}
      <div className="hidden lg:flex lg:w-5/12 bg-[#0b0f19] text-white p-12 lg:p-16 flex-col justify-between relative overflow-hidden">
        {/* Background glow accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Logo Header */}
          <Link href="/" className="inline-flex items-center gap-2.5 group mb-12">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-600/30">
              <Sparkles className="w-5 h-5 text-indigo-200" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              PTE<span className="text-indigo-400">Master</span>
              <span className="text-xs px-2 py-0.5 ml-1.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold font-mono border border-indigo-400/30">AI</span>
            </span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Official Pearson GSE Scoring Engine
          </div>

          <h2 className="text-4xl lg:text-5xl font-black leading-tight mb-6 tracking-tight text-white">
            Smart, authentic <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">PTE Academic</span> prep.
          </h2>

          <p className="text-slate-400 text-sm leading-relaxed max-w-md font-medium">
            Experience official 2-hour mock exams, 1,000+ authentic databank questions, and real-time AI scoring.
          </p>
        </div>

        {/* Live Metrics Showcase */}
        <div className="relative z-10 space-y-3.5 my-auto py-8">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0 font-bold">
              📚
            </div>
            <div>
              <h4 className="font-extrabold text-white text-xs">1,000+ Authentic Items</h4>
              <p className="text-slate-400 text-[11px] font-medium mt-0.5">50+ practice items for all 20 question types</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0 font-bold">
              ⚡
            </div>
            <div>
              <h4 className="font-extrabold text-white text-xs">Instant AI Evaluation</h4>
              <p className="text-slate-400 text-[11px] font-medium mt-0.5">Grammar, pronunciation & fluency scoring in seconds</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold">
              🏆
            </div>
            <div>
              <h4 className="font-extrabold text-white text-xs">30 Full 2-Hour Mock Tests</h4>
              <p className="text-slate-400 text-[11px] font-medium mt-0.5">Complete timed test papers with 10-90 GSE scorecards</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-slate-500 pt-6 border-t border-slate-800 flex items-center justify-between font-medium">
          <span>© {new Date().getFullYear()} PTE Master AI</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Platform Live & Online
          </span>
        </div>
      </div>

      {/* Right Login Panel */}
      <div className="w-full lg:w-7/12 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 overflow-y-auto">
        <div className="w-full max-w-md my-auto">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-2xl font-black text-slate-900">
                PTE<span className="text-indigo-600">Master</span> AI
              </span>
            </Link>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Exam Practice Portal</p>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Sign in to your account</h1>
            <p className="text-slate-500 text-xs font-semibold mt-1">Access your practice items, AI tutor, and scorecards.</p>
          </div>

          {/* 1-Click Fast Demo Login Buttons */}
          <div className="mb-6 bg-indigo-50/60 border border-indigo-100 rounded-2xl p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" /> 1-Click Demo Login:
              </label>
              <span className="text-[10px] text-indigo-600 font-bold bg-white px-2 py-0.5 rounded-full border border-indigo-200">
                Instant Access
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDirectDemoLogin('student')}
                disabled={Boolean(isDemoLoading)}
                className="py-2.5 px-2 rounded-xl bg-white hover:bg-indigo-600 hover:text-white text-slate-800 text-xs font-extrabold border border-indigo-200/80 shadow-2xs transition-all active:scale-95 flex flex-col items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                {isDemoLoading === 'student' ? <Loader2 className="w-4 h-4 animate-spin text-indigo-600" /> : <User className="w-4 h-4 text-indigo-600" />}
                <span>Student</span>
              </button>

              <button
                type="button"
                onClick={() => handleDirectDemoLogin('branch_admin')}
                disabled={Boolean(isDemoLoading)}
                className="py-2.5 px-2 rounded-xl bg-white hover:bg-indigo-600 hover:text-white text-slate-800 text-xs font-extrabold border border-indigo-200/80 shadow-2xs transition-all active:scale-95 flex flex-col items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                {isDemoLoading === 'branch_admin' ? <Loader2 className="w-4 h-4 animate-spin text-indigo-600" /> : <Building2 className="w-4 h-4 text-indigo-600" />}
                <span>Branch</span>
              </button>

              <button
                type="button"
                onClick={() => handleDirectDemoLogin('super_admin')}
                disabled={Boolean(isDemoLoading)}
                className="py-2.5 px-2 rounded-xl bg-white hover:bg-indigo-600 hover:text-white text-slate-800 text-xs font-extrabold border border-indigo-200/80 shadow-2xs transition-all active:scale-95 flex flex-col items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                {isDemoLoading === 'super_admin' ? <Loader2 className="w-4 h-4 animate-spin text-indigo-600" /> : <Shield className="w-4 h-4 text-indigo-600" />}
                <span>Super Admin</span>
              </button>
            </div>
          </div>

          {/* Quick Credentials Preset Selector */}
          <div className="mb-6">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-indigo-600" /> Or fill credentials by portal role:
            </label>
            <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => handlePresetSelect('student')}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedRole === 'student'
                    ? 'bg-white text-indigo-600 shadow-2xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => handlePresetSelect('branch_admin')}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedRole === 'branch_admin'
                    ? 'bg-white text-indigo-600 shadow-2xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Branch Admin
              </button>
              <button
                type="button"
                onClick={() => handlePresetSelect('super_admin')}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedRole === 'super_admin'
                    ? 'bg-white text-indigo-600 shadow-2xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Super Admin
              </button>
            </div>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Success Message Alert */}
          {success && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 shadow-2xs transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('For testing, default password is "password123" for student or "admin123" for admin.')}
                  className="text-xs text-indigo-600 hover:underline font-bold"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-11 py-3.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 shadow-2xs transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between py-1">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 accent-indigo-600 focus:ring-indigo-500"
                />
                <span>Remember this device for 30 days</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-extrabold text-xs hover:bg-indigo-700 active:scale-[0.99] transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Verifying Credentials...
                </>
              ) : (
                <>
                  Sign In to {selectedRole === 'student' ? 'Student Portal' : selectedRole === 'branch_admin' ? 'Branch Admin' : 'Super Admin'} <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs font-semibold text-slate-500">
            Don't have an account yet?{' '}
            <Link href="/signup" className="text-indigo-600 font-extrabold hover:underline">
              Create student account →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
