'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Mail, Lock, Eye, EyeOff, User, Phone, Loader2, Check, ArrowRight, ArrowLeft, 
  Sparkles, Building2, Target, Calendar, Hash, CheckCircle2, MessageCircle
} from 'lucide-react';
import clsx from 'clsx';
import { setSession } from '@/lib/session';

export default function SignupPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [showPassword, setShowPassword] = useState(false);

  // Step 1 fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fromConsultancy, setFromConsultancy] = useState(false);
  const [branchCode, setBranchCode] = useState('');

  // Step 2 fields
  const [pteGoal, setPteGoal] = useState<number>(79);
  const [examDate, setExamDate] = useState('');
  const [studyFocus, setStudyFocus] = useState('All 4 Modules (Speaking, Writing, Reading, Listening)');

  // Step 3 fields
  const [agreed, setAgreed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in your full name, email address, and password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters in length.');
      return;
    }
    if (fromConsultancy && !branchCode.trim()) {
      setError('Please enter your consultancy Branch Code (e.g. KTM01 or KIEC13), or select "No".');
      return;
    }
    setStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const cleanCode = fromConsultancy ? branchCode.trim().toUpperCase().replace(/[^A-Z0-9]/g, '') : '';
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || '+977 9800000000',
          password,
          branchCode: cleanCode,
          branch: cleanCode ? undefined : 'Kathmandu Central Campus',
          examDate,
          pteGoal: Number(pteGoal),
          targetScore: `${pteGoal}+ (GSE ${pteGoal})`,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || data.error || 'Registration failed. Please check your information.');
      }

      setSession(data.token, data.user);

      if (data.user.status === 'pending') {
        setSuccessMessage('Registration submitted! Redirecting to campus authorization desk...');
        setTimeout(() => {
          router.push('/approval-wait');
        }, 600);
      } else {
        setSuccessMessage('Account registered in Supabase! Redirecting to your PTE dashboard...');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 500);
      }
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
    if (score === 1) return { score, label: 'Fair', color: 'bg-rose-500' };
    if (score === 2) return { score, label: 'Good', color: 'bg-amber-500' };
    if (score === 3) return { score, label: 'Strong', color: 'bg-emerald-500' };
    return { score: 0, label: '', color: 'bg-slate-200' };
  };

  const strength = getPasswordStrength(password);

  if (!mounted) return null;

  return (
    <div suppressHydrationWarning className="min-h-screen bg-[#f4f5fa] text-[#0f172a] flex flex-col justify-center items-center py-12 px-4 sm:px-6 font-sans selection:bg-indigo-600 selection:text-white relative overflow-hidden">
      {/* Subtle Radial Violet Glow matching masterieltsai.com */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[460px] relative z-10">
        {/* Top Brand Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">
              Master PTE <span className="text-rose-600">AI</span>
            </span>
          </Link>

          <h1 className="mt-5 text-3xl font-black text-slate-900 tracking-tight font-satoshi">Create Your Account</h1>
          <p className="mt-1 text-xs text-slate-500 font-semibold">Start your AI-powered PTE journey today</p>
        </div>

        {/* 3-Step Indicator Bar matching masterieltsai.com */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[
            { num: 1, label: 'Account' },
            { num: 2, label: 'PTE Info' },
            { num: 3, label: 'Ready!' },
          ].map((s, idx) => {
            const isActive = step === s.num;
            const isDone = step > s.num;
            return (
              <div key={s.num} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (isDone) setStep(s.num as 1 | 2 | 3);
                  }}
                  className={clsx(
                    'px-3.5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-all',
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                      : isDone
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-pointer'
                      : 'bg-white text-slate-400 border border-slate-200'
                  )}
                >
                  <span className={clsx(
                    'w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-black',
                    isActive ? 'bg-white/20 text-white' : isDone ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'
                  )}>
                    {isDone ? <Check className="w-2.5 h-2.5" /> : s.num}
                  </span>
                  <span>{s.label}</span>
                </button>
                {idx < 2 && <div className="w-5 h-0.5 bg-slate-200 rounded-full" />}
              </div>
            );
          })}
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* STEP 1: ACCOUNT */}
        {step === 1 && (
          <form onSubmit={handleNextStep1} className="space-y-3.5">
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full bg-white border border-slate-200/90 rounded-2xl pl-11 pr-4 py-3.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 shadow-2xs transition-all"
              />
            </div>

            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-white border border-slate-200/90 rounded-2xl pl-11 pr-4 py-3.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 shadow-2xs transition-all"
              />
            </div>

            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number (e.g. +977 9800000000)"
                className="w-full bg-white border border-slate-200/90 rounded-2xl pl-11 pr-4 py-3.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 shadow-2xs transition-all"
              />
            </div>

            <div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password (min 6 characters)"
                  className="w-full bg-white border border-slate-200/90 rounded-2xl pl-11 pr-11 py-3.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 shadow-2xs transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {password && (
                <div className="mt-1.5 flex items-center gap-2 px-1">
                  <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden flex gap-1">
                    <div className={clsx('h-full flex-1 rounded-full', strength.score >= 1 ? strength.color : 'bg-slate-200')} />
                    <div className={clsx('h-full flex-1 rounded-full', strength.score >= 2 ? strength.color : 'bg-slate-200')} />
                    <div className={clsx('h-full flex-1 rounded-full', strength.score >= 3 ? strength.color : 'bg-slate-200')} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">{strength.label}</span>
                </div>
              )}
            </div>

            {/* Consultancy Toggle Box matching masterieltsai.com */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  <span>Are you from a consultancy?</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setFromConsultancy(true)}
                    className={clsx(
                      'px-3.5 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer border',
                      fromConsultancy
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    )}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFromConsultancy(false);
                      setBranchCode('');
                    }}
                    className={clsx(
                      'px-3.5 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer border',
                      !fromConsultancy
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    )}
                  >
                    No
                  </button>
                </div>
              </div>

              {fromConsultancy && (
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-indigo-600 flex items-center gap-1">
                    <Hash className="w-3 h-3" /> BRANCH CODE (LETTERS &amp; NUMBERS ONLY)
                  </label>
                  <input
                    type="text"
                    value={branchCode}
                    onChange={(e) => setBranchCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                    placeholder="e.g. KIEC13 or KTM01"
                    className="w-full bg-slate-50 border border-indigo-200 rounded-xl px-3.5 py-2.5 text-xs font-mono font-extrabold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white uppercase tracking-wider"
                  />
                  <p className="text-[11px] text-slate-400 font-medium">
                    Enter your consultancy branch code to get linked to their portal
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: PTE INFO */}
        {step === 2 && (
          <form onSubmit={handleNextStep2} className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-5">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-indigo-600" /> Target PTE GSE Score
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { score: 50, label: '50+ GSE', desc: 'Band 6.0 Equivalent' },
                  { score: 65, label: '65+ GSE', desc: 'Band 7.0 Equivalent' },
                  { score: 79, label: '79+ GSE', desc: 'Band 8.0 Proficient' },
                  { score: 90, label: '90 GSE', desc: 'Band 9.0 Superior' },
                ].map((opt) => (
                  <button
                    key={opt.score}
                    type="button"
                    onClick={() => setPteGoal(opt.score)}
                    className={clsx(
                      'p-3.5 rounded-2xl border text-left transition-all cursor-pointer',
                      pteGoal === opt.score
                        ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-500/15'
                        : 'bg-slate-50 border-slate-200 hover:bg-white'
                    )}
                  >
                    <div className="text-sm font-black text-slate-900">{opt.label}</div>
                    <div className="text-[10px] font-semibold text-slate-500 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-600" /> Planned Exam Date (Optional)
              </label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                Primary Study Focus
              </label>
              <select
                value={studyFocus}
                onChange={(e) => setStudyFocus(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-600"
              >
                <option>All 4 Modules (Speaking, Writing, Reading, Listening)</option>
                <option>Speaking &amp; Oral Fluency Focus</option>
                <option>Writing &amp; Essay Templates Focus</option>
                <option>Reading &amp; Fill in the Blanks Focus</option>
                <option>Listening &amp; Write From Dictation Focus</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: READY! */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Your AI Study Profile is Ready!</h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                Review your details below to launch your PTE dashboard
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">Candidate Name:</span>
                <span className="font-extrabold text-slate-900">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">Email:</span>
                <span className="font-bold text-slate-800">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">Target Score:</span>
                <span className="font-extrabold text-indigo-600">{pteGoal}+ GSE Score</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">Consultancy / Branch:</span>
                <span className="font-mono font-extrabold text-emerald-700">
                  {fromConsultancy && branchCode ? `Code: ${branchCode}` : 'Direct Student Portal'}
                </span>
              </div>
            </div>

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

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Creating Account...
                  </>
                ) : (
                  <>
                    <span>Launch Practice Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Divider & Google Sign Up on Step 1 */}
        {step === 1 && (
          <>
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-[#f4f5fa] text-slate-400 font-semibold">Or sign up with</span>
              </div>
            </div>

            <Link
              href="/login"
              className="w-full py-3.5 px-4 bg-[#1e293b] hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.8C6.2 7.2 8.9 5 12 5z" />
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6l3.7 2.9c2.2-2 3.7-5 3.7-8.7z" />
                <path fill="#FBBC05" d="M5.3 14.8c-.2-.8-.4-1.6-.4-2.5s.2-1.7.4-2.5L1.6 7C.6 9 0 11.2 0 13.5s.6 4.5 1.6 6.5l3.7-2.9z" />
                <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5l-3.7 2.9C3.5 21.4 7.4 24 12 24z" />
              </svg>
              <span>Sign up with Google</span>
            </Link>
          </>
        )}

        {/* Already have account */}
        <p className="mt-6 text-center text-xs font-semibold text-slate-500">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-600 font-extrabold hover:underline">
            Sign in
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
    </div>
  );
}
