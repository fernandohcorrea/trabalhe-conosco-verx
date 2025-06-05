import { RuralProducerService } from './rural-producer.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuralProducerController } from './rural-producer.controller';
import { RuralProducer } from '../../../shared/databases/verx/entities/rural-producer.entity';
import { Address } from 'src/shared/databases/verx/entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RuralProducer, Address])],
  controllers: [RuralProducerController],
  providers: [RuralProducerService],
})
export class RuralProducerModule {}
