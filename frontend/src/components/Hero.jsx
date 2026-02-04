import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

export default function Hero() {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="relative min-h-screen flex items-center bg-white pt-20 overflow-hidden"
    >
      {/* Dynamic Background with Parallax */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[80%] lg:w-[70%] h-[70%] bg-brand-primary/5 rounded-full blur-[80px] lg:blur-[140px] mix-blend-multiply" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[70%] lg:w-[60%] h-[60%] bg-brand-accent/5 rounded-full blur-[80px] lg:blur-[120px] mix-blend-multiply" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-8 lg:py-0 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-center h-full">

          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ opacity }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 md:gap-3 py-1.5 md:py-2 px-4 md:px-5 rounded-full bg-slate-900 text-white mb-6 md:mb-10 shadow-xl">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand-accent animate-pulse" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">
                {t('hero.collection')}
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-brand-dark leading-[0.8] mb-6 md:mb-10 tracking-tighter italic">
              Aura <br />
              <span className="text-brand-primary not-italic font-sans font-black tracking-tighter block mt-1 md:mt-2">
                Fit
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-base md:text-xl text-slate-500 max-w-lg mx-auto lg:mx-0 mb-8 md:mb-12 font-medium leading-relaxed px-4 lg:px-0">
              Elevando tu energía a través del movimiento y el estilo. Ropa diseñada para tu mejor versión.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-8">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#0f172a" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.dispatchEvent(new CustomEvent('filter-products', { detail: 'all' }))}
                className="bg-brand-primary text-white px-8 md:px-12 py-4 md:py-5 rounded-none font-black tracking-[0.1em] md:tracking-[0.2em] uppercase text-[10px] md:text-xs transition-all shadow-2xl shadow-brand-primary/30"
              >
                {t('hero.buyNow')}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Visual Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-auto justify-center flex items-center order-1 lg:order-2 mb-8 md:mb-12 lg:mb-0"
          >
            <motion.div
              style={{ y: y2 }}
              className="relative z-10 w-full max-w-[320px] sm:max-w-md md:max-w-lg lg:max-w-none mx-auto aspect-[4/5] lg:h-[85vh] overflow-hidden rounded-[24px] md:rounded-[40px] shadow-[-20px_20px_40px_rgba(0,0,0,0.1)] lg:shadow-[-40px_40px_80px_rgba(0,0,0,0.15)] ring-1 ring-black/5"
            >
              <img
                src="/src/assets/hero_aura.png"
                alt="Aura Fit Lifestyle"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/30 via-transparent to-white/10" />
            </motion.div>

            {/* Floating Card */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 1, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-4 sm:-bottom-10 sm:-left-10 lg:-left-20 z-20 bg-white shadow-[0_16px_32px_rgba(0,0,0,0.08)] lg:shadow-[0_32px_64px_rgba(0,0,0,0.1)] p-5 md:p-10 rounded-2xl md:rounded-3xl border border-slate-100 max-w-[180px] md:max-w-[280px]"
            >
              <div className="flex flex-col gap-2 md:gap-4">
                <div className="flex -space-x-2 md:-space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                    </div>
                  ))}
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white bg-brand-primary text-white flex items-center justify-center text-[8px] md:text-[10px] font-bold">+5k</div>
                </div>
                <p className="text-[9px] md:text-xs text-slate-400 font-bold uppercase tracking-widest leading-tight">Comunidad Aura Fit</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
