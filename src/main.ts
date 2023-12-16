import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 8000;

  const config = new DocumentBuilder()
    .setTitle('MyRefrigerator')
    .setDescription('The fridge API')
    .setVersion('1.0')
    .addTag('fridge')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: process.env.CLIENT_URL || `http://localhost:3000`,
  });

  await app.listen(PORT);
}
bootstrap();
