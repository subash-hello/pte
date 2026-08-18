'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles, User, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Practice Hub', href: '/dashboard' },
    { name: 'Mock Tests', href: '/dashboard/mock-test' },
    { name: 'AI Tutor', href: '/dashboard/ai-tutor' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Portal', href: '/portal' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
      isScrolled ? 'bg-[#faf9f6]/95 backdrop-blur-md border-b border-[#1e293b]/5 py-2.5 shadow-2xs' : 'bg-transparent py-4',
      isHidden ? '-translate-y-full' : 'translate-y-0'
    )}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-14">
          {/* Brand Logo */}
          <Link className="flex items-center gap-2 group" href="/">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-600/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-[#1e293b] group-hover:text-indigo-600 transition-colors">
              PTE Master<span className="text-[#ff6b4a]">.</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="text-xs font-bold text-[#64748b] hover:text-[#0f172a] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300 ease-out rounded-full" />
              </Link>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              className="text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors px-3 py-2 rounded-xl hover:bg-indigo-50/60 flex items-center gap-1.5" 
              href="/login"
            >
              <User className="w-3.5 h-3.5 text-indigo-600" />
              <span>Log in</span>
            </Link>
            <Link 
              className="px-5 py-2.5 text-xs font-extrabold rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 shadow-md shadow-indigo-600/20 hover:-translate-y-0.5 flex items-center gap-1.5" 
              href="/signup"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-4">
            <button className="text-[#1e293b] p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Navigation">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={clsx(
          'fixed inset-0 bg-[#faf9f6] z-40 md:hidden transition-all duration-500 ease-in-out flex flex-col justify-center items-center',
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        )}
      >
        <ul className="flex flex-col items-center gap-6 mb-10">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                href={link.href}
                className="text-xl font-bold text-[#1e293b] hover:text-indigo-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-center gap-4 w-full px-8 max-w-sm">
          <Link 
            href="/login"
            className="w-full text-center text-sm font-bold text-slate-700 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Log in
          </Link>
          <Link 
            href="/signup"
            className="w-full text-center text-sm font-extrabold text-white py-3.5 rounded-xl bg-indigo-600 shadow-md shadow-indigo-600/20"
            onClick={() => setMobileMenuOpen(false)}
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </header>
  );
}
