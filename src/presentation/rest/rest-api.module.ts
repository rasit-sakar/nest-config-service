import { Module } from '@nestjs/common';
import { ConfigController } from './config/config.controller';
import { UseCaseModule } from '../../application/use-case/use-case.module';

@Module({
  imports: [UseCaseModule],
  controllers: [ConfigController],
  providers: [],
})
export class RestApiModule {}
