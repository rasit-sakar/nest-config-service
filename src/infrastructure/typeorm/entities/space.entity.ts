import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('spaces')
export class SpaceEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ name: 'description', type: 'varchar', length: 200, nullable: true })
  description: string;
}
