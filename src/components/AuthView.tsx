"use client";

import React, { useState } from "react";
import { UserRole, UserSession } from "../types/auth";

interface AuthViewProps {
  onLoginSuccess: (session: UserSession) => void;
}

export default function AuthView({ onLoginSuccess }: AuthViewProps) {
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branchName, setBranchName] = useState("Kathmandu Campus");
  const [targetScore, setTargetScore] = useState(79);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const session: UserSession = {
      id: `user_${Date.now()}`,
      name: name || (selectedRole === "student" ? "Subash Bhandari" : selectedRole === "branch_admin" ? "Branch Director" : "Super Admin"),
      email: email || `${selectedRole}@pteai.com`,
      role: selectedRole,
      branchName: selectedRole === "student" || selectedRole === "branch_admin" ? branchName : "Global Platform",
      targetScore: selectedRole === "student" ? targetScore : undefined,
      xp: selectedRole === "student" ? 1140 : undefined,
      level: selectedRole === "student" ? 3 : undefined,
    };
    onLoginSuccess(session);
  };

  const handleDemoLogin = (role: UserRole) => {
    let session: UserSession;

    if (role === "student") {
      session = {
        id: "usr_student_subash",
        name: "Subash Bhandari",
        email: "subash@pteai.com",
        role: "student",
        branchName: "Kathmandu Campus",
        targetScore: 79,
        xp: 1140,
        level: 3,
      };
    } else if (role === "branch_admin") {
      session = {
        id: "usr_branch_ktm",
        name: "Ramesh Sharma (Branch Director)",
        email: "ktm.admin@pteai.com",
        role: "branch_admin",
        branchName: "Kathmandu Main Campus",
      };
    } else {
      session = {
        id: "usr_super_admin",
        name: "Master AI Admin",
        email: "admin@pteai.com",
        role: "super_admin",
        branchName: "Global HQ",
      };
    }

    onLoginSuccess(session);
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4 md:p-8 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      {/* Main Glassmorphic Card Container */}
      <div className="relative z-10 w-full max-w-5xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Hero Panel (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
          <div>
            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-extrabold text-xl shadow-lg border border-indigo-400/30">
                M
              </div>
              <div className="flex items-center gap-1 text-2xl font-extrabold tracking-tight">
                <span className="text-white">PTE</span>
                <span className="text-indigo-400">AI</span>
              </div>
            </div>

            <div className="mt-8">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                Next-Gen PTE Exam Platform
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-3 leading-tight">
                Master PTE Academic with Real-Time Gemini AI
              </h1>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed font-medium">
                Official 2-Hour Exam Simulators, 1,000+ Databank Items, 90-Band Templates, and Multi-Branch Management System.
              </p>
            </div>

            {/* Platform Highlights */}
            <div className="mt-8 space-y-3 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-3 p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                <span className="text-base">🎯</span>
                <span><strong>1,000+ Question Databank</strong> (50+ items per type)</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                <span className="text-base">📄</span>
                <span><strong>30 Full Mock Exams</strong> with 10-90 GSE Scorecards</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                <span className="text-base">🏢</span>
                <span><strong>Multi-Branch Admin & Student Portals</strong></span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Powered by Gemini 2.5 Flash</span>
            <span className="text-emerald-400 font-bold">● v2.5 Active</span>
          </div>
        </div>

        {/* Right Form & Demo Login Panel (7 cols) */}
        <div className="lg:col-span-7 p-6 md:p-10 flex flex-col justify-between bg-slate-900/60">
          <div>
            {/* Role Selection Tabs */}
            <div className="mb-6">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Select Portal Access Role:
              </label>
              <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedRole("student")}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    selectedRole === "student"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span>🎓</span>
                  <span>Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole("branch_admin")}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    selectedRole === "branch_admin"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span>🏢</span>
                  <span>Branch Admin</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole("super_admin")}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    selectedRole === "super_admin"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span>👑</span>
                  <span>Super Admin</span>
                </button>
              </div>
            </div>

            {/* Quick Demo 1-Click Login Section */}
            <div className="mb-6 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-2">
                ⚡ Quick Demo 1-Click Login:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoLogin("student")}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-indigo-600/90 text-white text-xs font-bold border border-slate-700 hover:border-indigo-500 transition-all text-left flex items-center justify-between"
                >
                  <span>🎓 Student Portal</span>
                  <span className="text-[10px] text-slate-400">Subash</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin("branch_admin")}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-indigo-600/90 text-white text-xs font-bold border border-slate-700 hover:border-indigo-500 transition-all text-left flex items-center justify-between"
                >
                  <span>🏢 Branch Admin</span>
                  <span className="text-[10px] text-slate-400">KTM Center</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin("super_admin")}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-indigo-600/90 text-white text-xs font-bold border border-slate-700 hover:border-indigo-500 transition-all text-left flex items-center justify-between"
                >
                  <span>👑 Super Admin</span>
                  <span className="text-[10px] text-slate-400">Master AI</span>
                </button>
              </div>
            </div>

            {/* Form Mode Header */}
            <div className="flex items-center justify-between mb-4 border-t border-slate-800/80 pt-4">
              <h2 className="text-lg font-bold text-white">
                {authMode === "login"
                  ? `Sign In to ${selectedRole === "student" ? "Student" : selectedRole === "branch_admin" ? "Branch Admin" : "Super Admin"} Portal`
                  : `Create ${selectedRole === "student" ? "Student Account" : "Branch Registration"}`}
              </h2>
              <div className="flex items-center gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => setAuthMode("login")}
                  className={`px-3 py-1 rounded-lg font-bold ${
                    authMode === "login" ? "text-indigo-400 bg-indigo-500/10" : "text-slate-500"
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode("signup")}
                  className={`px-3 py-1 rounded-lg font-bold ${
                    authMode === "signup" ? "text-indigo-400 bg-indigo-500/10" : "text-slate-500"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Authentication Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {authMode === "signup" && (
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name..."
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={selectedRole === "student" ? "subash@pteai.com" : `${selectedRole}@pteai.com`}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {selectedRole === "student" && authMode === "signup" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">Target GSE Score</label>
                    <select
                      value={targetScore}
                      onChange={(e) => setTargetScore(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value={50}>50 GSE (Visa/Vocational)</option>
                      <option value={65}>65 GSE (7 Band Equivalent)</option>
                      <option value={79}>79 GSE (8 Band / PR Target)</option>
                      <option value={90}>90 GSE (Perfect Band 9)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">Branch Center</label>
                    <select
                      value={branchName}
                      onChange={(e) => setBranchName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Kathmandu Main Campus">Kathmandu Main Campus</option>
                      <option value="Sydney Central Institute">Sydney Central Institute</option>
                      <option value="Melbourne Campus">Melbourne Campus</option>
                      <option value="Online Virtual Center">Online Virtual Center</option>
                    </select>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all active:scale-98 mt-2"
              >
                {authMode === "login" ? `Enter ${selectedRole.replace("_", " ").toUpperCase()} Portal →` : "Complete Registration →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
