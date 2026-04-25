import { Injectable } from '@nestjs/common';
import { SpaceService } from '../../domain/space/space.service';

@Injectable()
export class LoginSpaceQuery {
  constructor(private readonly spaceService: SpaceService) {}

  async execute(space: string, environment: string): Promise<{ token: string }> {
    const token = await this.spaceService.login(space, environment);
    return { token };
  }
}
