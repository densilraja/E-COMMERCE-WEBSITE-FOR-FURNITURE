import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react';
import ProductCard from '../components/Product/ProductCard';
import { products, categories } from '../data/products';

export default function Home() {
  const featuredProducts = products.slice(0, 6);
  const trendingProducts = products.filter(p => p.rating >= 4.7).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-0.5 bg-gray-400"></div>
                  <span className="text-sm font-semibold text-gray-600 tracking-wider">FURNITURE</span>
                </div>
                <div className="text-sm font-semibold text-gray-600 tracking-wider">TRENDS - 2024</div>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 tracking-wider">
                  YELLOWSTONE
                </h1>
                <p className="text-xl text-gray-600 font-medium">FROM ₹29,999</p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/products?category=collections"
                    className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-gray-900 text-gray-900 font-semibold hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300 group"
                  >
                    Explore the Collection
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={20} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Yellowstone Collection Sofa"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">SHOP BY CATEGORIES</h2>
            <p className="text-lg text-gray-600">Start shopping based on the categories you are interested in</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.slice(1).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link to={`/products?category=${category.id}`} className="block">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={`https://images.pexels.com/photos/${
                          category.id === 'chairs' ? '586763' :
                          category.id === 'desks' ? '667838' :
                          category.id === 'tables' ? '1395967' :
                          category.id === 'lamps' ? '1112598' :
                          category.id === 'plants' ? '1005058' :
                          category.id === 'decorations' ? '1579708' :
                          '1148955'
                        }/pexels-photo-${
                          category.id === 'chairs' ? '586763' :
                          category.id === 'desks' ? '667838' :
                          category.id === 'tables' ? '1395967' :
                          category.id === 'lamps' ? '1112598' :
                          category.id === 'plants' ? '1005058' :
                          category.id === 'decorations' ? '1579708' :
                          '1148955'
                        }.jpeg?auto=compress&cs=tinysrgb&w=400`}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-200">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 tracking-wider">MOBILLIO</h2>
              <h3 className="text-lg font-semibold text-gray-600 tracking-wider">FURNITURE</h3>
            </div>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Mobillio Stores Inc. are unique reseller of modern furniture, designer-made home-decoration items, since 1997.
            </p>
            
            <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Our legacy guarantees exceptional product quality, unique designs and special prices for all of our product line-up. 
              We specialize in contemporary furniture that combines functionality with aesthetic appeal, ensuring every piece 
              enhances your living space while providing lasting comfort and durability.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/about"
                className="inline-block px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-300"
              >
                Read more
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-wider">TRENDING ITEMS</h2>
            <p className="text-lg text-gray-600">Explore our monthly most trending products, new items and the best Mobillio offers you can buy</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-300 group"
            >
              View All Products
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <Truck className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over ₹10,000</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Quality Guarantee</h3>
              <p className="text-gray-600">2-year warranty on all furniture</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <Headphones className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer service</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white">Stay Updated</h2>
              <p className="text-xl text-orange-100">Get the latest updates on new arrivals and exclusive offers</p>
            </div>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}