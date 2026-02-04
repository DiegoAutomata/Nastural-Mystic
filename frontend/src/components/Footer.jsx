import { Instagram, Twitter, Facebook, ArrowUp, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Footer() {
    const { t } = useTranslation();

    const socialLinks = [
        { Icon: Instagram, href: "#", name: "Instagram" },
        { Icon: Twitter, href: "#", name: "Twitter" },
        { Icon: Facebook, href: "#", name: "Facebook" }
    ];

    const footerLinks = {
        explore: [
            { name: t('navbar.men'), id: 'coleccion', filter: 'training' },
            { name: t('navbar.women'), id: 'coleccion', filter: 'yoga' },
            { name: t('navbar.accessories'), id: 'coleccion', filter: 'accessories' },
            { name: t('footer.newArrivals'), id: 'coleccion', filter: 'all' }
        ],
        support: [
            { name: t('footer.shipping'), href: "#" },
            { name: t('footer.returns'), href: "#" },
            { name: t('footer.sizing'), href: "#" },
            { name: t('footer.contact'), href: "#" }
        ]
    };

    const handleFilterClick = (filter) => {
        window.dispatchEvent(new CustomEvent('filter-products', { detail: filter }));
    };

    return (
        <footer id="contacto" className="bg-brand-dark text-white pt-24 pb-12 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">

                    {/* Brand Section */}
                    <div className="md:col-span-5 space-y-8">
                        <div
                            className="flex items-center gap-3 cursor-pointer group w-fit"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            <img src="/logo.jpg" alt="Logo" className="h-12 w-12 rounded-full object-cover transition-all duration-500 hover:scale-105" />
                            <span className="text-3xl font-serif italic tracking-tighter text-white">
                                Aura <span className="text-brand-primary not-italic font-sans font-black uppercase tracking-widest text-xl">Fit</span>
                            </span>
                        </div>

                        <p className="text-slate-400 text-lg leading-relaxed max-w-md italic font-serif">
                            "{t('footer.description')}"
                        </p>

                        <div className="flex gap-4">
                            {socialLinks.map(({ Icon, name }, i) => (
                                <motion.a
                                    key={i}
                                    whileHover={{ y: -5, color: "#3b82f6" }}
                                    href="#"
                                    className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-brand-dark transition-all duration-300"
                                    aria-label={name}
                                >
                                    <Icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div className="md:col-span-2 space-y-8">
                        <h4 className="text-brand-accent font-black tracking-[0.3em] uppercase text-[10px]">{t('footer.explore')}</h4>
                        <ul className="space-y-4">
                            {footerLinks.explore.map((link, i) => (
                                <li key={i}>
                                    <button
                                        onClick={() => handleFilterClick(link.filter)}
                                        className="text-slate-400 hover:text-white transition-colors text-sm font-medium tracking-wide"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div className="md:col-span-2 space-y-8">
                        <h4 className="text-brand-accent font-black tracking-[0.3em] uppercase text-[10px]">{t('footer.help')}</h4>
                        <ul className="space-y-4">
                            {footerLinks.support.map((link, i) => (
                                <li key={i}>
                                    <a href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm font-medium tracking-wide">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="md:col-span-3 space-y-8">
                        <h4 className="text-brand-accent font-black tracking-[0.3em] uppercase text-[10px]">Aura Club</h4>
                        <div className="space-y-4">
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                                Únete para recibir ofertas exclusivas y novedades.
                            </p>
                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="Tu email"
                                    className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-sm focus:outline-none focus:border-brand-primary transition-all pr-12"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-white hover:text-brand-dark transition-all group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 mt-24 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] text-white/20 font-black tracking-[0.4em] uppercase">
                        {t('footer.rights')}
                    </p>

                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="group flex items-center gap-4 text-[10px] font-black tracking-[0.4em] uppercase text-white/40 hover:text-white transition-colors"
                    >
                        Volver al inicio
                        <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                            <ArrowUp size={16} />
                        </div>
                    </button>
                </div>
            </div>
        </footer>
    );
}
