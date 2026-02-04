import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, Globe, User, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ toggleMenu, cartCount, toggleCart }) {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Toggle Language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    // Map specific category IDs to the collection section
    let targetId = id;
    if (['training', 'accessories', 'clothing'].includes(id)) {
      targetId = 'coleccion';
    }

    if (id === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
    if (id === 'coleccion') {
      window.dispatchEvent(new CustomEvent('filter-products', { detail: 'all' }));
    }
    // Dispatch specific category filters
    if (['training', 'accessories', 'clothing'].includes(id)) {
      window.dispatchEvent(new CustomEvent('filter-products', { detail: id }));
    }
  };

  const navLinks = [
    { name: t('navbar.home'), id: 'inicio' },
    { name: t('navbar.collections'), id: 'coleccion' },
    { name: t('navbar.contact'), id: 'contacto' },
  ];

  // Derived styles for the new navbar structure
  const logoColor = isScrolled ? "rgba(15, 23, 42, 1)" : "rgba(15, 23, 42, 1)";
  const textColor = isScrolled ? "rgba(15, 23, 42, 1)" : "rgba(15, 23, 42, 1)";

  return (
    <>
      <motion.nav
        style={isScrolled ? {
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,0.05)"
        } : {
          backgroundColor: "transparent",
          backdropFilter: "blur(0px)",
          borderBottom: "1px solid transparent"
        }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">

            {/* Logo */}
            <div className="flex-shrink-0 relative z-50">
              <Link to="/">
                <div className="flex items-center gap-2">
                  <motion.img
                    src="/logo.jpg"
                    alt="AuraFit Logo"
                    className="h-10 md:h-12 w-auto object-contain rounded-full"
                  />
                  <motion.span
                    style={{ color: logoColor }}
                    className="text-xl md:text-2xl font-serif italic font-bold tracking-tighter"
                  >
                    Aura <span className="font-sans font-black text-brand-primary not-italic">Fit</span>
                  </motion.span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleScrollTo(link.id)}
                  className="text-sm font-bold uppercase tracking-widest hover:text-brand-primary transition-colors relative group"
                  style={{ color: textColor }}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-primary transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 md:gap-6">

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors hover:text-brand-primary"
                  style={{ color: textColor }}
                >
                  <Globe size={18} />
                  <span>{i18n.language === 'es' ? 'ES' : 'EN'}</span>
                </button>
                <AnimatePresence>
                  {langMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-4 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 min-w-[120px] flex flex-col gap-1 overflow-hidden"
                    >
                      <button onClick={() => changeLanguage('es')} className="text-left px-4 py-2 hover:bg-slate-50 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-700">Español</button>
                      <button onClick={() => changeLanguage('en')} className="text-left px-4 py-2 hover:bg-slate-50 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-700">English</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>


              {/* User Auth */}
              <div className="hidden md:block relative">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 hover:text-brand-primary transition-colors font-bold text-sm tracking-wide"
                      style={{ color: textColor }}
                    >
                      <span className="max-w-[100px] truncate">{user.name}</span>
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center">
                        <User size={14} />
                      </div>
                    </button>
                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full right-0 mt-4 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 min-w-[200px] flex flex-col gap-1 z-50"
                        >
                          <div className="px-4 py-2 border-b border-slate-100">
                            <p className="text-xs text-slate-400 font-medium">Conectado como</p>
                            <p className="text-sm font-bold text-slate-800 truncate">{user.email}</p>
                          </div>
                          <button
                            onClick={logout}
                            className="text-left px-4 py-2 hover:bg-red-50 hover:text-red-500 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 transition-colors"
                          >
                            <LogOut size={14} />
                            {t('auth.logout', 'Cerrar Sesión')}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-primary transition-colors shadow-lg"
                    >
                      {t('auth.signIn', 'Ingresar')}
                    </motion.button>
                  </Link>
                )}
              </div>


              {/* Cart Button */}
              <button
                onClick={toggleCart}
                className="relative group w-10 h-10 flex items-center justify-center"
                style={{ color: textColor }}
              >
                <ShoppingBag size={22} strokeWidth={2} className="group-hover:scale-110 transition-transform duration-300" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-5 w-5 bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2"
                style={{ color: textColor }}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
      </AnimatePresence>
    </>
  );
}
