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
import { RuralProperty } from './rural-property.entity';

@Entity({ name: 'plots' })
export class Plot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  rural_property_id: number;

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

  @OneToOne(() => RuralProperty)
  @JoinColumn({ name: 'rural_property_id' })
  rural_property: RuralProperty;

  @AfterLoad()
  afterLoadEvent() {
    if (this.hectares) {
      this.hectares = Number(this.hectares);
    }
  }
}
