import { Global, Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UniversalAuthGuard } from './universal-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Global()
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt', session: false })],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: UniversalAuthGuard,
    },
  ],
  exports: [JwtStrategy],
})
export class AuthModule {}
