import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableRuralProductionItems1748911145275
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rural_production_items',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'slug_name_tr',
            type: 'varchar(50)',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rural_production_items');
  }
}
