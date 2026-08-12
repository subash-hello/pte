'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Check, ArrowRight, ShieldCheck, Sparkles, MessageSquare, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'standard' | 'extended'>('standard');

  const plans = [
    {
      name: "Weekly Lite",
      price: "Rs. 299",
      period: "/ 7 days",
      badge: "Quick Sprint",
      description: "Ideal for quick revision and last-minute score verification before test day.",
      features: [
        "7 Days Full Access",
        "2 Full-Length PTE Mock Tests",
        "Official AI Scoring Engine",
        "Speaking Pronunciation Analysis",
        "Standard Progress Analytics",
        "Email Support"
      ],
      buttonText: "Start Weekly Lite",
      href: "/signup",
      isPopular: false,
      accentColor: "border-[#1e293b]/10 bg-white"
    },
    {
      name: "Monthly Pro",
      price: "Rs. 999",
      period: "/ 30 days",
      badge: "Most Popular",
      description: "Comprehensive preparation plan designed to guarantee a 79+ GSE target score.",
      features: [
        "30 Days Unlimited Access",
        "Unlimited Full Mock Tests",
        "All 22 Question Type Modules",
        "Advanced AI Tutor Chat",
        "Personalized Daily Study Plan",
        "Detailed Performance Scorecards",
        "Priority WhatsApp Support"
      ],
      buttonText: "Get Monthly Pro",
      href: "/signup",
      isPopular: true,
      accentColor: "border-[#0f172a] bg-[#0f172a] text-white"
    },
    {
      name: "Ultimate Prep",
      price: "Rs. 1,499",
      period: "/ 45 days",
      badge: "Best Value",
      description: "Extended access with premium study materials, templates, and priority tutor help.",
      features: [
        "45 Days Full Access",
        "Everything in Monthly Pro",
        "1-on-1 AI Tutoring Assistance",
        "PTE Master Essay Templates Vault",
        "PDF Scorecard Export",
        "Direct Tutor Support on WhatsApp"
      ],
      buttonText: "Get Ultimate Prep",
      href: "/signup",
      isPopular: false,
      accentColor: "border-[#1e293b]/10 bg-white"
    }
  ];

  const comparisonFeatures = [
    { name: "Full-Length Mock Tests", lite: "2 Tests", pro: "Unlimited", ultimate: "Unlimited" },
    { name: "All 22 Question Modules", lite: "Partial", pro: "Full Access", ultimate: "Full Access" },
    { name: "Real-Time AI Pronunciation", lite: "Basic", pro: "Advanced", ultimate: "Advanced + Feedback" },
    { name: "Writing Essay Templates", lite: "—", pro: "Included", ultimate: "Master Vault" },
    { name: "Personalized Daily Plan", lite: "—", pro: "Included", ultimate: "Included" },
    { name: "WhatsApp Tutor Support", lite: "—", pro: "Priority", ultimate: "Dedicated 1-on-1" },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1e293b] flex flex-col font-sans selection:bg-[#ff6b4a]/20 selection:text-[#1e293b]">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-6 border border-[#1e293b]/10 rounded-full px-4 py-1.5 bg-white/60 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#0d9488]" />
              <span className="text-xs font-semibold tracking-wide uppercase text-[#64748b]">Transparent Investment</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0f172a] leading-tight mb-6">
              Classic plans for every <br />
              <span className="italic font-normal text-[#ff6b4a]">PTE target.</span>
            </h1>
            <p className="text-lg text-[#64748b] font-light leading-relaxed">
              No hidden fees. Full access to Pearson-aligned AI scoring algorithms, mock tests, and personalized study paths.
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch mb-24">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`rounded-3xl p-8 sm:p-10 border transition-all duration-300 flex flex-col justify-between relative ${
                  plan.isPopular 
                    ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-[0_20px_40px_-15px_rgba(15,23,42,0.3)] md:-translate-y-2' 
                    : 'bg-white text-[#1e293b] border-[#1e293b]/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] hover:border-[#1e293b]/30'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ff6b4a] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-xl font-bold ${plan.isPopular ? 'text-white' : 'text-[#0f172a]'}`}>
                      {plan.name}
                    </h3>
                    {!plan.isPopular && (
                      <span className="text-[11px] font-semibold text-[#64748b] bg-[#faf9f6] px-3 py-1 rounded-full border border-[#1e293b]/5">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  
                  <p className={`text-xs leading-relaxed font-light mb-8 h-10 ${plan.isPopular ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
                    {plan.description}
                  </p>
                  
                  <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-[#1e293b]/10">
                    <span className={`text-4xl lg:text-5xl font-bold tracking-tight ${plan.isPopular ? 'text-white' : 'text-[#0f172a]'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-xs font-medium ${plan.isPopular ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
                      {plan.period}
                    </span>
                  </div>
                  
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 text-xs font-light">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.isPopular ? 'text-[#ff6b4a]' : 'text-[#0d9488]'}`} />
                        <span className={plan.isPopular ? 'text-[#e2e8f0]' : 'text-[#334155]'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={plan.href}
                  className={`w-full py-4 rounded-2xl font-medium text-sm transition-all text-center flex items-center justify-center gap-2 ${
                    plan.isPopular
                      ? 'bg-[#ff6b4a] hover:bg-[#e85a3a] text-white shadow-lg shadow-[#ff6b4a]/20'
                      : 'bg-[#0f172a] hover:bg-[#1e293b] text-white'
                  }`}
                >
                  {plan.buttonText} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          {/* Feature Comparison Table */}
          <div className="max-w-5xl mx-auto mb-24 bg-white rounded-3xl p-8 sm:p-12 border border-[#1e293b]/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)]">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#0f172a]">Plan Comparison</h3>
              <p className="text-xs text-[#64748b] font-light mt-1">Detailed feature breakdown across all preparation tiers.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-[#1e293b]/10 text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                    <th className="pb-4">Feature</th>
                    <th className="pb-4 text-center">Weekly Lite</th>
                    <th className="pb-4 text-center text-[#ff6b4a]">Monthly Pro</th>
                    <th className="pb-4 text-center">Ultimate Prep</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e293b]/5 text-xs">
                  {comparisonFeatures.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#faf9f6]">
                      <td className="py-4 font-semibold text-[#0f172a]">{row.name}</td>
                      <td className="py-4 text-center text-[#64748b]">{row.lite}</td>
                      <td className="py-4 text-center font-semibold text-[#0f172a]">{row.pro}</td>
                      <td className="py-4 text-center text-[#0d9488] font-semibold">{row.ultimate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Institutional / WhatsApp Help Banner */}
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-2 max-w-lg">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#0d9488] bg-[#0d9488]/20 px-3 py-1 rounded-full">
                Custom Institution Access
              </span>
              <h3 className="text-2xl font-bold">Need custom branch or bulk access?</h3>
              <p className="text-xs text-[#94a3b8] font-light leading-relaxed">
                Contact our support team on WhatsApp (`+977 9763876490`) for custom student batch licensing or institution accounts.
              </p>
            </div>
            
            <a
              href="https://wa.me/9779763876490?text=Hi%20Master%20PTE%20AI%2C%20I%20would%20like%20to%20inquire%20about%20custom%20pricing%20or%20batch%20subscriptions."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs transition-all shadow-lg flex items-center gap-2 shrink-0"
            >
              <MessageSquare className="w-4 h-4" /> Inquiry on WhatsApp (+977 9763876490)
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
