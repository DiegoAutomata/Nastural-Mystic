const { connect } = require('./_db.js');

module.exports = async (req, res) => {
  try {
    const db = await connect();
    const products = await db.collection('products').find().toArray();
    // Convert _id to string for JSON
    const result = products.map(p => ({ ...p, _id: p._id.toString() }));
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
