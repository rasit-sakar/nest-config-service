/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserContext } from '../../application/domain/user/models/user-context';
import { IS_PUBLIC_KEY } from './public-access.decarator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = this.getRequest(context);
    const user: UserContext = request.user;
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) {
      return true;
    }

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    if (!user.isAdmin) {
      throw new ForbiddenException('Only admin users are allowed to access this resource');
    }

    return true;
  }

  private getRequest(context: ExecutionContext) {
    if (context.getType<any>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req;
    }
    return context.switchToHttp().getRequest();
  }
}
