import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              {/* Placeholder routes */}
              <Route path="/lookbook" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-bold">Lookbook - Coming Soon</h1></div>} />
              <Route path="/special" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-bold">Special Offers - Coming Soon</h1></div>} />
              <Route path="/about" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-bold">About Us - Coming Soon</h1></div>} />
              <Route path="/blog" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-bold">Blog - Coming Soon</h1></div>} />
              <Route path="/contact" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-bold">Contact Us - Coming Soon</h1></div>} />
              <Route path="/checkout" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-bold">Checkout - Coming Soon</h1></div>} />
              <Route path="/orders" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-bold">Orders - Coming Soon</h1></div>} />
            </Routes>
          </main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#10B981',
                },
              },
              error: {
                style: {
                  background: '#EF4444',
                },
              },
            }}
          />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;