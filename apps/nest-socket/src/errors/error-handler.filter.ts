import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class ErrorHandler implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    switch (status) {
      case HttpStatus.UNAUTHORIZED:
        message = 'Authentication token missing or invalid';
        break;
      case HttpStatus.FORBIDDEN:
        message = 'You do not have permission to access this resource';
        break;
      case HttpStatus.NOT_FOUND:
        message = 'The requested resource was not found';
        break;
      case HttpStatus.I_AM_A_TEAPOT:
        message = 'I am a teapot';
        break;
      case HttpStatus.MOVED_PERMANENTLY:
        message = 'The resource has been moved permanently';
        break;
      case HttpStatus.INTERNAL_SERVER_ERROR:
        message = message || 'Internal server error';
        break;
      default:
        break;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().getTime(),
      path: request.url,
      message,
    });
  }
}
