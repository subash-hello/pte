'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
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
    { name: 'Features', href: '#features' },
    { name: 'Modules', href: '#modules' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
      isScrolled ? 'bg-[#faf9f6]/90 backdrop-blur-md border-b border-[#1e293b]/5 py-2' : 'bg-transparent py-4',
      isHidden ? '-translate-y-full' : 'translate-y-0'
    )}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-14">
          <Link className="flex items-baseline gap-1 group" href="/">
            <span className="text-2xl font-bold tracking-tight text-[#1e293b] group-hover:opacity-80 transition-opacity">
              PTE Master<span className="text-[#ff6b4a]">.</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="text-sm font-medium text-[#64748b] hover:text-[#1e293b] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-[#0d9488] group-hover:w-full transition-all duration-300 ease-out"></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button className="text-[#64748b] hover:text-[#1e293b] transition-colors" aria-label="Search site">
              <Search className="w-4 h-4" />
            </button>
            <Link className="text-sm font-medium text-[#1e293b] hover:opacity-70 transition-opacity" href="/login">Log in</Link>
            <Link 
              className="px-6 py-2.5 text-sm font-medium rounded-full bg-[#ff6b4a] text-white hover:bg-[#e85a3a] transition-all duration-300 shadow-[0_4px_14px_0_rgba(255,107,74,0.25)] hover:shadow-[0_6px_20px_rgba(255,107,74,0.23)] hover:-translate-y-0.5" 
              href="/signup"
            >
              Start Free Trial
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-4">
            <button className="text-[#1e293b] p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={clsx(
          'fixed inset-0 bg-[#faf9f6] z-40 md:hidden transition-all duration-500 ease-in-out flex flex-col justify-center items-center',
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        )}
      >
        <ul className="flex flex-col items-center gap-8 mb-12">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                href={link.href}
                className="text-2xl font-medium text-[#1e293b] hover:text-[#ff6b4a] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-center gap-6 w-full px-8 max-w-sm">
          <Link 
            href="/login"
            className="text-lg font-medium text-[#64748b] hover:text-[#1e293b] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Log in
          </Link>
          <Link 
            href="/signup"
            className="w-full text-center text-lg font-medium text-white px-6 py-4 rounded-2xl bg-[#ff6b4a] shadow-lg shadow-[#ff6b4a]/20"
            onClick={() => setMobileMenuOpen(false)}
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </header>
  );
}
