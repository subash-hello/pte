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

const initialBranches = [
  { 
    id: '1', 
    name: 'Kathmandu Central Campus', 
    location: 'Putalisadak, Kathmandu',
    admin: 'Ramesh Sharma', 
    adminEmail: 'ktm.admin@pteai.com', 
    adminPhone: '+977 9851012345',
    totalUsers: 2, 
    activeUsers: 2, 
    premiumUsers: 2, 
    createdAt: 'Jul 15, 2026', 
    status: 'Active', 
    avatar: 'R', 
    avatarColor: 'from-indigo-500 to-indigo-700' 
  },
  { 
    id: '2', 
    name: 'Pokhara Regional Campus', 
    location: 'Chipledhunga, Pokhara',
    admin: 'Sita Sharma', 
    adminEmail: 'pokhara.admin@pteai.com', 
    adminPhone: '+977 9856023456',
    totalUsers: 2, 
    activeUsers: 1, 
    premiumUsers: 2, 
    createdAt: 'Jul 20, 2026', 
    status: 'Active', 
    avatar: 'S', 
    avatarColor: 'from-purple-500 to-indigo-600' 
  },
];

export default function BranchesPage() {
  const [branches, setBranches] = useState(initialBranches);
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

  const handleCreateBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.branchName || !formData.adminName) return;
    const newB = {
      id: `${Date.now()}`,
      name: formData.branchName,
      location: formData.location || 'Nepal',
      admin: formData.adminName,
      adminEmail: formData.adminEmail || 'admin@pteai.com',
      adminPhone: formData.adminPhone || '+977 9800000000',
      totalUsers: 0,
      activeUsers: 0,
      premiumUsers: 0,
      createdAt: 'Just now',
      status: 'Active',
      avatar: formData.adminName.charAt(0).toUpperCase(),
      avatarColor: 'from-emerald-500 to-teal-700'
    };
    setBranches([...branches, newB]);
    setIsModalOpen(false);
    setFormData({ branchName: '', adminName: '', adminEmail: '', adminPhone: '', password: '', location: '' });
  };

  const handleDeleteBranch = (id: string) => {
    if (confirm('Delete this branch campus?')) {
      setBranches(branches.filter(b => b.id !== id));
    }
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
          { label: 'Total Branches', value: `${branches.length}`, icon: Building2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Total Students', value: '4', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Active Branch Admins', value: `${branches.length}`, icon: UserCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Avg Students / Branch', value: '2', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
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
        {branches.map(branch => (
          <div key={branch.id} className="rounded-2xl border border-[#e8ecf4] bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{branch.name}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="h-3.5 w-3.5" />
                  {branch.location} • Created {branch.createdAt}
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
                <p className="text-xs text-slate-500">{branch.adminEmail} • {branch.adminPhone}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1"><Users className="h-3.5 w-3.5"/> Students</p>
                <p className="text-lg font-semibold text-slate-900">{branch.totalUsers}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1"><Activity className="h-3.5 w-3.5"/> Active</p>
                <p className="text-lg font-semibold text-slate-900">{branch.activeUsers}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5"/> Pro / Prem</p>
                <p className="text-lg font-semibold text-slate-900">{branch.premiumUsers}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-slate-100">
              <a href="/admin/users" className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 border border-slate-200">
                <Eye className="h-4 w-4" />
                View Students
              </a>
              <button onClick={() => handleDeleteBranch(branch.id)} className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors border border-transparent hover:border-rose-100">
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

              <form onSubmit={handleCreateBranch}>
                <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Branch Name</label>
                      <input
                        type="text"
                        name="branchName"
                        value={formData.branchName}
                        onChange={handleInputChange}
                        placeholder="e.g. Kathmandu Central Campus"
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g. Putalisadak, Kathmandu"
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                        required
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
                        placeholder="e.g. Ramesh Sharma"
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                        required
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
                          placeholder="admin@pteai.com"
                          className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                          required
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
                          required
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
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 shadow-sm"
                  >
                    Create Branch
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
