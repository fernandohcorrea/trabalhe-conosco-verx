import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateTableRuralProducer1748721994169
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE document_type_enum AS ENUM ('CPF', 'CNPJ');",
    );

    await queryRunner.createTable(
      new Table({
        name: 'rural_producers',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar(150)',
            isNullable: false,
          },
          {
            name: 'document',
            type: 'varchar(14)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'document_type',
            type: 'document_type_enum',
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
      'rural_producers',
      new TableIndex({
        name: 'idx_rural_producers_document',
        columnNames: ['document'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(
      'rural_producers',
      'idx_rural_producers_document',
    );
    await queryRunner.dropTable('rural_producers');
    await queryRunner.query('DROP TYPE document_type_enum;');
  }
}
