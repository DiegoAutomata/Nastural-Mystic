import { Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer id="contacto" className="bg-desert-primary text-white py-12 md:py-20 border-t border-desert-accent/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <img
                                src="/images/logo.png"
                                alt="Natural Mystic"
                                className="w-12 h-12 object-contain"
                            />
                            <span className="font-cinzel text-lg font-bold tracking-widest uppercase text-white">
                                Natural Mystic
                            </span>
                        </div>
                        <p className="text-white/80 font-montserrat text-sm leading-relaxed font-normal">
                            Conectando la naturaleza con tu bienestar espiritual a través de creaciones artesanales hechas con alma y conciencia.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-cinzel text-white mb-6 uppercase tracking-widest text-sm font-bold">Explorar</h4>
                        <ul className="space-y-4 font-montserrat text-sm text-white/80 font-medium">
                            <li><button onClick={() => scrollToSection('productos')} className="hover:text-desert-accent transition-colors">Colección Completa</button></li>
                            <li><button onClick={() => scrollToSection('historia')} className="hover:text-desert-accent transition-colors">Nuestra Historia</button></li>
                            <li><button onClick={() => scrollToSection('ingredientes')} className="hover:text-desert-accent transition-colors">Ingredientes Maestros</button></li>
                            <li><a href="/#productos" className="hover:text-desert-accent transition-colors">Tienda</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-cinzel text-white mb-6 uppercase tracking-widest text-sm font-bold">Atención</h4>
                        <ul className="space-y-4 font-montserrat text-sm text-white/80 font-medium">
                            <li><button onClick={() => scrollToSection('contacto')} className="hover:text-desert-accent transition-colors">Envíos y Entregas</button></li>
                            <li><button onClick={() => scrollToSection('contacto')} className="hover:text-desert-accent transition-colors">Políticas</button></li>
                            <li><button onClick={() => scrollToSection('contacto')} className="hover:text-desert-accent transition-colors">FAQ</button></li>
                            <li><a href="mailto:hola@naturalmystic.com" className="hover:text-desert-accent transition-colors">Mayoristas</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-cinzel text-white mb-6 uppercase tracking-widest text-sm font-bold">Unirse al Círculo</h4>
                        <div className="flex gap-4 mb-8">
                            <a href="https://www.instagram.com/natural.mystic888/" target="_blank" rel="noopener noreferrer" className="p-2 border border-desert-accent/20 hover:border-white transition-colors rounded-full bg-white/10 hover:bg-white/20">
                                <Instagram size={18} className="text-white" />
                            </a>
                            <a href="mailto:hola@naturalmystic.com" className="p-2 border border-desert-accent/20 hover:border-white transition-colors rounded-full bg-white/10 hover:bg-white/20">
                                <Mail size={18} className="text-white" />
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone size={18} className="text-white" />
                            <span className="text-sm text-white/80 font-medium">Consultanos por MD</span>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-desert-accent/10 text-center">
                    <p className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-montserrat font-bold">
                        © 2026 Natural Mystic • Hecho con Magia & Conciencia
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
