import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';

const categories = [
    {
        id: 'training',
        nameKey: 'navbar.training',
        image: '/src/assets/top_impact_rosa_1770172218257.png',
        size: 'col-span-1 md:col-span-1',
        gradient: 'from-orange-500/20 to-pink-500/20'
    },
    {
        id: 'accessories',
        nameKey: 'navbar.accessories',
        image: '/src/assets/yoga_mat_premium_1770172275971.png',
        size: 'col-span-1 md:col-span-1',
        gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
        id: 'clothing',
        nameKey: 'navbar.sportswear',
        image: '/src/assets/biker_shorts_active_1770172256837.png',
        size: 'col-span-1 md:col-span-2', // Featured larger item
        gradient: 'from-purple-500/20 to-indigo-500/20'
    }
];

export default function CategoryGrid() {
    const { t } = useTranslation();

    const handleCategoryClick = (categoryId) => {
        // Dispatch event to filter products
        window.dispatchEvent(new CustomEvent('filter-products', { detail: categoryId }));

        // Scroll to collection section
        const element = document.getElementById('coleccion');
        if (element) {
            const yOffset = -80; // height of navbar
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-brand-primary font-black tracking-widest uppercase text-xs">Explora por Categoría</span>
                    <h2 className="text-4xl md:text-5xl font-serif italic text-brand-dark mt-4">Encuentra tu Estilo</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => handleCategoryClick(category.id)}
                            className={`group relative rounded-[2rem] overflow-hidden cursor-pointer ${category.size} shadow-lg hover:shadow-2xl transition-all duration-500`}
                        >
                            {/* Background with Gradient */}
                            <div className={`absolute inset-0 bg-slate-100 group-hover:bg-slate-200 transition-colors duration-500`} />

                            {/* Image */}
                            <div className="absolute inset-0 flex items-center justify-center p-8">
                                <motion.img
                                    whileHover={{ scale: 1.1, rotate: 2 }}
                                    transition={{ duration: 0.5 }}
                                    src={category.image}
                                    alt={t(category.nameKey)}
                                    className="w-full h-full object-contain drop-shadow-2xl z-10"
                                />
                            </div>

                            {/* Overlay Content */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 z-20" />

                            <div className="absolute bottom-0 left-0 p-8 z-30">
                                <h3 className="text-lg md:text-xl font-serif italic text-white mb-1 group-hover:translate-x-2 transition-transform duration-300">
                                    {t(category.nameKey)}
                                </h3>
                                <div className="h-0.5 w-0 bg-brand-primary group-hover:w-full transition-all duration-500" />
                            </div>

                            <div className="absolute bottom-8 right-8 z-40 h-10 w-10 rounded-full bg-slate-900 text-white shadow-xl border-2 border-white flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary group-hover:scale-110 transition-all duration-300">
                                <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
