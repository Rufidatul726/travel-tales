import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Allow all origins. You can specify specific origins like 'https://example.com'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  });

  const config = new DocumentBuilder()
    .setTitle('TravelTales')
    .setDescription('API Documentation')
    .setVersion('3.0')
    .addTag('TravelTales')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-list', app, document);

  await app.listen(3005);
}
bootstrap();
