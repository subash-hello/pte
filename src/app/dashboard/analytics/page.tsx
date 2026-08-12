'use client';

import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { TrendingUp, Target, Award, Clock } from 'lucide-react';

export default function Analytics() {
  const trendData = [
    { name: 'Week 1', score: 55 },
    { name: 'Week 2', score: 62 },
    { name: 'Week 3', score: 68 },
    { name: 'Week 4', score: 75 },
    { name: 'Current', score: 79 },
  ];

  const skillData = [
    { name: 'Speaking', score: 82 },
    { name: 'Writing', score: 76 },
    { name: 'Reading', score: 74 },
    { name: 'Listening', score: 84 },
  ];

  const enablingData = [
    { subject: 'Grammar', A: 80, fullMark: 90 },
    { subject: 'Oral Fluency', A: 85, fullMark: 90 },
    { subject: 'Pronunciation', A: 78, fullMark: 90 },
    { subject: 'Spelling', A: 90, fullMark: 90 },
    { subject: 'Vocabulary', A: 75, fullMark: 90 },
    { subject: 'Written Discourse', A: 70, fullMark: 90 },
  ];

  return (
    <div className="space-y-6 text-slate-900">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Performance Analytics</h1>
        <p className="text-slate-500 text-sm font-medium mt-1">Track your score progression and diagnostic Enabling Skills breakdown.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Current Est. Score', value: '79', icon: Award, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Questions Practiced', value: '1,248', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Time Spent', value: '42h 15m', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Improvement', value: '+24', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-[22px] border border-[#e8ecf4] p-6 shadow-xs">
            <div className="flex justify-between items-start mb-3">
              <span className="text-slate-500 text-xs font-bold">{stat.label}</span>
              <div className={`p-2 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-4.5 h-4.5 ${stat.color}`} />
              </div>
            </div>
            <div className="text-3xl font-mono font-black text-slate-900">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overall Trend */}
        <div className="bg-white rounded-[24px] border border-[#e8ecf4] p-6 shadow-xs">
          <h2 className="text-base font-extrabold text-slate-900 mb-4">Score Progression</h2>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#cbd5e1" fontSize={11} />
                <YAxis domain={[10, 90]} stroke="#cbd5e1" fontSize={11} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a' }}
                  itemStyle={{ color: '#4f46e5', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={3} dot={{ fill: '#4f46e5', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Communicative Skills */}
        <div className="bg-white rounded-[24px] border border-[#e8ecf4] p-6 shadow-xs">
          <h2 className="text-base font-extrabold text-slate-900 mb-4">Communicative Skills</h2>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" domain={[10, 90]} stroke="#cbd5e1" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#cbd5e1" fontSize={11} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px' }} />
                <Bar dataKey="score" fill="#4f46e5" radius={[0, 6, 6, 0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Enabling Skills Radar */}
        <div className="bg-white rounded-[24px] border border-[#e8ecf4] p-6 shadow-xs lg:col-span-2 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-base font-extrabold text-slate-900 mb-1">Enabling Skills Profile</h2>
            <p className="text-slate-500 text-xs font-medium mb-6">A detailed breakdown of foundational English skills based on your practice test performance.</p>
            
            <div className="space-y-4 pr-6">
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <h3 className="text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">Strength: Spelling</h3>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">You consistently score well in dictation and written tasks. Keep it up!</p>
              </div>
              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-100">
                <h3 className="text-amber-700 font-bold text-xs uppercase tracking-wider mb-1">Focus Area: Written Discourse</h3>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">Work on your essay structure and logical flow to improve this score.</p>
              </div>
            </div>
          </div>
          
          <div className="h-[320px] w-full md:w-1/2 mt-6 md:mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="68%" data={enablingData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[10, 90]} tick={false} axisLine={false} />
                <Radar name="Score" dataKey="A" stroke="#4f46e5" fill="#6366f1" fillOpacity={0.3} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
