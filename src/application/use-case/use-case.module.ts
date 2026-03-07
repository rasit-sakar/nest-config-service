import { Global, Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { ListConfigQuery } from './config/list-config.query';

@Global()
@Module({
  imports: [DomainModule],
  providers: [ListConfigQuery],
  exports: [ListConfigQuery],
})
export class UseCaseModule {}
