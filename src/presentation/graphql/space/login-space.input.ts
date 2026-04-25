import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginSpaceGQLInput {
  @Field()
  space: string;

  @Field()
  environment: string;
}
