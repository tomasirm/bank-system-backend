import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(process.env.DB_PASSWPRD)
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  console.log(port);

  app.enableCors();
  await app.listen(port);
}
bootstrap();
