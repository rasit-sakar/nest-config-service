import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RegisterSpaceGQLInput } from './register-space.input';
import { LoginSpaceGQLInput } from './login-space.input';
import { RegisterSpaceCommand } from '../../../application/use-cases/space/register-space.command';
import { LoginSpaceQuery } from '../../../application/use-cases/space/login-space.query';
import { SpaceAuthGQLModel } from './space-auth.gql.model';

@Resolver()
export class SpaceResolver {
  constructor(
    private readonly registerSpaceCommand: RegisterSpaceCommand,
    private readonly loginSpaceQuery: LoginSpaceQuery,
  ) {}

  @Mutation(() => SpaceAuthGQLModel)
  async registerSpace(@Args('input') input: RegisterSpaceGQLInput): Promise<SpaceAuthGQLModel> {
    const result = await this.registerSpaceCommand.execute(input.space, input.environment, input.isGlobal ?? false);
    return { token: result.token };
  }

  @Mutation(() => SpaceAuthGQLModel)
  async loginSpace(@Args('input') input: LoginSpaceGQLInput): Promise<SpaceAuthGQLModel> {
    const result = await this.loginSpaceQuery.execute(input.space, input.environment);
    return { token: result.token };
  }
}
