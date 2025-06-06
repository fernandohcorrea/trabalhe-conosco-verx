import { Inject, Injectable } from '@nestjs/common';
import { HarvestProduction } from 'src/shared/databases/verx/entities/harvest-production.entity';
import { Harvest } from 'src/shared/databases/verx/entities/harvest.entity';
import { Plot } from 'src/shared/databases/verx/entities/plot.entity';
import { RuralProperty } from 'src/shared/databases/verx/entities/rural-property.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class DashboardService {
  @Inject('DATA_SOURCE')
  private dataSource: DataSource;

  constructor() {}

  async getData(): Promise<any> {
    const returnData = {
      ruralPropertiesTotal: 0,
      ruralPropertiesTotalHectares: 0,
      infoGraphics: {
        byState: {
          name: 'Por Estado',
          data: [],
        },
        byRuralProductionItems: {
          name: 'Tipo de Plantação',
          data: [],
        },
        byPlotType: {
          name: 'Tipo de Solo',
          data: [],
        },
      },
    };

    const ruralPropertiesTotal = await this.getRuralProperties();
    if (ruralPropertiesTotal) {
      returnData.ruralPropertiesTotal = ruralPropertiesTotal;
    }

    const ruralPropertiesTotalHectares =
      await this.getRuralPropertiesTotalHectares();
    if (ruralPropertiesTotalHectares) {
      returnData.ruralPropertiesTotalHectares = ruralPropertiesTotalHectares;
    }

    const ruralPropertiesByState = await this.getRuralPropertiesByState();
    if (ruralPropertiesByState) {
      returnData.infoGraphics.byState.data = ruralPropertiesByState;
    }

    const ruralProductionItemsLastHarvest =
      await this.getRuralProductionItemsByLastHarvest();
    if (ruralProductionItemsLastHarvest) {
      returnData.infoGraphics.byRuralProductionItems.data =
        ruralProductionItemsLastHarvest;
    }

    const plotType = await this.getPlotsHectaresByPlodType();
    if (plotType) {
      returnData.infoGraphics.byPlotType.data = plotType;
    }
    return returnData;
  }

  private async getRuralProperties(): Promise<number> {
    const query = this.dataSource.createQueryBuilder(
      RuralProperty,
      'rural_properties',
    );

    return await query.getCount();
  }

  private async getRuralPropertiesTotalHectares(): Promise<number> {
    const query = this.dataSource.createQueryBuilder(
      RuralProperty,
      'rural_properties',
    );

    const data = await query
      .select('SUM(rural_properties.hectares)')
      .getRawOne();

    if (data && data.sum > 0) {
      return Number(data.sum);
    } else {
      return 0;
    }
  }

  private async getRuralPropertiesByState(): Promise<any> {
    const query_qtd = this.dataSource.createQueryBuilder(RuralProperty, 'rp');
    const qtd = await query_qtd.getCount();

    if (!qtd) {
      return [];
    }

    const query_perc = this.dataSource.createQueryBuilder(RuralProperty, 'rp');

    const data = await query_perc
      .select(
        'addresses.state,  count(rp.id),  (count(rp.id) * 100 / :qtd) as percent',
      )
      .innerJoin('rp.address', 'addresses', 'addresses.id = rp.address_id')
      .groupBy('addresses.state')
      .setParameters({ qtd })
      .getRawMany();

    if (data) {
      return data;
    } else {
      return [];
    }
  }

  private async getRuralProductionItemsByLastHarvest(): Promise<any> {
    const query_last_harvest = this.dataSource
      .createQueryBuilder(Harvest, 'harvests')
      .select('MAX(id) as last_harvest_id');

    const query_total = this.dataSource.createQueryBuilder(
      HarvestProduction,
      'harvest_productions',
    );

    const total = await query_total
      .select(
        'SUM(harvest_productions.production_tons) as harvest_production_tons',
      )
      .innerJoin(
        'harvests',
        'harvests',
        'harvests.id = harvest_productions.harvest_id',
      )
      .where(`harvests.id = (${query_last_harvest.getQuery()})`)
      .getRawOne();

    if (!total || !total?.harvest_production_tons) {
      return [];
    }

    const data = this.dataSource
      .createQueryBuilder(HarvestProduction, 'harvest_productions')
      .select(
        [
          'SUM(harvest_productions.production_tons)',
          'rural_production_items.name',
          'rural_production_items.slug_name_tr',
          `TO_CHAR((SUM(harvest_productions.production_tons) * 100 / :total_harvest_production_tons), '999.999') as percent`,
        ].join(','),
      )
      .innerJoin(
        'harvests',
        'harvests',
        'harvests.id = harvest_productions.harvest_id',
      )
      .innerJoin(
        'rural_production_items',
        'rural_production_items',
        'rural_production_items.id = harvest_productions.rural_production_item_id',
      )
      .where(`harvests.id = (${query_last_harvest.getQuery()})`)
      .groupBy(
        'rural_production_items.name, rural_production_items.slug_name_tr',
      )
      .orderBy('rural_production_items.name', 'DESC')
      .setParameters({
        total_harvest_production_tons: total.harvest_production_tons,
      })
      .getRawMany();

    if (data) {
      return data;
    } else {
      return [];
    }
  }

  async getPlotsHectaresByPlodType(): Promise<any> {
    const query_total = this.dataSource.createQueryBuilder(Plot, 'plots');

    const total = await query_total.select('SUM(plots.hectares)').getRawOne();

    const query_plot_type = this.dataSource.createQueryBuilder(Plot, 'plots');
    const data = await query_plot_type
      .select(
        [
          'plot_type',
          'SUM(hectares)',
          `TO_CHAR((SUM(hectares) * 100 / :total_hectares), '999.999') as percent`,
        ].join(', '),
      )
      .groupBy('plots.plot_type')
      .setParameters({
        total_hectares: total.sum,
      })
      .getRawMany();

    if (data) {
      return data;
    } else {
      return [];
    }
  }
}
