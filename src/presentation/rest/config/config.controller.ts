import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ListAllConfigResponse } from './models/list-all-config.model';
import { ListConfigQuery } from '../../../application/use-cases/config/list-config.query';
import { GetConfigQuery } from '../../../application/use-cases/config/get-config.query';
import { CreateConfigCommand } from '../../../application/use-cases/config/create-config.command';
import { UpdateConfigCommand } from '../../../application/use-cases/config/update-config.command';
import { DeleteConfigCommand } from '../../../application/use-cases/config/delete-config.command';
import { CreateConfigRequest, CreateConfigResponse } from './models/create-config.model';
import { UpdateConfigRequest, UpdateConfigResponse } from './models/update-config.model';
import { GetConfigResponse } from './models/get-config.model';
import { DeleteConfigResponse } from './models/delete-config.model';
import { CurrentSpace } from '../../auth/current-space.decorator';
import { SpaceAuthGuard } from '../../auth/space-auth.guard';

@Controller('config')
@UseGuards(SpaceAuthGuard)
export class ConfigController {
  constructor(
    private readonly listConfigUseCase: ListConfigQuery,
    private readonly getConfigUseCase: GetConfigQuery,
    private readonly createConfigCommand: CreateConfigCommand,
    private readonly updateConfigCommand: UpdateConfigCommand,
    private readonly deleteConfigCommand: DeleteConfigCommand,
  ) {}

  @Get()
  async list(@CurrentSpace() currentSpace: { space: string; environment: string }): Promise<ListAllConfigResponse> {
    const configs = await this.listConfigUseCase.execute(currentSpace);
    return { data: configs, success: true };
  }

  @Get(':name')
  async getById(
    @CurrentSpace() currentSpace: { space: string; environment: string },
    @Param('name') name: string,
  ): Promise<GetConfigResponse> {
    const config = await this.getConfigUseCase.execute(currentSpace, name);
    return { data: config, success: true };
  }

  @Post()
  async create(
    @CurrentSpace() currentSpace: { space: string; environment: string },
    @Body() createConfigRequest: CreateConfigRequest,
  ): Promise<CreateConfigResponse> {
    const config = await this.createConfigCommand.execute({
      name: createConfigRequest.name,
      value: createConfigRequest.value,
      environment: currentSpace.environment,
      isSecret: createConfigRequest.isSecret,
      space: currentSpace.space,
      description: createConfigRequest.description,
      isDisabled: createConfigRequest.isDisabled,
    });

    return { data: config, success: true };
  }

  @Put(':name')
  async update(
    @CurrentSpace() currentSpace: { space: string; environment: string },
    @Param('name') name: string,
    @Body() updateConfigRequest: UpdateConfigRequest,
  ): Promise<UpdateConfigResponse> {
    const config = await this.updateConfigCommand.execute(currentSpace, name, {
      name: updateConfigRequest.name,
      value: updateConfigRequest.value,
      description: updateConfigRequest.description,
      isSecret: updateConfigRequest.isSecret,
      isDisabled: updateConfigRequest.isDisabled,
      updateReason: updateConfigRequest.updateReason,
    });

    return { data: config, success: true };
  }

  @Delete(':name')
  async remove(
    @CurrentSpace() currentSpace: { space: string; environment: string },
    @Param('name') name: string,
    @Query('updateReason') updateReason?: string,
  ): Promise<DeleteConfigResponse> {
    await this.deleteConfigCommand.execute(currentSpace, name, updateReason);
    return { data: true, success: true };
  }
}
