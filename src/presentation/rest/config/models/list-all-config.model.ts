import { Config } from '../../../../application/domains/config/models/config.model';
import { RestResponse } from '../../rest-response.model';

export class ListAllConfigResponse implements RestResponse<Config[]> {}
