import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('spaces')
@Unique(['name', 'environment'])
export class SpaceEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ name: 'environment_name', type: 'varchar', length: 20, nullable: false })
  environment: string;

  @Column({ name: 'auth_token', type: 'varchar', length: 255, nullable: false })
  authToken: string;

  @Column({ name: 'is_global', type: 'boolean', nullable: false, default: false })
  isGlobal: boolean;

  @Column({ name: 'settings', type: 'jsonb', nullable: true, default: '{}' })
  settings?: Record<string, unknown>;

  @Column({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp', nullable: false })
  updatedAt: Date;
}
