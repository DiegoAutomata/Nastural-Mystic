require('reflect-metadata');

const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/app.module');
const { ValidationPipe } = require('@nestjs/common');
const helmet = require('helmet');

let cachedApp;

async function getApp() {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule, { logger: ['error'] });
    app.use(helmet());
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    await app.init();
    cachedApp = app;
  }
  return cachedApp;
}

module.exports = async (req, res) => {
  try {
    const app = await getApp();
    // Prevent NestJS from listening on a port - use the Vercel request/response
    const instance = app.getHttpAdapter().getInstance();
    instance(req, res);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: err.message }));
  }
};
