import { Injectable } from '@nestjs/common';
import { SpaceRepository } from './space.repository';
import { Space } from './models/space.model';
import { CreateSpaceInput } from '../../contracts/create-space.model';

@Injectable()
export class SpaceService {
  constructor(private readonly spaceRepository: SpaceRepository) {}

  findSpaceByName(name: string) {
    return this.spaceRepository.findSpaceByName(name);
  }

  async createSpace(createSpaceInput: CreateSpaceInput): Promise<Space> {
    return this.spaceRepository.createSpace(createSpaceInput);
  }

  async listAllSpaces(): Promise<Space[]> {
    return this.spaceRepository.findAllSpaces();
  }

  async deleteSpace(name: string): Promise<void> {
    return this.spaceRepository.deleteSpaceByName(name);
  }
}
