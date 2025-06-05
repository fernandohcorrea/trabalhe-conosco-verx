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

export class UpdatePlotDTO {
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
  plot_type: PlotType.RESERVED | PlotType.PLANTING_AREA;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.001)
  hectares: number;
}
