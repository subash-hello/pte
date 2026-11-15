'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, ShieldAlert, Sparkles, ArrowRight, Building2, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AccessGatewayPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between relative overflow-hidden p-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between py-4 z-10">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-[#0b0f19] flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900 font-satoshi">
            Master PTE <span className="text-[#e11d48]">AI</span>
          </span>
        </Link>
        <Link
          href="/"
          className="text-xs font-extrabold text-slate-600 hover:text-slate-900 transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs"
        >
          ← Back to Homepage
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl w-full mx-auto my-auto py-12 z-10">
        <div className="text-center mb-12">
          <span className="px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black uppercase tracking-widest">
            Unified Authentication Gateway
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-4 mb-3 text-slate-900 font-satoshi">
            Select Your Access Portal
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Choose your role below to sign in to the Student Practice Engine or the Consultancy & System Admin Command Center.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Student Portal Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-2 border-[#0b0f19] rounded-3xl p-8 flex flex-col justify-between transition-all shadow-[6px_6px_0px_#0b0f19]"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-black uppercase tracking-widest">
                  STUDENT PORTAL
                </span>
              </div>
              <h2 className="text-2xl font-black mb-2 text-slate-900 font-satoshi">Student Study Portal</h2>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed font-medium">
                Access all 20 PTE Academic task types, real-time Pearson GSE (10–90) AI scoring, full-length mock tests, and consultancy branch classrooms.
              </p>

              <div className="space-y-2 mb-8 border-t border-slate-100 pt-5 text-xs text-slate-700 font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" /> Instant AI Speaking & Writing Examiner
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" /> Supports Consultancy Branch Code (`KTM01`, `KIEC13`, etc.)
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/login"
                className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                Enter Student Portal <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/signup"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-extrabold text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition-all"
              >
                Create New Student Account →
              </Link>
            </div>
          </motion.div>

          {/* Admin Console Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border-2 border-[#0b0f19] rounded-3xl p-8 flex flex-col justify-between transition-all shadow-[6px_6px_0px_#ea580c]"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
                  <ShieldAlert className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                  <Lock className="w-3 h-3" /> SECURE MODE
                </span>
              </div>
              <h2 className="text-2xl font-black mb-2 text-slate-900 font-satoshi">Staff & Admin Console</h2>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed font-medium">
                Restricted gateway for Main Platform Super Admins and Partner Consultancy Branch Admins to manage students, quotas, and AI rubrics.
              </p>

              <div className="space-y-2 mb-8 border-t border-slate-100 pt-5 text-xs text-slate-700 font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500" /> Branch Quotas & Date-wise Student Creation Breakdown
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500" /> 1-Click Student Approval & +30d Pro Extensions
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/admin-login"
                className="w-full py-3.5 px-6 rounded-xl bg-[#0b0f19] hover:bg-slate-800 text-white font-black text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                Authorize Admin Session <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/9779763876490?text=Hello%20Master%20PTE%20AI!%20We%20need%20Branch%20Admin%20credentials%20for%20our%20consultancy."
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 font-extrabold text-xs flex items-center justify-center gap-1.5 border border-orange-200 transition-all"
              >
                <Building2 className="w-3.5 h-3.5" /> Request Consultancy Branch Access
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="max-w-6xl w-full mx-auto text-center py-4 text-xs text-slate-500 font-semibold z-10">
        Master PTE AI • Kohalpur, Banke, Nepal • Powered by Viper Intelligence & Supabase Cloud
      </footer>
    </div>
  );
}
