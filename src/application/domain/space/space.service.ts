import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { SpaceRepository } from './space.repository';
import { SpaceAuthPayload } from './space.model';

@Injectable()
export class SpaceService {
  constructor(private readonly spaceRepository: SpaceRepository) {}

  async register(space: string, environment: string, isGlobal = false): Promise<string> {
    const token = this.generateToken();
    const existing = await this.spaceRepository.findByNameAndEnvironment(space, environment);
    if (existing) {
      existing.isGlobal = isGlobal;
      existing.authToken = token;
      await this.spaceRepository.update(existing);
      return token;
    }

    const spaceEntity = await this.spaceRepository.create(space, environment, token, isGlobal);
    return spaceEntity.authToken;
  }

  async login(space: string, environment: string): Promise<string> {
    const existing = await this.spaceRepository.findByNameAndEnvironment(space, environment);
    if (!existing) {
      throw new UnauthorizedException('Space is not registered for the requested environment');
    }
    return existing.authToken;
  }

  async verify(token: string): Promise<SpaceAuthPayload> {
    const spaceEntity = await this.spaceRepository.findByToken(token);
    if (!spaceEntity) {
      throw new UnauthorizedException('Invalid authorization token');
    }
    return {
      space: spaceEntity.name,
      environment: spaceEntity.environment,
      issuedAt: spaceEntity.createdAt.getTime(),
    };
  }

  private generateToken(): string {
    return randomBytes(32).toString('hex');
  }
}
