import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HarvestProduction } from 'src/shared/databases/verx/entities/harvest-production.entity';
import { HarvestProductionService } from './harvest-production.service';
import { HarvestProductionController } from './harvest-production.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HarvestProduction])],
  controllers: [HarvestProductionController],
  providers: [HarvestProductionService],
})
export class HarvestProductionModule {}
