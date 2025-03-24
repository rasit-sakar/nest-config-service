import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'test',
      database: 'config-db',
      entities: [],
      synchronize: false,
      autoLoadEntities: true,
      migrations: ['dist/infrastructure/migrations/*.js'],
    }),
  ],
  exports: [],
})
export class ORMModule {}
