/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoginView from './components/LoginView';
import DashboardView from './components/DashboardView';
import VendorsView from './components/VendorsView';
import CreateRFQView from './components/CreateRFQView';
import QuotationComparisonView from './components/QuotationComparisonView';
import MyRFQsView from './components/MyRFQsView';
import PendingApprovalsView from './components/PendingApprovalsView';

import { 
  INITIAL_VENDORS, 
  INITIAL_RFQS, 
  INITIAL_QUOTATIONS, 
  INITIAL_APPROVALS, 
  INITIAL_ACTIVITIES,
  PROFILE_IMAGES 
} from './data';
import { RFQ, RFQStatus, Vendor, Quotation, Approval, AppActivity, ScreenType } from './types';

export default function App() {
  // Global ERP State Management
  const [user, setUser] = useState<{ name: string; role: string; avatar: string } | null>(null);
  const [screen, setScreen] = useState<ScreenType>('dashboard');
  const [searchVal, setSearchVal] = useState('');

  // Sourcing & procurement data states
  const [vendors, setVendors] = useState<Vendor[]>(INITIAL_VENDORS);
  const [rfqs, setRfqs] = useState<RFQ[]>(INITIAL_RFQS);
  const [quotations, setQuotations] = useState<Quotation[]>(INITIAL_QUOTATIONS);
  const [approvals, setApprovals] = useState<Approval[]>(INITIAL_APPROVALS);
  const [activities, setActivities] = useState<AppActivity[]>(INITIAL_ACTIVITIES);

  const [selectedComparisonRfq, setSelectedComparisonRfq] = useState<RFQ | null>(null);
  const [addVendorModalOpen, setAddVendorModalOpen] = useState(false);

  // Authenticated user loading preference from local storage
  useEffect(() => {
    const savedUser = localStorage.getItem('erp_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        // Fallback
      }
    }
  }, []);

  const handleLoginSuccess = (name: string, role: string, avatar: string) => {
    const newUser = { name, role, avatar };
    setUser(newUser);
    localStorage.setItem('erp_user', JSON.stringify(newUser));
    setScreen('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('erp_user');
    setScreen('login');
  };

  // Launch fresh Requisition proposal state integration
  const handleLaunchRFQ = (newRfq: RFQ) => {
    setRfqs((prev) => [newRfq, ...prev]);
    
    // Add transaction history logs
    const newActivity: AppActivity = {
      id: 'ACT-' + Math.floor(Math.random() * 9000),
      type: 'RFQ',
      title: 'RFQ Published',
      time: 'JUST NOW',
      description: `RFQ #${newRfq.id} for "${newRfq.title}" successfully dispatched to ${newRfq.selectedVendors.length} partners.`
    };
    setActivities((prev) => [newActivity, ...prev]);
    
    // Transition back to main list
    setScreen('rfqs');
  };

  // Committing bid price quote updates
  const handleSubmitMockQuote = (rfqId: string, unitPrice: number, deliveryDays: number, warranty: string) => {
    // 1. Update RFQ status to Submitted
    setRfqs((prev) => 
      prev.map(r => r.id === rfqId ? { ...r, status: RFQStatus.Submitted, totalQuote: unitPrice * 100 } : r)
    );

    // 2. Generate detailed mock quotations for comparison
    const newQuote1: Quotation = {
      id: 'Q-MOCK-1',
      rfqId: rfqId,
      vendorId: 'V1',
      vendorName: 'Starlight Systems',
      unitPrice: unitPrice,
      totalQuote: unitPrice * 100,
      deliveryDays: deliveryDays,
      paymentTerms: 'Net 30',
      shippingMethod: 'Sea Freight',
      rating: 4.4,
      isBestPrice: true,
      warrantyPeriod: warranty,
      isoCertified: true,
      customsClearance: false
    };

    const newQuote2: Quotation = {
      id: 'Q-MOCK-2',
      rfqId: rfqId,
      vendorId: 'V2',
      vendorName: 'Titan Logistics Co.',
      unitPrice: Math.round(unitPrice * 1.05),
      totalQuote: Math.round(unitPrice * 1.05) * 100,
      deliveryDays: Math.max(1, deliveryDays - 3),
      paymentTerms: 'Net 45',
      shippingMethod: 'Air Express',
      rating: 4.9,
      isBalanced: true,
      warrantyPeriod: '24 Months',
      isoCertified: true,
      customsClearance: true
    };

    setQuotations((prev) => [newQuote1, newQuote2, ...prev]);

    // 3. Post audit activity log
    const activity: AppActivity = {
      id: 'ACT-Q-' + Math.floor(Math.random() * 9000),
      type: 'Quote',
      title: 'New Quotation Received',
      time: 'JUST NOW',
      description: `Titan Logistics Co. submitted competitive quotation of $${(unitPrice * 1.05 * 100).toLocaleString()} for ${rfqId}.`
    };
    setActivities((prev) => [activity, ...prev]);
  };

  // Award contract logic
  const handleAwardRFQ = (rfqId: string, quotationId: string) => {
    const matchedQuote = quotations.find(q => q.id === quotationId);
    if (!matchedQuote) return;

    // Direct state updates
    setRfqs((prev) => 
      prev.map(r => r.id === rfqId ? { ...r, status: RFQStatus.Awarded, totalQuote: matchedQuote.totalQuote } : r)
    );

    // Add PO Approval trigger dynamically to Pending Approvals!
    const newApproval: Approval = {
      id: 'PO-' + Math.floor(Math.random() * 9000 + 1000),
      type: 'PO',
      timeLabel: 'Just now',
      title: `Contract Award for ${rfqs.find(r => r.id === rfqId)?.title || 'Heavy Components'}`,
      vendorName: matchedQuote.vendorName,
      amount: matchedQuote.totalQuote,
      urgency: 'Within Budget',
      status: 'Pending',
      category: 'Procurement',
      qualityScore: '96%',
      onTimeRate: '99.2%',
      lineItems: [
        { name: 'Contract Fulfillment Module', quantity: '100', price: `$${matchedQuote.unitPrice.toLocaleString()}`, total: `$${matchedQuote.totalQuote.toLocaleString()}` }
      ],
      timeline: [
        { date: 'Just now', title: 'Award Decided', description: `Sourcing team selected bid response from ${matchedQuote.vendorName}` }
      ]
    };
    setApprovals((prev) => [newApproval, ...prev]);

    // Add activity logger
    const activity: AppActivity = {
      id: 'ACT-A-' + Math.floor(Math.random() * 9000),
      type: 'System',
      title: 'Agreement Awarded',
      time: 'JUST NOW',
      description: `Contract awarded to ${matchedQuote.vendorName} for $${matchedQuote.totalQuote.toLocaleString()}. Approval dispatch initiated.`
    };
    setActivities((prev) => [activity, ...prev]);

    setScreen('approvals');
    setSelectedComparisonRfq(null);
  };

  const handleApproveSuccessLog = () => {
    const activity: AppActivity = {
      id: 'ACT-OK-' + Math.floor(Math.random() * 9000),
      type: 'PO',
      title: 'Approval Released',
      time: 'JUST NOW',
      description: 'Manager approved pending asset requisition and dispatched release triggers to legal billing.'
    };
    setActivities((prev) => [activity, ...prev]);
  };

  // Direct router links layout selectors
  const renderContainerScreen = () => {
    switch (screen) {
      case 'dashboard':
        return (
          <DashboardView 
            setScreen={setScreen} 
            activities={activities}
            onCreateRFQTrigger={() => setScreen('create-rfq')}
            onAddVendorTrigger={() => {
              setScreen('vendors');
              setAddVendorModalOpen(true);
            }}
          />
        );
      case 'vendors':
        return (
          <VendorsView 
            vendors={vendors} 
            setVendors={setVendors}
            onOpenVendorQuotes={(vId) => {
              // Open quotation comparison for the specific matched RFQ
              const matchedRfq = rfqs.find(r => r.id === 'RFQ-2024-089') || rfqs[0];
              setSelectedComparisonRfq(matchedRfq);
              setScreen('quotations');
            }}
            addVendorModalOpen={addVendorModalOpen}
            setAddVendorModalOpen={setAddVendorModalOpen}
          />
        );
      case 'create-rfq':
        return (
          <CreateRFQView 
            onLaunchRFQ={handleLaunchRFQ}
            onCancel={() => setScreen('rfqs')}
            vendors={vendors}
          />
        );
      case 'quotations':
        const activeRfq = selectedComparisonRfq || rfqs.find(r => r.id === 'RFQ-2024-089') || rfqs[0];
        const activeQuotes = quotations.filter(q => q.rfqId === activeRfq.id);
        return (
          <QuotationComparisonView 
            rfq={activeRfq}
            quotations={activeQuotes}
            onAwardRFQ={handleAwardRFQ}
            onBack={() => setScreen('rfqs')}
          />
        );
      case 'rfqs':
        return (
          <MyRFQsView 
            rfqs={rfqs} 
            vendors={vendors}
            onOpenComparison={(rfq) => {
              setSelectedComparisonRfq(rfq);
              setScreen('quotations');
            }}
            onSubmitMockQuote={handleSubmitMockQuote}
          />
        );
      case 'approvals':
        return (
          <PendingApprovalsView 
            approvals={approvals}
            setApprovals={setApprovals}
            onApproveSuccess={handleApproveSuccessLog}
          />
        );
      default:
        // Render simple fallback container as shown in design details (Purchase Orders, Invoices, Reports empty states)
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center select-text">
            <div className="h-20 w-20 bg-[#1d1f27] border border-[#434655] rounded-xl flex items-center justify-center mb-4">
              <span>📄</span>
            </div>
            <h3 className="text-base font-bold text-white mb-1 uppercase tracking-tight">{screen.replace('-', ' ')} Queue</h3>
            <p className="text-xs text-[#c3c6d7] max-w-sm leading-relaxed">
              This procurement ledger sub-screen is fully compliant but currently contains zero active alerts. Direct actions can be scheduled via RFQs or Vendors tabs above.
            </p>
            <button 
              onClick={() => setScreen('dashboard')}
              className="mt-6 px-4 py-2 bg-[#2563eb] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        );
    }
  };

  // Auth guard workflow checks
  if (!user) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex bg-[#11131b] text-[#e1e2ed] select-none h-screen w-screen overflow-hidden font-sans">
      {/* Global persistent Sidebar Navigation */}
      <Sidebar 
        currentScreen={screen} 
        setScreen={(scr) => {
          setScreen(scr);
          // Auto clear child selection state
          if (scr !== 'quotations') {
            setSelectedComparisonRfq(null);
          }
        }} 
        user={user}
        onLogout={handleLogout}
      />

      {/* Main workspace layout */}
      <div className="flex-grow flex flex-col min-w-0 h-full overflow-hidden">
        <Header 
          title={
            screen === 'dashboard' ? 'Executive Dashboard' :
            screen === 'vendors' ? 'Vendor Management' :
            screen === 'rfqs' ? 'RFQs Workspace' :
            screen === 'quotations' ? 'Quotation Comparison' :
            screen === 'approvals' ? 'Inbox Approvals' :
            screen.toUpperCase()
          }
          searchPlaceholder={`Search within ${screen.replace('-', ' ')}...`}
          searchVal={searchVal}
          onSearchChange={setSearchVal}
          user={user}
        />
        
        {/* Dynamic Inner views viewport with scroll constraints */}
        <div className="flex-1 overflow-hidden bg-[#11131b]">
          {renderContainerScreen()}
        </div>
      </div>
    </div>
  );
}
