import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateConfigGQLInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  value: string;

  @Field({ nullable: false })
  environment: string;

  @Field({ nullable: false })
  space: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: false })
  isSecret: boolean;

  @Field({ nullable: true })
  isDisabled?: boolean;

  @Field({ nullable: false })
  updateReason: string;
}
