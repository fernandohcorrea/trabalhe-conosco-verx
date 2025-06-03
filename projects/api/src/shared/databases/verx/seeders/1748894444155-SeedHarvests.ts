import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { countDataTable } from '../../utils/data';

@Injectable()
export class SeedHarvests1748894444155 {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const count = await countDataTable(queryRunner, 'harvests');

    if (count > 0) {
      return;
    }

    const years = [];
    const dt = new Date();
    for (let year = 2020; year <= dt.getFullYear(); year++) {
      const next_year = year + 1;
      years.push(`(${year}, ${next_year})`);
    }

    await queryRunner.query(
      `INSERT INTO harvests (start_year, end_year ) VALUES ${years.join(', ')}`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM harvests`);
  }
}
