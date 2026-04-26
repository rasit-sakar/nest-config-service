/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { REQUIRE_SPACE_AUTH, RequireSpaceAuthParams } from './require-space-auth.decorator';
import { UserContext } from '../../application/domain/user/models/user-context';
import { IS_PUBLIC_KEY } from './public-access.decarator';

@Injectable()
export class SpaceAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) {
      return true;
    }
    const requireAuthParams = this.reflector.get<RequireSpaceAuthParams>(REQUIRE_SPACE_AUTH, context.getHandler());
    if (requireAuthParams?.authType === undefined || requireAuthParams?.spaceID === undefined) {
      throw new ForbiddenException('No space auth metadata found');
    }

    const request = this.getRequest(context);
    const user: UserContext = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated or no space auths');
    }

    if (user.isAdmin) {
      return true; // Admin users bypass space auth checks
    }
    if (!user.spaceAuths || user.spaceAuths.length === 0) {
      throw new ForbiddenException('User has no space auths');
    }

    const space = this.extractSpace(context, requireAuthParams);
    if (!space) {
      throw new ForbiddenException('Space not found in request');
    }

    const hasAuth = user.spaceAuths.some((auth: any) => auth.spaceName === space && auth.userAuthType === requireAuthParams.authType);

    if (!hasAuth) {
      throw new ForbiddenException(`User does not have ${requireAuthParams.authType} permission for space ${space}`);
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

  private extractSpace(context: ExecutionContext, requireAuthParams: RequireSpaceAuthParams): string | null {
    if (context.getType<any>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      const args = ctx.getArgs();

      // Check for space in different possible locations
      if (args) {
        return args[requireAuthParams.spaceID];
      }
    } else {
      // For HTTP, get from params
      const request = context.switchToHttp().getRequest();
      const params = request.params;
      if (params) {
        return params[requireAuthParams.spaceID];
      }

      // Add more if needed
    }
    return null;
  }
}
