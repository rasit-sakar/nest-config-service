import { ApiProperty } from '@nestjs/swagger';
import { RestResponse } from '../../rest-response.model';
import { User } from '../../../../application/domain/user/models/user.model';

export class CreateUserRequest {
  @ApiProperty({ description: 'Username for the user', example: 'john_doe' })
  username: string;

  @ApiProperty({ description: 'Description of the user', example: 'John Doe user account' })
  description: string;

  @ApiProperty({ description: 'Secret key for authentication', example: 'secret-key-123' })
  secretKey: string;

  @ApiProperty({ description: 'Secret password for authentication', example: 'secret-password-456' })
  secretPassword: string;

  @ApiProperty({ description: 'Indicates if the user is an admin', example: false })
  isAdmin: boolean;
}

export class CreateUserResponse extends RestResponse<User> {}
