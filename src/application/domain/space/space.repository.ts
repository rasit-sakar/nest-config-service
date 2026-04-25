import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Space } from './models/space.model';
import { SpaceEntity } from '../../../infrastructure/typeorm/entities/space.entity';

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

  mapToDTO(spaceEntity: SpaceEntity): Space {
    const space = {
      id: spaceEntity.id,
      name: spaceEntity.name,
      environment: spaceEntity.environment,
      description: spaceEntity.description,
    };
    return space;
  }
}
