import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Marquee() {
    const { t } = useTranslation();
    const marqueeVariants = {
        animate: {
            x: [0, -1035],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                },
            },
        },
    };

    return (
        <div className="relative flex overflow-hidden py-10 bg-brand-dark -rotate-1 shadow-2xl z-20 mx-[-20px] scale-110 border-y-4 border-brand-primary">
            <div className="absolute inset-0 bg-brand-primary/10 blur-xl"></div>
            <motion.div
                className="flex whitespace-nowrap gap-16"
                variants={marqueeVariants}
                animate="animate"
            >
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center gap-16">
                        <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 italic tracking-tighter">
                            {t('marquee.aurafit')}
                        </span>
                        <img src="/src/assets/logo.jpg" alt="Icon" className="w-12 h-12 rounded-full grayscale opacity-50 animate-pulse" />
                        <span className="text-6xl font-black text-white/20 italic tracking-tighter">
                            {t('marquee.performance')}
                        </span>
                        <img src="/src/assets/logo.jpg" alt="Icon" className="w-12 h-12 rounded-full grayscale opacity-50 animate-pulse" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
