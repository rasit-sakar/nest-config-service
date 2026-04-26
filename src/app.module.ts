import { Module } from '@nestjs/common';
import { InfraModule } from './infrastructure/infra.module';
import { PresentationModule } from './presentation/presentation.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './infrastructure/auth/jwt.strategy';

@Module({
  imports: [PresentationModule, InfraModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
