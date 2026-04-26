import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../../infrastructure/typeorm/entities/user.entity';
import { UserSpaceAuthEntity } from '../../../infrastructure/typeorm/entities/user-space-auth.entity';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserSpaceAuthEntity])],
  providers: [UserRepository, UserService],
  exports: [UserService],
})
export class UserModule {}
