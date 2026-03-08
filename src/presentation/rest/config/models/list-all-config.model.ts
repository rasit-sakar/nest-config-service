import { Config } from '../../../../application/domain/config/models/config.model';
import { RestResponse } from '../../rest-response.model';

export class ListAllConfigResponse extends RestResponse<Config[]> {}
