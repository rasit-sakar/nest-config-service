import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceEntity } from '../../../infrastructure/typeorm/entities/space.entity';
import { SpaceService } from './space.service';
import { SpaceRepository } from './space.repository';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([SpaceEntity])],
  providers: [SpaceService, SpaceRepository],
  exports: [SpaceService],
})
export class SpaceModule {}
