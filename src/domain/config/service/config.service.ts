import { Injectable } from '@nestjs/common';
import { ConfigRepository } from '../repository/config.repository';

@Injectable()
export class ConfigDomainService {
  constructor(private readonly configRepository: ConfigRepository) {}

  async findAll(): Promise<any> {
    const config = this.configRepository.findAll();
    return config;
  }
}
