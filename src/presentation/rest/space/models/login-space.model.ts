import { ApiProperty } from '@nestjs/swagger';
import { RestResponse } from '../../rest-response.model';
import { SpaceAuthTokens } from '../../../../application/contracts/space-auth.model';

export class LoginSpaceRequest {
  @ApiProperty({ example: 'example-space', description: 'Space name to log in' })
  space: string;

  @ApiProperty({ example: 'production', description: 'Environment for the space login' })
  environment: string;
}

export class LoginSpaceResponse extends RestResponse<SpaceAuthTokens> {}
