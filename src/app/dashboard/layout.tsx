'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Sparkles,
  Mic,
  PenTool,
  BookOpen,
  Headphones,
  FileText,
  Bot,
  BookMarked,
  BarChart3,
  Folder,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Flame,
  Bell,
  Search,
  Shield,
  X,
  Menu,
  Sun,
  Moon,
} from 'lucide-react';
import FloatingSiriCoach from '@/components/FloatingSiriCoach';
import RoleSwitcherBar from '@/components/RoleSwitcherBar';
import { useTheme } from '@/context/ThemeContext';
import { getUser, authFetch } from '@/lib/session';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  isExternal?: boolean;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Diagnostic Test', href: '/dashboard?tab=diagnostic', icon: Sparkles, badge: 'Step 1' },
  { name: 'Speaking', href: '/dashboard?tab=speaking', icon: Mic },
  { name: 'Writing', href: '/dashboard?tab=writing', icon: PenTool },
  { name: 'Reading', href: '/dashboard?tab=reading', icon: BookOpen },
  { name: 'Listening', href: '/dashboard?tab=listening', icon: Headphones },
  { name: 'Mock Tests', href: '/dashboard/mock-test', icon: FileText },
  { name: 'AI Tutor', href: '/dashboard/ai-tutor', icon: Bot },
  { name: 'Vocabulary', href: '/dashboard?tab=vocabulary', icon: BookMarked },
  { name: 'Templates', href: '/dashboard?tab=templates', icon: Folder },
  { name: 'Progress', href: '/dashboard?tab=progress', icon: BarChart3 },
  { name: 'Notebook', href: '/dashboard?tab=notebook', icon: BookOpen },
  { name: 'User Guide', href: '/dashboard?tab=user_guide', icon: HelpCircle },
];

function SidebarNav({
  collapsed,
  isMobile,
  setMobileOpen,
  user,
}: {
  collapsed: boolean;
  isMobile: boolean;
  setMobileOpen: (open: boolean) => void;
  user: any;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab');

  return (
    <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
      {navItems.map((item) => {
        const itemUrl = item.href.split('?')[0];
        const itemTab = item.href.includes('?tab=') ? item.href.split('?tab=')[1] : null;

        const isActive = itemTab
          ? pathname === itemUrl && currentTab === itemTab
          : pathname === itemUrl && (!currentTab || currentTab === 'dashboard');

        const Icon = item.icon;

        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => {
              if (isMobile) setMobileOpen(false);
            }}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group ${
              isActive
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 font-extrabold border-l-4 border-indigo-600 dark:border-indigo-400 shadow-2xs'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 font-bold'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon
                className={`w-5 h-5 flex-shrink-0 transition-colors ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                }`}
              />
              {(!collapsed || isMobile) && <span className="whitespace-nowrap">{item.name}</span>}
            </div>
            {(!collapsed || isMobile) && item.badge && (
              <span className="px-1.5 py-0.5 text-[9px] font-black rounded-full bg-indigo-100 text-indigo-700 dark:bg-accent/20 dark:text-accent border border-indigo-200 dark:border-accent/40 animate-pulse uppercase tracking-wider">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}

      {(user?.role === 'admin' || user?.role === 'super_admin' || user?.role === 'branch_admin') && (
        <Link
          href="/admin"
          className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-black text-cyan-700 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-white hover:bg-cyan-50 dark:hover:bg-cyan-500/10 border-2 border-cyan-400/50 my-2 transition-all shadow-2xs"
        >
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            {(!collapsed || isMobile) && <span className="whitespace-nowrap">Admin Panel</span>}
          </div>
        </Link>
      )}
    </nav>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [streak, setStreak] = useState(7);
  const [xp, setXp] = useState(1450);

  // Modals & Panels
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Omni Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchSelectedIndex, setSearchSelectedIndex] = useState(0);

  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load Session & User Data
  useEffect(() => {
    const current = getUser();
    if (current) {
      setUser(current);
    }
  }, []);

  // Send periodic Heartbeat for real-time tracking
  useEffect(() => {
    const sendHeartbeat = async () => {
      try {
        const u = getUser();
        if (u) {
          await authFetch('/api/activity/heartbeat', {
            method: 'POST',
            body: JSON.stringify({
              currentTask: typeof window !== 'undefined' ? window.location.pathname.replace('/dashboard', '') || 'Dashboard' : 'Active Learning',
            }),
          });
        }
      } catch (e) {}
    };

    sendHeartbeat();
    const interval = setInterval(sendHeartbeat, 30000);
    return () => clearInterval(interval);
  }, []);

  const searchableItems = [
    { name: 'Dashboard Home', type: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Quick Diagnostic Test (15 Min)', type: 'Diagnostic', href: '/dashboard?tab=diagnostic', icon: Sparkles },
    { name: 'Read Aloud (RA)', type: 'Speaking', href: '/dashboard/practice/speaking/read-aloud', icon: Mic },
    { name: 'Repeat Sentence (RS)', type: 'Speaking', href: '/dashboard/practice/speaking/repeat-sentence', icon: Mic },
    { name: 'Describe Image (DI)', type: 'Speaking', href: '/dashboard/practice/speaking/describe-image', icon: Mic },
    { name: 'Re-tell Lecture (RL)', type: 'Speaking', href: '/dashboard/practice/speaking/retell-lecture', icon: Mic },
    { name: 'Answer Short Question (ASQ)', type: 'Speaking', href: '/dashboard/practice/speaking/answer-short-question', icon: Mic },
    { name: 'Summarize Written Text (SWT)', type: 'Writing', href: '/dashboard/practice/writing/summarize-written-text', icon: PenTool },
    { name: 'Write Essay (WE)', type: 'Writing', href: '/dashboard/practice/writing/write-essay', icon: PenTool },
    { name: 'Reading: Fill in the Blanks', type: 'Reading', href: '/dashboard/practice/reading/reading-fill-in-blanks', icon: BookOpen },
    { name: 'Re-order Paragraphs (RO)', type: 'Reading', href: '/dashboard/practice/reading/reorder-paragraphs', icon: BookOpen },
    { name: 'Listening: Summarize Spoken Text', type: 'Listening', href: '/dashboard/practice/listening/summarize-spoken-text', icon: Headphones },
    { name: 'Listening: Write From Dictation (WFD)', type: 'Listening', href: '/dashboard/practice/listening/write-from-dictation', icon: Headphones },
    { name: 'Full PTE Mock Tests', type: 'Mock Exam', href: '/dashboard/mock-test', icon: FileText },
    { name: 'AI Tutor Coach', type: 'AI Assistant', href: '/dashboard/ai-tutor', icon: Bot },
    { name: 'Vocabulary & Collocations', type: 'Resources', href: '/dashboard?tab=vocabulary', icon: BookMarked },
    { name: 'Scoring Templates (DI, RL, WE)', type: 'Resources', href: '/dashboard?tab=templates', icon: Folder },
    { name: 'Progress Analytics & Scorecard', type: 'Analytics', href: '/dashboard?tab=progress', icon: BarChart3 },
    { name: 'My Notebook & Flashcards', type: 'Notebook', href: '/dashboard?tab=notebook', icon: BookOpen },
    { name: 'Admin Control Center', type: 'Admin', href: '/admin', icon: Shield },
  ];

  const filteredItems = searchableItems.filter((item) => {
    if (item.name === 'Admin Control Center' && user?.role !== 'admin' && user?.role !== 'super_admin') return false;
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSelectSearchItem = (item: (typeof searchableItems)[0]) => {
    setSearchQuery('');
    setSearchFocused(false);
    router.push(item.href);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredItems.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSearchSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSearchSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[searchSelectedIndex]) {
        handleSelectSearchItem(filteredItems[searchSelectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setSearchFocused(false);
    }
  };

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="min-h-screen flex flex-col font-sans gradient-mesh-bg">
      {/* Dev Role Switcher Bar */}
      <RoleSwitcherBar />

      {/* Floating Global Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-18 right-6 z-[120] px-4 py-2.5 rounded-2xl bg-indigo-600 text-white text-xs font-bold shadow-xl flex items-center gap-2 border border-indigo-400/40 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex relative">
        {/* Mobile Backdrop */}
        {isMobile && mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          />
        )}

        {/* Sidebar */}
        <motion.aside
          animate={{ width: isMobile ? 280 : collapsed ? 80 : 280 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`fixed left-0 top-0 bottom-0 z-50 bg-white/95 dark:bg-[#0a0915]/95 backdrop-blur-xl border-r border-slate-200 dark:border-border-glass flex flex-col overflow-hidden transition-all duration-300 shadow-sm ${
            isMobile ? (mobileOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'
          }`}
        >
          {/* Brand Header */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-slate-200 dark:border-border-glass flex-shrink-0">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-500/20 flex-shrink-0">
                <Sparkles className="w-4 h-4 text-cyan-200" />
              </div>
              {(!collapsed || isMobile) && (
                <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  PTE <span className="text-indigo-600 dark:text-accent">AI</span>
                </span>
              )}
            </Link>
            {isMobile && (
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-surface hover:bg-slate-200 dark:hover:bg-surface-hover border border-slate-200 dark:border-border-glass text-slate-600 dark:text-text-muted hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* User Status Card */}
          {(!collapsed || isMobile) && user && (
            <div className="px-4 py-3.5 border-b border-slate-200 dark:border-border-glass bg-slate-50/80 dark:bg-surface/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-extrabold text-sm shadow-inner">
                  {userInitial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white truncate">{user.name || 'Super Admin'}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-indigo-600 dark:text-neon" />
                    Level {user.level || 10} · {xp.toLocaleString()} XP
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links wrapped in Suspense */}
          <Suspense fallback={<div className="p-4 text-xs text-slate-500">Loading menu...</div>}>
            <SidebarNav
              collapsed={collapsed}
              isMobile={isMobile}
              setMobileOpen={setMobileOpen}
              user={user}
            />
          </Suspense>

          {/* Bottom Action Items */}
          <div className="px-3 py-3 border-t border-slate-200 dark:border-border-glass space-y-1">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-surface transition-all text-left cursor-pointer"
            >
              <Settings className="w-4 h-4 flex-shrink-0 text-indigo-600 dark:text-accent" />
              {(!collapsed || isMobile) && <span>Settings</span>}
            </button>
            <button
              onClick={() => setIsHelpOpen(true)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-surface transition-all text-left cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 flex-shrink-0 text-indigo-600 dark:text-accent" />
              {(!collapsed || isMobile) && <span>Help & FAQ</span>}
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('pte_user');
                router.push('/login');
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all text-left cursor-pointer"
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              {(!collapsed || isMobile) && <span>Logout</span>}
            </button>
          </div>
        </motion.aside>

        {/* Sidebar Collapse Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex fixed top-20 z-50 w-6 h-6 rounded-full bg-[#1e293b] border border-slate-700 items-center justify-center text-slate-300 hover:text-white hover:border-indigo-400 hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
          style={{ left: collapsed ? '68px' : '268px', transition: 'left 0.3s ease-in-out' }}
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>

        {/* Main Content Area */}
        <div className={`flex-1 transition-all duration-300 ${isMobile ? 'ml-0' : collapsed ? 'ml-20' : 'ml-[280px]'}`}>
          {/* Top Header Bar */}
          <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#0a0915]/95 backdrop-blur-xl border-b border-slate-200 dark:border-border-glass h-16 flex items-center px-4 lg:px-6 gap-4 shadow-2xs">
            {isMobile && (
              <button
                onClick={() => setMobileOpen(true)}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-surface hover:bg-slate-200 dark:hover:bg-surface-hover border border-slate-200 dark:border-border-glass text-slate-700 dark:text-slate-300 transition-colors cursor-pointer mr-1"
                aria-label="Open navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            {/* Omni-Search */}
            <div className="flex-1">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  placeholder="Search PTE question types, mock tests, templates..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchSelectedIndex(0);
                  }}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  onKeyDown={handleSearchKeyDown}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-surface border border-slate-200 dark:border-border-glass text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-500 focus:border-indigo-600 dark:focus:border-accent transition-all"
                />

                {/* Autocomplete Palette */}
                <AnimatePresence>
                  {searchFocused && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 right-0 mt-2 bg-white dark:bg-[#0e0c1f] border border-slate-200 dark:border-border-glass rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[320px] overflow-y-auto"
                    >
                      {filteredItems.length > 0 ? (
                        <div className="p-2 space-y-1">
                          {filteredItems.map((item, idx) => {
                            const Icon = item.icon;
                            const isSelected = idx === searchSelectedIndex;
                            return (
                              <button
                                key={item.name}
                                onMouseDown={() => handleSelectSearchItem(item)}
                                onMouseEnter={() => setSearchSelectedIndex(idx)}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all text-left cursor-pointer ${
                                  isSelected
                                    ? 'bg-indigo-50 dark:bg-accent/15 text-indigo-700 dark:text-accent border-l-2 border-indigo-600 font-bold'
                                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-surface font-medium'
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-600 dark:text-accent' : 'text-slate-500'}`} />
                                  <span className="text-xs">{item.name}</span>
                                </div>
                                <span
                                  className={`text-[9px] uppercase font-black tracking-wider px-1.5 py-0.5 rounded ${
                                    isSelected ? 'bg-indigo-100 text-indigo-700 dark:bg-accent/25 dark:text-accent' : 'bg-slate-100 dark:bg-surface text-slate-600 dark:text-slate-400'
                                  }`}
                                >
                                  {item.type}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-xs font-semibold text-slate-500">
                          No matching PTE items found for "{searchQuery}"
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Topbar Widgets */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Daily Streak Flame */}
              <div
                onClick={() => showToast(`🔥 ${streak}-day PTE study streak active! Keep going!`)}
                className="flex items-center gap-1.5 text-sm cursor-pointer hover:scale-105 transition-transform"
                title="Daily Study Streak"
              >
                <Flame className="w-4.5 h-4.5 text-orange-500 animate-bounce" />
                <span className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">{streak}</span>
              </div>

              {/* XP Level Badge */}
              <div
                onClick={() => showToast(`✨ You have ${xp.toLocaleString()} PTE Experience Points!`)}
                className="hidden sm:flex items-center gap-1.5 text-xs cursor-pointer hover:scale-105 transition-transform"
                title="PTE Experience Level"
              >
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-neon" />
                <span className="font-bold text-slate-700 dark:text-slate-300">{xp.toLocaleString()} XP</span>
              </div>

              {/* Theme Switcher Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-slate-100 dark:bg-surface hover:bg-slate-200 dark:hover:bg-surface-hover border border-slate-200 dark:border-border-glass text-slate-700 dark:text-text-muted hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer shadow-2xs"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
              </button>

              {/* Notifications Bell */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsNotificationsOpen(!isNotificationsOpen);
                    setIsProfileDropdownOpen(false);
                  }}
                  className="relative p-2 rounded-xl bg-slate-100 dark:bg-surface hover:bg-slate-200 dark:hover:bg-surface-hover border border-slate-200 dark:border-border-glass text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer shadow-2xs"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-[9px] text-white flex items-center justify-center font-bold animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {isNotificationsOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-[#0e0c1f] border border-slate-200 dark:border-border-glass shadow-2xl p-4 z-50 text-slate-900 dark:text-white"
                      >
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-border-glass mb-3">
                          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">PTE Updates</span>
                          <button
                            onClick={() => {
                              setUnreadCount(0);
                              showToast('All notifications marked as read!');
                            }}
                            className="text-[10px] font-bold text-indigo-600 hover:underline cursor-pointer"
                          >
                            Mark read
                          </button>
                        </div>

                        <div className="space-y-2 max-h-[240px] overflow-y-auto">
                          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-accent/10 border border-indigo-100 dark:border-accent/20 hover:bg-indigo-100/60 text-left">
                            <span className="text-xs font-bold text-slate-900 dark:text-white block">AI Scoring Engine Updated</span>
                            <span className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5 block font-medium">
                              Pronunciation and Oral Fluency models tuned for 90-band precision.
                            </span>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-50 dark:bg-surface hover:bg-slate-100 dark:hover:bg-surface-hover border border-slate-200 dark:border-border-glass text-left">
                            <span className="text-xs font-bold text-slate-900 dark:text-white block">Weekly Diagnostic Test Available</span>
                            <span className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5 block font-medium">
                              Check your predicted PTE score breakdown across 4 skills.
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Avatar Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(!isProfileDropdownOpen);
                    setIsNotificationsOpen(false);
                  }}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:scale-105 transition-transform shadow-xs"
                >
                  {userInitial}
                </button>

                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsProfileDropdownOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#0e0c1f] border border-slate-200 dark:border-border-glass shadow-2xl p-4 z-50 text-slate-900 dark:text-white space-y-3"
                      >
                        <div className="pb-2 border-b border-slate-200 dark:border-border-glass">
                          <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate">{user?.name || 'Super Admin'}</p>
                          <p className="text-[10px] text-slate-500 truncate mt-0.5 font-medium">{user?.email || 'admin@ptemaster.com'}</p>
                          <span className="inline-block text-[9px] uppercase font-black tracking-widest text-indigo-700 dark:text-accent bg-indigo-50 dark:bg-accent/15 px-2 py-0.5 rounded-md mt-1.5 border border-indigo-100 dark:border-accent/30">
                            {user?.role || 'Admin'} Cockpit
                          </span>
                        </div>

                        <div className="space-y-1">
                          <Link
                            href="/dashboard"
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-surface-hover transition-all text-left"
                          >
                            <LayoutDashboard className="w-3.5 h-3.5 text-indigo-600 dark:text-accent" />
                            <span>My Dashboard</span>
                          </Link>
                          <button
                            onClick={() => {
                              setIsProfileDropdownOpen(false);
                              setIsSettingsOpen(true);
                            }}
                            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-surface-hover transition-all text-left cursor-pointer"
                          >
                            <Settings className="w-3.5 h-3.5 text-indigo-600 dark:text-accent" />
                            <span>Settings</span>
                          </button>
                          <button
                            onClick={() => {
                              setIsProfileDropdownOpen(false);
                              setIsHelpOpen(true);
                            }}
                            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-surface-hover transition-all text-left cursor-pointer"
                          >
                            <HelpCircle className="w-3.5 h-3.5 text-indigo-600 dark:text-accent" />
                            <span>Help & FAQ</span>
                          </button>
                        </div>

                        <div className="pt-2 border-t border-slate-200 dark:border-border-glass">
                          <button
                            onClick={() => {
                              localStorage.removeItem('pte_user');
                              router.push('/login');
                            }}
                            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all text-left cursor-pointer"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Log Out</span>
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>

          {/* Children / Dashboard Content */}
          <main className="p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>

      {/* Floating AI Coach Widget */}
      <FloatingSiriCoach />

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsSettingsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md p-6 rounded-3xl bg-white dark:bg-[#0e0c1f] border border-slate-200 dark:border-border-glass shadow-2xl text-slate-900 dark:text-white z-10"
            >
              <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-border-glass mb-4">
                <h3 className="font-extrabold text-base flex items-center gap-2 text-slate-900 dark:text-white">
                  <Settings className="w-5 h-5 text-indigo-600 dark:text-accent" />
                  PTE Platform Settings
                </h3>
                <button onClick={() => setIsSettingsOpen(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-surface-hover rounded-lg cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-text-muted mb-1.5">Target GSE Score</label>
                  <select className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-border-glass text-slate-900 dark:text-white text-xs font-bold">
                    <option value="90">90 (Superior / Proficient C2)</option>
                    <option value="79" selected>79+ (Proficient Plus C1)</option>
                    <option value="65">65+ (Competent B2)</option>
                    <option value="50">50+ (Vocational B1)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-text-muted mb-1.5">AI Feedback Detail Level</label>
                  <select className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-border-glass text-slate-900 dark:text-white text-xs font-bold">
                    <option value="deep" selected>Detailed Phoneme & Grammar Breakdown</option>
                    <option value="concise">Concise Overview</option>
                  </select>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => {
                      setIsSettingsOpen(false);
                      showToast('Settings saved successfully!');
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 cursor-pointer"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Help & FAQ Modal */}
      <AnimatePresence>
        {isHelpOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsHelpOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg p-6 rounded-3xl bg-white dark:bg-[#0e0c1f] border border-slate-200 dark:border-border-glass shadow-2xl text-slate-900 dark:text-white z-10"
            >
              <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-border-glass mb-4">
                <h3 className="font-extrabold text-base flex items-center gap-2 text-slate-900 dark:text-white">
                  <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-accent" />
                  Help & Frequently Asked Questions
                </h3>
                <button onClick={() => setIsHelpOpen(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-surface-hover rounded-lg cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-600 dark:text-text-muted">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-border-glass">
                  <p className="font-extrabold text-slate-900 dark:text-white mb-1">How is oral fluency and pronunciation scored?</p>
                  <p className="font-medium">Our speech engine checks cadence, hesitations, pauses, and phoneme accuracy against Pearson GSE rubrics.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-border-glass">
                  <p className="font-extrabold text-slate-900 dark:text-white mb-1">Are PTE templates accepted by the AI scorer?</p>
                  <p className="font-medium">Yes, all official templates for Describe Image, Re-tell Lecture, and Write Essay are supported.</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
