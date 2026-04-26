/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class UniversalAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    if (context.getType<any>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return ctx.getContext().req;
    }
    return context.switchToHttp().getRequest();
  }
}
