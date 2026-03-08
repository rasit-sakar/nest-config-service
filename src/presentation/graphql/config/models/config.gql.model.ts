import { Field, ObjectType } from '@nestjs/graphql';
import { Config } from '../../../../application/domain/config/models/config.model';

@ObjectType()
class ConfigGQLModel {
  @Field({ nullable: false })
  id: string;
  @Field({ nullable: false })
  name: string;
  @Field({ nullable: false })
  value: string;

  constructor(config: Config) {
    this.id = config.id;
    this.name = config.name;
    this.value = config.value;
  }
}

export default ConfigGQLModel;
