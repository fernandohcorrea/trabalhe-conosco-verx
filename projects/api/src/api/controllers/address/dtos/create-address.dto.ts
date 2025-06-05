import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { IsZipCode } from 'src/shared/utils/custom.validators';

export class CreateAddressDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  street: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  city: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  state: string;

  @IsNotEmpty()
  @IsString()
  @IsZipCode()
  zip_code: string;
}
