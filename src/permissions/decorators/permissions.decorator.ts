import { SetMetadata } from '@nestjs/common';

import { PermissionNames } from '../enums';

export const Permissions = (...permissions: PermissionNames[]) =>
  SetMetadata('permissions', permissions);
