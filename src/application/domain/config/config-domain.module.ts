import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigEntity } from '../../../infrastructure/typeorm/entities/config.entity';
import { ConfigHistoryEntity } from '../../../infrastructure/typeorm/entities/config-history.entity';
import { ConfigDomainService } from './service/config.service';
import { ConfigRepository } from './repository/config.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigEntity, ConfigHistoryEntity])],
  providers: [ConfigDomainService, ConfigRepository],
  exports: [ConfigDomainService],
})
export class ConfigDomainModule {}
