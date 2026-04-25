import { Injectable } from '@nestjs/common';
import { SpaceService } from '../../domain/space/space.service';

@Injectable()
export class RegisterSpaceCommand {
  constructor(private readonly spaceService: SpaceService) {}

  async execute(space: string, environment: string, isGlobal = false): Promise<{ token: string }> {
    const token = await this.spaceService.register(space, environment, isGlobal);
    return { token };
  }
}
