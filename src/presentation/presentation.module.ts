import { Module } from '@nestjs/common';
import { RestApiModule } from './rest/rest-api.module';
import { GraphqlModule } from './graphql/grapql.module';

@Module({
  imports: [RestApiModule, GraphqlModule],
  providers: [],
})
export class PresentationModule {}
