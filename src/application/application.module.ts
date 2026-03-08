import { Module } from '@nestjs/common';
import { PresentationModule } from '../presentation/presentation.module';
import { DomainModule } from './domains/domain.module';

@Module({
  imports: [PresentationModule, DomainModule],
  controllers: [],
  providers: [],
})
export class ApplicationModule {}
