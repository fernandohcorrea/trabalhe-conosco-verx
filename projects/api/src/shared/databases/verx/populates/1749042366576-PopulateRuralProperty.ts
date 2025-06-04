import { QueryRunner } from 'typeorm';
import { countDataTable, getData } from '../../utils/data';
import { faker } from '@faker-js/faker';

export class PopulateRuralProperty1749042366576 {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const [count_addresses, count_rural_producers, count_rural_properties] =
      await Promise.all([
        countDataTable(queryRunner, 'addresses'),
        countDataTable(queryRunner, 'rural_producers'),
        countDataTable(queryRunner, 'rural_properties'),
      ]);

    if (
      count_rural_properties > 0 ||
      count_addresses <= 0 ||
      count_rural_producers <= 0
    ) {
      return;
    }

    const rural_producers = await getData(queryRunner, 'rural_producers');

    for (const i in rural_producers) {
      if (Object.prototype.hasOwnProperty.call(rural_producers, i)) {
        const rural_producer = rural_producers[i];

        const rural_producer_address = await queryRunner.query(
          [
            'SELECT * FROM rural_producers_addresses',
            'WHERE rural_producer_id = $1',
            'ORDER BY RANDOM()',
            'LIMIT 1',
          ].join(' '),
          [rural_producer.id],
        );

        const rural_property_data = this.generateFakeRuralProperty();
        const rural_property = {
          ...rural_property_data,
          rural_producer_id: rural_producer.id,
          address_id: rural_producer_address[0].address_id,
        };

        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into('rural_properties')
          .values(rural_property)
          .execute();
      }
    }
  }

  private generateFakeRuralProperty() {
    const rural_property = {
      name: `Fazenda ${faker.company.name()}`,
      hectares: this.genRandomFloatHectares(2, 10),
    };
    return rural_property;
  }

  private genRandomFloatHectares(min: number, max: number) {
    const random = Math.random() * (max - min) + min;
    const decimal = Math.random() * (99 - 1) + 10;
    return Number(parseFloat(`${random}.${decimal}`).toFixed(3));
  }
}
