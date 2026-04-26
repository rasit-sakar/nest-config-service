import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserSpaceAuthEntity } from './user-space-auth.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'username', type: 'varchar', length: 100, nullable: false })
  username: string;

  @Column({ name: 'description', type: 'varchar', length: 200, nullable: true })
  description: string;

  @Column({ name: 'secret_key', type: 'varchar', length: 255, nullable: false })
  secretKey: string;

  @Column({ name: 'secret_password', type: 'text', nullable: false })
  secretPassword: string;

  @Column({ name: 'is_admin', type: 'boolean', nullable: false, default: false })
  isAdmin: boolean;

  @OneToMany(() => UserSpaceAuthEntity, (spaceAuth) => spaceAuth.userId)
  spaceAuths: UserSpaceAuthEntity[];
}
