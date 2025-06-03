import { Exclude } from 'class-transformer';
import { DateTime } from 'luxon';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'rural_production_items' })
export class RuralProductionItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug_name_tr: string;

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
}
