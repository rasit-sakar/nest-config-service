import { UserSpaceAuth } from './user-space-auth.model';

export interface UserContext {
  userId: string;
  username: string;
  spaceAuths: UserSpaceAuth[];
  isAdmin: boolean;
}
