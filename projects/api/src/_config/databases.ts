import { DataSourceOptions } from 'typeorm';
import * as path from 'node:path';

const verx: DataSourceOptions = {
  name: 'verx',
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.DB_VERX_USER || '',
  password: process.env.DB_VERX_PASSWORD || '',
  database: process.env.DB_VERX_DATABASE || '',
  entities: [
    [
      path.join(__dirname, `../`, '/shared/databases/verx/entities'),
      '**/*.entity.js',
    ].join(`/`),
  ],
  synchronize: false,
  migrations: {
    path: path.join(
      __dirname,
      `../`,
      '/shared/databases/verx/migrations',
      '/*.js',
    ),
  },
  migrationsTableName: 'z_migrations',
};

export default {
  db_default: 'verx',
  verx,
};
