import { RestResponse } from '../../rest-response.model';
import { User } from '../../../../application/domain/user/models/user.model';

export class GetUserResponse extends RestResponse<User> {}
