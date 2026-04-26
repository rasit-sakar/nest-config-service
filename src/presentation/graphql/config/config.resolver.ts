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
import { SpaceAuthGuard } from '../../../infrastructure/auth/space-auth.guard';
import { RequireSpaceAuth } from '../../../infrastructure/auth/require-space-auth.decorator';
import { UserAuthType } from '../../../application/domain/user/models/user-auth-type';

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
  @RequireSpaceAuth('space', UserAuthType.READ)
  async getConfigs(@Args('space') space: string, @Args('isDisabled', { nullable: true }) isDisabled?: boolean): Promise<ConfigGQLModel[]> {
    const configs = await this.listConfigUseCase.execute({ space, isDisabled });
    return configs.map((config) => new ConfigGQLModel(config));
  }

  @Query(() => ConfigGQLModel)
  @RequireSpaceAuth('space', UserAuthType.READ)
  async getConfig(
    @Args('name') name: string,
    @Args('space') space: string,
    @Args('isDisabled', { nullable: true }) isDisabled?: boolean,
  ): Promise<ConfigGQLModel> {
    const config = await this.getConfigUseCase.execute({ space, isDisabled }, name);
    return new ConfigGQLModel(config);
  }

  @Mutation(() => ConfigGQLModel)
  @RequireSpaceAuth('space', UserAuthType.CREATE)
  async createConfig(@Args('space') space: string, @Args('input') input: CreateConfigGQLInput): Promise<ConfigGQLModel> {
    const config = await this.createConfigCommand.execute({
      name: input.name,
      value: input.value,
      space,
      description: input.description,
      isSecret: input.isSecret,
      isDisabled: input.isDisabled,
    });
    return new ConfigGQLModel(config);
  }

  @Mutation(() => ConfigGQLModel)
  @RequireSpaceAuth('space', UserAuthType.UPDATE)
  async updateConfig(
    @Args('space') space: string,
    @Args('name') name: string,
    @Args('input') input: UpdateConfigGQLInput,
  ): Promise<ConfigGQLModel> {
    const filters = {
      space,
    };
    const config = await this.updateConfigCommand.execute(filters, name, {
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
  @RequireSpaceAuth('space', UserAuthType.DELETE)
  async deleteConfig(
    @Args('name') name: string,
    @Args('space', { nullable: false }) space: string,
    @Args('updateReason', { nullable: false }) updateReason?: string,
  ): Promise<boolean> {
    await this.deleteConfigCommand.execute({ space }, name, updateReason);
    return true;
  }
}
