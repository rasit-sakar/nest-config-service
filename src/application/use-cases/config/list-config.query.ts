import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../domain/config/config.service';
import { Config } from '../../domain/config/models/config.model';
import { ListConfigsFilters } from '../../contracts/default-config-filters.model';

@Injectable()
export class ListConfigQuery {
  constructor(private readonly configService: ConfigService) {}

  async execute(filters: ListConfigsFilters): Promise<Config[]> {
    return this.configService.findAll(filters);
  }
}
