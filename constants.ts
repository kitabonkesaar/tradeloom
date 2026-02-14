import { License, Payment, PerformanceDataPoint, SupportTicket } from './types';

export const MOCK_LICENSES: License[] = [
  {
    id: '1',
    userId: '1',
    key: 'TRADL-A7K9-M2P3-X8Q1-B5N4',
    mt5AccountId: '8829102',
    brokerServer: 'Exness-MT5Real',
    status: 'active',
    createdDate: '2025-11-15',
    expiryDate: null,
  },
  {
    id: '2',
    userId: '1',
    key: 'TRADL-X9L2-P4M1-Q5Z9-R8T2',
    mt5AccountId: '1029384',
    brokerServer: 'ICMarkets-SC',
    status: 'expired',
    createdDate: '2024-05-10',
    expiryDate: '2025-05-10',
  }
];

export const MOCK_PAYMENTS: Payment[] = [
  {
    id: '1',
    userId: '1',
    transactionId: 'pay_H92k391l2k',
    date: '2025-11-15',
    amount: 25000,
    product: 'AlgoPilot License',
    status: 'success',
  },
  {
    id: '2',
    userId: '1',
    transactionId: 'pay_J291k02931',
    date: '2024-05-10',
    amount: 25000,
    product: 'AlgoPilot License',
    status: 'success',
  }
];

export const MOCK_TICKETS: SupportTicket[] = [
  { id: '101', userId: '1', subject: 'Setup assistance needed', status: 'resolved', date: '2025-11-16' },
  { id: '104', userId: '1', subject: 'VPS Configuration', status: 'open', date: '2026-02-10' },
];

export const PERFORMANCE_DATA: PerformanceDataPoint[] = Array.from({ length: 90 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (90 - i));
  const baseEquity = 10000;
  const growth = i * 50 + (Math.random() * 200 - 100);
  return {
    date: date.toISOString().split('T')[0],
    equity: baseEquity + growth,
    balance: baseEquity + (i * 45),
  };
});