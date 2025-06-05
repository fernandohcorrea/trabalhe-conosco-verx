import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Plot } from './plot.entity';
import { Harvest } from './harvest.entity';
import { RuralProductionItem } from './rural-production-item.entity';

@Entity({ name: 'harvest_productions' })
export class HarvestProduction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plot_id: number;

  @Column()
  harvest_id: number;

  @Column()
  rural_production_item_id: number;

  @Column('numeric', { precision: 8, scale: 3 })
  production_tons: number;

  /* ****************
   * Relations
   * ***************/

  @OneToOne(() => Plot)
  @JoinColumn({ name: 'plot_id' })
  plot: Plot;

  @OneToOne(() => Harvest)
  @JoinColumn({ name: 'harvest_id' })
  harvest: Harvest;

  @OneToOne(() => RuralProductionItem)
  @JoinColumn({ name: 'rural_production_item_id' })
  rural_production_item: RuralProductionItem;

  @AfterLoad()
  afterLoadEvent() {
    if (this.production_tons) {
      this.production_tons = Number(this.production_tons);
    }
  }
}
