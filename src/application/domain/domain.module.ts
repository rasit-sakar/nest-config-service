import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConfigHistoryModule } from './config-history/config-history.module';
import { SpaceModule } from './space/space.module';

@Module({
  imports: [ConfigModule, ConfigHistoryModule, SpaceModule],
  exports: [ConfigModule, ConfigHistoryModule, SpaceModule],
})
export class DomainModule {}
