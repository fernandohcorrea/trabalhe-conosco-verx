import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PlotService } from './plot.service';
import { QueryFilterGetAllDTO } from './dtos/query-filter-get-all.dto';
import { CreatePlotDTO } from './dtos/create-plot.dto';
import { UpdatePlotDTO } from './dtos/update-plot.dto';

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
  @HttpCode(HttpStatus.CREATED)
  async createData(@Body() dataDto: CreatePlotDTO): Promise<any> {
    return await this.plotService.createData(dataDto);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateData(
    @Param('id') id: number,
    @Body() dataDto: UpdatePlotDTO,
  ): Promise<{ success: boolean }> {
    return await this.plotService.updateData(id, dataDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deteteData(@Param('id') id: number): Promise<any> {
    return await this.plotService.deleteData(id);
  }
}
