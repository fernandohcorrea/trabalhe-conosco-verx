import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { SeedRuralProductionItems1748911145275 as Seed } from '../seeders/1748911145275-SeedRuralProductionItems';

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

    const seed = new Seed();
    await seed.up(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rural_production_items');
  }
}
