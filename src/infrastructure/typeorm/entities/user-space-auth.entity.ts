import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserAuthType } from '../../../application/domain/user/models/user-auth-type';

@Entity('user_space_auths')
export class UserSpaceAuthEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.spaceAuths, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  userId: string;

  @Column({ name: 'space_name', type: 'varchar', length: 50, nullable: false })
  spaceName: string;

  @Column({ name: 'auth', type: 'enum', enum: UserAuthType, nullable: false })
  auth: UserAuthType;
}
