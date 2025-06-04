import { QueryRunner } from 'typeorm';

/**
 * Check if table exists
 *
 * @param queryRunner QueryRunner
 * @param table_name string
 * @returns boolean
 */
const tableExists = async (
  queryRunner: QueryRunner,
  table_name: string,
): Promise<boolean> => {
  const data = await queryRunner.query(
    [
      'SELECT EXISTS (',
      'SELECT 1',
      '  FROM information_schema.columns',
      'WHERE',
      '  table_schema = $1',
      '  AND table_name = $2',
      ');',
    ].join(' '),
    ['public', table_name],
  );

  if (data.pop().exists == true) {
    return true;
  }

  return false;
};

/**
 * Check if column exists
 *
 * @param queryRunner QueryRunner
 * @param table_name string
 *  * @param table_column string
 * @returns boolean
 */
const columnExists = async (
  queryRunner: QueryRunner,
  table_name: string,
  table_column: string,
): Promise<boolean> => {
  const data = await queryRunner.query(
    [
      'SELECT EXISTS (',
      'SELECT 1',
      '  FROM information_schema.columns',
      'WHERE',
      '  table_schema = $1',
      '  AND table_name = $2',
      '  AND column_name = $3',
      ');',
    ].join(' '),
    ['public', table_name, table_column],
  );

  if (data.pop().exists == true) {
    return true;
  }

  return false;
};

/**
 * Get Data in table
 *
 * @param queryRunner QueryRunner
 * @param table_name string
 * @param table_columns array
 * @param where string
 * @returns Promise<any | void>
 */
const getDataByWhere = async (
  queryRunner: QueryRunner,
  table_name: string,
  table_columns: Array<string>,
  where: string,
): Promise<any[]> => {
  if (table_columns.length <= 0) return;

  const params = table_columns.join();
  const data = await queryRunner.query(
    `SELECT ${params} FROM ${table_name} WHERE ${where}`,
  );

  return data;
};

/**
 * Dynamic insert
 *
 * @param queryRunner QueryRunner
 * @param table_name string
 * @param table_columns array
 * @param table_columns array
 * @returns Promise<EntityName | void>
 */
const insertIntoTable = async (
  queryRunner: QueryRunner,
  table_name: string,
  table_columns: Array<string>,
  table_values: Array<any>,
): Promise<{ insertId: any } | void> => {
  if (table_columns.length <= 0 || table_values.length <= 0) {
    throw new Error(`Columns and values can´t be empty [${table_name}]`);
  }

  if (table_columns.length !== table_values.length) {
    throw new Error(`Columns and values doesn't match [${table_name}]`);
  }

  const fields = [];
  for (let i = 1; i <= table_columns.length; i++) {
    fields.push(`$${i}`);
  }
  const binds = fields.join(',');

  const data = await queryRunner.query(
    [`INSERT INTO ${table_name} (${table_columns}) VALUES (${binds})`].join(
      ' ',
    ),
    table_values,
  );

  return data;
};

/**
 * Count Data in Table
 *
 * @param queryRunner QueryRunner
 * @returns number
 */
const countDataTable = async (
  queryRunner: QueryRunner,
  table_name: string,
): Promise<number> => {
  const data: [{ qtd: number }] = await queryRunner.query(
    `SELECT count(*) as qtd FROM ${table_name}`,
  );

  return data[0]?.qtd || 0;
};

/**
 * Get random record from table
 *
 * @param queryRunner QueryRunner
 * @param table_name string
 * @returns
 */
const getRandomRecordFromTable = async (
  queryRunner: QueryRunner,
  table_name: string,
): Promise<any | null> => {
  const data = await queryRunner.query(
    `SELECT * FROM ${table_name} ORDER BY RANDOM() LIMIT 1`,
  );

  return data ? data.shift() : null;
};

/**
 * Get Data from table
 *
 * @param queryRunner QueryRunner
 * @param table_name string
 * @param limit number
 * @returns
 */
const getData = async (
  queryRunner: QueryRunner,
  table_name: string,
  limit = 100,
): Promise<any> => {
  const data = await queryRunner.manager
    .createQueryBuilder()
    .select()
    .from(table_name, 'tbl')
    .limit(limit)
    .getRawMany();

  return data;
};

/**
 * Get Data by ID
 *
 * @param  {QueryRunner} queryRunner
 * @param  {string} table_name
 * @param  {number} id
 *
 * @return  {[type]}  [return description]
 */
const getDataByID = async (
  queryRunner: QueryRunner,
  table_name: string,
  id: number,
): Promise<any> => {
  const data = await queryRunner.query(
    `SELECT * FROM ${table_name} WHERE id = $1`,
    [id],
  );

  if (data && data.length > 0) {
    return data.shift();
  }

  return null;
};

/**
 * Get first data from table
 *
 * @param  {QueryRunner} queryRunner
 * @param  {string} table_name
 *
 * @return  {[type]}  [return description]
 */
const getFirstData = async (
  queryRunner: QueryRunner,
  table_name: string,
): Promise<any> => {
  const data = await queryRunner.query(
    `SELECT * FROM ${table_name} WHERE 1=1 LIMIT 1`,
  );

  if (data && data.length > 0) {
    return data.shift();
  }

  return null;
};

/**
 * Random data from array
 *
 * @param data_in any[]
 * @param elements number default 1
 *
 * @returns any | any[]
 */
const randomData = (data_in: any[], elements = 1): any => {
  const result = [];
  const data = data_in;

  if (data.length < elements) {
    throw new Error('Not enough data to generate random data');
  }

  for (let i = 0; i < elements; i++) {
    const idx = Math.floor(Math.random() * data.length);
    result.push(data[idx]);
    data.slice(idx, 1);
  }

  if (elements === 1) {
    return result.shift();
  }
  return result;
};

export {
  getData,
  tableExists,
  getDataByID,
  getDataByWhere,
  columnExists,
  countDataTable,
  insertIntoTable,
  getRandomRecordFromTable,
  getFirstData,
  randomData,
};
