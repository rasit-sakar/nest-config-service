import { Injectable } from '@nestjs/common';
import { UserService } from '../../domain/user/user.service';
import { User } from '../../domain/user/models/user.model';

@Injectable()
export class GetUserQuery {
  constructor(private readonly userService: UserService) {}

  async execute(username: string): Promise<User | null> {
    return this.userService.findUserByUsername(username);
  }
}
