module.exports = async (req, res) => {
  const { connect } = require('./_db.js');
  try {
    const db = await connect();
    await db.command({ ping: 1 });
    res.json({ status: 'ok', mongodb: 'connected' });
  } catch (e) {
    res.json({ status: 'ok', mongodb: 'disconnected' });
  }
};
