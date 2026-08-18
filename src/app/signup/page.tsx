'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, User, Phone, Loader2, Check, ArrowRight, ShieldCheck, Award, Sparkles, Building2, Target, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';
import { setSession } from '@/lib/session';

export default function SignupPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [branch, setBranch] = useState('Kathmandu Main Campus');
  const [pteGoal, setPteGoal] = useState(79);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(true);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter your confirm password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters in length.');
      return;
    }

    if (!agreed) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password,
          branch,
          pteGoal: Number(pteGoal)
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || data.error || 'Registration failed. Please check your information.');
      }

      // Store authenticated session
      setSession(data.token, data.user);
      setSuccessMessage('Account registered successfully! Redirecting to student practice dashboard...');

      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 500);
    } catch (err: any) {
      setError(err.message || 'An error occurred during account creation.');
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-slate-200' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score += 1;
    
    if (score === 1) return { score, label: 'Fair (6+ chars)', color: 'bg-rose-500' };
    if (score === 2) return { score, label: 'Good (8+ chars)', color: 'bg-amber-500' };
    if (score === 3) return { score, label: 'Strong (Letters + Numbers)', color: 'bg-emerald-500' };
    return { score: 0, label: '', color: 'bg-slate-200' };
  };

  const strength = getPasswordStrength(password);

  if (!mounted) return null;

  return (
    <div suppressHydrationWarning className="min-h-screen bg-[#f8f9fc] text-[#0f172a] flex font-sans selection:bg-indigo-600 selection:text-white">
      {/* Left Feature Showcase (Desktop Only) */}
      <div className="hidden lg:flex lg:w-5/12 bg-[#0b0f19] text-white p-12 lg:p-16 flex-col justify-between relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2.5 group mb-12">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-600/30">
              <Sparkles className="w-5 h-5 text-indigo-200" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              PTE<span className="text-indigo-400">Master</span>
              <span className="text-xs px-2 py-0.5 ml-1.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold font-mono border border-indigo-400/30">AI</span>
            </span>
          </Link>

          <h2 className="text-4xl lg:text-5xl font-black leading-tight mb-6 tracking-tight text-white">
            Start your journey <br />
            to a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">79+ Target Score.</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md font-medium">
            Join thousands of test-takers preparing with official 2-hour exam simulators, instant Gemini AI evaluation, and 90-band templates.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="relative z-10 space-y-3.5 my-auto py-8">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center shrink-0 text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-xs">Official Pearson Algorithm Alignment</h4>
              <p className="text-slate-400 text-[11px] font-medium mt-0.5">Scored against Pearson GSE 10-90 scale standards.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center shrink-0 text-purple-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-xs">All 20 Question Types</h4>
              <p className="text-slate-400 text-[11px] font-medium mt-0.5">Complete coverage for Speaking, Writing, Reading & Listening.</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-slate-500 pt-6 border-t border-slate-800 flex items-center justify-between font-medium">
          <span>© {new Date().getFullYear()} PTE Master AI</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Live Registration Open
          </span>
        </div>
      </div>

      {/* Right Registration Form Panel */}
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
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Create Student Account</p>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Create your account</h1>
            <p className="text-slate-500 text-xs font-semibold mt-1">Register for full access to the PTE question databank and mock exams.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Subash Bhandari"
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 shadow-2xs transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
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
                  placeholder="student@example.com"
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 shadow-2xs transition-all"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+977 9800000000"
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 shadow-2xs transition-all"
                />
              </div>
            </div>

            {/* Target Score & Campus Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-indigo-600" /> Target PTE Score
                </label>
                <select
                  value={pteGoal}
                  onChange={(e) => setPteGoal(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 shadow-2xs cursor-pointer"
                >
                  <option value={50}>50 GSE (Visa Target)</option>
                  <option value={65}>65 GSE (7 Band Eq.)</option>
                  <option value={79}>79 GSE (8 Band Eq.)</option>
                  <option value={90}>90 GSE (Band 9 Perfect)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-indigo-600" /> Branch Campus
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 shadow-2xs cursor-pointer"
                >
                  <option value="Kathmandu Main Campus">Kathmandu Campus</option>
                  <option value="Pokhara Regional Branch">Pokhara Branch</option>
                  <option value="Chitwan Training Hub">Chitwan Hub</option>
                  <option value="Sydney Central Institute">Sydney Institute</option>
                  <option value="Melbourne Campus">Melbourne Campus</option>
                  <option value="Online Virtual Center">Online Global</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Password
              </label>
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

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden flex gap-1">
                    <div className={clsx('h-full flex-1 rounded-full transition-all', strength.score >= 1 ? strength.color : 'bg-slate-200')} />
                    <div className={clsx('h-full flex-1 rounded-full transition-all', strength.score >= 2 ? strength.color : 'bg-slate-200')} />
                    <div className={clsx('h-full flex-1 rounded-full transition-all', strength.score >= 3 ? strength.color : 'bg-slate-200')} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">{strength.label}</span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 shadow-2xs transition-all font-mono"
                />
              </div>
            </div>

            {/* Terms Agreement Checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-indigo-600 rounded cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-slate-500 leading-relaxed cursor-pointer font-medium">
                I agree to the{' '}
                <Link href="/terms" className="text-indigo-600 font-bold hover:underline">Terms of Service</Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-indigo-600 font-bold hover:underline">Privacy Policy</Link>.
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
                  <Loader2 className="w-4 h-4 animate-spin" /> Creating Account...
                </>
              ) : (
                <>
                  Register & Launch Practice Dashboard <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Already have account */}
          <p className="mt-8 text-center text-xs font-semibold text-slate-500">
            Already registered?{' '}
            <Link href="/login" className="text-indigo-600 font-extrabold hover:underline">
              Sign in to your account →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
