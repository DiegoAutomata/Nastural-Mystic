# Natural Mystic

Cosmética natural y artesanal — e-commerce de productos de bienestar espiritual hechos a mano.

**URL de producción**: [natural-mystic-omega.vercel.app](https://natural-mystic-omega.vercel.app)

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | React 19, TypeScript, Vite 7, Tailwind CSS 4 |
| Animaciones | Framer Motion |
| Backend API | Vercel Serverless Functions (Node.js) |
| Base de datos | MongoDB Atlas (gratis) |
| Autenticación | JWT + bcrypt |
| Despliegue | Vercel |

---

## Estructura del proyecto

```
├── api/                    # API serverless (Vercel Functions)
│   ├── _db.js              # Conexión MongoDB
│   ├── health.js           # Health check
│   ├── products.js         # GET productos
│   ├── products/[id].js    # GET producto por ID
│   ├── seed.js             # Seed de productos
│   └── auth/
│       ├── login.js        # POST login
│       └── register.js     # POST registro
├── backend/                # NestJS original (local dev)
├── src/                    # Frontend React
│   ├── components/         # Componentes UI
│   ├── context/            # Contextos (Cart, Admin)
│   ├── pages/              # Páginas (Home)
│   ├── services/           # Servicios API
│   └── assets/             # Recursos estáticos
├── public/images/          # Imágenes del sitio
└── vercel.json             # Config de Vercel
```

---

## Funcionalidades

- **Catálogo de productos**: 8 productos en 4 categorías (Velas, Sahumerios, Jabones, Cremas)
- **Carrito de compras**: Añadir, quitar, modificar cantidades, persistencia en localStorage
- **Checkout simulado**: Formulario de envío, selección de método de pago, formulario de tarjeta (falso, sin procesar pagos reales)
- **Autenticación**: Registro y login con JWT
- **Panel de administración**: Gestión de productos y usuarios
- **Responsive**: Adaptado a mobile, tablet y desktop
- **Modo oscuro/claro**: Navbar y footer con transiciones

---

## Variables de entorno (Vercel)

| Variable | Descripción |
|---|---|
| `MONGODB_URI` | String de conexión a MongoDB Atlas |
| `VITE_API_URL` | URL de la API (vacío = mismo dominio) |
| `JWT_SECRET` | Clave secreta para tokens JWT |

---

## Desarrollo local

```bash
# Instalar dependencias
pnpm install

# Iniciar frontend
pnpm run dev

# Iniciar backend NestJS (opcional)
cd backend && pnpm run start:dev
```

---

## Notas

- El checkout es una simulación visual. No se conecta a ninguna pasarela de pago real.
- Las imágenes de productos fueron generadas con Fal.ai Flux.
- La API serverless reemplazó al backend NestJS en producción para reducir costos y complejidad.
- 

