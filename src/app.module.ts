import { Module } from '@nestjs/common';
import { ApiModule } from './application/api/api.module';
import { InfraModule } from './infrastructure/infra.module';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [ApiModule, InfraModule, DomainModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
