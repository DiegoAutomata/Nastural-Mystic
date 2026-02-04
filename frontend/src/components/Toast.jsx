import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useEffect } from 'react';

const icons = {
    success: <CheckCircle className="text-green-500" size={24} />,
    error: <XCircle className="text-red-500" size={24} />,
    info: <Info className="text-blue-500" size={24} />
};

const bgColors = {
    success: 'bg-green-500/10 border-green-500/20',
    error: 'bg-red-500/10 border-red-500/20',
    info: 'bg-blue-500/10 border-blue-500/20'
};

export default function Toast({ title, message, type = 'info', onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={`flex items-center gap-4 p-4 rounded-xl backdrop-blur-md border shadow-xl ${bgColors[type]} max-w-sm w-full pointer-events-auto`}
        >
            <div className="flex-shrink-0">
                {icons[type]}
            </div>
            <div className="flex-1">
                {title && <h4 className={`text-sm font-bold mb-1 ${type === 'error' ? 'text-red-400' : type === 'success' ? 'text-green-400' : 'text-blue-400'}`}>{title}</h4>}
                <p className={`text-xs ${type === 'error' ? 'text-red-300' : type === 'success' ? 'text-green-300' : 'text-blue-300'} opacity-90 leading-relaxed`}>
                    {message}
                </p>
            </div>
            <button
                onClick={onClose}
                className="text-white/40 hover:text-white transition-colors"
            >
                <X size={18} />
            </button>
        </motion.div>
    );
}
