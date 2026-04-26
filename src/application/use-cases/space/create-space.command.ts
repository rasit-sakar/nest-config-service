import { Injectable, ConflictException } from '@nestjs/common';
import { SpaceService } from '../../domain/space/space.service';
import { Space } from '../../domain/space/models/space.model';
import { CreateSpaceInput } from '../../contracts/create-space.model';

@Injectable()
export class CreateSpaceCommand {
  constructor(private readonly spaceService: SpaceService) {}

  async execute(createSpaceInput: CreateSpaceInput): Promise<Space> {
    const existingSpace = await this.spaceService.findSpaceByName(createSpaceInput.name);
    if (existingSpace) {
      throw new ConflictException(`Space with name ${createSpaceInput.name} already exists`);
    }
    return this.spaceService.createSpace(createSpaceInput);
  }
}
