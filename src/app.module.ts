import { Module } from '@nestjs/common';
import { InfraModule } from './infrastructure/infra.module';
import { PresentationModule } from './presentation/presentation.module';

@Module({
  imports: [PresentationModule, InfraModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
