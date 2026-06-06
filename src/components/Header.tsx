/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search, Bell, HelpCircle, Shield, Globe } from 'lucide-react';

interface HeaderProps {
  title: string;
  searchPlaceholder?: string;
  searchVal: string;
  onSearchChange: (val: string) => void;
  user: {
    name: string;
    role: string;
    avatar: string;
  };
}

export default function Header({ title, searchPlaceholder = "Search vendors, POs, or RFQs...", searchVal, onSearchChange, user }: HeaderProps) {
  return (
    <header className="bg-[#09090b] border-b border-zinc-800 px-6 py-3 flex justify-between items-center w-full sticky top-0 z-30">
      {/* Title & Search bar */}
      <div className="flex items-center gap-6 flex-1 max-w-xl">
        <h1 className="text-sm font-bold text-white hidden sm:block truncate shrink-0">{title}</h1>
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-zinc-100 transition-colors" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchVal}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:ring-1 focus:ring-zinc-650 focus:border-zinc-650 outline-none transition-all duration-150"
          />
        </div>
      </div>

      {/* Action tray */}
      <div className="flex items-center gap-4 ml-4">
        {/* System Status Tracker */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-750 bg-zinc-900 text-xs">
          <div className="status-dot bg-emerald-500 text-emerald-500"></div>
          <span className="text-[10px] text-zinc-300 font-semibold font-mono uppercase tracking-wider">System Operational</span>
        </div>

        {/* Global indicator text */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-400">
          <Globe className="w-3.5 h-3.5 text-zinc-400" />
          <span className="font-mono text-[11px] opacity-70">Global Ops Center</span>
        </div>

        {/* Badge Notifications Button */}
        <button className="relative p-1.5 hover:bg-zinc-850 rounded-full transition-colors group cursor-pointer">
          <Bell className="w-4 h-4 text-zinc-400 group-hover:scale-105 transition-transform" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-zinc-100 rounded-full border border-zinc-950"></span>
        </button>

        {/* Help Center */}
        <button className="p-1.5 hover:bg-zinc-850 rounded-full transition-colors group cursor-pointer">
          <HelpCircle className="w-4 h-4 text-zinc-400" />
        </button>

        {/* Vertical Separator */}
        <div className="h-6 w-[1px] bg-zinc-800"></div>

        {/* Action state role summary */}
        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-zinc-100">{user.name}</p>
            <p className="text-[9px] text-zinc-500 uppercase font-mono">{user.role}</p>
          </div>
          <div className="w-8 h-8 rounded-full border border-zinc-800 overflow-hidden flex items-center justify-center bg-zinc-800">
            <img src={user.avatar} className="w-full h-full object-cover" alt="User Profile" />
          </div>
        </div>
      </div>
    </header>
  );
}
