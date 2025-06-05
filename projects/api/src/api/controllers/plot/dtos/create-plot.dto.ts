import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
  Min,
  IsEnum,
} from 'class-validator';
import { PlotType } from 'src/shared/databases/verx/constants/database-types';

export class CreatePlotDTO {
  @IsNotEmpty()
  @IsNumber()
  rural_property_id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(PlotType)
  plot_type: PlotType.PLANTING_AREA | PlotType.PLANTING_AREA;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.001)
  hectares: number;
}
