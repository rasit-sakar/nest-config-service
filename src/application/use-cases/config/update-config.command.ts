import { Injectable } from '@nestjs/common';
import { ConfigHistoryService } from '../../domain/config-history/config-history.service';
import { ConfigService } from '../../domain/config/config.service';
import { UpdateConfigInput } from '../../contracts/update-config.model';
import { Config } from '../../domain/config/models/config.model';
import { DefaultConfigFilters } from '../../contracts/default-config-filters.model';

@Injectable()
export class UpdateConfigCommand {
  constructor(
    private readonly configService: ConfigService,
    private readonly configHistoryService: ConfigHistoryService,
  ) {}

  async execute(defaultFilters: DefaultConfigFilters, id: string, updateConfigModel: UpdateConfigInput): Promise<Config> {
    const previousConfig = await this.configService.findById(defaultFilters, id);
    const updatedConfig = await this.configService.update(defaultFilters, id, updateConfigModel);

    await this.configHistoryService.createHistory({
      configId: updatedConfig.id,
      updateReason: 'Config updated',
      oldValue: JSON.stringify(previousConfig),
      newValue: JSON.stringify(updatedConfig),
      changeDate: new Date(),
    });

    return updatedConfig;
  }
}
