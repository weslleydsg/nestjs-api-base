import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as Sentry from '@sentry/node';

import './config/dotenv';
import sentryConfig from './config/sentry';
import { AppModule } from './app.module';
import { ValidationPipe } from './shared/pipes/validation.pipe';

async function bootstrap() {
  const APP_PORT = process.env.APP_PORT || 3333;
  const { APP_PROTOCOL, APP_DOMAIN, APP_INDEX_ROUTE } = process.env;
  const INDEX_ROUTE = APP_INDEX_ROUTE ? `/${APP_INDEX_ROUTE}` : '';

  Sentry.init(sentryConfig);

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(APP_PORT);

  if (process.env.NODE_ENV === 'development')
    Logger.log(
      `Server is running on ${APP_PROTOCOL}://${APP_DOMAIN}:${APP_PORT}${INDEX_ROUTE}`,
      'Bootstrap',
    );
}
bootstrap();
