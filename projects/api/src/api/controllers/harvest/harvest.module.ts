import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Harvest } from 'src/shared/databases/verx/entities/harvest.entity';
import { HarvestController } from './harvest.controller';
import { HarvestService } from './harvest.service';

@Module({
  imports: [TypeOrmModule.forFeature([Harvest])],
  controllers: [HarvestController],
  providers: [HarvestService],
})
export class HarvestModule {}
