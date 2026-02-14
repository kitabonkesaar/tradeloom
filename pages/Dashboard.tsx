import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../App';
import { useData } from '../DataContext';
import { LayoutDashboard, Key, CreditCard, MessageSquare, Download, Copy, Menu, X, Server, Plus, Loader2 } from 'lucide-react';

const DashboardSidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) => {
  const location = useLocation();
  const links = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Licenses', path: '/dashboard/licenses', icon: Key },
    { name: 'Payments', path: '/dashboard/payments', icon: CreditCard },
    { name: 'Support', path: '/dashboard/support', icon: MessageSquare },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 z-20 bg-gray-600 bg-opacity-75 lg:hidden transition-opacity ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform lg:translate-x-0 lg:static lg:inset-auto lg:h-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 lg:hidden">
          <span className="text-xl font-bold text-gray-900">Menu</span>
          <button onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto pt-5 pb-4">
          <nav className="flex-1 px-4 space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path || (link.path !== '/dashboard' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`${isActive ? 'bg-violet-50 text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors`}
                >
                  <Icon className={`${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500'} mr-3 flex-shrink-0 h-5 w-5 transition-colors`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

const DashboardOverview = () => {
  const { user } = useAuth();
  const { licenses, payments } = useData();
  
  const userLicenses = licenses.filter(l => l.userId === user?.id);
  const activeLicenses = userLicenses.filter(l => l.status === 'active').length;
  const totalSpent = payments.filter(p => p.userId === user?.id).reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Active Licenses</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{activeLicenses}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
           <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Spent</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">₹{totalSpent.toLocaleString()}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
           <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Open Tickets</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">1</dd>
          </div>
        </div>
      </div>
    </div>
  );
};

const LicenseList = () => {
  const { user } = useAuth();
  const { licenses, addLicense, addPayment } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  
  const userLicenses = licenses.filter(l => l.userId === user?.id);

  const [formData, setFormData] = useState({
    serverName: '',
    accountId: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNewLicenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsPaymentProcessing(true);
    
    // Simulate payment and API call
    setTimeout(() => {
      const newLicense: any = {
        id: (Date.now()).toString(),
        userId: user.id,
        key: 'PENDING-APPROVAL',
        mt5AccountId: formData.accountId,
        brokerServer: formData.serverName,
        status: 'pending', // Pending approval
        createdDate: new Date().toISOString().split('T')[0],
        expiryDate: null,
      };
      
      const newPayment: any = {
          id: (Date.now() + 1).toString(),
          userId: user.id,
          transactionId: `pay_${Math.random().toString(36).substr(2, 9)}`,
          date: new Date().toISOString().split('T')[0],
          amount: 25000,
          product: 'New License Request',
          status: 'success'
      };

      addLicense(newLicense);
      addPayment(newPayment);

      setIsPaymentProcessing(false);
      setIsModalOpen(false);
      setFormData({ serverName: '', accountId: '', password: '' });
      alert('Payment successful! Your license request has been submitted for approval.');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">My Licenses</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          New License
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-100">
        <ul className="divide-y divide-gray-200">
          {userLicenses.map((license) => (
            <li key={license.id} className="p-4 sm:px-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3">
                    <p className="text-sm font-medium text-primary truncate font-mono">
                      {license.key}
                    </p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${license.status === 'active' ? 'bg-green-100 text-green-800' : 
                        license.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}>
                      {license.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500 mr-6">
                        <Server className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {license.brokerServer}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <Key className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        Account: {license.mt5AccountId}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0 flex space-x-2">
                  {license.status === 'active' && (
                    <button className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none transition-colors" title="Download Bot">
                        <Download className="h-4 w-4" />
                    </button>
                  )}
                    <button className="inline-flex items-center p-2 border border-gray-300 rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors" title="Copy Key">
                        <Copy className="h-4 w-4" />
                    </button>
                </div>
              </div>
            </li>
          ))}
          {userLicenses.length === 0 && (
            <li className="p-8 text-center text-gray-500">
              No licenses found. Click "New License" to get started.
            </li>
          )}
        </ul>
      </div>

      {/* New License Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-sm" aria-hidden="true" onClick={() => !isPaymentProcessing && setIsModalOpen(false)}></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="text-lg leading-6 font-bold text-gray-900" id="modal-title">
                                Purchase New License
                            </h3>
                            <button onClick={() => !isPaymentProcessing && setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500 disabled:opacity-50" disabled={isPaymentProcessing}>
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <form id="new-license-form" onSubmit={handleNewLicenseSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="serverName" className="block text-sm font-medium text-gray-700">Broker Server Name</label>
                                <input 
                                    type="text" 
                                    name="serverName"
                                    id="serverName" 
                                    required 
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    placeholder="e.g. Exness-MT5Real"
                                    value={formData.serverName}
                                    onChange={handleInputChange}
                                    disabled={isPaymentProcessing}
                                />
                            </div>
                            <div>
                                <label htmlFor="accountId" className="block text-sm font-medium text-gray-700">MT5 Account ID</label>
                                <input 
                                    type="text" 
                                    name="accountId"
                                    id="accountId" 
                                    required 
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    placeholder="e.g. 8829102"
                                    value={formData.accountId}
                                    onChange={handleInputChange}
                                    disabled={isPaymentProcessing}
                                />
                            </div>
                             <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Account Password (for verification)</label>
                                <input 
                                    type="password" 
                                    name="password"
                                    id="password" 
                                    required 
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    disabled={isPaymentProcessing}
                                />
                                <p className="mt-1 text-xs text-gray-500">We do not store your password. Used for initial validation only.</p>
                            </div>
                            
                            <div className="bg-violet-50 p-4 rounded-md mt-6 border border-violet-100">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">License Cost:</span>
                                    <span className="text-xl font-bold text-primary">₹25,000</span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button 
                            type="submit" 
                            form="new-license-form"
                            disabled={isPaymentProcessing}
                            className="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                        >
                            {isPaymentProcessing ? (
                                <>
                                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                                    Processing...
                                </>
                            ) : (
                                'Pay & Request'
                            )}
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setIsModalOpen(false)}
                            disabled={isPaymentProcessing}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

const PaymentHistory = () => {
    const { user } = useAuth();
    const { payments } = useData();
    const userPayments = payments.filter(p => p.userId === user?.id);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg border border-gray-100">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {userPayments.map((payment) => (
                                        <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.transactionId}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.product}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{payment.amount.toLocaleString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {payment.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {userPayments.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-gray-500 text-sm">No payment history found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Dashboard = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-full flex bg-gray-50" style={{minHeight: 'calc(100vh - 64px)'}}>
      <DashboardSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="lg:hidden bg-white shadow-sm border-b border-gray-200 py-4 px-4">
             <button onClick={() => setSidebarOpen(true)} className="text-gray-500 focus:outline-none">
                 <Menu className="h-6 w-6" />
             </button>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/licenses" element={<LicenseList />} />
            <Route path="/payments" element={<PaymentHistory />} />
            <Route path="/support" element={<div className="text-gray-500">Support ticket system placeholder.</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;