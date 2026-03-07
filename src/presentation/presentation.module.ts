import { Module } from '@nestjs/common';
import { RestApiModule } from './rest/rest-api.module';

@Module({
  imports: [RestApiModule],
  providers: [],
})
export class PresentationModule {}
