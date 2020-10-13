import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import * as Sentry from '@sentry/minimal';

import { ErrorObject, ListErrors } from '../types';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const uncaughtException = !exception.getStatus;

    const http = host.switchToHttp();
    const request = http.getRequest();
    const response = http.getResponse();
    const status = uncaughtException
      ? HttpStatus.INTERNAL_SERVER_ERROR
      : exception.getStatus();

    if (process.env.NODE_ENV === 'production' && uncaughtException) {
      Sentry.captureException(exception);

      const error = {
        status,
        timestamp: new Date().toLocaleString(),
        path: request.path,
        method: request.method,
        title: 'Internal server error',
        detail:
          'There was a unexpected internal error. Please report this error to us.',
        reportLink: undefined,
      };

      return response.status(status).json(error);
    }

    Logger.error(
      `Cannot ${request.method} ${request.url}`,
      exception.stack,
      'ExceptionFilter',
    );

    const error = exception.getResponse() as any;
    const { errors } = error as ListErrors;

    if (!errors)
      return response.status(status).json(
        new ErrorObject({
          status: error.statusCode,
          title: error.error,
          detail: error.message,
        }),
      );

    return response.status(status).json(new ListErrors(errors, status));
  }
}
