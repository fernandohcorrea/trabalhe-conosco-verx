import { CfgModule } from './../_config/cfg.module';
import { Module } from '@nestjs/common';
import { HomeController } from './controllers/home.controller';
import { HomeService } from './controllers/home.service';
import { SharedModule } from 'src/shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuralProducer } from '../shared/databases/verx/entities/rural-producer.entity';
import { Address } from '../shared/databases/verx/entities/address.entity';
import { RuralProperty } from '../shared/databases/verx/entities/rural-property.entity';
import { Plot } from '../shared/databases/verx/entities/plot.entity';
import { Harvest } from '../shared/databases/verx/entities/harvest.entity';
import { RuralProductionItem } from 'src/shared/databases/verx/entities/rural-production-item.entity';
@Module({
  imports: [
    CfgModule,
    SharedModule,
    TypeOrmModule.forFeature([
      RuralProducer,
      Address,
      RuralProperty,
      Plot,
      Harvest,
      RuralProductionItem,
    ]),
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class ApiModule {}
