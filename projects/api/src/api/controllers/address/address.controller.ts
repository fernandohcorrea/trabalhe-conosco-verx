import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDTO } from './dtos/create-address.dto';
import { UpdateAddressDTO } from './dtos/update-address.dto';

@Controller({
  path: 'address',
})
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('/')
  async getAllData(): Promise<any> {
    return await this.addressService.getAll();
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  async createData(@Body() data: CreateAddressDTO): Promise<any> {
    return await this.addressService.createData(data);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateData(
    @Param('id') id: number,
    @Body() data: UpdateAddressDTO,
  ): Promise<any> {
    return await this.addressService.updateData(id, data);
  }
}
