import { Injectable, NotFoundException } from '@nestjs/common';
import { SpaceService } from '../../domain/space/space.service';

@Injectable()
export class DeleteSpaceCommand {
  constructor(private readonly spaceService: SpaceService) {}

  async execute(name: string): Promise<void> {
    const space = await this.spaceService.findSpaceByName(name);
    if (!space) {
      throw new NotFoundException(`Space with name ${name} not found`);
    }
    return this.spaceService.deleteSpace(name);
  }
}
