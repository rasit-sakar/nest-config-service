import { Injectable } from '@nestjs/common';
import { ConfigDomainService } from '../../domain/config/service/config.service';
import { Config } from '../../domain/config/models/config.model';

@Injectable()
export class ListConfigQuery {
  constructor(private readonly configDomainService: ConfigDomainService) {}

  async execute(): Promise<Config[]> {
    return this.configDomainService.findAll();
  }
}
