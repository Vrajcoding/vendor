/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Download, Edit, Share2, Clipboard, Clock, CheckCircle2, AlertCircle, HelpCircle, History } from 'lucide-react';
import { Approval } from '../types';

interface PendingApprovalsViewProps {
  approvals: Approval[];
  setApprovals: React.Dispatch<React.SetStateAction<Approval[]>>;
  onApproveSuccess: () => void;
}

export default function PendingApprovalsView({ approvals, setApprovals, onApproveSuccess }: PendingApprovalsViewProps) {
  const [selectedApprovalId, setSelectedApprovalId] = useState<string>('QT-8802');
  const [auditRemarks, setAuditRemarks] = useState('Pricing matches corporate strategic sourcing frameworks. Proceeding with PO publication under priority SLA schemas.');
  const [loadingAction, setLoadingAction] = useState<'Approve' | 'Reject' | null>(null);

  const activeApproval = approvals.find(app => app.id === selectedApprovalId);

  const handleAuditDecision = (status: 'Approved' | 'Rejected') => {
    setLoadingAction(status === 'Approved' ? 'Approve' : 'Reject');
    
    setTimeout(() => {
      setApprovals(prev => 
        prev.map(app => app.id === selectedApprovalId ? { ...app, status, remarks: auditRemarks } : app)
      );
      setLoadingAction(null);
      if (status === 'Approved') {
        onApproveSuccess();
        alert(`Document request ${selectedApprovalId} has been successfully APPROVED. Purchase PO generated with status 'Ready for payment release'.`);
      } else {
        alert(`Document request ${selectedApprovalId} has been REJECTED. Negotiation workflow flags raised.`);
      }
    }, 1200);
  };

  const getUrgencyClasses = (urgency: string) => {
    switch (urgency) {
      case 'High Urgency':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Review Needed':
        return 'bg-amber-500/10 text-amber-400 border-amber-400/20';
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-550/20';
    }
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row items-stretch h-[calc(100vh-53px)] overflow-hidden text-[#e1e2ed] select-none font-sans bg-zinc-950">
      
      {/* Left List inbox channel index matching Screen 7 */}
      <aside className="w-full md:w-80 lg:w-96 border-r border-zinc-800 bg-[#0c0c0e] flex flex-col h-full flex-shrink-0">
        
        {/* Header summary count */}
        <div className="p-4 border-b border-zinc-800 bg-zinc-900/40">
          <h3 className="text-sm font-bold text-white tracking-tight font-sans">Inbox Queue</h3>
          <p className="text-[10px] text-zinc-400 opacity-60 font-medium font-mono uppercase mt-0.5 tracking-wider">
            {approvals.filter(a => a.status === 'Pending').length} Pending Tasks • Actions Queue
          </p>
        </div>

        {/* Index queues selector */}
        <div className="flex-1 overflow-y-auto divide-y divide-zinc-800/30">
          {approvals.map((app) => {
            const isSelected = selectedApprovalId === app.id;
            return (
              <div
                key={app.id}
                onClick={() => setSelectedApprovalId(app.id)}
                className={`p-4 hover:bg-zinc-900/30 transition-all cursor-pointer relative ${
                  isSelected ? 'bg-zinc-900/55 border-l-4 border-white' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-2.5">
                  <span className="font-mono text-xs font-black text-white shrink-0">{app.id}</span>
                  <span className="text-[9px] font-bold text-zinc-500 uppercase font-mono">{app.timeLabel}</span>
                </div>

                <h4 className="text-xs font-bold text-white truncate mb-1.5 leading-none">{app.title}</h4>
                <p className="text-[11px] text-zinc-400 opacity-65 leading-none truncate mb-3">{app.vendorName}</p>

                {/* KPI footer inside the card badge */}
                <div className="flex items-center justify-between gap-2.5">
                  <span className="font-mono text-xs font-black text-white">
                    ${app.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wider font-mono uppercase border ${
                    app.status === 'Approved' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' 
                      : app.status === 'Rejected'
                      ? 'bg-red-500/10 text-red-400 border-red-500/25'
                      : getUrgencyClasses(app.urgency)
                  }`}>
                    {app.status === 'Pending' ? app.urgency : app.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Right Column workspace audit maps details matching Screen 7 perfectly */}
      <main className="flex-1 bg-zinc-950 overflow-y-auto p-6 flex flex-col justify-between h-full">
        
        {activeApproval ? (
          <div className="space-y-6 flex-1 flex flex-col justify-between select-text">
            
            {/* Top card description details */}
            <div className="space-y-6">
              
              {/* Toolbar file trigger */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800/45 pb-4">
                <div>
                  <h2 className="text-base md:text-lg font-bold text-white tracking-tight">{activeApproval.title}</h2>
                  <p className="text-[11px] text-zinc-400 opacity-75 font-semibold font-mono uppercase tracking-wider mt-1">
                    {activeApproval.vendorName} • {activeApproval.id}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white cursor-pointer transition-colors" title="Download Document">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white cursor-pointer transition-colors" title="Edit Properties">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white cursor-pointer transition-colors" title="Audit Share">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Vendor compliance and score summary rows */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-zinc-900/40 border border-zinc-800 p-3.5 rounded-xl">
                  <p className="text-[10px] font-bold font-mono text-zinc-450 uppercase">System Sourcing Rating</p>
                  <p className="text-xs font-semibold text-white mt-1">Tier 1 Strategic Vendor</p>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 p-3.5 rounded-xl">
                  <p className="text-[10px] font-bold font-mono text-zinc-450 uppercase">Quality Assessment SLA</p>
                  <p className="text-xs font-semibold text-emerald-400 mt-1 font-mono">{activeApproval.qualityScore} Compliant Score</p>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 p-3.5 rounded-xl col-span-2 sm:col-span-1">
                  <p className="text-[10px] font-bold font-mono text-zinc-450 uppercase font-semibold">On-time Delivery Tracker</p>
                  <p className="text-xs font-semibold text-zinc-100 mt-1 font-mono">{activeApproval.onTimeRate} Delivery Rate</p>
                </div>
              </div>

              {/* Grand Total Value Indicator block */}
              <div className="bg-zinc-900/20 border border-zinc-800 rounded-xl p-5 flex justify-between items-center relative overflow-hidden">
                <div>
                  <p className="text-[10.5px] font-bold font-mono text-zinc-450 uppercase tracking-wider">TOTAL SPEND AMOUNT</p>
                  <p className="text-3xl font-black text-white mt-1 font-mono leading-none tracking-tight">
                    ${activeApproval.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-[11px] text-zinc-400 opacity-65 mt-1.5">Includes local taxes, freight, and technical installation warranties.</p>
                </div>

                {/* Secondary brand watermark logo overlay */}
                {activeApproval.logoUrl && (
                  <img 
                    src={activeApproval.logoUrl} 
                    alt="Vendor dynamic badge" 
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-contain opacity-25 hidden sm:block border border-zinc-800 rounded-lg p-1 bg-white"
                  />
                )}
              </div>

              {/* Specification table lists of item rows */}
              <div className="space-y-2.5">
                <h5 className="font-mono text-[9px] uppercase font-bold text-zinc-500 tracking-widest leading-none">Line Itemized Specifications</h5>
                
                <div className="bg-[#0d0d0f]/20 border border-zinc-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left font-sans text-xs">
                    <thead>
                      <tr className="bg-zinc-900/60 border-b border-zinc-800/65">
                        <th className="py-2.5 px-3 font-mono text-[9px] font-semibold text-zinc-400">ITEM DESCRIPTION</th>
                        <th className="py-2.5 px-3 font-mono text-[9px] font-semibold text-zinc-400 w-20 text-center">QTY</th>
                        <th className="py-2.5 px-3 font-mono text-[9px] font-semibold text-zinc-400 w-28 text-right">UNIT COST</th>
                        <th className="py-2.5 px-3 font-mono text-[9px] font-semibold text-zinc-400 w-28 text-right">TOTAL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/10 select-text">
                      {activeApproval.lineItems && activeApproval.lineItems.map((item, index) => (
                        <tr key={index} className="hover:bg-zinc-900/15 transition-all">
                          <td className="py-3 px-3 font-medium text-white leading-tight">{item.name}</td>
                          <td className="py-3 px-3 font-semibold font-mono text-center text-zinc-300">{item.quantity}</td>
                          <td className="py-3 px-3 text-right font-mono text-zinc-405">{item.price}</td>
                          <td className="py-3 px-3 text-right font-mono text-white font-bold">{item.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Historical timelines log mapping negotiation phases */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-zinc-400" />
                  <h5 className="font-mono text-[9px] uppercase font-bold text-zinc-500 tracking-widest">Aida Sourcing Timeline Logs</h5>
                </div>
                
                <div className="relative border-l border-zinc-800 pl-4 ml-2.5 space-y-4">
                  {activeApproval.timeline && activeApproval.timeline.map((item, index) => (
                    <div key={index} className="relative bg-transparent">
                      {/* Pulse point dot highlight */}
                      <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border border-zinc-850 bg-white" />
                      <div className="text-xs">
                        <div className="flex justify-between items-center mb-1">
                          <p className="font-bold text-white">{item.title}</p>
                          <span className="text-[10px] text-zinc-500 font-mono">{item.date}</span>
                        </div>
                        <p className="text-zinc-400 opacity-80 leading-relaxed font-normal">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Auditor remarks input and triggers maps Screen 7 actions perfectly */}
            <div className="pt-6 border-t border-zinc-800/40 space-y-4 selection:bg-transparent">
              <div className="space-y-1 select-none">
                <label className="text-[10px] font-bold font-mono text-zinc-400 uppercase tracking-wider block">Auditor Remarks / Compliance Notes</label>
                <textarea 
                  rows={2}
                  value={auditRemarks}
                  onChange={(e) => setAuditRemarks(e.target.value)}
                  placeholder="Insert secure remarks, policy compliance numbers, or justification notes..."
                  className="w-full bg-[#0d0d0f]/80 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-700 outline-none focus:ring-1 focus:ring-zinc-650 resize-none font-sans"
                />
              </div>

              {/* Dual Action buttons maps Screen 7 perfectly */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 select-none">
                <button
                  type="button"
                  disabled={loadingAction !== null || activeApproval.status !== 'Pending'}
                  onClick={() => handleAuditDecision('Rejected')}
                  className="px-5 py-2.5 border border-zinc-800 hover:bg-zinc-900/40 text-zinc-400 font-bold text-xs rounded-xl cursor-pointer select-none transition-all disabled:opacity-50"
                >
                  {loadingAction === 'Reject' ? 'Rejecting Draft...' : 'Reject Document'}
                </button>
                <button
                  type="button"
                  disabled={loadingAction !== null || activeApproval.status !== 'Pending'}
                  onClick={() => handleAuditDecision('Approved')}
                  className="px-6 py-2.5 bg-white hover:bg-zinc-200 text-black font-black text-xs rounded-xl cursor-pointer select-none shadow transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {loadingAction === 'Approve' ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5 text-black" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Releasing PO...</span>
                    </>
                  ) : activeApproval.status === 'Approved' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Document Approved</span>
                    </>
                  ) : (
                    <span>Approve &amp; Release PO Payments</span>
                  )}
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-20 bg-radial">
            <Clipboard className="w-12 h-12 text-zinc-700 mb-3.5" />
            <h4 className="text-sm font-bold text-white mb-1">Select Approval Document</h4>
            <p className="text-xs text-zinc-450 max-w-xs leading-relaxed font-semibold">Pick an active PO or quotation from the left list to review detailed pricing items and SLA metrics.</p>
          </div>
        )}

      </main>

    </div>
  );
}
