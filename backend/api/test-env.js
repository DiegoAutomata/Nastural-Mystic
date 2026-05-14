module.exports = (req, res) => {
  res.json({
    hasMongoUri: !!process.env.MONGODB_URI,
    mongoUriPrefix: (process.env.MONGODB_URI || '').substring(0, 25),
    envKeys: Object.keys(process.env).filter(k => k.includes('MONGO') || k.includes('VERCEL')),
    nodeVersion: process.version,
    cwd: process.cwd(),
    dotenvExists: (() => { try { require('fs').accessSync('.env'); return true; } catch { return false; } })()
  });
};
