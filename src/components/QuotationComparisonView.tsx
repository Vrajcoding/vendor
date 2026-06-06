/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ChevronRight, Download, Star, Check, X, Shield, Award, Sparkles, HelpCircle } from 'lucide-react';
import { Quotation, RFQ, ScreenType, RFQStatus } from '../types';
import { PROFILE_IMAGES } from '../data';

interface QuotationComparisonViewProps {
  rfq: RFQ;
  quotations: Quotation[];
  onAwardRFQ: (rfqId: string, quotationId: string) => void;
  onBack: () => void;
}

export default function QuotationComparisonView({ rfq, quotations, onAwardRFQ, onBack }: QuotationComparisonViewProps) {
  const [selectedQuoteId, setSelectedQuoteId] = useState<string>('Q2'); // Pre-select Recommended Titan Logistics
  const [isAwarding, setIsAwarding] = useState(false);

  const handleAwardSelection = () => {
    setIsAwarding(true);
    setTimeout(() => {
      onAwardRFQ(rfq.id, selectedQuoteId);
      setIsAwarding(false);
      alert('Contract awarded successfully! Purchase order generation initialized.');
    }, 1200);
  };

  const activeQuote = quotations.find(q => q.id === selectedQuoteId);

  return (
    <div className="flex-1 overflow-y-auto p-6 max-w-[1440px] mx-auto w-full selection:bg-zinc-805 selection:text-white pb-16">
      
      {/* Header breadcrumb navigations matching Screen 4 */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex gap-1.5 items-center text-zinc-450 text-xs font-semibold mb-2 font-mono uppercase tracking-wider">
            <span onClick={onBack} className="hover:text-white cursor-pointer">RFQs</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-zinc-400 truncate max-w-xs">{rfq.title}</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-zinc-200">Compare Quotes</span>
          </nav>
          
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Quotation Comparison</h2>
            <span className="px-2 py-0.5 bg-white/5 border border-zinc-800 text-zinc-100 text-[10px] font-bold tracking-wider rounded font-mono">
              3 BIDS RECEIVED
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1.5 max-w-2xl font-medium leading-relaxed">
            Centralized technical evaluation matrix and commercial comparison for RFP heavy machine modules.
          </p>
        </div>

        {/* Action Triggers */}
        <div className="flex gap-2">
          <button 
            type="button"
            className="px-4 py-2 border border-zinc-800 hover:bg-zinc-900 rounded-lg text-xs font-semibold text-zinc-350 hover:text-white transition-colors cursor-pointer select-none flex items-center gap-2"
            onClick={() => alert('Downloading Comparison PDF Report')}
          >
            <Download className="w-3.5 h-3.5 text-zinc-400" />
            <span>Export Comparison PDF</span>
          </button>
          
          <button 
            type="button"
            disabled={isAwarding || rfq.status === RFQStatus.Awarded}
            onClick={handleAwardSelection}
            className="px-5 py-2.5 bg-white hover:bg-zinc-200 disabled:opacity-50 hover:active:scale-[0.98] disabled:scale-100 disabled:cursor-not-allowed rounded-lg font-bold text-xs text-black cursor-pointer select-none shadow transition-all flex items-center gap-1.5"
          >
            {isAwarding ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5 text-black" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Awarding Bid...</span>
              </>
            ) : rfq.status === RFQStatus.Awarded ? (
              <>
                <Award className="w-4 h-4 text-black" />
                <span>Awarded</span>
              </>
            ) : (
              <>
                <Award className="w-4 h-4 text-black" />
                <span>Award Active Selection</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* RFQ overview summary card details */}
      <div className="glass border-zinc-800 rounded-xl p-4 mb-6 flex flex-wrap md:flex-nowrap gap-6 items-center justify-between shadow-md">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold font-mono text-zinc-500 uppercase tracking-widest leading-none mb-1.5">REQUISITION SOURCE</p>
          <h3 className="text-sm font-bold text-white truncate max-w-md leading-none mb-1">{rfq.title}</h3>
          <p className="text-xs text-zinc-400 font-medium mt-1 truncate">{rfq.description}</p>
        </div>
        <div className="h-10 w-[1px] bg-zinc-800/50 hidden md:block" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 shrink-0 text-left select-text">
          <div>
            <p className="text-[9px] font-mono font-bold text-zinc-500 uppercase">Category</p>
            <p className="text-xs font-semibold text-white mt-1">{rfq.category}</p>
          </div>
          <div>
            <p className="text-[9px] font-mono font-bold text-zinc-500 uppercase">Bidding Deadline</p>
            <p className="text-xs font-semibold text-white mt-1">{rfq.dueDate}</p>
          </div>
          <div className="hidden sm:block">
            <p className="text-[9px] font-mono font-bold text-zinc-500 uppercase">Active Status</p>
            <p className="text-xs font-semibold mt-1 text-zinc-350 flex items-center gap-1.5 leading-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-450" />
              <span>{rfq.status}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Commercial Quotations comparison Cards row maps screen cards exactly */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch mb-6">
        {quotations.map((quote) => {
          const isSelected = selectedQuoteId === quote.id;
          return (
            <div 
              key={quote.id}
              onClick={() => setSelectedQuoteId(quote.id)}
              className={`glass rounded-xl overflow-hidden shadow-lg transition-all duration-250 cursor-pointer select-none relative p-5 ${
                isSelected 
                  ? 'border-white ring-2 ring-white/10 scale-[0.99] bg-zinc-900/40' 
                  : 'border-zinc-805 hover:border-zinc-700/80'
              }`}
            >
              {/* Highlight Recommended Badge overlay matching Screen 4 layout */}
              {quote.isBalanced && (
                <div className="absolute top-0 right-0 py-1.5 px-3 bg-white/10 text-white border-l border-b border-zinc-800 text-[9px] font-extrabold font-mono rounded-bl-lg uppercase tracking-wider flex items-center gap-1 leading-none select-none">
                  <Sparkles className="w-3 h-3 text-zinc-300" />
                  <span>Recommended selection</span>
                </div>
              )}

              <div>
                {/* Header title */}
                <div className="mb-4">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase font-mono border ${
                    quote.isBestPrice 
                      ? 'bg-zinc-800/30 border-zinc-800 text-zinc-300' 
                      : quote.isBalanced 
                      ? 'bg-[#0d0d0f]/60 border border-zinc-800 text-white' 
                      : 'bg-zinc-950/40 border-zinc-800 text-zinc-400'
                  }`}>
                    {quote.isBestPrice ? 'Commercial: Best Price' : quote.isBalanced ? 'Balanced Proposal' : 'Operational Match: Fastest'}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-3 truncate">{quote.vendorName}</h4>
                </div>

                {/* Main Price Numbers metrics stack */}
                <div className="p-4 bg-[#0d0d0f]/80 rounded-xl border border-zinc-800 mb-5">
                  <p className="text-[10px] font-mono uppercase font-bold text-zinc-450 mb-1">TOTAL QUOTE</p>
                  <p className="text-2xl font-black text-white font-mono leading-none tracking-tight">
                    ${quote.totalQuote.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-[10px] text-zinc-400 mt-1.5 font-medium">Unit Price: <span className="font-mono text-white font-semibold">${quote.unitPrice.toLocaleString()}/unit</span></p>
                </div>

                {/* Sub features list */}
                <div className="space-y-3.5 mb-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 font-medium">Expected Delivery</span>
                    <span className="text-white font-bold font-mono">{quote.deliveryDays} Days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 font-medium">Payment Terms</span>
                    <span className="text-white font-mono uppercase font-semibold">{quote.paymentTerms}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 font-medium">Shipping Method</span>
                    <span className="text-white font-medium">{quote.shippingMethod}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 font-medium">Sourcing Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-white text-white" />
                      <span className="text-white font-bold font-mono">{quote.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Radio select indicator footer */}
              <div className="mt-6 pt-4 border-t border-zinc-800/40 flex items-center justify-between">
                <span className="text-[10px] font-bold font-mono text-zinc-500 uppercase">Select to analyze</span>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                  isSelected ? 'border-white bg-white' : 'border-zinc-800'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 text-black stroke-[3px]" />}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* TECHNICAL COMPLIANCE MATRIX Card Container matches Screen 4 precisely */}
      <div className="glass rounded-xl p-5 shadow-inner select-text">
        <div className="flex items-center gap-2 mb-4 border-b border-zinc-800/40 pb-3">
          <Shield className="w-4.5 h-4.5 text-zinc-400" />
          <div>
            <h3 className="text-sm font-bold text-white leading-none">TECHNICAL COMPLIANCE MATRIX</h3>
            <p className="text-[10px] text-zinc-400 opacity-60 font-medium mt-1">Direct compliance verification audit mapping bid metrics side-by-side</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead>
              <tr className="border-b border-zinc-800/30">
                <th className="py-2.5 px-3 text-[10px] uppercase font-mono font-bold text-zinc-450 pb-2">COMPLIANCE PARAMETERS</th>
                {quotations.map(q => (
                  <th key={q.id} className="py-2.5 px-4 font-bold text-white text-center w-64 pb-2">{q.vendorName}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/30">
              
              {/* Parameter Row ISO */}
              <tr>
                <td className="py-3 px-3 font-semibold text-zinc-200">ISO Certified Standard</td>
                {quotations.map(q => (
                  <td key={q.id} className="py-3 px-4 text-center">
                    <span className="inline-flex items-center justify-center gap-1 px-2.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded-full text-zinc-200 font-mono text-[9px] font-bold">
                      <Check className="w-3 h-3 text-zinc-300" />
                      <span>YES</span>
                    </span>
                  </td>
                ))}
              </tr>

              {/* Parameter Row Customs */}
              <tr>
                <td className="py-3 px-3 font-semibold text-zinc-200">Pre-cleared Customs Clearance</td>
                {quotations.map(q => (
                  <td key={q.id} className="py-3 px-4 text-center">
                    {q.customsClearance ? (
                      <span className="inline-flex items-center justify-center gap-1 px-2.5 py-0.5 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-300 font-mono text-[9px] font-semibold select-none leading-tight">
                        <Check className="w-3 h-3 text-zinc-400" />
                        <span>PRE-CLEARED</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center gap-1 px-2.5 py-0.5 bg-zinc-950 border border-zinc-850 rounded-full text-zinc-400 font-mono text-[9px] font-semibold select-none leading-tight">
                        <X className="w-3 h-3 text-zinc-500" />
                        <span>PENDING INBOUND</span>
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Parameter Row Warranty */}
              <tr>
                <td className="py-3 px-3 font-semibold text-zinc-200">Warranty &amp; Service SLA Period</td>
                {quotations.map(q => (
                  <td key={q.id} className="py-3 px-4 text-center">
                    <span className={`text-xs font-semibold px-2 py-1 rounded inline-block font-mono ${
                      q.isBalanced ? 'bg-zinc-800 text-white font-black' : 'text-zinc-400'
                    }`}>
                      {q.warrantyPeriod} {q.isBalanced && '(Best Value SLA)'}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Parameter Row Quality Grade */}
              <tr>
                <td className="py-3 px-3 font-semibold text-zinc-200">Audit Quality Grade Assessed</td>
                {quotations.map(q => (
                  <td key={q.id} className="py-3 px-4 text-center text-xs font-black font-mono">
                    <span className={`px-2.5 py-0.5 rounded border ${
                      q.isBalanced 
                        ? 'bg-zinc-800 border-zinc-700 text-white font-bold' 
                        : 'bg-zinc-900 border-zinc-805 text-zinc-400'
                    }`}>
                      {q.isBalanced ? 'A+ Grade' : q.isBestPrice ? 'A- Grade' : 'B Grade'}
                    </span>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
