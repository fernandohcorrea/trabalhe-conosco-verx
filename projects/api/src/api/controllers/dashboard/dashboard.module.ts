import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { DatabaseProviders } from 'src/shared/databases/databases.providers';

@Module({
  imports: [],
  controllers: [DashboardController],
  providers: [DashboardService, ...DatabaseProviders],
})
export class DashboardModule {}
