import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Banknote, CheckCircle, Copy, Wallet } from 'lucide-react';
import { useState } from 'react';
import { useNotification } from '../context/NotificationContext';

export default function Checkout({ cart = [] }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { addNotification } = useNotification();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Datos, 2: Pago

    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        phone: '',
        address: '',
        city: '',
        province: '',
        zipCode: '',
        message: '',
        paymentMethod: 'card' // card, mercadopago, transfer, cash
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        addNotification("Copiado al portapapeles", "success", "Copiado");
    };

    const nextStep = () => {
        if (!formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.province || !formData.zipCode) {
            addNotification("Por favor complete todos los campos de envío.", "error", "Datos Incompletos");
            return;
        }
        setStep(2);
        window.scrollTo(0, 0);
    };

    const handlePayment = async () => {
        setLoading(true);

        // Logic based on payment method
        if (formData.paymentMethod === 'card' || formData.paymentMethod === 'mercadopago') {
            try {
                // If cart is empty, prevent (though shouldn't happen if handled correctly upstream)
                if (cart.length === 0) {
                    addNotification("El carrito está vacío.", "error", "Error");
                    setLoading(false);
                    return;
                }

                const response = await fetch('http://localhost:5000/api/payment/create_preference', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        items: cart.map(item => ({
                            title: item.name,
                            quantity: item.quantity,
                            unit_price: item.price
                        })),
                        payer: {
                            name: formData.fullName,
                            email: user?.email
                        }
                    }),
                });

                const data = await response.json();
                if (data.id) {
                    // Redirect to Mercado Pago
                    window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.id}`;
                } else {
                    throw new Error("No se pudo generar la preferencia");
                }

            } catch (error) {
                console.error(error);
                addNotification("Error al conectar con Mercado Pago", "error", "Error de Pago");
                setLoading(false);
            }
        } else if (formData.paymentMethod === 'transfer') {
            // Send confirmation email
            try {
                await fetch('http://localhost:5000/api/payment/confirm_order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        orderDetails: cart,
                        userEmail: user?.email || 'cliente@ejemplo.com',
                        paymentMethod: 'transfer'
                    })
                });

                setTimeout(() => {
                    addNotification("Pedido Confirmado. Revisa tu correo.", "success", "¡Exito!");
                    navigate('/');
                }, 1000);
            } catch (error) {
                addNotification("Error al procesar pedido", "error", "Error");
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-brand-dark text-white pt-32 px-4 pb-20">
            <div className="max-w-4xl mx-auto">
                <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} />
                    Volver a la tienda
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl">
                            <h1 className="text-3xl font-serif italic mb-8">Pago Seguro</h1>

                            <div className="space-y-8">
                                {/* Shipping Fields */}
                                {step === 1 && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                                        <h3 className="font-bold text-xl flex items-center gap-2 text-brand-primary">
                                            <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-sm font-black border border-brand-primary/50">1</div>
                                            Datos de Envío
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Nombre Completo</label>
                                                <input name="fullName" type="text" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/10 focus:border-brand-primary outline-none text-white transition-all" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Teléfono</label>
                                                <input name="phone" type="tel" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/10 focus:border-brand-primary outline-none text-white transition-all" />
                                            </div>
                                            <div className="md:col-span-2 space-y-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Dirección</label>
                                                <input name="address" type="text" value={formData.address} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/10 focus:border-brand-primary outline-none text-white transition-all" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Ciudad</label>
                                                <input name="city" type="text" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/10 focus:border-brand-primary outline-none text-white transition-all" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Provincia</label>
                                                <input name="province" type="text" value={formData.province} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/10 focus:border-brand-primary outline-none text-white transition-all" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">CP</label>
                                                <input name="zipCode" type="text" value={formData.zipCode} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/10 focus:border-brand-primary outline-none text-white transition-all" />
                                            </div>
                                            <div className="md:col-span-2 space-y-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Mensaje (Opcional)</label>
                                                <textarea name="message" rows="2" value={formData.message} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/10 focus:border-brand-primary outline-none text-white transition-all resize-none" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Payment Method Selection */}
                                {step === 2 && (
                                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                                        <h3 className="font-bold text-xl flex items-center gap-2 text-brand-primary">
                                            <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-sm font-black border border-brand-primary/50">2</div>
                                            Método de Pago
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <button
                                                onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                                                className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${formData.paymentMethod === 'card' ? 'bg-brand-primary/10 border-brand-primary ring-1 ring-brand-primary' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                            >
                                                <CreditCard className={formData.paymentMethod === 'card' ? 'text-brand-primary' : 'text-gray-400'} />
                                                <div className="text-left">
                                                    <div className={`font-bold text-sm ${formData.paymentMethod === 'card' ? 'text-brand-primary' : 'text-gray-300'}`}>Tarjeta Crédito/Débito</div>
                                                    <div className="text-[10px] text-gray-500">Hasta 12 cuotas</div>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => setFormData({ ...formData, paymentMethod: 'mercadopago' })}
                                                className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${formData.paymentMethod === 'mercadopago' ? 'bg-blue-500/10 border-blue-500 ring-1 ring-blue-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                            >
                                                <Wallet className={formData.paymentMethod === 'mercadopago' ? 'text-blue-500' : 'text-gray-400'} />
                                                <div className="text-left">
                                                    <div className={`font-bold text-sm ${formData.paymentMethod === 'mercadopago' ? 'text-blue-500' : 'text-gray-300'}`}>Mercado Pago</div>
                                                    <div className="text-[10px] text-gray-500">Dinero en cuenta</div>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => setFormData({ ...formData, paymentMethod: 'transfer' })}
                                                className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${formData.paymentMethod === 'transfer' ? 'bg-purple-500/10 border-purple-500 ring-1 ring-purple-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                            >
                                                <div className="text-left">
                                                    <div className={`font-bold text-sm ${formData.paymentMethod === 'transfer' ? 'text-purple-500' : 'text-gray-300'}`}>Transferencia</div>
                                                    <div className="text-[10px] text-gray-500">10% de Descuento</div>
                                                </div>
                                            </button>
                                        </div>

                                        {/* Dynamic Payment Content */}
                                        <AnimatePresence mode="wait">
                                            {formData.paymentMethod === 'transfer' && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 mt-4"
                                                >
                                                    <h4 className="font-bold text-purple-400 mb-4 flex items-center gap-2">
                                                        Datos Bancarios
                                                        <span className="text-[10px] bg-purple-500 text-white px-2 py-0.5 rounded-full">10% OFF</span>
                                                    </h4>
                                                    <div className="space-y-3 text-sm">
                                                        <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg">
                                                            <span className="text-gray-400">Banco</span>
                                                            <span className="font-bold text-white">Banco Santander</span>
                                                        </div>
                                                        <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg">
                                                            <span className="text-gray-400">CBU</span>
                                                            <button onClick={() => copyToClipboard('0000003100044883311122')} className="flex items-center gap-2 font-mono font-bold text-white hover:text-purple-400 transition-colors">
                                                                0000003100044883311122 <Copy size={14} />
                                                            </button>
                                                        </div>
                                                        <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg">
                                                            <span className="text-gray-400">Alias</span>
                                                            <button onClick={() => copyToClipboard('SOL.TIENDA.MP')} className="flex items-center gap-2 font-mono font-bold text-white hover:text-purple-400 transition-colors">
                                                                SOL.TIENDA.MP <Copy size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl sticky top-32">
                            <h3 className="font-serif italic text-xl mb-6">Resumen del Pedido</h3>
                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item, index) => (
                                    <div key={index} className="flex gap-3">
                                        <div className="h-12 w-12 rounded-lg bg-white/10 overflow-hidden shrink-0">
                                            <img src={item.image} alt="" className="h-full w-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{item.name}</p>
                                            <p className="text-xs text-gray-500">x{item.quantity}</p>
                                        </div>
                                        <div className="text-sm font-bold">${item.price * item.quantity}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-white/10 pt-4 space-y-2">
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>Subtotal</span>
                                    <span>${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>Envío</span>
                                    <span className="text-brand-primary font-bold text-xs uppercase">Calculado en el siguiente paso</span>
                                </div>
                                <div className="flex justify-between text-xl font-black mt-4 pt-4 border-t border-white/10">
                                    <span>Total</span>
                                    <span>${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</span>
                                </div>
                            </div>

                            {step === 1 ? (
                                <button
                                    onClick={nextStep}
                                    className="w-full mt-8 py-4 bg-white text-brand-dark font-black tracking-[0.2em] uppercase rounded-xl hover:bg-brand-primary hover:text-white transition-all shadow-xl"
                                >
                                    Continuar a Pago
                                </button>
                            ) : (
                                <button
                                    onClick={handlePayment}
                                    disabled={loading}
                                    className="w-full mt-8 py-4 bg-brand-primary text-white font-black tracking-[0.2em] uppercase rounded-xl hover:bg-white hover:text-brand-dark transition-all shadow-xl shadow-brand-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            {formData.paymentMethod === 'card' || formData.paymentMethod === 'mercadopago' ? 'Pagar Ahora' : 'Confirmar Pedido'}
                                        </>
                                    )}
                                </button>
                            )}

                            <div className="mt-4 flex items-center justify-center gap-3 text-white/20">
                                <CreditCard size={20} />
                                <Wallet size={20} />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Pagos Seguros</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
