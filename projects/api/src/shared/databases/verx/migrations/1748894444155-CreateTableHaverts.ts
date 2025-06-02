import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateTableHaverts1748894444155 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'harvests',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'start_year',
            type: 'smallint CHECK (start_year >= 1900 AND start_year <= 2100 AND start_year <= end_year)',
            isNullable: false,
          },
          {
            name: 'end_year',
            type: 'smallint CHECK (end_year >= 1900 AND end_year <= 2100 AND end_year >= start_year)',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'TIMESTAMP WITH TIME ZONE',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'TIMESTAMP WITH TIME ZONE',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'TIMESTAMP WITH TIME ZONE',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      'harvests',
      new TableIndex({
        name: 'idx_harvests_start_year_end_year',
        columnNames: ['start_year', 'end_year'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('harvests');
  }
}
