import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
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

@Controller('config')
export class ConfigController {
  constructor(
    private readonly listConfigUseCase: ListConfigQuery,
    private readonly getConfigUseCase: GetConfigQuery,
    private readonly createConfigCommand: CreateConfigCommand,
    private readonly updateConfigCommand: UpdateConfigCommand,
    private readonly deleteConfigCommand: DeleteConfigCommand,
  ) {}

  @Get(':space/:environment')
  async list(@Param('space') space: string, @Param('environment') environment: string): Promise<ListAllConfigResponse> {
    const configs = await this.listConfigUseCase.execute({ space, environment });
    return { data: configs, success: true };
  }

  @Get(':space/:environment/:name')
  async getById(
    @Param('space') space: string,
    @Param('environment') environment: string,
    @Param('name') name: string,
  ): Promise<GetConfigResponse> {
    const config = await this.getConfigUseCase.execute({ space, environment }, name);
    return { data: config, success: true };
  }

  @Post(':space/:environment')
  async create(
    @Param('space') space: string,
    @Param('environment') environment: string,
    @Body() createConfigRequest: CreateConfigRequest,
  ): Promise<CreateConfigResponse> {
    const config = await this.createConfigCommand.execute({
      name: createConfigRequest.name,
      value: createConfigRequest.value,
      environment: environment,
      isSecret: createConfigRequest.isSecret,
      space: space,
      description: createConfigRequest.description,
      isDisabled: createConfigRequest.isDisabled,
    });

    return { data: config, success: true };
  }

  @Put(':space/:environment/:name')
  async update(
    @Param('space') space: string,
    @Param('environment') environment: string,
    @Param('name') name: string,
    @Body() updateConfigRequest: UpdateConfigRequest,
  ): Promise<UpdateConfigResponse> {
    const config = await this.updateConfigCommand.execute({ space, environment }, name, {
      name: updateConfigRequest.name,
      value: updateConfigRequest.value,
      description: updateConfigRequest.description,
      isSecret: updateConfigRequest.isSecret,
      isDisabled: updateConfigRequest.isDisabled,
      updateReason: updateConfigRequest.updateReason,
    });

    return { data: config, success: true };
  }

  @Delete(':space/:environment/:name')
  async remove(
    @Param('space') space: string,
    @Param('environment') environment: string,
    @Param('name') name: string,
    @Query('updateReason') updateReason?: string,
  ): Promise<DeleteConfigResponse> {
    await this.deleteConfigCommand.execute({ space, environment }, name, updateReason);
    return { data: true, success: true };
  }
}
