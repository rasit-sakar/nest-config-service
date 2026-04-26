import { Injectable } from '@nestjs/common';
import { UserService } from '../../domain/user/user.service';
import { UpdateUserInput } from '../../contracts/update-user.model';
import { User } from '../../domain/user/models/user.model';

@Injectable()
export class UpdateUserCommand {
  constructor(private readonly userService: UserService) {}

  async execute(username: string, updateUserInput: UpdateUserInput): Promise<User> {
    return this.userService.updateUser(username, updateUserInput);
  }
}
