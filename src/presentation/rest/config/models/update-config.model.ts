import { ApiProperty } from '@nestjs/swagger';
import { RestResponse } from '../../rest-response.model';
import { Config } from '../../../../application/domain/config/models/config.model';

export class UpdateConfigRequest {
  @ApiProperty({ description: 'Name of the configuration', example: 'DATABASE_URL', required: false })
  name?: string;

  @ApiProperty({ description: 'Value of the configuration', example: 'postgresql://localhost/mydb', required: false })
  value?: string;

  @ApiProperty({ description: 'Description of the configuration', example: 'Database connection string', required: false })
  description?: string;

  @ApiProperty({ description: 'Indicates if the configuration is a secret', example: true, required: false })
  isSecret?: boolean;
}

export class UpdateConfigResponse extends RestResponse<Config> {}
