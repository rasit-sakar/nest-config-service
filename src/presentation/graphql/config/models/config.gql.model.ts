import { Field, ObjectType } from '@nestjs/graphql';
import { Config } from '../../../../application/domains/config/models/config.model';

@ObjectType()
class ConfigGQLModel {
  @Field({ nullable: false })
  id: string;
  @Field({ nullable: false })
  key: string;
  @Field({ nullable: false })
  value: string;

  constructor(config: Config) {
    this.id = config.id;
    this.key = config.name;
    this.value = config.value;
  }
}

export default ConfigGQLModel;
