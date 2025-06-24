import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import toast from 'react-hot-toast';

export default function Wishlist() {
  const { state, dispatch } = useApp();

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
    toast.success('Removed from wishlist');
  };

  const addToCart = (productId: string) => {
    const wishlistItem = state.wishlist.find(item => item.product.id === productId);
    if (wishlistItem) {
      dispatch({ type: 'ADD_TO_CART', payload: { product: wishlistItem.product, quantity: 1 } });
      toast.success('Added to cart!');
    }
  };

  if (state.wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
            <Heart size={48} className="text-gray-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Your wishlist is empty</h2>
            <p className="text-gray-600">Save items you love for later</p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-300"
          >
            Start Shopping
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600 mt-2">{state.wishlist.length} item{state.wishlist.length !== 1 ? 's' : ''} saved</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {state.wishlist.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <Link to={`/product/${item.product.id}`}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  
                  <button
                    onClick={() => removeFromWishlist(item.product.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-500 transition-colors duration-200"
                  >
                    <Trash2 size={16} />
                  </button>

                  {item.product.originalPrice && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <Link
                    to={`/product/${item.product.id}`}
                    className="block"
                  >
                    <h3 className="font-semibold text-gray-900 hover:text-orange-600 transition-colors duration-200 line-clamp-2">
                      {item.product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">₹{item.product.price.toLocaleString()}</span>
                    {item.product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">₹{item.product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>

                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full capitalize">
                    {item.product.category}
                  </span>

                  <div className="flex space-x-2 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToCart(item.product.id)}
                      disabled={!item.product.inStock}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300"
                    >
                      <ShoppingCart size={16} className="mr-1" />
                      {item.product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </motion.button>
                  </div>

                  <p className="text-xs text-gray-500">
                    Added {new Date(item.addedAt).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-300"
          >
            Continue Shopping
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}