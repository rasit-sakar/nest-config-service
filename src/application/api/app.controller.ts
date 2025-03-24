import { Controller, Get } from '@nestjs/common';
import { ConfigDomainService } from '../../domain/config/service/config.service';

@Controller()
export class AppController {
  constructor(private readonly configDomainService: ConfigDomainService) {}

  @Get()
  async getHello(): Promise<string> {
    const a = await this.configDomainService.findAll();
    console.log(a);
    return 'Hello World!';
  }
}
