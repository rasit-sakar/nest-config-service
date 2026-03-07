import { Controller, Get } from '@nestjs/common';
import { ListAllConfigResponse } from './models/list-all-config.model';
import { ListConfigQuery } from '../../../application/use-case/config/list-config.query';

@Controller('config')
export class ConfigController {
  constructor(private readonly listConfigUseCase: ListConfigQuery) {}

  @Get()
  async list(): Promise<ListAllConfigResponse> {
    const configs = await this.listConfigUseCase.execute();
    return { data: configs };
  }
}
