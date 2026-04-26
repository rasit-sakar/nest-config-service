import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from '../../../infrastructure/auth/admin.guard';
import { CreateSpaceGQLInput, SpaceGQLModel } from './space.model';
import { CreateSpaceCommand } from '../../../application/use-cases/space/create-space.command';
import { GetSpaceQuery } from '../../../application/use-cases/space/get-space.query';
import { ListSpaceQuery } from '../../../application/use-cases/space/list-space.query';
import { DeleteSpaceCommand } from '../../../application/use-cases/space/delete-space.command';
import { GraphQLContext } from '../graphql-context';

@Resolver(() => SpaceGQLModel)
@UseGuards(AdminGuard)
export class SpaceResolver {
  constructor(
    private readonly createSpaceCommand: CreateSpaceCommand,
    private readonly getSpaceQuery: GetSpaceQuery,
    private readonly listSpaceQuery: ListSpaceQuery,
    private readonly deleteSpaceCommand: DeleteSpaceCommand,
  ) {}

  @Query(() => SpaceGQLModel)
  async getSpace(@Args('name') name: string): Promise<SpaceGQLModel> {
    return this.getSpaceQuery.execute(name);
  }

  @Query(() => [SpaceGQLModel])
  async listSpaces(): Promise<SpaceGQLModel[]> {
    return this.listSpaceQuery.execute();
  }

  @Mutation(() => SpaceGQLModel)
  async createSpace(@Args('input') input: CreateSpaceGQLInput, @Context() context: GraphQLContext): Promise<SpaceGQLModel> {
    const space = await this.createSpaceCommand.execute({
      name: input.name,
      description: input.description,
      createdBy: context.req.user.username,
    });
    return space;
  }

  @Mutation(() => Boolean)
  async deleteSpace(@Args('name') name: string): Promise<boolean> {
    await this.deleteSpaceCommand.execute(name);
    return true;
  }
}
