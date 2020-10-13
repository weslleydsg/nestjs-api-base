import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createRoles1596143642839 implements MigrationInterface {
  private table = new Table({
    name: 'roles',
    columns: [
      {
        name: 'name',
        type: 'varchar',
        length: '20',
        isPrimary: true,
      },
      {
        name: 'description',
        type: 'text',
        isNullable: true,
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
