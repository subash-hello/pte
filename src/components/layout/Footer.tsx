import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    Platform: [
      { name: 'Speaking Practice', href: '/dashboard/practice/speaking/read-aloud' },
      { name: 'Writing Evaluation', href: '/dashboard/practice/writing/write-essay' },
      { name: 'Reading Modules', href: '/dashboard/practice/reading/rw-fill-blanks' },
      { name: 'Listening Tests', href: '/dashboard/practice/listening/write-from-dictation' },
      { name: 'Full Mock Exams', href: '/dashboard/mock-test' },
    ],
    Resources: [
      { name: 'Study Guides', href: '/dashboard/study-plan' },
      { name: 'Scoring Criteria', href: '#faq' },
      { name: 'Success Stories', href: '#testimonials' },
      { name: 'Blog & Updates', href: '#' },
    ],
    Company: [
      { name: 'Our Story', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact Us', href: '/contact' },
    ],
  };

  return (
    <footer className="bg-[#0f172a] text-white pt-24 pb-12 rounded-t-[3rem] mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-8 group">
              <span className="text-3xl font-bold tracking-tight text-white group-hover:opacity-80 transition-opacity">
                PTE Master<span className="text-[#ff6b4a]">.</span>
              </span>
            </Link>
            <p className="text-[#94a3b8] text-lg font-light mb-10 max-w-md leading-relaxed">
              We're redefining exam preparation. Thoughtfully crafted tools and intelligent feedback to help you master the PTE Academic.
            </p>
            
            <div className="max-w-md">
              <h4 className="text-white text-sm font-medium tracking-wide uppercase mb-4 opacity-80">Join our newsletter</h4>
              <form className="relative group">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-[#1e293b] border border-[#334155] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#0d9488] transition-colors placeholder:text-[#64748b]"
                />
                <button type="button" className="absolute right-2 top-2 bottom-2 bg-[#ff6b4a] hover:bg-[#e85a3a] text-white px-5 rounded-lg transition-colors flex items-center justify-center">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-white text-sm font-medium tracking-wide uppercase mb-8 opacity-80">{title}</h4>
                <ul className="flex flex-col gap-5">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-[#94a3b8] hover:text-white transition-colors font-light relative inline-block group"
                      >
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#0d9488] group-hover:w-full transition-all duration-300"></span>
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
          <p className="text-[#64748b] text-sm font-light">
            © {new Date().getFullYear()} PTE Master. Carefully crafted for students.
          </p>
          
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="text-[#64748b] hover:text-white text-sm font-light transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[#64748b] hover:text-white text-sm font-light transition-colors">Terms of Service</Link>
            <div className="w-px h-4 bg-[#334155]"></div>
            <div className="flex items-center gap-5">
              <a href="#" className="text-[#64748b] hover:text-[#ff6b4a] transition-colors" aria-label="X/Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="text-[#64748b] hover:text-[#ff6b4a] transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z"/></svg>
              </a>
              <a href="#" className="text-[#64748b] hover:text-[#ff6b4a] transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
