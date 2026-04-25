import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ConfigFiltersGQLInput {
  @Field({ nullable: false })
  space?: string;

  @Field({ nullable: false })
  environment?: string;

  @Field({ nullable: true })
  isDisabled?: boolean;
}
