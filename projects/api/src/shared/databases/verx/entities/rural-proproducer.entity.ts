import { Exclude } from 'class-transformer';
import { DateTime } from 'luxon';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DocumentType } from '../constants/database-types';
import { Address } from './address.entity';

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
  document_type: DocumentType;

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
}
