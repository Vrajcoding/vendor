/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum RFQStatus {
  Pending = 'Pending',
  Submitted = 'Submitted',
  Awarded = 'Awarded',
}

export interface LineItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface RFQ {
  id: string;
  title: string;
  category: string;
  description: string;
  dueDate: string;
  itemsCount: string;
  status: RFQStatus;
  submissionDeadline: string;
  currency: string;
  lineItems: LineItem[];
  selectedVendors: string[]; // Vendor IDs
  submittedAt?: string;
  totalQuote?: number;
}

export interface Vendor {
  id: string;
  name: string;
  subtitle: string;
  category: 'Software' | 'Hardware' | 'Logistics';
  gstNumber: string;
  status: 'Active' | 'Inactive';
  rating: number; // 1-5
  onTimeRate: number; // percentage
  qualityScore: number; // percentage
  avatarText: string;
  logoUrl?: string;
  projectsCount?: number;
}

export interface Quotation {
  id: string;
  rfqId: string;
  vendorId: string;
  vendorName: string;
  unitPrice: number;
  totalQuote: number;
  deliveryDays: number;
  paymentTerms: string;
  shippingMethod: string;
  rating: number;
  isBestPrice?: boolean;
  isBalanced?: boolean;
  isFastest?: boolean;
  warrantyPeriod: string;
  isoCertified: boolean;
  customsClearance: boolean;
}

export interface Approval {
  id: string; // e.g. QT-8802 or PO-4412
  type: 'QT' | 'PO';
  timeLabel: string;
  title: string;
  vendorName: string;
  amount: number;
  urgency: string; // 'High Urgency', 'Review Needed', 'Within Budget'
  status: 'Pending' | 'Approved' | 'Rejected';
  category: string;
  qualityScore: string;
  onTimeRate: string;
  lineItems: { name: string; quantity: string; price: string; total: string }[];
  timeline: { date: string; title: string; description: string }[];
  remarks?: string;
  logoUrl?: string;
}

export interface AppActivity {
  id: string;
  type: 'RFQ' | 'Quote' | 'PO' | 'System';
  title: string;
  time: string;
  description: string;
}

export type ScreenType =
  | 'login'
  | 'dashboard'
  | 'vendors'
  | 'rfqs'
  | 'create-rfq'
  | 'quotations'
  | 'approvals'
  | 'purchase-orders'
  | 'invoices'
  | 'reports';
