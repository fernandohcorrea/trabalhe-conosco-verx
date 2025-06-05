import { CfgModule } from './../_config/cfg.module';
import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { RuralProducerModule } from './controllers/rural-producer/rural-producer.module';
import { AddressModule } from './controllers/address/address.module';
@Module({
  imports: [CfgModule, SharedModule, RuralProducerModule, AddressModule],
})
export class ApiModule {}
