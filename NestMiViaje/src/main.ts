import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as nunjucks from 'nunjucks';
import * as session from 'express-session';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(express.json({ limit: '50mb' }));
  app.enableCors();
  nunjucks.configure('views', {
    autoescape: true,
    express: app,
  });

  app.use(
    session({
      secret: '1234',
      resave: true,
      saveUninitialized: false,
    }),
  );

  app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
  });
  app.useStaticAssets(__dirname + '/../public', { prefix: 'public' });
  app.useStaticAssets(__dirname + '/../node_modules/bootstrap/dist');
  app.setViewEngine('njk');
  await app.listen(3000);
}
bootstrap();
