import { Module } from '@nestjs/common';
import { ConfigController } from './config/config.controller';
import { UseCaseModule } from '../../application/use-cases/use-case.module';

@Module({
  imports: [UseCaseModule],
  controllers: [ConfigController],
  providers: [],
})
export class RestApiModule {}
