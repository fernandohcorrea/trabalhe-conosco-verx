import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableRuralProperties1748885125153
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rural_properties',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'rural_producer_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'address_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar(150)',
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
      'rural_properties',
      new TableForeignKey({
        name: 'FK_rural_property_rural_producers_id',
        columnNames: ['rural_producer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'rural_producers',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'rural_properties',
      new TableForeignKey({
        name: 'FK_rural_property_address_id',
        columnNames: ['address_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'addresses',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'rural_properties',
      'FK_rural_property_address_id',
    );

    await queryRunner.dropForeignKey(
      'rural_properties',
      'FK_rural_property_rural_producers_id',
    );

    await queryRunner.dropTable('rural_properties');
  }
}
