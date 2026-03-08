import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigEntity } from '../../../infrastructure/typeorm/entities/config.entity';
import { Config } from './models/config.model';
import { CreateConfigInput } from '../../contracts/create-config.model';

@Injectable()
export class ConfigRepository {
  constructor(
    @InjectRepository(ConfigEntity)
    private readonly configRepository: Repository<ConfigEntity>,
  ) {}

  async findAll(): Promise<Config[]> {
    const configs = await this.configRepository.find({ relations: ['history'] });
    return configs.map((config) => this.mapToDomainModel(config));
  }

  async create(config: CreateConfigInput): Promise<Config> {
    const dateNow = new Date();
    const configEntity = this.configRepository.create({
      name: config.name,
      value: config.value,
      environment: config.environment,
      space: config.space,
      isSecret: config.isSecret,
      createdAt: dateNow,
      updatedAt: dateNow,
    });
    await this.configRepository.save(configEntity);
    return this.mapToDomainModel(configEntity);
  }

  private mapToDomainModel(configEntity: ConfigEntity): Config {
    const config: Config = {
      id: configEntity.id,
      name: configEntity.name,
      value: configEntity.value,
      space: configEntity.space,
      environment: configEntity.environment,
      isSecret: configEntity.isSecret,
      createdAt: configEntity.createdAt,
      updatedAt: configEntity.updatedAt,
    };
    return config;
  }
}
