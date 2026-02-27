import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.enableCors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//     credentials: true,
//   });
//   await app.listen(process.env.PORT ?? 3001);
// }


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://medical-document-processing-ai-agen-lovat.vercel.app',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
