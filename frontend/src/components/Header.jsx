import React from 'react';
import { Search, Bell, User, Menu, X, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => (
  <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
          >
            StackIt
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Home
          </Link>
          <Link
            to="/browse"
            className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Questions
          </Link>
          <Link
            to="/ask"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            Ask Question
          </Link>
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg outline-none border border-gray-700 focus:border-blue-500 w-64"
            />
          </div>
          <Bell size={20} className="text-gray-400 hover:text-white cursor-pointer" />
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            Login 
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-400 hover:text-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    {isMobileMenuOpen && (
      <div className="md:hidden bg-gray-800 border-t border-gray-700">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Home
          </Link>
          <Link
            to="/browse"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Questions
          </Link>
          <Link
            to="/ask"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            Ask Question
          </Link>
          
        </div>
      </div>
    )}
  </header>
);

export default Header;
