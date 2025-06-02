import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTablePlots1748891688411 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'plots',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'rural_property_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'hectares',
            type: 'numeric(8,3)',
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

    await queryRunner.createForeignKey(
      'plots',
      new TableForeignKey({
        name: 'FK_plots_rural_properties_id',
        columnNames: ['rural_property_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'rural_properties',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('plots', 'FK_plots_rural_properties_id');
    await queryRunner.dropTable('plots');
  }
}
