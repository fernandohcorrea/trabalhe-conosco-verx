import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RuralProperty } from '../../../shared/databases/verx/entities/rural-property.entity';
import { CreateRuralPropertyDTO } from './dtos/create-rural-property.dto';
import { RuralProducer } from 'src/shared/databases/verx/entities/rural-producer.entity';
import { Address } from 'src/shared/databases/verx/entities/address.entity';
import { HttpCustomException } from 'src/shared/exceptions/http-custom-exception';
import { UpdateRuralPropertyDTO } from './dtos/update-rural-property.dto';

@Injectable()
export class RuralPropertyService {
  constructor(
    @InjectRepository(RuralProperty)
    private ruralPropertyRepository: Repository<RuralProperty>,
  ) {}

  async getAll(): Promise<any> {
    return await this.ruralPropertyRepository.find();
  }

  async createData(dataDto: CreateRuralPropertyDTO): Promise<any> {
    const rural_producer = await this.ruralPropertyRepository.manager.existsBy(
      RuralProducer,
      { id: dataDto.rural_producer_id },
    );

    const address = await this.ruralPropertyRepository.manager.existsBy(
      Address,
      { id: dataDto.address_id },
    );

    if (!rural_producer || !address) {
      throw new HttpCustomException({
        status: HttpStatus.NOT_FOUND,
        message: 'Invalid data!',
      });
    }

    try {
      const data = this.ruralPropertyRepository.create(dataDto);
      return await this.ruralPropertyRepository.save(data);
    } catch (error) {
      console.error(error);
      if (error.code === '23505') {
        throw new HttpCustomException({
          status: HttpStatus.CONFLICT,
          message: 'Rural Property already exists!',
        });
      }

      throw new HttpCustomException({
        status: HttpStatus.CONFLICT,
        message: 'Failed to create Rural Property!',
      });
    }
  }

  async updateData(
    id: number,
    dataDto: UpdateRuralPropertyDTO,
  ): Promise<{ success: boolean }> {
    const rural_producer = await this.ruralPropertyRepository.manager.existsBy(
      RuralProducer,
      { id: dataDto.rural_producer_id },
    );

    const address = await this.ruralPropertyRepository.manager.existsBy(
      Address,
      { id: dataDto.address_id },
    );

    const rural_property = await this.ruralPropertyRepository.findOneBy({
      id,
    });

    if (!rural_producer || !address) {
      throw new HttpCustomException({
        status: HttpStatus.NOT_FOUND,
        message: 'Invalid data!',
      });
    }

    if (!rural_property) {
      throw new HttpCustomException({
        status: HttpStatus.NOT_FOUND,
        message: 'Rural Property Not Found!',
      });
    }

    try {
      const result = await this.ruralPropertyRepository.update(
        rural_property.id,
        {
          ...dataDto,
        },
      );

      if (result.affected === 0) {
        throw new HttpCustomException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error to update Rural Property!',
        });
      }

      return { success: true };
    } catch (error) {
      console.error(error);

      if (error.code === '23505') {
        throw new HttpCustomException({
          status: HttpStatus.CONFLICT,
          message: 'Rural Property already exists!',
        });
      }

      throw new HttpCustomException({
        status: HttpStatus.CONFLICT,
        message: 'Failed to update Rural Property!',
      });
    }
  }

  async deleteData(id: number): Promise<{ success: boolean }> {
    const rural_property = await this.ruralPropertyRepository.findOneBy({
      id,
    });

    if (!rural_property) {
      throw new HttpCustomException({
        status: HttpStatus.NOT_FOUND,
        message: 'Rural Property Not Found!',
      });
    }

    try {
      const result = await this.ruralPropertyRepository.softDelete(id);
      if (result.affected === 0) {
        throw new HttpCustomException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error to delete Rural Property!',
        });
      }
      return { success: true };
    } catch (error) {
      console.error(error);

      throw new HttpCustomException({
        status: HttpStatus.CONFLICT,
        message: 'Failed to delete Rural Property!',
      });
    }
  }
}
