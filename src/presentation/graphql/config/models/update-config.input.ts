import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateConfigGQLInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  value?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  isSecret?: boolean;

  @Field({ nullable: true })
  isDisabled?: boolean;

  @Field({ nullable: true })
  updateReason?: string;
}
