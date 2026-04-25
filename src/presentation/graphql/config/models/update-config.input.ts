import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateConfigGQLInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  value?: string;

  @Field({ nullable: true })
  environment?: string;

  @Field({ nullable: true })
  space?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  isSecret?: boolean;
}
