import { Injectable } from '@nestjs/common';
import { CreateConfigInput } from '../../contracts/create-config.model';
import { ConfigHistoryService } from '../../domain/config-history/config-history.service';
import { ConfigService } from '../../domain/config/config.service';
import { Config } from '../../domain/config/models/config.model';

@Injectable()
export class CreateConfigCommand {
  constructor(
    private readonly configService: ConfigService,
    private readonly configHistoryService: ConfigHistoryService,
  ) {}

  async execute(createConfigModel: CreateConfigInput): Promise<Config> {
    const config = await this.configService.create(createConfigModel);

    await this.configHistoryService.createHistory({
      configId: config.id,
      updateReason: 'Initial creation',
      oldValue: null,
      newValue: JSON.stringify(config),
      changeDate: new Date(),
      changedByUser: createConfigModel.createdBy,
    });

    return config;
  }
}
