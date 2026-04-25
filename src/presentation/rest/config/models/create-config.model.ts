import { ApiProperty } from '@nestjs/swagger';
import { RestResponse } from '../../rest-response.model';
import { Config } from '../../../../application/domain/config/models/config.model';

export class CreateConfigRequest {
  @ApiProperty({ description: 'Name of the configuration', example: 'DATABASE_URL' })
  name: string;
  @ApiProperty({ description: 'Value of the configuration', example: 'postgresql://localhost/mydb' })
  value: string;
  @ApiProperty({ description: 'Description of the configuration', example: 'Database connection string' })
  description?: string;
  @ApiProperty({ description: 'Indicates if the configuration is a secret', example: true })
  isSecret: boolean;
}

export class CreateConfigResponse extends RestResponse<Config> {}
