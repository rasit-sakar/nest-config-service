import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateSpaceGQLInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}

@ObjectType()
export class SpaceGQLModel {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;
}
