import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RuralProductionItem } from 'src/shared/databases/verx/entities/rural-production-item.entity';

@Injectable()
export class RuralProductionItemService {
  constructor(
    @InjectRepository(RuralProductionItem)
    private rualProductionItemRepository: Repository<RuralProductionItem>,
  ) {}

  async getAll(): Promise<any> {
    return await this.rualProductionItemRepository.find();
  }
}
