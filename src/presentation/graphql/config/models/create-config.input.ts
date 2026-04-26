import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateConfigGQLInput {
  @Field()
  name: string;

  @Field()
  value: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  isSecret: boolean;

  @Field()
  isDisabled: boolean;
}
