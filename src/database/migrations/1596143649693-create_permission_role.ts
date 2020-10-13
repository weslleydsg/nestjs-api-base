import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createPermissionRole1596143649693 implements MigrationInterface {
  private table = new Table({
    name: 'permission_role',
    columns: [
      {
        name: 'permission_name',
        type: 'varchar',
        isPrimary: true,
      },
      {
        name: 'role_name',
        type: 'varchar',
        isPrimary: true,
      },
    ],
    foreignKeys: [
      {
        columnNames: ['permission_name'],
        referencedTableName: 'permissions',
        referencedColumnNames: ['name'],
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      {
        columnNames: ['role_name'],
        referencedTableName: 'roles',
        referencedColumnNames: ['name'],
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
    ],
  });

  async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(this.table);
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable(this.table);
  }
}
