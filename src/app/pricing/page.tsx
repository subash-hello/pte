'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles, ShieldCheck, Zap, ArrowRight, MessageCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const PRICING_PLANS = [
  {
    id: '7d',
    duration: '7 days',
    name: 'Quick Exam Booster',
    price: '299',
    perDay: 'Rs. 43/day',
    popular: false,
    badge: 'SHORT TERM',
    features: [
      'Full AI Speaking & Writing Scoring',
      'Official Pearson GSE (10–90) Breakdown',
      '2 Full Timed Mock Tests',
      'All 20 PTE Task Types Unlocked',
      'Instant Pronunciation & Fluency Analysis',
    ],
  },
  {
    id: '15d',
    duration: '15 days',
    name: 'Crash Course Pack',
    price: '599',
    perDay: 'Rs. 40/day',
    popular: false,
    badge: 'FAST PREP',
    features: [
      'Unlimited AI Speaking & Writing Evaluations',
      '5 Full Timed Mock Tests',
      '2026 Prediction File Access',
      'Real-Time Oral Fluency & Grammar Feedback',
      'WhatsApp Priority Support',
    ],
  },
  {
    id: '1m',
    duration: '1 month',
    name: 'Standard Pro Plan',
    price: '999',
    perDay: 'Rs. 33/day',
    popular: true,
    badge: 'MOST POPULAR',
    features: [
      'Unlimited AI Speaking & Writing Evaluations',
      '12 Full-Length Timed Mock Exams',
      'All 3,000+ Real Exam Prediction Questions',
      'Detailed Phoneme & Pitch Contour Feedback',
      'AI Study Plan & Daily Task Generator',
      'Direct Admin & Tutor Support on WhatsApp',
    ],
  },
  {
    id: '45d',
    duration: '45 days',
    name: 'Extended Mastery',
    price: '1,299',
    perDay: 'Rs. 29/day',
    popular: false,
    badge: 'GREAT VALUE',
    features: [
      'Everything in 1-Month Standard Pro',
      '18 Full-Length Timed Mock Exams',
      'High-Yield WFD & Essay Template Vault',
      'Weakness Radar & Personalized Drills',
      'Priority Account Activation',
    ],
  },
  {
    id: '2m',
    duration: '2 months',
    name: 'Complete 79+ Guarantee Prep',
    price: '1,799',
    perDay: 'Rs. 30/day',
    popular: false,
    badge: '79+ TARGET',
    features: [
      'Everything in Extended Mastery',
      '25 Full-Length Timed Mock Exams',
      '1-on-1 Score Report Review via WhatsApp',
      'Full Access to Updated Monthly Predictions',
      'Unlimited AI Voice Coach Sessions',
    ],
  },
  {
    id: '3m',
    duration: '3 months',
    name: 'Ultimate 90-Band Package',
    price: '2,500',
    perDay: 'Rs. 28/day',
    popular: false,
    badge: 'BEST LONG-TERM',
    features: [
      '90 Days Unlimited Pro Access',
      'Unlimited Full-Length Timed Mock Exams',
      'Complete Study Materials & Template PDF Vault',
      'Dedicated Score Strategy Consultation',
      'Lowest Daily Cost (Rs. 28/day)',
    ],
  },
];

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState('1m');

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-gradient-to-tr from-indigo-500/10 via-violet-500/10 to-rose-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black uppercase tracking-widest mb-5">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" /> Transparent Nepal Pricing (NPR)
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 font-satoshi leading-tight">
              Invest in Your <span className="text-indigo-600">79+ PTE Score</span>
            </h1>
            <p className="text-slate-600 text-base sm:text-lg font-medium mt-4 leading-relaxed">
              Choose the exact duration you need before your exam date. Instant activation via eSewa, Khalti, Fonepay, or Consultancy Branch Code.
            </p>

            {/* Quick Duration Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {PRICING_PLANS.map(plan => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all border-2 ${
                    selectedPlan === plan.id
                      ? 'bg-[#0b0f19] text-white border-[#0b0f19] shadow-[3px_3px_0px_#4f46e5]'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-900'
                  }`}
                >
                  {plan.duration} — Rs. {plan.price}
                </button>
              ))}
            </div>
          </div>

          {/* 6-Plan Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
            {PRICING_PLANS.map(plan => {
              const isSelected = selectedPlan === plan.id || plan.popular;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`cursor-pointer rounded-3xl p-7 transition-all flex flex-col justify-between relative border-2 ${
                    plan.popular
                      ? 'bg-[#0b0f19] text-white border-[#0b0f19] shadow-[6px_6px_0px_#e11d48]'
                      : selectedPlan === plan.id
                        ? 'bg-white text-slate-900 border-[#0b0f19] shadow-[6px_6px_0px_#0b0f19]'
                        : 'bg-white text-slate-900 border-slate-200 hover:border-slate-900 shadow-xs'
                  }`}
                >
                  {plan.badge && (
                    <div
                      className={`absolute -top-3.5 right-6 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        plan.popular
                          ? 'bg-rose-600 text-white border-rose-400 shadow-md'
                          : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      }`}
                    >
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-xs font-black uppercase tracking-widest ${
                          plan.popular ? 'text-indigo-400' : 'text-indigo-600'
                        }`}
                      >
                        {plan.duration} Access
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          plan.popular ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {plan.perDay}
                      </span>
                    </div>

                    <h3 className="text-xl font-black font-satoshi mb-4">{plan.name}</h3>

                    <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-current/10">
                      <span className="text-sm font-extrabold opacity-75">Rs.</span>
                      <span className="text-4xl font-black tracking-tight font-satoshi">{plan.price}</span>
                      <span className="text-xs font-semibold opacity-60">/ {plan.duration}</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-start gap-2.5 text-xs font-semibold leading-relaxed">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                              plan.popular ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
                            }`}
                          >
                            <Check className="w-3 h-3" />
                          </div>
                          <span className={plan.popular ? 'text-slate-200' : 'text-slate-700'}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <Link
                      href="/signup"
                      className={`w-full py-3.5 px-5 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all border-2 ${
                        plan.popular
                          ? 'bg-rose-600 hover:bg-rose-500 text-white border-white/20 shadow-[3px_3px_0px_#ffffff30]'
                          : 'bg-[#0b0f19] hover:bg-slate-800 text-white border-[#0b0f19]'
                      }`}
                    >
                      Start {plan.duration} Plan <ArrowRight className="w-4 h-4" />
                    </Link>

                    <a
                      href={`https://wa.me/9779763876490?text=${encodeURIComponent(
                        `Hello Master PTE AI Admin! I want to activate the ${plan.duration} Plan (Rs. ${plan.price}).`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-full py-2.5 px-4 rounded-xl font-extrabold text-[11px] flex items-center justify-center gap-1.5 transition-all border ${
                        plan.popular
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Buy via WhatsApp (eSewa / Khalti)
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Consultancy Partner Banner */}
          <div className="mt-16 bg-white border-2 border-[#0b0f19] rounded-3xl p-8 lg:p-10 shadow-[6px_6px_0px_#0b0f19] flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-black uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" /> For Consultancies & Coaching Institutes
              </div>
              <h2 className="text-2xl font-black text-slate-900 font-satoshi">
                Are You a PTE Consultancy in Nepal?
              </h2>
              <p className="text-slate-600 text-sm font-medium max-w-2xl">
                Get your own dedicated Branch Admin Portal, custom Branch Code (e.g., <code className="font-mono font-bold text-indigo-600">KTM01</code>, <code className="font-mono font-bold text-indigo-600">KIEC13</code>), bulk student quota allocation, and live student score tracking.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://wa.me/9779763876490?text=Hello%20Master%20PTE%20AI!%20We%20want%20to%20register%20our%20consultancy%20for%20a%20Branch%20Admin%20Portal."
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs border-2 border-[#0b0f19] shadow-[3px_3px_0px_#0b0f19] flex items-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" /> Partner on WhatsApp
              </a>
              <Link
                href="/admin-login"
                className="px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold text-xs border-2 border-slate-300 transition-all"
              >
                Branch Admin Login →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
