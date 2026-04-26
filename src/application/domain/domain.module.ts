import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConfigHistoryModule } from './config-history/config-history.module';
import { UserModule } from './user/user.module';
import { SpaceModule } from './space/space.module';

@Module({
  imports: [ConfigModule, ConfigHistoryModule, UserModule, SpaceModule],
  exports: [ConfigModule, ConfigHistoryModule, UserModule, SpaceModule],
})
export class DomainModule {}
