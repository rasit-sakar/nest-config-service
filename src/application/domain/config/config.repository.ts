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
    const where = { isDisabled: false, space: undefined, environment: undefined };
    if (filters?.space) where.space = filters.space;
    if (filters?.environment) where.environment = filters.environment;

    const configs = await this.configRepository.find({
      where,
      relations: ['history'],
    });
    return configs.map((config) => this.mapToDomainModel(config));
  }

  async findOneById(defaultFilters: DefaultConfigFilters, id: string): Promise<Config | null> {
    const configEntity = await this.configRepository.findOne({
      where: { id, isDisabled: false, space: defaultFilters.space, environment: defaultFilters.environment },
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
      isDisabled: false,
      isSecret: config.isSecret,
      createdAt: dateNow,
      updatedAt: dateNow,
    });
    await this.configRepository.save(configEntity);
    return this.mapToDomainModel(configEntity);
  }

  async update(defaultFilters: DefaultConfigFilters, id: string, updateConfig: UpdateConfigInput): Promise<Config> {
    const configEntity = await this.configRepository.findOneBy({
      id,
      space: defaultFilters.space,
      environment: defaultFilters.environment,
    });
    if (!configEntity) {
      throw new NotFoundException(`Config with id ${id} not found`);
    }

    if (updateConfig.name !== undefined) configEntity.name = updateConfig.name;
    if (updateConfig.value !== undefined) configEntity.value = updateConfig.value;
    if (updateConfig.description !== undefined) configEntity.description = updateConfig.description;
    if (updateConfig.isSecret !== undefined) configEntity.isSecret = updateConfig.isSecret;

    configEntity.updatedAt = new Date();
    await this.configRepository.save(configEntity);
    return this.mapToDomainModel(configEntity);
  }

  async softDelete(defaultFilters: DefaultConfigFilters, id: string): Promise<Config> {
    const configEntity = await this.configRepository.findOneBy({
      id,
      space: defaultFilters.space,
      environment: defaultFilters.environment,
    });
    if (!configEntity) {
      throw new NotFoundException(`Config with id ${id} not found`);
    }

    configEntity.isDisabled = true;
    configEntity.updatedAt = new Date();
    await this.configRepository.save(configEntity);
    return this.mapToDomainModel(configEntity);
  }

  private mapToDomainModel(configEntity: ConfigEntity): Config {
    const config: Config = {
      id: configEntity.id,
      name: configEntity.name,
      value: configEntity.value,
      description: configEntity.description,
      isSecret: configEntity.isSecret,
      createdAt: configEntity.createdAt,
      updatedAt: configEntity.updatedAt,
    };
    return config;
  }
}
