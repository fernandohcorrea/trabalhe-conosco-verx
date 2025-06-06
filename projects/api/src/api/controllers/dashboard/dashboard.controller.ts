import { DashboardService } from './dashboard.service';
import { Controller, Get } from '@nestjs/common';

@Controller({
  path: 'dashboard',
})
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getData(): Promise<any> {
    return await this.dashboardService.getData();
  }
}
