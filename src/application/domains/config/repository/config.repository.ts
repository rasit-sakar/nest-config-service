import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigEntity } from '../../../../infrastructure/typeorm/entities/config.entity';
import { Config } from '../models/config.model';
import { ConfigHistory } from '../models/config-history.model';
import { ConfigHistoryEntity } from '../../../../infrastructure/typeorm/entities/config-history.entity';

@Injectable()
export class ConfigRepository {
  constructor(
    @InjectRepository(ConfigEntity)
    private readonly configRepository: Repository<ConfigEntity>,
  ) {}

  async findAll(): Promise<Config[]> {
    const configs = await this.configRepository.find({ relations: ['history'] });
    return configs.map((config) => this.mapToDomainModel(config));
  }

  private mapToDomainModel(configEntity: ConfigEntity): Config {
    const config: Config = {
      id: configEntity.id,
      name: configEntity.name,
      value: configEntity.value,
      space: configEntity.space,
      environment: configEntity.environment,
      isSecret: configEntity.isSecret,
      createdAt: configEntity.createdAt,
      updatedAt: configEntity.updatedAt,
      history: configEntity.history ? configEntity.history.map((history) => this.mapHistoryToDomainModel(history)) : [],
    };
    return config;
  }

  private mapHistoryToDomainModel(configHistoryEntity: ConfigHistoryEntity): ConfigHistory {
    const configHistory = {
      id: configHistoryEntity.id,
      configId: configHistoryEntity.configId,
      updateReason: configHistoryEntity.updateReason,
      oldValue: configHistoryEntity.oldValue,
      newValue: configHistoryEntity.newValue,
      changeDate: configHistoryEntity.changeDate,
    };
    return configHistory;
  }
}
