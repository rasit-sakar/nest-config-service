import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ConfigHistoryEntity } from './config-history.entity';

@Entity('configs')
export class ConfigEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ name: 'value', type: 'jsonb', nullable: false })
  value: string;

  @Column({ name: 'space_name', type: 'varchar', length: 50, nullable: false })
  space: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'is_disabled', type: 'boolean', nullable: false })
  isDisabled: boolean;

  @Column({ name: 'is_secret', type: 'boolean', nullable: false })
  isSecret: boolean;

  @Column({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({ name: 'created_by', type: 'uuid', nullable: false })
  createdBy: string;

  @Column({ name: 'updated_at', type: 'timestamp', nullable: false })
  updatedAt: Date;

  @Column({ name: 'updated_by', type: 'uuid', nullable: false })
  updatedBy: string;

  @OneToMany(() => ConfigHistoryEntity, (configHistory) => configHistory.configId, { nullable: true, eager: false })
  history: ConfigHistoryEntity[];
}
