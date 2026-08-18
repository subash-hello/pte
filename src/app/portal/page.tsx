'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  User, Building2, Shield, ArrowRight, Sparkles, CheckCircle2, 
  BookOpen, Award, Zap, Brain, Lock, ExternalLink, Loader2 
} from 'lucide-react';
import { setSession } from '@/lib/session';
import { UserRole } from '@/types/auth';
import RoleSwitcherBar from '@/components/RoleSwitcherBar';

export default function PortalPage() {
  const [loadingRole, setLoadingRole] = useState<string | null>(null);

  const handleInstantLaunch = async (role: UserRole) => {
    setLoadingRole(role);
    let email = 'subash.bhandari@pteai.com';
    let password = 'password123';

    if (role === 'branch_admin') {
      email = 'ktm.admin@pteai.com';
      password = 'admin123';
    } else if (role === 'super_admin') {
      email = 'admin@ptemaster.com';
      password = 'admin123';
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSession(data.token, data.user);
        if (role === 'super_admin' || role === 'branch_admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/dashboard';
        }
      } else {
        window.location.href = '/login';
      }
    } catch {
      window.location.href = '/login';
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1e293b] flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      <RoleSwitcherBar />
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-6 border border-indigo-200/80 rounded-full px-4 py-1.5 bg-indigo-50/70 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold tracking-wide uppercase text-indigo-900">Unified Access Hub</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0f172a] leading-tight mb-6">
              PTE Master <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Enterprise Portals.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
              Select your destination portal below. Access the AI practice dashboard, campus administration center, or executive controls with dedicated workflows.
            </p>
          </div>

          {/* 3 Portal Gateway Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            
            {/* 1. Student Portal Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-2xs">
                    <User className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-extrabold tracking-wider uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full">
                    Active Portal
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Student Practice Portal</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                  Full access to all 20 question types, official 2-hour mock exams, Gemini AI speech scoring, and personalized daily study tasks.
                </p>

                <div className="space-y-2.5 mb-8 border-t border-slate-100 pt-6 text-xs text-slate-700 font-semibold">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>1,000+ Real Exam Practice Items</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>30 Full-Length Timed Mock Exams</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Instant AI Speech & Pronunciation Grading</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>AI Tutor WhatsApp / Interactive Chat</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleInstantLaunch('student')}
                  disabled={Boolean(loadingRole)}
                  className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loadingRole === 'student' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Launching Student Dashboard...
                    </>
                  ) : (
                    <>
                      <span>Enter Student Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 pt-1">
                  <Link href="/login" className="hover:text-indigo-600 hover:underline">
                    Sign in with credentials
                  </Link>
                  <Link href="/signup" className="hover:text-indigo-600 hover:underline">
                    Create new account →
                  </Link>
                </div>
              </div>
            </div>

            {/* 2. Branch Admin Portal Card */}
            <div className="bg-[#0f172a] text-white rounded-3xl p-8 border border-slate-800 shadow-xl relative flex flex-col justify-between group overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-2xs">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-extrabold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-3 py-1 rounded-full">
                    Campus Portal
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-white mb-2">Branch Director Center</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">
                  Monitor student registrations, approve batch access, evaluate campus test metrics, and track branch performance.
                </p>

                <div className="space-y-2.5 mb-8 border-t border-slate-800 pt-6 text-xs text-slate-300 font-semibold">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Campus Student Approval Queue</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Real-Time Practice & Mock Analytics</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Kathmandu, Pokhara, Chitwan & Global Hubs</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Custom Batch Study Plans & Timetables</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800 relative z-10">
                <button
                  type="button"
                  onClick={() => handleInstantLaunch('branch_admin')}
                  disabled={Boolean(loadingRole)}
                  className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loadingRole === 'branch_admin' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Launching Branch Portal...
                    </>
                  ) : (
                    <>
                      <span>Enter Branch Director Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-center text-[11px] font-bold text-slate-400 pt-1">
                  <span>Preset: <code>ktm.admin@pteai.com</code></span>
                </div>
              </div>
            </div>

            {/* 3. Super Admin Portal Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-2xs">
                    <Shield className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-extrabold tracking-wider uppercase bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 rounded-full">
                    Master HQ
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Super Admin Control</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                  Global institutional control, multi-branch network supervision, AI model tuning, subscription revenue, and question bank management.
                </p>

                <div className="space-y-2.5 mb-8 border-t border-slate-100 pt-6 text-xs text-slate-700 font-semibold">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Global Institutional User Directory</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Gemini AI Engine & Scoring Calibration</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Multi-Branch Franchise Management</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Full System Logs & Security Controls</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleInstantLaunch('super_admin')}
                  disabled={Boolean(loadingRole)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loadingRole === 'super_admin' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Launching Super Admin...
                    </>
                  ) : (
                    <>
                      <span>Enter Super Admin HQ</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-center text-[11px] font-bold text-slate-500 pt-1">
                  <span>Preset: <code>admin@ptemaster.com</code></span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Direct Links Strip */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-1">Looking for direct practice modules?</h3>
              <p className="text-xs text-slate-500 font-medium">Jump straight into targeted practice without navigation overhead.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link href="/dashboard/practice/speaking/read-aloud" className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-xs font-bold transition-all border border-slate-200">
                🎙️ Speaking Practice
              </Link>
              <Link href="/dashboard/practice/writing/write-essay" className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-xs font-bold transition-all border border-slate-200">
                ✍️ Writing Tasks
              </Link>
              <Link href="/dashboard/practice/reading/rw-fill-blanks" className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-xs font-bold transition-all border border-slate-200">
                📖 Reading Databank
              </Link>
              <Link href="/dashboard/mock-test" className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-extrabold transition-all shadow-2xs">
                ⏱️ Full Mock Exam
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
