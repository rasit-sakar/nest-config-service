import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigHistoryService } from '../../domain/config-history/config-history.service';
import { ConfigService } from '../../domain/config/config.service';

@Injectable()
export class DeleteConfigCommand {
  constructor(
    private readonly configService: ConfigService,
    private readonly configHistoryService: ConfigHistoryService,
  ) {}

  async execute(space: string, name: string, updateReason: string, updatedBy: string): Promise<void> {
    const config = await this.configService.findByName(space, name);
    if (!config) {
      throw new NotFoundException(`Config with name ${name} not found`);
    }
    if (config.isDisabled) {
      throw new Error(`Config with name ${name} is already disabled`);
    }
    await this.configService.deleteByName(space, name);

    await this.configHistoryService.createHistory({
      configId: config.id,
      updateReason: updateReason,
      oldValue: JSON.stringify(config),
      newValue: JSON.stringify(''),
      changeDate: new Date(),
      changedByUser: updatedBy,
    });
  }
}
