import { RuralProductionItemService } from './rural-production-item.service';
import { Controller, Get } from '@nestjs/common';

@Controller({
  path: 'rural-production-item',
})
export class RuralProductionItemController {
  constructor(
    private readonly ruralProductionItemService: RuralProductionItemService,
  ) {}

  @Get('/')
  async getAllData(): Promise<any> {
    return await this.ruralProductionItemService.getAll();
  }
}
