import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createRoleUser1596143669789 implements MigrationInterface {
  private table = new Table({
    name: 'role_user',
    columns: [
      {
        name: 'role_name',
        type: 'varchar',
        isPrimary: true,
      },
      {
        name: 'user_id',
        type: 'uuid',
        isPrimary: true,
      },
    ],
    foreignKeys: [
      {
        columnNames: ['role_name'],
        referencedTableName: 'roles',
        referencedColumnNames: ['name'],
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      {
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'cascade',
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
