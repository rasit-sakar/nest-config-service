import { Global, Module } from '@nestjs/common';
import { ListConfigQuery } from './config/list-config.query';
import { DomainModule } from '../domain/domain.module';
import { CreateConfigCommand } from './config/create-config.command';

@Global()
@Module({
  imports: [DomainModule],
  providers: [ListConfigQuery, CreateConfigCommand],
  exports: [ListConfigQuery, CreateConfigCommand],
})
export class UseCaseModule {}
