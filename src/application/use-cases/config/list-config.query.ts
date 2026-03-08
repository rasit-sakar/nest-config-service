import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../domain/config/config.service';
import { Config } from '../../domain/config/models/config.model';

@Injectable()
export class ListConfigQuery {
  constructor(private readonly configService: ConfigService) {}

  async execute(): Promise<Config[]> {
    return this.configService.findAll();
  }
}
