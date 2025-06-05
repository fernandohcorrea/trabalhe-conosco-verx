import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { HttpCustomException } from '../../../shared/exceptions/http-custom-exception';
import { Address } from '../../../shared/databases/verx/entities/address.entity';
import { CreateAddressDTO } from './dtos/create-address.dto';
import { HttpCustomException } from 'src/shared/exceptions/http-custom-exception';
import { UpdateAddressDTO } from './dtos/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async getAll(): Promise<any> {
    return await this.addressRepository.find();
  }

  async createData(dataDto: CreateAddressDTO): Promise<any> {
    const zip_code = `${dataDto.zip_code}`.replace(/[^\d]/g, '');
    const address = this.addressRepository.create({
      ...dataDto,
      zip_code,
    });

    try {
      return await this.addressRepository.save(address);
    } catch (error) {
      console.error(error);

      throw new HttpCustomException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to create Address!',
      });
    }
  }

  async updateData(
    id: number,
    dataDto: UpdateAddressDTO,
  ): Promise<{ success: boolean }> {
    const address = await this.addressRepository.findOneBy({ id });
    const zip_code = `${dataDto.zip_code}`.replace(/[^\d]/g, '');
    if (!address) {
      throw new HttpCustomException({
        status: HttpStatus.NOT_FOUND,
        message: 'Address not found!',
      });
    }

    try {
      const result = await this.addressRepository.update(address.id, {
        ...dataDto,
        zip_code,
      });

      if (result.affected === 0) {
        throw new HttpCustomException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error to update Address!',
        });
      }

      return { success: true };
    } catch (error) {
      console.error(error);

      throw new HttpCustomException({
        status: HttpStatus.CONFLICT,
        message: 'Failed to create Address!',
      });
    }
  }
}
