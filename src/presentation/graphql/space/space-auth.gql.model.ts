import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SpaceAuthGQLModel {
  @Field()
  token: string;
}
