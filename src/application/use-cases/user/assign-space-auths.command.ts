import { Injectable } from '@nestjs/common';
import { UserService } from '../../domain/user/user.service';
import { AssignSpaceAuthsInput } from '../../contracts/assign-space-auths.model';
import { User } from '../../domain/user/models/user.model';

@Injectable()
export class AssignSpaceAuthsCommand {
  constructor(private readonly userService: UserService) {}

  async execute(assignSpaceAuthsInput: AssignSpaceAuthsInput): Promise<User> {
    return this.userService.assignSpaceAuthsToUser(assignSpaceAuthsInput);
  }
}
