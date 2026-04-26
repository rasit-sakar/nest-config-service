import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceService } from './space.service';
import { SpaceRepository } from './space.repository';
import { SpaceEntity } from '../../../infrastructure/typeorm/entities/space.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceEntity])],
  providers: [SpaceService, SpaceRepository],
  exports: [SpaceService],
})
export class SpaceModule {}
