import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConfigHistoryModule } from './config-history/config-history.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule, ConfigHistoryModule, UserModule],
  exports: [ConfigModule, ConfigHistoryModule, UserModule],
})
export class DomainModule {}
