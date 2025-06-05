import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuralProperty } from '../../../shared/databases/verx/entities/rural-property.entity';
import { RuralPropertyController } from './rural-property.controller';
import { RuralPropertyService } from './rural-property.service';

@Module({
  imports: [TypeOrmModule.forFeature([RuralProperty])],
  controllers: [RuralPropertyController],
  providers: [RuralPropertyService],
})
export class RuralPropertyModule {}
