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
  Building2,
  Phone,
  Mail,
  Sparkles
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
    totalUsers: 68, 
    activeUsers: 24, 
    premiumUsers: 52, 
    studentCapacity: 150,
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
    totalUsers: 45, 
    activeUsers: 16, 
    premiumUsers: 34, 
    studentCapacity: 100,
    createdAt: 'Jul 20, 2026', 
    status: 'Active', 
    avatar: 'S', 
    avatarColor: 'from-purple-500 to-indigo-600' 
  },
  { 
    id: '3', 
    name: 'Lalitpur Tech Branch', 
    location: 'Kumaripati, Lalitpur',
    admin: 'Nabin Silwal', 
    adminEmail: 'lalitpur.admin@pteai.com', 
    adminPhone: '+977 9855022334',
    totalUsers: 38, 
    activeUsers: 14, 
    premiumUsers: 28, 
    studentCapacity: 80,
    createdAt: 'Aug 01, 2026', 
    status: 'Active', 
    avatar: 'N', 
    avatarColor: 'from-emerald-500 to-teal-700' 
  },
  { 
    id: '4', 
    name: 'Chitwan Academic Centre', 
    location: 'Lions Chowk, Bharatpur',
    admin: 'Anuraj Phuyal', 
    adminEmail: 'chitwan.admin@pteai.com', 
    adminPhone: '+977 9845012345',
    totalUsers: 29, 
    activeUsers: 10, 
    premiumUsers: 20, 
    studentCapacity: 60,
    createdAt: 'Aug 10, 2026', 
    status: 'Active', 
    avatar: 'A', 
    avatarColor: 'from-amber-500 to-orange-700' 
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
      studentCapacity: 100,
      createdAt: 'Just now',
      status: 'Active',
      avatar: formData.adminName.charAt(0).toUpperCase(),
      avatarColor: 'from-indigo-500 to-purple-700'
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

  const totalRegistered = branches.reduce((acc, b) => acc + b.totalUsers, 0);
  const totalActive = branches.reduce((acc, b) => acc + b.activeUsers, 0);
  const totalCapacity = branches.reduce((acc, b) => acc + b.studentCapacity, 0);

  return (
    <div className="space-y-6 pb-20 text-slate-900 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-satoshi flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <Building2 className="w-5 h-5" />
            </div>
            Institution Branch Management
          </h1>
          <p className="text-slate-500 text-xs font-semibold mt-1">
            Manage multi-tenant PTE preparation campuses, branch directors, student quotas, and authorizations.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-md transition-all self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Branch</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-[#e8ecf4] shadow-2xs">
          <span className="text-xs font-bold text-slate-500">Active Campuses</span>
          <h3 className="text-2xl font-black text-slate-900 mt-2">{branches.length} Institutional Branches</h3>
          <p className="text-[11px] font-bold text-emerald-600 mt-1">100% Operational Status</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#e8ecf4] shadow-2xs">
          <span className="text-xs font-bold text-slate-500">Total Enrolled Students</span>
          <h3 className="text-2xl font-black text-slate-900 mt-2">{totalRegistered} Candidates</h3>
          <p className="text-[11px] font-bold text-indigo-600 mt-1">Across all 4 regional campuses</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#e8ecf4] shadow-2xs">
          <span className="text-xs font-bold text-slate-500">Seat Capacity Utilization</span>
          <h3 className="text-2xl font-black text-slate-900 mt-2">{Math.round((totalRegistered / totalCapacity) * 100)}% Used</h3>
          <p className="text-[11px] font-bold text-slate-500 mt-1">{totalRegistered} / {totalCapacity} Total Seats Allocated</p>
        </div>
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branches.map(branch => (
          <div key={branch.id} className="bg-white rounded-2xl p-6 border border-[#e8ecf4] shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${branch.avatarColor} flex items-center justify-center text-white font-extrabold text-base shadow-sm`}>
                    {branch.avatar}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{branch.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {branch.location}
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {branch.status}
                </span>
              </div>

              {/* Branch Admin Contact Details */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 mb-4 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-700">
                  <span className="font-bold">Branch Director:</span>
                  <span className="font-extrabold text-slate-900">{branch.admin}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1 font-medium"><Mail className="w-3 h-3 text-slate-400" /> Email:</span>
                  <span className="font-mono text-[11px]">{branch.adminEmail}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1 font-medium"><Phone className="w-3 h-3 text-slate-400" /> WhatsApp:</span>
                  <span className="font-mono text-[11px]">{branch.adminPhone}</span>
                </div>
              </div>

              {/* Student & Session Metrics */}
              <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-100 mb-4">
                <div className="bg-indigo-50/60 p-2.5 rounded-xl border border-indigo-100">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Enrolled</span>
                  <span className="text-lg font-black text-indigo-700">{branch.totalUsers}</span>
                </div>
                <div className="bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Active Today</span>
                  <span className="text-lg font-black text-emerald-700">{branch.activeUsers}</span>
                </div>
                <div className="bg-purple-50/60 p-2.5 rounded-xl border border-purple-100">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Pro Licenses</span>
                  <span className="text-lg font-black text-purple-700">{branch.premiumUsers}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">Joined {branch.createdAt}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Opening student directory filtered for ${branch.name}...`)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  View Students →
                </button>
                <button
                  onClick={() => handleDeleteBranch(branch.id)}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Delete Branch"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Branch Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg p-6 bg-white rounded-3xl border border-slate-200 shadow-2xl z-10"
            >
              <div className="flex justify-between items-center pb-4 border-b border-slate-200 mb-4">
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-indigo-600" />
                  Add Institutional Branch Campus
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-slate-100 rounded-lg">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleCreateBranch} className="space-y-4 text-xs font-bold">
                <div>
                  <label className="block text-slate-600 mb-1">Campus Name</label>
                  <input
                    type="text"
                    name="branchName"
                    value={formData.branchName}
                    onChange={handleInputChange}
                    placeholder="e.g. Butwal Learning Hub"
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">Location / Address</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Traffic Chowk, Butwal"
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1">Director Name</label>
                    <input
                      type="text"
                      name="adminName"
                      value={formData.adminName}
                      onChange={handleInputChange}
                      placeholder="e.g. Anish Karki"
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Director Phone / WhatsApp</label>
                    <input
                      type="text"
                      name="adminPhone"
                      value={formData.adminPhone}
                      onChange={handleInputChange}
                      placeholder="+977 9800000000"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">Director Login Email</label>
                  <input
                    type="email"
                    name="adminEmail"
                    value={formData.adminEmail}
                    onChange={handleInputChange}
                    placeholder="director@pteai.com"
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold shadow-md transition-all cursor-pointer"
                  >
                    Create Branch Campus
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
