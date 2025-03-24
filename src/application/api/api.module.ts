import { Module } from '@nestjs/common';
import { AppController } from '../../application/api/app.controller';
import { DomainModule } from '../../domain/domain.module';

@Module({
  imports: [DomainModule],
  controllers: [AppController],
  providers: [],
})
export class ApiModule {}
