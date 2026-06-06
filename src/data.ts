/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Vendor, RFQ, RFQStatus, Quotation, Approval, AppActivity } from './types';

export const INITIAL_VENDORS: Vendor[] = [
  {
    id: 'V1',
    name: 'Starlight Systems',
    subtitle: 'Primary Software Partner',
    category: 'Software',
    gstNumber: '29AAAAA0000A1Z5',
    status: 'Active',
    rating: 5,
    onTimeRate: 98.4,
    qualityScore: 97.2,
    avatarText: 'S',
    projectsCount: 45
  },
  {
    id: 'V2',
    name: 'Nexus Logistics',
    subtitle: 'Tier 2 Supplier',
    category: 'Logistics',
    gstNumber: '27BBBBB1111B1Z2',
    status: 'Active',
    rating: 4,
    onTimeRate: 99.2,
    qualityScore: 96.0,
    avatarText: 'N',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeKyGzfKAq2aBTeMfNdEfFTcoiNGBEEbk2v9DbOVxWY4JDmpXhbGpY_q4tTfskQ4tq0YP2KRB95qZi6K08J46baxmVI8kbbDFX4DgKfa-en46mDJ_1iIJ5r5ob4ESyFaQtOjy5FSBYPPubI_Z7Cx2BLdG3UGPEpdNK6TOR10XN7t5wOZ6lQj_0zOx1JKGTqXdEt8Uw_Ug8LAO-mKkzfssbVXDY9rk6P9pfYF6ZzPqOyr4LBHqmPKyt5BpkhaTBmJJKXds_wr_FZ_0',
    projectsCount: 124
  },
  {
    id: 'V3',
    name: 'Quantum Hardware',
    subtitle: 'Internal Infrastructure',
    category: 'Hardware',
    gstNumber: '06CCCCC2222C3Z1',
    status: 'Inactive',
    rating: 3.5,
    onTimeRate: 88.5,
    qualityScore: 91.2,
    avatarText: 'Q',
    projectsCount: 18
  },
  {
    id: 'V4',
    name: 'Titan Freight',
    subtitle: 'Global Shipping',
    category: 'Logistics',
    gstNumber: '12DDDDD4444D9Z8',
    status: 'Active',
    rating: 3,
    onTimeRate: 94.2,
    qualityScore: 89.0,
    avatarText: 'T',
    projectsCount: 62
  }
];

export const INITIAL_RFQS: RFQ[] = [
  {
    id: 'RFQ-2023-0892',
    title: 'High-Precision Industrial Sensors',
    category: 'Electronics & Tech',
    description: 'Procurement of advanced optical and thermal sensors for automation line telemetry.',
    dueDate: 'Oct 24, 2023',
    itemsCount: '12 Units',
    status: RFQStatus.Pending,
    submissionDeadline: '2023-10-24',
    currency: 'USD - US Dollar',
    lineItems: [
      { id: '1', name: 'Optical Telemetry Array', quantity: 6, unit: 'Units' },
      { id: '2', name: 'Thermal Variance Calibrator', quantity: 6, unit: 'Units' }
    ],
    selectedVendors: ['V1', 'V2', 'V3']
  },
  {
    id: 'RFQ-2023-0412',
    title: 'Ergonomic Workstation Upgrade',
    category: 'Office Supplies',
    description: 'Standardizing ergonomics across headquarters with professional active desks.',
    dueDate: 'Oct 12, 2023',
    itemsCount: '45 Units',
    status: RFQStatus.Submitted,
    submissionDeadline: '2023-10-12',
    currency: 'USD - US Dollar',
    lineItems: [
      { id: '1', name: 'Active Standing Desk Pro', quantity: 45, unit: 'Units' }
    ],
    selectedVendors: ['V1', 'V4'],
    submittedAt: 'Oct 12, 2023',
    totalQuote: 14200.00
  },
  {
    id: 'RFQ-2024-089',
    title: 'Precision Heavy Machine Components',
    category: 'Logistics / Manufacturing',
    description: 'Bulk order for heavy duty industrial components',
    dueDate: 'Nov 18, 2024',
    itemsCount: '100 Units',
    status: RFQStatus.Submitted,
    submissionDeadline: '2024-11-18',
    currency: 'USD - US Dollar',
    lineItems: [
      { id: '1', name: 'Enterprise Laptop - Model X', quantity: 50, unit: 'Units' },
      { id: '2', name: 'Docking Station - Type C', quantity: 50, unit: 'Units' }
    ],
    selectedVendors: ['V2', 'V4']
  }
];

export const INITIAL_QUOTATIONS: Quotation[] = [
  {
    id: 'Q1',
    rfqId: 'RFQ-2024-089',
    vendorId: 'V1',
    vendorName: 'Global Parts Hub',
    unitPrice: 1420.00,
    totalQuote: 142000.00,
    deliveryDays: 14,
    paymentTerms: 'Net 30',
    shippingMethod: 'Sea Freight',
    rating: 4.2,
    isBestPrice: true,
    warrantyPeriod: '12 Months',
    isoCertified: true,
    customsClearance: false
  },
  {
    id: 'Q2',
    rfqId: 'RFQ-2024-089',
    vendorId: 'V2',
    vendorName: 'Titan Logistics Co.',
    unitPrice: 1485.00,
    totalQuote: 148500.00,
    deliveryDays: 8,
    paymentTerms: 'Net 45',
    shippingMethod: 'Air Express',
    rating: 4.8,
    isBalanced: true,
    warrantyPeriod: '24 Months', // Best warranty
    isoCertified: true,
    customsClearance: true
  },
  {
    id: 'Q3',
    rfqId: 'RFQ-2024-089',
    vendorId: 'V3',
    vendorName: 'SwiftSupply Solutions',
    unitPrice: 1620.00,
    totalQuote: 162000.00,
    deliveryDays: 3,
    paymentTerms: 'COD',
    shippingMethod: 'Next-Day Courier',
    rating: 3.9,
    isFastest: true,
    warrantyPeriod: '6 Months',
    isoCertified: true,
    customsClearance: true
  }
];

export const INITIAL_APPROVALS: Approval[] = [
  {
    id: 'QT-8802',
    type: 'QT',
    timeLabel: '2h ago',
    title: 'Industrial Cooling System Refurbishment',
    vendorName: 'Nexus Dynamics Ltd.',
    amount: 142500.00,
    urgency: 'Within Budget',
    status: 'Pending',
    category: 'Industrial',
    qualityScore: '96%',
    onTimeRate: '99.2%',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeKyGzfKAq2aBTeMfNdEfFTcoiNGBEEbk2v9DbOVxWY4JDmpXhbGpY_q4tTfskQ4tq0YP2KRB95qZi6K08J46baxmVI8kbbDFX4DgKfa-en46mDJ_1iIJ5r5ob4ESyFaQtOjy5FSBYPPubI_Z7Cx2BLdG3UGPEpdNK6TOR10XN7t5wOZ6lQj_0zOx1JKGTqXdEt8Uw_Ug8LAO-mKkzfssbVXDY9rk6P9pfYF6ZzPqOyr4LBHqmPKyt5BpkhaTBmJJKXds_wr_FZ_0',
    lineItems: [
      { name: 'Compressor Unit Z-40', quantity: '02', price: '$45,000.00', total: '$90,000.00' },
      { name: 'Thermostat Cluster', quantity: '15', price: '$1,500.00', total: '$22,500.00' },
      { name: 'Installation & Testing', quantity: '01', price: '$30,000.00', total: '$30,000.00' }
    ],
    timeline: [
      { date: 'Aug 24, 09:12 AM', title: 'Final Quotation Received', description: 'Nexus Dynamics submitted revised pricing after negotiations.' },
      { date: 'Aug 22, 02:30 PM', title: 'Negotiation Opened', description: 'Initial quote of $155,000 rejected by System. Negotiation initiated.' },
      { date: 'Aug 20, 10:00 AM', title: 'RFQ Published', description: 'Strategic sourcing request sent to 5 preferred vendors.' }
    ]
  },
  {
    id: 'PO-4412',
    type: 'PO',
    timeLabel: '5h ago',
    title: 'Raw Materials (Tier 1)',
    vendorName: 'AeroSteel Solutions',
    amount: 28900.00,
    urgency: 'High Urgency',
    status: 'Pending',
    category: 'Materials',
    qualityScore: '94%',
    onTimeRate: '98.0%',
    lineItems: [
      { name: 'Structural Steel Beams', quantity: '100', price: '$220.00', total: '$22,000.00' },
      { name: 'Reinforcement Carbon Rods', quantity: '50', price: '$138.00', total: '$6,900.00' }
    ],
    timeline: [
      { date: 'Aug 24, 04:10 PM', title: 'PO Generated', description: 'Procurement team drafted purchase agreement PO-4412.' },
      { date: 'Aug 23, 11:00 AM', title: 'RFQ Finished', description: 'RFQ #2243 finalized with AeroSteel winning with best delivery time.' }
    ]
  },
  {
    id: 'QT-8795',
    type: 'QT',
    timeLabel: '1d ago',
    title: 'Server Rack Upgrade',
    vendorName: 'Global Tech Infra',
    amount: 64000.00,
    urgency: 'Review Needed',
    status: 'Pending',
    category: 'Infrastructure',
    qualityScore: '92%',
    onTimeRate: '94.5%',
    lineItems: [
      { name: 'Hyperscale Server Rack Cabinet', quantity: '04', price: '$12,500.00', total: '$50,000.00' },
      { name: 'Cat6a Shielded Cabling Bundles', quantity: '10', price: '$1,400.00', total: '$14,000.00' }
    ],
    timeline: [
      { date: 'Aug 23, 09:00 AM', title: 'Quotation Submitted', description: 'Global Tech Infra response received under initial pricing framework.' }
    ]
  }
];

export const INITIAL_ACTIVITIES: AppActivity[] = [
  {
    id: 'A1',
    type: 'RFQ',
    title: 'RFQ Created',
    time: '10:42 AM',
    description: 'RFQ #4902 for Precision Fasteners sent to 5 vendors.'
  },
  {
    id: 'A2',
    type: 'Quote',
    title: 'New Quotation Received',
    time: '09:15 AM',
    description: 'Global Dynamics submitted a quote for $12,400.00.'
  },
  {
    id: 'A3',
    type: 'PO',
    title: 'PO Approved',
    time: 'YESTERDAY',
    description: 'PO #8821 for Logistics was approved by Sarah Miller.'
  }
];

export const PROFILE_IMAGES = {
  alexChen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR75cb8_87hkVGP2Ix6_0sns0mkDJwNtT-8eUI3xwgJPXxvk5GGW7wy0pNxqKVYa9eL2ChTF-j4J-lTDyA-u0fGvJczqfQZ_GX3EP7bWnlk_3Ci2t1goh3HxJyosT5kCDb9Rv0ep8ZMBuQtc46ktRgpfAC_QM1nDUkY-5pJlnSY6MZJzlAsP4dqBAolh4gROdEAr-JYrJcHm03LrpH0OqKXZnVFDtIYusngOnZr0yoGraOvc1s746Et_m9VVthrdTrZ-IzA-qlYvk',
  officer: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArDdfKGsYx5bLZOfrvrnFxlX6IXPZ6XXbVr929zYcAbl-HWuB0G1Bt9gq4D-QrUeVjo5uLOyUjdZMfVodw6NN15AO_U7ycQInZctWXxbQ2yKLYNTX9_Bo1mBaZtCh_QYwpB6VoXHPt-A8ujd4FJEGMMEajYcVSAETA6IaGcM4T9V4VZopL0xUOuFkzf83vX09CgxqZunZWPs8sQ3v0_uB2Mn1MzcPOJBVfB1kG63nAhcSwdJBqFLnlSh-CP0kX5MKX7iWnnbs017Y',
  alexRivera: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMkMNEgc4LMMsN45ns3NGzcdy9hddoz8rtC09xc4CkI-ID4RcOQ6DUNwzKaLCjs4Oh6aLB76TrE7giN8boG-2WP8aKSUdJ-7x3W8W20C147w160JV7QZ5DMR01xJvHkKpU4kfCEvum1jdMbZQ_Bm8U3xkkSmZ8wTLgf35fwnEqDkjb-Suh3nAGbKUXA_HTt5vgNYMNmuU5uBQ-Vmpj6c8hKEIqkVAEDqz1O5ILH0ZCXecjIqC5RQye3PZHsuwc0_i4TjgeBgeYF4E',
  defaultCompare: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT1_zZaRqBtyKic64XOBvRlRx9QydOmO9si_mMogUvzj4S1c1OPDdWC2fA4U8fgc7BEhJuGWgVmS0_TSbMLT9HE5SiczXMCWVGPT3m82hw2Q1RXaAxExSjsIKzr0pYuYqjbuxAe-pIa1NWOMwJ0CKP2kYWDKMie-CygZOM54ntgca46CT9KDxgUxfBP_yklRl52pH1lQUxjCDP6Q8130s8DjJK6WGH2ixHP7XHY7TxciZwxfrrfify8WzlRAwgSRnzIFCsw_lpRGc',
  glowBg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZskpb3MtADXp7qNHR2qqknkB9DuZ1IxJ_hvjM67C8Jozk8m7y-Z1alHylgD81enyfIye-Jsr4xbu03cZG8XvsA1GiG1pkfKDWZxn0HHllzlutuM6TAOBSKqs1wnhZJR82emT0kHcpddQRg9vfQGIWt4guQYYff31-1wTUxc-AQz8DzW-7ffp1IbVNTb0DQpXkZXWJ3GMSb64kodrqln4x_J4CnuOao6I5MBHX8Iy4cRvO0Udv4kAEiXegXI_GENi8tLuwMYChiyA',
  marcusChen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEDC2z9rxdk0Cqkf710xgSO6KxxF7y1QvNtzhtdwmnXbjwApbv2DyM-5qhniZzq7jPgqYSNb8Qam2WMIoKZWdvGjB73v8Di_sU-Vq5db15cCZI3QHmp7U9HfZZzdkjPBZepJ4jfT2hrbkqjsHAyxFiq5EsAwcHC-kBnb4VIJwo8d5gXNZBnZg2V52iv18wbAt_5O4ZMmDyjzo7tsBFA9ZBnoPKdvkdS8GshNJ6B3sWkl7lTP4Gz75VGnjEc1p4m-Dj1UwTAazdRq0',
  emptyState: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArpYZdcaXxfktNQLs33uPgZQPiHrMXRsK2_sZpGOSJ24lrQkuae0bv4y864nocRE1BzrdQGhCbn7VRpca6lCcAn-QIV3ViazQNtFfxCa8eTzRB2vDIAsPBKiJBw8eLjr6HybectAS4rSXjKr1H69z6rRsAsHMa3wzZojQmblUX9kq-nxinXMhjtGTWlVV0cV-zVNzN408PxMtfJAQS_dE367K4Mdcslb1-l4P6bQGPt4Rk424cSvCdYFxLAu7xypgcKBiWNmEZWv8',
  bentoAbstract: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAP-hA4QgHCMvIT7K5zYFHhko_NCJkipbyV58gVXIOffTEwoRh20foxLNGH44oF_a_0JxjTLV-GZb8gP6G2rU2jL3uEC2Fb8qChQjEQmPZMBANegWwH56WxeZCwcqL2RTUCRmoiCdLvUcUwSbKfh1bOuoJ3JZFt051PJ_xb_4fNrhOqNgC0eZ-BE5ysU8CLJ17uAdKt5Ys0-tCNJmNDED5Jd6gAFfy_YKYq--bInAI77oC7tsiHCBuNzd-HBK2J3sLOyK-CZ8T6Yhk',
  marcusChenLarge: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQ4dhIAK2wojpnHughX3SFwiCldfQna7vaQVKYfVCa-WUKmGE4PWYAX9cBqD0njduRL2gXdYgqD5cue2IXSgZ-bSMVUF82yUhQdX5pr_3VJ4iS2tB7z1ZYkFA2ESEsxTc06j1trtJQagEoTapQx2wfgMmQmuOUN6uR3pk0STcqCQInN0C9_Y8XXH_pK72iOhcJgj-oCjHoj7JxCxXjmikZEu-hXiRaRNXNm519ORYO0QDtYgEk1DXJkYa7bpNForoh2-MeY_8mVOM'
};
