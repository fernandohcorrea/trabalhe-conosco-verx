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
} from '@nestjs/common';
import { RuralPropertyService } from './rural-property.service';
import { CreateRuralPropertyDTO } from './dtos/create-rural-property.dto';
import { UpdateRuralPropertyDTO } from './dtos/update-rural-property.dto';

@Controller({
  path: 'rural-property',
})
export class RuralPropertyController {
  constructor(private readonly ruralPropertyService: RuralPropertyService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllData(): Promise<any> {
    return await this.ruralPropertyService.getAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createData(@Body() data: CreateRuralPropertyDTO): Promise<any> {
    return await this.ruralPropertyService.createData(data);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateData(
    @Param('id') id: number,
    @Body() data: UpdateRuralPropertyDTO,
  ): Promise<any> {
    return await this.ruralPropertyService.updateData(id, data);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteData(@Param('id') id: number): Promise<any> {
    return await this.ruralPropertyService.deleteData(id);
  }
}
