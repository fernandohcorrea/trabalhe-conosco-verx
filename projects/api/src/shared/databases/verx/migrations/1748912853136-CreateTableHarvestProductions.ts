import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableHarvestProductions1748912853136
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'harvest_productions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'plot_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'harvest_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'rural_production_item_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'production_tons',
            type: 'numeric(8,3)',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'harvest_productions',
      new TableForeignKey({
        name: 'FK_harvest_production_rural_production_item_id',
        columnNames: ['rural_production_item_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'rural_production_items',
      }),
    );

    await queryRunner.createForeignKey(
      'harvest_productions',
      new TableForeignKey({
        name: 'FK_harvest_production_plot_id',
        columnNames: ['plot_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'plots',
      }),
    );

    await queryRunner.createForeignKey(
      'harvest_productions',
      new TableForeignKey({
        name: 'FK_harvest_production_harvest_id',
        columnNames: ['harvest_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'harvests',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'harvest_productions',
      'FK_harvest_production_harvest_id',
    );

    await queryRunner.dropForeignKey(
      'harvest_productions',
      'FK_harvest_production_plot_id',
    );

    await queryRunner.dropTable('harvest_productions');
  }
}
