/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LayoutDashboard, Users, FileText, BarChart3, Receipt, ClipboardCheck, ShoppingCart, HelpCircle, FileSpreadsheet, Settings, Plus } from 'lucide-react';
import { ScreenType } from '../types';
import { PROFILE_IMAGES } from '../data';

interface SidebarProps {
  currentScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  user: {
    name: string;
    role: string;
    avatar: string;
  };
  onLogout: () => void;
}

export default function Sidebar({ currentScreen, setScreen, user, onLogout }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vendors', label: 'Vendors', icon: Users },
    { id: 'rfqs', label: 'RFQs', icon: FileText },
    { id: 'quotations', label: 'Quotations', icon: FileSpreadsheet },
    { id: 'approvals', label: 'Approvals', icon: ClipboardCheck },
    { id: 'purchase-orders', label: 'Purchase Orders', icon: ShoppingCart },
    { id: 'invoices', label: 'Invoices', icon: Receipt },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ] as const;

  return (
    <aside className="w-64 bg-[#09090b] border-r border-zinc-800 h-screen flex flex-col p-4 gap-2 flex-shrink-0 z-40 relative">
      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-6 px-2 py-1">
        <div className="w-8 h-8 bg-white rounded flex items-center justify-center shrink-0">
          <div className="w-4 h-4 bg-black rotate-45"></div>
        </div>
        <div>
          <h1 className="font-bold text-white tracking-tight leading-none text-sm">VendorBridge</h1>
          <p className="text-[10px] text-zinc-400 mt-1 uppercase tracking-wider font-semibold font-mono">Procurement ERP</p>
        </div>
      </div>

      {/* New Request Button */}
      <button 
        onClick={() => setScreen('create-rfq')}
        className="w-full bg-white hover:bg-zinc-200 active:scale-[0.98] text-black py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 mb-4 font-semibold text-xs transition-all duration-150 cursor-pointer shadow-sm"
      >
        <Plus className="w-4 h-4" />
        <span>New Request</span>
      </button>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                isActive 
                  ? 'bg-zinc-800 text-white font-semibold scale-[0.98] border border-zinc-700/50' 
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30'
              }`}
            >
              <IconComponent className={`w-4 h-4 ${isActive ? 'text-zinc-100' : 'text-zinc-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer Account Info */}
      <div className="mt-auto pt-4 border-t border-zinc-800 flex items-center gap-3">
        <img 
          src={user.avatar} 
          alt={user.name} 
          className="w-8 h-8 rounded-full border border-zinc-800 object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-zinc-100 truncate leading-none mb-1">{user.name}</p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold font-mono truncate">{user.role}</p>
        </div>
        <button 
          onClick={onLogout}
          title="Sign Out"
          className="p-1 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
