import { Injectable, NotFoundException } from '@nestjs/common';
import { SpaceService } from '../../domain/space/space.service';
import { Space } from '../../domain/space/models/space.model';

@Injectable()
export class GetSpaceQuery {
  constructor(private readonly spaceService: SpaceService) {}

  async execute(name: string): Promise<Space> {
    const space = await this.spaceService.findSpaceByName(name);
    if (!space) {
      throw new NotFoundException(`Space with name ${name} not found`);
    }
    return space;
  }
}
