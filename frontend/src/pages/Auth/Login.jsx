import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../../components/InputField';
import { useTranslation } from 'react-i18next';
import { useNotification } from '../../context/NotificationContext';

export default function Login() {
    const { t } = useTranslation();
    const { login } = useAuth();
    const navigate = useNavigate();
    const { addNotification } = useNotification();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const res = await login(formData.email, formData.password);
        if (res.success) {
            addNotification("Bienvenido a Aura Fit", "success", "Inicio de Sesión Exitoso");
            navigate('/');
        } else {
            addNotification("Verifique sus credenciales e intente nuevamente.", "error", "Error de Autenticación");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-brand-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[100px]" />
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <Link to="/" className="flex justify-center mb-6">
                    <span className="text-3xl font-serif italic text-white">Aura <span className="text-brand-primary not-italic font-sans font-black">Fit</span></span>
                </Link>
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 text-center text-3xl font-extrabold text-white"
                >
                    {t('auth.welcomeBack', 'Bienvenido de nuevo')}
                </motion.h2>
                <p className="mt-2 text-center text-sm text-gray-400">
                    {t('auth.accessAccount', 'Accede a tu cuenta para continuar')}
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-slate-900/50 backdrop-blur-xl py-8 px-4 shadow-2xl sm:rounded-3xl sm:px-10 border border-white/5"
                >
                    <form className="space-y-6" onSubmit={handleSubmit}>

                        <InputField
                            label="Email"
                            type="email"
                            placeholder="tu@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <InputField
                            label="Contraseña"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <a href="#" className="font-medium text-brand-primary hover:text-brand-primary/80">
                                    {t('auth.forgotPassword', '¿Olvidaste tu contraseña?')}
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
                            >
                                {loading ? 'Cargando...' : t('auth.signIn', 'Iniciar Sesión')}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-700" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-slate-900 text-gray-400">{t('auth.or', 'O continúa con')}</span>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-400">
                                {t('auth.noAccount', '¿No tienes cuenta?')}
                                <Link to="/register" className="font-medium text-brand-primary hover:text-brand-primary/80 ml-2">
                                    {t('auth.register', 'Regístrate')}
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
