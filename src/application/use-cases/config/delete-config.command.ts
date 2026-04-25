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

  async execute(defaultFilters: DefaultConfigFilters, name: string, updateReason: string): Promise<void> {
    const config = await this.configService.findByName(defaultFilters, name);
    await this.configService.deleteByName(defaultFilters, name);

    await this.configHistoryService.createHistory({
      configId: config.id,
      updateReason: updateReason,
      oldValue: JSON.stringify(config),
      newValue: JSON.stringify(''),
      changeDate: new Date(),
    });
  }
}
