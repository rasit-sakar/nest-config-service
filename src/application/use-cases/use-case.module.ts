import { Global, Module } from '@nestjs/common';
import { ListConfigQuery } from './config/list-config.query';
import { GetConfigQuery } from './config/get-config.query';
import { CreateConfigCommand } from './config/create-config.command';
import { UpdateConfigCommand } from './config/update-config.command';
import { DeleteConfigCommand } from './config/delete-config.command';
import { AuthenticateUser } from './user/authenticate';
import { GetUserQuery } from './user/get-user.query';
import { CreateUserCommand } from './user/create-user.command';
import { UpdateUserCommand } from './user/update-user.command';
import { DeleteUserCommand } from './user/delete-user.command';
import { AssignSpaceAuthsCommand } from './user/assign-space-auths.command';
import { CreateSpaceCommand } from './space/create-space.command';
import { GetSpaceQuery } from './space/get-space.query';
import { ListSpaceQuery } from './space/list-space.query';
import { DeleteSpaceCommand } from './space/delete-space.command';
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
    AuthenticateUser,
    GetUserQuery,
    CreateUserCommand,
    UpdateUserCommand,
    DeleteUserCommand,
    AssignSpaceAuthsCommand,
    CreateSpaceCommand,
    GetSpaceQuery,
    ListSpaceQuery,
    DeleteSpaceCommand,
  ],
  exports: [
    ListConfigQuery,
    GetConfigQuery,
    CreateConfigCommand,
    UpdateConfigCommand,
    DeleteConfigCommand,
    AuthenticateUser,
    GetUserQuery,
    CreateUserCommand,
    UpdateUserCommand,
    DeleteUserCommand,
    AssignSpaceAuthsCommand,
    CreateSpaceCommand,
    GetSpaceQuery,
    ListSpaceQuery,
    DeleteSpaceCommand,
  ],
})
export class UseCaseModule {}
