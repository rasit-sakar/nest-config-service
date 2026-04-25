import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import ConfigGQLModel from './models/config.gql.model';
import { ListConfigQuery } from '../../../application/use-cases/config/list-config.query';
import { GetConfigQuery } from '../../../application/use-cases/config/get-config.query';
import { CreateConfigCommand } from '../../../application/use-cases/config/create-config.command';
import { UpdateConfigCommand } from '../../../application/use-cases/config/update-config.command';
import { DeleteConfigCommand } from '../../../application/use-cases/config/delete-config.command';
import { CreateConfigGQLInput } from './models/create-config.input';
import { UpdateConfigGQLInput } from './models/update-config.input';
import { ConfigFiltersGQLInput } from './models/config-filters.input';

@Resolver(() => ConfigGQLModel)
export class ConfigResolver {
  constructor(
    private readonly listConfigUseCase: ListConfigQuery,
    private readonly getConfigUseCase: GetConfigQuery,
    private readonly createConfigCommand: CreateConfigCommand,
    private readonly updateConfigCommand: UpdateConfigCommand,
    private readonly deleteConfigCommand: DeleteConfigCommand,
  ) {}

  @Query(() => [ConfigGQLModel])
  async getConfigs(@Args('filters', { nullable: true }) filters?: ConfigFiltersGQLInput): Promise<ConfigGQLModel[]> {
    const configs = await this.listConfigUseCase.execute(filters);
    return configs.map((config) => new ConfigGQLModel(config));
  }

  @Query(() => ConfigGQLModel)
  async getConfig(@Args('id') id: string, @Args('filters', { nullable: true }) filters?: ConfigFiltersGQLInput): Promise<ConfigGQLModel> {
    const config = await this.getConfigUseCase.execute(filters || {}, id);
    return new ConfigGQLModel(config);
  }

  @Mutation(() => ConfigGQLModel)
  async createConfig(@Args('input') input: CreateConfigGQLInput): Promise<ConfigGQLModel> {
    const config = await this.createConfigCommand.execute({
      name: input.name,
      value: input.value,
      environment: input.environment,
      space: input.space,
      description: input.description,
      isSecret: input.isSecret,
    });
    return new ConfigGQLModel(config);
  }

  @Mutation(() => ConfigGQLModel)
  async updateConfig(@Args('id') id: string, @Args('input') input: UpdateConfigGQLInput): Promise<ConfigGQLModel> {
    const filters = {
      space: input.space,
      environment: input.environment,
    };
    const config = await this.updateConfigCommand.execute(filters, id, {
      name: input.name,
      value: input.value,
      description: input.description,
      isSecret: input.isSecret,
    });
    return new ConfigGQLModel(config);
  }

  @Mutation(() => Boolean)
  async deleteConfig(@Args('id') id: string, @Args('filters', { nullable: true }) filters?: ConfigFiltersGQLInput): Promise<boolean> {
    await this.deleteConfigCommand.execute(filters || {}, id);
    return true;
  }
}
