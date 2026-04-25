import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SpaceEntity } from '../../../infrastructure/typeorm/entities/space.entity';

@Injectable()
export class SpaceRepository {
  constructor(
    @InjectRepository(SpaceEntity)
    private readonly spaceRepository: Repository<SpaceEntity>,
  ) {}

  async findByNameAndEnvironment(space: string, environment: string): Promise<SpaceEntity | null> {
    return this.spaceRepository.findOne({ where: { name: space, environment } });
  }

  async findByToken(token: string): Promise<SpaceEntity | null> {
    return this.spaceRepository.findOne({ where: { authToken: token } });
  }

  async create(space: string, environment: string, authToken: string, isGlobal: boolean): Promise<SpaceEntity> {
    const dateNow = new Date();
    const entity = this.spaceRepository.create({
      name: space,
      environment,
      authToken,
      isGlobal,
      settings: {},
      createdAt: dateNow,
      updatedAt: dateNow,
    });
    return this.spaceRepository.save(entity);
  }

  async update(spaceEntity: SpaceEntity): Promise<SpaceEntity> {
    spaceEntity.updatedAt = new Date();
    return this.spaceRepository.save(spaceEntity);
  }

  async ensureExists(space: string, environment: string): Promise<SpaceEntity> {
    const entity = await this.findByNameAndEnvironment(space, environment);
    if (!entity) {
      throw new NotFoundException('Space not found');
    }
    return entity;
  }
}
