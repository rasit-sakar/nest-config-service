import { Field, InputType } from '@nestjs/graphql';
import { UserAuthType } from '../../../../application/domain/user/models/user-auth-type';

@InputType()
export class SpaceAuthGQLInput {
  @Field()
  spaceName: string;

  @Field(() => String)
  userAuthType: UserAuthType;
}

@InputType()
export class AssignSpaceAuthsGQLInput {
  @Field(() => [SpaceAuthGQLInput])
  spaceAuths: SpaceAuthGQLInput[];
}
