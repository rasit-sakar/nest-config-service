import { UserSpaceAuth } from './user-space-auth.model';

export interface UserContext {
  userId: string;
  userName: string;
  spaceAuths: UserSpaceAuth[];
  isAdmin: boolean;
}
