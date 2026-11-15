'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, MessageCircle, Sparkles, Building2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 pt-28 pb-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" /> Direct Support & Branch Inquiries
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-slate-900 font-satoshi">
              Get in Touch with <span className="text-indigo-600">Master PTE AI</span>
            </h1>
            <p className="text-slate-600 text-base font-medium">
              Need instant Pro account activation, consultancy branch setup, or technical assistance? Reach out to our Nepal engineering & academic team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 bg-[#0b0f19] text-white rounded-3xl p-8 border-2 border-[#0b0f19] shadow-[6px_6px_0px_#4f46e5] space-y-7">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
                  Viper Intelligence HQ
                </span>
                <h3 className="text-2xl font-black mt-1 font-satoshi">Contact Information</h3>
                <p className="text-slate-400 text-xs font-medium mt-1">
                  Fastest response on WhatsApp (typically under 5 minutes).
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400">WhatsApp & Direct Call</div>
                    <a
                      href="https://wa.me/9779763876490"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-black text-white hover:text-emerald-400 transition-colors"
                    >
                      +977 976-3876490
                    </a>
                    <div className="text-[11px] text-slate-400 mt-0.5">Sun – Fri, 7:00 AM to 9:00 PM NPT</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400">Email Support</div>
                    <div className="text-sm font-black text-white">support@masterpteai.com</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">admin@pteai.com (Consultancy Desk)</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400">Headquarters</div>
                    <div className="text-sm font-black text-white">Kohalpur, Banke, Nepal</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Built by Engineers: Subash Bhandari & Rohan Aacharya
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400">Regional Consultancy Hubs</div>
                    <div className="text-xs font-semibold text-slate-200 mt-0.5">
                      Kathmandu (`KTM01`) • Pokhara (`PKR02`) • Lalitpur (`LAL03`) • Chitwan (`CHT04`) • KIEC (`KIEC13`)
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <a
                  href="https://wa.me/9779763876490?text=Hello%20Master%20PTE%20AI%20Admin!%20I%20have%20a%20question."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" /> Chat Instantly on WhatsApp
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 bg-white border-2 border-[#0b0f19] rounded-3xl p-8 lg:p-10 shadow-[6px_6px_0px_#0b0f19]">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 font-satoshi">Message Received!</h3>
                  <p className="text-slate-600 text-sm font-medium max-w-md mx-auto">
                    Thank you for contacting Master PTE AI. Our support team will respond shortly, or you can message us directly on WhatsApp for immediate activation.
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-extrabold text-slate-700"
                    >
                      Send Another Message
                    </button>
                    <a
                      href="https://wa.me/9779763876490"
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-black flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Open WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-black text-slate-900 font-satoshi">Send Us a Direct Message</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Aarav Sharma"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-indigo-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                        WhatsApp / Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="98XXXXXXXX"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-indigo-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-indigo-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                      Inquiry Type
                    </label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-indigo-600 transition-colors">
                      <option>Student Pro Account Activation (Rs. 299 – Rs. 2,500)</option>
                      <option>Consultancy Branch Admin Partnership & Quota</option>
                      <option>Branch Code Verification Issue</option>
                      <option>Technical Support / AI Scoring Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us your registered email, branch code, or question..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-indigo-600 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#e11d48] hover:bg-rose-700 text-white font-black text-sm flex items-center justify-center gap-2 transition-all border-2 border-[#0b0f19] shadow-[4px_4px_0px_#0b0f19]"
                  >
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
