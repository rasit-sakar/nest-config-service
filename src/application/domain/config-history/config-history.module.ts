import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigHistoryEntity } from '../../../infrastructure/typeorm/entities/config-history.entity';
import { ConfigHistoryRepository } from './config-history.repository';
import { ConfigHistoryService } from './config-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigHistoryEntity])],
  providers: [ConfigHistoryService, ConfigHistoryRepository],
  exports: [ConfigHistoryService],
})
export class ConfigHistoryModule {}
