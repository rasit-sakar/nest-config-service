import { Module } from '@nestjs/common';
import { ConfigController } from './config/config.controller';
import { SpaceController } from './space/space.controller';
import { UseCaseModule } from '../../application/use-cases/use-case.module';
import { SpaceAuthGuard } from '../auth/space-auth.guard';

@Module({
  imports: [UseCaseModule],
  controllers: [ConfigController, SpaceController],
  providers: [SpaceAuthGuard],
})
export class RestApiModule {}
