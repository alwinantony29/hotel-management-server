import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT || 3000;
  const HOST = process.env.HOST || 'localhost';

  await app.listen(PORT, HOST);

  console.log(`🚀 Nest js server is running on: ${await app.getUrl()}`);
}
bootstrap();
