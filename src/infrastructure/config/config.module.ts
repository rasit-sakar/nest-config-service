import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from './app.config';
import { PostgresConfig } from './postgres.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          app: AppConfig.getConfig(),
          postgres: PostgresConfig.getConfig(),
        }),
      ],
    }),
  ],
})
export class MainConfigModule {}
