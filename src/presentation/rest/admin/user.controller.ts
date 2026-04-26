import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../../../infrastructure/auth/admin.guard';
import { CreateUserInput } from '../../../application/contracts/create-user';
import { UpdateUserInput } from '../../../application/contracts/update-user.model';
import { GetUserQuery } from '../../../application/use-cases/user/get-user.query';
import { CreateUserCommand } from '../../../application/use-cases/user/create-user.command';
import { UpdateUserCommand } from '../../../application/use-cases/user/update-user.command';
import { AuthenticateUser } from '../../../application/use-cases/user/authenticate';

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
  async getUserByUsername(@Param('username') username: string) {
    const user = await this.getUserQuery.execute(username);
    return { success: true, data: user };
  }

  @Post()
  async createUser(@Body() createUserInput: CreateUserInput) {
    const user = await this.createUserCommand.execute(createUserInput);
    return { success: true, data: user };
  }

  @Put(':username')
  async updateUser(@Param('username') username: string, @Body() updateUserInput: UpdateUserInput) {
    const user = await this.updateUserCommand.execute(username, updateUserInput);
    return { success: true, data: user };
  }

  @Post('login')
  async authenticate(@Body() body: { username: string; secretKey: string; secretPassword: string }) {
    const result = await this.authenticateUser.execute(body);
    if (!result) {
      return { success: false, message: 'Invalid credentials' };
    }
    return { success: true, data: result };
  }
}
