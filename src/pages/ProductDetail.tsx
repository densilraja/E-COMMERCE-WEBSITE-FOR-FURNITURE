import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, ArrowLeft, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { useApp } from '../context/AppContext';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const { state, dispatch } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link to="/products" className="text-orange-600 hover:text-orange-700">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const isInWishlist = state.wishlist.some(item => item.product.id === product.id);
  const images = [product.image, product.image, product.image]; // In real app, product would have multiple images

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
      toast.success('Removed from wishlist');
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
      toast.success('Added to wishlist!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-orange-600">Products</Link>
          <span>/</span>
          <span className="text-gray-900 capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-square overflow-hidden rounded-2xl bg-white shadow-lg"
            >
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                    selectedImage === index ? 'border-orange-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full capitalize">
                    {product.category}
                  </span>
                  {!product.inStock && (
                    <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-sm font-medium rounded">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>

                <p className="text-gray-600 leading-relaxed">{product.description}</p>

                {/* Features */}
                {product.features && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Key Features:</h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Dimensions */}
                {product.dimensions && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Dimensions:</h3>
                    <p className="text-sm text-gray-600">
                      {product.dimensions.width}cm (W) × {product.dimensions.height}cm (H) × {product.dimensions.depth}cm (D)
                    </p>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-900">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 flex items-center justify-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300"
                  >
                    <ShoppingCart className="mr-2" size={20} />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleToggleWishlist}
                    className={`px-8 py-4 border-2 font-semibold rounded-lg transition-all duration-300 ${
                      isInWishlist
                        ? 'border-red-500 bg-red-50 text-red-600 hover:bg-red-100'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    <Heart className="inline mr-2" size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
                    {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </motion.button>
                </div>

                {/* Service Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Truck className="text-orange-600" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Free Shipping</p>
                      <p className="text-sm text-gray-600">On orders over ₹10,000</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Shield className="text-orange-600" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">2 Year Warranty</p>
                      <p className="text-sm text-gray-600">Quality guarantee</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <RotateCcw className="text-orange-600" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Easy Returns</p>
                      <p className="text-sm text-gray-600">30-day return policy</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/product/${relatedProduct.id}`} className="block group">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-200">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-lg font-bold text-gray-900">₹{relatedProduct.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}