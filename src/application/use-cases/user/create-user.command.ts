import { Injectable } from '@nestjs/common';
import { UserService } from '../../domain/user/user.service';
import { CreateUserInput } from '../../contracts/create-user';
import { User } from '../../domain/user/models/user.model';

@Injectable()
export class CreateUserCommand {
  constructor(private readonly userService: UserService) {}

  async execute(createUserInput: CreateUserInput): Promise<User> {
    return this.userService.createUser(createUserInput);
  }
}
