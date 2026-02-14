import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { User } from './types';
import { DataProvider, useData } from './DataContext';
import Home from './pages/Home';
import AlgoPilot from './pages/AlgoPilot';
import Performance from './pages/Performance';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';

// --- Context for Auth ---
interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}
export const AuthContext = React.createContext<AuthContextType>(null!);
export const useAuth = () => React.useContext(AuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { users, addUser } = useData();

  useEffect(() => {
    const storedUser = localStorage.getItem('tradeloom_user');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string) => {
    let foundUser = users.find(u => u.email === email);
    
    // Auto-create user for demo if not exists
    if (!foundUser) {
        const newUser: User = { 
            id: Date.now().toString(), 
            name: email.split('@')[0], 
            email, 
            role: email.includes('admin') ? 'admin' : 'user' // Simple logic for demo
        };
        addUser(newUser);
        foundUser = newUser;
    }

    setUser(foundUser);
    localStorage.setItem('tradeloom_user', JSON.stringify(foundUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tradeloom_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- Layout Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                src="https://i.postimg.cc/Y0yPNN5S/IMG-8587.png" 
                alt="TRADELOOM INNOVATIONS" 
                className="h-14 w-auto object-contain" 
              />
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/" className={`${location.pathname === '/' ? 'border-primary text-black' : 'border-transparent text-gray-500 hover:text-black'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors`}>
                Home
              </Link>
              <Link to="/algopilot" className={`${location.pathname === '/algopilot' ? 'border-primary text-black' : 'border-transparent text-gray-500 hover:text-black'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors`}>
                AlgoPilot
              </Link>
              <Link to="/performance" className={`${location.pathname === '/performance' ? 'border-primary text-black' : 'border-transparent text-gray-500 hover:text-black'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors`}>
                Live Performance
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                 {user.role === 'admin' ? (
                     <Link to="/admin" className="text-sm font-bold text-primary hover:text-primary-hover flex items-center">
                        <LayoutDashboard className="w-4 h-4 mr-1" />
                        Admin Panel
                     </Link>
                 ) : (
                    <Link to="/dashboard" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                        Dashboard
                    </Link>
                 )}
                
                <button
                  onClick={logout}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                 <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-black">
                  Log in
                </Link>
                <Link
                  to="/algopilot"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover transition-colors shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-black hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-black">Home</Link>
            <Link to="/algopilot" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-black">AlgoPilot</Link>
            <Link to="/performance" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-black">Performance</Link>
            {user ? (
               <>
                {user.role === 'admin' && <Link to="/admin" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-primary hover:bg-violet-50">Admin Panel</Link>}
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-violet-50">User Dashboard</Link>
                <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-red-600 hover:bg-red-50">Sign Out</button>
               </>
            ) : (
               <Link to="/login" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-primary hover:bg-violet-50">Log In</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-black text-white border-t border-gray-800">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="bg-white inline-block p-2 rounded-lg mb-4">
             <img src="https://i.postimg.cc/Y0yPNN5S/IMG-8587.png" alt="TRADELOOM INNOVATIONS" className="h-10 w-auto" />
          </div>
          <p className="mt-4 text-gray-400 max-w-sm">
            Providing institutional-grade algorithmic trading solutions for retail investors. Automate your strategy, scale your profits.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Products</h3>
          <ul className="mt-4 space-y-4">
            <li><Link to="/algopilot" className="text-base text-gray-400 hover:text-primary transition-colors">AlgoPilot</Link></li>
            <li><span className="text-base text-gray-500 cursor-not-allowed">Custom Development</span></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Legal</h3>
          <ul className="mt-4 space-y-4">
            <li><a href="#" className="text-base text-gray-400 hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-base text-gray-400 hover:text-primary transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-800 pt-8 flex items-center justify-between">
        <p className="text-base text-gray-400">&copy; 2026 Tradeloom Innovations. All rights reserved.</p>
        <p className="text-sm text-gray-600">Trading involves significant risk.</p>
      </div>
    </div>
  </footer>
);

// --- Main App Component ---

const App = () => {
  return (
    <DataProvider>
        <HashRouter>
        <AuthProvider>
            <div className="min-h-screen flex flex-col bg-white">
            <Navbar />
            <main className="flex-grow">
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/algopilot" element={<AlgoPilot />} />
                <Route path="/performance" element={<Performance />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
                <Route path="/admin/*" element={<AdminPanel />} />
                <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer />
            </div>
        </AuthProvider>
        </HashRouter>
    </DataProvider>
  );
};

export default App;