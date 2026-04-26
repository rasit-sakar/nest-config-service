import { Args, Mutation, Query, Resolver, ObjectType, Field } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from '../../../infrastructure/auth/admin.guard';
import { UserService } from '../../../application/domain/user/user.service';
import { CreateUserInput } from '../../../application/contracts/create-user';
import { UpdateUserInput } from '../../../application/contracts/update-user.model';
import { CreateUserGQLInput } from './models/create-user.input';
import { UpdateUserGQLInput } from './models/update-user.input';

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
}

@Resolver(() => UserGQLModel)
@UseGuards(AdminGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserGQLModel)
  async getUser(@Args('username') username: string): Promise<UserGQLModel> {
    const user = await this.userService.findUserByUsername(username);
    return user;
  }

  @Mutation(() => UserGQLModel)
  async createUser(@Args('input') input: CreateUserGQLInput): Promise<UserGQLModel> {
    const user = await this.userService.createUser(input as CreateUserInput);
    return user;
  }

  @Mutation(() => UserGQLModel)
  async updateUser(@Args('username') username: string, @Args('input') input: UpdateUserGQLInput): Promise<UserGQLModel> {
    const user = await this.userService.updateUser(username, input as UpdateUserInput);
    return user;
  }

  @Mutation(() => Boolean)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteUser(@Args('username') _username: string): boolean {
    return true;
  }
}

// Separate resolver for authentication (no admin guard needed)
@Resolver()
export class AuthResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => AuthResult, { nullable: true })
  async login(
    @Args('username') username: string,
    @Args('secretKey') secretKey: string,
    @Args('secretPassword') secretPassword: string,
  ): Promise<{ jwtToken: string; expiredAt: string } | null> {
    const result = await this.userService.authenticateUser(username, secretKey, secretPassword);
    if (!result) {
      return null;
    }
    return { jwtToken: result.jwtToken, expiredAt: result.expiredAt.toISOString() };
  }
}
