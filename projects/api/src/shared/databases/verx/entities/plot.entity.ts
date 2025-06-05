import { Exclude } from 'class-transformer';
import {
  AfterLoad,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RuralProperty } from './rural-property.entity';
import { HarvestProduction } from './harvest-production.entity';
import { PlotType } from '../constants/database-types';

@Entity({ name: 'plots' })
export class Plot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  rural_property_id: number;

  @Column({
    type: 'enum',
    enum: [PlotType.RESERVED, PlotType.PLANTING_AREA],
    default: PlotType.PLANTING_AREA,
  })
  plot_type: PlotType.RESERVED | PlotType.PLANTING_AREA;

  @Column('numeric', { precision: 8, scale: 3 })
  hectares: number;

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

  @OneToOne(() => RuralProperty)
  @JoinColumn({ name: 'rural_property_id' })
  rural_property: RuralProperty;

  @OneToMany(
    () => HarvestProduction,
    (harvest_production) => harvest_production.plot,
  )
  harvest_productions: HarvestProduction[];

  @AfterLoad()
  afterLoadEvent() {
    if (this.hectares) {
      this.hectares = Number(this.hectares);
    }
  }
}
