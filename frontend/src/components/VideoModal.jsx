import { useEffect } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

export default function VideoModal({ onClose }) {
    useEffect(() => {
        // Bloquear scroll
        document.body.style.overflow = 'hidden';
        console.log("VideoModal Component Mounted");
        return () => {
            document.body.style.overflow = 'unset';
            console.log("VideoModal Component Unmounted");
        };
    }, []);

    // Video ID: _99_pD-l64c (Cinematic Gym/Fitness)
    const videoId = "_99_pD-l64c";

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-4 md:p-12"
            style={{
                zIndex: 999999,
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón de Cierre con alta visibilidad */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-[100] w-12 h-12 flex items-center justify-center bg-white text-black rounded-full shadow-2xl cursor-pointer hover:bg-brand-primary hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Mensaje de Carga (detrás del iframe) */}
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold opacity-30">
                    Cargando Film...
                </div>

                {/* Iframe Estándar YouTube (El más compatible) */}
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1`}
                    title="Aura Fit Film"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="relative z-10 w-full h-full"
                ></iframe>
            </motion.div>
        </motion.div>,
        document.body
    );
}
