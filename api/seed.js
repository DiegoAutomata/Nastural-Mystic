const { MongoClient } = require('mongodb');

const URI = process.env.MONGODB_URI || '';
const DB_NAME = 'natural-mystic';

const products = [
  {
    name: 'Vela de Soja "Luna Nueva"',
    description: 'Vela alquímica de cera de soja pura con aceite esencial de lavanda orgánica y cristales de amatista. Ideal para meditación y calma.',
    price: 22.00, category: 'Velas',
    image: '/images/products/vela-luna-nueva.jpg', stock: 30,
    createdAt: new Date(), updatedAt: new Date()
  },
  {
    name: 'Vela de Soja "Bosque Encantado"',
    description: 'Aroma profundo a pino, musgo y tierra húmeda. Cera de soja 100% natural libre de parafinas.',
    price: 24.00, category: 'Velas',
    image: '/images/products/vela-bosque-encantado.jpg', stock: 25,
    createdAt: new Date(), updatedAt: new Date()
  },
  {
    name: 'Sahumerio de Palo Santo',
    description: 'Madera sagrada recolectada sustentablemente en Perú. Limpia la energía densa y eleva la vibración del hogar.',
    price: 12.00, category: 'Sahumerios',
    image: '/images/products/sahumerio-palo-santo.jpg', stock: 100,
    createdAt: new Date(), updatedAt: new Date()
  },
  {
    name: 'Atado de Salvia Blanca',
    description: 'Sahumo ancestral de salvia blanca californiana. Purificación profunda de espacios y aura.',
    price: 18.00, category: 'Sahumerios',
    image: '/images/products/salvia-blanca.jpg', stock: 50,
    createdAt: new Date(), updatedAt: new Date()
  },
  {
    name: 'Jabón Natural de Avena & Miel',
    description: 'Jabón saponificado en frío con leche de avena y miel orgánica. Suavidad extrema para pieles sensibles.',
    price: 10.50, category: 'Jabones',
    image: '/images/products/jabon-avena.jpg', stock: 40,
    createdAt: new Date(), updatedAt: new Date()
  },
  {
    name: 'Jabón de Rosas Silvestres',
    description: 'Hecho con aceite de rosa mosqueta y pétalos reales. Propiedades regeneradoras y aroma embriagador.',
    price: 12.00, category: 'Jabones',
    image: '/images/products/jabon-rosas.jpg', stock: 35,
    createdAt: new Date(), updatedAt: new Date()
  },
  {
    name: 'Crema Nutritiva "Diosa Solar"',
    description: 'Crema facial rica en caléndula y manteca de karité. Hidratación profunda y brillo natural.',
    price: 28.00, category: 'Cremas',
    image: '/images/products/crema-diosa-solar.jpg', stock: 20,
    createdAt: new Date(), updatedAt: new Date()
  },
  {
    name: 'Serum Facial "Elixir Nocturno"',
    description: 'Concentrado de aceites botánicos con bakuchiol y lavanda. Reparación intensiva mientras duermes.',
    price: 35.00, category: 'Cremas',
    image: '/images/products/serum-elixir.jpg', stock: 15,
    createdAt: new Date(), updatedAt: new Date()
  },
];

module.exports = async (req, res) => {
  if (req.method === 'GET' && req.query.key !== 'seed-natural-mystic-2026') {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  
  try {
    const client = new MongoClient(URI);
    await client.connect();
    const db = client.db(DB_NAME);
    
    // Clear existing products
    await db.collection('products').deleteMany({});
    
    // Insert new products
    const result = await db.collection('products').insertMany(products);
    await client.close();
    
    res.json({ ok: true, inserted: result.insertedCount });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
