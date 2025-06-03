import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RuralProducer } from '../../shared/databases/verx/entities/rural-producer.entity';
import { strings } from '../../shared/databases/utils/index';
import { DocumentType } from '../../shared/databases/verx/constants/database-types';
import { Address } from '../../shared/databases/verx/entities/address.entity';
import { RuralProperty } from '../../shared/databases/verx/entities/rural-property.entity';
import { Plot } from '../../shared/databases/verx/entities/plot.entity';
import { plainToInstance } from 'class-transformer';
import { Harvest } from 'src/shared/databases/verx/entities/harvest.entity';
import { RuralProductionItem } from 'src/shared/databases/verx/entities/rural-production-item.entity';
import slugify from 'slugify';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(RuralProducer)
    private ruralProducerRepository: Repository<RuralProducer>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @InjectRepository(RuralProperty)
    private ruralPropertyRepository: Repository<RuralProperty>,
    @InjectRepository(Plot)
    private plotRepository: Repository<Plot>,
    @InjectRepository(Harvest)
    private harvestRepository: Repository<Harvest>,
    @InjectRepository(RuralProductionItem)
    private ruralProductionItemRepository: Repository<RuralProductionItem>,
  ) {}

  async getHello(): Promise<any> {
    // const harvest = this.harvestRepository.create();
    // harvest.start_year = 2024;
    // harvest.end_year = 2025;
    // await this.harvestRepository.save(harvest);

    // const arrayRuralProductionItems = [
    //   'banana',
    //   'laranja',
    //   'abacaxi',
    //   'maça',
    //   'uva',
    //   'goiaba',
    //   'melancia',
    //   'soja',
    //   'tomate',
    //   'reserva',
    //   'laranja lima',
    // ];

    // arrayRuralProductionItems.forEach(async (item) => {
    //   const ruralProductionItem = this.ruralProductionItemRepository.create();
    //   ruralProductionItem.name = item;
    //   ruralProductionItem.slug_name_tr = slugify(item, {
    //     trim: true,
    //     lower: true,
    //   });
    //   await this.ruralProductionItemRepository.save(ruralProductionItem);
    // });

    const ruralProducer = this.ruralProducerRepository.create();
    ruralProducer.name = 'Teste';
    ruralProducer.document = strings.genCpf();
    ruralProducer.document_type = DocumentType.CPF;

    const address1 = this.addressRepository.create();
    address1.street = 'Rua Teste';
    address1.number = '1';
    address1.complement = 'Casa';
    address1.city = 'São Paulo';
    address1.state = 'SP';
    address1.zip_code = '12345678';

    const address2 = this.addressRepository.create();
    address2.street = 'Rua Teste';
    address2.number = '2';
    address2.complement = 'Casa';
    address2.city = 'São Paulo';
    address2.state = 'SP';
    address2.zip_code = '12345678';

    await this.addressRepository.save(address1);
    await this.addressRepository.save(address2);

    ruralProducer.addresses = [address1, address2];

    const ruralProperty = this.ruralPropertyRepository.create();

    await this.ruralProducerRepository.save(ruralProducer);

    ruralProperty.name = 'Fazenda Teste';
    ruralProperty.address_id = address1.id;
    ruralProperty.rural_producer_id = ruralProducer.id;
    ruralProperty.hectares = 1.234;

    await this.ruralPropertyRepository.save(ruralProperty);

    const plot = this.plotRepository.create();
    plot.name = 'Lote Teste';
    plot.rural_property_id = ruralProperty.id;
    plot.hectares = 0.234;

    await this.plotRepository.save(plot);

    const q = await this.ruralProducerRepository
      .createQueryBuilder('rural_producer')
      .leftJoinAndSelect('rural_producer.addresses', 'address')
      .leftJoinAndSelect('rural_producer.rural_properties', 'rural_property')
      .leftJoinAndSelect('rural_property.address', 'rural_property_address')
      .leftJoinAndSelect('rural_property.plots', 'plot')
      .getOne();

    console.log(q);

    return plainToInstance(RuralProducer, q);
  }
}
