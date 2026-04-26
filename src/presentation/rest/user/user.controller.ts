import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../../../infrastructure/auth/admin.guard';
import { GetUserQuery } from '../../../application/use-cases/user/get-user.query';
import { CreateUserCommand } from '../../../application/use-cases/user/create-user.command';
import { UpdateUserCommand } from '../../../application/use-cases/user/update-user.command';
import { AuthenticateUser } from '../../../application/use-cases/user/authenticate';
import { CreateUserRequest, CreateUserResponse } from './models/create-user.model';
import { UpdateUserRequest, UpdateUserResponse } from './models/update-user.model';
import { GetUserResponse } from './models/get-user.model';
import { AuthenticateRequest, AuthenticateResponse } from './models/authenticate.model';

@Controller('admin/users')
@UseGuards(AdminGuard)
export class UserController {
  constructor(
    private readonly getUserQuery: GetUserQuery,
    private readonly createUserCommand: CreateUserCommand,
    private readonly updateUserCommand: UpdateUserCommand,
    private readonly authenticateUser: AuthenticateUser,
  ) {}

  @Get(':username')
  async getUserByUsername(@Param('username') username: string): Promise<GetUserResponse> {
    const user = await this.getUserQuery.execute(username);
    return { data: user, success: true };
  }

  @Post()
  async createUser(@Body() createUserRequest: CreateUserRequest): Promise<CreateUserResponse> {
    const user = await this.createUserCommand.execute(createUserRequest);
    return { data: user, success: true };
  }

  @Put(':username')
  async updateUser(@Param('username') username: string, @Body() updateUserRequest: UpdateUserRequest): Promise<UpdateUserResponse> {
    const user = await this.updateUserCommand.execute(username, updateUserRequest);
    return { data: user, success: true };
  }

  @Post('login')
  async authenticate(@Body() authenticateRequest: AuthenticateRequest): Promise<AuthenticateResponse> {
    const result = await this.authenticateUser.execute(authenticateRequest);
    if (!result) {
      return { success: false, error: 'Invalid credentials' };
    }
    return { success: true, data: { jwtToken: result.jwtToken, expiredAt: result.expiredAt.toISOString() } };
  }
}
