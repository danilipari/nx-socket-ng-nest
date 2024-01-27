import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EventsModule } from '../events/events.module';
import { ErrorHandlerModule } from '../errors/error-handler.module';

@Module({
  imports: [ErrorHandlerModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
