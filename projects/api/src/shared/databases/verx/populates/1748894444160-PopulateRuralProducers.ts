import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { countDataTable, randomData } from '../../utils/data';
import { faker } from '@faker-js/faker';
import { DocumentType } from '../constants/database-types';
import { genCnpj, genCpf } from '../../utils/strings';

@Injectable()
export class PopulateRuralProducers1748894444160 {
  public async up(
    queryRunner: QueryRunner,
    populate_factor: number,
  ): Promise<void> {
    const count = await countDataTable(queryRunner, 'rural_producers');
    if (count >= populate_factor) {
      return;
    }

    const insert_data = [];
    for (let i = 0; i < populate_factor; i++) {
      const name = faker.person.fullName();

      const rand_doc = randomData([DocumentType.CPF, DocumentType.CNPJ]);

      let document: string = null;

      if (rand_doc === DocumentType.CPF) {
        document = genCpf();
      } else {
        document = genCnpj();
      }

      insert_data.push({
        name,
        document,
        document_type: rand_doc,
      });
    }

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('rural_producers')
      .values(insert_data)
      .execute();
  }
}
