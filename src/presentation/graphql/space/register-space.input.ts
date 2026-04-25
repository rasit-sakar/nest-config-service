import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterSpaceGQLInput {
  @Field()
  space: string;

  @Field()
  environment: string;

  @Field({ nullable: true })
  isGlobal?: boolean;
}
