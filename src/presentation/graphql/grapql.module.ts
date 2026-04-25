import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigResolver } from './config/config.resolver';
import { SpaceResolver } from './space/space.resolver';
import { SpaceAuthGuard } from '../auth/space-auth.guard';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: false,
      autoSchemaFile: join(process.cwd(), 'src/presentation/graphql/schema.gql'),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      context: ({ req }: { req: any }) => ({ req }),
    }),
  ],
  providers: [ConfigResolver, SpaceResolver, SpaceAuthGuard],
})
export class GraphqlModule {}
