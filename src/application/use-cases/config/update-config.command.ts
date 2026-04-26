import { Injectable } from '@nestjs/common';
import { ConfigHistoryService } from '../../domain/config-history/config-history.service';
import { ConfigService } from '../../domain/config/config.service';
import { UpdateConfigInput } from '../../contracts/update-config.model';
import { Config } from '../../domain/config/models/config.model';

@Injectable()
export class UpdateConfigCommand {
  constructor(
    private readonly configService: ConfigService,
    private readonly configHistoryService: ConfigHistoryService,
  ) {}

  async execute(space: string, name: string, updateConfigModel: UpdateConfigInput): Promise<Config> {
    const previousConfig = await this.configService.findByName(space, name);
    const updatedConfig = await this.configService.updateByName(space, name, updateConfigModel);

    await this.configHistoryService.createHistory({
      configId: updatedConfig.id,
      updateReason: updateConfigModel.updateReason,
      oldValue: JSON.stringify(previousConfig),
      newValue: JSON.stringify(updatedConfig),
      changeDate: new Date(),
      changedByUser: updateConfigModel.updatedBy,
    });

    return updatedConfig;
  }
}
