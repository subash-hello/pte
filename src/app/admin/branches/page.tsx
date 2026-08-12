'use client';

import React, { useState } from 'react';
import { 
  GitBranch, 
  Plus, 
  Users, 
  UserCheck, 
  Activity, 
  TrendingUp, 
  Pencil, 
  Trash2, 
  X, 
  Eye, 
  MapPin, 
  Building2 
} from 'lucide-react';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

const mockBranches = [
  { id: '1', name: 'Kathmandu Central', admin: 'Rajesh Hamal', adminEmail: 'rajesh@pteai.com', totalUsers: 45, activeUsers: 12, premiumUsers: 28, createdAt: 'Jul 15, 2026', status: 'Active', avatar: 'R', avatarColor: 'from-indigo-400 to-violet-600' },
  { id: '2', name: 'Lalitpur Branch', admin: 'Sita Sharma', adminEmail: 'sita@pteai.com', totalUsers: 32, activeUsers: 8, premiumUsers: 19, createdAt: 'Jul 20, 2026', status: 'Active', avatar: 'S', avatarColor: 'from-emerald-400 to-teal-600' },
  { id: '3', name: 'Pokhara Center', admin: 'Bikram Thapa', adminEmail: 'bikram@pteai.com', totalUsers: 28, activeUsers: 6, premiumUsers: 15, createdAt: 'Aug 01, 2026', status: 'Active', avatar: 'B', avatarColor: 'from-amber-400 to-orange-600' },
  { id: '4', name: 'Chitwan Hub', admin: 'Anita Gurung', adminEmail: 'anita@pteai.com', totalUsers: 16, activeUsers: 3, premiumUsers: 8, createdAt: 'Aug 05, 2026', status: 'Pending', avatar: 'A', avatarColor: 'from-pink-400 to-rose-600' },
];

export default function BranchesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    branchName: '',
    adminName: '',
    adminEmail: '',
    adminPhone: '',
    password: '',
    location: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900 flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-indigo-600" />
            Branch Management
          </h1>
          <p className="text-slate-500 mt-1">Create, manage, and monitor branch offices and their administrators</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-indigo-700 active:scale-[0.98] shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Create New Branch
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {[
          { label: 'Total Branches', value: '4', icon: Building2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Total Branch Users', value: '121', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Active Branch Admins', value: '3', icon: UserCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Avg Users per Branch', value: '30', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl border border-[#e8ecf4] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={clsx("flex h-12 w-12 items-center justify-center rounded-xl", stat.bg, stat.color)}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Branch Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockBranches.map(branch => (
          <div key={branch.id} className="rounded-2xl border border-[#e8ecf4] bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{branch.name}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="h-3.5 w-3.5" />
                  Created {branch.createdAt}
                </div>
              </div>
              <span className={clsx(
                "px-2.5 py-1 text-xs font-medium rounded-full",
                branch.status === 'Active' ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-amber-50 text-amber-600 border border-amber-200"
              )}>
                {branch.status}
              </span>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl mb-6 border border-slate-100">
              <div className={clsx("flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-white font-bold text-lg shadow-sm", branch.avatarColor)}>
                {branch.avatar}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">{branch.admin}</p>
                <p className="text-xs text-slate-500">{branch.adminEmail}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1"><Users className="h-3.5 w-3.5"/> Total</p>
                <p className="text-lg font-semibold text-slate-900">{branch.totalUsers}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1"><Activity className="h-3.5 w-3.5"/> Active</p>
                <p className="text-lg font-semibold text-slate-900">{branch.activeUsers}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5"/> Premium</p>
                <p className="text-lg font-semibold text-slate-900">{branch.premiumUsers}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-slate-100">
              <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 border border-slate-200">
                <Eye className="h-4 w-4" />
                View Users
              </button>
              <button className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors border border-transparent hover:border-indigo-100">
                <Pencil className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors border border-transparent hover:border-rose-100">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Branch Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-[#e8ecf4] px-6 py-4">
                <h2 className="text-xl font-bold text-slate-900">Create New Branch</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Branch Name</label>
                    <input
                      type="text"
                      name="branchName"
                      value={formData.branchName}
                      onChange={handleInputChange}
                      placeholder="e.g. Kathmandu Central"
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g. Kathmandu, Nepal"
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                    />
                  </div>
                  
                  <div className="pt-4 pb-2 border-b border-slate-100">
                    <h3 className="text-sm font-semibold text-slate-900">Branch Admin Details</h3>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Admin Full Name</label>
                    <input
                      type="text"
                      name="adminName"
                      value={formData.adminName}
                      onChange={handleInputChange}
                      placeholder="e.g. Rajesh Hamal"
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Admin Email</label>
                      <input
                        type="email"
                        name="adminEmail"
                        value={formData.adminEmail}
                        onChange={handleInputChange}
                        placeholder="rajesh@pteai.com"
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Admin Phone</label>
                      <input
                        type="text"
                        name="adminPhone"
                        value={formData.adminPhone}
                        onChange={handleInputChange}
                        placeholder="+977 98..."
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Set Admin Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-[#e8ecf4] bg-slate-50 px-6 py-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 shadow-sm"
                >
                  Create Branch
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
