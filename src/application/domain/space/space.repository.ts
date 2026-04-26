import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Space } from './models/space.model';
import { SpaceEntity } from '../../../infrastructure/typeorm/entities/space.entity';
import { CreateSpaceInput } from '../../contracts/create-space.model';

@Injectable()
export class SpaceRepository {
  constructor(
    @InjectRepository(SpaceEntity)
    private readonly spaceRepository: Repository<SpaceEntity>,
  ) {}

  async findSpaceByName(name: string): Promise<Space | null> {
    const spaceEntity = await this.spaceRepository.findOne({
      where: { name },
    });
    if (!spaceEntity) return null;
    return this.mapToDTO(spaceEntity);
  }

  async findAllSpaces(): Promise<Space[]> {
    const spaceEntities = await this.spaceRepository.find();
    return spaceEntities.map((entity) => this.mapToDTO(entity));
  }

  async createSpace(createSpaceInput: CreateSpaceInput): Promise<Space> {
    const spaceEntity = this.spaceRepository.create({
      name: createSpaceInput.name,
      description: createSpaceInput.description,
    });
    const savedSpace = await this.spaceRepository.save(spaceEntity);
    return this.mapToDTO(savedSpace);
  }

  async deleteSpaceByName(name: string): Promise<void> {
    const spaceEntity = await this.spaceRepository.findOne({
      where: { name },
    });
    if (spaceEntity) {
      await this.spaceRepository.remove(spaceEntity);
    }
  }

  mapToDTO(spaceEntity: SpaceEntity): Space {
    const space = {
      id: spaceEntity.id,
      name: spaceEntity.name,
      description: spaceEntity.description,
    };
    return space;
  }
}
