import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { PermissionNames } from 'src/permissions/enums';
import { JwtPayload } from './auth.guard';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get<PermissionNames[]>(
      'permissions',
      context.getHandler(),
    );
    if (!permissions) return true;

    const request = context.switchToHttp().getRequest();
    const user: JwtPayload = request.user;

    return permissions.some(permissionNames =>
      user?.roles?.some(role =>
        role.permissions.some(
          permission => permission.name === permissionNames,
        ),
      ),
    );
  }
}
