import { Injectable } from '@nestjs/common';
import { ConfigDomainService } from '../../domains/config/service/config.service';
import { Config } from '../../domains/config/models/config.model';

@Injectable()
export class ListConfigQuery {
  constructor(private readonly configDomainService: ConfigDomainService) {}

  async execute(): Promise<Config[]> {
    return this.configDomainService.findAll();
  }
}
