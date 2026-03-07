import { Injectable } from '@nestjs/common';
import { ConfigRepository } from '../repository/config.repository';
import { Config } from '../models/config.model';

@Injectable()
export class ConfigDomainService {
  constructor(private readonly configRepository: ConfigRepository) {}

  async findAll(): Promise<Config[]> {
    const configs = await this.configRepository.findAll();
    return configs;
  }
}
