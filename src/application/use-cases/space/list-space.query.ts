import { Injectable } from '@nestjs/common';
import { SpaceService } from '../../domain/space/space.service';
import { Space } from '../../domain/space/models/space.model';

@Injectable()
export class ListSpaceQuery {
  constructor(private readonly spaceService: SpaceService) {}

  async execute(): Promise<Space[]> {
    return this.spaceService.listAllSpaces();
  }
}
