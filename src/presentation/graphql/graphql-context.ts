import { UserContext } from '../../application/domain/user/models/user-context';

export interface GraphQLContext {
  req: {
    user: UserContext;
  };
}
