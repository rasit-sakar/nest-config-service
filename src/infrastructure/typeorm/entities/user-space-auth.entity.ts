import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserAuthType } from '../../../application/domain/user/models/user-auth-type';

@Entity('user_space_auths')
export class UserSpaceAuthEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  userId: string;

  @Column({ name: 'space_name', type: 'varchar', length: 50, nullable: false })
  spaceName: string;

  @Column({ name: 'environment', type: 'varchar', length: 20, nullable: false })
  environment: string;

  @Column({ name: 'auth', type: 'enum', enum: UserAuthType, nullable: false })
  auth: UserAuthType;
}
