import { Module } from '@nestjs/common';
import { ConfigController } from './config/config.controller';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { UseCaseModule } from '../../application/use-cases/use-case.module';
import { DomainModule } from '../../application/domain/domain.module';

@Module({
  imports: [UseCaseModule, DomainModule],
  controllers: [ConfigController, UserController, AuthController],
  providers: [],
})
export class RestApiModule {}
