import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import {
  CNPJValidate,
  CPFValidate,
  IfIsValid,
  IsIdentity,
} from '../../../../shared/utils/custom.validators';
import { DocumentType } from 'src/shared/databases/verx/constants/database-types';

export class CreateRuralProducerDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsIdentity()
  document: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(DocumentType)
  @IfIsValid(
    (obj) => {
      if (obj.document_type === DocumentType.CPF) {
        return CPFValidate(obj.document);
      }

      if (obj.document_type === DocumentType.CNPJ) {
        return CNPJValidate(obj.document);
      }

      return false;
    },
    { message: 'Invalid Document Type' },
  )
  document_type: string;
}
