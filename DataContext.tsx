import React, { createContext, useContext, useState } from 'react';
import { User, License, Payment, SupportTicket, InvestorRequest } from './types';
import { MOCK_LICENSES, MOCK_PAYMENTS, MOCK_TICKETS } from './constants';

const MOCK_USERS: User[] = [
  { id: '1', name: 'Demo Trader', email: 'user@demo.com', role: 'user' },
  { id: '2', name: 'System Admin', email: 'admin@tradeloom.com', role: 'admin' },
];

interface DataContextType {
  users: User[];
  licenses: License[];
  payments: Payment[];
  tickets: SupportTicket[];
  investorRequests: InvestorRequest[];
  addUser: (user: User) => void;
  addLicense: (license: License) => void;
  updateLicenseStatus: (id: string, status: License['status'], newKey?: string) => void;
  deleteLicense: (id: string) => void;
  addPayment: (payment: Payment) => void;
  addInvestorRequest: (req: InvestorRequest) => void;
  resolveInvestorRequest: (id: string) => void;
}

const DataContext = createContext<DataContextType>(null!);

export const useData = () => useContext(DataContext);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [licenses, setLicenses] = useState<License[]>(MOCK_LICENSES);
  const [payments, setPayments] = useState<Payment[]>(MOCK_PAYMENTS);
  const [tickets, setTickets] = useState<SupportTicket[]>(MOCK_TICKETS);
  const [investorRequests, setInvestorRequests] = useState<InvestorRequest[]>([]);

  const addUser = (user: User) => setUsers(prev => [...prev, user]);
  
  const addLicense = (license: License) => setLicenses(prev => [license, ...prev]);
  
  const updateLicenseStatus = (id: string, status: License['status'], newKey?: string) => {
    setLicenses(prev => prev.map(l => l.id === id ? { ...l, status, key: newKey || l.key } : l));
  };

  const deleteLicense = (id: string) => {
    setLicenses(prev => prev.filter(l => l.id !== id));
  };

  const addPayment = (payment: Payment) => setPayments(prev => [payment, ...prev]);

  const addInvestorRequest = (req: InvestorRequest) => setInvestorRequests(prev => [req, ...prev]);

  const resolveInvestorRequest = (id: string) => {
    setInvestorRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'sent' } : r));
  };

  return (
    <DataContext.Provider value={{ 
      users, 
      licenses, 
      payments, 
      tickets, 
      investorRequests,
      addUser, 
      addLicense, 
      updateLicenseStatus, 
      deleteLicense, 
      addPayment,
      addInvestorRequest,
      resolveInvestorRequest
    }}>
      {children}
    </DataContext.Provider>
  );
};