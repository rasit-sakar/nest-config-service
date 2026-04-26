import { Args, Mutation, Query, Resolver, ObjectType, Field } from '@nestjs/graphql';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../../../infrastructure/auth/admin.guard';
import { CreateUserInput } from '../../../application/contracts/create-user';
import { UpdateUserInput } from '../../../application/contracts/update-user.model';
import { CreateUserGQLInput } from './models/create-user.input';
import { UpdateUserGQLInput } from './models/update-user.input';
import { AssignSpaceAuthsGQLInput } from './models/assign-space-auths.input';
import { AuthenticateUser } from '../../../application/use-cases/user/authenticate';
import { GetUserQuery } from '../../../application/use-cases/user/get-user.query';
import { CreateUserCommand } from '../../../application/use-cases/user/create-user.command';
import { UpdateUserCommand } from '../../../application/use-cases/user/update-user.command';
import { DeleteUserCommand } from '../../../application/use-cases/user/delete-user.command';
import { AssignSpaceAuthsCommand } from '../../../application/use-cases/user/assign-space-auths.command';
import { Public } from '../../../infrastructure/auth/public-access.decarator';
import { UserAuthType } from '../../../application/domain/user/models/user-auth-type';

@ObjectType()
class AuthResult {
  @Field()
  jwtToken: string;

  @Field()
  expiredAt: string;
}

@ObjectType()
class UserGQLModel {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  description: string;

  @Field()
  isAdmin: boolean;

  @Field(() => [SpaceAuthGQLModel])
  spaceAuths: SpaceAuthGQLModel[];
}

@ObjectType()
class SpaceAuthGQLModel {
  @Field()
  spaceName: string;

  @Field()
  userAuthType: UserAuthType;
}

@Resolver(() => UserGQLModel)
@UseGuards(AdminGuard)
export class UserResolver {
  constructor(
    private readonly getUserQuery: GetUserQuery,
    private readonly createUserCommand: CreateUserCommand,
    private readonly updateUserCommand: UpdateUserCommand,
    private readonly deleteUserCommand: DeleteUserCommand,
    private readonly assignSpaceAuthsCommand: AssignSpaceAuthsCommand,
  ) {}

  @Query(() => UserGQLModel)
  async getUser(@Args('username') username: string): Promise<UserGQLModel> {
    const user = await this.getUserQuery.execute(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Mutation(() => UserGQLModel)
  async createUser(@Args('input') input: CreateUserGQLInput): Promise<UserGQLModel> {
    const user = await this.createUserCommand.execute(input as CreateUserInput);
    return user;
  }

  @Mutation(() => UserGQLModel)
  async updateUser(@Args('username') username: string, @Args('input') input: UpdateUserGQLInput): Promise<UserGQLModel> {
    const user = await this.updateUserCommand.execute(username, input as UpdateUserInput);
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('username') username: string): Promise<boolean> {
    await this.deleteUserCommand.execute(username);
    return true;
  }

  @Mutation(() => UserGQLModel)
  async assignSpaceAuths(@Args('username') username: string, @Args('input') input: AssignSpaceAuthsGQLInput): Promise<UserGQLModel> {
    const user = await this.assignSpaceAuthsCommand.execute({
      username,
      spaceAuths: input.spaceAuths,
    });
    return user;
  }
}

// Separate resolver for authentication (no admin guard needed)
@Resolver()
export class AuthResolver {
  constructor(private readonly authenticateUser: AuthenticateUser) {}

  @Public()
  @Query(() => AuthResult, { nullable: true })
  async authenticate(
    @Args('username') username: string,
    @Args('secretKey') secretKey: string,
    @Args('secretPassword') secretPassword: string,
  ): Promise<{ jwtToken: string; expiredAt: string }> {
    const result = await this.authenticateUser.execute({
      username,
      secretKey,
      secretPassword,
    });
    if (!result) {
      throw new NotFoundException('Invalid credentials');
    }
    return { jwtToken: result.jwtToken, expiredAt: result.expiredAt.toISOString() };
  }
}
