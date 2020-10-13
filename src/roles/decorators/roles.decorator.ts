import { SetMetadata } from '@nestjs/common';

import { RoleNames } from '../enums';

export const Roles = (...roles: RoleNames[]) => SetMetadata('roles', roles);
