import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-[0.2em]">MOBILLIO</h2>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <p className="text-sm">5/253, Main Road, ECR, Chennai-600008, Tamil Nadu</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} />
                <p className="text-sm">(+91) 1234567890</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} />
                <p className="text-sm">xxxx.xxxxa@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Categories</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/products?category=collections" className="text-sm hover:text-orange-400 transition-colors duration-200">Collections</Link></li>
              <li><Link to="/products?category=desks" className="text-sm hover:text-orange-400 transition-colors duration-200">Desks</Link></li>
              <li><Link to="/products?category=chairs" className="text-sm hover:text-orange-400 transition-colors duration-200">Chairs</Link></li>
              <li><Link to="/products?category=lamps" className="text-sm hover:text-orange-400 transition-colors duration-200">Lamps</Link></li>
              <li><Link to="/products?category=plants" className="text-sm hover:text-orange-400 transition-colors duration-200">Plants</Link></li>
              <li><Link to="/products?category=decorations" className="text-sm hover:text-orange-400 transition-colors duration-200">Decorations</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Company</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/products" className="text-sm hover:text-orange-400 transition-colors duration-200">Shop</Link></li>
              <li><Link to="/lookbook" className="text-sm hover:text-orange-400 transition-colors duration-200">Lookbook</Link></li>
              <li><Link to="/special" className="text-sm hover:text-orange-400 transition-colors duration-200">Specials</Link></li>
              <li><Link to="/about" className="text-sm hover:text-orange-400 transition-colors duration-200">About</Link></li>
              <li><Link to="/blog" className="text-sm hover:text-orange-400 transition-colors duration-200">Blog</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Resources</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/contact" className="text-sm hover:text-orange-400 transition-colors duration-200">Contact us</Link></li>
              <li><Link to="/orders" className="text-sm hover:text-orange-400 transition-colors duration-200">Orders</Link></li>
              <li><Link to="/track-order" className="text-sm hover:text-orange-400 transition-colors duration-200">Track your order</Link></li>
              <li><Link to="/shipping" className="text-sm hover:text-orange-400 transition-colors duration-200">Shipping & Delivery</Link></li>
              <li><Link to="/returns" className="text-sm hover:text-orange-400 transition-colors duration-200">Returns</Link></li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />
        
        <div className="text-center">
          <p className="text-sm text-gray-400">
            &copy; 2024 MOBILLIO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}