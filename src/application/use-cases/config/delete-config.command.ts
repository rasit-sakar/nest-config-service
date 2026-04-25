import { Injectable } from '@nestjs/common';
import { ConfigHistoryService } from '../../domain/config-history/config-history.service';
import { ConfigService } from '../../domain/config/config.service';
import { DefaultConfigFilters } from '../../contracts/default-config-filters.model';

@Injectable()
export class DeleteConfigCommand {
  constructor(
    private readonly configService: ConfigService,
    private readonly configHistoryService: ConfigHistoryService,
  ) {}

  async execute(defaultFilters: DefaultConfigFilters, id: string): Promise<void> {
    const previousConfig = await this.configService.findById(defaultFilters, id);
    const deletedConfig = await this.configService.remove(defaultFilters, id);

    await this.configHistoryService.createHistory({
      configId: deletedConfig.id,
      updateReason: 'Config disabled',
      oldValue: JSON.stringify(previousConfig),
      newValue: JSON.stringify(deletedConfig),
      changeDate: new Date(),
    });
  }
}
