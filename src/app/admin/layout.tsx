'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, GitBranch, Users, FileText, Folder, BookMarked, Eye,
  Settings, HelpCircle, LogOut, Menu, X, Search, Bell, Sparkles, ChevronLeft,
  Rocket, Shield, Database, Building2, CheckCircle2, ChevronDown
} from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getUser, clearSession, authFetch } from '@/lib/session';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [userSession, setUserSession] = useState<any>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const verifyAuth = async () => {
      try {
        const user = getUser();
        if (!user) {
          router.replace('/login');
          return;
        }

        const res = await authFetch('/api/auth/me');
        if (res.status === 401) {
          clearSession();
          router.replace('/login');
          return;
        }

        const data = await res.json();
        if (data.user) {
          if (data.user.role !== 'super_admin' && data.user.role !== 'branch_admin') {
            router.replace('/dashboard');
            return;
          }
          setUserSession(data.user);
          setIsAuthorized(true);
        } else {
          router.replace('/login');
        }
      } catch (e) {
        const user = getUser();
        if (user && (user.role === 'super_admin' || user.role === 'branch_admin')) {
          setUserSession(user);
          setIsAuthorized(true);
        } else {
          router.replace('/login');
        }
      }
    };

    verifyAuth();
  }, [router]);

  const handleLogout = () => {
    clearSession();
    router.replace('/login');
  };

  const isSuperAdmin = userSession?.role === 'super_admin';

  // Navigation structure based on Role
  const mainNav = [
    { name: 'Command Center', href: '/admin', icon: LayoutDashboard },
    ...(isSuperAdmin ? [{ name: 'Campus Branches', href: '/admin/branches', icon: GitBranch }] : []),
    { name: 'Candidates Directory', href: '/admin/users', icon: Users },
    { name: 'Content Pool', href: '/admin/content', icon: FileText },
    { name: 'Files', href: '/admin/files', icon: Folder },
    { name: 'Notebook', href: '/admin/notebook', icon: BookMarked },
    { name: 'Candidate View', href: '/dashboard', icon: Eye },
  ];

  if (!mounted || !isAuthorized) {
    return null;
  }

  return (
    <div suppressHydrationWarning className="min-h-screen bg-[#f4f5fa] text-slate-900 flex flex-col font-sans">
      <div className="flex-1 flex min-w-0 h-screen overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Left Sidebar */}
        <div 
          className={clsx(
            "fixed inset-y-0 left-0 z-50 bg-white border-r border-[#e8ecf4] transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:block flex flex-col h-screen shadow-xs relative",
            collapsed ? "w-20" : "w-[275px]",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Header Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-100 shrink-0">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center shadow-md shrink-0">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
              {!collapsed && (
                <span className="text-xl font-extrabold tracking-tight">
                  <span className="text-slate-900 font-black font-satoshi">PTE</span>
                  <span className="text-indigo-600 font-black font-satoshi ml-1">AI</span>
                </span>
              )}
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-slate-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User Profile Card */}
          <div className="p-3 border-b border-slate-100 relative">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm shrink-0">
                  {userSession?.name ? userSession.name.charAt(0).toUpperCase() : 'A'}
                </div>
                {!collapsed && (
                  <div className="min-w-0">
                    <h4 className="text-xs font-extrabold text-slate-900 leading-tight truncate">{userSession?.name || 'Master Admin'}</h4>
                    <p className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 mt-0.5">
                      <span>{userSession?.role === 'super_admin' ? '👑 Super Admin' : '🏢 Branch Admin'}</span>
                    </p>
                  </div>
                )}
              </div>
              {!collapsed && (
                <button 
                  onClick={() => setCollapsed(!collapsed)}
                  className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xs shrink-0 hover:bg-indigo-600 transition-colors cursor-pointer"
                  title="Collapse Sidebar"
                >
                  <ChevronLeft className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto py-3 px-3 custom-scrollbar space-y-1">
            {mainNav.map((item) => {
              const isActive = pathname === item.href || (pathname !== '/admin' && pathname.startsWith(item.href) && item.href !== '/dashboard' && item.href !== '/admin');
              const isExactActive = pathname === item.href;
              const active = item.href === '/admin' ? isExactActive : isActive;

              return (
                <Link 
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    "flex items-center px-3 py-2.5 text-xs font-bold rounded-xl transition-all duration-150",
                    active 
                      ? "bg-[#eceffe] text-indigo-600 shadow-2xs font-extrabold" 
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-semibold"
                  )}
                  title={collapsed ? item.name : undefined}
                >
                  <item.icon className={clsx("h-4 w-4 shrink-0", collapsed ? "mx-auto" : "mr-3", active ? "text-indigo-600" : "text-slate-400")} />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </div>

          {/* Bottom Navigation */}
          <div className="p-3 border-t border-slate-100 shrink-0 space-y-1">
            <Link 
              href="/admin/settings" 
              className="flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400 shrink-0" />
              {!collapsed && <span>Settings</span>}
            </Link>
            <Link 
              href="/admin/help" 
              className="flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
              {!collapsed && <span>Help</span>}
            </Link>
            <button 
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-3 py-2 text-xs font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-slate-400 shrink-0" />
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          {/* Topbar matching MasterIELTS AI production layout */}
          <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-[#f4f5fa] shrink-0 z-30 pt-3">
            <div className="flex items-center flex-1">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-600 hover:text-slate-900 mr-4"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <div className="hidden sm:flex max-w-md w-full relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-4 py-2 bg-white border border-[#e8ecf4] rounded-full text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-2xs transition-all font-medium"
                  placeholder="Search administration modules, candidates, branches..."
                />
              </div>
            </div>

            {/* Right Topbar Stats & Actions */}
            <div className="flex items-center gap-3">
              {/* Campus Branch Badge */}
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-2xs text-xs font-bold text-slate-700">
                <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                <span className="truncate max-w-[180px]">{userSession?.branch || 'Central Headquarters'}</span>
              </div>

              {/* Supabase Live DB Badge */}
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-2xs text-xs font-bold text-slate-700">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>Supabase Live</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Notification Bell */}
              <button className="relative p-2 text-slate-500 hover:text-slate-900 transition-colors rounded-full bg-white border border-slate-200/80 shadow-2xs cursor-pointer">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-600" />
              </button>
              
              {/* User Profile Avatar with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 pr-2.5 rounded-full bg-white border border-slate-200/80 hover:border-indigo-300 shadow-2xs cursor-pointer transition-all"
                >
                  <div className="h-7 w-7 rounded-full bg-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-sm">
                    {userSession?.name ? userSession.name.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <AnimatePresence>
                  {profileDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setProfileDropdownOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 z-50 text-slate-900 space-y-2"
                      >
                        <div className="px-3 py-2 border-b border-slate-100">
                          <p className="text-xs font-black text-slate-900 truncate">{userSession?.name || 'Administrator'}</p>
                          <p className="text-[11px] text-slate-500 font-medium truncate">{userSession?.email || 'admin@ielts.ai'}</p>
                          <span className="inline-block text-[9px] uppercase font-bold tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md mt-1.5">
                            {userSession?.role === 'super_admin' ? 'Super Admin' : 'Branch Admin'}
                          </span>
                        </div>

                        <div className="space-y-0.5">
                          <Link
                            href="/admin"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors"
                          >
                            <Shield className="w-3.5 h-3.5 text-indigo-600" /> Command Center
                          </Link>
                          <Link
                            href="/dashboard"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5 text-emerald-600" /> Candidate Practice View
                          </Link>
                          <Link
                            href="/admin/settings"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                          >
                            <Settings className="w-3.5 h-3.5 text-slate-400" /> System Settings
                          </Link>
                          <Link
                            href="/admin/help"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                          >
                            <HelpCircle className="w-3.5 h-3.5 text-slate-400" /> Documentation & Help
                          </Link>
                        </div>

                        <div className="pt-2 border-t border-slate-100">
                          <button
                            onClick={() => {
                              setProfileDropdownOpen(false);
                              handleLogout();
                            }}
                            className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                          >
                            <LogOut className="w-3.5 h-3.5" /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>

          {/* Page Content Container */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative">
            <div className="relative z-10 max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        `}} />
      </div>
    </div>
  );
}
