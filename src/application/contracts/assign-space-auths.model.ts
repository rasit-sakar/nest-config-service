import { UserAuthType } from '../domain/user/models/user-auth-type';

export interface SpaceAuthInput {
  spaceName: string;
  userAuthType: UserAuthType;
}

export class AssignSpaceAuthsInput {
  username: string;
  spaceAuths: SpaceAuthInput[];
}
