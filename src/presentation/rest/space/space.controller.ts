import { Body, Controller, Post } from '@nestjs/common';
import { RegisterSpaceRequest, RegisterSpaceResponse } from './models/register-space.model';
import { LoginSpaceRequest, LoginSpaceResponse } from './models/login-space.model';
import { RegisterSpaceCommand } from '../../../application/use-cases/space/register-space.command';
import { LoginSpaceQuery } from '../../../application/use-cases/space/login-space.query';

@Controller('spaces')
export class SpaceController {
  constructor(
    private readonly registerSpaceCommand: RegisterSpaceCommand,
    private readonly loginSpaceQuery: LoginSpaceQuery,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterSpaceRequest): Promise<RegisterSpaceResponse> {
    const response = await this.registerSpaceCommand.execute(body.space, body.environment, body.isGlobal ?? false);
    return { success: true, data: response };
  }

  @Post('login')
  async login(@Body() body: LoginSpaceRequest): Promise<LoginSpaceResponse> {
    const response = await this.loginSpaceQuery.execute(body.space, body.environment);
    return { success: true, data: response };
  }
}
