import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Using HashRouter in App.tsx
import { Menu, X, ShoppingCart, User as UserIcon, LogOut, LayoutDashboard, Settings, BookOpen, GraduationCap, Search } from 'lucide-react';
import { useAuth, useCart } from '../context';
import { Button } from './UI';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(searchQuery.trim()) {
        navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
        setIsMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Search */}
          <div className="flex items-center flex-1">
            <Link to="/" className="flex-shrink-0 flex items-center mr-8">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
                Krutanic
              </span>
            </Link>
            
            <div className="hidden md:block w-full max-w-md">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search for courses, skills, or internships..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </form>
            </div>
          </div>

          {/* Desktop Nav Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/courses" className="text-gray-600 hover:text-blue-600 font-medium">Explore Courses</Link>
            <Link to="/placements" className="text-gray-600 hover:text-blue-600 font-medium">Placements</Link>
            
            <Link to="/cart" className="relative text-gray-600 hover:text-blue-600">
              <ShoppingCart size={24} />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 focus:outline-none">
                   <img src={user.avatar} alt="User" className="w-8 h-8 rounded-full border border-gray-300" />
                   <span className="font-medium text-gray-700">{user.name}</span>
                </button>
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 hidden group-hover:block hover:block">
                  <Link to={user.role === 'admin' ? "/admin" : "/dashboard"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Dashboard</Link>
                  <Link to="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</Link>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign out</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => navigate('/login')}>Log In</Button>
                <Button variant="primary" size="sm" onClick={() => navigate('/signup')}>Join for Free</Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
             <Link to="/cart" className="relative text-gray-600 hover:text-blue-600 mr-4">
              <ShoppingCart size={24} />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-4 pb-2">
             <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </form>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/courses" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Courses</Link>
            <Link to="/placements" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Internships</Link>
            {!user && (
              <div className="mt-4 flex flex-col space-y-2 px-3">
                <Button variant="outline" className="w-full" onClick={() => navigate('/login')}>Log In</Button>
                <Button variant="primary" className="w-full" onClick={() => navigate('/signup')}>Sign Up</Button>
              </div>
            )}
            {user && (
              <>
                 <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">My Dashboard</Link>
                 <button onClick={logout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">Sign Out</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
           <span className="text-2xl font-bold text-white mb-4 block">Krutanic</span>
           <p className="text-sm leading-relaxed">
             Empowering careers with practical, real-world skills. Join thousands of students getting job-ready with our industry-aligned curriculum and placement support.
           </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/courses" className="hover:text-blue-400 transition">Browse Courses</Link></li>
            <li><Link to="/placements" className="hover:text-blue-400 transition">Internships</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition">About Us</Link></li>
            <li><Link to="/pricing" className="hover:text-blue-400 transition">Fee Structure</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-blue-400 transition">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-blue-400 transition">FAQs</Link></li>
            <li><Link to="/terms" className="hover:text-blue-400 transition">Terms of Use</Link></li>
            <li><Link to="/privacy" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
           <h4 className="text-white font-semibold mb-4">Contact</h4>
           <p className="text-sm mb-2">support@krutanic.com</p>
           <p className="text-sm mb-4">+91 98765 43210</p>
           <div className="flex space-x-4">
             {/* Social placeholders */}
             <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 cursor-pointer transition">F</div>
             <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-400 cursor-pointer transition">T</div>
             <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 cursor-pointer transition">I</div>
           </div>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>&copy; {new Date().getFullYear()} Krutanic Learning Solutions. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Made for Builders 🚀</p>
      </div>
    </div>
  </footer>
);

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { name: 'My Learning', path: '/dashboard', icon: BookOpen },
    { name: 'Certificates', path: '/dashboard/certificates', icon: GraduationCap },
    { name: 'Account Settings', path: '/dashboard/settings', icon: Settings },
  ];

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 md:min-h-screen">
        <div className="p-6 border-b border-gray-200">
           <div className="flex items-center space-x-3">
             <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full" />
             <div>
               <p className="text-sm font-bold text-gray-900">{user.name}</p>
               <p className="text-xs text-gray-500 truncate">{user.email}</p>
             </div>
           </div>
        </div>
        <nav className="p-4 space-y-1">
          {links.map(link => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                location.pathname === link.path 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <link.icon size={18} className="mr-3" />
              {link.name}
            </Link>
          ))}
          <button 
            onClick={logout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 mt-8"
          >
            <LogOut size={18} className="mr-3" />
            Sign Out
          </button>
        </nav>
      </aside>
      
      {/* Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
