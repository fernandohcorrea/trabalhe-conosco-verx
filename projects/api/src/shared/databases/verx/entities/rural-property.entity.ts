import { Exclude } from 'class-transformer';
import { DateTime } from 'luxon';
import {
  AfterLoad,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RuralProducer } from './rural-producer.entity';
import { Address } from './address.entity';

@Entity({ name: 'rural_properties' })
export class RuralProperty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  rural_producer_id: number;

  @Column()
  address_id: number;

  @Column('numeric', { precision: 8, scale: 3 })
  hectares: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NOW()',
  })
  created_at: DateTime;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'NOW()',
    onUpdate: 'NOW()',
  })
  updated_at: DateTime;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at?: DateTime;

  /* ****************
   * Relations
   * ***************/

  @OneToOne(() => RuralProducer)
  @JoinColumn({ name: 'rural_producer_id' })
  rural_producer: RuralProducer;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @AfterLoad()
  afterLoadEvent() {
    if (this.hectares) {
      this.hectares = Number(this.hectares);
    }
  }
}
