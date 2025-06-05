import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuralProductionItem } from 'src/shared/databases/verx/entities/rural-production-item.entity';
import { RuralProductionItemService } from './rural-production-item.service';
import { RuralProductionItemController } from './rural-production-item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RuralProductionItem])],
  controllers: [RuralProductionItemController],
  providers: [RuralProductionItemService],
})
export class RuralProductionItemModule {}
