import { Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import { RoleNames } from './enums';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async list() {
    return this.rolesRepository.findAll();
  }

  async view(name: RoleNames) {
    return this.rolesRepository.findOne(name);
  }
}
