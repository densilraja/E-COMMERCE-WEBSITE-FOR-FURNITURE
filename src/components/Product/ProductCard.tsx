import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { state, dispatch } = useApp();

  const isInWishlist = state.wishlist.some(item => item.product.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity: 1 } });
    toast.success('Added to cart!');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
      toast.success('Removed from wishlist');
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
      toast.success('Added to wishlist!');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
          {/* Image Container */}
          <div className="relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Discount Badge */}
            {product.originalPrice && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </div>
            )}

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleWishlist}
                className={`p-2 rounded-full shadow-lg transition-colors duration-200 ${
                  isInWishlist 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
                }`}
              >
                <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                className="p-2 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-colors duration-200"
              >
                <ShoppingCart size={18} />
              </motion.button>
            </div>

            {/* Stock Status */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-200">
              {product.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.reviews})</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            {/* Category */}
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full capitalize">
              {product.category}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}