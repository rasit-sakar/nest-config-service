import { Module } from '@nestjs/common';
import { ConfigDomainService } from './service/config.service';
import { ConfigRepository } from './repository/config.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigEntity } from './repository/entities/config.entity';
import { ConfigHistoryEntity } from './repository/entities/config-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigEntity, ConfigHistoryEntity])],
  providers: [ConfigDomainService, ConfigRepository],
  exports: [ConfigDomainService],
})
export class ConfigDomainModule {}
