"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Settings, HelpCircle, LogOut } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  onSelectSection?: (section: any) => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  userSession?: any;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  onSelectSection,
  mobileOpen = false,
  onCloseMobile,
  userSession,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const mainNavItems = [
    { id: "dashboard", label: "Dashboard", icon: "grid" },
    { id: "speaking", label: "Speaking", icon: "mic", section: "speaking" },
    { id: "writing", label: "Writing", icon: "pen", section: "writing" },
    { id: "reading", label: "Reading", icon: "book", section: "reading" },
    { id: "listening", label: "Listening", icon: "headphones", section: "listening" },
    { id: "mock", label: "Mock Tests", icon: "file-text" },
    { id: "ai_tutor", label: "AI Tutor", icon: "bot" },
    { id: "vocabulary", label: "Vocabulary", icon: "bookmark" },
    { id: "progress", label: "Progress", icon: "bar-chart" },
    { id: "templates", label: "Templates", icon: "folder" },
    { id: "notebook", label: "Notebook", icon: "notebook" },
    { id: "user_guide", label: "User Guide", icon: "help-circle" },
  ];

  const handleTabClick = (item: any) => {
    setActiveTab(item.id);
    if (item.section && onSelectSection) {
      onSelectSection(item.section);
    }
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "grid":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        );
      case "mic":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        );
      case "pen":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        );
      case "book":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case "headphones":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        );
      case "file-text":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case "bot":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case "bookmark":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        );
      case "bar-chart":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case "folder":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        );
      case "notebook":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        suppressHydrationWarning
        className={`fixed md:sticky top-0 h-screen bg-white border-r border-slate-200 flex flex-col justify-between transition-all duration-300 z-50 ${
          collapsed ? "w-20" : "w-64"
        } ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="overflow-y-auto flex-1">
          {/* Top Header Logo & Mobile Close Button */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between relative">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center font-extrabold text-white text-base shadow-sm">
                M
              </div>
              {(!collapsed || mobileOpen) && (
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-slate-900 text-lg tracking-tight">PTE</span>
                  <span className="font-extrabold text-indigo-600 text-lg">AI</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={collapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"}
                  />
                </svg>
              </button>

              {/* Close button on mobile */}
              {onCloseMobile && (
                <button
                  onClick={onCloseMobile}
                  className="md:hidden p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* User Profile Card */}
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center font-extrabold text-sm shadow-xs">
                  {userSession?.name
                    ? userSession.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()
                    : "SB"}
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
              </div>

              {(!collapsed || mobileOpen) && (
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {userSession?.name || "Subash Bhandari"}
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold truncate flex items-center gap-1 mt-0.5">
                    <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded font-bold">
                      Level {userSession?.level || 1}
                    </span>
                    <span>• {userSession?.targetScore || 79}+ GSE Target</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Nav Items List */}
          <nav className="p-3 space-y-1">
            {mainNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 border border-indigo-100/80 shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-base ${isActive ? "text-indigo-600" : "text-slate-500"}`}>
                      {renderIcon(item.icon)}
                    </span>
                    {(!collapsed || mobileOpen) && <span>{item.label}</span>}
                  </div>

                  {(!collapsed || mobileOpen) && (item as any).badge && (
                    <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
                      {(item as any).badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions Navigation (Settings, Help, Logout) */}
        <div className="p-3 border-t border-slate-100 shrink-0 space-y-1">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors"
          >
            <Settings className="w-4 h-4 text-slate-400 shrink-0" />
            {(!collapsed || mobileOpen) && <span>Settings</span>}
          </Link>
          <Link
            href="/dashboard/help"
            className="flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
            {(!collapsed || mobileOpen) && <span>Help</span>}
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4 text-slate-400 shrink-0" />
            {(!collapsed || mobileOpen) && <span>Logout</span>}
          </Link>
        </div>

        {/* Footer info */}
        {(!collapsed || mobileOpen) && (
          <div className="p-4 border-t border-slate-100 text-[10px] text-slate-400 font-medium flex items-center justify-between">
            <span>PTE Academic v2.5</span>
            <span className="text-emerald-600 font-bold">● AI Active</span>
          </div>
        )}
      </aside>
    </>
  );
}
