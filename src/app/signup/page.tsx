'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, User, Phone, Loader2, Check, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import clsx from 'clsx';
import { setSession } from '@/lib/session';

export default function SignupPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreed) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || 'Registration failed');
      }

      setSession(data.token, data.user);
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-slate-200' };
    let score = 0;
    if (pass.length > 5) score += 1;
    if (pass.length > 8) score += 1;
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score += 1;
    
    if (score === 1) return { score, label: 'Weak', color: 'bg-rose-500' };
    if (score === 2) return { score, label: 'Medium', color: 'bg-amber-500' };
    if (score === 3) return { score, label: 'Strong', color: 'bg-[#0d9488]' };
    return { score: 0, label: '', color: 'bg-slate-200' };
  };

  const strength = getPasswordStrength(password);

  if (!mounted) return null;

  return (
    <div suppressHydrationWarning className="min-h-screen bg-[#faf9f6] text-[#1e293b] flex font-sans selection:bg-[#ff6b4a]/20 selection:text-[#1e293b]">
      {/* Left Panel - Editorial Brand Showcase (Desktop Only) */}
      <div className="hidden lg:flex lg:w-5/12 bg-[#0f172a] text-white p-12 lg:p-16 flex-col justify-between relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff6b4a]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0d9488]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <Link href="/" className="inline-block group mb-12">
            <span className="text-3xl font-bold tracking-tight text-white">
              PTE Master<span className="text-[#ff6b4a]">.</span>
            </span>
          </Link>

          <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Start your journey <br />
            to <span className="italic font-normal text-[#ff6b4a]">PTE mastery.</span>
          </h2>
          <p className="text-[#94a3b8] text-base leading-relaxed font-light max-w-md">
            Join thousands of test-takers achieving their dream band scores with intelligent evaluation and realistic practice.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="relative z-10 space-y-6 my-auto pt-8">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-[#0d9488]/20 flex items-center justify-center shrink-0 text-[#0d9488]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Official Algorithm Alignment</h4>
              <p className="text-[#94a3b8] text-xs font-light mt-0.5">Scored against 98% official Pearson correlation metrics.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-[#ff6b4a]/20 flex items-center justify-center shrink-0 text-[#ff6b4a]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">All 22 Question Types</h4>
              <p className="text-[#94a3b8] text-xs font-light mt-0.5">Comprehensive coverage for Speaking, Writing, Reading & Listening.</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-[#64748b] pt-8 border-t border-[#334155]/60 flex items-center justify-between">
          <span>© {new Date().getFullYear()} PTE Master</span>
          <span className="flex items-center gap-1 text-[#0d9488]">
            <span className="w-2 h-2 rounded-full bg-[#0d9488] animate-pulse" /> Live Exam Portal
          </span>
        </div>
      </div>

      {/* Right Panel - Registration Form */}
      <div className="w-full lg:w-7/12 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 overflow-y-auto">
        <div className="w-full max-w-md my-auto">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-block mb-4">
              <span className="text-3xl font-bold tracking-tight text-[#0f172a]">
                PTE Master<span className="text-[#ff6b4a]">.</span>
              </span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0f172a] tracking-tight mb-2">Create account</h1>
            <p className="text-[#64748b] text-sm font-light">Enter your details to register for practice access.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-[#0d9488]/10 border border-[#0d9488]/30 text-[#0d9488] text-sm font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b] mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#94a3b8]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Subash Bhandari"
                  className="w-full bg-white border border-[#1e293b]/15 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/10 transition-all"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b] mb-2">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#94a3b8]">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+977 9800000000"
                  className="w-full bg-white border border-[#1e293b]/15 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/10 transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b] mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#94a3b8]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full bg-white border border-[#1e293b]/15 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/10 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b] mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#94a3b8]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-[#1e293b]/15 rounded-2xl pl-11 pr-11 py-3.5 text-sm text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#94a3b8] hover:text-[#0f172a]"
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
                  <span className="text-[11px] font-medium text-[#64748b] capitalize">{strength.label}</span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b] mb-2">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#94a3b8]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-[#1e293b]/15 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/10 transition-all"
                />
              </div>
            </div>

            {/* Terms Agreement Checkbox */}
            <div className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 accent-[#0f172a] rounded cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-[#64748b] leading-relaxed cursor-pointer">
                I agree to the{' '}
                <Link href="#" className="text-[#0f172a] underline font-medium hover:text-[#ff6b4a]">Terms of Service</Link>{' '}
                and{' '}
                <Link href="#" className="text-[#0f172a] underline font-medium hover:text-[#ff6b4a]">Privacy Policy</Link>.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-[#0f172a] text-white font-medium text-sm hover:bg-[#1e293b] active:scale-[0.99] transition-all shadow-lg shadow-[#0f172a]/10 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Creating Account...
                </>
              ) : (
                <>
                  Register Now <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Already have account */}
          <p className="mt-8 text-center text-sm text-[#64748b]">
            Already registered?{' '}
            <Link href="/login" className="text-[#0f172a] font-semibold hover:text-[#ff6b4a] underline transition-colors">
              Sign in to your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
