import { Injectable } from '@nestjs/common';
import { SpaceRepository } from './space.repository';

@Injectable()
export class SpaceService {
  constructor(private readonly spaceRepository: SpaceRepository) {}
  findSpaceByName(name: string) {
    return this.spaceRepository.findSpaceByName(name);
  }
}
