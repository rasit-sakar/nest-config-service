import { Body, Controller, Get, Post } from '@nestjs/common';
import { ListAllConfigResponse } from './models/list-all-config.model';
import { ListConfigQuery } from '../../../application/use-cases/config/list-config.query';
import { CreateConfigCommand } from '../../../application/use-cases/config/create-config.command';
import { CreateConfigRequest, CreateConfigResponse } from './models/create-config.model';

@Controller('config')
export class ConfigController {
  constructor(
    private readonly listConfigUseCase: ListConfigQuery,
    private readonly createConfigCommand: CreateConfigCommand,
  ) {}

  @Get()
  async list(): Promise<ListAllConfigResponse> {
    const configs = await this.listConfigUseCase.execute();
    return { data: configs, success: true };
  }

  @Post()
  async create(@Body() createConfigRequest: CreateConfigRequest): Promise<CreateConfigResponse> {
    await this.createConfigCommand.execute({
      name: createConfigRequest.name,
      value: createConfigRequest.value,
      environment: createConfigRequest.environment,
      isSecret: createConfigRequest.isSecret,
      space: createConfigRequest.space,
    });

    return { data: true, success: true };
  }
}
