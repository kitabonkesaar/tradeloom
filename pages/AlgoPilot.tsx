import React, { useState } from 'react';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';
import { Check, Shield, Server, Zap, X, TrendingUp, Code } from 'lucide-react';

const AlgoPilot = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [mt5Id, setMt5Id] = useState('');
  const [server, setServer] = useState('');

  const handlePurchaseClick = () => {
    if (!user) {
      navigate('/login?redirect=/algopilot');
      return;
    }
    setIsModalOpen(true);
  };

  const handlePurchaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsModalOpen(false);
      navigate('/dashboard');
      alert('Purchase Successful! License generated.');
    }, 2000);
  };

  return (
    <div className="bg-white">
      {/* Product Hero */}
      <div className="pt-12 sm:pt-16 lg:pt-24">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-2 lg:max-w-none">
            <h2 className="text-lg leading-6 font-semibold text-gray-400 uppercase tracking-wider">Automated Trading Bot</h2>
            <p className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">AlgoPilot Gold</p>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mt-4">
                The ultimate XAUUSD scalping tool. Built for MetaTrader 5 with advanced risk management and news filtering.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing & Features */}
      <div className="mt-16 pb-12 sm:pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
                <div className="flex-1 bg-white px-6 py-8 lg:p-12">
                    <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Lifetime License</h3>
                    <p className="mt-6 text-base text-gray-500">
                        Get full access to AlgoPilot with a one-time payment. No monthly fees. Includes all future updates and support.
                    </p>
                    <div className="mt-8">
                        <div className="flex items-center">
                            <h4 className="flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-semibold uppercase text-primary">What's included</h4>
                            <div className="flex-1 border-t-2 border-gray-200"></div>
                        </div>
                        <ul className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
                            {['XAUUSD Optimized', 'Auto Risk Management', 'News Filter', 'Trailing Stop', 'Spread Protection', '24/7 Email Support'].map((feature) => (
                                <li key={feature} className="flex items-start lg:col-span-1">
                                    <div className="flex-shrink-0">
                                        <Check className="h-5 w-5 text-green-400" />
                                    </div>
                                    <p className="ml-3 text-sm text-gray-700">{feature}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                    <p className="text-lg leading-6 font-medium text-gray-900">One-time payment</p>
                    <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900">
                        <span>₹25,000</span>
                    </div>
                    <div className="mt-6">
                        <button onClick={handlePurchaseClick} className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-hover transition-colors">
                            {user ? 'Buy Now' : 'Login to Buy'}
                        </button>
                    </div>
                    <p className="mt-4 text-sm text-gray-500 font-medium">Secure payment via Razorpay</p>
                </div>
            </div>
        </div>
      </div>

      {/* Professional Services */}
      <div className="bg-gray-50 py-16 sm:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Additional Services</h2>
            <p className="mt-4 text-xl text-gray-500">Tailored solutions for investors and strategy developers.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Managed Account Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100 flex flex-col">
              <div className="p-8 flex-1">
                 <div className="flex items-center justify-center w-14 h-14 bg-indigo-50 rounded-2xl mb-6 text-primary">
                    <TrendingUp className="w-7 h-7" />
                 </div>
                 <h3 className="text-2xl font-bold text-gray-900">Managed Account Management Service</h3>
                 <p className="mt-4 text-gray-500 leading-relaxed">
                    Don't have the time to trade? Let our institutional-grade algorithms and professional risk managers handle your capital. We trade, you earn.
                 </p>
                 <div className="mt-8 border-t border-gray-100 pt-8">
                     <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Service Features</h4>
                     <ul className="space-y-4">
                        {['No Upfront Fees', '30-50% Profit Share (Performance Based)', 'Strict Risk Control (<15% Drawdown)', 'Verified Myfxbook Track Record'].map((item) => (
                            <li key={item} className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-3" />
                                <span className="text-gray-700 font-medium">{item}</span>
                            </li>
                        ))}
                     </ul>
                 </div>
              </div>
              <div className="bg-gray-50 p-6 border-t border-gray-100">
                 <div className="flex items-center justify-between mb-4">
                     <div>
                        <span className="text-xs font-bold text-gray-500 uppercase">Fee Structure</span>
                        <div className="text-lg font-bold text-gray-900">Performance Fee Only</div>
                     </div>
                 </div>
                 <button onClick={() => alert('Please contact support@tradeloom.com to apply for our Managed Account program.')} className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-900 font-bold hover:bg-gray-50 hover:text-primary transition-all">
                    Apply for Management
                 </button>
              </div>
            </div>

            {/* Custom Development Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100 flex flex-col">
              <div className="p-8 flex-1">
                 <div className="flex items-center justify-center w-14 h-14 bg-purple-50 rounded-2xl mb-6 text-purple-600">
                    <Code className="w-7 h-7" />
                 </div>
                 <h3 className="text-2xl font-bold text-gray-900">Custom AlgoBot Development Services</h3>
                 <p className="mt-4 text-gray-500 leading-relaxed">
                    Have a winning manual strategy? We transform your specific rules into a high-performance, bug-free Expert Advisor (EA) for MT4 or MT5.
                 </p>
                 <div className="mt-8 border-t border-gray-100 pt-8">
                     <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Development Scope</h4>
                     <ul className="space-y-4">
                        {['Professional MQL4 & MQL5 Programming', '99.9% Tick Data Backtesting & Optimization', 'Full Source Code Ownership', 'NDA Protection for Your Strategy'].map((item) => (
                            <li key={item} className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-3" />
                                <span className="text-gray-700 font-medium">{item}</span>
                            </li>
                        ))}
                     </ul>
                 </div>
              </div>
               <div className="bg-gray-50 p-6 border-t border-gray-100">
                 <div className="flex items-center justify-between mb-4">
                     <div>
                        <span className="text-xs font-bold text-gray-500 uppercase">Starting From</span>
                        <div className="text-lg font-bold text-gray-900">$500 / Project</div>
                     </div>
                 </div>
                 <button onClick={() => alert('Please send your strategy requirements to dev@tradeloom.com for a quote.')} className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-900 font-bold hover:bg-gray-50 hover:text-purple-600 transition-all">
                    Request a Quote
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* Specs */}
       <div className="bg-gray-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-2xl font-bold mb-8 text-center">Technical Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-gray-800 rounded-lg">
                        <Server className="w-8 h-8 mx-auto text-secondary mb-4" />
                        <h4 className="text-lg font-bold mb-2">Platform</h4>
                        <p className="text-gray-400">MetaTrader 5 (Desktop)</p>
                    </div>
                    <div className="p-6 bg-gray-800 rounded-lg">
                        <Shield className="w-8 h-8 mx-auto text-secondary mb-4" />
                        <h4 className="text-lg font-bold mb-2">Account Type</h4>
                        <p className="text-gray-400">ECN or Raw Spread (Low Spread)</p>
                    </div>
                    <div className="p-6 bg-gray-800 rounded-lg">
                        <Zap className="w-8 h-8 mx-auto text-secondary mb-4" />
                        <h4 className="text-lg font-bold mb-2">Min Deposit</h4>
                        <p className="text-gray-400">$1000 Recommended</p>
                    </div>
                </div>
            </div>
       </div>

       {/* Purchase Modal */}
       {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsModalOpen(false)}></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="text-lg leading-6 font-bold text-gray-900" id="modal-title">
                                Purchase AlgoPilot License
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <form id="purchase-form" onSubmit={handlePurchaseSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="mt5Id" className="block text-sm font-medium text-gray-700">MT5 Account ID</label>
                                <input 
                                    type="text" 
                                    name="mt5Id"
                                    id="mt5Id" 
                                    required 
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    placeholder="e.g. 8829102"
                                    value={mt5Id}
                                    onChange={(e) => setMt5Id(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="server" className="block text-sm font-medium text-gray-700">Broker Server Name</label>
                                <input 
                                    type="text" 
                                    name="server"
                                    id="server" 
                                    required 
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    placeholder="e.g. Exness-MT5Real"
                                    value={server}
                                    onChange={(e) => setServer(e.target.value)}
                                />
                            </div>
                            
                            <div className="bg-violet-50 p-4 rounded-md mt-6 border border-violet-100">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">Total:</span>
                                    <span className="text-xl font-bold text-primary">₹25,000</span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button 
                            type="submit" 
                            form="purchase-form"
                            disabled={isLoading}
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                        >
                            {isLoading ? 'Processing...' : 'Pay & Subscribe'}
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setIsModalOpen(false)}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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

export default AlgoPilot;