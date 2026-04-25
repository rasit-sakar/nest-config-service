import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../domain/config/config.service';
import { Config } from '../../domain/config/models/config.model';
import { DefaultConfigFilters } from '../../contracts/default-config-filters.model';

@Injectable()
export class GetConfigQuery {
  constructor(private readonly configService: ConfigService) {}

  async execute(defaultFilters: DefaultConfigFilters, id: string): Promise<Config> {
    return this.configService.findById(defaultFilters, id);
  }
}
