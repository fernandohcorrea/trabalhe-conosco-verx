import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

/**
 * Decorator IsIdentity (cpj || cpf )
 *
 * @param   {ValidationOptions}  validationOptions  [validationOptions description]
 *
 * @return  {Function}                              Decorator function
 */
export function IsIdentity(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  if (!validationOptions) {
    validationOptions = {
      message: 'The field must be an CNPJ or CPF numbers',
    };
  }
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsIdentity',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          const data = `${value}`.replace(/[^\d]/g, '');
          let ret = false;

          switch (data.length) {
            case 11:
              ret = CPFValidate(`${data}`) ? true : false;
              break;

            case 14:
              ret = CNPJValidate(`${data}`) ? true : false;
              break;

            default:
              ret = false;
              break;
          }

          return ret;
        },
      },
    });
  };
}

/**
 * Decorator IsCPF
 *
 * @param   {ValidationOptions}  validationOptions  [validationOptions description]
 *
 * @return  {Function}                              Decorator function

 */
export function IsCPF(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  if (!validationOptions) {
    validationOptions = {
      message: 'The field must be a valid CPF numbers',
    };
  }
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsCPF',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return CPFValidate(`${value}`);
        },
      },
    });
  };
}

/**
 * Verify CPF
 *
 * @param   {string}  cpf
 * @return  boolean
 */
export function CPFValidate(cpf: string): boolean {
  const cpf_formatted = cpf.split('.').join('').split('-').join('');
  let sum = 0;
  let rest = 0;

  const test = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ];

  if (test.includes(cpf_formatted)) {
    return false;
  }

  for (let i = 1; i <= 9; i++)
    sum = sum + parseInt(cpf_formatted.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(cpf_formatted.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum = sum + parseInt(cpf_formatted.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(cpf_formatted.substring(10, 11))) return false;
  return true;
}

/**
 * If is Valid Condition
 *
 * Example:
 *
 * @IfIsValid((object, value) => {
 *   return value.length > 0;
 * }
 *
 * @param   {Function} condition [Return a boolean]
 * @param   {ValidationOptions}  validationOptions  [validationOptions description]
 *
 * @return  {Function} Decorator function
 */
export function IfIsValid(
  condition: (object: any, value: any) => boolean,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  if (!validationOptions) {
    validationOptions = {
      message: 'Is Invalid Condition!',
    };
  }
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IfIsValid',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return condition(args.object, value);
        },
      },
    });
  };
}

/**
 * Decorator IsIdentificationCredential (e-mail | mobile_number)
 *
 * @param   {ValidationOptions}  validationOptions
 * @return  {Function} Decorator function
 */
export function IsIdentificationCredential(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  if (!validationOptions) {
    validationOptions = {
      message: 'The field must be an e-mail or mobile numbers with DDD',
    };
  }
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsIdentificationCredential',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (`${value}`.match(/^([0-9]){11}$/)) {
            return true;
          } else if (
            typeof value == 'string' &&
            value.indexOf('@') > -1 &&
            emailValidate(value)
          ) {
            return true;
          }
          return false;
        },
      },
    });
  };
}

/**
 * Validator Email
 *
 * @param   {string}   email
 * @return  {boolean}
 */
export function emailValidate(email: string): boolean {
  if (!email) return false;

  const result = email.match(
    /^(?<USER>[a-zA-Z0-9_\-\.]+)@(?<DOMAIN>(?<DNAME>[a-zA-Z0-9_\-\.]+)\.(?<TLD>[a-zA-Z]{2,5}))$/,
  );

  if (result) {
    return true;
  }

  return false;
}

export function IsCNPJ(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  if (!validationOptions) {
    validationOptions = {
      message: 'The field must be a valid CNPJ numbers',
    };
  }
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsCNPJ',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return CNPJValidate(`${value}`);
        },
      },
    });
  };
}

/**
 * CNPJ Validate
 *
 * @param   {string | number | number[]}  value CNPJ
 * @return  {boolean}
 */
export function CNPJValidate(value: string | number | number[] = ''): boolean {
  if (!value) return false;

  const regexCNPJ = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/;

  const isString = typeof value === 'string';
  const validTypes =
    isString || Number.isInteger(value) || Array.isArray(value);

  if (!validTypes) return false;

  if (isString) {
    const digitsOnly = /^\d{14}$/.test(value);
    const validFormat = regexCNPJ.test(value);
    const isValid = digitsOnly || validFormat;

    if (!isValid) return false;
  }

  const match = value.toString().match(/\d/g);
  const numbers = Array.isArray(match) ? match.map(Number) : [];

  if (numbers.length !== 14) return false;

  const items = [...new Set(numbers)];
  if (items.length === 1) return false;

  const digits = numbers.slice(12);

  const digit0 = validCalc(12, numbers);
  if (digit0 !== digits[0]) return false;

  const digit1 = validCalc(13, numbers);
  return digit1 === digits[1];
}

/**
 * Digit Calculation
 *
 * @param   {number}    x
 * @param   {number | number[]}  numbers
 * @return  {number}
 */
function validCalc(x: number, numbers: number[]): number {
  const slice = numbers.slice(0, x);
  let factor = x - 7;
  let sum = 0;

  for (let i = x; i >= 1; i--) {
    const n = slice[x - i];
    sum += n * factor--;
    if (factor < 2) factor = 9;
  }

  const result = 11 - (sum % 11);

  return result > 9 ? 0 : result;
}

export function IsZipCode(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  if (!validationOptions) {
    validationOptions = {
      message: 'The field must be a valid ZIP Code numbers',
    };
  }
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsZipCode',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return zipCodeValidate(`${value}`);
        },
      },
    });
  };
}

export function zipCodeValidate(
  value: string | number | number[] = '',
): boolean {
  const data = `${value}`.replace(/[^\d]/g, '');

  if (data.length == 8) {
    return true;
  }
  return false;
}
