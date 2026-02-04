import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Marquee from './components/Marquee';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Checkout from './pages/Checkout';
import MobileMenu from './components/MobileMenu';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="relative min-h-screen bg-slate-50 font-sans selection:bg-brand-primary selection:text-white overflow-x-hidden">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout cart={cartItems} />} />
              <Route path="/" element={
                <>
                  <Navbar
                    toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
                    cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    toggleCart={() => setCartOpen(true)}
                  />

                  <MobileMenu isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />

                  <CartDrawer
                    isOpen={cartOpen}
                    onClose={() => setCartOpen(false)}
                    cart={cartItems}
                    removeFromCart={removeFromCart}
                    onUpdateQuantity={updateQuantity}
                  />

                  <main className="bg-white">
                    <Hero />
                    <Marquee />
                    <ProductGrid onAddToCart={addToCart} />
                    <Footer />
                  </main>
                </>
              } />
            </Routes>
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
