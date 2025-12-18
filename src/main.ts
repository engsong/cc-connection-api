import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './common/logger.service';
import { LoggingInterceptor } from './common/logging.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // capture early logs
  });

  const config = app.get(ConfigService);
  const logger = app.get(LoggerService);

  // Replace Nest default logger with custom Winston logger
  app.useLogger(logger);

  // Enable CORS globally
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
  });

  // Setup Swagger API documentation BEFORE setting global prefix
  const swaggerConfig = new DocumentBuilder()
    .setTitle('CC Connection API')
    .setDescription('CC Connection API Documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  
  // Setup with JSON endpoint option
  SwaggerModule.setup('api-docs', app, document, {
    jsonDocumentUrl: '/api-docs-json', // Serves OpenAPI JSON for Postman import
  });

  // Set global API prefix from .env (e.g., /api or UUID)
  const prefix = config.get<string>('API_PREFIX') ?? '/api';
  app.setGlobalPrefix(prefix);

  // Optional: log all requests/responses
  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  const port = Number(config.get<string>('PORT') ?? 3000);

  await app.listen(port);
  logger.log(`Server running at http://localhost:${port}${prefix}`);
  logger.log(`API Documentation available at http://localhost:${port}/api-docs`);
  logger.log(`OpenAPI JSON available at http://localhost:${port}/api-docs-json`);
}

bootstrap();
