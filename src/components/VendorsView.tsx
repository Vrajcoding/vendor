/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, Info, Plus, Star, StarHalf, Filter, ChevronLeft, ChevronRight, Eye, Edit, MoreVertical, X, Check, EyeOff } from 'lucide-react';
import { Vendor, ScreenType } from '../types';
import { PROFILE_IMAGES } from '../data';

interface VendorsViewProps {
  vendors: Vendor[];
  setVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
  onOpenVendorQuotes: (vendorId: string) => void;
  // Allows trigger from outer app
  addVendorModalOpen: boolean;
  setAddVendorModalOpen: (open: boolean) => void;
}

export default function VendorsView({ vendors, setVendors, onOpenVendorQuotes, addVendorModalOpen, setAddVendorModalOpen }: VendorsViewProps) {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Add Vendor Form States
  const [newVendorName, setNewVendorName] = useState('');
  const [newVendorSubtitle, setNewVendorSubtitle] = useState('');
  const [newVendorCategory, setNewVendorCategory] = useState<'Software' | 'Hardware' | 'Logistics'>('Software');
  const [newVendorGst, setNewVendorGst] = useState('29GGGGG0431P1Z5');
  const [newVendorStatus, setNewVendorStatus] = useState<'Active' | 'Inactive'>('Active');
  const [newVendorRating, setNewVendorRating] = useState(4.5);

  const stats = useMemo(() => {
    const total = 1284;
    const activeContracts = 856;
    const pendingCount = 24 + (vendors.length - 4); // Keep dynamic
    return {
      total,
      activeContracts,
      pendingCount
    };
  }, [vendors]);

  // Filter logic
  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const matchCategory = !categoryFilter || vendor.category === categoryFilter;
      const matchSearch = 
        !searchQuery ||
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.gstNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [vendors, categoryFilter, searchQuery]);

  const handleCreateVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVendorName.trim()) return;

    const newVendor: Vendor = {
      id: 'V' + (vendors.length + 1),
      name: newVendorName,
      subtitle: newVendorSubtitle || 'Enterprise Integrator',
      category: newVendorCategory,
      gstNumber: newVendorGst || '29AAAAA1111A1Z1',
      status: newVendorStatus,
      rating: newVendorRating,
      onTimeRate: 95.5,
      qualityScore: 94.0,
      avatarText: newVendorName.substring(0, 1).toUpperCase()
    };

    setVendors((prev) => [newVendor, ...prev]);
    setAddVendorModalOpen(false);

    // Clear form states
    setNewVendorName('');
    setNewVendorSubtitle('');
    setNewVendorCategory('Software');
    setNewVendorGst('29GGGGG0431P1Z5');
    setNewVendorStatus('Active');
    setNewVendorRating(4.5);
  };

  const handleToggleStatus = (id: string) => {
    setVendors((prev) => 
      prev.map(v => v.id === id ? { ...v, status: v.status === 'Active' ? 'Inactive' : 'Active' } : v)
    );
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const floor = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= floor) {
        stars.push(<Star key={i} className="w-3.5 h-3.5 fill-white text-white" />);
      } else if (i === floor + 1 && hasHalf) {
        stars.push(<StarHalf key={i} className="w-3.5 h-3.5 fill-white text-white" />);
      } else {
        stars.push(<Star key={i} className="w-3.5 h-3.5 text-zinc-750" />);
      }
    }
    return <div className="flex gap-0.5">{stars}</div>;
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 max-w-[1440px] mx-auto w-full flex flex-col gap-6 selection:bg-zinc-805 selection:text-white pb-16 relative bg-zinc-950">
      
      {/* Metrics Row summaries matching Screen 3 precisely */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Total stats */}
        <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-xl">
          <p className="text-[10px] font-bold font-mono uppercase tracking-wider text-zinc-500 mb-2">Total Vendors</p>
          <p className="text-2xl font-bold font-mono text-white leading-none">{stats.total.toLocaleString()}</p>
          <div className="flex items-center gap-1.5 text-zinc-400 mt-2 text-xs">
            <span>↑ 12% vs last month</span>
          </div>
        </div>

        {/* Active systems */}
        <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-xl">
          <p className="text-[10px] font-bold font-mono uppercase tracking-wider text-zinc-500 mb-2">Active Contracts</p>
          <p className="text-2xl font-bold font-mono text-white leading-none">{stats.activeContracts.toLocaleString()}</p>
          <div className="flex items-center gap-1.5 text-zinc-400 mt-2 text-xs">
            <span>✓ 67% participation</span>
          </div>
        </div>

        {/* Rating averages */}
        <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between">
          <p className="text-[10px] font-bold font-mono uppercase tracking-wider text-zinc-500 mb-1">Avg. Rating</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-2xl font-bold font-mono text-white leading-none">4.8</p>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />
              ))}
            </div>
          </div>
        </div>

        {/* Require reviews list */}
        <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-xl">
          <p className="text-[10px] font-bold font-mono uppercase tracking-wider text-zinc-500 mb-2">Pending Approvals</p>
          <p className="text-2xl font-bold font-mono text-white leading-none">{stats.pendingCount}</p>
          <div className="flex items-center gap-1 text-zinc-400 mt-2 text-xs">
            <span>Requires action</span>
          </div>
        </div>

      </div>

      {/* Table Filters Action Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-stretch gap-2 flex-1 max-w-lg">
          {/* Category SELECT filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-8 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-650 appearance-none cursor-pointer w-full sm:w-44 font-sans"
            >
              <option value="">All Categories</option>
              <option value="Software">Software</option>
              <option value="Hardware">Hardware</option>
              <option value="Logistics">Logistics</option>
            </select>
          </div>

          {/* Table search filter */}
          <div className="relative flex-1 group">
            <input
              type="text"
              placeholder="Filter by name, description, or GST..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-xs text-white placeholder-zinc-500 focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 outline-none transition-all duration-150 font-sans"
            />
          </div>
        </div>

        {/* Add Vendor CTA */}
        <button
          onClick={() => setAddVendorModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-zinc-200 rounded-lg font-bold text-xs text-black cursor-pointer select-none shadow transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Vendor</span>
        </button>
      </div>

      {/* Primary Data Grid Table */}
      {filteredVendors.length > 0 ? (
        <div className="bg-zinc-900/20 border border-zinc-805 rounded-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900/60 border-b border-zinc-800/80">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-wider font-mono font-bold text-zinc-400">Vendor Name</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-wider font-mono font-bold text-zinc-400">Category</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-wider font-mono font-bold text-zinc-400">GST Number</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-wider font-mono font-bold text-zinc-400">Status</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-wider font-mono font-bold text-zinc-400">Rating</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-wider font-mono font-bold text-zinc-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/40 select-text">
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-zinc-850/20 transition-colors duration-150 group">
                    {/* Name block layout */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center justify-center font-bold text-sm text-white shrink-0 select-none">
                          {vendor.avatarText}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white leading-none mb-1.5">{vendor.name}</p>
                          <p className="text-[10px] text-zinc-400 opacity-60 leading-none">{vendor.subtitle}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category chip layout */}
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        vendor.category === 'Software' 
                          ? 'bg-zinc-800/30 border-zinc-700 text-zinc-300' 
                          : vendor.category === 'Logistics'
                          ? 'bg-[#0d0d0f]/60 border border-zinc-800 text-zinc-350'
                          : 'bg-zinc-900 border-zinc-805 text-zinc-405'
                      }`}>
                        {vendor.category}
                      </span>
                    </td>

                    {/* Monospace GST */}
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-zinc-300 opacity-90">{vendor.gstNumber}</span>
                    </td>

                    {/* Active dynamic state with pulse layout */}
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleToggleStatus(vendor.id)}
                        className="flex items-center gap-1.5 text-left cursor-pointer group"
                        title="Click to toggle status"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          vendor.status === 'Active' 
                            ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]' 
                            : 'bg-zinc-700'
                        }`} />
                        <span className={`text-xs font-semibold ${
                          vendor.status === 'Active' ? 'text-zinc-200' : 'text-zinc-550'
                        }`}>{vendor.status}</span>
                      </button>
                    </td>

                    {/* Stars render */}
                    <td className="px-6 py-4">
                      {renderStars(vendor.rating)}
                    </td>

                    {/* Interactive inline selectors */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 select-none">
                        <button 
                          onClick={() => onOpenVendorQuotes(vendor.id)}
                          className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer" 
                          title="Compare active quotes"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => alert(`Edit core profile for ${vendor.name}`)}
                          className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Simple table footer matching Screen 3 */}
          <div className="px-6 py-3.5 bg-zinc-900/40 border-t border-zinc-800/80 flex items-center justify-between">
            <p className="text-xs text-zinc-400 font-medium opacity-70">
              Showing 1 to {filteredVendors.length} of {vendors.length} vendors
            </p>
            <div className="flex items-center gap-1.5 font-mono">
              <button className="w-7 h-7 rounded border border-zinc-800 flex items-center justify-center hover:bg-zinc-900/50 text-zinc-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" disabled>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 rounded bg-white text-black font-bold text-[11px] select-none">1</button>
              <button className="w-7 h-7 rounded border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 text-zinc-300 font-bold text-[11px] select-none">2</button>
              <button className="w-7 h-7 rounded border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 text-zinc-300 font-bold text-[11px] select-none">3</button>
              <span className="text-xs text-zinc-500 opacity-50 px-1 font-mono">...</span>
              <button className="w-7 h-7 rounded border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 text-zinc-300 font-bold text-[11px] select-none">321</button>
              <button className="w-7 h-7 rounded border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 text-zinc-300 transition-colors">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty results state template rendering precisely Screen 3 hidden detail */
        <div className="bg-zinc-900/20 border border-zinc-800 rounded-xl py-12 flex flex-col items-center text-center justify-center relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-white/[0.01] rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative w-48 h-48 mb-6 flex items-center justify-center z-10 select-none">
            <Clipboard className="w-16 h-16 text-zinc-700" />
          </div>
          <h3 className="text-base font-bold text-white mb-2 leading-none">No Vendors Found</h3>
          <p className="text-xs text-zinc-400 font-medium max-w-sm mb-6 leading-relaxed select-text">
            We couldn't find any enterprise vendors matching your current search query or categories filter. Try adjusting your parameters.
          </p>
          <button 
            type="button"
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('');
            }}
            className="px-6 py-2 bg-transparent border border-zinc-800 hover:bg-zinc-900 text-zinc-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer select-none"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Dynamic Add Vendor Drawer Drawer Dialog matches Screen 3 workflow perfectly */}
      {addVendorModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-200">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-md rounded-xl overflow-hidden shadow-2xl relative select-none">
            {/* Glossy line header overlay */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            
            <div className="p-5 border-b border-zinc-800/80 flex justify-between items-center bg-zinc-900/40">
              <div>
                <h3 className="text-sm font-bold text-white">Add New Strategic Vendor</h3>
                <p className="text-[10px] text-zinc-455 opacity-65 font-medium mt-0.5">Register strategic procurement partner</p>
              </div>
              <button 
                type="button"
                className="p-1 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
                onClick={() => setAddVendorModalOpen(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateVendor} className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold font-mono text-zinc-450 uppercase tracking-wider block">Company Name</label>
                <input 
                  type="text" 
                  value={newVendorName}
                  onChange={(e) => setNewVendorName(e.target.value)}
                  placeholder="e.g. Apex Manufacturing Inc."
                  required
                  className="w-full bg-[#0d0d0f]/80 border border-zinc-800 px-3.5 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-650 rounded-lg font-sans"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold font-mono text-zinc-450 uppercase tracking-wider block">Specialty / Title description</label>
                <input 
                  type="text" 
                  value={newVendorSubtitle}
                  onChange={(e) => setNewVendorSubtitle(e.target.value)}
                  placeholder="e.g. Turnkey Electrical Components"
                  className="w-full bg-[#0d0d0f]/80 border border-zinc-800 px-3.5 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-650 rounded-lg font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold font-mono text-zinc-450 uppercase tracking-wider block">Category</label>
                  <select 
                    value={newVendorCategory}
                    onChange={(e) => setNewVendorCategory(e.target.value as any)}
                    className="w-full bg-[#0d0d0f]/80 border border-zinc-800 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-zinc-650 rounded-lg font-sans"
                  >
                    <option value="Software">Software</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Logistics">Logistics</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold font-mono text-zinc-450 uppercase tracking-wider block">GST Tax Number</label>
                  <input 
                    type="text" 
                    value={newVendorGst}
                    onChange={(e) => setNewVendorGst(e.target.value)}
                    placeholder="29GGGGG0431P1Z5"
                    className="w-full bg-[#0d0d0f]/80 border border-zinc-800 px-3.5 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-650 rounded-lg font-mono uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 items-center pt-1">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold font-mono text-zinc-450 uppercase tracking-wider block">Initial Status</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setNewVendorStatus('Active')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all border ${
                        newVendorStatus === 'Active' 
                          ? 'bg-zinc-805 border-zinc-700 text-white font-bold' 
                          : 'bg-transparent border-zinc-800 text-zinc-500'
                      }`}
                    >
                      Active
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewVendorStatus('Inactive')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all border ${
                        newVendorStatus === 'Inactive' 
                          ? 'bg-zinc-805 border-zinc-700 text-white font-bold' 
                          : 'bg-transparent border-zinc-800 text-zinc-500'
                      }`}
                    >
                      Inactive
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold font-mono text-zinc-455 uppercase tracking-wider block">Audited Rating ({newVendorRating}★)</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    step="0.5"
                    value={newVendorRating}
                    onChange={(e) => setNewVendorRating(parseFloat(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>
              </div>

              {/* Action Trigger Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800/80">
                <button
                  type="button"
                  className="px-4 py-2 border border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer text-xs font-medium rounded-lg"
                  onClick={() => setAddVendorModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-white hover:bg-zinc-200 text-black cursor-pointer text-xs font-bold rounded-lg transition-colors"
                >
                  Validate &amp; Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
