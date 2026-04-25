import { UserAuthType } from './user-auth-type';

export interface UserSpaceAuth {
  spaceName: string;
  environment: string;
  userAuthType: UserAuthType;
}
