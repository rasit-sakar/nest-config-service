import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigEntity } from '../../../infrastructure/typeorm/entities/config.entity';
import { SpaceEntity } from '../../../infrastructure/typeorm/entities/space.entity';
import { Config } from './models/config.model';
import { CreateConfigInput } from '../../contracts/create-config.model';
import { UpdateConfigInput } from '../../contracts/update-config.model';
import { DefaultConfigFilters } from '../../contracts/default-config-filters.model';

@Injectable()
export class ConfigRepository {
  constructor(
    @InjectRepository(ConfigEntity)
    private readonly configRepository: Repository<ConfigEntity>,
  ) {}

  async findAll(filters?: DefaultConfigFilters): Promise<Config[]> {
    const queryBuilder = this.configRepository.createQueryBuilder('config').leftJoinAndSelect('config.history', 'history');

    if (filters?.isDisabled !== undefined) {
      queryBuilder.andWhere('config.isDisabled = :isDisabled', { isDisabled: filters.isDisabled });
    }

    if (filters?.space && filters?.environment) {
      const globalSpaceSubquery = this.configRepository
        .createQueryBuilder('space')
        .select('space.name')
        .from(SpaceEntity, 'space')
        .where('space.environment = :env AND space.isGlobal = true');

      queryBuilder.andWhere(
        '(config.space = :space AND config.environment = :env) OR (config.environment = :env AND config.space IN (' +
          globalSpaceSubquery.getQuery() +
          '))',
        { space: filters.space, env: filters.environment },
      );
    } else if (filters?.environment) {
      queryBuilder.andWhere('config.environment = :env', { env: filters.environment });
    } else if (filters?.space) {
      queryBuilder.andWhere('config.space = :space', { space: filters.space });
    }

    const configs = await queryBuilder.getMany();
    return configs.map((config) => this.mapToDomainModel(config));
  }

  async findOneByName(defaultFilters: DefaultConfigFilters, name: string): Promise<Config | null> {
    const configEntity = await this.configRepository.findOne({
      where: {
        name,
        isDisabled: defaultFilters.isDisabled ?? undefined,
        space: defaultFilters.space,
        environment: defaultFilters.environment,
      },
      relations: ['history'],
    });

    if (configEntity) {
      return this.mapToDomainModel(configEntity);
    }

    if (defaultFilters.environment) {
      const globalSpaceSubquery = this.configRepository
        .createQueryBuilder('space')
        .select('space.name')
        .from(SpaceEntity, 'space')
        .where('space.environment = :env AND space.isGlobal = true');

      const globalConfig = await this.configRepository
        .createQueryBuilder('config')
        .leftJoinAndSelect('config.history', 'history')
        .where('config.name = :name', { name })
        .andWhere('config.environment = :env', { env: defaultFilters.environment })
        .andWhere('config.space IN (' + globalSpaceSubquery.getQuery() + ')')
        .setParameters({ env: defaultFilters.environment })
        .getOne();

      return globalConfig ? this.mapToDomainModel(globalConfig) : null;
    }

    return null;
  }

  async create(config: CreateConfigInput): Promise<Config> {
    const dateNow = new Date();
    const configEntity = this.configRepository.create({
      name: config.name,
      value: config.value,
      environment: config.environment,
      space: config.space,
      description: config.description,
      isDisabled: config.isDisabled,
      isSecret: config.isSecret,
      createdAt: dateNow,
      updatedAt: dateNow,
    });
    await this.configRepository.save(configEntity);
    return this.mapToDomainModel(configEntity);
  }

  async updateByName(defaultFilters: DefaultConfigFilters, name: string, updateConfig: UpdateConfigInput): Promise<Config> {
    const configEntity = await this.configRepository.findOneBy({
      name,
      isDisabled: defaultFilters.isDisabled ?? false,
      space: defaultFilters.space,
      environment: defaultFilters.environment,
    });
    if (!configEntity) {
      throw new NotFoundException(`Config with name ${name} not found`);
    }

    if (updateConfig.name !== undefined) configEntity.name = updateConfig.name;
    if (updateConfig.value !== undefined) configEntity.value = updateConfig.value;
    if (updateConfig.description !== undefined) configEntity.description = updateConfig.description;
    if (updateConfig.isSecret !== undefined) configEntity.isSecret = updateConfig.isSecret;
    if (updateConfig.isDisabled !== undefined) configEntity.isDisabled = updateConfig.isDisabled;

    configEntity.updatedAt = new Date();
    await this.configRepository.save(configEntity);
    return this.mapToDomainModel(configEntity);
  }

  async deleteByName(defaultFilters: DefaultConfigFilters, name: string): Promise<void> {
    await this.configRepository.delete({
      name,
      isDisabled: defaultFilters.isDisabled ?? false,
      space: defaultFilters.space,
      environment: defaultFilters.environment,
    });
  }

  private mapToDomainModel(configEntity: ConfigEntity): Config {
    const config: Config = {
      id: configEntity.id,
      name: configEntity.name,
      value: configEntity.value,
      environment: configEntity.environment,
      space: configEntity.space,
      description: configEntity.description,
      isSecret: configEntity.isSecret,
      createdAt: configEntity.createdAt,
      updatedAt: configEntity.updatedAt,
      isDisabled: configEntity.isDisabled,
    };
    return config;
  }
}
