import { Module } from '@nestjs/common';
import { PresentationModule } from '../presentation/presentation.module';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [PresentationModule, DomainModule],
  controllers: [],
  providers: [],
})
export class ApplicationModule {}
