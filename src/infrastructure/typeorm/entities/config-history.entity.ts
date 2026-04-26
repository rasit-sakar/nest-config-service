import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { ConfigEntity } from './config.entity';

@Entity('config_history')
export class ConfigHistoryEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @ManyToOne(() => ConfigEntity, (config) => config.history, { nullable: false })
  @JoinColumn({ name: 'config_id' })
  config: ConfigEntity;

  @RelationId((history: ConfigHistoryEntity) => history.config)
  configId: string;

  @Column({ name: 'update_reason', type: 'text' })
  updateReason: string;

  @Column({ name: 'old_value', type: 'jsonb' })
  oldValue: string;

  @Column({ name: 'new_value', type: 'jsonb' })
  newValue: string;

  @Column({ name: 'change_date', type: 'timestamp' })
  changeDate: Date;

  @Column({ name: 'changed_by_user', type: 'uuid' })
  changedByUser: string;
}
