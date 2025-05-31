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
  const data: [{ existsTable: number }] = await queryRunner.query(
    [
      `SELECT EXISTS (`,
      `  SELECT `,
      `      TABLE_NAME`,
      `  FROM `,
      `    information_schema.TABLES `,
      `  WHERE `,
      `  TABLE_SCHEMA LIKE ? AND `,
      `    TABLE_TYPE LIKE 'BASE TABLE' AND`,
      `    TABLE_NAME = ?`,
      `) as existsTable`,
    ].join(' '),
    [process.env.MARIADB_DATABASE, table_name],
  );

  return data[0].existsTable == 1 ? true : false;
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
      `SELECT *`,
      `FROM `,
      `   information_schema.COLUMNS `,
      `WHERE `,
      `   TABLE_SCHEMA = ? `,
      `AND`,
      `    TABLE_NAME = ?`,
      `AND`,
      `    COLUMN_NAME = ?`,
    ].join(' '),
    [process.env.MARIADB_DATABASE, table_name, table_column],
  );

  return data.length > 0;
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

  const string_bind = '?';
  const repeat_string_bind = string_bind.repeat(table_values.length).split('');
  const binds = repeat_string_bind.join();

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
    `SELECT * FROM ${table_name} ORDER BY RAND() LIMIT 1`,
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
  const data = await queryRunner.query(
    `SELECT * FROM ${table_name} WHERE 1=1 LIMIT ?`,
    [limit],
  );

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
    `SELECT * FROM ${table_name} WHERE id = ?`,
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

/**
 * Get Query Insert User
 *
 * @return  {string}
 */
const getQueryInsertUser = (): string => {
  const query = [
    `INSERT INTO users (`,
    ` name, `,
    ` email,`,
    ` password`,
    `) VALUES (?, ?, ?)`,
  ].join(' ');
  return query;
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
  getQueryInsertUser,
};
