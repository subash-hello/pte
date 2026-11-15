'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { clsx } from 'clsx';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Features', href: '/#features' },
    { name: 'Results', href: '/#results' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Study Plans', href: '/#modules' },
    { name: 'Score Guide', href: '/#score-guide' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-2xs">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Brand Logo matching masterieltsai.com */}
          <Link className="flex items-center gap-2.5 group shrink-0" href="/">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-600/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900">
              Master PTE <span className="text-rose-600">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-bold text-slate-600 hover:text-slate-950 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Action Buttons matching masterieltsai.com */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-extrabold text-slate-700 hover:text-indigo-600 px-3 py-2 rounded-xl transition-colors"
            >
              Sign In
            </Link>
            <a
              href="https://wa.me/9779763876490"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 text-xs font-extrabold rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] transition-all flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </a>
            <Link
              href="/signup"
              className="px-4 py-2 text-xs font-extrabold rounded-xl bg-rose-600 hover:bg-rose-700 text-white border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] transition-all flex items-center gap-1.5"
            >
              <span>Start practicing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              className="text-slate-900 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={clsx(
          'fixed inset-x-0 top-[61px] bg-white border-b border-slate-200 z-40 md:hidden transition-all duration-300 ease-in-out p-6 shadow-xl',
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4 hidden'
        )}
      >
        <ul className="flex flex-col gap-4 mb-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-sm font-extrabold text-slate-800 hover:text-indigo-600 transition-colors block"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            className="w-full text-center text-xs font-extrabold text-slate-800 py-3 rounded-xl border border-slate-300 hover:bg-slate-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sign In
          </Link>
          <a
            href="https://wa.me/9779763876490"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center text-xs font-extrabold text-white py-3 rounded-xl bg-emerald-500 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a]"
          >
            WhatsApp Support
          </a>
          <Link
            href="/signup"
            className="w-full text-center text-xs font-extrabold text-white py-3 rounded-xl bg-rose-600 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Start practicing →
          </Link>
        </div>
      </div>
    </header>
  );
}
