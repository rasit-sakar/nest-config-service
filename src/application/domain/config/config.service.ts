import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigRepository } from './config.repository';
import { Config } from './models/config.model';
import { CreateConfigInput } from '../../contracts/create-config.model';
import { UpdateConfigInput } from '../../contracts/update-config.model';
import { DefaultConfigFilters } from '../../contracts/default-config-filters.model';

@Injectable()
export class ConfigService {
  constructor(private readonly configRepository: ConfigRepository) {}

  async findAll(filters?: DefaultConfigFilters): Promise<Config[]> {
    return this.configRepository.findAll(filters);
  }

  async findByName(defaultFilters: DefaultConfigFilters, name: string): Promise<Config> {
    const config = await this.configRepository.findOneByName(defaultFilters, name);
    if (!config) {
      throw new NotFoundException(`Config with name ${name} not found`);
    }
    return config;
  }

  async create(createConfigModel: CreateConfigInput): Promise<Config> {
    return this.configRepository.create(createConfigModel);
  }

  async updateByName(defaultFilters: DefaultConfigFilters, name: string, updateConfigModel: UpdateConfigInput): Promise<Config> {
    return this.configRepository.updateByName(defaultFilters, name, updateConfigModel);
  }

  async deleteByName(defaultFilters: DefaultConfigFilters, name: string): Promise<void> {
    await this.configRepository.deleteByName(defaultFilters, name);
  }
}
