import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createPeople1596143675723 implements MigrationInterface {
  private table = new Table({
    name: 'people',
    columns: [
      {
        name: 'user_id',
        type: 'uuid',
        isPrimary: true,
      },
      {
        name: 'email',
        type: 'varchar',
        length: '320',
        isUnique: true,
      },
      {
        name: 'first_name',
        type: 'varchar',
        length: '60',
      },
      {
        name: 'last_name',
        type: 'varchar',
        length: '60',
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
    foreignKeys: [
      {
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
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
