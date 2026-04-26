import { Module } from '@nestjs/common';
import { PresentationModule } from '../presentation/presentation.module';
import { DomainModule } from './domain/domain.module';
import { UseCaseModule } from './use-cases/use-case.module';

@Module({
  imports: [PresentationModule, DomainModule, UseCaseModule],
  controllers: [],
  providers: [],
})
export class ApplicationModule {}
