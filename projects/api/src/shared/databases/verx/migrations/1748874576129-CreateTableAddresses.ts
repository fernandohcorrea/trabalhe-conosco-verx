import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableAddresses1748874576129 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'addresses',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'street',
            type: 'varchar(200)',
            isNullable: false,
          },
          {
            name: 'number',
            type: 'varchar(15)',
            isNullable: true,
          },
          {
            name: 'complement',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar(150)',
            isNullable: false,
          },
          {
            name: 'state',
            type: 'varchar(2)',
            isNullable: false,
          },
          {
            name: 'zip_code',
            type: 'varchar(8)',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('addresses');
  }
}
