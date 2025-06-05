import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PlotService } from './plot.service';
import { QueryFilterGetAllDTO } from './dtos/query-filter-get-all.dto';
import { CreatePlotDTO } from './dtos/create-plot.dto';

@Controller({
  path: 'plot',
})
export class PlotController {
  constructor(private readonly plotService: PlotService) {}

  @Get('/')
  async getAllData(@Query() filter: QueryFilterGetAllDTO): Promise<any> {
    return await this.plotService.getAll(filter);
  }

  @Post('/')
  async createData(@Body() dataDto: CreatePlotDTO): Promise<any> {
    return await this.plotService.createData(dataDto);
  }
}
