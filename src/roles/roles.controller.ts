import { Controller, Get } from '@nestjs/common';

import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async list() {
    return { listData: await this.rolesService.list() };
  }
}
