import { SetMetadata } from '@nestjs/common';
import { UserAuthType } from '../../application/domain/user/models/user-auth-type';

export const REQUIRE_SPACE_AUTH = 'require_space_auth';
export type RequireSpaceAuthParams = {
  spaceID: string;
  authType: UserAuthType;
};

export const RequireSpaceAuth = (spaceID: string, authType: UserAuthType) => SetMetadata(REQUIRE_SPACE_AUTH, { spaceID, authType });
