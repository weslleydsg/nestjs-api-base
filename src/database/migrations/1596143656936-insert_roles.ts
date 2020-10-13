import { MigrationInterface, QueryRunner } from 'typeorm';

import { Role } from '../../roles/roles.entity';
import { RoleNames } from '../../roles/enums';
import { PermissionNames } from '../../permissions/enums';

export class insertRoles1596143656936 implements MigrationInterface {
  async fillOrClearRoles(queryRunner: QueryRunner, action: 'save' | 'remove') {
    const repo = queryRunner.connection.getRepository<Role>(Role);

    for (const name in RoleNames) {
      const entity = {
        name: RoleNames[name],
        permissions: [
          {
            name:
              name === RoleNames.ADMIN
                ? PermissionNames.MASTER
                : PermissionNames.NORMAL,
          },
        ],
      } as Role;

      action == 'save' ? await repo.save(entity) : await repo.remove(entity);
    }
  }

  async up(queryRunner: QueryRunner) {
    await this.fillOrClearRoles(queryRunner, 'save');
  }

  async down(queryRunner: QueryRunner) {
    await this.fillOrClearRoles(queryRunner, 'remove');
  }
}
