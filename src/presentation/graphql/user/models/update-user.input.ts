import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserGQLInput {
  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  secretKey?: string;

  @Field({ nullable: true })
  secretPassword?: string;

  @Field({ nullable: true })
  isAdmin?: boolean;
}
