import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Cpu,
  Globe,
  TrendingUp,
  Activity,
  CheckCircle2,
  Lock
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="group relative p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:border-violet-200 transition-all duration-300">
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon className="w-24 h-24 text-primary" />
    </div>
    <div className="w-14 h-14 bg-violet-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 text-primary">
      <Icon className="w-7 h-7" />
    </div>
    <h3 className="text-xl font-bold text-black mb-3 font-sans">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{description}</p>
    <div className="mt-6 flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
      Learn more <ArrowRight className="w-4 h-4 ml-2" />
    </div>
  </div>
);

const StatItem = ({ label, value, subtext }: { label: string, value: string, subtext: string }) => (
  <div className="flex flex-col p-6 bg-dark-surface backdrop-blur-sm rounded-2xl border border-dark-border hover:border-primary/30 transition-colors">
    <dt className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-2">{label}</dt>
    <dd className="text-4xl font-mono font-bold text-white mb-2">{value}</dd>
    <span className="text-xs text-gray-500">{subtext}</span>
  </div>
);

const Home = () => {
  return (
    <div className="font-sans antialiased selection:bg-violet-200 selection:text-violet-900">
      {/* Hero Section */}
      <div className="relative bg-black overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-900/20 rounded-full blur-[120px] opacity-60"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[100px]"></div>
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="relative max-w-7xl mx-auto pt-20 pb-24 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 text-center lg:text-left z-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-violet-200 text-sm font-medium mb-8 backdrop-blur-md">
              <span className="flex h-2 w-2 relative mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              AlgoPilot v2.5 is now live
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Master the Market <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-white">With Precision.</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
              Algorithmic trading infrastructure designed for performance. 
              Zero emotion. Microsecond execution. Pure mathematics.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/algopilot" className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-white hover:text-primary text-white font-bold rounded-lg transition-all flex items-center justify-center">
                <Zap className="w-5 h-5 mr-2" />
                Start Automating
              </Link>
              <Link to="/performance" className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 text-white font-semibold rounded-lg border border-white/20 transition-all flex items-center justify-center">
                <Activity className="w-5 h-5 mr-2" />
                Live Track Record
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-500">
                <div className="flex items-center"><ShieldCheck className="w-4 h-4 mr-2 text-violet-500"/> Verified by Myfxbook</div>
                <div className="flex items-center"><Globe className="w-4 h-4 mr-2 text-violet-500"/> Low Latency VPS</div>
            </div>
          </div>

          <div className="lg:w-1/2 mt-16 lg:mt-0 relative">
             {/* Mock UI for Hero */}
             <div className="relative rounded-lg bg-dark-surface border border-dark-border shadow-2xl overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500 group">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 to-transparent"></div>
                <img 
                    src="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                    alt="Dashboard Preview" 
                    className="relative w-full h-auto opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Floating Cards */}
                <div className="absolute top-10 right-10 bg-black/80 backdrop-blur-xl p-6 rounded-lg border border-white/10 shadow-2xl max-w-xs animate-pulse">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs text-gray-400 font-mono">XAUUSD</span>
                        <span className="text-xs text-violet-400 font-bold font-mono">+1.24%</span>
                    </div>
                    <div className="text-3xl font-mono font-bold text-white tracking-tighter">$2,450.50</div>
                </div>

                <div className="absolute bottom-10 left-10 bg-white p-5 rounded-lg shadow-xl max-w-xs transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-violet-400" />
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 font-bold uppercase">Daily Profit</div>
                            <div className="text-xl font-bold text-black">+$1,240.00</div>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="border-y border-white/5 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatItem label="Total Volume" value="$145M+" subtext="Processed across all nodes" />
                    <StatItem label="Win Rate" value="68.4%" subtext="12-month average" />
                    <StatItem label="Active Users" value="850+" subtext="Global trading community" />
                </div>
            </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold text-violet-600 tracking-widest uppercase mb-3">Our Expertise</h2>
            <p className="text-4xl font-extrabold text-black tracking-tight mb-4">
              Engineered for Alpha
            </p>
            <p className="text-xl text-gray-500 font-light">
              Sophisticated tools for the modern trader. 
            </p>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
             <FeatureCard 
                icon={Cpu}
                title="AlgoPilot Bot"
                description="Our flagship automated trading bot for XAUUSD. Plug and play solution with built-in risk management and news filtering."
             />
             <FeatureCard 
                icon={Layers}
                title="Custom Strategy"
                description="Have a winning manual strategy? We turn your specific rules into a robust, backtested Expert Advisor (EA)."
             />
             <FeatureCard 
                icon={ShieldCheck}
                title="Capital Management"
                description="Hands-free investing. We manage your capital with our proven institutional strategies under a profit-share model."
             />
          </div>
        </div>
      </div>

       {/* How It Works - Visual Timeline */}
       <div className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-extrabold text-black mb-6">Deployment Protocol</h2>
            <p className="text-gray-500 max-w-xl mx-auto">From purchase to live execution in four steps.</p>
          </div>
          
          <div className="relative">
             {/* Connection Line */}
             <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gray-200 z-0"></div>

             <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pt-8">
                 {[
                    { step: '01', title: 'Acquire', desc: 'Purchase license key.', icon: Lock },
                    { step: '02', title: 'Download', desc: 'Get the .ex5 binary.', icon: Layers },
                    { step: '03', title: 'Deploy', desc: 'Install on MT5.', icon: Cpu },
                    { step: '04', title: 'Execute', desc: 'Activate AutoTrading.', icon: Zap }
                 ].map((item) => (
                     <div key={item.step} className="relative z-10 group">
                         <div className="w-24 h-24 mx-auto bg-white border border-gray-200 rounded-2xl flex items-center justify-center mb-8 group-hover:border-primary group-hover:shadow-lg transition-all duration-300 relative">
                             <item.icon className="w-8 h-8 text-black group-hover:text-primary transition-colors" />
                             <div className="absolute -top-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-full border-4 border-gray-50">
                                {item.step}
                             </div>
                         </div>
                         <div className="text-center px-4">
                            <h3 className="text-lg font-bold mb-2 text-black">{item.title}</h3>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                         </div>
                     </div>
                 ))}
             </div>
          </div>
        </div>
      </div>

      {/* Trust/Benefits Grid */}
      <div className="bg-black py-24 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-8">Why professionals choose Tradeloom</h2>
                    <div className="space-y-8">
                        {[
                            { title: 'Zero-Latency Execution', desc: 'Co-located servers ensure your trades hit the market instantly.' },
                            { title: 'Fixed Risk Parameters', desc: 'Hard stop-losses on every trade. Capital preservation is priority #1.' },
                            { title: 'Macro-Economic Filtering', desc: 'Algorithms automatically pause during high-impact news events.' },
                        ].map((benefit, i) => (
                            <div key={i} className="flex group">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-white/5 border border-white/10 text-violet-400 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <CheckCircle2 className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="ml-6">
                                    <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{benefit.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-violet-600 rounded-2xl transform rotate-2 opacity-20 blur-2xl"></div>
                    <div className="relative bg-[#0A0A0A] border border-white/10 rounded-xl p-8 shadow-2xl">
                        <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Live System Log</h4>
                            <div className="flex items-center space-x-2">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-xs font-mono text-green-500">SYSTEM ONLINE</span>
                            </div>
                        </div>
                        <div className="space-y-4 font-mono text-xs">
                            <div className="flex justify-between text-gray-500 border-l-2 border-transparent pl-2">
                                <span>14:02:45.102</span>
                                <span className="text-violet-400">Scanning market structure (M5)...</span>
                            </div>
                            <div className="flex justify-between text-gray-300 border-l-2 border-violet-500 bg-white/5 p-2 rounded-r">
                                <span>14:02:48.005</span>
                                <span className="text-white font-bold">SIGNAL: XAUUSD LONG</span>
                            </div>
                            <div className="flex justify-between text-gray-500 border-l-2 border-transparent pl-2">
                                <span>14:02:48.012</span>
                                <span className="text-green-400">ORDER FILLED @ 2450.50 (7ms)</span>
                            </div>
                             <div className="flex justify-between text-gray-500 border-l-2 border-transparent pl-2">
                                <span>14:05:12.440</span>
                                <span className="text-gray-300">TP Modified: 2455.00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-primary overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white opacity-10"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-black opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left mb-10 lg:mb-0">
                <h2 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">
                    Automate Your Edge.
                </h2>
                <p className="text-xl text-violet-100 max-w-2xl">
                    Stop staring at charts. Let the algorithms do the heavy lifting.
                </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    to="/algopilot"
                    className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-lg text-primary bg-white hover:bg-gray-100 transition-colors shadow-xl"
                >
                    Get AlgoPilot
                    <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                 <Link
                    to="/login"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-base font-bold rounded-lg text-white hover:bg-white/10 transition-colors"
                >
                    Client Login
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;