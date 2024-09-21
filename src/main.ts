import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import {
  ExternalError,
  ValidationExceptionFilter,
} from './exception/custom-exception-response.exception';

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
  app.useGlobalFilters(new ValidationExceptionFilter(), new ExternalError());
  await app.listen(4001);
}
bootstrap();
