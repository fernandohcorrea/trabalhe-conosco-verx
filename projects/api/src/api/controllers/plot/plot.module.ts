import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plot } from 'src/shared/databases/verx/entities/plot.entity';
import { PlotController } from './plot.controller';
import { PlotService } from './plot.service';

@Module({
  imports: [TypeOrmModule.forFeature([Plot])],
  controllers: [PlotController],
  providers: [PlotService],
})
export class PlotModule {}
