/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './public-access.decarator';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class UniversalAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super(reflector);
  }

  getRequest(context: ExecutionContext) {
    // 1. Handle GraphQL
    if (context.getType<any>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      const gqlReq = ctx.getContext().req;
      if (!gqlReq) {
        throw new Error('GQL Context missing "req". Check GraphQLModule config.');
      }
      return gqlReq;
    }

    // 2. Handle REST
    const httpReq = context.switchToHttp().getRequest();
    if (!httpReq) {
      throw new Error('HTTP Context missing "req".');
    }
    return httpReq;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Check for @Public() bypass
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) {
      return true;
    }

    // 2. TRIGGER THE STRATEGY
    // This specific line is what calls your JwtStrategy.validate()
    const canActivate = await super.canActivate(context);

    return canActivate as boolean;
  }
}
