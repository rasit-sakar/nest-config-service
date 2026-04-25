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

  async execute(defaultFilters: DefaultConfigFilters, name: string, updateConfigModel: UpdateConfigInput): Promise<Config> {
    const previousConfig = await this.configService.findByName(defaultFilters, name);
    const updatedConfig = await this.configService.updateByName(defaultFilters, name, updateConfigModel);

    await this.configHistoryService.createHistory({
      configId: updatedConfig.id,
      updateReason: updateConfigModel.updateReason,
      oldValue: JSON.stringify(previousConfig),
      newValue: JSON.stringify(updatedConfig),
      changeDate: new Date(),
    });

    return updatedConfig;
  }
}
