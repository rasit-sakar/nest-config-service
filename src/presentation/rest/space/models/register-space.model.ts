import { ApiProperty } from '@nestjs/swagger';
import { RestResponse } from '../../rest-response.model';
import { SpaceAuthTokens } from '../../../../application/contracts/space-auth.model';

export class RegisterSpaceRequest {
  @ApiProperty({ example: 'example-space', description: 'Space name for the configuration group' })
  space: string;

  @ApiProperty({ example: 'production', description: 'Environment associated with the space' })
  environment: string;

  @ApiProperty({ example: false, description: 'Whether this space is global for the environment', required: false })
  isGlobal?: boolean;
}

export class RegisterSpaceResponse extends RestResponse<SpaceAuthTokens> {}
