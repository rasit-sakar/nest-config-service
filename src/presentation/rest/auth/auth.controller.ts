import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateUser } from '../../../application/use-cases/user/authenticate';

@Controller('auth')
export class AuthController {
  constructor(private readonly authenticateUser: AuthenticateUser) {}

  @Post('login')
  async authenticate(@Body() body: { username: string; secretKey: string; secretPassword: string }) {
    const result = await this.authenticateUser.execute(body);
    if (!result) {
      return { success: false, message: 'Invalid credentials' };
    }
    return { success: true, data: result };
  }
}
