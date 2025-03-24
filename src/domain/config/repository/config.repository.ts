import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigEntity } from './entities/config.entity';
import { ConfigHistoryEntity } from './entities/config-history.entity';

@Injectable()
export class ConfigRepository {
  constructor(
    @InjectRepository(ConfigEntity)
    private readonly configRepository: Repository<ConfigEntity>,
    @InjectRepository(ConfigHistoryEntity)
    private readonly configHistoryRepository: Repository<ConfigHistoryEntity>,
  ) {}

  async findAll(): Promise<ConfigEntity[]> {
    const c = await this.configRepository.find({ relations: ['history'] });
    return c
  }
}
