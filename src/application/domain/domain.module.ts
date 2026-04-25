import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConfigHistoryModule } from './config-history/config-history.module';

@Module({
  imports: [ConfigModule, ConfigHistoryModule],
  exports: [ConfigModule, ConfigHistoryModule],
})
export class DomainModule {}
