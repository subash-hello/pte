import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    'Practice Modules': [
      { name: 'Speaking Practice', href: '/dashboard/practice/speaking/read-aloud' },
      { name: 'Writing Evaluation', href: '/dashboard/practice/writing/write-essay' },
      { name: 'Reading Databank', href: '/dashboard/practice/reading/rw-fill-blanks' },
      { name: 'Listening Modules', href: '/dashboard/practice/listening/write-from-dictation' },
      { name: 'Full Mock Exams (30)', href: '/dashboard/mock-test' },
    ],
    'Portals & Study': [
      { name: 'Student Portal', href: '/dashboard' },
      { name: 'Enterprise Portals Hub', href: '/portal' },
      { name: 'Branch Admin Center', href: '/admin' },
      { name: 'AI Tutor Chat', href: '/dashboard/ai-tutor' },
      { name: 'Daily Study Planner', href: '/dashboard/study-plan' },
    ],
    'Platform & Pricing': [
      { name: 'Pricing Plans', href: '/pricing' },
      { name: 'Register Account', href: '/signup' },
      { name: 'Login Portal', href: '/login' },
      { name: 'Contact Support', href: '/contact' },
    ],
  };

  return (
    <footer className="bg-[#0f172a] text-white pt-24 pb-12 rounded-t-[3rem] mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-8 group">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                PTE Master<span className="text-[#ff6b4a]">.</span>
              </span>
            </Link>
            <p className="text-[#94a3b8] text-sm font-normal mb-8 max-w-md leading-relaxed">
              The premier Pearson PTE Academic preparation system. Intelligent Gemini AI speech evaluation, 1,000+ authentic databank items, 30 timed mock exams, and multi-campus management.
            </p>
            
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 font-semibold">
                🎯 98% Pearson GSE Correlation
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 font-semibold">
                🏢 Multi-Branch Network
              </span>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-white text-xs font-bold tracking-wider uppercase mb-6 text-indigo-400">{title}</h4>
                <ul className="flex flex-col gap-3.5">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-[#94a3b8] hover:text-white text-xs transition-colors font-medium relative inline-block group"
                      >
                        {link.name}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-indigo-400 group-hover:w-full transition-all duration-300"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#334155]/50 gap-6">
          <p className="text-[#64748b] text-xs font-medium">
            © {new Date().getFullYear()} PTE Master AI. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[#64748b] hover:text-white text-xs font-medium transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[#64748b] hover:text-white text-xs font-medium transition-colors">Terms of Service</Link>
            <Link href="/portal" className="text-indigo-400 hover:text-white text-xs font-bold transition-colors">Enterprise Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
