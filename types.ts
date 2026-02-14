export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface License {
  id: string;
  userId: string;
  key: string;
  mt5AccountId: string;
  brokerServer: string;
  status: 'active' | 'expired' | 'suspended' | 'pending';
  createdDate: string;
  expiryDate: string | null;
}

export interface Payment {
  id: string;
  userId: string;
  transactionId: string;
  date: string;
  amount: number;
  product: string;
  status: 'success' | 'pending' | 'failed';
}

export interface PerformanceDataPoint {
  date: string;
  equity: number;
  balance: number;
}

export interface SupportTicket {
  id: string;
  userId?: string;
  subject: string;
  status: 'open' | 'resolved' | 'closed';
  date: string;
}

export interface InvestorRequest {
  id: string;
  email: string;
  status: 'pending' | 'sent';
  date: string;
}