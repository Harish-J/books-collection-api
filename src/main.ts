import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Book Collection API')
    .setDescription('API documentation for managing books and topics')
    .setVersion('1.0')
    .addTag('books')
    .addTag('topics')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use('/', (req, res) => {
    res.send('Welcome to the Books Collection RESTful API!');
  });
  app.enableCors();
  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}


bootstrap();
