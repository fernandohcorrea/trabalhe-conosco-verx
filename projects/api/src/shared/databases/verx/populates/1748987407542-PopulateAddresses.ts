import { QueryRunner } from 'typeorm';
import { countDataTable, getData, randomData } from '../../utils/data';
import { faker } from '@faker-js/faker';

export class PopulateAddresses1748987407542 {
  public async up(
    queryRunner: QueryRunner,
    populate_factor: number,
  ): Promise<void> {
    const [count_addresses, count_rural_producers] = await Promise.all([
      countDataTable(queryRunner, 'addresses'),
      countDataTable(queryRunner, 'rural_producers'),
    ]);

    if (count_addresses >= populate_factor && count_rural_producers <= 0) {
      return;
    }

    const rural_producers = await getData(queryRunner, 'rural_producers');

    for (const key in rural_producers) {
      if (Object.prototype.hasOwnProperty.call(rural_producers, key)) {
        const rural_producer = rural_producers[key];
        const addresses = this.generateFakeAddress();

        const query_address = [
          'INSERT INTO addresses',
          '(street, number, complement, city, state, zip_code)',
          'VALUES',
          '($1, $2, $3, $4, $5, $6)',
          'RETURNING id',
        ].join(' ');

        const query_join_tbl = [
          'INSERT INTO rural_producers_addresses',
          '(rural_producer_id, address_id)',
          'VALUES',
          '($1, $2)',
        ].join(' ');

        for (const idx in addresses) {
          if (Object.prototype.hasOwnProperty.call(addresses, idx)) {
            const address = addresses[idx];
            const result = await queryRunner.query(query_address, [
              address.street,
              address.number,
              address.complement,
              address.city,
              address.state,
              address.zip_code,
            ]);

            const address_id = result.pop().id;

            await queryRunner.query(query_join_tbl, [
              rural_producer.id,
              address_id,
            ]);
          }
        }
      }
    }
  }

  private generateFakeAddress() {
    const addresses = [];
    const qtd = randomData([1, 2]);
    for (let i = 0; i < qtd; i++) {
      const address = {
        street: faker.location.street(),
        number: faker.location.buildingNumber(),
        complement: randomData(['CASA', 'FAZENDA']),
        city: faker.location.city(),
        state: faker.location.state({ abbreviated: true }),
        zip_code: faker.location.zipCode('########'),
      };
      addresses.push(address);
    }
    return addresses;
  }
}
