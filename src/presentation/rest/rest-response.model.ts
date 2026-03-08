import { ApiProperty } from '@nestjs/swagger';

export class RestResponse<T> {
  @ApiProperty({ description: 'Indicates if the request was successful', example: true })
  success: boolean;
  @ApiProperty({ description: 'The data returned from the request', example: { id: 1, name: 'Example Config' } })
  data?: T;
  @ApiProperty({ description: 'The error message if the request failed', example: 'Config not found' })
  error?: string;
}
