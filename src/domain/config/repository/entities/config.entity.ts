import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ConfigHistoryEntity } from './config-history.entity';
import { ConfigEnvironment } from '../../models/config-environment.enum';

@Entity('configs')
export class ConfigEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ name: 'name', type: 'jsonb', nullable: false })
  value: string;

  @Column({ name: 'service_name', type: 'varchar', length: 50, nullable: false })
  serviceName: string;

  @Column({ name: 'environment', type: 'enum', enum: ConfigEnvironment, nullable: false })
  environment: ConfigEnvironment;

  @Column({ name: 'is_disabled', type: 'boolean', nullable: false })
  isDisabled: boolean;

  @Column({ name: 'is_secret', type: 'boolean', nullable: false })
  isSecret: boolean;

  @Column({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: boolean;

  @Column({ name: 'updated_at', type: 'timestamp', nullable: false })
  updatedAt: boolean;

  @OneToMany(() => ConfigHistoryEntity, (configHistory) => configHistory.configId, { nullable: true, eager: false })
  history: ConfigHistoryEntity[];
}
