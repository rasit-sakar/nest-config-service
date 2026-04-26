import { ApiProperty } from '@nestjs/swagger';
import { RestResponse } from '../../rest-response.model';

export class AuthenticateRequest {
  @ApiProperty({ description: 'Username for authentication', example: 'john_doe' })
  username: string;

  @ApiProperty({ description: 'Secret key for authentication', example: 'secret-key-123' })
  secretKey: string;

  @ApiProperty({ description: 'Secret password for authentication', example: 'secret-password-456' })
  secretPassword: string;
}

export class AuthenticateResponseData {
  @ApiProperty({ description: 'JWT token for authentication', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  jwtToken: string;

  @ApiProperty({ description: 'Expiration date of the token', example: '2026-04-26T12:00:00.000Z' })
  expiredAt: string;
}

export class AuthenticateResponse extends RestResponse<AuthenticateResponseData> {}
