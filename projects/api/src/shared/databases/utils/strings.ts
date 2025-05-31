import { hash } from 'bcryptjs';
import { createHash } from 'node:crypto';
import { DateTime } from 'luxon';

/**
 * Get Default Password
 *
 * @return  {Promise<string>}[return description]
 */
const getDefaultPassword = async (): Promise<string> => {
  const passwd = '1q2w3e$R!';
  return await genHashPassword(passwd);
};

/**
 * Gen Hash Password
 *
 * @param   {string}   password
 * @return  {Promise<string>}
 */
const genHashPassword = async (password: string): Promise<string> => {
  const hash256 = createHash('sha256').update(password).digest('hex');
  return await hash(hash256, 12);
};

/**
 * Gen CPF
 *
 * @param   {false}  formated
 * @return  {string}
 */
const genCpf = (formated: boolean = false): string => {
  const random = () => {
    const rand = Math.floor(Math.random() * 999);
    return ('' + rand).padStart(3, '0');
  };

  const dig = (n1, n2, n3, n4 = undefined) => {
    const nums = n1.split('').concat(n2.split(''), n3.split(''));

    if (n4 !== undefined) {
      nums[9] = n4;
    }

    let x = 0;
    for (let i = n4 !== undefined ? 11 : 10, j = 0; i >= 2; i--, j++) {
      x += parseInt(nums[j]) * i;
    }

    const y = x % 11;
    return y < 2 ? 0 : 11 - y;
  };

  const num1 = random();
  const num2 = random();
  const num3 = random();

  const dig1 = dig(num1, num2, num3);
  const dig2 = dig(num1, num2, num3, dig1);

  return formated
    ? `${num1}.${num2}.${num3}-${dig1}${dig2}`
    : `${num1}${num2}${num3}${dig1}${dig2}`;
};

/**
 * Sanitize String
 *
 * @param   {string}  str
 * @return  {string}
 */
const strSanitize = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 ]/gi, '');
};

/**
 * Generate String ID
 * @see https://moment.github.io/luxon/#/formatting?id=table-of-tokens
 * @return  {string}
 */
const genStrId = (): string => {
  const nonce = Math.floor(Math.random() * 10000000);
  const dt = DateTime.now().toFormat('x');
  const hash = createHash('sha256')
    .update(`${nonce}.${dt}`)
    .digest('hex')
    .toUpperCase();

  return `${dt}.${hash.substring(0, 6)}${nonce.toString().substring(0, 1)}`;
};

/**
 * Calculate Digit
 *
 * @param   {string}  numbers  [numbers description]
 *
 * @return  {number}           [return description]
 */
const digitCnpj = (numbers: string): number => {
  let index = 2;

  const sum = [...numbers].reverse().reduce((buffer, number) => {
    buffer += Number(number) * index;
    index = index === 9 ? 2 : index + 1;
    return buffer;
  }, 0);

  const mod = sum % 11;

  return mod < 2 ? 0 : 11 - mod;
};

/**
 * Validates a CNPJ
 * @param cnpj The CNPJ value to be validated
 */
const validateCnpj = (cnpj: string | number): boolean => {
  // Remove period, slash and dash characters from CNPJ
  const data_in = cnpj.toString().replace(/[^\d]/g, '');
  const cleaned = `${data_in}`;

  if (
    // Must be defined
    !cleaned ||
    // Must have 14 characters
    cleaned.length !== 14 ||
    // Must be digits and not be sequential characters (e.g.: 11111111111111, etc)
    /^(\d)\1+$/.test(cleaned)
  ) {
    return false;
  }

  let registration = cleaned.substring(0, 12);
  registration += digitCnpj(registration);
  registration += digitCnpj(registration);

  return registration.substring(-2) === cleaned.substring(-2);
};

/**
 * Formats a CNPJ value
 * @param cnpj The CNPJ to be formatted
 * @return The formatted CNPJ
 */
export function formatCnpj(cnpj: string | number): string {
  return (
    cnpj
      .toString()
      // Remove non digit characters
      .replace(/[^\d]/g, '')
      // Apply formatting
      .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
  );
}

/**
 * Generates a valid CNPJ
 * @return The generated CNPJ
 */
const genCnpj = (format = false): string => {
  let cnpj = '';
  let i = 12;

  while (i--) {
    cnpj += Math.floor(Math.random() * 9);
  }

  cnpj += digitCnpj(cnpj);
  cnpj += digitCnpj(cnpj);

  if (format) {
    return formatCnpj(cnpj);
  }

  return `${cnpj}`;
};

export {
  genHashPassword,
  getDefaultPassword,
  genCpf,
  strSanitize,
  genStrId,
  genCnpj,
  validateCnpj,
};
