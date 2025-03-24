import { INestApplication, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppConfig } from '../config/app.config';

export class SwaggerService {
  private config: AppConfig;
  constructor(@Inject(ConfigService) configService: ConfigService) {
    this.config = configService.get<AppConfig>('app');
  }

  init(app: INestApplication): void {
    const config = this.createSwaggerOptions();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(this.config.swaggerUrl, app, documentFactory);
  }

  createSwaggerOptions(): Omit<OpenAPIObject, 'paths'> {
    const config = new DocumentBuilder()
      .setTitle('Nest Config Service')
      .setDescription('The nest-config-service API description')
      .setVersion('1.0')
      .addTag('nest-config-service')
      .build();
    return config;
  }
}
