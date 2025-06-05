import { HarvestService } from './harvest.service';
import { Controller, Get } from '@nestjs/common';

@Controller({
  path: 'harvest',
})
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @Get('/')
  async getAllData(): Promise<any> {
    return await this.harvestService.getAll();
  }
}
