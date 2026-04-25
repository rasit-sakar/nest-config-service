import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { SpaceService } from '../../application/domain/space/space.service';

@Injectable()
export class SpaceAuthGuard implements CanActivate {
  constructor(private readonly spaceService: SpaceService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const request = gqlContext.getType() === 'graphql' ? gqlContext.getContext()?.req : context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const authorization = request?.headers?.authorization || request?.headers?.Authorization;
    if (!authorization || typeof authorization !== 'string') {
      throw new UnauthorizedException('Authorization token is required');
    }

    const [scheme, token] = authorization.split(' ');
    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Authorization token must be a Bearer token');
    }

    const payload = await this.spaceService.verify(token);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    request.spaceAuth = { space: payload.space, environment: payload.environment };
    return true;
  }
}
