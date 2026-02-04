import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer({ isOpen, onClose, cart = [], updateQuantity, removeFromCart }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 0 : 0; // Free shipping for now
    const total = subtotal + shipping;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-brand-dark z-[160] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="text-brand-primary" />
                                <h2 className="text-xl font-serif italic text-white">Tu Carrito</h2>
                                <span className="bg-white/10 text-white text-[10px] px-2 py-0.5 rounded-full font-black">
                                    {cart.reduce((acc, item) => acc + item.quantity, 0)} ITEMS
                                </span>
                            </div>
                            <button
                                onClick={onClose}
                                className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-white/10 text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center text-white/20">
                                        <ShoppingBag size={40} />
                                    </div>
                                    <p className="text-slate-400 font-medium">Tu carrito está vacío</p>
                                    <button
                                        onClick={onClose}
                                        className="text-brand-primary font-black uppercase text-[10px] tracking-widest hover:text-white transition-colors"
                                    >
                                        Continuar Comprando
                                    </button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        className="flex gap-4 group"
                                    >
                                        <div className="h-24 w-24 rounded-2xl overflow-hidden bg-slate-900 border border-white/5 flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-white font-serif italic text-lg leading-tight">{item.name}</h3>
                                                    <p className="text-brand-accent text-[10px] font-black uppercase tracking-widest mt-1">
                                                        {t(`products.${item.category}`)}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-white/20 hover:text-red-400 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>

                                            <div className="flex justify-between items-end">
                                                <div className="flex items-center bg-white/5 rounded-full border border-white/10 p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-white/10 text-white"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="w-8 text-center text-white text-xs font-bold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-white/10 text-white"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                                <span className="text-brand-primary font-black text-lg">${item.price * item.quantity}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Summary */}
                        {cart.length > 0 && (
                            <div className="p-6 bg-white/5 border-t border-white/10 space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-slate-400 text-sm">
                                        <span>Subtotal</span>
                                        <span>${subtotal}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400 text-sm">
                                        <span>Envío</span>
                                        <span className="text-brand-primary font-bold uppercase text-[10px]">Gratis</span>
                                    </div>
                                    <div className="h-px bg-white/10 my-2" />
                                    <div className="flex justify-between items-end">
                                        <span className="text-white font-bold">Total</span>
                                        <span className="text-3xl font-black text-brand-primary tracking-tight">${total}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        onClose();
                                        navigate('/checkout');
                                    }}
                                    className="w-full bg-brand-primary text-white py-5 rounded-none font-black tracking-[0.2em] uppercase text-xs hover:bg-white hover:text-brand-dark transition-all shadow-xl shadow-brand-primary/20"
                                >
                                    Finalizar Compra
                                </button>
                                <p className="text-[10px] text-white/20 text-center font-bold tracking-widest uppercase pb-2">
                                    Pagos seguros con Aura Fit
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
