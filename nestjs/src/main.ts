import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: '2mb' })); // jsonをパースする際のlimitを設定
  app.use(bodyParser.urlencoded({ limit: '2mb', extended: true })); // urlencodeされたボディをパースする際のlimitを設定
  await app.listen(3000);
}
bootstrap();
