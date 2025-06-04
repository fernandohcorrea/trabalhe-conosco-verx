import { QueryRunner } from 'typeorm';
import { countDataTable, randomData } from '../../utils/data';

export class PopulateHarvestProductions1749049920096 {
  public async up(
    queryRunner: QueryRunner,
    populate_factor: number,
  ): Promise<void> {
    const [
      count_plots,
      count_harvests,
      count_rural_production_items,
      count_harvest_productions,
    ] = await Promise.all([
      countDataTable(queryRunner, 'plots'),
      countDataTable(queryRunner, 'harvests'),
      countDataTable(queryRunner, 'rural_production_items'),
      countDataTable(queryRunner, 'harvest_productions'),
    ]);

    if (
      count_plots <= 0 ||
      count_harvests <= 0 ||
      count_rural_production_items <= 0 ||
      count_harvest_productions > 0
    ) {
      return;
    }

    const plots = await queryRunner.query(`SELECT * FROM plots`);
    const harvests = await queryRunner.query(`SELECT * FROM harvests`);
    const rural_production_items = await queryRunner.query(
      `SELECT * FROM rural_production_items`,
    );

    for (const i in plots) {
      if (Object.prototype.hasOwnProperty.call(plots, i)) {
        const plot = plots[i];

        const data_itens = randomData(rural_production_items, populate_factor);

        for (const j in harvests) {
          if (Object.prototype.hasOwnProperty.call(harvests, j)) {
            const harvest = harvests[j];

            const query = [
              'INSERT INTO',
              'harvest_productions (plot_id, harvest_id, rural_production_item_id, production_tons) ',
              'VALUES',
            ].join(' ');

            const data = data_itens
              .map((item) => {
                const production_tons = this.genRandomFloatHectares(1, 6);
                return `('${plot.id}', '${harvest.id}', '${item.id}', '${production_tons.toFixed(3)}')`;
              })
              .join(',');

            await queryRunner.query(`${query} ${data};`);
          }
        }
      }
    }
  }

  private genRandomFloatHectares(min: number, max: number) {
    const random = Math.random() * (max - min) + min;
    const decimal = Math.random() * (99 - 1) + 10;
    return Number(parseFloat(`${random}.${decimal}`).toFixed(3));
  }
}
