const { connect } = require('../_db.js');
const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {
  try {
    const db = await connect();
    const product = await db.collection('products').findOne({ _id: new ObjectId(req.query.id) });
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json({ ...product, _id: product._id.toString() });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
