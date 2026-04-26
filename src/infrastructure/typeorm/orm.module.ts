import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfig } from '../config/postgres.config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const postgresConfig = configService.get<PostgresConfig>('postgres');
        return {
          type: 'postgres',
          host: postgresConfig.host,
          port: postgresConfig.port,
          username: postgresConfig.username,
          password: postgresConfig.password,
          database: postgresConfig.database,
          entities: [],
          synchronize: false,
          autoLoadEntities: true,
          migrations: postgresConfig.migrations,
          migrationsRun: true,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class ORMModule {}
