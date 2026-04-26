import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigEntity } from '../../../infrastructure/typeorm/entities/config.entity';
import { Config } from './models/config.model';
import { CreateConfigInput } from '../../contracts/create-config.model';
import { UpdateConfigInput } from '../../contracts/update-config.model';
import { ListConfigsFilters } from '../../contracts/default-config-filters.model';

@Injectable()
export class ConfigRepository {
  constructor(
    @InjectRepository(ConfigEntity)
    private readonly configRepository: Repository<ConfigEntity>,
  ) {}

  async findAll(filters: ListConfigsFilters): Promise<Config[]> {
    const where =
      filters?.isDisabled !== undefined
        ? {
            space: filters.space,
            isDisabled: filters.isDisabled,
          }
        : { space: filters.space };

    if (filters?.space) where.space = filters.space;
    const configs = await this.configRepository.find({
      where,
      relations: ['history'],
    });
    return configs.map((config) => this.mapToDTO(config));
  }

  async findOneByName(space: string, name: string): Promise<Config | null> {
    const configEntity = await this.configRepository.findOne({
      where: {
        name,
        space: space,
      },
      relations: ['history'],
    });

    return configEntity ? this.mapToDTO(configEntity) : null;
  }

  async create(config: CreateConfigInput): Promise<Config> {
    const dateNow = new Date();
    const configEntity = this.configRepository.create({
      name: config.name,
      value: config.value,
      space: config.space,
      description: config.description,
      isDisabled: config.isDisabled,
      isSecret: config.isSecret,
      createdAt: dateNow,
      updatedAt: dateNow,
    });
    await this.configRepository.save(configEntity);
    return this.mapToDTO(configEntity);
  }

  async updateByName(space: string, name: string, updateConfig: UpdateConfigInput): Promise<Config> {
    const configEntity = await this.configRepository.findOneBy({
      name,
      space,
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
    return this.mapToDTO(configEntity);
  }

  async deleteByName(space: string, name: string): Promise<void> {
    await this.configRepository.delete({
      name,
      space,
    });
  }

  private mapToDTO(configEntity: ConfigEntity): Config {
    const config: Config = {
      id: configEntity.id,
      name: configEntity.name,
      value: configEntity.value,
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
