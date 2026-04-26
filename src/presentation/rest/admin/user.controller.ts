import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../../../infrastructure/auth/admin.guard';
import { UserService } from '../../../application/domain/user/user.service';
import { CreateUserInput } from '../../../application/contracts/create-user';
import { UpdateUserInput } from '../../../application/contracts/update-user.model';

@Controller('admin/users')
@UseGuards(AdminGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  async getUserByUsername(@Param('username') username: string) {
    const user = await this.userService.findUserByUsername(username);
    return { success: true, data: user };
  }

  @Post()
  async createUser(@Body() createUserInput: CreateUserInput) {
    const user = await this.userService.createUser(createUserInput);
    return { success: true, data: user };
  }

  @Put(':username')
  async updateUser(@Param('username') username: string, @Body() updateUserInput: UpdateUserInput) {
    const user = await this.userService.updateUser(username, updateUserInput);
    return { success: true, data: user };
  }
  @Post('login')
  async authenticate(@Body() body: { username: string; secretKey: string; secretPassword: string }) {
    const result = await this.userService.authenticateUser(body.username, body.secretKey, body.secretPassword);
    if (!result) {
      return { success: false, message: 'Invalid credentials' };
    }
    return { success: true, data: result };
  }
}
