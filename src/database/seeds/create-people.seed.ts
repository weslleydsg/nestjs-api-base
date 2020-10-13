import { Factory, Seeder } from 'typeorm-seeding';

import { User } from '../../users/users.entity';
import { Person } from '../../people/people.entity';
import { Role } from '../../roles/roles.entity';
import { RoleNames } from '../../roles/enums';
import { PermissionNames } from '../../permissions/enums';

export class CreatePeople implements Seeder {
  private async createUser(roles: Role[]) {
    const user = new User();
    user.password = 'password';
    user.roles = roles;
    return user.save();
  }

  async run(factory: Factory) {
    await factory(Person)()
      .map(async p => {
        p.user = await this.createUser([
          {
            name: RoleNames.USER,
            permissions: [{ name: PermissionNames.NORMAL }],
          } as Role,
        ]);
        return p;
      })
      .createMany(20);
    await factory(Person)()
      .map(async p => {
        p.user = await this.createUser([
          {
            name: RoleNames.ADMIN,
            permissions: [{ name: PermissionNames.NORMAL }],
          } as Role,
        ]);
        return p;
      })
      .createMany(20);
    await factory(Person)()
      .map(async p => {
        p.user = await this.createUser([
          { name: RoleNames.USER } as Role,
          { name: RoleNames.ADMIN } as Role,
        ]);
        return p;
      })
      .createMany(5);
  }
}
