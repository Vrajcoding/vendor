/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronRight, Info, PlusCircle, Trash, Search, Brain, X, UploadCloud, Calendar } from 'lucide-react';
import { RFQ, RFQStatus, Vendor, LineItem } from '../types';

interface CreateRFQViewProps {
  onLaunchRFQ: (newRfq: RFQ) => void;
  onCancel: () => void;
  vendors: Vendor[];
}

export default function CreateRFQView({ onLaunchRFQ, onCancel, vendors }: CreateRFQViewProps) {
  const [rfqTitle, setRfqTitle] = useState('Annual Laptop & Equipment Procurement 2024');
  const [description, setDescription] = useState('Vendor request for enterprise notebook hardware along with matching type-C accessories and docking layouts under corporate warranty agreements.');
  const [deadline, setDeadline] = useState('2024-11-20');
  const [currency, setCurrency] = useState('USD - US Dollar');

  // Dynamic Line Items rows list
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', name: 'Enterprise Laptop - Model X', quantity: 50, unit: 'Units' },
    { id: '2', name: 'Docking Station - Type C', quantity: 50, unit: 'Units' }
  ]);

  // AI suggestions state
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMatchedCount, setAiMatchedCount] = useState<number | null>(null);

  // Selected manual vendors index list state
  const [selectedVendorIds, setSelectedVendorIds] = useState<string[]>(['V2', 'V4']); // Pre-seed with defaults
  const [vendorSearchVal, setVendorSearchVal] = useState('');

  const handleAddLineItem = () => {
    const newItem: LineItem = {
      id: Math.random().toString(36).substring(2, 9),
      name: '',
      quantity: 1,
      unit: 'Units'
    };
    setLineItems([...lineItems, newItem]);
  };

  const handleLineItemChange = (id: string, field: keyof LineItem, val: any) => {
    setLineItems(lineItems.map(item => item.id === id ? { ...item, [field]: val } : item));
  };

  const handleRemoveLineItem = (id: string) => {
    if (lineItems.length <= 1) {
      alert("At least one line item is required.");
      return;
    }
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const triggerAISuggestions = () => {
    setAiLoading(true);
    setAiMatchedCount(null);
    // Simulate AI thinking micro-interaction
    setTimeout(() => {
      setAiLoading(false);
      setAiMatchedCount(5);
      // Automatically toggle a selection as an AI suggestion!
      setSelectedVendorIds(prev => {
        const set = new Set([...prev, 'V1']); // Add Starlight Systems
        return Array.from(set);
      });
    }, 1500);
  };

  const handleToggleVendor = (id: string) => {
    if (selectedVendorIds.includes(id)) {
      setSelectedVendorIds(selectedVendorIds.filter(vId => vId !== id));
    } else {
      setSelectedVendorIds([...selectedVendorIds, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfqTitle.trim()) {
      alert("Please provide an RFQ title.");
      return;
    }

    const itemsCountLabel = `${lineItems.reduce((acc, curr) => acc + (Number(curr.quantity) || 0), 0)} Units`;

    const newRFQ: RFQ = {
      id: 'RFQ-NEW-' + Math.floor(Math.random() * 9000 + 1000),
      title: rfqTitle,
      category: 'Electronics & Tech',
      description: description,
      dueDate: 'Nov 20, 2024',
      itemsCount: itemsCountLabel,
      status: RFQStatus.Pending,
      submissionDeadline: deadline,
      currency: currency,
      lineItems: lineItems.filter(item => item.name.trim() !== ''),
      selectedVendors: selectedVendorIds,
      submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    onLaunchRFQ(newRFQ);
    alert('RFQ launched successfully! It is now published in the RFQ index.');
  };

  // Autocomplete vendors suggestion matching query
  const matchingVendorsList = vendors.filter(v => 
    !selectedVendorIds.includes(v.id) &&
    v.name.toLowerCase().includes(vendorSearchVal.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 max-w-6xl mx-auto w-full selection:bg-zinc-805 selection:text-white pb-16">
      
      {/* Header breadcrumb navigations matching Screen 2 */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex gap-1.5 items-center text-zinc-450 text-xs font-semibold mb-2 font-mono uppercase tracking-wider">
            <span onClick={onCancel} className="hover:text-white cursor-pointer">RFQs</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-zinc-300">New Request</span>
          </nav>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Create New RFQ</h2>
          <p className="text-xs text-zinc-400 mt-1.5 max-w-2xl font-medium leading-relaxed">
            Define your procurement requirements, line items, and set bidding deadlines. Connect with qualified enterprise vendors dynamically.
          </p>
        </div>

        {/* Action Triggers */}
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-zinc-800 rounded-lg text-xs font-semibold hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer select-none"
          >
            Save as Draft
          </button>
          <button 
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-white hover:bg-zinc-200 rounded-lg font-bold text-xs text-black cursor-pointer select-none shadow transition-all"
          >
            Launch RFQ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Main form segments (Left Column) */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Card 1: General Info */}
          <div className="glass rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4 border-b border-zinc-800/40 pb-3">
              <Info className="w-4 h-4 text-zinc-400" />
              <h3 className="text-sm font-bold text-white leading-none">General Information</h3>
            </div>

            <div className="space-y-4">
              {/* RFQ Title input */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold font-mono text-zinc-400 uppercase tracking-wider block">RFQ Title</label>
                <input 
                  type="text" 
                  value={rfqTitle}
                  onChange={(e) => setRfqTitle(e.target.value)}
                  placeholder="e.g. Annual Laptop Procurement 2024"
                  className="w-full bg-[#0d0d0f]/80 border border-zinc-800 rounded-lg p-3 text-xs text-white placeholder-zinc-700 focus:ring-1 focus:ring-zinc-550 focus:border-zinc-550 outline-none"
                />
              </div>

              {/* Instructions and Description Area */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold font-mono text-zinc-400 uppercase tracking-wider block">Description &amp; Instructions</label>
                <textarea 
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail the scope of work, technical specifications, and delivery agreements..."
                  className="w-full bg-[#0d0d0f]/80 border border-zinc-800 rounded-lg p-3 text-xs text-white placeholder-zinc-700 focus:ring-1 focus:ring-zinc-550 focus:border-zinc-550 outline-none resize-none"
                />
              </div>

              {/* Fields row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold font-mono text-zinc-400 uppercase tracking-wider block">Submission Deadline</label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-450" />
                    <input 
                      type="date" 
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full bg-[#0d0d0f]/80 border border-zinc-800 rounded-lg pl-10 pr-3 py-2.5 text-xs text-white focus:ring-1 focus:ring-zinc-550 focus:border-zinc-550 outline-none [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold font-mono text-zinc-400 uppercase tracking-wider block">Currency</label>
                  <select 
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-[#0d0d0f]/80 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:ring-1 focus:ring-zinc-550 focus:border-zinc-550 outline-none [color-scheme:dark]"
                  >
                    <option>USD - US Dollar</option>
                    <option>EUR - Euro</option>
                    <option>GBP - British Pound</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: List line items matching Screen 2 screen details precisely */}
          <div className="glass rounded-xl p-5">
            <div className="flex items-center justify-between gap-4 mb-4 border-b border-zinc-800/40 pb-3">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-zinc-400" />
                <h3 className="text-sm font-bold text-white">Line Items Specification</h3>
              </div>
              <button 
                type="button"
                onClick={handleAddLineItem}
                className="flex items-center gap-1.5 px-3 py-1 bg-zinc-90 w-full hover:bg-zinc-800 border border-zinc-800 text-zinc-305 hover:text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer select-none"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-800/50">
                    <th className="font-mono text-[10px] uppercase font-bold text-zinc-400 py-2 px-3">Product Name / Service Description</th>
                    <th className="font-mono text-[10px] uppercase font-bold text-zinc-400 py-2 px-3 w-28">Quantity</th>
                    <th className="font-mono text-[10px] uppercase font-bold text-zinc-400 py-2 px-3 w-28">Unit</th>
                    <th className="font-mono text-[10px] uppercase font-bold text-zinc-400 py-2 px-3 w-16 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/20">
                  {lineItems.map((item) => (
                    <tr key={item.id} className="group hover:bg-zinc-900/40 transition-all">
                      <td className="py-2.5 px-2">
                        <input 
                          type="text" 
                          value={item.name}
                          onChange={(e) => handleLineItemChange(item.id, 'name', e.target.value)}
                          placeholder="e.g. Dell Latitude 14 notebook workstation"
                          className="w-full bg-transparent border-0 ring-0 focus:ring-1 focus:ring-zinc-700 hover:bg-zinc-950/30 focus:bg-[#0d0d0f]/80 px-2 py-1 text-xs text-white placeholder-zinc-700 rounded"
                        />
                      </td>

                      <td className="py-2.5 px-2">
                        <input 
                          type="number" 
                          value={item.quantity}
                          onChange={(e) => handleLineItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                          className="w-full bg-transparent border-0 ring-0 focus:ring-1 focus:ring-zinc-700 hover:bg-zinc-950/30 focus:bg-[#0d0d0f]/80 px-2 py-1 text-xs text-white"
                        />
                      </td>

                      <td className="py-2.5 px-2 text-xs">
                        <select 
                          value={item.unit}
                          onChange={(e) => handleLineItemChange(item.id, 'unit', e.target.value)}
                          className="w-full bg-transparent border-0 outline-none ring-0 cursor-pointer focus:ring-1 focus:ring-zinc-700 px-2 py-1 text-xs text-white rounded [color-scheme:dark]"
                        >
                          <option value="Units">Units</option>
                          <option value="Hours">Hours</option>
                          <option value="Liters">Liters</option>
                        </select>
                      </td>

                      <td className="py-2.5 px-2 text-center">
                        <button 
                          type="button"
                          onClick={() => handleRemoveLineItem(item.id)}
                          className="p-1 text-zinc-500 hover:text-red-400 rounded transition-colors cursor-pointer"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Bidding parameters index panel (Right Column) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Card 1 AI suggestion section matching Screen 2 */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-5 relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-300"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2 font-semibold">
                <Brain className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Vendor Recommendation</h4>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed mb-4">
                Let our AI engine analyze your items and match you with the highest-rated active vendors in the ERP network.
              </p>
              
              <button 
                type="button"
                onClick={triggerAISuggestions}
                disabled={aiLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-80 text-white font-bold text-xs border border-zinc-700 rounded-lg transition-transform cursor-pointer select-none shadow"
              >
                {aiLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Matching Networks...</span>
                  </>
                ) : aiMatchedCount ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">✓ Matched: Starlight Systems!</span>
                ) : (
                  <>
                    <Brain className="w-3.5 h-3.5 text-zinc-400" />
                    <span>AI Suggest Vendors</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 2 manual vendors assigning matching Screen 2 selected lists */}
          <div className="glass rounded-xl p-5">
            <h4 className="font-mono text-[10px] uppercase font-bold text-zinc-455 tracking-wider mb-2">Search Vendors</h4>
            
            {/* Quick autocomplete search query */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                value={vendorSearchVal}
                onChange={(e) => setVendorSearchVal(e.target.value)}
                placeholder="Type and click to add..."
                className="w-full bg-[#0d0d0f]/80 border border-zinc-800 px-8 py-2 text-xs text-white placeholder-zinc-700 rounded-lg outline-none"
              />
            </div>

            {/* Suggestions drop List */}
            {vendorSearchVal.trim() && matchingVendorsList.length > 0 && (
              <div className="bg-[#0d0d0f]/90 border border-zinc-800 rounded-lg max-h-40 overflow-y-auto mb-4 p-1.5 space-y-1">
                {matchingVendorsList.map(vendor => (
                  <button
                    key={vendor.id}
                    onClick={() => {
                      handleToggleVendor(vendor.id);
                      setVendorSearchVal('');
                    }}
                    type="button"
                    className="w-full flex items-center gap-2.5 px-2.5 py-1.5 hover:bg-zinc-800 rounded text-left text-xs text-white font-medium"
                  >
                    <span className="w-5 h-5 bg-zinc-800 rounded text-[10px] font-bold flex items-center justify-center text-zinc-405">
                      {vendor.avatarText}
                    </span>
                    <span>{vendor.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Display Selected list status */}
            <div className="space-y-3">
              <h5 className="font-mono text-[10px] uppercase font-bold text-zinc-450 opacity-60">
                Selected ({selectedVendorIds.length})
              </h5>
              
              <div className="space-y-2">
                {selectedVendorIds.length === 0 ? (
                  <p className="text-[11px] italic text-zinc-500">No vendors attached yet. Select above or request AI.</p>
                ) : (
                  selectedVendorIds.map(vId => {
                    const matchedVendor = vendors.find(v => v.id === vId);
                    if (!matchedVendor) return null;
                    return (
                      <div key={vId} className="flex justify-between items-center p-2.5 bg-zinc-950/60 border border-zinc-850 rounded-xl">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-8 h-8 rounded bg-zinc-800 text-[10px] font-bold text-white flex items-center justify-center shrink-0">
                            {matchedVendor.avatarText}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-white leading-none mb-1.5 truncate">{matchedVendor.name}</p>
                            <span className="text-[9px] uppercase tracking-wider font-semibold font-mono text-zinc-450">
                              {matchedVendor.category}
                            </span>
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => handleToggleVendor(vId)}
                          className="text-zinc-500 hover:text-red-400 p-1 rounded-lg transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Card 3 file upload matching Screen 2 precisely */}
          <div className="bg-zinc-950/40 border-2 border-zinc-805 border-dashed rounded-xl p-5 select-none hover:border-zinc-700 transition-colors">
            <div className="flex flex-col items-center text-center justify-center py-5">
              <UploadCloud className="w-10 h-10 text-zinc-600 mb-2" />
              <p className="text-xs font-bold text-zinc-300 leading-none mb-1 font-sans">Drop engineering specs here</p>
              <p className="text-[10px] text-zinc-550 font-medium font-sans">PDF, DOCX, or XLSX formats up to 25MB</p>
              <button 
                type="button"
                onClick={() => alert("Enterprise file upload dialogue opening.")}
                className="mt-4 px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                Browse Specs
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
