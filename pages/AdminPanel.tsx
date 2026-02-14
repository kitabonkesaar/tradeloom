import React, { useState } from 'react';
import { useData } from '../DataContext';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Users, Key, Shield, ShieldCheck, LayoutDashboard, Menu, X, Check, XCircle, Trash2, Search, CreditCard, Lock, Send
} from 'lucide-react';
import { License, InvestorRequest } from '../types';

const AdminSidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) => {
  const location = useLocation();
  const links = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'License Management', path: '/admin/licenses', icon: Key },
    { name: 'Investor Requests', path: '/admin/investor-requests', icon: Lock },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Payments', path: '/admin/payments', icon: CreditCard },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 z-20 bg-gray-900 bg-opacity-75 lg:hidden transition-opacity ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform lg:translate-x-0 lg:static lg:inset-auto lg:h-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800">
          <span className="text-xl font-bold text-white tracking-tighter">ADMIN<span className="text-primary">PANEL</span></span>
          <button onClick={() => setIsOpen(false)} className="lg:hidden">
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>
        <nav className="mt-5 px-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path || (link.path !== '/admin' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`${isActive ? 'bg-primary/20 text-primary border-r-2 border-primary' : 'text-gray-400 hover:bg-slate-800 hover:text-white'} group flex items-center px-2 py-3 text-sm font-medium transition-colors`}
              >
                <Icon className={`${isActive ? 'text-primary' : 'text-gray-500 group-hover:text-gray-300'} mr-3 flex-shrink-0 h-5 w-5 transition-colors`} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

const AdminOverview = () => {
  const { users, licenses, payments, investorRequests } = useData();
  
  const totalRevenue = payments.reduce((acc, curr) => acc + curr.amount, 0);
  const pendingLicenses = licenses.filter(l => l.status === 'pending').length;
  const pendingInvestorRequests = investorRequests.filter(r => r.status === 'pending').length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">System Overview</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-primary p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
            <dd className="mt-1 text-3xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</dd>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-yellow-400 p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Pending Approvals</dt>
            <dd className="mt-1 text-3xl font-bold text-gray-900">{pendingLicenses}</dd>
        </div>
         <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-purple-400 p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Investor Requests</dt>
            <dd className="mt-1 text-3xl font-bold text-gray-900">{pendingInvestorRequests}</dd>
        </div>
         <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-blue-400 p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
            <dd className="mt-1 text-3xl font-bold text-gray-900">{users.length}</dd>
        </div>
      </div>
    </div>
  );
};

const LicenseManagement = () => {
  const { licenses, updateLicenseStatus, deleteLicense, users } = useData();
  const [filter, setFilter] = useState<'all' | 'pending' | 'active' | 'suspended'>('all');

  // Approval Modal State
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null);
  const [manualKey, setManualKey] = useState('');

  const filteredLicenses = licenses.filter(l => filter === 'all' ? true : l.status === filter);

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const openApprovalModal = (license: License) => {
      setSelectedLicense(license);
      setManualKey(''); 
      setIsApprovalModalOpen(true);
  };

  const closeApprovalModal = () => {
      setIsApprovalModalOpen(false);
      setSelectedLicense(null);
  };

  const handleConfirmApprove = (e: React.FormEvent) => {
      e.preventDefault();
      if (selectedLicense && manualKey.trim()) {
          updateLicenseStatus(selectedLicense.id, 'active', manualKey.trim());
          const user = users.find(u => u.id === selectedLicense.userId);
          // In a real app, this would trigger a backend email service
          alert(`License Approved!\n\nKey: ${manualKey.trim()}\n\nAn email with this key has been sent to ${user?.email || 'the user'}.`);
          closeApprovalModal();
      }
  };

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">License Management</h1>
        <div className="flex bg-white rounded-lg shadow-sm p-1 border border-gray-200">
            {['all', 'pending', 'active', 'suspended'].map((f) => (
                <button
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`px-4 py-2 text-sm font-medium rounded-md capitalize transition-colors ${filter === f ? 'bg-primary text-white shadow' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    {f}
                </button>
            ))}
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-100">
          <ul className="divide-y divide-gray-200">
            {filteredLicenses.map((license) => (
                <li key={license.id} className="p-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                             <div className="flex items-center space-x-3 mb-1">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide
                                  ${license.status === 'active' ? 'bg-green-100 text-green-800' : 
                                    license.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    license.status === 'suspended' ? 'bg-orange-100 text-orange-800' :
                                    'bg-red-100 text-red-800'}`}>
                                  {license.status}
                                </span>
                                <span className="text-sm text-gray-400">ID: {license.id}</span>
                             </div>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{getUserName(license.userId)}</p>
                                    <p className="text-sm text-gray-500 font-mono">{license.key}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Acc: <span className="font-mono text-gray-900">{license.mt5AccountId}</span></p>
                                    <p className="text-sm text-gray-500">Server: <span className="text-gray-900">{license.brokerServer}</span></p>
                                </div>
                             </div>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
                             {license.status === 'pending' && (
                                <>
                                    <button 
                                        onClick={() => openApprovalModal(license)}
                                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none shadow-sm"
                                    >
                                        <Check className="w-3 h-3 mr-1" /> Approve
                                    </button>
                                    <button 
                                        onClick={() => deleteLicense(license.id)}
                                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none shadow-sm"
                                    >
                                        <XCircle className="w-3 h-3 mr-1" /> Reject
                                    </button>
                                </>
                             )}
                             {license.status === 'active' && (
                                <button 
                                    onClick={() => updateLicenseStatus(license.id, 'suspended')}
                                    className="inline-flex items-center p-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                                    title="Suspend License"
                                >
                                    <Shield className="w-4 h-4 text-orange-500" />
                                </button>
                             )}
                             {license.status === 'suspended' && (
                                <button 
                                    onClick={() => updateLicenseStatus(license.id, 'active')}
                                    className="inline-flex items-center p-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                                    title="Unsuspend License"
                                >
                                    <ShieldCheck className="w-4 h-4 text-green-500" />
                                </button>
                             )}
                             <button 
                                onClick={() => deleteLicense(license.id)}
                                className="inline-flex items-center p-2 border border-transparent rounded-md text-red-600 hover:bg-red-50 focus:outline-none"
                                title="Delete"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </li>
            ))}
             {filteredLicenses.length === 0 && (
                <li className="p-8 text-center text-gray-500">No licenses found matching filter.</li>
            )}
          </ul>
      </div>

      {/* Approval Modal */}
      {isApprovalModalOpen && selectedLicense && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-sm" aria-hidden="true" onClick={closeApprovalModal}></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <form onSubmit={handleConfirmApprove}>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <Key className="h-6 w-6 text-green-600" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                        Approve License Request
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Please verify the details and paste the generated license key below.
                                        </p>
                                        <div className="mt-4 bg-gray-50 p-3 rounded-md border border-gray-200 text-sm">
                                            <p><strong>User:</strong> {getUserName(selectedLicense.userId)}</p>
                                            <p><strong>Broker Server:</strong> {selectedLicense.brokerServer}</p>
                                            <p><strong>Account ID:</strong> {selectedLicense.mt5AccountId}</p>
                                        </div>
                                        <div className="mt-4">
                                            <label htmlFor="licenseKey" className="block text-sm font-medium text-gray-700">License Key</label>
                                            <input
                                                type="text"
                                                name="licenseKey"
                                                id="licenseKey"
                                                className="mt-1 shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                                placeholder="Paste license key here..."
                                                value={manualKey}
                                                onChange={(e) => setManualKey(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Confirm & Send
                            </button>
                            <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={closeApprovalModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

const InvestorRequestsManagement = () => {
  const { investorRequests, resolveInvestorRequest } = useData();
  const [selectedReq, setSelectedReq] = useState<InvestorRequest | null>(null);
  const [investorId, setInvestorId] = useState('');
  const [investorPass, setInvestorPass] = useState('');

  const pendingRequests = investorRequests.filter(r => r.status === 'pending');
  const sentRequests = investorRequests.filter(r => r.status === 'sent');

  const openSendModal = (req: InvestorRequest) => {
    setSelectedReq(req);
    setInvestorId('');
    setInvestorPass('');
  };

  const closeSendModal = () => {
    setSelectedReq(null);
  };

  const handleSendCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedReq && investorId && investorPass) {
      resolveInvestorRequest(selectedReq.id);
      // Simulate Email Sending
      alert(`Email sent successfully to ${selectedReq.email}!\n\nInvestor ID: ${investorId}\nPassword: ${investorPass}`);
      closeSendModal();
    }
  };

  return (
    <div className="space-y-6">
       <h1 className="text-2xl font-bold text-gray-900">Investor Access Requests</h1>
       
       <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-100">
         <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Pending Requests</h3>
         </div>
         <ul className="divide-y divide-gray-200">
            {pendingRequests.map((req) => (
                <li key={req.id} className="px-4 py-4 sm:px-6 flex items-center justify-between hover:bg-gray-50">
                    <div>
                        <p className="text-sm font-medium text-primary">{req.email}</p>
                        <p className="text-xs text-gray-500">Requested: {req.date}</p>
                    </div>
                    <button 
                        onClick={() => openSendModal(req)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
                    >
                        <Send className="w-3 h-3 mr-1" /> Send Creds
                    </button>
                </li>
            ))}
            {pendingRequests.length === 0 && (
                <li className="px-4 py-8 text-center text-sm text-gray-500">No pending requests.</li>
            )}
         </ul>
       </div>

       <div className="bg-gray-50 shadow overflow-hidden sm:rounded-lg border border-gray-200 opacity-75">
         <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-700">History (Sent)</h3>
         </div>
         <ul className="divide-y divide-gray-200">
            {sentRequests.map((req) => (
                <li key={req.id} className="px-4 py-4 sm:px-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">{req.email}</p>
                        <p className="text-xs text-gray-400">Date: {req.date}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        SENT
                    </span>
                </li>
            ))}
         </ul>
       </div>

       {/* Send Credentials Modal */}
       {selectedReq && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-sm" onClick={closeSendModal}></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <form onSubmit={handleSendCredentials}>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <Lock className="h-6 w-6 text-indigo-600" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Send Investor Credentials
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500 mb-4">
                                            Enter the Investor Login ID and Password to send to <strong>{selectedReq.email}</strong>.
                                        </p>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Investor ID (Login)</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-2 focus:ring-primary focus:border-primary"
                                                    value={investorId}
                                                    onChange={(e) => setInvestorId(e.target.value)}
                                                    placeholder="e.g. 8829102"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Investor Password</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-2 focus:ring-primary focus:border-primary"
                                                    value={investorPass}
                                                    onChange={(e) => setInvestorPass(e.target.value)}
                                                    placeholder="e.g. inv_Pass123"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Send Email
                            </button>
                            <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={closeSendModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
       )}
    </div>
  );
};

const UserManagement = () => {
    const { users } = useData();
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">User Directory</h1>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">{user.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-full flex bg-gray-100" style={{minHeight: 'calc(100vh - 64px)'}}>
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="lg:hidden bg-white shadow-sm border-b border-gray-200 py-4 px-4">
             <button onClick={() => setSidebarOpen(true)} className="text-gray-500 focus:outline-none">
                 <Menu className="h-6 w-6" />
             </button>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/licenses" element={<LicenseManagement />} />
            <Route path="/investor-requests" element={<InvestorRequestsManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/payments" element={<div className="text-gray-500">Payment history table placeholder</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;