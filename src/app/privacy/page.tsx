'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Shield, Lock, FileCheck, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1e293b] flex flex-col font-sans selection:bg-[#ff6b4a]/20 selection:text-[#1e293b]">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 mb-6 border border-[#1e293b]/10 rounded-full px-4 py-1.5 bg-white/60 backdrop-blur-sm">
              <Shield className="w-4 h-4 text-[#0d9488]" />
              <span className="text-xs font-semibold tracking-wide uppercase text-[#64748b]">Data Protection & Privacy</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0f172a] leading-tight mb-4">
              Privacy Policy<span className="text-[#ff6b4a]">.</span>
            </h1>
            <p className="text-sm text-[#64748b] font-light">
              Last updated: August 12, 2026 • We treat your personal data and study audio recordings with total confidentiality.
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#1e293b]/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] space-y-10 text-sm font-light leading-relaxed text-[#334155]">
            
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0f172a]">1. Information We Collect</h2>
              <p>
                We collect information you provide directly during registration (Full Name, Email Address, Phone Number, and Branch Location) as well as technical data generated during practice (audio recordings for Speaking tasks, essay submissions for Writing tasks, and scorecard metrics).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0f172a]">2. How We Use Your Information</h2>
              <p>
                Your personal and audio data is used exclusively to evaluate oral fluency, pronunciation accuracy, grammar, and content discourse. We do not sell or rent your personal information to third-party advertisers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0f172a]">3. Data Security & Storage</h2>
              <p>
                All account passwords are encrypted using industry-standard bcrypt hashing (12 salt rounds). Communication between your browser and our servers is secured via SSL/TLS encryption.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0f172a]">4. Audio Recording Confidentiality</h2>
              <p>
                Voice recordings captured during Speaking practice (Read Aloud, Repeat Sentence, Describe Image, Retell Lecture) are processed in real-time by our AI scoring engine solely to compute your score metrics.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0f172a]">5. Your Rights & Data Requests</h2>
              <p>
                You may request account deletion or export of your scorecard data at any time by contacting our support team on WhatsApp (`+977 9763876490`) or emailing `support@masterpte.ai`.
              </p>
            </section>

          </div>

          {/* Contact Banner */}
          <div className="mt-12 text-center bg-[#0f172a] text-white p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left space-y-1">
              <h4 className="font-bold text-base">Privacy or Data Questions?</h4>
              <p className="text-xs text-[#94a3b8]">Contact our support desk on WhatsApp anytime.</p>
            </div>
            <a
              href="https://wa.me/9779763876490?text=Hi%20Master%20PTE%20AI%2C%20I%20have%20a%20privacy%20or%20data%20question."
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
