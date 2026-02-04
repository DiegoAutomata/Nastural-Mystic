import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../../components/InputField';
import { useTranslation } from 'react-i18next';
import { useNotification } from '../../context/NotificationContext';

export default function Register() {
    const { t } = useTranslation();
    const { register } = useAuth();
    const navigate = useNavigate();
    const { addNotification } = useNotification();

    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Password Validation
        if (/\s/.test(formData.password)) {
            addNotification("La contraseña no puede contener espacios.", "error", "Formato Inválido");
            return;
        }

        if (!/[A-Z]/.test(formData.password)) {
            addNotification("La contraseña debe contener al menos una letra mayúscula.", "error", "Contraseña Insegura");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            addNotification("Asegúrese de que ambas contraseñas coincidan.", "error", "Contraseñas no coinciden");
            return;
        }

        setLoading(true);

        const res = await register(formData.name, formData.email, formData.password);
        if (res.success) {
            addNotification("Su cuenta ha sido creada correctamente. Bienvenido.", "success", "Registro Exitoso");
            navigate('/');
        } else {
            console.error("Registration Error:", res.error);

            let title = "Error en el Registro";
            let msg = "No pudimos procesar su solicitud en este momento. Por favor, intente nuevamente.";

            if (res.error === 'User already exists') {
                title = "Cuenta Existente";
                msg = "La dirección de correo electrónico proporcionada ya está asociada a una cuenta.";
            } else if (res.error && res.error.includes('duplicate')) { // Fallback for raw DB errors
                title = "Cuenta Existente";
                msg = "La dirección de correo electrónico proporcionada ya está asociada a una cuenta.";
            }

            addNotification(msg, "error", title);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-brand-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[150px]" />
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
                    {t('auth.createAccount', 'Crea tu cuenta')}
                </motion.h2>
                <p className="mt-2 text-center text-sm text-gray-400">
                    {t('auth.joinCommunity', 'Únete a la comunidad Aura Fit')}
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
                            label={t('auth.name', "Nombre y Apellido")}
                            type="text"
                            placeholder="Ej: Juan Pérez"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <InputField
                            label="Email"
                            type="email"
                            placeholder="tu@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <InputField
                            label={t('auth.password', "Contraseña")}
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <InputField
                            label={t('auth.confirmPassword', "Confirmar Contraseña")}
                            type="password"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
                            >
                                {loading ? 'Cargando...' : t('auth.signUp', 'Registrarse')}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                            {t('auth.hasAccount', '¿Ya tienes cuenta?')}
                            <Link to="/login" className="font-medium text-brand-primary hover:text-brand-primary/80 ml-2">
                                {t('auth.signIn', 'Inicia Sesión')}
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
