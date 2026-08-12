'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ShieldCheck, FileText, CheckCircle2, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1e293b] flex flex-col font-sans selection:bg-[#ff6b4a]/20 selection:text-[#1e293b]">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 mb-6 border border-[#1e293b]/10 rounded-full px-4 py-1.5 bg-white/60 backdrop-blur-sm">
              <FileText className="w-4 h-4 text-[#0d9488]" />
              <span className="text-xs font-semibold tracking-wide uppercase text-[#64748b]">Legal Terms & Agreements</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0f172a] leading-tight mb-4">
              Terms of Service<span className="text-[#ff6b4a]">.</span>
            </h1>
            <p className="text-sm text-[#64748b] font-light">
              Last updated: August 12, 2026 • Effective for all Master PTE / Master IELTS AI platform users.
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#1e293b]/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] space-y-10 text-sm font-light leading-relaxed text-[#334155]">
            
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0f172a]">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Master PTE AI platform (including our web application, practice modules, AI scoring engines, and mock test simulators), you agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue use of our platform immediately.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0f172a]">2. Student Account Registration & Verification</h2>
              <p>
                Upon registration, student accounts are placed in a <strong>Pending Approval</strong> state. Newly registered students receive trial access limited to 1 practice set per module until verified and approved by a Branch Admin or Super Admin. Attempting to circumvent access controls or create duplicate accounts is strictly prohibited.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0f172a]">3. Educational Use & AI Scoring Accuracy</h2>
              <p>
                Master PTE AI provides practice questions and automated scoring calibrated to Pearson PTE Academic standards. While our AI evaluation algorithm achieves a 98% correlation with official test scores, our predicted GSE band scores are for preparation and educational assessment purposes only.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0f172a]">4. Intellectual Property & Study Materials</h2>
              <p>
                All practice prompts, master essay templates, Audio Describe Image cheatsheets, and software interfaces are the proprietary property of Master PTE AI. Users may not copy, distribute, scrape, or resell any platform content without explicit written consent.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0f172a]">5. Single-Device Session Policy</h2>
              <p>
                To maintain platform security, student accounts enforce single-device active sessions via token versioning. Logging into your account on a secondary device automatically terminates active sessions on previous devices.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0f172a]">6. Contact & Support Services</h2>
              <p>
                For support, account approval requests, or billing inquiries, users can contact our team directly on WhatsApp (`+977 9763876490`) or via email at `support@masterpte.ai`.
              </p>
            </section>

          </div>

          {/* Quick Contact Banner */}
          <div className="mt-12 text-center bg-[#0f172a] text-white p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left space-y-1">
              <h4 className="font-bold text-base">Have questions about our Terms?</h4>
              <p className="text-xs text-[#94a3b8]">Contact our support team on WhatsApp for instant assistance.</p>
            </div>
            <a
              href="https://wa.me/9779763876490?text=Hi%20Master%20PTE%20AI%2C%20I%20have%20a%20question%20regarding%20Terms%20of%20Service."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> WhatsApp Support (+977 9763876490)
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
