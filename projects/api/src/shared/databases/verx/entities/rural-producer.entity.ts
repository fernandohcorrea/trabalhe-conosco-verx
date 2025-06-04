import { Exclude } from 'class-transformer';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DocumentType } from '../constants/database-types';
import { Address } from './address.entity';
import { RuralProperty } from './rural-property.entity';

@Entity({ name: 'rural_producers' })
export class RuralProducer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  document: string;

  @Column({
    type: 'enum',
    enum: [DocumentType.CPF, DocumentType.CNPJ],
  })
  document_type: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NOW()',
  })
  created_at: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'NOW()',
    onUpdate: 'NOW()',
  })
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at?: Date;

  /* ****************
   * Relations
   * ***************/

  @ManyToMany(() => Address)
  @JoinTable({
    name: 'rural_producers_addresses',
    joinColumn: {
      name: 'rural_producer_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'address_id',
      referencedColumnName: 'id',
    },
  })
  addresses: Address[];

  @OneToMany(
    () => RuralProperty,
    (ruralProperty) => ruralProperty.rural_producer,
  )
  rural_properties: RuralProperty[];
}
