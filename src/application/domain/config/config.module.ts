import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigEntity } from '../../../infrastructure/typeorm/entities/config.entity';
import { ConfigHistoryEntity } from '../../../infrastructure/typeorm/entities/config-history.entity';
import { ConfigService } from './config.service';
import { ConfigRepository } from './config.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigEntity, ConfigHistoryEntity])],
  providers: [ConfigService, ConfigRepository],
  exports: [ConfigService],
})
export class ConfigModule {}
