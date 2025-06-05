import { IsNotEmpty, IsNumber } from 'class-validator';

export class AttachAddressDTO {
  @IsNotEmpty()
  @IsNumber()
  address_id: number;

  @IsNotEmpty()
  @IsNumber()
  rural_producer_id: number;
}
