import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface CurrentSpaceContext {
  space: string;
  environment: string;
}

export const CurrentSpace = createParamDecorator((_data: unknown, context: ExecutionContext): CurrentSpaceContext => {
  const gqlContext = GqlExecutionContext.create(context);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const request = gqlContext.getType() === 'graphql' ? gqlContext.getContext()?.req : context.switchToHttp().getRequest();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return request?.spaceAuth as CurrentSpaceContext;
});
