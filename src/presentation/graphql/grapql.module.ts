import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigResolver } from './config/config.resolver';
import { UserResolver, AuthResolver } from './user/user.resolver';
import { DomainModule } from '../../application/domain/domain.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: false,
      autoSchemaFile: join(process.cwd(), 'src/presentation/graphql/schema.gql'),
    }),
    DomainModule,
  ],
  providers: [ConfigResolver, UserResolver, AuthResolver],
})
export class GraphqlModule {}
