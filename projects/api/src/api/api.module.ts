import { CfgModule } from './../_config/cfg.module';
import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { RuralProducerModule } from './controllers/rural-producer/rural-producer.module';
import { AddressModule } from './controllers/address/address.module';
import { RuralPropertyModule } from './controllers/rural-property/rural-property.module';
import { PlotModule } from './controllers/plot/plot.module';
import { HarvestModule } from './controllers/harvest/harvest.module';
import { RuralProductionItemModule } from './controllers/rural-production-item/rural-production-item.module';
@Module({
  imports: [
    CfgModule,
    SharedModule,
    RuralProducerModule,
    AddressModule,
    RuralPropertyModule,
    PlotModule,
    HarvestModule,
    RuralProductionItemModule,
  ],
})
export class ApiModule {}
