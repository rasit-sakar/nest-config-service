import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ConfigFiltersGQLInput {
  @Field({ nullable: true })
  space?: string;

  @Field({ nullable: true })
  environment?: string;
}
