import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateHarvestProductionDTO {
  @IsNotEmpty()
  @IsNumber()
  harvest_id: number;

  @IsNotEmpty()
  @IsNumber()
  plot_id: number;

  @IsNotEmpty()
  @IsNumber()
  rural_production_item_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.001)
  production_tons: number;
}
