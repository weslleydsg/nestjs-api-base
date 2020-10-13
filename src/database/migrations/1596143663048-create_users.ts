import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsers1596143663048 implements MigrationInterface {
  private table = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'uuid',
      },
      {
        name: 'password',
        type: 'varchar',
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
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
