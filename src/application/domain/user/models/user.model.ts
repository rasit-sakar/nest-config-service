import { UserSpaceAuth } from './user-space-auth.model';

export interface User {
  id: string;
  username: string;
  description: string;
  isAdmin: boolean;
  spaceAuths: UserSpaceAuth[];
}
