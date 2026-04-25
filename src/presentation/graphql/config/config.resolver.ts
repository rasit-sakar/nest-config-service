import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import ConfigGQLModel from './models/config.gql.model';
import { ListConfigQuery } from '../../../application/use-cases/config/list-config.query';
import { GetConfigQuery } from '../../../application/use-cases/config/get-config.query';
import { CreateConfigCommand } from '../../../application/use-cases/config/create-config.command';
import { UpdateConfigCommand } from '../../../application/use-cases/config/update-config.command';
import { DeleteConfigCommand } from '../../../application/use-cases/config/delete-config.command';
import { CreateConfigGQLInput } from './models/create-config.input';
import { UpdateConfigGQLInput } from './models/update-config.input';
import { CurrentSpace, CurrentSpaceContext } from '../../auth/current-space.decorator';
import { SpaceAuthGuard } from '../../auth/space-auth.guard';

@Resolver(() => ConfigGQLModel)
@UseGuards(SpaceAuthGuard)
export class ConfigResolver {
  constructor(
    private readonly listConfigUseCase: ListConfigQuery,
    private readonly getConfigUseCase: GetConfigQuery,
    private readonly createConfigCommand: CreateConfigCommand,
    private readonly updateConfigCommand: UpdateConfigCommand,
    private readonly deleteConfigCommand: DeleteConfigCommand,
  ) {}

  @Query(() => [ConfigGQLModel])
  async getConfigs(@CurrentSpace() currentSpace: CurrentSpaceContext): Promise<ConfigGQLModel[]> {
    const configs = await this.listConfigUseCase.execute(currentSpace);
    return configs.map((config) => new ConfigGQLModel(config));
  }

  @Query(() => ConfigGQLModel)
  async getConfig(@Args('name') name: string, @CurrentSpace() currentSpace: CurrentSpaceContext): Promise<ConfigGQLModel> {
    const config = await this.getConfigUseCase.execute(currentSpace, name);
    return new ConfigGQLModel(config);
  }

  @Mutation(() => ConfigGQLModel)
  async createConfig(
    @Args('input') input: CreateConfigGQLInput,
    @CurrentSpace() currentSpace: CurrentSpaceContext,
  ): Promise<ConfigGQLModel> {
    const config = await this.createConfigCommand.execute({
      name: input.name,
      value: input.value,
      environment: currentSpace.environment,
      space: currentSpace.space,
      description: input.description,
      isSecret: input.isSecret,
      isDisabled: input.isDisabled,
    });
    return new ConfigGQLModel(config);
  }

  @Mutation(() => ConfigGQLModel)
  async updateConfig(
    @Args('name') name: string,
    @Args('input') input: UpdateConfigGQLInput,
    @CurrentSpace() currentSpace: CurrentSpaceContext,
  ): Promise<ConfigGQLModel> {
    const config = await this.updateConfigCommand.execute(currentSpace, name, {
      name: input.name,
      value: input.value,
      description: input.description,
      isSecret: input.isSecret,
      isDisabled: input.isDisabled,
      updateReason: input.updateReason,
    });
    return new ConfigGQLModel(config);
  }

  @Mutation(() => Boolean)
  async deleteConfig(
    @Args('name') name: string,
    @Args('updateReason', { nullable: true }) updateReason: string,
    @CurrentSpace() currentSpace: CurrentSpaceContext,
  ): Promise<boolean> {
    await this.deleteConfigCommand.execute(currentSpace, name, updateReason);
    return true;
  }
}
