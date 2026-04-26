import { ApiProperty } from '@nestjs/swagger';
import { RestResponse } from '../../rest-response.model';
import { User } from '../../../../application/domain/user/models/user.model';

export class UpdateUserRequest {
  @ApiProperty({ description: 'Description of the user', example: 'Updated description', required: false })
  description?: string;

  @ApiProperty({ description: 'Secret key for authentication', example: 'new-secret-key', required: false })
  secretKey?: string;

  @ApiProperty({ description: 'Secret password for authentication', example: 'new-secret-password', required: false })
  secretPassword?: string;

  @ApiProperty({ description: 'Indicates if the user is an admin', example: true, required: false })
  isAdmin?: boolean;
}

export class UpdateUserResponse extends RestResponse<User> {}
