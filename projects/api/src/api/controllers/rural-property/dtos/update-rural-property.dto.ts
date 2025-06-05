import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class UpdateRuralPropertyDTO {
  @IsNotEmpty()
  @IsNumber()
  rural_producer_id: number;

  @IsNotEmpty()
  @IsNumber()
  address_id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  hectares: number;
}
