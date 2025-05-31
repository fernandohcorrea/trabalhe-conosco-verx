import { DataSource } from 'typeorm';
import databases from '../../../_config/databases';

const db_default = databases.db_default;
export const dataSource = new DataSource(databases[db_default]);
