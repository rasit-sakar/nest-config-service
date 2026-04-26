import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigResolver } from './config/config.resolver';
import { UserResolver, AuthResolver } from './user/user.resolver';
import { SpaceResolver } from './space/space.resolver';
import { DomainModule } from '../../application/domain/domain.module';
import { UseCaseModule } from '../../application/use-cases/use-case.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: false,
      autoSchemaFile: join(process.cwd(), 'src/presentation/graphql/schema.gql'),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      context: ({ req }) => ({ req }),
    }),
    DomainModule,
    UseCaseModule,
  ],
  providers: [ConfigResolver, UserResolver, AuthResolver, SpaceResolver],
})
export class GraphqlModule {}
