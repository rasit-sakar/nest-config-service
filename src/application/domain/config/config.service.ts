import { Injectable } from '@nestjs/common';
import { ConfigRepository } from './config.repository';
import { Config } from './models/config.model';
import { CreateConfigInput } from '../../contracts/create-config.model';

@Injectable()
export class ConfigService {
  constructor(private readonly configRepository: ConfigRepository) {}

  async findAll(): Promise<Config[]> {
    const configs = await this.configRepository.findAll();
    return configs;
  }

  async create(createConfigModel: CreateConfigInput): Promise<Config> {
    const config = await this.configRepository.create(createConfigModel);
    return config;
  }
}
