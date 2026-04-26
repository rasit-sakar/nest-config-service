import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserGQLInput {
  @Field()
  username: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  secretKey: string;

  @Field()
  secretPassword: string;

  @Field()
  isAdmin: boolean;
}
