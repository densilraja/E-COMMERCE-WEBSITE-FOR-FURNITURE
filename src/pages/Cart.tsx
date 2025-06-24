import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import toast from 'react-hot-toast';

export default function Cart() {
  const { state, dispatch } = useApp();

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
      toast.success('Item removed from cart');
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } });
    }
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    toast.success('Item removed from cart');
  };

  const subtotal = state.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 10000 ? 0 : 500;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag size={48} className="text-gray-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
            <p className="text-gray-600">Add some products to get started</p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-300"
          >
            Continue Shopping
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
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">{state.cart.length} item{state.cart.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {state.cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link
                            to={`/product/${item.product.id}`}
                            className="text-lg font-semibold text-gray-900 hover:text-orange-600 transition-colors duration-200"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-gray-600 capitalize">{item.product.category}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors duration-200"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 py-2 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors duration-200"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ₹{(item.product.price * item.quantity).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            ₹{item.product.price.toLocaleString()} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-6 sticky top-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `₹${shipping.toLocaleString()}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (GST 18%)</span>
                  <span className="font-medium">₹{tax.toLocaleString()}</span>
                </div>

                <hr className="border-gray-200" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>

                {shipping > 0 && (
                  <p className="text-sm text-gray-600 bg-orange-50 p-3 rounded-lg">
                    Add ₹{(10000 - subtotal).toLocaleString()} more for free shipping!
                  </p>
                )}
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  to="/checkout"
                  className="w-full flex items-center justify-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-300"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2" size={20} />
                </Link>

                <Link
                  to="/products"
                  className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}