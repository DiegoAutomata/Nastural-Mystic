import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowUpRight, ShoppingBag, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const products = [
    {
        id: 1,
        name: 'Aura Leggings Flow',
        price: 89,
        category: 'yoga',
        image: '/src/assets/aura_leggings_flow_1770172201964.png',
        span: 'col-span-1 md:col-span-2 row-span-2'
    },
    {
        id: 2,
        name: 'Top Impact Rosa',
        price: 45,
        category: 'training',
        image: '/src/assets/top_impact_rosa_1770172218257.png',
        span: 'col-span-1'
    },
    {
        id: 3,
        name: 'Hoodie Oversized',
        price: 110,
        category: 'lifestyle',
        image: '/src/assets/hoodie_oversized_training_1770172234186.png',
        span: 'col-span-1'
    },
    {
        id: 4,
        name: 'Biker Short Core',
        price: 55,
        category: 'running',
        image: '/src/assets/biker_shorts_active_1770172256837.png',
        span: 'col-span-1 md:col-span-2'
    },
    {
        id: 5,
        name: 'Yoga Mat Premium',
        price: 75,
        category: 'accessories',
        image: '/src/assets/yoga_mat_premium_1770172275971.png',
        span: 'col-span-1'
    },
    {
        id: 6,
        name: 'Sneakers Aura Elite',
        price: 150,
        category: 'footwear',
        image: '/src/assets/sneakers_aura_elite_1770172292507.png',
        span: 'col-span-1'
    },
    // New Products
    {
        id: 7,
        name: 'Zen Tank Top',
        price: 35,
        category: 'yoga',
        image: '/src/assets/top_impact_rosa_1770172218257.png', // Reusing placeholder
        span: 'col-span-1'
    },
    {
        id: 8,
        name: 'Pro Run Shorts',
        price: 48,
        category: 'running',
        image: '/src/assets/biker_shorts_active_1770172256837.png', // Reusing placeholder
        span: 'col-span-1'
    },
    {
        id: 9,
        name: 'Resistance Bands',
        price: 25,
        category: 'accessories',
        image: '/src/assets/yoga_mat_premium_1770172275971.png', // Reusing placeholder
        span: 'col-span-1'
    },
    {
        id: 10,
        name: 'Cross Training Shoes',
        price: 130,
        category: 'footwear',
        image: '/src/assets/sneakers_aura_elite_1770172292507.png', // Reusing placeholder
        span: 'col-span-1'
    }
];

const categories = ['all', 'yoga', 'training', 'lifestyle', 'running', 'accessories', 'footwear'];

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export default function ProductGrid({ onAddToCart }) {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { addNotification } = useNotification();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('all');

    const [viewMode, setViewMode] = useState('categories'); // 'categories' or 'products'

    // Listen for external filter requests (from Navbar/Footer)
    useEffect(() => {
        const handleFilterEvent = (e) => {
            if (e.detail && (categories.includes(e.detail) || e.detail === 'clothing')) {
                setSelectedCategory(e.detail);
                setViewMode('products'); // Switch to products view automatically
                // Scroll to the collection section
                const element = document.getElementById('coleccion');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        window.addEventListener('filter-products', handleFilterEvent);
        return () => window.removeEventListener('filter-products', handleFilterEvent);
    }, []);

    const filteredProducts = selectedCategory === 'all'
        ? products
        : selectedCategory === 'clothing'
            ? products.filter(p => ['yoga', 'training', 'lifestyle', 'running'].includes(p.category))
            : products.filter(p => p.category === selectedCategory);

    // Categories to display as cards
    const categoryCards = [
        { id: 'training', name: t('products.training'), image: '/src/assets/top_impact_rosa_1770172218257.png', span: 'col-span-1 md:col-span-2 row-span-2' },
        { id: 'accessories', name: t('products.accessories'), image: '/src/assets/yoga_mat_premium_1770172275971.png', span: 'col-span-1' },
        { id: 'yoga', name: t('products.yoga'), image: '/src/assets/aura_leggings_flow_1770172201964.png', span: 'col-span-1' },
        { id: 'running', name: t('products.running'), image: '/src/assets/biker_shorts_active_1770172256837.png', span: 'col-span-1 md:col-span-2' },
        { id: 'footwear', name: t('products.footwear'), image: '/src/assets/sneakers_aura_elite_1770172292507.png', span: 'col-span-1' },
        { id: 'lifestyle', name: t('products.lifestyle'), image: '/src/assets/hoodie_oversized_training_1770172234186.png', span: 'col-span-1' },
    ];

    return (
        <section className="min-h-screen flex items-center py-12 md:py-0 bg-brand-dark relative" id="coleccion">
            {/* Background luxury glow */}
            <div className="absolute top-[20%] left-[10%] w-[50%] h-[50%] bg-brand-primary/10 rounded-full blur-[150px] opacity-50 pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-brand-accent/10 rounded-full blur-[120px] opacity-30 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex flex-col justify-center">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3">
                            <span className="h-[1px] w-12 bg-brand-primary" />
                            <span className="text-brand-accent font-black tracking-[0.4em] uppercase text-[10px]">{t('products.newSeason')}</span>
                        </div>
                        <h2 className="text-6xl md:text-9xl font-serif italic text-white leading-none tracking-tighter">
                            Essential <br />
                            <span className="text-brand-primary not-italic font-sans font-black tracking-normal uppercase text-5xl md:text-8xl block mt-2">
                                {viewMode === 'categories' ? 'COLLECTIONS' : t(`products.${selectedCategory === 'all' ? 'essentials' : selectedCategory}`).toUpperCase()}
                            </span>
                        </h2>
                    </motion.div>

                    {/* Navigation Contols */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="w-full md:w-auto flex flex-col items-start md:items-end gap-8"
                    >
                        {viewMode === 'products' && (
                            <button
                                onClick={() => setViewMode('categories')}
                                className="group flex items-center gap-4 text-white/60 hover:text-white transition-all duration-300 font-bold tracking-widest uppercase text-xs border-b border-white/10 pb-2"
                            >
                                <ArrowUpRight size={18} className="group-hover:-translate-x-1 group-hover:translate-y-1 transition-transform rotate-180" />
                                {t('products.backToCollections')}
                            </button>
                        )}

                        {viewMode === 'categories' && (
                            <button
                                onClick={() => {
                                    setSelectedCategory('all');
                                    setViewMode('products');
                                }}
                                className="group flex items-center gap-4 text-white/60 hover:text-white transition-all duration-300 font-bold tracking-widest uppercase text-xs border-b border-white/10 pb-2"
                            >
                                {t('products.seeAll')}
                                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        )}
                    </motion.div>
                </div>

                {/* Main Content Area */}
                <AnimatePresence mode="wait">
                    {viewMode === 'categories' ? (
                        <motion.div
                            key="categories"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-4 auto-rows-[45vh] gap-6"
                        >
                            {categoryCards.map((cat, index) => (
                                <motion.div
                                    key={cat.id}
                                    layoutId={`category-${cat.id}`}
                                    onClick={() => {
                                        if (!user) {
                                            addNotification("Debe iniciar sesión para ver los productos.", "info", "Acceso Restringido");
                                            navigate('/login');
                                            return;
                                        }
                                        setSelectedCategory(cat.id);
                                        setViewMode('products');
                                    }}
                                    className={`group relative bg-slate-900 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-brand-primary/50 transition-all duration-500 shadow-2xl cursor-pointer ${cat.span}`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Category Image */}
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src={cat.image}
                                            alt={cat.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out opacity-60 group-hover:opacity-80"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
                                    </div>

                                    {/* Category Label */}
                                    {/* Category Label */}
                                    <div className="absolute bottom-0 left-0 p-8 z-20 pointer-events-none max-w-[70%]">
                                        <h3 className="text-3xl md:text-5xl font-serif italic text-white leading-tight">
                                            {cat.name}
                                        </h3>
                                    </div>

                                    <div className="absolute top-6 right-6 z-50 pointer-events-auto h-10 w-10 rounded-full bg-slate-900 text-white border-2 border-white flex items-center justify-center group-hover:bg-brand-primary group-hover:border-brand-primary transition-all duration-300 shadow-xl">
                                        <ArrowUpRight size={18} />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="products"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-4 auto-rows-[45vh] gap-6"
                        >
                            {filteredProducts.map((product, i) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                    className={`group relative bg-slate-900 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-brand-primary/30 transition-all duration-700 shadow-2xl ${product.span}`}
                                >
                                    {/* Product Media */}
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                                    </div>

                                    {/* Category Tag */}
                                    <div className="absolute top-6 left-6 z-20">
                                        <span className="px-4 py-1.5 bg-black/40 backdrop-blur-xl rounded-full text-[9px] font-black tracking-[0.2em] uppercase text-white border border-white/10">
                                            {t(`products.${product.category}`)}
                                        </span>
                                    </div>

                                    {/* Product Info Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="flex justify-between items-end gap-4">
                                            <div className="space-y-2">
                                                <h3 className="text-2xl md:text-3xl font-serif italic text-white leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                    {product.name}
                                                </h3>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-brand-primary font-black text-xl tracking-tight">${product.price}</span>
                                                    <span className="h-4 w-[1px] bg-white/20" />
                                                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-none">Aura Fit Quality</span>
                                                </div>
                                            </div>

                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => {
                                                    if (!user) {
                                                        addNotification("Debe iniciar sesión para comprar.", "info", "Acceso Restringido");
                                                        navigate('/login');
                                                        return;
                                                    }
                                                    onAddToCart(product);
                                                }}
                                                className="h-14 w-14 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-xl shadow-brand-primary/20 hover:bg-white hover:text-brand-dark transition-all duration-300 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
                                            >
                                                <ShoppingBag size={22} strokeWidth={2.5} />
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Decorative Edge Glow */}
                                    <div className="absolute inset-0 border-[1px] border-white/0 group-hover:border-white/10 transition-colors duration-700 rounded-[2.5rem] pointer-events-none" />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Bottom Decorative Element */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 text-center"
                >
                    <p className="text-[10px] text-white/20 font-black tracking-[0.8em] uppercase">
                        Mastering the Art of Motion
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
