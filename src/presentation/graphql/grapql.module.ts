import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigResolver } from './config/config.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: false,
      autoSchemaFile: join(process.cwd(), 'src/presentation/graphql/schema.gql'),
    }),
  ],
  providers: [ConfigResolver],
})
export class GraphqlModule {}
