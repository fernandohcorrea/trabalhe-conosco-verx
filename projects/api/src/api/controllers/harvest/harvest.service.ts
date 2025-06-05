import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Harvest } from 'src/shared/databases/verx/entities/harvest.entity';

@Injectable()
export class HarvestService {
  constructor(
    @InjectRepository(Harvest)
    private harvestRepository: Repository<Harvest>,
  ) {}

  async getAll(): Promise<any> {
    return await this.harvestRepository.find();
  }
}
