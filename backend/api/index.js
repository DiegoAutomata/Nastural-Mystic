const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/app.module');
const { ValidationPipe } = require('@nestjs/common');
const helmet = require('helmet');

let cachedApp;

async function getApp() {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule);
    app.use(helmet());
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));
    await app.init();
    cachedApp = app;
  }
  return cachedApp;
}

module.exports = async (req, res) => {
  const app = await getApp();
  app.getHttpAdapter().getInstance()(req, res);
};
