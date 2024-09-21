import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import {
  ExternalError,
  ValidationExceptionFilter,
} from './exception/custom-exception-response.exception';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const messages = errors
          .map((error) => Object.values(error.constraints))
          .flat()
          .join(', ');
        return new BadRequestException(messages || 'Validation failed');
      },
    }),
  );
  const options = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('your-tag') // Optional: Add tags for grouping
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document); // Serve the Swagger UI at /api/docs

  app.useGlobalFilters(new ValidationExceptionFilter(), new ExternalError());
  await app.listen(4001);
}
bootstrap();
