import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HarvestProduction } from './../../../shared/databases/verx/entities/harvest-production.entity';
import { CreateHarvestProductionDTO } from './dtos/create-harvest-production.dto';
import { HttpCustomException } from 'src/shared/exceptions/http-custom-exception';

@Injectable()
export class HarvestProductionService {
  constructor(
    @InjectRepository(HarvestProduction)
    private harvestProductionRepository: Repository<HarvestProduction>,
  ) {}

  async getAll(): Promise<any> {
    return await this.harvestProductionRepository.find();
  }

  async createData(dataDto: CreateHarvestProductionDTO): Promise<any> {
    const data = this.harvestProductionRepository.create(dataDto);

    try {
      return await this.harvestProductionRepository.save(data);
    } catch (error) {
      console.log(error);

      throw new HttpCustomException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to create Harvest Production!',
      });
    }
  }
}
