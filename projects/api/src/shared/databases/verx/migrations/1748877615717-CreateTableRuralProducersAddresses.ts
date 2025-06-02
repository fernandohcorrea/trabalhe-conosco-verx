import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CreateTableRuralProducersAddresses1748877615717
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rural_producers_addresses',
        columns: [
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
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'rural_producers_addresses',
      new TableForeignKey({
        name: 'FK_rural_producers_addresses_rural_producer_id',
        columnNames: ['rural_producer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'rural_producers',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'rural_producers_addresses',
      new TableForeignKey({
        name: 'FK_rural_producers_addresses_address_id',
        columnNames: ['address_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'addresses',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'rural_producers_addresses',
      new TableIndex({
        name: 'IDX_rural_producer_address',
        columnNames: ['rural_producer_id', 'address_id'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(
      'rural_producers_addresses',
      'IDX_rural_producer_address',
    );

    await queryRunner.dropForeignKey(
      'rural_producers_addresses',
      'FK_rural_producers_addresses_address_id',
    );

    await queryRunner.dropForeignKey(
      'rural_producers_addresses',
      'FK_rural_producers_addresses_rural_producer_id',
    );

    await queryRunner.dropTable('rural_producers_addresses');
  }
}
