import { Injectable } from '@nestjs/common';
import { UserService } from '../../domain/user/user.service';

@Injectable()
export class DeleteUserCommand {
  constructor(private readonly userService: UserService) {}

  async execute(username: string): Promise<void> {
    return this.userService.deleteUser(username);
  }
}
