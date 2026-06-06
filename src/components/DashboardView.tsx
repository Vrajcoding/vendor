/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Calendar, Download, Wallet, Clock, Megaphone, Truck, Star, Plus, UserPlus, Users, ArrowUpRight, ChevronRight, Activity, ArrowRight } from 'lucide-react';
import { ScreenType, AppActivity } from '../types';
import { PROFILE_IMAGES } from '../data';

interface DashboardViewProps {
  setScreen: (screen: ScreenType) => void;
  activities: AppActivity[];
  onCreateRFQTrigger: () => void;
  onAddVendorTrigger: () => void;
}

export default function DashboardView({ setScreen, activities, onCreateRFQTrigger, onAddVendorTrigger }: DashboardViewProps) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const barData = [
    { month: 'JAN', value: '$420K', height: '40%' },
    { month: 'FEB', value: '$680K', height: '65%' },
    { month: 'MAR', value: '$520K', height: '55%' },
    { month: 'APR', value: '$890K', height: '85%' },
    { month: 'MAY', value: '$740K', height: '75%' },
    { month: 'JUN', value: '$950K', height: '95%' }
  ];

  return (
    <div className="flex flex-col gap-6 p-6 overflow-y-auto max-w-[1440px] mx-auto w-full selection:bg-zinc-805 selection:text-white pb-12">
      {/* Header section with context buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Executive Dashboard</h2>
          <p className="text-xs text-zinc-400 mt-1 font-medium">Real-time procurement insights, vendor metrics, and operations queue</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 hover:bg-zinc-800 transition-all cursor-pointer flex items-center gap-2 text-xs font-semibold select-none">
            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
            <span>Last 30 Days</span>
          </button>
          <button className="px-3.5 py-2 bg-white hover:bg-zinc-200 rounded-lg text-black font-semibold transition-all cursor-pointer flex items-center gap-2 text-xs select-none shadow">
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 Spend */}
        <div className="glass p-5 rounded-xl flex flex-col relative overflow-hidden group">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-white/5 rounded-lg border border-white/5">
              <Wallet className="w-4 h-4 text-zinc-300" />
            </div>
            <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
              <span className="text-[10px] font-sans">↑</span> +12%
            </span>
          </div>
          <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider font-mono opacity-80">Total Spend</p>
          <h3 className="text-2xl font-bold text-white mt-1 leading-none tracking-tight">$4.2M</h3>
        </div>

        {/* KPI 2 Pending items */}
        <div className="glass p-5 rounded-xl flex flex-col relative overflow-hidden group">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-white/5 rounded-lg border border-white/5">
              <Clock className="w-4 h-4 text-zinc-300" />
            </div>
            <span className="text-zinc-400 text-[10px] font-semibold bg-zinc-800 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">High Priority</span>
          </div>
          <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider font-mono opacity-80">Pending Approvals</p>
          <h3 className="text-2xl font-bold text-white mt-1 leading-none tracking-tight">14</h3>
        </div>

        {/* KPI 3 RFQs active */}
        <div className="glass p-5 rounded-xl flex flex-col relative overflow-hidden group">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-white/5 rounded-lg border border-white/5">
              <Megaphone className="w-4 h-4 text-zinc-300" />
            </div>
            <span className="text-emerald-400 text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold font-mono uppercase tracking-wider">Active</span>
          </div>
          <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider font-mono opacity-80">Active RFQs</p>
          <h3 className="text-2xl font-bold text-white mt-1 leading-none tracking-tight">8</h3>
        </div>

        {/* KPI 4 POs */}
        <div className="glass p-5 rounded-xl flex flex-col relative overflow-hidden group">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-white/5 rounded-lg border border-white/5">
              <Truck className="w-4 h-4 text-zinc-300" />
            </div>
            <span className="text-zinc-400 text-[10px] font-semibold bg-zinc-800 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">This Month</span>
          </div>
          <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider font-mono opacity-80">Purchase Orders</p>
          <h3 className="text-2xl font-bold text-white mt-1 leading-none tracking-tight">42</h3>
        </div>
      </div>

      {/* Main Secondary Dashboard Grid (Bento columns) */}
      <div className="grid grid-cols-12 gap-5 items-stretch">
        
        {/* Monthly Spend Bar Chart */}
        <div className="col-span-12 lg:col-span-8 glass rounded-xl p-5 flex flex-col gap-4 min-h-[380px] relative">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-semibold text-white tracking-tight">Monthly Spend Analysis</h4>
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-semibold text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-100"></span>
                <span>Operations</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-semibold text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500"></span>
                <span>Logistics</span>
              </span>
            </div>
          </div>

          {/* Bar chart canvas */}
          <div className="flex-1 flex items-end justify-between gap-3 sm:gap-6 pt-10 px-2 select-text pb-2">
            {barData.map((data, index) => (
              <div 
                key={data.month} 
                className="w-full h-full flex flex-col items-center justify-end relative group cursor-pointer"
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Simulated Tooltip */}
                <div 
                  className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-zinc-900 px-2 py-1.5 rounded text-[10px] font-bold text-white font-mono border border-zinc-800 transition-opacity duration-150 shadow-lg z-20 ${
                    hoveredBar === index ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  {data.value}
                </div>

                {/* Background Track bar */}
                <div className="w-full bg-zinc-950 rounded-t h-full absolute inset-0 opacity-10 pointer-events-none"></div>

                {/* Visual Bar Accent */}
                <div 
                  style={{ height: data.height }}
                  className={`w-full bg-white/10 group-hover:bg-white rounded-t-lg transition-all duration-300 relative z-10 ${
                    hoveredBar === index ? 'shadow-[0_0_12px_rgba(255,255,255,0.15)] bg-white' : ''
                  }`}
                >
                  {/* Internal nested stack for the logistics split to match design detail */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-zinc-650 group-hover:bg-zinc-500 rounded-t-sm transition-colors duration-200"></div>
                </div>

                {/* X-Axis label */}
                <span className="text-[10px] font-bold tracking-wider font-mono text-zinc-500 opacity-80 mt-3 relative z-10">
                  {data.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Vendor Performance Circular Gauge */}
        <div className="col-span-12 lg:col-span-4 glass rounded-xl p-5 flex flex-col gap-4">
          <h4 className="text-sm font-semibold text-white tracking-tight">Top Vendor KPI</h4>
          
          <div className="flex-1 flex flex-col justify-center items-center py-4">
            {/* SVG Ring Graphic */}
            <div className="w-40 h-40 rounded-full flex items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                {/* Secondary Gray Track circle */}
                <circle className="text-zinc-800" cx="50%" cy="50%" fill="none" r="38%" stroke="currentColor" strokeWidth="8"></circle>
                {/* Highlight Green Circle overlay */}
                <circle 
                  className="text-[#4edea3]" 
                  cx="50%" 
                  cy="50%" 
                  fill="none" 
                  r="38%" 
                  stroke="currentColor" 
                  strokeWidth="8"
                  strokeDasharray="239"
                  strokeDashoffset="15" // 94% filled
                ></circle>
              </svg>
              <div className="text-center z-10">
                <span className="text-3xl font-black text-white font-mono leading-none">94%</span>
                <p className="text-[9px] text-zinc-400 font-semibold uppercase tracking-wider font-mono mt-1">On-time Delivery</p>
              </div>
            </div>

            {/* Vendor rating lists */}
            <div className="w-full space-y-3.5 mt-6 border-t border-zinc-800 pt-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-450 font-medium">Quality Rating</span>
                <div className="flex gap-0.5 text-zinc-300">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />
                  ))}
                  <Star className="w-3.5 h-3.5 text-zinc-700" />
                </div>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-450 font-medium">Avg. Response Time</span>
                <span className="text-white font-bold font-mono">2.4 Hours</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Row 3 - Timeline Log and Dynamic Bento Actions */}
      <div className="grid grid-cols-12 gap-5 items-stretch">
        
        {/* Recent Activity Timeline card */}
        <div className="col-span-12 lg:col-span-5 glass rounded-xl p-5 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-semibold text-white tracking-tight">Recent Activity</h4>
            <button 
              onClick={() => setScreen('rfqs')}
              className="text-zinc-300 font-bold text-xs hover:text-white flex items-center gap-0.5 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Activity items list */}
          <div className="flex-1 space-y-4 pt-1 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-zinc-800">
            {activities.slice(0, 4).map((activity, index) => (
              <div key={activity.id + index} className="flex gap-4 relative">
                <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white z-10 text-[9px] font-bold flex-shrink-0">
                  {activity.type === 'RFQ' ? '➕' : activity.type === 'Quote' ? '✉️' : '✓'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-xs font-semibold text-zinc-200 leading-none">{activity.title}</p>
                    <span className="text-[9px] font-bold font-mono text-zinc-550 uppercase">{activity.time}</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed truncate-2-lines select-text">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Spotlight */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-5 justify-between">
          
          {/* Quick Actions grids */}
          <div className="glass rounded-xl p-5">
            <h4 className="text-sm font-semibold text-white tracking-tight mb-4">Quick Actions</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Action 1 Create RFQ */}
              <button 
                onClick={onCreateRFQTrigger}
                className="flex flex-col items-center justify-center text-center gap-3 p-4 bg-zinc-950/40 hover:bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700/80 transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-105 transition-transform text-white">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-zinc-305 group-hover:text-white transition-colors">Create RFQ</span>
              </button>

              {/* Action 2 Add Vendor */}
              <button 
                onClick={onAddVendorTrigger}
                className="flex flex-col items-center justify-center text-center gap-3 p-4 bg-zinc-950/40 hover:bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700/80 transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5  flex items-center justify-center group-hover:scale-105 transition-transform text-white">
                  <UserPlus className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-zinc-305 group-hover:text-white transition-colors">Add Vendor</span>
              </button>

              {/* Action 3 Invite Manager */}
              <button 
                onClick={() => alert("Invite link copied! Send to team managers.")}
                className="flex flex-col items-center justify-center text-center gap-3 p-4 bg-zinc-950/40 hover:bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700/80 transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5  flex items-center justify-center group-hover:scale-105 transition-transform text-white">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-zinc-305 group-hover:text-white transition-colors">Invite Manager</span>
              </button>

            </div>
          </div>

          {/* Visual Highlight card */}
          <div className="glass overflow-hidden rounded-xl p-6 relative min-h-[150px] flex flex-col justify-center border border-zinc-805">
            {/* Visual Logistics Background graphic pattern */}
            <div className="absolute inset-0">
              <img 
                src={PROFILE_IMAGES.bentoAbstract} 
                className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-15 mix-blend-overlay pointer-events-none select-none"
                alt="compliance dashboard overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-[65%]">
              <h4 className="text-sm font-bold text-white tracking-tight">Annual Vendor Review</h4>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed bg-none">
                Check the compliance and security status for 24 platinum-tier vendors before the corporate Q3 audit.
              </p>
              <button 
                onClick={() => setScreen('vendors')}
                className="mt-4 px-4 py-1.5 bg-white text-black hover:bg-zinc-200 rounded-lg font-bold text-xs transition-colors cursor-pointer select-none shadow"
              >
                Start Review
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
