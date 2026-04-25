import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigEntity } from '../../../infrastructure/typeorm/entities/config.entity';
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
    const where = {
      isDisabled: filters?.isDisabled ?? undefined,
      space: undefined,
      environment: undefined,
    };
    if (filters?.space) where.space = filters.space;
    if (filters?.environment) where.environment = filters.environment;

    const configs = await this.configRepository.find({
      where,
      relations: ['history'],
    });
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

    return configEntity ? this.mapToDomainModel(configEntity) : null;
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
