import { ApiProperty } from '@nestjs/swagger';
import { RestResponse } from '../../rest-response.model';

export class CreateConfigRequest {
  @ApiProperty({ description: 'Name of the configuration', example: 'DATABASE_URL' })
  name: string;
  @ApiProperty({ description: 'Value of the configuration', example: 'postgresql://localhost/mydb' })
  value: string;
  @ApiProperty({ description: 'Environment for the configuration', example: 'production' })
  environment: string;
  @ApiProperty({ description: 'Space for the configuration', example: 'default' })
  space: string;
  @ApiProperty({ description: 'Description of the configuration', example: 'Database connection string' })
  description?: string;
  @ApiProperty({ description: 'Indicates if the configuration is a secret', example: true })
  isSecret: boolean;
}

export class CreateConfigResponse extends RestResponse<boolean> {}
