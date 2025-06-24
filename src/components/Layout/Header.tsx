import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { state } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = state.wishlist.length;

  return (
    <header className="bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <motion.h1 
              className="text-3xl font-bold tracking-[0.3em] text-gray-900 hover:text-orange-600 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              MOBILLIO
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/products" className="text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors duration-200">
              SHOP
            </Link>
            <Link to="/lookbook" className="text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors duration-200">
              LOOKBOOK
            </Link>
            <Link to="/special" className="text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors duration-200">
              SPECIAL
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center bg-white rounded-full px-4 py-2 shadow-md border-2 border-gray-200 focus-within:border-orange-400 transition-colors duration-200">
            <input
              type="text"
              placeholder="Search furniture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-gray-700 placeholder-gray-400 min-w-[200px]"
            />
            <button type="submit" className="ml-2 text-gray-500 hover:text-orange-600 transition-colors duration-200">
              <Search size={20} />
            </button>
          </form>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/about" className="text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors duration-200">
              ABOUT
            </Link>
            <Link to="/blog" className="text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors duration-200">
              BLOG
            </Link>
            <Link to="/contact" className="text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors duration-200">
              CONTACT
            </Link>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors duration-200">
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <motion.span 
                  className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </Link>
            
            <Link to="/wishlist" className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors duration-200">
              <Heart size={24} />
              {wishlistCount > 0 && (
                <motion.span 
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {wishlistCount}
                </motion.span>
              )}
            </Link>
            
            <Link to={state.isAuthenticated ? "/profile" : "/login"} className="p-2 text-gray-700 hover:text-orange-600 transition-colors duration-200">
              <User size={24} />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-orange-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full px-4 py-2 shadow-md border-2 border-gray-200 focus-within:border-orange-400 transition-colors duration-200">
            <input
              type="text"
              placeholder="Search furniture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-gray-700 placeholder-gray-400"
            />
            <button type="submit" className="ml-2 text-gray-500 hover:text-orange-600 transition-colors duration-200">
              <Search size={20} />
            </button>
          </form>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="px-4 py-6 space-y-4">
              <Link
                to="/products"
                className="block text-lg font-semibold text-gray-700 hover:text-orange-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                SHOP
              </Link>
              <Link
                to="/lookbook"
                className="block text-lg font-semibold text-gray-700 hover:text-orange-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                LOOKBOOK
              </Link>
              <Link
                to="/special"
                className="block text-lg font-semibold text-gray-700 hover:text-orange-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                SPECIAL
              </Link>
              <Link
                to="/about"
                className="block text-lg font-semibold text-gray-700 hover:text-orange-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT
              </Link>
              <Link
                to="/blog"
                className="block text-lg font-semibold text-gray-700 hover:text-orange-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                BLOG
              </Link>
              <Link
                to="/contact"
                className="block text-lg font-semibold text-gray-700 hover:text-orange-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}