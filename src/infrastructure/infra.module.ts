import { Global, Module } from '@nestjs/common';
import { SwaggerService } from './swagger/swagger.service';
import { MainConfigModule } from './config/config.module';
import { ORMModule } from './typeorm/orm.module';

@Global()
@Module({
  imports: [MainConfigModule, ORMModule],
  providers: [SwaggerService],
})
export class InfraModule {}
