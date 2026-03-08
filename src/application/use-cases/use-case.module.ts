import { Global, Module } from '@nestjs/common';
import { ListConfigQuery } from './config/list-config.query';
import { DomainModule } from '../domains/domain.module';

@Global()
@Module({
  imports: [DomainModule],
  providers: [ListConfigQuery],
  exports: [ListConfigQuery],
})
export class UseCaseModule {}
