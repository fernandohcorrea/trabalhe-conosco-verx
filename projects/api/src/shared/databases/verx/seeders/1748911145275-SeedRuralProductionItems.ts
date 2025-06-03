import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { countDataTable } from '../../utils/data';
import ruralData from './data/rural-production-items.data';
import slugify from 'slugify';

@Injectable()
export class SeedRuralProductionItems1748911145275 {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const count = await countDataTable(queryRunner, 'rural_production_items');

    if (count > 0) {
      return;
    }

    const data_items = [];
    const list_items = await ruralData();

    list_items.forEach((item: string) => {
      const slug_name_tr = slugify(item, {
        lower: true,
      });
      data_items.push(`('${item}', '${slug_name_tr}')`);
    });

    await await queryRunner.query(
      `INSERT INTO rural_production_items (name, slug_name_tr ) VALUES ${data_items.join(', ')}`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM rural_production_items`);
  }
}
