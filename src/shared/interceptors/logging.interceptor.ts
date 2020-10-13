import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  Logger,
  CallHandler,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap(() =>
          process.env.NODE_ENV === 'development'
            ? Logger.log(
                `${method} ${url} [${Date.now() - now}ms]`,
                context.getClass().name,
              )
            : null,
        ),
      );
  }
}
