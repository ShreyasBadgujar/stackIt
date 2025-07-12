import React from 'react';
import { Search, Bell, User, Menu, X, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-[#0F1419] via-[#181F1F] to-[#0F1419] backdrop-blur-md border-b border-gray-800/50 sticky top-0 z-50 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/10 to-blue-500/5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent hover:from-blue-400 hover:via-purple-400 hover:to-pink-400 transition-all duration-300 transform hover:scale-105"
            >
              StackIt
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            <Link to="/" className="relative px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white group overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
              <span className="relative z-10">Home</span>
            </Link>
            <Link to="/browse" className="relative px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white group overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
              <span className="relative z-10">Questions</span>
            </Link>
            <Link
              to="/ask"
              className="relative bg-gradient-to-r from-[#6421FF] to-[#8B5CF6] hover:from-[#541ACC] hover:to-[#7C3AED] text-white px-6 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-0.5 group overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Plus size={16} className="relative z-10 group-hover:rotate-90 transition-transform duration-300" />
              <span className="relative z-10">Ask Question</span>
            </Link>
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-800/70 backdrop-blur-sm text-white pl-10 pr-4 py-2 rounded-xl outline-none border border-gray-700/50 focus:border-[#6421FF] focus:bg-gray-800/90 w-64 transition-all duration-300 hover:border-gray-600 focus:shadow-lg focus:shadow-purple-500/20"
              />
            </div>
            <Bell size={20} className="text-gray-400 hover:text-white cursor-pointer transition-all duration-300" />

            {token ? (
              <div className="relative group">
                <button className="relative px-4 py-2 rounded-xl text-sm font-medium text-white bg-gray-800 hover:bg-gray-700">
                  {username || 'Profile'}
                </button>
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                  <Link to="/my-questions" className="block px-4 py-2 hover:bg-gray-100">
                    My Questions
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="relative bg-gradient-to-r from-gray-700 to-gray-600 hover:from-[#6421FF] hover:to-[#8B5CF6] text-white px-6 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-0.5 group overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <User size={16} className="relative z-10" />
                <span className="relative z-10">Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-400 hover:text-white p-2 rounded-xl hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-110"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="rotate-180 transition-transform duration-300" />
            ) : (
              <Menu size={24} className="transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gray-800/95 backdrop-blur-md border-t border-gray-700/50 transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-3">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-300 hover:text-white transition-all">Home</Link>
          <Link to="/browse" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-300 hover:text-white transition-all">Questions</Link>
          <Link to="/ask" onClick={() => setIsMobileMenuOpen(false)} className="block bg-gradient-to-r from-[#6421FF] to-[#8B5CF6] text-white px-4 py-3 rounded-xl flex items-center gap-2 shadow-md hover:from-[#541ACC] hover:to-[#7C3AED] transition-all">
            <Plus size={16} />
            Ask Question
          </Link>
          <div className="relative mt-4">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-700/70 text-white pl-10 pr-4 py-3 rounded-xl outline-none border border-gray-600/50"
            />
          </div>
          {token ? (
            <>
              <Link to="/my-questions" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-300 hover:text-white">My Questions</Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="block w-full text-left text-gray-300 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white bg-gray-700 px-4 py-3 rounded-xl flex items-center gap-2"
            >
              <User size={16} />
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
