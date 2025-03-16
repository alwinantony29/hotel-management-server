import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const PORT = process.env.PORT || 3000;
  const HOST = process.env.HOST || 'localhost';
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, HOST);

  console.log(`🚀 Nest js server is running on: ${await app.getUrl()}`);
}
bootstrap();
