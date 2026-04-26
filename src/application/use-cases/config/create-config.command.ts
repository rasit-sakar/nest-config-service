import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateConfigInput } from '../../contracts/create-config.model';
import { ConfigHistoryService } from '../../domain/config-history/config-history.service';
import { ConfigService } from '../../domain/config/config.service';
import { Config } from '../../domain/config/models/config.model';
import { SpaceService } from '../../domain/space/space.service';

@Injectable()
export class CreateConfigCommand {
  constructor(
    private readonly configService: ConfigService,
    private readonly configHistoryService: ConfigHistoryService,
    private readonly spaceService: SpaceService,
  ) {}

  async execute(createConfigModel: CreateConfigInput): Promise<Config> {
    const existingConfig = await this.configService.findByName(createConfigModel.space, createConfigModel.name);
    if (existingConfig) {
      throw new BadRequestException('Config already exists');
    }
    const space = await this.spaceService.findSpaceByName(createConfigModel.space);
    if (!space) {
      throw new NotFoundException(`Space with name ${createConfigModel.space} not found`);
    }
    const config = await this.configService.create(createConfigModel);

    await this.configHistoryService.createHistory({
      configId: config.id,
      updateReason: 'Initial creation',
      oldValue: '',
      newValue: JSON.stringify(config),
      changeDate: new Date(),
      changedByUser: createConfigModel.createdBy,
    });

    return config;
  }
}
