import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RuralProducer } from '../../../shared/databases/verx/entities/rural-producer.entity';
import { Repository } from 'typeorm';
import { CreateRuralProducerDTO } from './dtos/create-rural-producer.dto';
import { HttpCustomException } from 'src/shared/exceptions/http-custom-exception';
import { UpdateRuralProducerDTO } from './dtos/update-rural-producer.dto';
import { AttachAddressDTO } from './dtos/attach-address.dto';
import { Address } from 'src/shared/databases/verx/entities/address.entity';

@Injectable()
export class RuralProducerService {
  constructor(
    @InjectRepository(RuralProducer)
    private ruralProducerRepository: Repository<RuralProducer>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async getAll(): Promise<any> {
    return await this.ruralProducerRepository.find();
  }

  async createData(data: CreateRuralProducerDTO): Promise<any> {
    const rural_producer = this.ruralProducerRepository.create({
      name: data.name,
      document: data.document,
      document_type: data.document_type,
    });

    try {
      return await this.ruralProducerRepository.save(rural_producer);
    } catch (error) {
      console.error(error);
      if (error.code === '23505') {
        throw new HttpCustomException({
          status: HttpStatus.CONFLICT,
          message: 'Rural Producer already exists!',
        });
      }

      throw new HttpCustomException({
        status: HttpStatus.CONFLICT,
        message: 'Failed to create Rural Producer!',
      });
    }
  }

  async updateData(
    id: number,
    dataDto: UpdateRuralProducerDTO,
  ): Promise<{ success: boolean }> {
    const rural_producer = await this.ruralProducerRepository.findOneBy({
      id,
    });

    if (!rural_producer) {
      throw new HttpCustomException({
        status: HttpStatus.NOT_FOUND,
        message: 'Rural Producer not found!',
      });
    }

    try {
      const result = await this.ruralProducerRepository.update(
        rural_producer.id,
        {
          ...dataDto,
        },
      );

      if (result.affected === 0) {
        throw new HttpCustomException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error to update Rural Producer!',
        });
      }

      return { success: true };
    } catch (error) {
      console.error(error);

      throw new HttpCustomException({
        status: HttpStatus.CONFLICT,
        message: 'Failed to create Rural Producer!',
      });
    }
  }

  async deleteData(id: number): Promise<{ success: boolean }> {
    const rural_producer = await this.ruralProducerRepository.findOneBy({
      id,
    });

    if (!rural_producer) {
      throw new HttpCustomException({
        status: HttpStatus.NOT_FOUND,
        message: 'Rural Producer not found!',
      });
    }

    const result = await this.ruralProducerRepository.softDelete(id);
    if (result.affected === 0) {
      throw new HttpCustomException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error to delete Rural Producer!',
      });
    }
    return { success: true };
  }

  async attachAddressData(
    dataDto: AttachAddressDTO,
  ): Promise<{ success: boolean }> {
    const rural_producer = await this.ruralProducerRepository
      .createQueryBuilder('rural_producer')
      .leftJoinAndSelect('rural_producer.addresses', 'address')
      .where('rural_producer.id = :id', { id: dataDto.rural_producer_id })
      .getOne();

    const address = await this.addressRepository.findOneBy({
      id: dataDto.address_id,
    });

    if (!address || !rural_producer) {
      throw new HttpCustomException({
        status: HttpStatus.NOT_FOUND,
        message: 'Invalid data!',
      });
    }

    try {
      rural_producer.addresses.push(address);
      await this.ruralProducerRepository.save(rural_producer);
      return { success: true };
    } catch (error) {
      console.error(error);

      throw new HttpCustomException({
        status: HttpStatus.CONFLICT,
        message: 'Failed to attach Address to Rural Producer!',
      });
    }
  }
}
