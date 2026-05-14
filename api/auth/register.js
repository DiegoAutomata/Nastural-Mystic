const { connect } = require('../_db.js');
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    
    const db = await connect();
    const existing = await db.collection('users').findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ error: 'User already exists' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.collection('users').insertOne({
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    res.status(201).json({
      id: result.insertedId.toString(),
      email: email.toLowerCase(),
      role: 'user'
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
