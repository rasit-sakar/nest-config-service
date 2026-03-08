import { Query, Resolver } from '@nestjs/graphql';
import ConfigGQLModel from './models/config.gql.model';
import { ListConfigQuery } from '../../../application/use-cases/config/list-config.query';

@Resolver(() => ConfigGQLModel)
export class ConfigResolver {
  constructor(private readonly listConfigUseCase: ListConfigQuery) {}

  @Query(() => [ConfigGQLModel])
  async getConfigs(): Promise<ConfigGQLModel[]> {
    const configs = await this.listConfigUseCase.execute();
    return configs.map((config) => new ConfigGQLModel(config));
  }
}
