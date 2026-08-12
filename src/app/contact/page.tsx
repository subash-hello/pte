'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Send, MessageSquare, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct formatted WhatsApp message
    const formattedText = `Hi Master PTE / Master IELTS AI,\n\nI have an inquiry from your platform:\n• *Name:* ${name}\n• *Email:* ${email}\n• *Subject:* ${subject || 'General Inquiry'}\n• *Message:* ${message}`;
    const whatsappUrl = `https://wa.me/9779763876490?text=${encodeURIComponent(formattedText)}`;

    // Open WhatsApp directly
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  const handleDirectWhatsApp = () => {
    const defaultText = `Hi Master PTE AI team, I would like to inquire about your PTE exam preparation plans and features.`;
    window.open(`https://wa.me/9779763876490?text=${encodeURIComponent(defaultText)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1e293b] flex flex-col font-sans selection:bg-[#ff6b4a]/20 selection:text-[#1e293b]">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 mb-6 border border-[#1e293b]/10 rounded-full px-4 py-1.5 bg-white/60 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#0d9488]" />
              <span className="text-xs font-semibold tracking-wide uppercase text-[#64748b]">Direct Support & Inquiries</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0f172a] leading-tight mb-6">
              Get in touch with us<span className="text-[#ff6b4a]">.</span>
            </h1>
            <p className="text-lg text-[#64748b] font-light leading-relaxed">
              Have questions about our PTE practice platform, scoring algorithms, or institution subscriptions? Message us directly on WhatsApp or submit the form below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* WhatsApp Direct Action Card */}
              <div className="bg-[#0f172a] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0d9488]/20 rounded-bl-full pointer-events-none" />
                
                <div className="w-12 h-12 rounded-2xl bg-[#0d9488] text-white flex items-center justify-center mb-6 shadow-md">
                  <MessageSquare className="w-6 h-6" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">Instant WhatsApp Chat</h3>
                <p className="text-[#94a3b8] text-sm font-light mb-6 leading-relaxed">
                  Chat directly with our support team on WhatsApp for fast responses and student assistance.
                </p>
                
                <button
                  onClick={handleDirectWhatsApp}
                  className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm transition-all shadow-lg flex items-center justify-center gap-3"
                >
                  <MessageSquare className="w-5 h-5" /> Chat on WhatsApp (+977 9763876490)
                </button>
              </div>

              {/* Detail Items */}
              <div className="bg-white rounded-3xl p-8 border border-[#1e293b]/10 space-y-6">
                <h3 className="font-bold text-[#0f172a] text-lg mb-4">Contact Information</h3>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#faf9f6] border border-[#1e293b]/10 flex items-center justify-center shrink-0 text-[#0d9488]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">Phone / WhatsApp</h4>
                    <p className="text-base font-semibold text-[#0f172a] mt-0.5">+977 9763876490</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#faf9f6] border border-[#1e293b]/10 flex items-center justify-center shrink-0 text-[#ff6b4a]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">Email Address</h4>
                    <p className="text-base font-semibold text-[#0f172a] mt-0.5">support@masterpte.ai</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#faf9f6] border border-[#1e293b]/10 flex items-center justify-center shrink-0 text-[#0f172a]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">Main Campus / Location</h4>
                    <p className="text-sm font-semibold text-[#0f172a] mt-0.5">Kathmandu Main Campus<br />Kathmandu, Nepal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#1e293b]/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)]">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#0d9488]/10 text-[#0d9488] flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0f172a]">Redirected to WhatsApp!</h3>
                  <p className="text-[#64748b] text-sm max-w-md mx-auto">
                    Your inquiry has been formatted and opened in WhatsApp (`+977 9763876490`). Click Send in WhatsApp to complete your message.
                  </p>
                  <div className="pt-6">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-sm font-semibold text-[#0f172a] hover:text-[#ff6b4a] underline transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="mb-2">
                    <h3 className="text-xl font-bold text-[#0f172a]">Send us a message</h3>
                    <p className="text-xs text-[#64748b] font-light mt-1">
                      Submitting this form connects your conversation directly to WhatsApp (+977 9763876490).
                    </p>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b] mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Subash Bhandari"
                      className="w-full bg-[#faf9f6] border border-[#1e293b]/15 rounded-2xl px-4 py-3.5 text-sm text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/10 transition-all"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b] mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-[#faf9f6] border border-[#1e293b]/15 rounded-2xl px-4 py-3.5 text-sm text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/10 transition-all"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b] mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="How can we help?"
                      className="w-full bg-[#faf9f6] border border-[#1e293b]/15 rounded-2xl px-4 py-3.5 text-sm text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/10 transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b] mb-2">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your message or inquiry here..."
                      className="w-full bg-[#faf9f6] border border-[#1e293b]/15 rounded-2xl px-4 py-3.5 text-sm text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/10 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-[#0f172a] hover:bg-[#1e293b] text-white font-medium text-sm transition-all shadow-lg shadow-[#0f172a]/10 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Send Message via WhatsApp (+977 9763876490)
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
