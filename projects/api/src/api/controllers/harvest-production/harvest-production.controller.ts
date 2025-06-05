import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { HarvestProductionService } from './harvest-production.service';
import { CreateHarvestProductionDTO } from './dtos/create-harvest-production.dto';

@Controller({
  path: 'harvest-production',
})
export class HarvestProductionController {
  constructor(
    private readonly harvestProductionService: HarvestProductionService,
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAllData(): Promise<any> {
    return await this.harvestProductionService.getAll();
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createData(@Body() data: CreateHarvestProductionDTO): Promise<any> {
    return await this.harvestProductionService.createData(data);
  }
}
