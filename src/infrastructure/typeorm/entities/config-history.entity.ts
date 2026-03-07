import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ConfigEntity } from './config.entity';

@Entity('config_history')
export class ConfigHistoryEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @ManyToOne(() => ConfigEntity, (config) => config.history)
  @JoinColumn({ name: 'config_id' })
  configId: string;

  @Column({ name: 'update_reason', type: 'text' })
  updateReason: string;

  @Column({ name: 'old_value', type: 'jsonb' })
  oldValue: string;

  @Column({ name: 'new_value', type: 'jsonb' })
  newValue: string;

  @Column({ name: 'enablement_change', type: 'boolean' })
  enablementChange: boolean;

  @Column({ name: 'change_date', type: 'timestamp' })
  changeDate: boolean;
}
