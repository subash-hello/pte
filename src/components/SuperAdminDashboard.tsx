"use client";

import React, { useState } from "react";
import { UserSession } from "../types/auth";

interface SuperAdminDashboardProps {
  session: UserSession;
  onLogout: () => void;
}

export default function SuperAdminDashboard({ session, onLogout }: SuperAdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"branches" | "ai_analytics" | "databank" | "settings">("branches");

  const globalBranches = [
    { id: "br_01", name: "Kathmandu Main Campus", director: "Ramesh Sharma", students: 142, revenue: "$6,400/mo", status: "Active" },
    { id: "br_02", name: "Sydney Central Institute", director: "David Miller", students: 215, revenue: "$12,800/mo", status: "Active" },
    { id: "br_03", name: "Melbourne CBD Campus", director: "Sarah Jenkins", students: 180, revenue: "$9,500/mo", status: "Active" },
    { id: "br_04", name: "Toronto Global Center", director: "Michael Chen", students: 120, revenue: "$5,200/mo", status: "Active" },
    { id: "br_05", name: "Dubai International Center", director: "Tariq Al-Mansoor", students: 95, revenue: "$4,800/mo", status: "Active" },
    { id: "br_06", name: "London Kensington Campus", director: "Emma Watson", students: 110, revenue: "$5,500/mo", status: "Active" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-extrabold text-white text-base shadow-md">
            👑
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white">Super Admin Master Portal</h1>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Global Control Center
              </span>
            </div>
            <p className="text-xs text-slate-400">Master AI Platform Director: {session.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
            <span className="text-emerald-400 font-bold">● System Health: 100%</span>
            <span className="text-slate-400">• 28 Global Branches</span>
          </div>
          <button
            onClick={onLogout}
            className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="p-6 md:p-8 flex-1 max-w-7xl mx-auto w-full space-y-6">
        {/* Global Platform KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Global Monthly Revenue</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-white font-mono">$54,200</span>
              <span className="text-xs text-emerald-400 font-bold">+18.4% MoM</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Total Platform Candidates</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-indigo-400 font-mono">4,820</span>
              <span className="text-xs text-slate-400">28 Franchises</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">AI API Token Processed</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-purple-400 font-mono">18.4M</span>
              <span className="text-xs text-purple-300">Gemini 2.5 Flash</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Databank Size</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-emerald-400 font-mono">1,000+</span>
              <span className="text-xs text-slate-400">20 Item Types</span>
            </div>
          </div>
        </div>

        {/* Tab Selection Row */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab("branches")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "branches" ? "bg-indigo-600 text-white shadow-xs" : "bg-slate-900 border border-slate-800 text-slate-400"
            }`}
          >
            🌐 Global Franchise Branches Directory (28)
          </button>

          <button
            onClick={() => setActiveTab("ai_analytics")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "ai_analytics" ? "bg-indigo-600 text-white shadow-xs" : "bg-slate-900 border border-slate-800 text-slate-400"
            }`}
          >
            🤖 Gemini AI Engine & Database Metrics
          </button>
        </div>

        {/* TAB 1: GLOBAL BRANCHES */}
        {activeTab === "branches" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Global Franchise Branch Network</h2>
              <button className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-xs">
                + Register New Franchise Branch
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Branch ID</th>
                    <th className="p-3">Campus / Center Name</th>
                    <th className="p-3">Branch Director</th>
                    <th className="p-3">Enrolled Candidates</th>
                    <th className="p-3">Monthly Revenue</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {globalBranches.map((br) => (
                    <tr key={br.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 font-mono font-bold text-indigo-400">#{br.id}</td>
                      <td className="p-3 font-bold text-white">{br.name}</td>
                      <td className="p-3 font-medium text-slate-300">{br.director}</td>
                      <td className="p-3 font-mono font-bold text-slate-200">{br.students} Students</td>
                      <td className="p-3 font-mono font-bold text-emerald-400">{br.revenue}</td>
                      <td className="p-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold">
                          {br.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: AI METRICS */}
        {activeTab === "ai_analytics" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Google Gemini 2.5 Flash Infrastructure</h2>
              <p className="text-xs text-slate-400 mt-1">Real-time AI speech recognition, essay scoring, and AI Tutor server metrics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Model Endpoint</span>
                <span className="text-sm font-extrabold font-mono text-purple-400 mt-1 block">gemini-2.5-flash</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Average API Latency</span>
                <span className="text-sm font-extrabold font-mono text-emerald-400 mt-1 block">340 ms</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">MongoDB Atlas Pool</span>
                <span className="text-sm font-extrabold font-mono text-indigo-400 mt-1 block">pte_academic Cluster Active</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
