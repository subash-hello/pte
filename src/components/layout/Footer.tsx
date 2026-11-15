import React from 'react';
import Link from 'next/link';
import { Sparkles, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    'Practice Modules': [
      { name: 'Speaking Practice', href: '/dashboard?tab=speaking' },
      { name: 'Writing Evaluation', href: '/dashboard?tab=writing' },
      { name: 'Reading Databank', href: '/dashboard?tab=reading' },
      { name: 'Listening Modules', href: '/dashboard?tab=listening' },
      { name: 'Full Mock Exams (30)', href: '/dashboard/mock-test' },
    ],
    'Portals & Study': [
      { name: 'Student Portal', href: '/login' },
      { name: 'Staff & Admin Console', href: '/admin-login' },
      { name: 'Branch Admin Center', href: '/admin' },
      { name: 'AI Tutor Chat', href: '/dashboard/ai-tutor' },
      { name: 'Templates Vault', href: '/dashboard?tab=templates' },
    ],
    'Platform & Pricing': [
      { name: 'Pricing Plans', href: '/#pricing' },
      { name: 'Register Account', href: '/signup' },
      { name: 'Login Portal', href: '/login' },
      { name: 'Contact Support', href: '/contact' },
    ],
  };

  return (
    <footer className="bg-[#0b0f19] text-white pt-20 pb-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand & Mission */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-sm shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Master PTE <span className="text-rose-500">AI</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm font-medium mb-6 max-w-md leading-relaxed">
              AI-powered Pearson PTE Academic preparation platform built for students &amp; consultancies in Nepal and worldwide. Instant speech &amp; writing evaluation, 1,000+ databank items, and full mock tests.
            </p>

            <div className="space-y-2 text-xs text-slate-400 font-semibold">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Kohalpur, Banke, Nepal · Viper Intelligence</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="https://wa.me/9779763876490" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  WhatsApp: +977 976-3876490
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>support@masterpteai.com</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-xs font-extrabold tracking-wider uppercase mb-5 text-indigo-400">{title}</h4>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-slate-400 hover:text-white text-xs transition-colors font-semibold"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-800/80 gap-4">
          <p className="text-slate-500 text-xs font-semibold">
            © {new Date().getFullYear()} Master PTE AI · Engineered by Subash Bhandari &amp; Rohan Aacharya. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-slate-400 hover:text-white text-xs font-semibold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-slate-400 hover:text-white text-xs font-semibold transition-colors">Terms of Service</Link>
            <Link href="/admin-login" className="text-indigo-400 hover:text-white text-xs font-extrabold transition-colors">Admin Console</Link>
          </div>
        </div>
      </div>

      {/* Floating Chat with Admin WhatsApp Pill */}
      <a
        href="https://wa.me/9779763876490"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition-all hover:scale-105"
      >
        <MessageCircle className="w-4 h-4 fill-white" />
        <span>Chat with Admin</span>
      </a>
    </footer>
  );
}
