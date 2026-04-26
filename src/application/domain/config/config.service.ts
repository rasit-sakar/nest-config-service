import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigRepository } from './config.repository';
import { Config } from './models/config.model';
import { CreateConfigInput } from '../../contracts/create-config.model';
import { UpdateConfigInput } from '../../contracts/update-config.model';
import { ListConfigsFilters } from '../../contracts/default-config-filters.model';

@Injectable()
export class ConfigService {
  constructor(private readonly configRepository: ConfigRepository) {}

  async findAll(filters: ListConfigsFilters): Promise<Config[]> {
    return this.configRepository.findAll(filters);
  }

  async findByName(space: string, name: string): Promise<Config> {
    const config = await this.configRepository.findOneByName(space, name);
    if (!config) {
      throw new NotFoundException(`Config with name ${name} not found`);
    }
    return config;
  }

  async create(createConfigModel: CreateConfigInput): Promise<Config> {
    const existingConfig = await this.findByName(createConfigModel.space, createConfigModel.name);
    if (existingConfig) {
      throw new Error('Config already exists');
    }
    return this.configRepository.create(createConfigModel);
  }

  async updateByName(space: string, name: string, updateConfigModel: UpdateConfigInput): Promise<Config> {
    return this.configRepository.updateByName(space, name, updateConfigModel);
  }

  async deleteByName(space: string, name: string): Promise<void> {
    const existingConfig = await this.findByName(space, name);
    if (!existingConfig) {
      throw new NotFoundException(`Config with name ${name} not found`);
    }
    if (existingConfig.isDisabled) {
      throw new Error(`Config with name ${name} is already disabled`);
    }
    await this.configRepository.deleteByName(space, name);
  }
}
