import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../domain/config/config.service';
import { Config } from '../../domain/config/models/config.model';

@Injectable()
export class GetConfigQuery {
  constructor(private readonly configService: ConfigService) {}

  async execute(space: string, name: string): Promise<Config | null> {
    const config = await this.configService.findByName(space, name);
    return config;
  }
}
