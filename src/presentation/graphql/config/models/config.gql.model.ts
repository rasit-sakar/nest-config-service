import { Field, ObjectType } from '@nestjs/graphql';
import { Config } from '../../../../application/domain/config/models/config.model';

@ObjectType()
class ConfigGQLModel {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  value: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  isSecret: boolean;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;

  constructor(config: Config) {
    this.id = config.id;
    this.name = config.name;
    this.value = config.value;
    this.description = config.description;
    this.isSecret = config.isSecret;
    this.createdAt = config.createdAt;
    this.updatedAt = config.updatedAt;
  }
}

export default ConfigGQLModel;
