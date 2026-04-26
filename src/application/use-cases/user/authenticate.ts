import { Injectable } from '@nestjs/common';
import { UserService } from '../../domain/user/user.service';
import { AuthenticateInput } from '../../contracts/authenticate.model';

@Injectable()
export class AuthenticateUser {
  constructor(private readonly userService: UserService) {}

  async execute(authenticateInput: AuthenticateInput): Promise<{ jwtToken: string; expiredAt: Date } | null> {
    return this.userService.authenticate(authenticateInput);
  }
}
