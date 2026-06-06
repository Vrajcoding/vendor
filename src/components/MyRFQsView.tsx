/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RFQ, RFQStatus, Vendor } from '../types';
import { Calendar, Layers, ShieldCheck, Mail, Send, CheckCircle } from 'lucide-react';

interface MyRFQsViewProps {
  rfqs: RFQ[];
  onOpenComparison: (rfq: RFQ) => void;
  onSubmitMockQuote: (rfqId: string, unitPrice: number, deliveryDays: number, warranty: string) => void;
  vendors: Vendor[];
}

export default function MyRFQsView({ rfqs, onOpenComparison, onSubmitMockQuote, vendors }: MyRFQsViewProps) {
  const [activeTab, setActiveTab] = useState<'All' | RFQStatus>('All');
  const [selectedRfqId, setSelectedRfqId] = useState<string | null>(null);

  // Submission values
  const [bidPrice, setBidPrice] = useState('1450');
  const [deliveryDays, setDeliveryDays] = useState('7');
  const [warrantyLabel, setWarrantyLabel] = useState('18 Months');

  const filteredRfqs = rfqs.filter(rfq => {
    if (activeTab === 'All') return true;
    return rfq.status === activeTab;
  });

  const getStatusStyle = (status: RFQStatus) => {
    switch (status) {
      case RFQStatus.Pending:
        return 'bg-zinc-800/20 text-zinc-300 border-zinc-700/50';
      case RFQStatus.Submitted:
        return 'bg-white/5 text-zinc-100 border-zinc-800';
      case RFQStatus.Awarded:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }
  };

  const handleSendQuote = (e: React.FormEvent, rfqId: string) => {
    e.preventDefault();
    const price = parseFloat(bidPrice);
    const days = parseInt(deliveryDays);
    if (isNaN(price) || isNaN(days)) {
      alert("Please provide valid quotation amounts.");
      return;
    }
    onSubmitMockQuote(rfqId, price, days, warrantyLabel);
    alert("Quotation registered successfully! The status has been promoted to 'Submitted'.");
    setSelectedRfqId(null);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 max-w-[1440px] mx-auto w-full selection:bg-zinc-805 selection:text-white pb-16">
      
      {/* Header section matching ERP style */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Enterprise RFQs Workspace</h2>
        <p className="text-xs text-zinc-400 mt-1">Requisition for Proposals (RFPs) lifecycles and commercial vendor bidding controls</p>
      </div>

      {/* Tab controls */}
      <div className="flex border-b border-zinc-800 gap-4 mb-6 selection:bg-transparent">
        {(['All', RFQStatus.Pending, RFQStatus.Submitted, RFQStatus.Awarded] as const).map(tab => {
          const isActive = activeTab === tab;
          const count = tab === 'All' ? rfqs.length : rfqs.filter(r => r.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedRfqId(null);
              }}
              className={`py-2 text-xs font-semibold relative transition-colors cursor-pointer ${
                isActive ? 'text-white border-b-2 border-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>{tab} ({count})</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* RFQ List Section */}
        <div className={`space-y-4 ${selectedRfqId ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
          {filteredRfqs.length === 0 ? (
            <div className="glass rounded-xl text-center py-10 flex flex-col items-center">
              <p className="text-xs text-zinc-400 opacity-65 font-medium">No RFQs found in this category.</p>
            </div>
          ) : (
            filteredRfqs.map(rfq => {
              const isSelected = selectedRfqId === rfq.id;
              return (
                <div
                  key={rfq.id}
                  onClick={() => setSelectedRfqId(rfq.id)}
                  className={`glass rounded-xl p-5 hover:border-zinc-700 transition-all cursor-pointer relative ${
                    isSelected ? 'border-white ring-2 ring-white/10' : 'border-zinc-805'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase mr-3">{rfq.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wider font-mono uppercase border ${getStatusStyle(rfq.status)}`}>
                        {rfq.status}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1.5 leading-none tracking-tight">{rfq.title}</h4>
                    </div>

                    {rfq.status === RFQStatus.Submitted && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenComparison(rfq);
                        }}
                        className="px-3 py-1.5 bg-white hover:bg-zinc-200 text-black font-bold text-xs rounded-lg shadow transition-all cursor-pointer"
                      >
                        Compare Quotations
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-4 select-text">{rfq.description}</p>

                  <div className="flex flex-wrap items-center justify-between border-t border-zinc-800/40 pt-4 gap-4 text-[11px] text-zinc-400">
                    <div className="flex gap-4">
                      <span>Items Count: <strong className="text-white">{rfq.itemsCount}</strong></span>
                      <span>Submission Target: <strong className="text-white">{rfq.dueDate}</strong></span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold opacity-60 text-zinc-400">
                      <Layers className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{rfq.selectedVendors.length} VENDORS LINKED</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Dynamic Detail & Interactive Bid Submission Panel */}
        {selectedRfqId && (
          <div className="lg:col-span-5 glass border-zinc-700/50 rounded-xl p-5 shadow-2xl space-y-5 animate-fade-in animate-duration-150">
            {/* Find matching RFQ */}
            {(() => {
              const rfq = rfqs.find(r => r.id === selectedRfqId);
              if (!rfq) return null;
              return (
                <>
                  <div className="flex justify-between items-start border-b border-zinc-800/45 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight">{rfq.title}</h4>
                      <p className="text-[10px] text-zinc-400 font-semibold font-mono uppercase tracking-widest mt-1">PROPOSAL WORKSPACE • {rfq.id}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedRfqId(null)}
                      className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  {/* List Specification items in table format */}
                  <div className="space-y-3">
                    <h5 className="font-mono text-[9px] uppercase font-bold text-zinc-500">Requisition Items</h5>
                    <div className="bg-[#0d0d0f]/80 border border-zinc-800 rounded-lg p-3 space-y-2.5">
                      {rfq.lineItems && rfq.lineItems.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-xs">
                          <span className="text-zinc-300 font-medium leading-tight">{item.name}</span>
                          <span className="font-mono font-bold text-white truncate shrink-0 ml-4">{item.quantity} {item.unit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Quote Section if status is Pending */}
                  {rfq.status === RFQStatus.Pending ? (
                    <form onSubmit={(e) => handleSendQuote(e, rfq.id)} className="space-y-4 pt-4 border-t border-zinc-800/30">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-250 font-semibold bg-zinc-900 border border-zinc-800 p-2.5 rounded-lg leading-relaxed">
                        <Mail className="w-4 h-4 shrink-0 text-zinc-400" />
                        <span>Submit custom quotation proposal of strategic values on behalf of vendors:</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pb-1">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold font-mono text-zinc-400 uppercase tracking-wider block">Estimated Bid price ($/unit)</label>
                          <input 
                            type="number" 
                            value={bidPrice}
                            onChange={(e) => setBidPrice(e.target.value)}
                            className="w-full bg-[#0d0d0f]/80 border border-zinc-800 p-2 rounded-lg text-xs leading-none text-white focus:outline-none focus:ring-1 focus:ring-zinc-650"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold font-mono text-zinc-400 uppercase tracking-wider block">Expected Leaddays</label>
                          <input 
                            type="number" 
                            value={deliveryDays}
                            onChange={(e) => setDeliveryDays(e.target.value)}
                            className="w-full bg-[#0d0d0f]/80 border border-zinc-800 p-2 rounded-lg text-xs leading-none text-white focus:outline-none focus:ring-1 focus:ring-zinc-650"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold font-mono text-zinc-400 uppercase tracking-wider block">Warranty Period Guarantee</label>
                        <select
                          className="w-full bg-[#0d0d0f]/80 border border-zinc-800 p-2 text-xs text-white rounded-lg [color-scheme:dark]"
                          value={warrantyLabel}
                          onChange={(e) => setWarrantyLabel(e.target.value)}
                        >
                          <option>6 Months</option>
                          <option>12 Months</option>
                          <option>18 Months</option>
                          <option>24 Months</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full h-10 bg-white hover:bg-zinc-250 text-black text-xs font-bold rounded-lg shadow flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Publish Commercial Bids</span>
                      </button>
                    </form>
                  ) : (
                    <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-3.5">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <div>
                        <p className="text-xs font-bold text-white uppercase tracking-tight">报价单已就绪 • BID COMMITTED</p>
                        <p className="text-[11px] text-zinc-400 leading-tight mt-1">This RFQ has already received valid quotation responses. Click 'Compare Quotations' in index to audit values.</p>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}

      </div>

    </div>
  );
}
