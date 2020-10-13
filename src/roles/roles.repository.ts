import { Repository, EntityRepository } from 'typeorm';

import { Role } from './roles.entity';
import { RoleNames } from './enums';

@EntityRepository(Role)
export class RolesRepository extends Repository<Role> {
  async findAll() {
    return this.find();
  }

  async findByName(name: RoleNames) {
    return this.findOne({
      where: { name },
      relations: ['permissions'],
    });
  }
}
