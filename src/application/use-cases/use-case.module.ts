import { Global, Module } from '@nestjs/common';
import { ListConfigQuery } from './config/list-config.query';
import { GetConfigQuery } from './config/get-config.query';
import { CreateConfigCommand } from './config/create-config.command';
import { UpdateConfigCommand } from './config/update-config.command';
import { DeleteConfigCommand } from './config/delete-config.command';
import { RegisterSpaceCommand } from './space/register-space.command';
import { LoginSpaceQuery } from './space/login-space.query';
import { DomainModule } from '../domain/domain.module';

@Global()
@Module({
  imports: [DomainModule],
  providers: [
    ListConfigQuery,
    GetConfigQuery,
    CreateConfigCommand,
    UpdateConfigCommand,
    DeleteConfigCommand,
    RegisterSpaceCommand,
    LoginSpaceQuery,
  ],
  exports: [
    ListConfigQuery,
    GetConfigQuery,
    CreateConfigCommand,
    UpdateConfigCommand,
    DeleteConfigCommand,
    RegisterSpaceCommand,
    LoginSpaceQuery,
  ],
})
export class UseCaseModule {}
