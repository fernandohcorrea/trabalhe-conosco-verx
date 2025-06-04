import { CfgModule } from './../_config/cfg.module';
import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { RuralProducerModule } from './controllers/rural-producer/rural-producer.module';
@Module({
  imports: [CfgModule, SharedModule, RuralProducerModule],
})
export class ApiModule {}
