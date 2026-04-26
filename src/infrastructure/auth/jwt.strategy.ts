import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../config/app.config';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserContext } from '../../application/domain/user/models/user-context';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const appConfig = configService.get<AppConfig>('app');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig?.jwtSecret || 'default-secret',
    });
  }

  validate(payload: UserContext) {
    // Returns the object that becomes 'req.user'
    return { username: payload.username, spaceAuths: payload.spaceAuths, isAdmin: payload.isAdmin, userId: payload.userId };
  }
}
