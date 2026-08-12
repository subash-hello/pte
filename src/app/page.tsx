'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Brain, Target, Zap, BarChart3, MessageSquare, 
  Mic, BookOpen, Headphones, Edit3, 
  ArrowRight, Play, Plus, Minus, Star, ShieldCheck, Check
} from 'lucide-react';
import { clsx } from 'clsx';
import Link from 'next/link';

// Type definitions
type ModuleTab = 'speaking' | 'reading' | 'listening';

// Counter component for animated stats
const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '', decimals = 0 }: { end: number, duration?: number, suffix?: string, prefix?: string, decimals?: number }) => {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(easeProgress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span suppressHydrationWarning>{prefix}{(mounted ? count : end).toFixed(decimals)}{suffix}</span>;
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<ModuleTab>('speaking');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modulesData: Record<ModuleTab, any[]> = {
    speaking: [
      { title: 'Read Aloud', icon: Mic },
      { title: 'Repeat Sentence', icon: Mic },
      { title: 'Describe Image', icon: Mic },
      { title: 'Retell Lecture', icon: Mic },
      { title: 'Answer Short Question', icon: Mic },
      { title: 'Summarize Written Text', icon: Edit3 },
      { title: 'Write Essay', icon: Edit3 },
    ],
    reading: [
      { title: 'R & W: Fill in the Blanks', icon: BookOpen },
      { title: 'Multiple Choice, Multiple Answers', icon: BookOpen },
      { title: 'Re-order Paragraphs', icon: BookOpen },
      { title: 'Reading: Fill in the Blanks', icon: BookOpen },
      { title: 'Multiple Choice, Single Answer', icon: BookOpen },
    ],
    listening: [
      { title: 'Summarize Spoken Text', icon: Headphones },
      { title: 'Multiple Choice, Multiple Answers', icon: Headphones },
      { title: 'Fill in the Blanks', icon: Headphones },
      { title: 'Highlight Correct Summary', icon: Headphones },
      { title: 'Write from Dictation', icon: Headphones },
    ]
  };

  const testimonials = [
    { name: 'Sarah Jenkins', role: 'Nursing Student', rating: 5, content: 'The precise feedback on my pronunciation made all the difference. It felt like having a personal tutor guiding me to a 79+.' },
    { name: 'Raj Patel', role: 'Software Engineer', rating: 5, content: 'Beautiful interface and incredibly accurate scoring. I stopped wasting time on generic materials and focused exactly where I needed to improve.' },
    { name: 'Elena Rodriguez', role: 'Master\'s Candidate', rating: 5, content: 'I walked into the exam room feeling completely at ease. The mock environment here is flawlessly executed.' }
  ];

  const faqs = [
    { q: 'How does the scoring system compare to the real test?', a: 'Our algorithms are meticulously calibrated against official Pearson scoring criteria. We evaluate pronunciation, fluency, and written discourse with a 98% correlation to actual exam results.' },
    { q: 'Which PTE modules are included?', a: 'We cover the complete spectrum: Speaking, Writing, Reading, and Listening. Every single one of the 22 question types is available for practice.' },
    { q: 'Can I try it before committing?', a: 'Absolutely. We offer a comprehensive free trial that allows you to experience our scoring precision and study tools firsthand.' },
    { q: 'How do the personalized study plans work?', a: 'After a brief diagnostic, our platform identifies your unique strengths and areas for growth, mapping out a daily plan designed to hit your target score efficiently.' },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1e293b] font-sans selection:bg-[#ff6b4a]/20 selection:text-[#1e293b]">
      <Navbar />
      
      <main>
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          {/* Subtle grain overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
          
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Left Text */}
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 mb-8 border border-[#1e293b]/10 rounded-full px-4 py-1.5 bg-white/50 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-[#0d9488]"></span>
                  <span className="text-xs font-semibold tracking-wide uppercase text-[#64748b]">Smarter preparation</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-8 text-[#0f172a]">
                  Your PTE score, <br />
                  <span className="italic font-normal text-[#ff6b4a]">mastered.</span>
                </h1>
                
                <p className="text-xl text-[#64748b] leading-relaxed mb-10 max-w-lg font-light">
                  Experience exam preparation that adapts to you. Intelligent scoring, beautiful design, and precisely the feedback you need to succeed.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5">
                  <Link href="/signup" className="px-8 py-4 rounded-2xl bg-[#0f172a] text-white font-medium text-center hover:bg-[#1e293b] hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-[#0f172a]/10">
                    Start Free Trial
                  </Link>
                  <Link href="/dashboard/mock-test" className="px-8 py-4 rounded-2xl bg-white border border-[#1e293b]/10 text-[#1e293b] font-medium text-center hover:border-[#1e293b]/30 hover:bg-[#f1f0ec] transition-all duration-300 flex items-center justify-center gap-2">
                    <Play className="w-4 h-4" /> View Demo
                  </Link>
                </div>
                
                <div className="mt-16 flex items-center gap-8 border-t border-[#1e293b]/5 pt-8">
                  <div>
                    <p className="text-3xl font-bold text-[#0f172a]"><AnimatedCounter end={98} suffix="%" /></p>
                    <p className="text-sm text-[#64748b] mt-1 font-medium">Success Rate</p>
                  </div>
                  <div className="w-px h-10 bg-[#1e293b]/10"></div>
                  <div>
                    <p className="text-3xl font-bold text-[#0f172a]">
                      <AnimatedCounter end={50} suffix="k+" />
                    </p>
                    <p className="text-sm text-[#64748b] mt-1 font-medium">Students worldwide</p>
                  </div>
                </div>
              </div>
              
              {/* Right Visual - Asymmetric Card */}
              <div className="relative lg:h-[600px] flex items-center justify-center lg:justify-end">
                {/* Decorative background shapes */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md aspect-square rounded-full bg-gradient-to-tr from-[#ff6b4a]/10 to-[#0d9488]/10 blur-3xl -z-10"></div>
                
                <div className="relative w-full max-w-md bg-white rounded-[2rem] p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-white/50 backdrop-blur-xl rotate-1 hover:rotate-0 transition-transform duration-700 ease-out">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="font-semibold text-[#0f172a]">Pronunciation Analysis</h3>
                      <p className="text-sm text-[#64748b]">Read Aloud Module</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#faf9f6] flex items-center justify-center border border-[#1e293b]/5">
                      <Mic className="w-5 h-5 text-[#0d9488]" />
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-[#1e293b]">Oral Fluency</span>
                        <span className="font-bold text-[#0d9488]">88/90</span>
                      </div>
                      <div className="h-2 bg-[#faf9f6] rounded-full overflow-hidden">
                        <div className="h-full bg-[#0d9488] w-[95%] rounded-full"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-[#1e293b]">Content</span>
                        <span className="font-bold text-[#1e293b]">82/90</span>
                      </div>
                      <div className="h-2 bg-[#faf9f6] rounded-full overflow-hidden">
                        <div className="h-full bg-[#0f172a] w-[90%] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-5 bg-[#faf9f6] rounded-2xl border border-[#1e293b]/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#ff6b4a]"></div>
                    <p className="text-sm text-[#1e293b] leading-relaxed italic">
                      "Market trends indicate a shift towards sustainable practices..."
                    </p>
                    <div className="mt-3 flex gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#ff6b4a] bg-[#ff6b4a]/10 px-2 py-1 rounded">Focus Word</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#0d9488] bg-[#0d9488]/10 px-2 py-1 rounded">Excellent Pitch</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating element */}
                <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl shadow-black/5 border border-[#1e293b]/5 flex items-center gap-4 -rotate-3">
                  <div className="w-10 h-10 rounded-full bg-[#ff6b4a]/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-[#ff6b4a]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#64748b] uppercase tracking-wide">Target Score</p>
                    <p className="text-xl font-bold text-[#0f172a]">79+ Achieved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENTO FEATURES SECTION */}
        <section id="features" className="py-24 lg:py-32 bg-white rounded-t-[3rem] shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.03)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="mb-16 max-w-2xl">
              <h2 className="text-4xl font-bold tracking-tight text-[#0f172a] mb-4">
                Thoughtfully designed. <br /> Brilliantly executed.
              </h2>
              <p className="text-lg text-[#64748b] font-light">
                We discarded the clutter to focus on what actually improves your score.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Large Card */}
              <div className="md:col-span-2 bg-[#faf9f6] rounded-3xl p-8 lg:p-10 border border-[#1e293b]/5 group hover:border-[#1e293b]/10 transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff6b4a]/5 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-8">
                  <Brain className="w-6 h-6 text-[#ff6b4a]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0f172a] mb-4">Precision Scoring</h3>
                <p className="text-[#64748b] leading-relaxed max-w-md font-light">
                  Our evaluation engine doesn't just give you a number. It breaks down your performance into actionable insights, analyzing pitch, pacing, and vocabulary choices exactly like the official examiners do.
                </p>
              </div>

              {/* Tall Card */}
              <div className="bg-[#0f172a] rounded-3xl p-8 lg:p-10 text-white group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#0d9488]"></div>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-8 backdrop-blur-md">
                  <Target className="w-6 h-6 text-[#0d9488]" />
                </div>
                <h3 className="text-xl font-bold mb-4">Curated Study Paths</h3>
                <p className="text-[#94a3b8] leading-relaxed font-light mb-8">
                  Stop wandering. We map out your daily tasks based on your diagnostic results to ensure you're always progressing.
                </p>
                <div className="mt-auto flex items-center gap-2 text-sm font-medium text-white group-hover:text-[#0d9488] transition-colors cursor-pointer">
                  See how it works <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Small Card 1 */}
              <div className="bg-white border border-[#1e293b]/10 rounded-3xl p-8 group hover:shadow-lg hover:shadow-black/5 transition-all">
                <Zap className="w-6 h-6 text-[#1e293b] mb-6" />
                <h3 className="text-lg font-bold text-[#0f172a] mb-2">Instant Feedback</h3>
                <p className="text-[#64748b] text-sm font-light">Correct mistakes immediately while they are fresh in your mind.</p>
              </div>

              {/* Small Card 2 */}
              <div className="bg-white border border-[#1e293b]/10 rounded-3xl p-8 group hover:shadow-lg hover:shadow-black/5 transition-all">
                <MessageSquare className="w-6 h-6 text-[#1e293b] mb-6" />
                <h3 className="text-lg font-bold text-[#0f172a] mb-2">24/7 Support</h3>
                <p className="text-[#64748b] text-sm font-light">Get detailed grammar explanations anytime you need them.</p>
              </div>

              {/* Medium Card */}
              <div className="md:col-span-2 bg-[#faf9f6] rounded-3xl p-8 border border-[#1e293b]/5 flex flex-col sm:flex-row items-center gap-8 group">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#0f172a] mb-3">Authentic Exam Environment</h3>
                  <p className="text-[#64748b] font-light text-sm max-w-sm">
                    Our interface mirrors the actual Pearson test center software. Practice under real conditions to eliminate test-day anxiety completely.
                  </p>
                </div>
                <div className="w-full sm:w-48 h-32 bg-white rounded-2xl shadow-sm border border-[#1e293b]/5 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                  <ShieldCheck className="absolute w-10 h-10 text-[#0d9488]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MODULES SECTION */}
        <section id="modules" className="py-24 lg:py-32 bg-[#faf9f6]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="max-w-lg">
                <h2 className="text-4xl font-bold tracking-tight text-[#0f172a] mb-4">
                  Master every module.
                </h2>
                <p className="text-lg text-[#64748b] font-light">
                  Targeted practice across all 22 question types.
                </p>
              </div>
              
              <div className="flex bg-white p-1.5 rounded-full border border-[#1e293b]/10 shadow-sm self-start">
                {[
                  { id: 'speaking', label: 'Speaking' },
                  { id: 'reading', label: 'Reading' },
                  { id: 'listening', label: 'Listening' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as ModuleTab)}
                    className={clsx(
                      "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                      activeTab === tab.id
                        ? "bg-[#0f172a] text-white shadow-md"
                        : "text-[#64748b] hover:text-[#1e293b]"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modulesData[activeTab].map((mod, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-[#1e293b]/5 hover:border-[#0d9488]/30 hover:shadow-md transition-all group cursor-pointer flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#faf9f6] flex items-center justify-center group-hover:bg-[#0d9488] group-hover:text-white transition-colors text-[#1e293b]">
                    <mod.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-[#0f172a]">{mod.title}</h4>
                  <ArrowRight className="w-4 h-4 text-transparent group-hover:text-[#0d9488] ml-auto transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-3xl font-bold text-[#0f172a] mb-16 text-center">Words from our students.</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <div key={i} className={clsx(
                  "p-8 rounded-3xl bg-[#faf9f6] border border-[#1e293b]/5 relative",
                  i === 1 ? "md:-translate-y-6" : ""
                )}>
                  <div className="text-[#ff6b4a] text-6xl font-serif leading-none absolute top-6 left-6 opacity-20">"</div>
                  <div className="relative z-10">
                    <p className="text-[#1e293b] leading-relaxed mb-8 pt-4 font-light">
                      {testimonial.content}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#e2e8f0] border-2 border-white shadow-sm overflow-hidden flex items-center justify-center font-bold text-[#64748b]">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#0f172a] text-sm">{testimonial.name}</h4>
                        <p className="text-xs text-[#64748b]">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-24 lg:py-32 bg-[#faf9f6]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight text-[#0f172a] mb-4">Simple, transparent pricing.</h2>
              <p className="text-lg text-[#64748b] font-light">Invest in your future with our flexible plans.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
              {/* Basic */}
              <div className="bg-white rounded-3xl p-8 border border-[#1e293b]/10">
                <h3 className="text-lg font-medium text-[#64748b] mb-4">One Week</h3>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-[#0f172a]">Rs.299</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {['7 Days Full Access', '2 Full Mock Tests', 'Basic Evaluation'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#1e293b] text-sm font-light">
                      <Check className="w-4 h-4 text-[#0d9488]" /> {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 rounded-xl border border-[#1e293b]/20 text-[#1e293b] font-medium hover:bg-[#faf9f6] transition-colors">
                  Choose Plan
                </button>
              </div>

              {/* Popular */}
              <div className="bg-[#0f172a] rounded-3xl p-10 shadow-[0_20px_40px_-15px_rgba(15,23,42,0.3)] relative md:scale-105 z-10">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#ff6b4a] rounded-t-3xl"></div>
                <div className="absolute -top-4 right-8 bg-[#ff6b4a] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
                <h3 className="text-lg font-medium text-[#94a3b8] mb-4">One Month</h3>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-white">Rs.999</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {['30 Days Full Access', 'Unlimited Mock Tests', 'Advanced Analytics', 'Personalized Plan'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-white text-sm font-light">
                      <Check className="w-4 h-4 text-[#ff6b4a]" /> {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 rounded-xl bg-[#ff6b4a] text-white font-medium hover:bg-[#e85a3a] transition-colors shadow-lg shadow-[#ff6b4a]/20">
                  Choose Plan
                </button>
              </div>

              {/* Ultimate */}
              <div className="bg-white rounded-3xl p-8 border border-[#1e293b]/10">
                <h3 className="text-lg font-medium text-[#64748b] mb-4">45 Days Prep</h3>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-[#0f172a]">Rs.1499</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {['45 Days Full Access', 'Everything in Pro', 'PDF Reports', 'Priority Support'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#1e293b] text-sm font-light">
                      <Check className="w-4 h-4 text-[#0d9488]" /> {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 rounded-xl border border-[#1e293b]/20 text-[#1e293b] font-medium hover:bg-[#faf9f6] transition-colors">
                  Choose Plan
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 lg:py-32 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <h2 className="text-3xl font-bold text-[#0f172a] mb-12 text-center">Frequently asked questions.</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-[#1e293b]/10 pb-4">
                  <button 
                    className="w-full py-4 flex items-center justify-between text-left group"
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  >
                    <span className="font-semibold text-[#1e293b] group-hover:text-[#ff6b4a] transition-colors">{faq.q}</span>
                    <div className={clsx(
                      "w-6 h-6 rounded-full border flex items-center justify-center transition-colors",
                      activeFaq === i ? "border-[#ff6b4a] bg-[#ff6b4a]/10" : "border-[#1e293b]/20"
                    )}>
                      {activeFaq === i ? (
                        <Minus className="w-3 h-3 text-[#ff6b4a]" />
                      ) : (
                        <Plus className="w-3 h-3 text-[#1e293b]" />
                      )}
                    </div>
                  </button>
                  <div 
                    className={clsx(
                      "overflow-hidden transition-all duration-300 ease-in-out pl-2 border-l-2 border-[#0d9488]/30",
                      activeFaq === i ? "max-h-40 py-4 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <p className="text-[#64748b] text-sm font-light leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-[#faf9f6]">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff6b4a]/20 rounded-full blur-[80px]"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0d9488]/20 rounded-full blur-[80px]"></div>
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">Begin your journey.</h2>
                <p className="text-lg text-[#94a3b8] font-light leading-relaxed mb-10">
                  Stop settling for generic practice. Get the premium, precise preparation you deserve.
                </p>
                <Link href="/signup" className="inline-block px-10 py-5 rounded-2xl bg-white text-[#0f172a] font-semibold text-lg hover:bg-[#faf9f6] hover:scale-105 transition-all duration-300 shadow-xl shadow-white/10">
                  Start Learning Today
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
