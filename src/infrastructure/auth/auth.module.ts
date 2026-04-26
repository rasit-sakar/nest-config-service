import { Global, Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Global()
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt', session: false })],
  providers: [JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
