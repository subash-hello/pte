'use client';

import React, { useState } from 'react';
import { Search, Filter, PhoneCall, TrendingUp, Pencil, Trash2, X, Plus, Check, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const mockUsers = [
  { id: '1', name: 'Nepali Boy Sandip Shrestha', email: 'nsandipshrestha08@gmail.com', phone: '9808110005', source: 'FACEBOOK ADS', role: 'Student', tier: 'Pro', status: 'Approved', band: 7, xp: 325, date: 'Aug 11, 2026', avatar: 'N', avatarColor: 'from-cyan-400 to-blue-600', lastActive: '12h ago', expiresIn: '78 (74d)' },
  { id: '2', name: 'Ramesh Pariyar', email: 'pariyarramesh403@gmail.com', phone: '', source: '', role: 'Student', tier: 'Free', status: 'Pending', band: 7, xp: 0, date: 'Aug 11, 2026', avatar: 'R', avatarColor: 'from-purple-400 to-pink-600', lastActive: '2d ago', expiresIn: '' },
  { id: '3', name: 'Lal Bahadur Lohar', email: 'chhetlebahadurlohar@gmail.com', phone: '+9779817454543', source: 'FACEBOOK ADS', role: 'Student', tier: 'Free', status: 'Pending', band: 7.5, xp: 90, date: 'Aug 11, 2026', avatar: 'L', avatarColor: 'from-yellow-400 to-orange-600', lastActive: '5h ago', expiresIn: '' },
  { id: '4', name: 'Sarvagya Budhathoki', email: 'sarvagya5039@gmail.com', phone: '+9779849843505', source: 'FACEBOOK ADS', role: 'Student', tier: 'Pro', status: 'Approved', band: 7, xp: 115, date: 'Aug 10, 2026', avatar: 'S', avatarColor: 'from-emerald-400 to-teal-600', lastActive: 'Aug 10', expiresIn: '37d (33d)' },
  { id: '5', name: 'Raksha Khadka', email: 'rakshakhadka58@gmail.com', phone: '', source: '', role: 'Student', tier: 'Pro', status: 'Approved', band: 7, xp: 0, date: 'Aug 10, 2026', avatar: 'R', avatarColor: 'from-red-400 to-rose-600', lastActive: 'Aug 10', expiresIn: '30d (26d)' },
  { id: '6', name: 'Chhabi Acharya', email: 'achhrxn@gmail.com', phone: '', source: 'HIRE LALITPUR', role: 'Student', tier: 'Pro', status: 'Approved', band: 7, xp: 0, date: 'Aug 10, 2026', avatar: 'C', avatarColor: 'from-sky-400 to-cyan-600', lastActive: 'Aug 10', expiresIn: '30d (26d)' },
  { id: '7', name: 'Anlesh Chaudhary', email: 'cpranlesh@gmail.com', phone: '9817366244', source: '', role: 'Student', tier: 'Free', status: 'Pending', band: 7, xp: 0, date: 'Aug 10, 2026', avatar: 'A', avatarColor: 'from-indigo-400 to-violet-600', lastActive: 'Aug 10', expiresIn: '' },
  { id: '8', name: 'Sagar Timilsina', email: 'timilsinasagar03@gmail.com', phone: '9819113548', source: 'FACEBOOK ADS', role: 'Student', tier: 'Pro', status: 'Approved', band: 7, xp: 740, date: 'Aug 10, 2026', avatar: 'S', avatarColor: 'from-amber-400 to-yellow-600', lastActive: '13h ago', expiresIn: '64 (74d)' },
];

type User = typeof mockUsers[0];

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setTimeout(() => setSelectedUser(null), 200);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-8 font-sans">
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">User Directory</h1>
          <p className="text-slate-500 mt-1">Manage all registered users, roles, and permissions</p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#e8ecf4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 text-slate-900"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e8ecf4] rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
              Role
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e8ecf4] rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
              Status
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e8ecf4] rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
              Tier
            </button>
          </div>
        </div>

        {/* User List */}
        <div className="space-y-4">
          {mockUsers.map((user) => (
            <div key={user.id} className="bg-white border border-[#e8ecf4] rounded-2xl p-5 flex items-center justify-between gap-6 hover:shadow-sm transition-shadow">
              
              <div className="flex items-center gap-4 flex-1">
                <div className={clsx("w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold text-lg shrink-0", user.avatarColor)}>
                  {user.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900">{user.name}</h3>
                    {user.source && (
                      <span className={clsx("text-[10px] font-bold px-2 py-0.5 rounded-md", 
                        user.source === 'FACEBOOK ADS' ? 'bg-emerald-100 text-emerald-700' : 'bg-cyan-100 text-cyan-700'
                      )}>
                        {user.source}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">{user.email}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Active {user.lastActive}</p>
                </div>
              </div>

              <div className="w-40 flex-shrink-0 flex items-center">
                {user.phone ? (
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors text-sm font-medium">
                    <PhoneCall className="w-3.5 h-3.5" />
                    {user.phone}
                  </button>
                ) : (
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors text-sm font-medium border-dashed">
                    <Plus className="w-3.5 h-3.5" />
                    Add Phone
                  </button>
                )}
              </div>

              <div className="w-24 flex-shrink-0">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-teal-50 text-teal-700">
                  {user.role}
                </span>
              </div>

              <div className="w-20 flex-shrink-0">
                <span className={clsx("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium", 
                  user.tier === 'Pro' ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-600'
                )}>
                  {user.tier}
                </span>
              </div>

              <div className="w-32 flex-shrink-0 flex flex-col items-start gap-1">
                <span className={clsx("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border", 
                  user.status === 'Approved' ? 'border-emerald-200 text-emerald-700 bg-emerald-50/50' : 'border-amber-200 text-amber-700 bg-amber-50/50'
                )}>
                  {user.status}
                </span>
                {user.expiresIn && <span className="text-xs text-slate-500 px-1">{user.expiresIn}</span>}
              </div>

              <div className="w-16 flex-shrink-0 text-center">
                <div className="text-sm font-bold text-slate-700">{user.band}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Band</div>
              </div>

              <div className="w-20 flex-shrink-0 text-center">
                <div className="text-sm font-bold text-indigo-600">{user.xp}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">XP</div>
              </div>

              <div className="w-28 flex-shrink-0">
                <div className="text-sm text-slate-600">{user.date}</div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Progress">
                  <TrendingUp className="w-4 h-4" />
                </button>
                <button onClick={() => handleEditClick(user)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit User">
                  <Pencil className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete User">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isEditModalOpen && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={closeEditModal}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[24px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-[#e8ecf4] flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                    <Pencil className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 font-display">Edit User Profile</h2>
                    <p className="text-sm text-slate-500 mt-0.5">Modify directory properties & permissions</p>
                  </div>
                </div>
                <button 
                  onClick={closeEditModal}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto font-sans">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Full Name</label>
                      <input type="text" defaultValue={selectedUser.name} className="w-full px-3.5 py-2 bg-white border border-[#e8ecf4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Email Address</label>
                      <input type="email" defaultValue={selectedUser.email} className="w-full px-3.5 py-2 bg-white border border-[#e8ecf4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Phone Number</label>
                      <input type="text" defaultValue={selectedUser.phone} className="w-full px-3.5 py-2 bg-white border border-[#e8ecf4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Reset Password (Optional)</label>
                      <input type="password" placeholder="Leave blank to keep current" className="w-full px-3.5 py-2 bg-white border border-[#e8ecf4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 placeholder:text-slate-400" />
                      <p className="text-[11px] text-slate-500 mt-1.5">Enter a new password if you want to reset the user's password.</p>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Branch Name</label>
                      <input type="text" defaultValue="" className="w-full px-3.5 py-2 bg-white border border-[#e8ecf4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Band Score</label>
                      <input type="number" defaultValue={selectedUser.band} step="0.5" className="w-full px-3.5 py-2 bg-white border border-[#e8ecf4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">System Role</label>
                      <select defaultValue={selectedUser.role} className="w-full px-3.5 py-2 bg-white border border-[#e8ecf4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 appearance-none">
                        <option>Student</option>
                        <option>Teacher</option>
                        <option>Admin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Subscription Tier</label>
                      <select defaultValue={selectedUser.tier} className="w-full px-3.5 py-2 bg-white border border-[#e8ecf4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 appearance-none">
                        <option>Free</option>
                        <option>Pro</option>
                        <option>Ultimate</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">PTE Goal Score</label>
                      <select defaultValue="Score 65" className="w-full px-3.5 py-2 bg-white border border-[#e8ecf4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 appearance-none">
                        <option>Score 50</option>
                        <option>Score 60</option>
                        <option>Score 65</option>
                        <option>Score 70</option>
                        <option>Score 75</option>
                        <option>Score 79+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Approval Status</label>
                      <select defaultValue={selectedUser.status} className="w-full px-3.5 py-2 bg-white border border-[#e8ecf4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 appearance-none">
                        <option>Approved</option>
                        <option>Pending</option>
                        <option>Rejected</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Target Exam Track</label>
                      <select defaultValue="PTE Academic" className="w-full px-3.5 py-2 bg-white border border-[#e8ecf4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 appearance-none">
                        <option>PTE Academic</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#e8ecf4]">
                  <label className="block text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">Access Validity Duration</label>
                  <div className="flex flex-wrap gap-2">
                    {['15 Days', '30 Days', '60 Days', '90 Days', '1 Year (365d)', 'Lifetime (3650d)'].map(duration => (
                      <button key={duration} className="px-4 py-2 border border-[#e8ecf4] rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors">
                        {duration}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-5 h-5 mt-0.5">
                      <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-[#e8ecf4] rounded bg-white checked:bg-indigo-600 checked:border-indigo-600 transition-all" />
                      <Check className="w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-900 block">Reset Start Date from Today</span>
                      <span className="text-xs text-slate-500 mt-0.5 block">Checking this will restart the user's validity period starting from today.</span>
                    </div>
                  </label>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-[#e8ecf4] flex items-center justify-end gap-3 mt-auto">
                <button 
                  onClick={closeEditModal}
                  className="px-5 py-2 bg-white border border-[#e8ecf4] rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-5 py-2 bg-indigo-600 rounded-xl text-sm font-bold text-white hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
