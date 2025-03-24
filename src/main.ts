import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerService } from './infrastructure/swagger/swagger.service';
import { AppConfig } from './infrastructure/config/app.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerService = app.get(SwaggerService);
  swaggerService.init(app);
  const config = app.get(ConfigService).get<AppConfig>('app');
  await app.listen(config.port, () => {
    console.log(`Application is running on: ${config.port}`);
    console.log(`Swagger is running on: http://localhost:${config.port}/${config.swaggerUrl}`);
  });
}

bootstrap();
