import { AttachAddressDTO } from './dtos/attach-address.dto';
import { CreateRuralProducerDTO } from './dtos/create-rural-producer.dto';
import { UpdateRuralProducerDTO } from './dtos/update-rural-producer.dto';
import { RuralProducerService } from './rural-producer.service';

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

@Controller({
  path: 'rural-producer',
})
export class RuralProducerController {
  constructor(private readonly ruralProducerService: RuralProducerService) {}

  @Get('/')
  async getAllData(): Promise<any> {
    return await this.ruralProducerService.getAll();
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  async createData(@Body() data: CreateRuralProducerDTO): Promise<any> {
    return await this.ruralProducerService.createData(data);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateData(
    @Param('id') id: number,
    @Body() data: UpdateRuralProducerDTO,
  ): Promise<any> {
    return await this.ruralProducerService.updateData(id, data);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deteteData(@Param('id') id: number): Promise<any> {
    return await this.ruralProducerService.deleteData(id);
  }

  @Post('/attach-address')
  @HttpCode(HttpStatus.OK)
  async attachAddressData(@Body() data: AttachAddressDTO): Promise<any> {
    return await this.ruralProducerService.attachAddressData(data);
  }
}
