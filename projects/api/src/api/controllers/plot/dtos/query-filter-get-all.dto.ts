import { IsNumberString, IsOptional } from 'class-validator';

export class QueryFilterGetAllDTO {
  @IsOptional()
  @IsNumberString()
  rural_property_id: number;
}
