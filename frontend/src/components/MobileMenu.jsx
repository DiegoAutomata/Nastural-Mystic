import { motion, AnimatePresence } from 'framer-motion';
import { X, User, LogOut, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function MobileMenu({ isOpen, closeMenu }) {
    const { t } = useTranslation();
    const { user, logout } = useAuth();

    const menuVariants = {
        hidden: { opacity: 0, x: '100%' },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: 'spring', damping: 25, stiffness: 200 }
        },
        exit: {
            opacity: 0,
            x: '100%',
            transition: { duration: 0.3 }
        }
    };

    const linkVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: 0.1 + i * 0.1 }
        })
    };

    const navLinks = [
        { name: t('navbar.home'), id: 'inicio' },
        { name: t('navbar.collections'), id: 'coleccion' },
        { name: t('navbar.contact'), id: 'contacto' },
    ];

    const handleScrollTo = (id) => {
        closeMenu();
        const element = document.getElementById(id);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeMenu}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Menu Panel */}
                    <motion.div
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <span className="text-2xl font-serif italic font-bold">
                                Aura <span className="font-sans font-black text-brand-primary not-italic">Fit</span>
                            </span>
                            <button
                                onClick={closeMenu}
                                className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-8">

                            {/* User Section */}
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                {user ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-lg">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800">{user.name}</p>
                                                <p className="text-xs text-slate-500">{user.email}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => { logout(); closeMenu(); }}
                                            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut size={16} />
                                            {t('auth.logout')}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center space-y-4">
                                        <p className="text-sm text-slate-500">{t('auth.accessAccount')}</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Link
                                                to="/login"
                                                onClick={closeMenu}
                                                className="py-3 px-4 bg-white border border-slate-200 rounded-xl text-center text-xs font-bold uppercase tracking-widest hover:border-brand-primary hover:text-brand-primary transition-colors"
                                            >
                                                {t('auth.signIn')}
                                            </Link>
                                            <Link
                                                to="/register"
                                                onClick={closeMenu}
                                                className="py-3 px-4 bg-brand-primary text-white rounded-xl text-center text-xs font-bold uppercase tracking-widest hover:bg-brand-primary/90 transition-colors"
                                            >
                                                {t('auth.signUp')}
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Navigation Links */}
                            <nav className="flex flex-col gap-2">
                                {navLinks.map((link, i) => (
                                    <motion.button
                                        key={link.id}
                                        custom={i}
                                        variants={linkVariants}
                                        initial="hidden"
                                        animate="visible"
                                        onClick={() => handleScrollTo(link.id)}
                                        className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors group text-left"
                                    >
                                        <span className="text-lg font-bold text-slate-700 group-hover:text-brand-primary transition-colors">
                                            {link.name}
                                        </span>
                                        <ChevronRight size={20} className="text-slate-300 group-hover:text-brand-primary transition-colors" />
                                    </motion.button>
                                ))}
                            </nav>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
