import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigHistory } from './models/config-history.model';
import { ConfigHistoryEntity } from '../../../infrastructure/typeorm/entities/config-history.entity';

@Injectable()
export class ConfigHistoryRepository {
  constructor(
    @InjectRepository(ConfigHistoryEntity)
    private readonly configHistoryRepository: Repository<ConfigHistoryEntity>,
  ) {}

  async getHistoryByConfigId(configId: string): Promise<ConfigHistory[]> {
    const historyEntities = await this.configHistoryRepository.find({ where: { configId } });
    return historyEntities.map((entity) => this.mapToDomainModel(entity));
  }

  async createHistory(
    historyData: Pick<ConfigHistory, 'configId' | 'updateReason' | 'oldValue' | 'newValue' | 'changeDate'>,
  ): Promise<void> {
    const configEntity = this.configHistoryRepository.create({
      config: { id: historyData.configId },
      updateReason: historyData.updateReason,
      oldValue: historyData.oldValue,
      newValue: historyData.newValue,
      changeDate: historyData.changeDate,
    });
    await this.configHistoryRepository.save(configEntity);
  }

  private mapToDomainModel(entity: ConfigHistoryEntity): ConfigHistory {
    return {
      id: entity.id,
      configId: entity.configId,
      updateReason: entity.updateReason,
      oldValue: entity.oldValue,
      newValue: entity.newValue,
      changeDate: entity.changeDate,
    };
  }
}
