import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import authConfig from 'src/config/auth';
import { Role } from 'src/roles/roles.entity';

export class JwtPayload {
  readonly id: string;
  readonly roles: Role[];
  readonly token?: string;
  readonly iat: number;
  readonly exp: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) return false;

    request.user = this.validateToken(request.headers.authorization);

    return true;
  }

  validateToken(auth: string) {
    const bearerToken = auth.split(' ');

    if (bearerToken[0] !== 'Bearer' || bearerToken.length !== 2)
      throw new BadRequestException(
        'Token is not in a valid format. Use the Bearer token format.',
      );

    try {
      return jwt.verify(bearerToken[1], authConfig.secret) as JwtPayload;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
