import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PERFORMANCE_DATA } from '../constants';
import { ArrowUpRight, TrendingUp, Clock, Activity } from 'lucide-react';

const Performance = () => {
  const currentROI = 145.2;
  const drawdown = 8.5;
  const winRate = 68;

  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-black sm:text-4xl">Live Performance</h1>
          <p className="mt-4 text-xl text-gray-500">Real-time tracking of our Master Account.</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-12">
          <div className="bg-white border border-gray-200 overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total ROI</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">+{currentROI}%</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Activity className="h-6 w-6 text-red-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Max Drawdown</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{drawdown}%</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Win Rate</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{winRate}%</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm mb-12">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Equity Curve (Last 90 Days)</h3>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={PERFORMANCE_DATA}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, {month:'short', day:'numeric'})}
                    stroke="#9CA3AF"
                    tick={{fontSize: 12}}
                />
                <YAxis 
                    stroke="#9CA3AF"
                    tick={{fontSize: 12}}
                    domain={['auto', 'auto']}
                />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                    itemStyle={{ color: '#111827' }}
                />
                <Legend />
                <Line 
                    type="monotone" 
                    dataKey="equity" 
                    name="Equity" 
                    stroke="#7C3AED" 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 6 }} 
                />
                <Line 
                    type="monotone" 
                    dataKey="balance" 
                    name="Balance" 
                    stroke="#000000" 
                    strokeWidth={2} 
                    dot={false} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Investor ID Access */}
        <div className="bg-black rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block">Verify yourself.</span>
                <span className="block text-primary">Get Investor Access.</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-300">
                Don't just take our word for it. Request read-only Investor Password access to our live Master Account and verify every trade on your own MT5 terminal.
              </p>
            </div>
          </div>
          <div className="relative flex items-center p-6 lg:p-10">
              <form className="w-full bg-white p-6 rounded-lg" onSubmit={(e) => { e.preventDefault(); alert('Investor details sent to your email!'); }}>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Request Access</h3>
                  <div className="space-y-4">
                      <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                          <input type="email" id="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="you@example.com" />
                      </div>
                      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                          Send Investor ID
                      </button>
                      <p className="text-xs text-gray-500 text-center">We respect your privacy. No spam.</p>
                  </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;