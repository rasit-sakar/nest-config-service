import { Global, Module } from '@nestjs/common';
import { SwaggerService } from './swagger/swagger.service';
import { MainConfigModule } from './config/config.module';
import { ORMModule } from './typeorm/orm.module';
import { AuthModule } from './auth/auth.module';

@Global()
@Module({
  imports: [MainConfigModule, ORMModule, AuthModule],
  providers: [SwaggerService],
})
export class InfraModule {}
