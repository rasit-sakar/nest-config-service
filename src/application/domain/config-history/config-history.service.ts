import { Injectable } from '@nestjs/common';
import { ConfigHistory } from './models/config-history.model';
import { ConfigHistoryRepository } from './config-history.repository';

@Injectable()
export class ConfigHistoryService {
  constructor(private readonly configHistoryRepository: ConfigHistoryRepository) {}

  async getHistoryByConfigId(configId: string): Promise<ConfigHistory[]> {
    return this.configHistoryRepository.getHistoryByConfigId(configId);
  }

  async createHistory(
    historyData: Pick<ConfigHistory, 'configId' | 'updateReason' | 'oldValue' | 'newValue' | 'changeDate' | 'changedByUser'>,
  ): Promise<void> {
    await this.configHistoryRepository.createHistory(historyData);
  }
}
