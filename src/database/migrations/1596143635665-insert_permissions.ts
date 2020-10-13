import { MigrationInterface, QueryRunner } from 'typeorm';

import { Permission } from '../../permissions/permissions.entity';
import { PermissionNames } from '../../permissions/enums';

export class insertPermissions1596143635665 implements MigrationInterface {
  async fillOrClear(queryRunner: QueryRunner, action: 'save' | 'remove') {
    const repo = queryRunner.connection.getRepository<Permission>(Permission);

    for (const name in PermissionNames) {
      const entity = { name: PermissionNames[name] } as Permission;

      action == 'save' ? await repo.save(entity) : await repo.remove(entity);
    }
  }

  async up(queryRunner: QueryRunner) {
    await this.fillOrClear(queryRunner, 'save');
  }

  async down(queryRunner: QueryRunner) {
    await this.fillOrClear(queryRunner, 'remove');
  }
}
