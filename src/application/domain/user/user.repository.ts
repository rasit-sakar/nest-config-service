import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../../infrastructure/typeorm/entities/user.entity';
import { UserSpaceAuthEntity } from '../../../infrastructure/typeorm/entities/user-space-auth.entity';
import { User } from './models/user.model';
import { UserSpaceAuth } from './models/user-space-auth.model';
import { CreateUserInput } from '../../contracts/create-user';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserSpaceAuthEntity)
    private readonly userSpaceAuthRepository: Repository<UserSpaceAuthEntity>,
  ) {}

  async findUserByUsername(userName: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOne({
      where: { userName },
      relations: ['spaceAuths'],
    });
    if (!userEntity) return null;
    return this.mapToDTO(userEntity);
  }

  async getToken(userName: string): Promise<{ secretKey: string; secretPassword: string } | null> {
    const userEntity = await this.userRepository.findOne({
      where: { userName },
    });
    if (!userEntity) return null;
    return {
      secretKey: userEntity.secretKey,
      secretPassword: userEntity.secretPassword,
    };
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const userEntity = this.userRepository.create({
      userName: createUserInput.userName,
      description: createUserInput.description,
      secretKey: createUserInput.secretKey,
      secretPassword: createUserInput.secretPassword,
      isAdmin: createUserInput.isAdmin,
    });
    const savedUser = await this.userRepository.save(userEntity);
    return this.mapToDTO(savedUser);
  }

  async updateUser(userName: string, updateUserInput: Partial<CreateUserInput>): Promise<User> {
    const userEntity = await this.userRepository.findOne({
      where: { userName },
    });
    if (!userEntity) throw new Error('User not found');
    if (updateUserInput.description !== undefined) userEntity.description = updateUserInput.description;
    if (updateUserInput.secretKey !== undefined) userEntity.secretKey = updateUserInput.secretKey;
    if (updateUserInput.secretPassword !== undefined) userEntity.secretPassword = updateUserInput.secretPassword;
    if (updateUserInput.isAdmin !== undefined) userEntity.isAdmin = updateUserInput.isAdmin;
    const updatedUser = await this.userRepository.save(userEntity);
    return this.mapToDTO(updatedUser);
  }

  async assingnSpaceAuthToUser(userId: string, spaceAuths: UserSpaceAuth[]): Promise<void> {
    await this.userSpaceAuthRepository.delete({ userId });
    const spaceAuthEntities = spaceAuths.map((spaceAuth) =>
      this.userSpaceAuthRepository.create({
        userId,
        spaceName: spaceAuth.spaceName,
        auth: spaceAuth.userAuthType,
      }),
    );
    await this.userSpaceAuthRepository.save(spaceAuthEntities);
  }

  mapToDTO(userEntity: UserEntity): User {
    const user = {
      id: userEntity.id,
      userName: userEntity.userName,
      description: userEntity.description,
      isAdmin: userEntity.isAdmin,
      spaceAuths: userEntity.spaceAuths.map((spaceAuthEntity) => this.mapToAuthDTO(spaceAuthEntity)),
    };
    return user;
  }

  mapToAuthDTO(spaceAuthEntity: UserSpaceAuthEntity): UserSpaceAuth {
    const spaceAuth: UserSpaceAuth = {
      spaceName: spaceAuthEntity.spaceName,
      userAuthType: spaceAuthEntity.auth,
    };
    return spaceAuth;
  }
}
