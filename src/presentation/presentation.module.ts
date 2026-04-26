import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/grapql.module';

@Module({
  imports: [GraphqlModule],
  providers: [],
})
export class PresentationModule {}
