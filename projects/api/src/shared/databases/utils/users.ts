import { DateTime } from 'luxon';
import { QueryRunner } from 'typeorm';
import { countDataTable } from './data';

/**
 * Count User
 * @param queryRunner QueryRunner
 * @returns number
 */
const usersCount = async (queryRunner: QueryRunner): Promise<number> => {
  return await countDataTable(queryRunner, 'users');
};

/**
 * Get Admin
 * @param queryRunner QueryRunner
 * @returns Object | null
 */
const getAdmin = async (queryRunner: QueryRunner): Promise<any | null> => {
  const limit = 1;

  const userAdmin = await getUsersByRoleId(
    queryRunner,
    // RolesIdConstants.ADMIN_ID,
    limit,
  );

  if (userAdmin.length > 0) {
    return userAdmin.pop();
  }

  return userAdmin;
};

/**
 * Get Users By Role Id
 *
 * @return  {[type]}  user
 */
const getUsersByRoleId = async (
  queryRunner: QueryRunner,
  role_id: number,
  limit = 100,
): Promise<any | null> => {
  const usersData: [
    {
      id: number;
      name: string;
      last_name: string;
      email: string;
      cpf: string;
      mobile_number: string;
      dt_last_login: DateTime;
      created_at: DateTime;
      updated_at: DateTime;
    },
  ] = await queryRunner.query(
    [
      'SELECT',
      '  u.id,',
      '  u.name,',
      '  u.email,',
      '  u.cpf,',
      '  u.mobile_number,',
      '  u.dt_last_login, ',
      '  u.created_at,',
      '  u.updated_at',
      'FROM',
      '  users u ',
      '  JOIN roles r ON',
      '    r.id = u.role_id ',
      'WHERE ',
      `  r.id = ?`,
      '  AND ISNULL (deleted_at)  ',
      `LIMIT ?`,
    ].join(' '),
    [role_id, limit],
  );

  if (limit == 1 && usersData.length > 0) {
    return usersData.shift();
  }

  return usersData;
};

/**
 *
 * @param queryRunner QueryRunner
 * @returns Object | null
 */
const getUserAtRandom = async (
  queryRunner: QueryRunner,
): Promise<any | null> => {
  const user = await queryRunner.query(
    'SELECT * FROM users ORDER BY RAND() LIMIT 1',
  );

  return user;
};

export { usersCount, getAdmin, getUserAtRandom, getUsersByRoleId };
