/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserContext } from '../../application/domain/user/models/user-context';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = this.getRequest(context);
    const user: UserContext = request.user;

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
