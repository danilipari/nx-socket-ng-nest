import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ErrorHandler } from './error-handler.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorHandler,
    },
  ],
})
export class ErrorHandlerModule {}
