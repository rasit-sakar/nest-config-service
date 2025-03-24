import { Module } from '@nestjs/common';
import { ConfigDomainModule } from './config/config-domain.module';

@Module({
  imports: [ConfigDomainModule],
  exports: [ConfigDomainModule],
})
export class DomainModule {}
