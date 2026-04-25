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

  async findById(defaultFilters: DefaultConfigFilters, id: string): Promise<Config> {
    const config = await this.configRepository.findOneById(defaultFilters, id);
    if (!config) {
      throw new NotFoundException(`Config with id ${id} not found`);
    }
    return config;
  }

  async create(createConfigModel: CreateConfigInput): Promise<Config> {
    return this.configRepository.create(createConfigModel);
  }

  async update(defaultFilters: DefaultConfigFilters, id: string, updateConfigModel: UpdateConfigInput): Promise<Config> {
    return this.configRepository.update(defaultFilters, id, updateConfigModel);
  }

  async remove(defaultFilters: DefaultConfigFilters, id: string): Promise<Config> {
    return this.configRepository.softDelete(defaultFilters, id);
  }
}
